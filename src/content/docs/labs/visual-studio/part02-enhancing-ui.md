---
title: "Part 02: Enhancing UI with Inline Chat"
---

Now, you'll improve the loading experience using Copilot's inline chat.

> NOTE: This exercise does supply specific prompts to type, but as part of the learning experience we encourage you to discover how to interact with Copilot. Feel free to talk in natural language, describing what you're looking for or need to accomplish.

## Update the loading state

1. [ ] In the **Solution explorer** under the **Store** project open **Components/Pages/Products.razor**.
1. [ ] Find the "Loading..." text in the code.
1. [ ] Select the entire `<p><em>Loading...</em></p>` element and right-click. Choose **Ask Copilot** to open inline chat, or press `Alt+/`. The context-menu label can vary by Visual Studio version.
1. [ ] In inline chat, enter `Replace the selected loading text with a simple spinner using built-in Bootstrap styles.` and submit the prompt.

## Review and run the change

1. [ ] Review the proposed change and accept it using the inline control or `Tab`. The result should look similar to:

    ```html
    <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    ```

1. [ ] Run the application to see your new loading spinner in action.

1. [ ] Stop debugging and close the application

**Key Takeaway**: Inline chat allows you to make targeted improvements to your code without leaving your editor context.

See [Copilot Chat in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/ide/visual-studio-github-copilot-chat?view=visualstudio) for the current inline chat interface.

---

[Back: Part 01 - Code Completion with Ghost Text](../part01-code-completion/) | [Next: Part 03 - Referencing Code Files in Chat](../part03-referencing-files/)
