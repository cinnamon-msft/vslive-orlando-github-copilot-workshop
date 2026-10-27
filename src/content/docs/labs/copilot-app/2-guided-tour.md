---
title: "Lesson 2 - Guided tour of the Copilot app"
description: "Build and publish a space quiz, take an issue through review, create a weekly automation, and explore a Canvas extension."
authors:
  - geektrainer
lastUpdated: 2026-09-16
---

Before working in the Tailspin Toys project, you'll take a fast, end-to-end tour of the GitHub Copilot app. You'll create a standalone site in a new folder, watch it update in the integrated browser, publish it to GitHub, create a backlog, carry one idea through a pull request and code review, create and run a weekly issue-review automation, and install a Canvas extension to start work by moving a card on the canvas.

In this lesson, you will:

- create a local project from the **New** tab.
- use the **Auto** model in **Interactive** mode.
- build and polish a small site in the integrated browser.
- publish the project and create issues with the agent.
- start an isolated session from an issue.
- open a pull request, request a Copilot review, and resolve feedback.
- create and run a weekly issue-review automation.
- install a Canvas extension and start work by moving a card on the canvas.

## Start from the New tab

1. Open the GitHub Copilot app.
2. Confirm you are signed in to GitHub. If the app shows **Sign in to GitHub**, select it and complete the browser flow.
3. Select the **New** tab in the sidebar.
4. In the project selector, choose **Local folder or repository**, then create or select an empty folder named `space-quiz`.
5. Under the prompt box, set the session mode to **Interactive**. This turns off **Autopilot** so the agent pauses when it needs your input.
6. In the model picker, select **GPT-5.3-Codex** if it is available. If it is not listed, select **Auto**.
7. Confirm the workspace option is set to the local `space-quiz` folder.

> [!NOTE]
> The model picker is separate from the session mode. For this tour, use **GPT-5.3-Codex** when available, with **Auto** as the fallback, and keep the session in **Interactive** mode.

## Build the space quiz

Paste the following prompt and send it:

```plaintext
Create a space exploration quiz with 10 questions, a progress bar, score counter, and colorful animated feedback (green for correct, red shake for wrong). Show a results screen with emoji reaction at the end. Center in a narrow column. Single index.html, no server/dependencies. Polished, sans-serif, 14–16px body, prefers-color-scheme. Open in the integrated browser.
```

Follow the agent's activity as it creates `index.html` and opens the result in the integrated browser. Play through a few questions and confirm that the progress bar, score, correct state, and incorrect shake all work.

Because the project is a single HTML file with no dependencies, the browser can open it directly. You don't need to install packages or start a server.

## Focus on the code

Use the layout controls to make more room for the code:

1. Collapse the left sidebar.
2. Collapse the right-side browser panel.
3. Review the generated `index.html` in the expanded code area.
4. Restore both side areas before continuing.

## Pick an element and polish it

The integrated browser is part of the agent workflow: you can select something you see, describe the change, and watch the browser refresh after the agent edits the file.

1. In the browser toolbar, choose the element picker.
2. Select the quiz's main heading or answer area.
3. In the prompt box, describe one visual change. For example:

   ```plaintext
   Make the selected element feel more like a mission-control display. Keep it accessible and preserve the existing light and dark themes.
   ```

4. Send the prompt and watch the agent update `index.html`.
5. Confirm the selected element refreshes in the browser without you reopening the page.

Try one or two follow-up prompts of your own. Good options include:

```plaintext
Add a subtle star-field background that respects prefers-reduced-motion.
```

```plaintext
Make the results screen more celebratory when the score is 8 or higher.
```

```plaintext
Improve keyboard focus states and verify the quiz can be completed without a mouse.
```

## Publish the project to GitHub

Now turn the local experiment into a GitHub project. Send this prompt:

```plaintext
Initialize this folder as a Git repository, create an initial commit, and create a new public GitHub repository named space-quiz in my account. Push the current branch and set it as the default branch. Refresh the project within this app so the GitHub project is linked.
```

Review and approve any confirmation the agent requests before it creates the repository or pushes code. When it finishes, open the repository link and confirm `index.html` is on GitHub.

> [!TIP]
> You can add any of your own GitHub repositories as projects. Select the **+** next to **Sessions** in the sidebar, choose **GitHub repository**, then search for the repository you want to clone and connect.

## Create a small backlog

Ask the agent to inspect what you built and turn three improvements into issues:

```plaintext
Review the space quiz and suggest three focused feature ideas that could each be completed in a short session. Create a separate GitHub issue for each idea with a clear title, user-focused description, and acceptance criteria. Do not implement them yet.
```

After the agent creates the issues:

1. Select **My work** in the sidebar.
2. Find the three new `space-quiz` issues.
3. Open each issue and compare its scope and acceptance criteria.
4. Choose one issue to implement.

## Start an isolated session from an issue

1. Open your chosen issue in **My work**.
2. Select **New session**.
3. Choose a **new worktree** when the app asks where the session should run. The app creates an isolated branch and working directory for this task.
4. Set the session mode to **Interactive** and the model to **GPT-5.3-Codex** if available, or **Auto** as the fallback.
5. Send this prompt:

   ```plaintext
   Implement this issue completely. Keep the single-file, dependency-free design, test the behavior in the integrated browser, and summarize the changes when finished.
   ```

6. Review the agent's changes in the diff view.
7. Open the integrated browser and verify the new feature yourself.

## Open and review the pull request

1. Select **Create PR** in the session toolbar.
2. Review the generated title and description, then let the agent create the pull request.
3. Open the pull request on github.com.
4. In the **Reviewers** menu, request a review from **Copilot**.
5. Wait for the Copilot code review to finish, then read every comment in the **Files changed** tab.

Return to the pull request in the Copilot app. For two actionable review comments:

1. Find the comment in the pull request activity.
2. Select the Copilot **Fix** action.
3. Review the proposed change and let the agent apply it.
4. Recheck the relevant behavior in the integrated browser.
5. Reply to the comment with what changed, then resolve the conversation.

If Copilot leaves fewer than two actionable comments, fix all of the actionable comments it provides rather than making unnecessary changes.

## Create a weekly automation

Create an automation that reviews recently created issues on a weekly schedule:

1. Select the **Automations** tab.
2. From **Templates**, choose the option to create a new weekly automation.
3. Enter this prompt:

   ```plaintext
   Reviews the latest GitHub issues created and are open in the last week, and provide a summary table ranked by severity and priority
   ```

4. Set the session mode to **Autopilot**.
5. Set the model to **Auto**.
6. Select the new `space-quiz` project.
7. Open the **Create** dropdown and choose **Create and run**.
8. Confirm the automation starts and is saved to run weekly.

## Explore a Canvas extension

A canvas is a shared interactive work surface that opens alongside a session in the GitHub Copilot app. It can represent a Kanban board, plan, checklist, dashboard, document, or another purpose-built interface. Canvases are bidirectional: people and agents can read and update the same state, and a canvas can expose actions such as adding or moving cards.

Canvas extensions package reusable surfaces that can be installed and opened in new sessions. Canvases help you inspect and steer work visually instead of relying only on chat prompts.

1. Browse the [Canvas extensions gallery][canvas-gallery].
2. Open the [Repository Issues Kanban extension][accessibility-kanban].
3. Notice that it presents repository issues as a Kanban board for planning, tracking, and completing accessibility remediation work.
4. Select **Install in GitHub Copilot app** and approve the installation.
5. In the Copilot app, open **Customize**, select **Canvas**, and confirm **Repository Issues Kanban** is installed.
6. Select **New session** for the canvas.
7. Choose the `space-quiz` project if prompted.
8. Confirm the new session opens with the canvas in the right-side panel.
9. Explore the board and open a card to inspect its issue details and actions.
10. Drag an issue card into the active-work column.
11. Notice that this automatically creates a new agent session for the issue.
12. Open the generated session from the sidebar and notice that the issue context is already available.

## Summary and next steps

You've completed a full tour of the GitHub Copilot app:

- created a project from the New tab with GPT-5.3-Codex or the Auto fallback in Interactive mode.
- built and polished a site while watching changes in the integrated browser.
- published a local folder as a GitHub repository.
- created three issues and started an isolated worktree from one.
- opened a pull request, requested a Copilot review, and resolved feedback with the agent.
- created and ran a weekly issue-review automation.
- installed a Canvas extension and used its Kanban board to create a session from an issue.

Next, you'll create your Tailspin Toys repository and begin the main workshop scenario. Continue to [Lesson 3 - Running your first Tailspin agent session][next-lesson].

## Resources

- [Getting started with the GitHub Copilot app][getting-started]
- [Working with agent sessions][agent-sessions]
- [Managing issues and pull requests][managing-issues-prs]
- [About Copilot code review][code-review]
- [Working with Canvas extensions][canvas-docs]
- [Canvas extensions gallery][canvas-gallery]

[next-lesson]: ../3-add-star-rating/
[getting-started]: https://docs.github.com/copilot/how-tos/github-copilot-app/getting-started
[agent-sessions]: https://docs.github.com/copilot/how-tos/github-copilot-app/agent-sessions
[managing-issues-prs]: https://docs.github.com/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests
[code-review]: https://docs.github.com/copilot/concepts/code-review/code-review
[canvas-docs]: https://docs.github.com/copilot/how-tos/github-copilot-app/working-with-canvas-extensions
[canvas-gallery]: https://awesome-copilot.github.com/extensions/
[accessibility-kanban]: https://awesome-copilot.github.com/extension/accessibility-kanban/
