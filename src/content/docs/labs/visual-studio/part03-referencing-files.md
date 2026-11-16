---
title: "Part 02: Referencing Code Files in Chat"
---

In this section, you'll learn how to reference existing code files in your chat conversations.

## Add the relevant files to context

1. [ ] Open the **Products.razor** again from the **Store** project.
1. [ ] Open Copilot Chat from **View -> GitHub Copilot Chat** if it isn't open.

   ![Open chat window dialog](./images/1-open-copilot-chat.png)

1. Start a new chat by clicking the `+` icon in the top right corner of the chat window.

   ![New chat](./images/5-new-edits.png)

1. [ ] Select **Ask** in the agent selector.

   ![Ask selected in the agent picker](./images/0-ask-mode.png)

## Ask a project-aware question

1. [ ] Type: `#ProductService.cs` to reference the ProductService file.
1. [ ] Ask: `How would I implement getting and visualizing the products in a table using the code in #ProductService and the css required.`
1. [ ] Review the code suggestion but don't implement it yet.
1. [ ] Notice how Copilot can reference existing code to provide contextual suggestions.

**Key Takeaway**: Referencing files in your chat provides Copilot with the context it needs to give more accurate, project-specific suggestions.

---

[Back: Part 01 - Code Completion with Ghost Text](../part01-code-completion/) | [Next: Part 03 - Using Custom Instructions](../part04-custom-instructions/)
