export const lessonSections = {
  'visual-studio/part00-exploring-codebase.md': [
    {
      before: '1. [ ] Open the solution in Visual Studio 2026 if it is not already open.',
      heading: 'Open Copilot Chat in Ask mode'
    },
    {
      before: '1. [ ] Try asking questions about the project structure:',
      heading: 'Explore the solution architecture'
    }
  ],
  'visual-studio/part01-code-completion.md': [
    {
      before: '1. [ ] Stop debugging the application if it is currently running.',
      heading: 'Prepare code completion'
    },
    {
      before:
        '1. [ ] In the Solution Explorer, in the **Products** project, open **Endpoints/ProductEndpoints.cs** - it will have a single endpoint implemented.',
      heading: 'Complete the product API'
    },
    {
      before:
        '1. [ ] Go back to **ProductEndpoints.cs**, and try changing the variable name of **id** to `productId` in the new **MapGet** method and see Next Edit Suggestions help out.',
      heading: 'Try next edit suggestions'
    },
    {
      before: '1. [ ] Try using documentation generation:',
      heading: 'Generate documentation'
    },
    {
      before: '1. [ ] Test your implementation:',
      heading: 'Test the API'
    }
  ],
  'visual-studio/part03-referencing-files.md': [
    {
      before: '1. [ ] Open the **Products.razor** again from the **Store** project.',
      heading: 'Add the relevant files to context'
    },
    {
      before: '1. [ ] Type: `#ProductService.cs` to reference the ProductService file.',
      heading: 'Ask a project-aware question'
    }
  ],
  'visual-studio/part04-custom-instructions.md': [
    {
      before: 'Here are some guidelines to consider when creating a Copilot instructions file:',
      heading: 'Choose project-wide guidance'
    }
  ],
  'visual-studio/part05-implementing-features.md': [
    {
      before: "Let's add the ability to see a list of images into the app:",
      heading: 'Implement the product listing'
    }
  ],
  'visual-studio/part06-copilot-vision.md': [
    {
      before: '1. [ ] Open a new Copilot Chat thread in **Agent** mode.',
      heading: 'Attach a design reference'
    },
    {
      before:
        '1. [ ] Ask: `Update the Products.razor to display products in a grid layout similar to this image. Add nice hover effects and make it responsive.`',
      heading: 'Generate the product grid'
    },
    {
      before:
        "1. [ ] Run the application to see the updated product grid layout. You may have to clear the browser cache with CTRL+SHIFT+R if you don't see the CSS update.",
      heading: 'Run and refine the result'
    }
  ],
  'visual-studio/part07-debugging-with-copilot.md': [
    {
      before:
        "1. [ ] Debug the **AppHost** project if it isn't yet, and open the **store** from the .NET Aspire dashboard.",
      heading: 'Analyze the exception'
    }
  ],
  'visual-studio/part08-commit-summary-descriptions.md': [
    {
      before:
        '1. [ ] Open the **Git Changes** view in Visual Studio (**View -> Git Changes**).',
      heading: 'Generate a commit message'
    }
  ]
};

