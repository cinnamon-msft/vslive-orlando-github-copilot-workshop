---
title: "Workshop Setup"
---

To complete this workshop you will need [Visual Studio 2026 version 18.12 or later](https://visualstudio.microsoft.com/vs/), the [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0) or [.NET 11 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/11.0), and a GitHub account with access to GitHub Copilot.

> [!NOTE]
> The TinyShop starter on `main` targets .NET 10 and rolls forward to .NET 11 when the .NET 10 runtime is unavailable. The SDK includes its corresponding ASP.NET Core runtime; check for a released `Microsoft.AspNetCore.App 10.x` or `11.x` with `dotnet --list-runtimes`. If you cloned TinyShop before [.NET 11 support](https://github.com/jamesmontemagno/workshop-tinyshop/pull/2) was merged, update your copy of `main`.

## Prerequisites

Before starting, ensure you have:

- [Visual Studio 2026 version 18.12 or later](https://visualstudio.microsoft.com/vs/) with GitHub Copilot installed
- [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0) or [.NET 11 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/11.0) installed
- **GitHub account** with one of the following:
  - [GitHub Copilot Free](https://github.com/features/copilot) - Free tier with limited usage
  - [GitHub Copilot Pro/Pro+/Max](https://github.com/features/copilot) - Full access
  - GitHub Copilot through your organization

> [!TIP]
> If you don't have GitHub Copilot yet, you can [sign up for Copilot Free](https://github.com/features/copilot) or start a [free trial of Copilot Pro](https://github.com/github-copilot/signup).

## Optional: Install the .github + MCP Extension

This extension is optional. The lab uses Visual Studio's built-in MCP Server Manager, and the agent files in later lessons can be created manually under `.github`. You do not need the extension or a local Node.js MCP server to complete the exercises.

To install it:
1. [ ] Open Visual Studio 2026
1. [ ] Go to **Extensions -> Manage Extensions**
1. [ ] Search for **.github + MCP** in the search box
1. [ ] Click **Install** on the **.github + MCP** extension by Mads Kristensen
1. [ ] Restart Visual Studio if prompted

You can also install it from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.GitHubNode).

## Sign in to GitHub Copilot

1. [ ] Open your browser and go to `https://github.com`.
1. [ ] Sign in with your GitHub account or create a new account if you don't have one.
1. [ ] Open Visual Studio 2026.
1. [ ] Open Copilot Chat from **View -> GitHub Copilot Chat** or select the GitHub Copilot badge in the upper-right corner of Visual Studio and choose **Open Chat**.
1. [ ] If prompted, sign in to GitHub in the browser and authorize Visual Studio and Copilot.
1. [ ] If you signed in through the browser, return to Visual Studio when prompted. Verify that Copilot Chat is available.

Part 8 creates GitHub issues and Part 11 delegates work to a cloud agent. Both need a repository where you have write access. Fork `workshop-tinyshop` before those parts and point your local clone at your fork as described below. If enterprise policy prevents a fork, you can complete every local exercise but must skip those repository-backed actions.

## Open Copilot Chat

Visual Studio 2026 version 18.12 and later uses the new Copilot Chat experience by default. Use **Auto** or another model available to your account and allowed by your organization; model availability changes over time.

## Turn on Copilot Settings

1. [ ] Ensure Code Completions and Next Edit Suggestions are enabled:
   - Go to the Code Completions settings in Visual Studio by heading to **Tools -> Options -> Text Editor -> Inline Suggestions -> General** under Suggestion Providers
   - Ensure **Copilot Completions** is checked.
   - Ensure **Copilot Next Edit Suggestions** is checked.

   ![](./images/0-enable-nes.png)

1. [ ] Head to **Tools -> Options -> GitHub -> Editor** and ensure the following settings are enabled:
   - **Enable AI generated description for auto-inserted documentation comments in support languages**

## Clone and open the lab solution

Clone the dedicated TinyShop repository:

```powershell
git clone https://github.com/jamesmontemagno/workshop-tinyshop.git
cd workshop-tinyshop
start src\TinyShop.sln
```

1. [ ] In Visual Studio, select **File -> Open -> Project/Solution** if the solution did not open automatically.
2. [ ] Open `src/TinyShop.sln`.

For Parts 8 and 11, [fork the starter repository](https://github.com/jamesmontemagno/workshop-tinyshop/fork), then point the existing clone to your fork. Replace `YOUR-USERNAME` with your GitHub username:

```powershell
git remote set-url origin https://github.com/YOUR-USERNAME/workshop-tinyshop.git
git remote -v
```

Confirm that `origin` points to your fork before creating issues or delegating cloud work. If you skip the fork, keep the original remote and follow the local alternatives in those lessons.

## Start the App

1. [ ] Open the **Solution Explorer** from the **View -> Solution Explorer** menu.
1. [ ] Set the **TinyShop.AppHost** as the startup project if it isn't already by right-clicking on **TinyShop.AppHost** and selecting **Set as Startup Project**. Start the project with F5 or **Debug -> Start Debugging** from the menu.

    The [Aspire](https://aspire.dev) AppHost will start two applications and the Aspire Dashboard:

    - The **products** backend API
    - The **store** Blazor frontend

    Open each application's endpoint from the dashboard. Ports can vary with the launch profile and environment.

1. [ ] Stop debugging and close the application.

## Summary and Next Steps

You've now set up your environment and cloned the repository you'll use for the rest of the workshop. The `completed` branch contains a reference implementation when you need to compare your progress. Let's start exploring GitHub Copilot!

---

[Next: Part 00 - Exploring the Codebase](../part00-exploring-codebase/)
