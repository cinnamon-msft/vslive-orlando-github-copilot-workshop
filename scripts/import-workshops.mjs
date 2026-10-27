import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { knowledgeChecks } from './knowledge-checks.mjs';
import { lessonSections } from './lesson-sections.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(join(root, 'workshops.sources.json'), 'utf8'));
const sourceRootArg = process.argv.indexOf('--source-root');
const cachedRoot =
  sourceRootArg >= 0 && process.argv[sourceRootArg + 1]
    ? resolve(process.argv[sourceRootArg + 1])
    : null;
const tracksArg = process.argv.indexOf('--tracks');
const selectedTracks =
  tracksArg >= 0
    ? process.argv[tracksArg + 1]?.split(',')
    : manifest.sources.map((source) => source.key);
if (
  !selectedTracks?.length ||
  selectedTracks.some((key) => !manifest.sources.some((source) => source.key === key))
) {
  throw new Error('--tracks must list valid comma-separated workshop source keys.');
}
const temporaryRoot = cachedRoot ? null : mkdtempSync(join(tmpdir(), 'vslive-workshops-'));
const contentRoot = join(root, 'src', 'content', 'docs', 'labs');
const overlayRoot = join(root, 'scripts', 'workshop-overlays');
const copilotAppDestinationNames = {
  '2-add-star-rating.md': '3-add-star-rating.md',
  '3-custom-instructions.md': '4-custom-instructions.md',
  '4-build-filtering.md': '5-build-filtering.md',
  '5-mcp-playwright.md': '6-mcp-playwright.md',
  '6-agent-merge.md': '7-agent-merge.md',
  '7-canvases.md': '8-canvases.md',
  '8-review.md': '9-review.md'
};
const shiftedCopilotAppRoutes = Object.fromEntries(
  Object.entries(copilotAppDestinationNames).map(([from, to]) => [
    basename(from, '.md'),
    basename(to, '.md')
  ])
);

const cleanTargets = selectedTracks.map((key) => join(contentRoot, key));
if (selectedTracks.includes('copilot-app')) cleanTargets.push(join(contentRoot, '_images'));

for (const target of cleanTargets) {
  rmSync(target, { recursive: true, force: true });
}
mkdirSync(contentRoot, { recursive: true });

const sources = Object.fromEntries(
  manifest.sources
    .filter((source) => selectedTracks.includes(source.key))
    .map((source) => {
      const location = cachedRoot
        ? join(cachedRoot, source.cacheDirectory)
        : join(temporaryRoot, source.cacheDirectory);

      if (!cachedRoot) {
        execFileSync('git', ['clone', '--quiet', '--no-checkout', source.repository, location], {
          stdio: 'inherit'
        });
        execFileSync('git', ['-C', location, 'checkout', '--quiet', source.commit], {
          stdio: 'inherit'
        });
      }

      if (!existsSync(location)) {
        throw new Error(`Missing source cache for ${source.key}: ${location}`);
      }

      const actualCommit = execFileSync('git', ['-C', location, 'rev-parse', 'HEAD'], {
        encoding: 'utf8'
      }).trim();
      if (actualCommit !== source.commit) {
        throw new Error(
          `${source.key} cache is at ${actualCommit}, but workshops.sources.json pins ${source.commit}`
        );
      }

      return [source.key, location];
    })
);

const copyTree = (from, to) => {
  cpSync(from, to, {
    recursive: true,
    filter: (path) => {
      const name = basename(path);
      return !['.git', 'node_modules', 'bin', 'obj'].includes(name);
    }
  });
};

const titleFromMarkdown = (markdown, fallback) => {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1];
  return (heading || fallback)
    .replaceAll('"', "'")
    .replace(/<[^>]+>/g, '')
    .trim();
};

const stripTrack = (markdown, trackToRemove) =>
  markdown
    .replace(
      new RegExp(
        `<!-- track:${trackToRemove}:start -->[\\s\\S]*?<!-- track:${trackToRemove}:end -->`,
        'g'
      ),
      ''
    )
    .replace(/<!-- track:(?:cli|vscode):(start|end) -->/g, '');

const normalizeLinks = (markdown, isIndex) =>
  markdown.replace(
    /(\]\(|:\s*)(?:\.\/)?([A-Za-z0-9_-]+)\.md(#[^\s)]*)?/g,
    (_, prefix, slug, hash = '') => `${prefix}${isIndex ? './' : '../'}${slug}/${hash}`
  );

const normalizeTaskMarkers = (markdown) => {
  let fence = null;
  return markdown
    .split('\n')
    .map((line) => {
      const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
      if (fenceMatch) {
        const marker = fenceMatch[1][0];
        fence = fence === marker ? null : marker;
        return line;
      }
      if (fence) return line;
      const normalized = line.replace(/^(\s*(?:[-*+]|\d+\.)\s+)\[\](?=\s)/, '$1[ ]');
      return normalized === line ? line : normalized.trimEnd();
    })
    .join('\n');
};

const addKnowledgeCheck = (markdown, destinationFile) => {
  const key = destinationFile.slice(contentRoot.length + 1).replaceAll('\\', '/');
  const check = knowledgeChecks[key];
  if (!check) return markdown;
  if (markdown.includes('## Check your understanding')) return markdown;

  const block = `## Check your understanding

${check.question}

<details>
<summary>Check your answer</summary>

${check.answer}

**Go deeper:** [${check.sourceLabel}](${check.sourceUrl}).

</details>`;

  const marker = key.startsWith('cli/')
    ? /^## ✅/m
    : key.startsWith('copilot-app/')
      ? /^## Resources/m
      : null;

  if (!marker) {
    const dividerIndex = markdown.lastIndexOf('\n---\n');
    if (dividerIndex < 0) {
      throw new Error(`Could not place knowledge check in ${key}`);
    }
    return `${markdown.slice(0, dividerIndex).trimEnd()}\n\n${block}\n${markdown.slice(dividerIndex)}`;
  }
  if (!marker.test(markdown)) {
    throw new Error(`Could not place knowledge check in ${key}`);
  }
  return markdown.replace(marker, `${block}\n\n$&`);
};

const addLessonSections = (markdown, destinationFile) => {
  const key = destinationFile.slice(contentRoot.length + 1).replaceAll('\\', '/');
  const sections = lessonSections[key];
  if (!sections) return markdown;

  for (const section of sections) {
    if (markdown.includes(`## ${section.heading}`)) continue;
    if (!markdown.includes(section.before)) {
      throw new Error(`Could not place "${section.heading}" in ${key}`);
    }
    const insertionIndex = markdown.indexOf(section.before);
    const prefix = markdown.slice(0, insertionIndex);
    const spacer = prefix.endsWith('\n\n') ? '' : '\n';
    markdown =
      `${prefix}${spacer}## ${section.heading}\n\n${section.before}` +
      markdown.slice(insertionIndex + section.before.length);
  }
  return markdown;
};

const normalizeMarkdown = (sourceFile, destinationFile, options = {}) => {
  let markdown = readFileSync(sourceFile, 'utf8')
    .replace(/^\uFEFF/, '')
    .replace(/\r\n/g, '\n');
  if (options.removeTrack) {
    markdown = stripTrack(markdown, options.removeTrack);
  }
  if (options.transform) {
    markdown = options.transform(markdown);
  }

  const isIndex = basename(destinationFile) === 'index.md';
  markdown = normalizeLinks(markdown, isIndex);

  if (options.replacements) {
    for (const [pattern, replacement] of options.replacements) {
      markdown = markdown.replace(pattern, replacement);
    }
  }

  if (markdown.startsWith('---\n')) {
    const end = markdown.indexOf('\n---', 4);
    const frontmatter = markdown.slice(4, end).replace(/^slug:.*\n?/m, '');
    markdown = `---\n${frontmatter.trim()}\n---${markdown.slice(end + 4)}`;
  } else {
    const title = titleFromMarkdown(markdown, basename(sourceFile, '.md'));
    markdown = `---\ntitle: "${title}"\n---\n\n${markdown}`;
  }

  markdown = markdown.replace(/^(---\n[\s\S]*?\n---)\n+(?:#\s+[^\n]+\n+(?:---\n+)?)?/, '$1\n\n');

  if (options.intro) {
    markdown = markdown.replace(/^(---\n[\s\S]*?\n---)\n?/, `$1\n\n${options.intro}\n\n`);
  }

  markdown = normalizeTaskMarkers(markdown);
  markdown = addLessonSections(markdown, destinationFile);
  markdown = addKnowledgeCheck(markdown, destinationFile);
  mkdirSync(dirname(destinationFile), { recursive: true });
  writeFileSync(destinationFile, markdown.trimEnd() + '\n');
};

const importMarkdownDirectory = (sourceDirectory, destinationDirectory, options = {}) => {
  for (const name of readdirSync(sourceDirectory)) {
    if (!name.endsWith('.md')) continue;
    if (options.exclude?.includes(name)) continue;
    const destinationName =
      options.indexFile === name ? 'index.md' : options.destinationNames?.[name] || name;
    const fileOptions =
      options.introFiles && !options.introFiles.includes(name)
        ? { ...options, intro: null }
        : options;
    normalizeMarkdown(
      join(sourceDirectory, name),
      join(destinationDirectory, destinationName),
      fileOptions
    );
  }
};

if (sources.cli) {
  importMarkdownDirectory(join(sources.cli, 'workshop'), join(contentRoot, 'cli'), {
    indexFile: '00-overview.md',
    removeTrack: 'vscode',
    replacements: [
      [/### Step 1: Create Your Repository/, '### Step 1: Open the CLI Lab'],
      [
        /> \*\*Duration:\*\*.*$/m,
        '> **Duration:** 60–90 minutes for the facilitated core; advanced deep dives are available if time permits.'
      ],
      [
        /The workshop supports \*\*two tracks\*\*: a VS Code experience and a GitHub Copilot CLI experience\./,
        'This VS Live! Orlando edition focuses on the GitHub Copilot CLI experience.'
      ],
      [
        /## 🎯 Choose Your Track[\s\S]*?---/,
        '## Workshop path\n\nFollow the CLI instructions throughout this edition. Parts 1–5 form the facilitated core; Parts 6–8 are advanced deep dives, and Part 9 is optional.\n\n---'
      ],
      [
        /> 💡 \*\*Tip:\*\* Use the DevContainer for a pre-configured environment if you want a fast start in VS Code\./,
        '> **Tip:** The included Dev Container provides a pre-configured terminal environment if you prefer containers.'
      ],
      [
        /1\. Open \[github\.com\/copilot-dev-days\/mona-mayhem\][\s\S]*?3\. Name it `my-mona-mayhem` and set visibility to \*\*Public\*\* \(if you created from template\)/,
        `Clone the dedicated Mona Mayhem starter and open it in Visual Studio Code:

\`\`\`bash
git clone https://github.com/jamesmontemagno/workshop-mona-mayhem.git
cd workshop-mona-mayhem
code .
\`\`\`

Keep your work in this folder. A direct clone is sufficient for the local lab. Fork this repository only if you want to push your work or use the optional cloud delegation exercise.`
      ],
      [
        /1\. Clone your repo locally and open a terminal in the project root\./,
        '1. In the terminal already open at `workshop-mona-mayhem`, install dependencies and start the app:'
      ],
      [/2\. Install dependencies and start the app:\n/, ''],
      [
        /3\. Open a \*\*second terminal\*\* in the same repo and start Copilot CLI:/,
        '2. Open a **second terminal** in the same folder and start Copilot CLI:'
      ],
      [/4\. In the interactive session, enter:/, '3. In the interactive session, enter:'],
      [
        /5\. Follow the device flow prompts, then confirm that you trust the repository when the CLI asks for approval\./,
        '4. Follow the device flow prompts, then confirm that you trust the repository when the CLI asks for approval.'
      ],
      [
        /Create your repo, prepare your environment, and give Copilot the right context/,
        'Open the included starter, prepare your environment, and give Copilot the right context'
      ]
    ]
  });
}

const shiftCopilotAppLesson = (markdown) => {
  const routePattern = new RegExp(`\\b(${Object.keys(shiftedCopilotAppRoutes).join('|')})\\b`, 'g');
  return markdown
    .replace(/\bLesson ([2-8])\b/g, (_, lesson) => `Lesson ${Number(lesson) + 1}`)
    .replace(routePattern, (route) => shiftedCopilotAppRoutes[route]);
};

if (sources.vscode) {
  importMarkdownDirectory(join(sources.vscode, 'workshop'), join(contentRoot, 'vscode'), {
    indexFile: '00-overview.md',
    exclude: ['GUIDE.md'],
    replacements: [
      [/\[← README\]\(\.\.\/README\.md\)\n?/, ''],
      [/\]\(\.\.\/00-overview\/\)/g, '](../)']
    ]
  });
}

if (sources['copilot-app']) {
  const appSource = manifest.sources.find((source) => source.key === 'copilot-app');
  const foundryCanvasUrl = `${appSource.repository.replace(/\.git$/, '')}/blob/${appSource.commit}/docs/app/8-foundry-canvas.md`;
  importMarkdownDirectory(
    join(sources['copilot-app'], 'docs', 'app'),
    join(contentRoot, 'copilot-app'),
    {
      indexFile: 'README.md',
      destinationNames: copilotAppDestinationNames,
      introFiles: ['README.md', '0-prerequisites.md'],
      intro:
        '> [!NOTE]\n> This lab starts with a standalone `space-quiz` project for a guided tour, then uses the separate [Tailspin Toys template repository](https://github.com/github-samples/tailspin-toys) for the remaining lessons.',
      transform: shiftCopilotAppLesson,
      replacements: [
        [/\.\.\/8-foundry-canvas\//g, foundryCanvasUrl],
        [
          /\[Cloud agent harness\]\(\.\.\/\.\.\/cloud\/\)/g,
          '[Visual Studio lab](../../visual-studio/)'
        ]
      ]
    }
  );

  importMarkdownDirectory(join(overlayRoot, 'copilot-app'), join(contentRoot, 'copilot-app'), {
    indexFile: 'README.md'
  });

  const appImagesSource = join(sources['copilot-app'], 'docs', '_images');
  const appImagesDestination = join(contentRoot, '_images');
  mkdirSync(appImagesDestination, { recursive: true });
  for (const name of readdirSync(appImagesSource)) {
    if (name.startsWith('app-')) {
      cpSync(join(appImagesSource, name), join(appImagesDestination, name));
    }
  }
}

if (sources['visual-studio']) {
  importMarkdownDirectory(
    join(sources['visual-studio'], 'lab'),
    join(contentRoot, 'visual-studio'),
    {
      replacements: [
        [/\(\.\/images\/4-instructions\.png\)/g, '(./images/04-instructions.png)'],
        [/\(\.\/impags\//g, '(./images/'],
        [/agent mdoe/g, 'agent mode'],
        [/Add from MCP MCP/g, 'Add from MCP Registry'],
        [
          /> \[!NOTE\]\n> For the hands-on lab exercises that create or modify repository data via cloud agents \(Part 12\), you'll need to fork the lab repo into your own account\. This gives the cloud agent permissions to operate on your fork\./,
          'Part 9 creates GitHub issues and Part 12 delegates work to a cloud agent. Both need a repository where you have write access. Fork `workshop-tinyshop` before those parts. If enterprise policy prevents a fork, you can complete every local exercise but must skip those repository-backed actions.'
        ],
        [
          /the \*\*eshop\.png\*\* image found in the root of the cloned repository/,
          '`eshop.png` from the root of your cloned TinyShop repository'
        ],
        [
          /1\. \[(?: )?\] Navigate to \*\*Tools -> Options -> GitHub -> Copilot -> Source Control Integration\*\*\.\n1\. \[(?: )?\] Update the commit message customization setting to: `Summarize in a few sentences and then highlight the top 5 changes with emoji and short descriptions`/,
          `1. [ ] In **Solution Explorer**, expand the **GitHub Node** and open \`copilot-instructions.md\`.
1. [ ] At the bottom of the file, add:

   \`\`\`markdown
   ## Commit Messages

   When creating Commit messages, summarize in a few sentences and then highlight the top 5 changes with emoji and short descriptions
   \`\`\``
        ],
        [
          /## Clone Lab Repository[\s\S]*?The code is now opened in Visual Studio\. Feel free to take a look at it or skip to the next section to start the app\./,
          `## Clone and open the lab solution

Clone the dedicated TinyShop repository:

\`\`\`powershell
git clone https://github.com/jamesmontemagno/workshop-tinyshop.git
cd workshop-tinyshop
start src\\TinyShop.sln
\`\`\`

1. [ ] In Visual Studio, select **File -> Open -> Project/Solution** if the solution did not open automatically.
2. [ ] Open \`src/TinyShop.sln\`.`
        ]
      ]
    }
  );
  copyTree(
    join(sources['visual-studio'], 'lab', 'images'),
    join(contentRoot, 'visual-studio', 'images')
  );

  cpSync(
    join(root, 'scripts', 'templates', 'visual-studio-index.md'),
    join(contentRoot, 'visual-studio', 'index.md')
  );
}

if (temporaryRoot) {
  rmSync(temporaryRoot, { recursive: true, force: true });
}

console.log(`Imported ${selectedTracks.length} pinned workshop sources.`);
