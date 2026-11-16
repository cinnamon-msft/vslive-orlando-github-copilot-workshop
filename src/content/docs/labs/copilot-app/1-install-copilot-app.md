---
title: "Lesson 1 - Installing the GitHub Copilot app"
description: "Install the GitHub Copilot app, sign in, and get oriented in the workspace."
authors:
  - geektrainer
lastUpdated: 2026-11-16
---

The **[GitHub Copilot app][about-copilot-app]** is a desktop application for agent-driven development. It is built on GitHub Copilot CLI and integrates natively with GitHub, so your repositories, branches, and CI pipelines work out of the box. It's designed for workflows where you direct several agents in parallel — each in its own isolated workspace — rather than doing all of the work yourself. With the prerequisites ready, the next step is to install the app and sign in.

In this lesson, you will:

- install the GitHub Copilot app and sign in.
- get oriented in the app's main workspace.
- try **Chats** to learn about the app itself.

## Scenario

Your team is adopting AI agents to work through a growing backlog. The Copilot app gives you one place to direct that work — picking up issues, running agents, reviewing changes, and merging pull requests. This lesson gets you installed, authenticated, and comfortable starting a conversation.

> [!NOTE]
> An eligible Copilot plan is required — Copilot Student or any paid plan (Pro, Pro+, Business, or Enterprise). If you are on Copilot Business or Copilot Enterprise, your administrator must enable the **Copilot CLI** policy before the app will work.

## Install and configure the GitHub Copilot app

Versions of the GitHub Copilot app are available for Windows, macOS, and Linux. Let's install the app and authenticate.

1. In a browser, open the [landing page for the GitHub Copilot app][download-app].
2. Download the app for your platform and install it following the instructions provided on the landing page.
3. Open the app once it's installed.
4. Select **Sign in to GitHub** and follow the prompts to authenticate. If you use GitHub Enterprise Server, choose **Use GitHub Enterprise** and enter your server address when prompted.
5. After authenticating, you may be asked to connect a repository or local folder. Skip this step for now; you'll create a fresh local project in the next lesson.
6. When prompted for a theme, select the one which brings you the most joy, then select **Finish**.

When you start your first session in the next lesson, select **Copilot Fusion** in the model picker.

> [!NOTE]
> If the app opens to the sign-in screen later, select **Sign in to GitHub** and complete authentication before continuing.

## Get oriented in the workspace

With your project connected, take a moment to learn your way around. The sidebar provides these main destinations:

- **New** — start a chat or agent session. The composer lets you choose the session mode, model, and where the work runs.
- **Pull requests** and **Issues** — browse GitHub work from the app's native integration.
- **Dashboards** — view project dashboards.
- **Automations** — saved agent tasks that run on a schedule or on demand. You'll create one near the end of the lab.
- **Customize** — configure the app and its extensions.
- **Projects** — open a connected repository or local workspace. The projects you add appear here for quick access.
- **Sessions** — return to chats and repository sessions. Each agent session runs in its own isolated workspace, so you can run several at once without their changes colliding.

## Try a chat

A great way to get comfortable with the app is to use it to learn about the *app itself*. **Chats** let you ask a question or brainstorm without creating a repository worktree, so they're perfect for a fast, throwaway question.

1. In the sidebar, select **Chats** under **Sessions**.
2. Ask the app how its own sessions work:

   ```plaintext
   How does the GitHub Copilot app use worktrees?
   ```

3. Read the response in the conversation view. You'll see that each session runs in its own isolated git worktree — the detail that lets you run several agents in parallel without their changes colliding. You can continue the conversation or start a new chat at any time.

## Summary and next steps

Congratulations! You've installed the GitHub Copilot app and explored your workspace. You learned how to:

- install the app and sign in to GitHub.
- get oriented in the workspace.
- use **Chats** to ask a fast, throwaway question.

Next, you'll take a guided tour through the app's core workflow by building and shipping a standalone space quiz. Continue to [Lesson 2 - Guided tour of the Copilot app][next-lesson].

## Resources

- [About the GitHub Copilot app][about-copilot-app]
- [Getting started with the GitHub Copilot app][getting-started]
- [Working with agent sessions in the GitHub Copilot app][agent-sessions]

[ex0]: ../0-prerequisites/
[next-lesson]: ../2-guided-tour/
[about-copilot-app]: https://docs.github.com/copilot/concepts/agents/github-copilot-app
[getting-started]: https://docs.github.com/copilot/how-tos/github-copilot-app/getting-started
[agent-sessions]: https://docs.github.com/copilot/how-tos/github-copilot-app/agent-sessions
[download-app]: https://gh.io/app
