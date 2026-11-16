---
title: "Lab 1 · Visual Studio 2026"
description: "Use advanced GitHub Copilot features while completing the TinyShop solution."
---

**90 minutes · Windows required · [Visual Studio 2026 version 18.12 or later](https://visualstudio.microsoft.com/vs/) + .NET SDK 10 or 11**

Work through a partially completed TinyShop application with a .NET backend and Blazor frontend. You will use Copilot for code completion, agentic implementation, vision, debugging, MCP, planning, reusable prompts, and cloud delegation.

The TinyShop starter on `main` targets .NET 10 and rolls forward to the .NET 11 runtime when .NET 10 is unavailable.

## Starter

```powershell
git clone https://github.com/jamesmontemagno/workshop-tinyshop.git
start workshop-tinyshop\src\TinyShop.sln
```

Open `src/TinyShop.sln` in [Visual Studio 2026](https://visualstudio.microsoft.com/vs/). The starter is on `main`; use `git switch completed` to inspect the finished solution.

## Lessons

Start with [Workshop setup](./setup/), then follow the lessons in order:

- [Part 00: Explore the codebase](./part00-exploring-codebase/)
- [Part 01: Code completion with ghost text](./part01-code-completion/)
- [Part 02: Reference code files in chat](./part03-referencing-files/)
- [Part 03: Use custom instructions](./part04-custom-instructions/)
- [Part 04: Implement features with Copilot Agent](./part05-implementing-features/)
- [Part 05: Use Copilot Vision](./part06-copilot-vision/)
- [Part 06: Debug with Copilot](./part07-debugging-with-copilot/)
- [Part 07: Create commit summaries](./part08-commit-summary-descriptions/)
- [Part 08: Connect MCP servers](./part09-mcp/)
- [Part 09: Plan with /plan](./part10-planning-mode/)
- [Part 10: Create reusable prompt files](./part11-reusable-prompts/)
- [Part 11: Delegate to the cloud](./part12-delegate-to-cloud/)

Source: [dotnet-presentations/visual-studio-github-copilot-lab](https://github.com/dotnet-presentations/visual-studio-github-copilot-lab)
