---
title: "Lesson 6 - Testing with the Playwright MCP server"
description: "Add the Playwright MCP server to the GitHub Copilot app and ask the agent to manually test your space quiz feature in a real browser."
authors:
  - geektrainer
lastUpdated: 2026-07-09
---

In the previous lesson you planned and built a space quiz feature, then reviewed it and checked it in the integrated browser. Letting the agent interact with the site through a separate browser automation tool provides another way to explore its behavior. Let's explore how MCP gives agents access to external capabilities and add the Playwright MCP server.

In this lesson, you will:

- understand what Model Context Protocol (MCP) is and how the GitHub Copilot app uses it.
- add the Playwright MCP server from the app settings.
- ask the agent to drive a browser and explore your space quiz feature.

## Scenario

While automated tests are useful, validating updates to the UI also means interacting with it as a user would. You want to allow Copilot to use the space quiz directly to further automate how changes are checked and provide more confidence the updates perform as expected.

## What is Model Context Protocol (MCP)?

[Model Context Protocol (MCP)][mcp-blog-post] provides AI agents with a way to communicate with external tools and services. By using MCP, AI agents can communicate with external tools and services in real-time. This allows them to access up-to-date information (using resources) and perform actions on your behalf (using tools).

These tools and resources are accessed through an MCP server, which acts as a bridge between the AI agent and the external tools and services. The MCP server is responsible for managing the communication between the AI agent and the external tools (such as existing APIs or local tools like NPM packages). Each MCP server represents a different set of tools and resources that the AI agent can access.

A couple of popular existing MCP servers are:

- **[GitHub MCP Server](https://github.com/github/github-mcp-server)**: This server provides access to a set of APIs for managing your GitHub repositories. It allows the AI agent to perform actions such as creating new repositories, updating existing ones, and managing issues and pull requests.
- **[Playwright MCP Server][playwright-mcp-server]**: This server provides browser automation capabilities using Playwright. It allows the AI agent to perform actions such as navigating to web pages, filling out forms, and clicking buttons.

There are many other MCP servers available that provide access to different tools and resources. GitHub hosts an [MCP registry](https://github.com/mcp) to enhance discoverability and contributions to the ecosystem.

> [!CAUTION]
> Treat MCP servers as you would any other dependency in your project. Before using an MCP server, carefully review its source code, verify the publisher, and consider the security implications. Only use MCP servers that you trust and be cautious about granting access to sensitive resources or operations.

## Add the Playwright MCP server

The [Playwright MCP server][playwright-mcp-server] runs locally and requires Node.js 20 or newer. You installed Node.js 22 or newer in Lesson 0. The app's current customization area provides a catalog for adding it.

1. Select **Customize** in the sidebar.
2. Select **MCP**.
3. Search for `Playwright`.
4. Select the Playwright MCP server and follow the prompts to install it.
5. Open **Installed** and confirm the server is available.

You've now added the Playwright MCP server!

## Ask Copilot to explore the feature via Playwright

Let's ask Copilot to test the feature manually by using the Playwright MCP server.

1. In the Copilot app's integrated terminal, confirm the working directory is the root of your `space-quiz` repository, where `index.html` is located.
2. Start a temporary static server using Node.js's built-in modules; this does not install dependencies or add files:

   ```shell
   node -e "const http = require('node:http'); const fs = require('node:fs'); http.createServer((request, response) => { if (request.url !== '/') { response.writeHead(404).end(); return; } response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); fs.createReadStream('index.html').pipe(response); }).listen(4173, '127.0.0.1');"
   ```

   Keep this terminal open while Playwright is testing the page. If port `4173` is already in use, choose another port in the command and use that same port in the prompt below.

3. In the session, use the following prompt to ask Copilot to validate the new functionality:

   ```plaintext
   Use the Playwright MCP server to navigate to http://127.0.0.1:4173 and test the space quiz feature from this issue in the same way a user would. Compare the behavior with each acceptance criterion. Report what you verified and any problems you found. Do not change files unless I ask you to fix an issue.
   ```

Copilot will use the Playwright MCP server to interact with the space quiz and report back what it found.

4. Read its summary against the acceptance criteria in the issue. If something looks off, ask follow-up questions or send it back to fix the code before you open a pull request.
5. In the terminal, select <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop the temporary server.
6. Leave this session open as we're going to close it out in the next lesson!

Copilot has now also validated the functionality in the browser by exploring the feature like a user would.

## Summary and next steps

Congratulations, you used the Playwright MCP server to explore your space quiz feature in a real browser from the GitHub Copilot app! To recap, you:

- learned what Model Context Protocol (MCP) is and how the app makes MCP tools available.
- added the Playwright MCP server from the app settings.
- asked the agent to drive a browser and explore your space quiz feature.

Your feature is built, verified, and seen working. Now it's time to ship it — using **Agent Merge** to open and merge the pull request for you. Continue to [Lesson 7 - Merging with Agent Merge][next-lesson].

## Check your understanding

What does MCP enable, and why should you evaluate a server's trustworthiness before connecting it?

<details>
<summary>Check your answer</summary>

MCP lets Copilot communicate with external tools and services, such as using Playwright to operate a real browser. Because an MCP server runs separately and can receive session context or perform actions on your machine, an untrusted server creates a meaningful security boundary. Verify the publisher and source, then grant only the capabilities the lesson requires.

**Go deeper:** [Understand Model Context Protocol](https://docs.github.com/en/copilot/concepts/context/mcp).

</details>

## Resources

- [What the heck is MCP and why is everyone talking about it?][mcp-blog-post]
- [Microsoft Playwright MCP Server][playwright-mcp-server]
- [Configuring MCP servers in the GitHub Copilot app][customize-app]

[next-lesson]: ../7-agent-merge/
[mcp-blog-post]: https://github.blog/ai-and-ml/llms/what-the-heck-is-mcp-and-why-is-everyone-talking-about-it/
[playwright-mcp-server]: https://github.com/microsoft/playwright-mcp
[customize-app]: https://docs.github.com/copilot/how-tos/github-copilot-app/customize-github-copilot-app
