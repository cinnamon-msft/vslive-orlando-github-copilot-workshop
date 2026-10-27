import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkGithubAdmonitionsToDirectives from 'remark-github-admonitions-to-directives';

const base = process.env.BASE_PATH || '/';
const site = process.env.SITE_URL || 'http://localhost:4321';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [
      [
        remarkGithubAdmonitionsToDirectives,
        {
          mapping: {
            NOTE: 'note',
            TIP: 'tip',
            IMPORTANT: 'note',
            WARNING: 'caution',
            CAUTION: 'danger'
          }
        }
      ]
    ]
  },
  integrations: [
    starlight({
      title: 'VS Live! Orlando × GitHub Copilot',
      description:
        'Four hands-on GitHub Copilot labs for VS Live! Orlando with Kayla Cinnamon and Jon Galloway.',
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/mark.svg',
        replacesTitle: false
      },
      customCss: ['./src/styles/global.css', './src/styles/starlight.css'],
      components: {
        Footer: './src/components/LessonFooter.astro'
      },
      sidebar: [
        { label: 'Workshop home', link: '/' },
        { label: 'Prepare', link: '/prepare/' },
        {
          label: '1 · Copilot App',
          items: [
            { label: 'Lab overview', link: '/labs/copilot-app/' },
            { label: 'Prerequisites', link: '/labs/copilot-app/0-prerequisites/' },
            { label: 'Install the app', link: '/labs/copilot-app/1-install-copilot-app/' },
            { label: 'Guided app tour', link: '/labs/copilot-app/2-guided-tour/' },
            { label: 'First Tailspin session', link: '/labs/copilot-app/3-add-star-rating/' },
            { label: 'Custom instructions', link: '/labs/copilot-app/4-custom-instructions/' },
            { label: 'Build with Autopilot', link: '/labs/copilot-app/5-build-filtering/' },
            { label: 'Playwright MCP', link: '/labs/copilot-app/6-mcp-playwright/' },
            { label: 'Agent Merge', link: '/labs/copilot-app/7-agent-merge/' },
            { label: 'Canvases', link: '/labs/copilot-app/8-canvases/' },
            { label: 'Review', link: '/labs/copilot-app/9-review/' }
          ]
        },
        {
          label: '2 · Copilot CLI',
          items: [
            { label: 'Lab overview', link: '/labs/cli/' },
            { label: 'Setup & context', link: '/labs/cli/01-setup/' },
            { label: 'Plan & scaffold', link: '/labs/cli/02-plan-and-scaffold/' },
            { label: 'Build the game', link: '/labs/cli/03-agent-mode/' },
            { label: 'Design-first theming', link: '/labs/cli/04-design-vibes/' },
            { label: 'Polish & parallel work', link: '/labs/cli/05-polish/' },
            { label: 'Specialized agents', link: '/labs/cli/06-agents/' },
            { label: 'Skills', link: '/labs/cli/07-skills/' },
            { label: 'MCP servers', link: '/labs/cli/08-mcp/' },
            { label: 'Bonus', link: '/labs/cli/09-bonus/' }
          ]
        },
        {
          label: '3 · VS Code',
          items: [
            { label: 'Lab overview', link: '/labs/vscode/' },
            { label: 'Setup & context engineering', link: '/labs/vscode/01-setup/' },
            { label: 'Design-first frontend', link: '/labs/vscode/02-design/' },
            { label: 'Custom Quiz Master', link: '/labs/vscode/03-quiz-master/' },
            { label: 'Multi-agent development', link: '/labs/vscode/04-multi-agent/' },
            { label: 'Completion & next steps', link: '/labs/vscode/05-complete/' }
          ]
        },
        {
          label: '4 · Visual Studio 2026',
          items: [
            { label: 'Lab overview', link: '/labs/visual-studio/' },
            { label: 'Setup', link: '/labs/visual-studio/setup/' },
            { label: 'Explore the codebase', link: '/labs/visual-studio/part00-exploring-codebase/' },
            { label: 'Code completion', link: '/labs/visual-studio/part01-code-completion/' },
            { label: 'Inline chat', link: '/labs/visual-studio/part02-enhancing-ui/' },
            { label: 'Reference files', link: '/labs/visual-studio/part03-referencing-files/' },
            { label: 'Custom instructions', link: '/labs/visual-studio/part04-custom-instructions/' },
            { label: 'Copilot Agent', link: '/labs/visual-studio/part05-implementing-features/' },
            { label: 'Copilot Vision', link: '/labs/visual-studio/part06-copilot-vision/' },
            { label: 'Debugging', link: '/labs/visual-studio/part07-debugging-with-copilot/' },
            { label: 'Commit summaries', link: '/labs/visual-studio/part08-commit-summary-descriptions/' },
            { label: 'MCP servers', link: '/labs/visual-studio/part09-mcp/' },
            { label: 'Planning mode', link: '/labs/visual-studio/part10-planning-mode/' },
            { label: 'Prompt files', link: '/labs/visual-studio/part11-reusable-prompts/' },
            { label: 'Delegate to cloud', link: '/labs/visual-studio/part12-delegate-to-cloud/' }
          ]
        },
        { label: 'Resources & attribution', link: '/resources/' }
      ]
    })
  ]
});
