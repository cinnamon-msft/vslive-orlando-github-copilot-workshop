# VS Live! Orlando · GitHub Copilot Workshop

[Open the live workshop site](https://cinnamon-msft.github.io/vslive-orlando-github-copilot-workshop/)

This is the unified hands-on workshop for VS Live! Orlando with Kayla Cinnamon and James Montemagno.
It brings four GitHub Copilot experiences into one guided site, so attendees can begin with the
Copilot app and progress through the terminal, VS Code, and Visual Studio.

Adapted from [James Montemagno's original workshop](https://github.com/jamesmontemagno/vslive-github-copilot-workshop), with its history and source attribution preserved.

## Workshop path

The workshop is designed as a progressive, practical day of learning:

1. **Kickoff** — A short look at the state of GitHub Copilot and what is now possible.
2. **GitHub Copilot app** — Practice the software development lifecycle with the Copilot app,
   including planning, agent work, code review, and extensibility.
3. **GitHub Copilot CLI** — Use Copilot from the terminal to plan, scaffold, refine, and automate
   software work.
4. **VS Code** — Transform Bingo Mixer with context engineering, design-first development,
   custom agents, and multi-agent workflows.
5. **Visual Studio 2026** — Explore GitHub Copilot features in Visual Studio, from completions and
   chat through MCP, planning, and cloud delegation.

Each lesson includes prerequisites, hands-on instructions, progress tracking, and selected
knowledge checks. Complete the tracks in order for the intended progression, or use the navigation
to revisit a specific capability.

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

The runnable projects live in their own public repositories: [Mona Mayhem](https://github.com/jamesmontemagno/workshop-mona-mayhem), [Bingo Mixer](https://github.com/copilot-dev-days/agent-lab-typescript), and [TinyShop](https://github.com/jamesmontemagno/workshop-tinyshop). The Copilot app lab starts with a standalone `space-quiz` guided tour, then uses the separate [Tailspin Toys template](https://github.com/github-samples/tailspin-toys).

## Workshop sources

The combined content is based on pinned upstream workshop sources listed in
`workshops.sources.json`. The import process normalizes them for this event and preserves
event-specific curriculum additions.

The Copilot App and VS Code lessons follow the [NDC Oslo workshop](https://github.com/jamesmontemagno/ndc-oslo-copilot-workshop) at commit `b840aa995c1bf3ba7028af30e387ff17c6a3e11b`, including its pinned sources, lesson numbering, and Copilot App guided-tour overlays in `scripts/workshop-overlays/`.

```console
npm run import:workshops
```

Review every imported diff and run the full validation after changing a source pin.

## Live workshop

The published workshop is available at
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
