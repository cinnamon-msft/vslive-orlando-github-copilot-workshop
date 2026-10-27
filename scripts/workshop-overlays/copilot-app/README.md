---
title: "GitHub Copilot app"
authors:
  - geektrainer
lastUpdated: 2026-08-06
---

> [!NOTE]
> This lab starts with a standalone `space-quiz` project for a guided tour, then uses the separate [Tailspin Toys template repository](https://github.com/github-samples/tailspin-toys) for the remaining lessons.

The **[GitHub Copilot app](https://docs.github.com/copilot/concepts/agents/github-copilot-app)** is a desktop application built on Copilot CLI that brings agent-driven development into a single, focused workspace. It adds parallel agent sessions, switchable session modes, shared canvases, and native GitHub issue and pull request management — including **Agent Merge**, which shepherds a pull request through rebases, review feedback, CI fixes, and merge.

Across these lessons you'll install the app, build and ship a standalone space quiz through a guided tour, then move into the Tailspin Toys project and its seeded backlog. You'll start with a small Tailspin change — adding a star rating — then add a custom instructions standard from an issue, build a filtering feature in an isolated agent session, and verify it with a reusable skill. You'll add the Playwright MCP server to explore the feature in a real browser, then climb a ladder of merge automation that ends with **Agent Merge** landing your pull request. Finally you'll collaborate on a shared canvas and automate recurring work — a complete loop from idea to merged feature.

## Lessons

| Lesson | Topic | Description |
|--------|-------|-------------|
| [0. Prerequisites][ex0] | Setup | Confirm Git and install Node.js |
| [1. Install the Copilot app][ex1] | Setup | Install the app, sign in, and get oriented in the workspace |
| [2. Guided tour of the Copilot app][tour] | Guided tour | Build, polish, publish, and review a standalone space quiz |
| [3. Running your first Tailspin agent session][ex3] | First change | Create the Tailspin project and ship a small change |
| [4. Guiding Copilot with custom instructions][ex4] | Context | Add a documentation standard from an issue and merge it |
| [5. Building a feature with Autopilot][ex5] | Core Feature | Use Plan and Autopilot to build filtering, then verify it with a skill |
| [6. Testing with Playwright MCP][ex6] | External Tools | Add the Playwright MCP server and explore your feature in a browser |
| [7. Merging with Agent Merge][ex7] | Merge | Let Agent Merge fix and land your filtering pull request |
| [8. Planning with canvases][ex8] | Collaboration | Create a shared canvas to plan and track your work |
| [9. Review and next steps][ex9] | Summary | Automate recurring tasks and explore what's next |

## Prerequisites

Before attending this workshop, please ensure you have:

- [ ] A GitHub account with an active **Copilot Student, Pro, Pro+, Business, or Enterprise** plan
- [ ] A computer running **macOS, Linux, or Windows**
- [ ] [Git installed][install-git] on your computer
- [ ] [Node.js 22 or newer][nodejs] installed on your computer

> [!TIP]
> No paid plan? Verified students can get GitHub Copilot for free through [GitHub Education][callout-student-plan-education]. The **Copilot Student** plan includes the agent, MCP, code review, and Copilot CLI features this workshop uses — so you can complete every harness with it.

> [!NOTE]
> Because the Copilot app runs on your own machine rather than in a codespace, [Lesson 0][ex0] walks you through installing the local prerequisites before you install the app.

> [!NOTE]
> If you are using Copilot Business or Copilot Enterprise, your administrator must enable the **Copilot CLI** policy before you can use the app.

## Get Started

**[Start with Lesson 0: Prerequisites →][ex0]**

[ex0]: 0-prerequisites/
[ex1]: 1-install-copilot-app/
[tour]: 2-guided-tour/
[ex3]: 3-add-star-rating/
[ex4]: 4-custom-instructions/
[ex5]: 5-build-filtering/
[ex6]: 6-mcp-playwright/
[ex7]: 7-agent-merge/
[ex8]: 8-canvases/
[ex9]: 9-review/
[install-git]: https://github.com/git-guides/install-git
[nodejs]: https://nodejs.org/
[callout-student-plan-education]: https://github.com/education/students
