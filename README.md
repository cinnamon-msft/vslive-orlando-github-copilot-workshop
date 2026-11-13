# Live! 360 Tech Con 2026 · GitHub Copilot Workshop

[Workshop site (after enabling GitHub Pages)](https://cinnamon-msft.github.io/vslive-orlando-github-copilot-workshop/)

This is the unified hands-on workshop for Live! 360 Tech Con 2026 in Orlando, Florida, with Kayla Cinnamon and Jon Galloway.
It brings four GitHub Copilot experiences into one guided site, starting with Visual Studio,
continuing through the Copilot app and VS Code, and finishing with an optional CLI bonus lab.

Adapted for Live! 360 Tech Con 2026 from the [original workshop](https://github.com/jamesmontemagno/vslive-github-copilot-workshop), with its history and source attribution preserved.

## Workshop path

The day opens with a short kickoff on the state of GitHub Copilot, followed by three numbered core
labs in this order:

1. **Lab 1 · Visual Studio 2026** — Explore GitHub Copilot features in Visual Studio, from completions and
   chat through MCP, planning, and cloud delegation.
2. **Lab 2 · GitHub Copilot app** — Practice the software development lifecycle with the Copilot app,
   including planning, agent work, code review, and extensibility.
3. **Lab 3 · VS Code** — Transform Bingo Mixer with context engineering, design-first development,
   custom agents, and multi-agent workflows.
**Bonus · GitHub Copilot CLI** — Use Copilot from the terminal to plan, scaffold, refine, and
   automate software work.

Each lab includes hands-on instructions and progress tracking; selected lessons also include
knowledge checks. Complete Labs 1–3 in order for the intended progression, then explore the CLI
bonus lab or use the navigation to revisit a specific capability.

## What you need

- A GitHub account with Copilot access. The Copilot app lessons require Copilot Student or a paid plan; see the lab prerequisites.
- Node.js 22 or 24.
- Git and a modern browser.
- Visual Studio Code 1.135 or later with the GitHub Copilot extension for the VS Code lab.
- Visual Studio 2026 with the web workload for the Visual Studio lab. This lab requires Windows.

The workshop pages contain the current product and installation links for each track.

## Repository layout

| Path | Purpose |
| --- | --- |
| `src/content/docs/` | The published workshop lessons and supporting pages. |
| `scripts/` | Content validation and reproducible workshop-import tooling. |

The runnable projects live in their own public repositories: [Mona Mayhem](https://github.com/jamesmontemagno/workshop-mona-mayhem), [Bingo Mixer](https://github.com/copilot-dev-days/agent-lab-typescript), and [TinyShop](https://github.com/jamesmontemagno/workshop-tinyshop). The Copilot app lab creates a standalone `space-quiz` project and uses that same repository throughout.

## Workshop sources

The combined content is based on pinned upstream workshop sources listed in
`workshops.sources.json`. The import process normalizes them for this event and preserves
event-specific curriculum additions.

The pinned repositories and commits for all four tracks are recorded in `workshops.sources.json`.
The Copilot app lessons adapt the pinned `github-samples/copilot-workshops` source and include
event-specific guided-tour overlays in `scripts/workshop-overlays/copilot-app/`.

```console
npm run import:workshops -- --tracks copilot-app,vscode
```

This refreshes the Copilot app and VS Code lessons without rewriting the CLI and Visual Studio
lessons. Omit `--tracks` to regenerate every track from its pinned source. Review every imported diff
and run the full validation after changing a source pin.

## Live workshop

Enable GitHub Pages in **Settings → Pages**, selecting **GitHub Actions** as the source. The deployment workflow supports the `workshop-orlando` default branch (repository rules prevented creating `main`) and `main`. After deployment, the workshop is available at
[cinnamon-msft.github.io/vslive-orlando-github-copilot-workshop](https://cinnamon-msft.github.io/vslive-orlando-github-copilot-workshop/).

## Run locally

```console
npm install
npm run dev
```

To validate a local build:

```console
npm run check
npm run build
```
