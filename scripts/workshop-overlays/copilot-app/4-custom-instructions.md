---
title: "Lesson 4 - Guiding Copilot with custom instructions"
description: "Add repository-wide Copilot instructions to the space quiz and see how they shape the agent's work."
authors:
  - geektrainer
lastUpdated: 2026-11-06
---

Context is key when working with generative AI. If a task needs to be done a particular way — or there's background information Copilot should know — you want that context available. [Instruction files][instruction-files] describe not just *what* code you want but *how* it should be structured. In this lesson you'll add a small set of project-specific standards to the space quiz repository and see how they guide a future session.

In this lesson, you will:

- create an issue describing the development standards for the space quiz.
- use an issue-based session to add `.github/copilot-instructions.md`.
- review the instructions and ask the agent to demonstrate how they apply.
- merge the instructions so future sessions can use them.

## What are custom instructions?

Custom instructions provide context and preferences to Copilot so it can produce more relevant suggestions and code. Repository-wide instructions live in `.github/copilot-instructions.md` and are sent to Copilot for requests in that repository. Use this file for project context and guidance that applies broadly.

For guidance that applies only to a particular file type or task, use path-specific instruction files under `.github/instructions/`. Keep instructions clear, focused, and consistent with the project; see the [custom instructions documentation][instruction-files] for supported formats and behavior.

## Create an issue for the project standards

The space quiz is a small, dependency-free project. Its instructions should preserve that simplicity while keeping the experience usable and accessible.

1. Open your `space-quiz` repository on GitHub and select **Issues**.
2. Select **New issue**.
3. Use a title such as **Document development standards for the space quiz**.
4. Add a description with these requirements:

   ```plaintext
   Add repository-wide GitHub Copilot instructions for this space quiz. Keep the project as a single, dependency-free index.html unless an issue explicitly asks to change that. Preserve semantic HTML, keyboard accessibility, prefers-color-scheme support, and reduced-motion preferences. Ask the agent to test changed behavior in the integrated browser and report what it verified. Do not change application code in this issue.
   ```

5. Create the issue.

## Start from the issue and add instructions

1. In the Copilot app, select **My work** and open the issue you just created.
2. Select **New session** to start a session from the issue.
3. Ask the agent to implement the issue:

   ```plaintext
   Following this issue, add or update .github/copilot-instructions.md with concise repository-wide guidance for future work. Inspect the existing project first, preserve its current behavior, and do not modify application code.
   ```

Copilot will create the instructions file. The file is a project asset: every future agent session in this repository can use it as context.

## Review the instructions

1. Select **Changes** in the upper right to review the code changes.
2. Open `.github/copilot-instructions.md` and confirm it describes the project and its key constraints without prescribing unrelated technology.
3. Ask Copilot to demonstrate the instructions without changing any files:

   ```plaintext
   Do not edit any files. Based on the project and the new instructions, describe how you would add a keyboard-accessible category selector to the quiz. Explain how you would preserve the dependency-free single-file design and verify the behavior.
   ```

4. Review the response. It should reflect the project constraints and include a sensible verification approach.

## Open and merge the pull request

1. In the upper right-hand corner, select **Create PR**.
2. If prompted, sign in with your browser and follow the prompts.
3. Review the pull request title, description, and changed files.
4. Merge the pull request on GitHub when you're satisfied.

The custom instructions are now part of the repository and available to future sessions.

## Summary and next steps

You explored repository-wide instructions and used an issue-based session to add project standards. Specifically, you:

- documented the space quiz's single-file and accessibility constraints.
- added `.github/copilot-instructions.md` without changing the app.
- asked Copilot to demonstrate how the instructions shape future work.
- reviewed and merged the instructions.

Next, you'll plan and build another quiz improvement, then verify it with a reusable agent skill. Continue to [Lesson 5 - Building a feature with Autopilot][next-lesson].

## Check your understanding

When should project guidance go in `.github/copilot-instructions.md`, and when would a path-specific instruction file be a better fit?

<details>
<summary>Check your answer</summary>

Use `.github/copilot-instructions.md` for context and standards that apply broadly across the repository. Use path-specific instruction files when guidance is relevant only to particular files or tasks, which keeps the global instructions focused.

**Go deeper:** [Custom instructions for GitHub Copilot](https://docs.github.com/copilot/customizing-copilot/about-customizing-github-copilot-chat-responses).

</details>

## Resources

- [Instruction files for GitHub Copilot customization][instruction-files]
- [Customizing the GitHub Copilot app][customize-app]
- [Best practices for creating custom instructions][instructions-best-practices]

[next-lesson]: ../5-build-filtering/
[instruction-files]: https://docs.github.com/copilot/customizing-copilot/about-customizing-github-copilot-chat-responses
[customize-app]: https://docs.github.com/copilot/how-tos/github-copilot-app/customize-github-copilot-app
[instructions-best-practices]: https://docs.github.com/enterprise-cloud@latest/copilot/using-github-copilot/coding-agent/best-practices-for-using-copilot-to-work-on-tasks#adding-custom-instructions-to-your-repository
