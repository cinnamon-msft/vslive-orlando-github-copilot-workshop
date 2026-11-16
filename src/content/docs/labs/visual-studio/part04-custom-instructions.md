---
title: "Part 03: Using Custom Instructions"
---

There are always key pieces of information anyone generating code for your codebase needs to know - the technologies in use, coding standards to follow, project structure, etc. Since context is so important, as we've discussed, we likely want to ensure Copilot always has this information as well. Fortunately, we can provide this overview through the use of Copilot instructions.

Before we begin larger updates to the site with the help of Copilot, we want to ensure Copilot has a good understanding of how we're building our application. As a result, we're going to add a Copilot instructions file to the repository.

Copilot instructions is a markdown file placed in your **.github** folder. It becomes part of your project, and in turn is available to all contributors to your codebase. You can use this file to indicate various coding standards you wish to follow, the technologies your project uses, or anything else important for Copilot Chat to understand when generating suggestions.

> [!IMPORTANT]
> Repository instructions provide project-wide context to Copilot Chat when custom instructions are enabled. Keep the file concise: a large instructions file can obscure relevant information. For task-specific workflows, use [prompt files](https://learn.microsoft.com/en-us/visualstudio/ide/copilot-chat-context?view=visualstudio).

## Choose project-wide guidance

Here are some guidelines to consider when creating a Copilot instructions file:

- The Copilot instructions file becomes part of the project, meaning it will apply to every developer; anything indicated in the file should be globally applicable.
- The file is markdown, so you can take advantage of that fact by grouping content together to improve readability.
- Provide an overview of **what** you are building and **how** you are building it, including:
    - languages, frameworks and libraries in use.
    - required assets to be generated (such as unit tests) and where they should be placed.
    - any language specific rules
- If you notice GitHub Copilot consistently provides an unexpected suggestion (e.g. using class components for React), add those notes to the instructions file.

## Create a Copilot instructions file

1. [ ] In the repository root, open `.github/copilot-instructions.md`. If the file does not exist, create the `.github` folder and the `copilot-instructions.md` file inside it.

1. [ ] In **Tools -> Options -> GitHub -> Copilot -> Copilot Chat**, ensure that loading custom instructions from `.github/copilot-instructions.md` is enabled.

1. [ ] Add project-specific information about your application and save the file:

    ```markdown
    ### Backend
    - Products project is the backend API.
    - Built with .NET Minimal APIs.
    - Uses Entity Framework Core with an in-memory database.
    - Should follow OpenAPI best practices.

    ### Frontend
    - Store project is a .NET 10 Blazor Server application.
    - Uses default Bootstrap styling.
    - UI should have a modern look and feel.
    - CSS should be in .razor.css files.
    ```
1. Start a new chat by clicking the `+` icon in the top right corner of the chat window.

   ![New chat](./images/5-new-edits.png)

1. [ ] Ask the Part 02 question again: `How would I implement getting and visualizing the products in a table using the code in #ProductService and the CSS required?`
1. [ ] Review the code suggestion but don't implement it yet.
1. [ ] Notice how the responses now incorporate your custom instructions.

![Instructions begin referenced](./images/04-instructions.png)

**Key Takeaway**: Custom instructions make Copilot's suggestions more aligned with your project standards and architecture preferences.

---

[Back: Part 02 - Referencing Code Files in Chat](../part03-referencing-files/) | [Next: Part 04 - Implementing Features with Copilot Agent](../part05-implementing-features/)
