---
title: "Lesson 3 - Running your first agent session"
description: "Continue in your space quiz repository, implement an issue in an isolated agent session, review the changes, and merge a pull request."
authors:
  - geektrainer
lastUpdated: 2026-11-06
---

In the guided tour, you created the `space-quiz` project, published it to GitHub, and shipped one improvement. Now you'll keep working in that same repository, using an issue to start an **agent session** and implement another focused change.

In this lesson, you will:

- start a session from an open issue and learn how a session is structured.
- ask the agent to make a focused change to the space quiz.
- review the change in the workspace diff view.
- check the updated quiz in the integrated browser.
- open and merge a pull request.

## Choose an issue

The guided tour created a small backlog of space quiz improvements. In **My work**, choose an open issue that is small enough to complete in one session. If you already implemented all three ideas, create a new issue for a modest improvement, such as adding a question category selector or a restart button. Keep this lesson focused on the session workflow rather than a particular feature.

## Anatomy of a session

A **session** is a conversation with an agent that runs in its own isolated workspace. Every session gets a **dedicated git worktree and branch**, which is what lets you run several sessions at once — one adding a feature, another fixing a bug — without their changes colliding. Your sessions appear in the sidebar grouped by repository; select any one to switch to it.

Inside a session you'll see three things: the **conversation** with the agent, the agent's **tool activity** as it explores and edits files, and the list of **changed files** with their diffs.

## Start a session and request the change

1. In **My work**, open the issue you chose.
2. Select **New session** in the upper right.
3. Choose a **new worktree** when the app asks where the session should run.
4. Confirm `space-quiz` is the selected repository and set the session mode to **Interactive**.
5. Send the following prompt. The issue is already in the session's context:

   ```plaintext
   Implement this issue in the space quiz. First inspect the project and identify the smallest appropriate change. Preserve the single-file, dependency-free design in index.html, keep the existing accessibility and color-scheme behavior, and don't add frameworks or dependencies. After implementing it, open the quiz in the integrated browser and verify the behavior against the issue's acceptance criteria. Summarize the files changed and any checks you ran.
   ```

Copilot creates the worktree, explores the repository, and implements the change. Review its plan and tool activity as it works; ask it to narrow the scope if it starts making unrelated changes.

## Review the diff

All AI-generated changes deserve a review before they're merged. Let's explore the changes in the Copilot app.

1. In the upper right-hand corner of the app, select **Toggle review panel** to open the diff screen.

   ![The GitHub Copilot app top toolbar with an arrow pointing to the Toggle review panel button to the right of Create PR](../_images/app-2-review-panel.png)

2. Review every changed file. For this project, the feature should normally be contained in `index.html`; check that the agent preserved existing quiz behavior and did not add unnecessary dependencies or files.
3. Open the integrated browser and try the changed behavior yourself. Check the issue's acceptance criteria, keyboard interaction, and any relevant light or dark theme states.
4. If something is missing, ask the agent to fix it, then review the updated diff and test again.

## Open and merge the pull request

Your change looks good — now it's time to ship it. Ask the agent to open a pull request, then review and merge it yourself on GitHub.

1. In the upper right-hand corner, select **Create PR**.
2. If prompted, select **Sign in with your browser** and follow the prompts to authenticate.
3. Review the generated title and description, then let the agent create the pull request.
4. Select the **PR** bubble above chat to open the pull request in the review pane.
5. Review the pull request and its checks on GitHub.
6. When you're satisfied, select **Merge pull request**.

You've shipped another improvement to the space quiz!

## Summary and next steps

You continued working in the same project and shipped an issue-backed change. Specifically, you:

- started an isolated session from an issue.
- directed the agent to make a small, focused change to `index.html`.
- reviewed the change in the workspace diff view.
- verified the behavior in the integrated browser.
- opened a pull request and merged it on GitHub.

Next, you'll add custom instructions to guide future work in this repository. Continue to [Lesson 4 - Guiding Copilot with custom instructions][next-lesson].

## Check your understanding

Why does each agent session use its own git worktree, and why should you review the session's diff?

<details>
<summary>Check your answer</summary>

A dedicated worktree and branch isolate one session's edits from other sessions, allowing several agents to work in parallel without colliding. The diff is your checkpoint for confirming the implementation, file scope, and project conventions before the changes reach a pull request. Isolation makes parallel work possible; review keeps the developer accountable for the result.

**Go deeper:** [Work with agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions).

</details>

## Resources

- [Working with agent sessions in the GitHub Copilot app][agent-sessions]
- [About the GitHub Copilot app][about-copilot-app]
- [Managing issues and pull requests with the GitHub Copilot app][managing-issues-prs]

[next-lesson]: ../4-custom-instructions/
[agent-sessions]: https://docs.github.com/copilot/how-tos/github-copilot-app/agent-sessions
[about-copilot-app]: https://docs.github.com/copilot/concepts/agents/github-copilot-app
[managing-issues-prs]: https://docs.github.com/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests
