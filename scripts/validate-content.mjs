import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { knowledgeChecks } from './knowledge-checks.mjs';
import { lessonSections } from './lesson-sections.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const docsRoot = join(root, 'src', 'content', 'docs');
const astroConfig = readFileSync(join(root, 'astro.config.mjs'), 'utf8');
const landingPage = readFileSync(join(root, 'src', 'pages', 'index.astro'), 'utf8');
const required = [
  'prepare.md',
  'resources.md',
  'labs/cli/index.md',
  'labs/copilot-app/index.md',
  'labs/vscode/index.md',
  'labs/visual-studio/index.md'
];
const errors = [];
const expectedLabs = ['cli', 'copilot-app', 'visual-studio', 'vscode'];
const actualLabs = readdirSync(join(docsRoot, 'labs'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== '_images')
  .filter((entry) => readdirSync(join(docsRoot, 'labs', entry.name)).length > 0)
  .map((entry) => entry.name)
  .sort();
if (actualLabs.join(',') !== expectedLabs.join(',')) {
  errors.push(`Expected only the four workshop labs, found: ${actualLabs.join(', ')}`);
}
const expectedAppLessons = [
  '0-prerequisites', '1-install-copilot-app', '2-guided-tour', '3-add-star-rating',
  '4-custom-instructions', '5-build-filtering', '6-mcp-playwright', '7-agent-merge',
  '8-canvases', '9-review', 'index'
];
const actualAppLessons = readdirSync(join(docsRoot, 'labs', 'copilot-app'))
  .filter((name) => name.endsWith('.md'))
  .map((name) => name.slice(0, -3))
  .sort();
if (actualAppLessons.join(',') !== expectedAppLessons.join(',')) {
  errors.push(`Unexpected Copilot App lessons: ${actualAppLessons.join(', ')}`);
}

const favicon = readFileSync(join(root, 'public', 'favicon.svg'), 'utf8');
const headerMark = readFileSync(join(root, 'src', 'assets', 'mark.svg'), 'utf8');
if (favicon !== headerMark) {
  errors.push('The public favicon and Starlight header mark must stay identical.');
}

const findMalformedTaskMarkers = (markdown) => {
  const malformed = [];
  let fence = null;
  markdown.split(/\r?\n/).forEach((line, index) => {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[1][0];
      fence = fence === marker ? null : marker;
      return;
    }
    if (!fence && /^\s*(?:[-*+]|\d+\.)\s+\[\](?=\s)/.test(line)) {
      malformed.push(index + 1);
    }
  });
  return malformed;
};

for (const path of required) {
  if (!existsSync(join(docsRoot, path))) errors.push(`Missing required page: ${path}`);
}

if (
  astroConfig.indexOf("label: '1 · Copilot App'") < 0 ||
  astroConfig.indexOf("label: '2 · Copilot CLI'") < 0 ||
  astroConfig.indexOf("label: '1 · Copilot App'") > astroConfig.indexOf("label: '2 · Copilot CLI'")
) {
  errors.push('The sidebar must present the Copilot app before Copilot CLI.');
}

if (
  landingPage.indexOf("key: 'copilot-app'") < 0 ||
  landingPage.indexOf("key: 'cli'") < 0 ||
  landingPage.indexOf("key: 'copilot-app'") > landingPage.indexOf("key: 'cli'")
) {
  errors.push('The landing page must present the Copilot app before Copilot CLI.');
}

for (const script of ['workshop-doctor.ps1', 'workshop-doctor.sh']) {
  if (!existsSync(join(root, 'scripts', script))) {
    errors.push(`Missing workshop preflight script: scripts/${script}`);
  }
}

for (const path of [
  'labs/copilot-app/1-install-copilot-app.md',
  'labs/cli/01-setup.md',
  'labs/visual-studio/setup.md'
]) {
  const markdown = readFileSync(join(docsRoot, path), 'utf8');
  if (!/GPT-5\.3[ -]Codex/.test(markdown)) {
    errors.push(`Missing GPT-5.3 Codex workshop model guidance: ${path}`);
  }
}

const walk = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path);
    if (entry.isFile() && ['.md', '.mdx'].includes(extname(entry.name))) {
      const markdown = readFileSync(path, 'utf8');
      if (!/^---\r?\n/.test(markdown)) errors.push(`Missing frontmatter: ${path}`);
      if (/]\((?!https?:\/\/)[^)\s]+\.md(?:#[^)]+)?\)/.test(markdown)) {
        errors.push(`Unnormalized Markdown link: ${path}`);
      }
      if (markdown.includes('Add from MCP MCP')) {
        errors.push(`Incorrect MCP Registry label: ${path}`);
      }
      for (const line of findMalformedTaskMarkers(markdown)) {
        errors.push(`Malformed task marker at ${path}:${line}; use [ ] instead of []`);
      }
      for (const image of markdown.matchAll(/!\[[^\]]*]\((?!https?:|data:)([^)\s]+)\)/g)) {
        const imagePath = resolve(path, '..', image[1].split(/[?#]/)[0]);
        if (!existsSync(imagePath)) errors.push(`Missing image ${image[1]} in ${path}`);
      }
    }
  }
};

walk(docsRoot);

for (const [path, check] of Object.entries(knowledgeChecks)) {
  const fullPath = join(docsRoot, 'labs', path);
  if (!existsSync(fullPath)) {
    errors.push(`Missing knowledge-check page: ${path}`);
    continue;
  }
  const markdown = readFileSync(fullPath, 'utf8');
  if (!markdown.includes('## Check your understanding')) {
    errors.push(`Missing knowledge check in ${path}`);
  }
  if (!markdown.includes(check.question) || !markdown.includes(check.sourceUrl)) {
    errors.push(`Incomplete knowledge check in ${path}`);
  }
}

for (const [path, sections] of Object.entries(lessonSections)) {
  const fullPath = join(docsRoot, 'labs', path);
  if (!existsSync(fullPath)) {
    errors.push(`Missing sectioned lesson: ${path}`);
    continue;
  }
  const markdown = readFileSync(fullPath, 'utf8');
  for (const section of sections) {
    if (!markdown.includes(`## ${section.heading}`)) {
      errors.push(`Missing "${section.heading}" section in ${path}`);
    }
  }
}

const visualStudioRoot = join(docsRoot, 'labs', 'visual-studio');
for (const name of readdirSync(visualStudioRoot).filter((name) => /^part\d+.*\.md$/.test(name))) {
  const markdown = readFileSync(join(visualStudioRoot, name), 'utf8');
  const sectionCount = [...markdown.matchAll(/^##\s+/gm)].length;
  if (sectionCount < 2) {
    errors.push(`Visual Studio lesson needs at least two sections: ${name}`);
  }
}

const commitSummaryLesson = readFileSync(
  join(visualStudioRoot, 'part08-commit-summary-descriptions.md'),
  'utf8'
);
if (
  !commitSummaryLesson.includes('## Commit Messages') ||
  !commitSummaryLesson.includes(
    'When creating Commit messages, summarize in a few sentences and then highlight the top 5 changes with emoji and short descriptions'
  )
) {
  errors.push('Visual Studio commit-message custom instructions are missing.');
}
if (commitSummaryLesson.includes('Tools -> Options -> GitHub -> Copilot')) {
  errors.push('Visual Studio commit-message lesson must use copilot-instructions.md, not Tools options.');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Workshop content structure is valid.');
