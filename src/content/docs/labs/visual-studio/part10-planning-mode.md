---
title: "Part 10: Planning with /plan"
---

When working on complex features, it's helpful to plan before diving into implementation. In Visual Studio, use the `/plan` command in Copilot Chat to create a structured plan before any code is generated.

In this part, you'll use `/plan` to plan and implement a feature that allows users to navigate directly to a specific product's detail page.

## Using `/plan`

Enter `/plan` in Copilot Chat followed by the task you want to plan. Copilot will help break down the work so you can review and refine the approach before implementation.

## Creating a Plan for Product Navigation

Let's use `/plan` to plan a feature that allows users to click on a product in the listing page and navigate to a dedicated product detail page.

1. [ ] Open the Copilot Chat window if it's not already open.
1. [ ] Create a new chat session.
1. [ ] Enter `/plan` followed by the following task:

   ```
   /plan I want to add product navigation to the TinyShop application. When a user clicks on a product in the product listing page, they should be taken to a new product detail page that shows details. Ask me questions along the way.
   ```

   ![Questions](./images/10-questions.png)

1. Answer any questions along the way.

1. [ ] Review the plan that Copilot generates. It should include:
   - Creating a new `ProductDetail.razor` component
   - Updating routing configuration
   - Modifying the product listing to include navigation links
   - Adding any necessary CSS styling
   - Etc.

Once a plan has been created, review it and ask Copilot to revise it or implement it in the chat.

## Reviewing and Refining the Plan

Before executing, it's a good practice to review the plan carefully:

1. [ ] Check that all necessary files are included in the plan.
1. [ ] Verify the approach aligns with your project structure and coding standards.
1. [ ] Add any missing requirements by typing additional instructions.

For example, you might add:

```
Update the plan to also ensure the product detail page handles cases where the product ID doesn't exist by showing a "Product not found" message.
```

## Implementing the Plan

1. [ ] Once you're satisfied with the plan, ask Copilot in the chat to implement it.
1. [ ] Review the changes in the editor as they're made.
1. ![Watch implementation](./images/10-watch-implementation.png)
1. [ ] Run the application to test the new product navigation feature.

## Testing the Feature

1. [ ] Start the application with F5 or Debug -> Start Debugging.
1. [ ] Navigate to the Products page.
1. [ ] Click on a product in the listing.
1. [ ] Verify that you're taken to the product detail page with the correct information.
1. [ ] Click the "Back to Products" button to return to the listing.

**Key Takeaway**: Use `/plan` to think through complex features before implementation. Reviewing and refining the plan helps ensure all necessary changes are considered before code is generated, leading to better-organized code and fewer iterations.

---

[Back: Part 09 - MCP Servers](../part09-mcp/) | [Next: Part 11 - Reusable Prompt Files](../part11-reusable-prompts/)
