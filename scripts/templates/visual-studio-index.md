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

1. [Workshop setup](./setup/)
2. [Explore the codebase](./part00-exploring-codebase/)
3. [Code completion with ghost text](./part01-code-completion/)
4. [Reference code files in chat](./part03-referencing-files/)
5. [Use custom instructions](./part04-custom-instructions/)
6. [Implement features with Copilot Agent](./part05-implementing-features/)
7. [Use Copilot Vision](./part06-copilot-vision/)
8. [Debug with Copilot](./part07-debugging-with-copilot/)
9. [Create commit summaries](./part08-commit-summary-descriptions/)
10. [Connect MCP servers](./part09-mcp/)
11. [Plan with /plan](./part10-planning-mode/)
12. [Create reusable prompt files](./part11-reusable-prompts/)
13. [Delegate to the cloud](./part12-delegate-to-cloud/)

Source: [dotnet-presentations/visual-studio-github-copilot-lab](https://github.com/dotnet-presentations/visual-studio-github-copilot-lab)
