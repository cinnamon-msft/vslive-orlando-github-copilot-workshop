---
title: "Lesson 0 - Prerequisites"
description: "Install the local tools required for the GitHub Copilot app workshop."
authors:
  - geektrainer
lastUpdated: 2026-08-06
---

The GitHub Copilot app is a desktop hub for working with Copilot and GitHub. During this workshop you'll build a small standalone web app, then work locally with the Tailspin Toys Astro project. Before you install the app, make sure the local tools used by the lessons are ready.

In this lesson, you will:

- confirm Git is installed.
- install Node.js so the workshop projects can run on your machine.

## Confirm Git is installed

Open a terminal and run:

```shell
git --version
```

If the command is not found, [install Git][install-git], open a new terminal, and run the command again.

## Install Node.js

Several lessons ask an agent to build features and run the Tailspin Toys test suite locally, which needs **[Node.js][nodejs]** — the only runtime the project requires. Install version **22 or newer**; the current **LTS** release is a safe choice.

The simplest option on every platform is the official installer:

1. In your operating system, open a terminal window using Windows Terminal, macOS terminal, or whatever you typically use.
2. Run the following command to confirm you have at least Node.js 22 or higher installed:

    ```shell
    node --version
    ```

3. If you see `v22` or a higher number, you can skip to the next section!

> [!TIP]
> You only need to complete these steps if you don't have Node installed, or you need to update.

4. Open the [Node.js download page][node-download].
5. Download the **LTS** build for your operating system.
6. Run the installer and accept the defaults. On Windows, keep the **Add to PATH** option selected.
7. Once installed, open a new terminal window.
8. Confirm the install in the new terminal window by running the following:

    ```bash
    node --version
    ```

9. You should see `v22.x.x` or higher.

> [!TIP]
> Prefer containers? If you have **[Docker][docker]**, you can use the repository's [dev container][dev-containers] instead of installing Node.js locally — it bundles Node for you. You don't need both.

## Summary and next steps

You're set up! Git and Node.js are available for the projects you'll build during the workshop.

Next, you'll install the GitHub Copilot app, sign in, and get oriented in the workspace. Continue to [Lesson 1 - Installing the GitHub Copilot app][next-lesson].

## Resources

- [Download Node.js][node-download]
- [Install Git][install-git]
- [About the GitHub Copilot app][about-copilot-app]

[next-lesson]: ../1-install-copilot-app/
[nodejs]: https://nodejs.org/
[node-download]: https://nodejs.org/en/download
[docker]: https://www.docker.com/products/docker-desktop/
[dev-containers]: https://code.visualstudio.com/docs/devcontainers/containers
[install-git]: https://github.com/git-guides/install-git
[about-copilot-app]: https://docs.github.com/copilot/concepts/agents/github-copilot-app
