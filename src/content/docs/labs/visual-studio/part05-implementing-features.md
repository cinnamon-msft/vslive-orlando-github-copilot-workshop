---
title: "Part 04: Implementing Features with Copilot Agent"
---

Previously we utilized Copilot Chat, which is great for working with an individual file or asking questions about our code. However, many updates necessitate changes to multiple files throughout a codebase. Even a seemingly basic change to a webpage likely requires updating HTML, CSS, Razor, and C# files. Copilot Agent allows you to modify multiple files at once across your project, self heals, and can run commands if granted permission like installing NuGet packages.

With Copilot Agent, you will add the files which need to be updated to the context. Once you provide the prompt, Copilot Agent will begin the updates across all files in the context. It also has the ability to create new files or add files to the context as it deems appropriate.

## Implement the product listing

Let's add the ability to see a list of images into the app:

1. [ ] Open Copilot Chat from **View -> GitHub Copilot Chat** if it isn't open.

1. [ ] In Visual Studio, open a new Copilot Chat with the **+** chat icon.

    ![New chat icon in VS copilot](./images/5-new-edits.png)

1. [ ] Switch to **Agent** mode.

   ![Agent selected in the agent picker](./images/1-agent.png)

1. [ ] At the bottom of the Copilot Chat pane, select **Auto** or another model available to your account and allowed by your organization.

    The model list and selection shown here are examples; availability can vary:

    ![Example model selector](./images/5-select-sonnet.png)

1. [ ] Type: `Implement a simple product listing page in Products.razor that fetches products from #ProductService and displays them in a simple list with product name, description, price, and image.`

    > NOTE: You should use your own phrasing when generating the prompt. As highlighted previously, part of the exercise is to become comfortable creating prompts for GitHub Copilot. One key tip is it's always good to provide more guidance to ensure you get the code you are looking for.

Copilot agent mode begins implementing the feature!

## Reviewing the changes

Unlike our prior examples where we worked with an individual file, we're now working with changes across multiple files - and maybe multiple sections of multiple files. Fortunately, Copilot Agent has functionality to help streamline this process.

GitHub Copilot will propose the following changes to the application including updating the Products.razor and adding a Products.razor.css and maybe more.

1. [ ] Review the code changes from Agent mode

    The code should look similar to the following:
    ```html
    <table class="table">
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            @foreach (var product in products)
            {
                <tr>
                    <td><img height="80" width="80" src="@($"{imagePrefix}/{product.ImageUrl}")" /></td>
                    <td>@product.Name</td>
                    <td>@product.Description</td>
                    <td>@product.Price</td>
                </tr>
            }
        </tbody>
    </table>
    ```

    The **ProductService* should have been injected at the top of the file:
    ```html
    @inject ProductService ProductService
    ```

    The code should have been updated at the bottom of the file:
    ```cs
        @code {
        private List<Product>? products;
        private string imagePrefix = string.Empty;
    
        protected override async Task OnInitializedAsync()
        {
            // Simulate asynchronous loading to demonstrate streaming rendering
            await Task.Delay(500);
            imagePrefix = Configuration["ImagePrefix"]!;
            products = await ProductService.GetProducts();
        }
    }
    ```

1. [ ] Run the application to see your new product listing page.

1. [ ] Stop debugging and close the application

**Key Takeaway**: Copilot Agent can generate complete feature implementations based on your natural language descriptions, saving significant development time.

## Check your understanding

Why is Agent mode better suited than Ask mode for implementing a feature across several project files?

<details>
<summary>Check your answer</summary>

Ask mode answers a question or suggests an approach, but it does not continue through a multi-step implementation. Agent mode can determine which files need changes, edit across the project, run tools or commands, inspect failures, and refine the solution. That feedback loop is what makes it appropriate for a feature whose UI, service, routing, and tests must stay coordinated.

**Go deeper:** [Use GitHub Copilot agent mode in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/ide/copilot-agent-mode?view=visualstudio).

</details>

---

[Back: Part 03 - Using Custom Instructions](../part04-custom-instructions/) | [Next: Part 05 - Using Copilot Vision](../part06-copilot-vision/)
