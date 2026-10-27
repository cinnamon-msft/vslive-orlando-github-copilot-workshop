---
title: "Prepare for the workshop"
description: "Install and verify everything needed for the four VS Live! Orlando GitHub Copilot labs."
---

Complete this checklist before the workshop. Copilot app, Copilot CLI, and VS Code work on Windows, macOS, or Linux. **Visual Studio 2026 requires Windows.**

## Accounts and access

- [ ] A personal GitHub account (preferred)
- [ ] GitHub Copilot access; the Copilot app lessons require Copilot Student or a paid plan (see the lab prerequisites)
- [ ] Permission to create repositories and pull requests in your account, if you plan to use the repository-backed exercises
- [ ] Git configured with your GitHub identity
- [ ] If you use Copilot Business or Enterprise, confirmation from your administrator that the required Copilot policies are enabled

## Required tools

| Tool | Required for | Verify |
|---|---|---|
| [Git](https://git-scm.com/downloads) | All labs | `git --version` |
| [GitHub Copilot app](https://github.com/features/ai/github-app) | Copilot app | Open the app and sign in |
| [Node.js 22 or 24](https://nodejs.org/) | Copilot app, CLI, and VS Code | `node --version` |
| [GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli) | CLI | `copilot --version` |
| [Visual Studio Code 1.135 or later](https://code.visualstudio.com/) | CLI and VS Code | `code --version` |
| [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) | VS Code | Sign in and open Copilot Chat with **Local** selected |
| [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) | Lab 4 | `dotnet --version` |
| [Visual Studio 2026](https://visualstudio.microsoft.com/vs/) | Lab 4 | Open Visual Studio |
| Edge or Chrome | Browser-based verification | Open the browser once |

## Visual Studio 2026 setup

On Windows, open the Visual Studio Installer and confirm the **ASP.NET and web development** workload is installed. Sign in to GitHub Copilot inside Visual Studio before the workshop.

## Run workshop doctor

Download the preflight script for your operating system, inspect it if desired, then run it. It does not install software or read credentials. Its final check takes up to a minute and shows a waiting indicator while sending a one-line **Auto**-model prompt to verify that you are signed in and can receive a response; this uses one small Copilot request.

<div data-tabs>
  <div role="tablist" aria-label="Run workshop doctor">
    <button role="tab" aria-selected="true" data-tab="powershell">Windows PowerShell</button>
    <button role="tab" aria-selected="false" data-tab="shell">macOS or Linux</button>
  </div>

  <div role="tabpanel" data-panel="powershell">

```powershell
Invoke-WebRequest https://raw.githubusercontent.com/cinnamon-msft/vslive-orlando-github-copilot-workshop/main/scripts/workshop-doctor.ps1 -OutFile .\workshop-doctor.ps1
.\workshop-doctor.ps1
```

  </div>

  <div role="tabpanel" data-panel="shell" hidden>

```bash
curl -fsSLO https://raw.githubusercontent.com/cinnamon-msft/vslive-orlando-github-copilot-workshop/main/scripts/workshop-doctor.sh
bash ./workshop-doctor.sh
```

  </div>
</div>

The report lists readiness for each lab and summarizes your compatible workshop path. On macOS and Linux, it reports Visual Studio as Windows-only rather than as a failed check.

## Enterprise authentication and policy setup

For the interactive CLI lab, sign in ahead of time:

```console
copilot login
```

Complete the browser device flow. For GitHub Enterprise Cloud with data residency, use `copilot login --host HOSTNAME`. If your organization uses SAML SSO, select **Authorize** next to the organization during the GitHub authorization step.

Copilot Business and Enterprise users need the relevant organization or enterprise policies enabled before the workshop:

- The **Copilot CLI** policy is required for the CLI and Copilot app labs.
- The **GitHub Copilot app** policy is separately required for the Copilot app lab.
- VS Code Copilot agent features must be enabled for the VS Code lab.

If a policy, SSO authorization, or model is unavailable, contact your administrator or a facilitator before the workshop. Do not use tokens or accounts you are not authorized to use.

## Clone the project for each lab

Clone only the project for the lab you are starting. Use [Visual Studio Code](https://code.visualstudio.com/) for the CLI and VS Code labs, and [Visual Studio](https://visualstudio.microsoft.com/vs/) for the Visual Studio lab:

| Lab | Clone and open |
|---|---|
| Copilot app | No initial clone: create a local `space-quiz` folder for the guided tour, then create a repository from the [Tailspin Toys template](https://github.com/github-samples/tailspin-toys) in Lesson 3 |
| Copilot CLI | `git clone https://github.com/jamesmontemagno/workshop-mona-mayhem.git` then `cd workshop-mona-mayhem` and run `copilot` |
| VS Code | `git clone https://github.com/copilot-dev-days/agent-lab-typescript.git` then `cd agent-lab-typescript` and run `code .` |
| Visual Studio 2026 | `git clone https://github.com/jamesmontemagno/workshop-tinyshop.git`, then open `workshop-tinyshop/src/TinyShop.sln` |

Mona Mayhem and TinyShop have their workshop starters on `main` and a `completed` branch for reference. For Bingo Mixer, follow the VS Code lab's source repository and install its recommended extensions.

## When to fork instead

Direct cloning is enough for all local exercises. Fork the individual project only when a lesson needs you to push changes, create an issue or pull request, or delegate work to a cloud agent. If an enterprise-managed account prevents forking, remain on a direct clone and complete the local exercises; the repository-backed actions will be unavailable.

Tailspin Toys intentionally uses its template flow because its Copilot app lessons depend on pre-seeded issues, branches, and pull requests.

## Quick preflight

Before arriving, confirm:

1. `workshop doctor` reports the labs you plan to attend as ready.
2. You can authenticate with GitHub and Copilot.
3. Visual Studio 2026 opens `workshop-tinyshop/src/TinyShop.sln` if you are attending that Windows-only lab.
4. You can access the separate Tailspin Toys template repository.
5. VS Code 1.135+ opens `agent-lab-typescript`, and Copilot Chat is signed in with **Local** selected.

When everything is ready, [begin with the Copilot app lab](/labs/copilot-app/).

## Resources

- [Install GitHub Copilot CLI][install-cli]
- [Authenticate GitHub Copilot CLI][authenticate-cli]
- [Manage Copilot policies for an organization][organization-policies]
- [Manage Copilot policies for an enterprise][enterprise-policies]
- [Get started with the GitHub Copilot app][getting-started-app]

[install-cli]: https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli
[authenticate-cli]: https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli
[organization-policies]: https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies
[enterprise-policies]: https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies
[getting-started-app]: https://docs.github.com/en/copilot/how-tos/github-copilot-app/getting-started
