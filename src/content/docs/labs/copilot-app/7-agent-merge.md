---
title: "Lesson 7 - Merging with Agent Merge"
description: "Open the space quiz feature pull request, review it in My work, and let Agent Merge address blockers and merge it for you."
authors:
  - geektrainer
lastUpdated: 2026-07-09
---

Your space quiz feature is built, verified, and seen working in a browser. The last step is to merge it. You've opened and merged changes yourself earlier in the lab. This time you'll let the app do the heavy lifting with **Agent Merge**, which shepherds a pull request through its whole lifecycle from inside the app.

In this lesson, you will:

- learn what Agent Merge is and how it automates the merge lifecycle.
- enable Agent Merge on your space quiz feature session.
- watch it create the pull request, run CI, and merge when everything is green.

## Scenario

Over the last few modules you've explored various levels of automation, from creating code to allowing Copilot to validate a UI directly. Now you'll see how a thoroughly reviewed and validated space quiz change can be merged with **Agent Merge**.

## Introducing Agent Merge

**Agent Merge** allows automation of the last mile of landing a pull request via Copilot app. When you enable it, the app's session reads your pull request, addresses what's blocking it — fixing failing CI checks, responding to review comments, rebasing when needed — and merges it as soon as GitHub allows. It runs in the background, survives app restarts, and turns itself off once your pull request is merged.

Up to this point you've been the one clicking **Merge pull request** on github.com. Agent Merge shifts that responsibility to the agent so you can move on to the next task while it shepherds the PR through to completion. You still review and approve the work — the agent just handles the mechanical finish line.

## Use Agent Merge to manage the PR

You've reviewed the code manually, checked the available project validations, and allowed Copilot to explore the UI. Now it's time to merge the change! Let's allow Agent Merge to shepherd the PR through its checks and merge process.

1. Return to the session you kept open from the previous lesson where you implemented the space quiz feature.
2. In the upper right-hand corner, select the dropdown next to **Create PR**.
3. Select **Agent merge** to enable agent merge.

   ![The Create PR dropdown in the GitHub Copilot app expanded, with an arrow pointing to the Agent merge option](../_images/app-enable-agent-merge.png)

4. The button text now changes to **Agent merge**.
5. Select the **Agent merge** button to start the agent merge process.

Copilot app begins creating and managing the PR. It explores the project to determine how best to create a PR, then creates it.

After a few moments, Copilot checks the pull request's status, including reviews, configured status checks, and whether GitHub considers the PR mergeable. This small project may not have CI checks configured; Agent Merge can still show the available conditions and whether GitHub allows the merge.

6. Allow agent merge to merge the pull request by selecting the dropdown next to **Agent merge** then **Merge pull request**.

   ![The Agent merge dropdown showing the agent's allowed actions — Address reviews, Fix CI failures, Resolve conflicts — with an arrow pointing to Merge pull request](../_images/app-agent-merge-merge.png)

7. Once the pull request is mergeable, Copilot will complete the merge. If checks are configured, wait for them to pass before proceeding.

## Summary and next steps

You've automated several parts of the development process, including generating code, validating the result, and now the pull request process. You:

- learned what Agent Merge is and how it automates the merge lifecycle.
- enabled Agent Merge on your space quiz feature session.
- watched it create the pull request, run CI, and merge when everything was green.

Next, you'll explore **canvases** — a richer way to plan and visualize work with the agent. Continue to [Lesson 8 - Planning with canvases][next-lesson].

## Check your understanding

What does Agent Merge automate, and what responsibility does the developer retain?

<details>
<summary>Check your answer</summary>

Agent Merge handles the mechanical pull-request finish line: monitoring checks and reviews, addressing blockers, resolving conflicts when possible, and merging when GitHub allows. The developer still reviews the code and decides whether the change is acceptable. Automation removes coordination work, not ownership of code quality.

**Go deeper:** [Manage pull requests with Agent Merge](https://docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests).

</details>

## Resources

- [Managing issues and pull requests with the GitHub Copilot app][managing-issues-prs]
- [About the GitHub Copilot app][about-copilot-app]

[next-lesson]: ../8-canvases/
[managing-issues-prs]: https://docs.github.com/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests
[about-copilot-app]: https://docs.github.com/copilot/concepts/agents/github-copilot-app
