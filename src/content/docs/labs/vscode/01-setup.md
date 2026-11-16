---
title: "Part 1: Setup & Context Engineering"
---

[← Overview](../)

---

In this section, you'll set up your development environment and teach GitHub Copilot about your codebase.

> 🎮 **[Play the Bingo Mixer game](https://copilot-dev-days.github.io/agent-lab-typescript/game/)** — See what you'll be building!

---

## 🔧 Initial Setup

### Step 1: Create Your Repository

Open [github.com/copilot-dev-days/agent-lab-typescript](https://github.com/copilot-dev-days/agent-lab-typescript), click **Use this template** → **Create a new repository**, and name it `my-bingo-mixer`.

Use **Public** visibility if you want to publish the app with GitHub Pages.

✅ Your own Bingo Mixer repo is ready!

### Step 2: Enable GitHub Pages (Optional)

Enable Pages if you want to test and share your app live:

1. Go to your repo's **Settings** → **Pages**
2. Under "Build and deployment", change *Deploy from a branch* to **GitHub Actions**
3. ✅ Pushes to `main` will publish to: `https://{username}.github.io/{repo-name}`

### Step 3: Choose How You'll Develop

#### Option A (Preferred): Clone locally in VS Code

1. Open VS Code
2. Open the Command Palette (`Ctrl+Shift+P` on Windows/Linux or `Cmd+Shift+P` on macOS)
3. Run **Git: Clone** → **Clone from GitHub**
4. Select your new repository and choose a local folder
5. Open the cloned repository when prompted
6. Install recommended extensions (notification or `Extensions: Show Recommended Extensions`)

#### Option B: Create a Codespace for your repo

1. Open your repository on GitHub
2. Click **Code** → **Codespaces** → **Create codespace on main**
3. ✅ Codespace starts with your repo and devcontainer.

### Step 4: Review Trust and Approvals

Before running setup:

1. In the editor's Chat view, select **Copilot** as the session target, choose **Agent**, and select **Manual permissions**. Avoid **Allow all** and **Autopilot** during setup because they skip approval prompts.
   - **Part 3 exception:** The **Polish this quiz theme** handoff requires **Local**. Use a Local chat in the current workspace with tool approvals enabled for that exercise, then start Part 4 in a **Copilot** chat with **Agent** and **Manual permissions**.
2. Review `.vscode/settings.json` before trusting the workspace. Its terminal allowlist is not copied to Copilot's Agent Host; do not rely on it to configure approvals for this lab.
3. Inspect each requested command and prefer **Allow Once**. If repeated commands need approval, use the narrowest session-scoped option offered.

> **Copilot** is the recommended harness and can work in your local folder or Codespace; selecting it does not move your files to the cloud. The **Local** harness is deprecated. Use the editor's current workspace for this exercise. Worktrees separate edits, not command or network access. Learn more in [Agent harnesses](https://code.visualstudio.com/docs/agents/run/agent-harnesses) and [Approvals](https://code.visualstudio.com/docs/agents/run/approvals).

### Step 5: Run the Setup Skill

In the Chat panel:

```
/setup
```

When the skill proposes an installation command such as `npm install`, inspect it and approve that exact command once. Review subsequent requests without broadly enabling auto-approval.

✅ **Success:** Dependencies are installed, lint/build/tests pass, and the development server stays running with the app open in the integrated browser.

Keep this workshop guide open (📌 Pin).

---

## 📚 Understanding Context Engineering

Context engineering is how you teach AI about your specific codebase. This makes Copilot's suggestions more accurate and relevant.

### Task 1: Auto-generated Instructions

Instructions guide all agentic codebase interactions, making them more efficient and reliable. Add them early, but make sure to keep them maintained and succinct.

**Steps:**

1. Run prompt: `/init` with **Manual permissions**
   - Based on the repo's existing conventions, `/init` may generate or update `.github/copilot-instructions.md` or a root `AGENTS.md`.
   - While agent analyzes the codebase, optionally start next task
2. Open a new chat for the next task, as init can take a while and we can review later.
3. Review results — verify commands and conventions against the repo, and keep the instructions concise
   1. Optional follow-up: *"Compress down and add a mandatory development [ ] checklist (lint, build, test) to the top"*
4. Apply and commit

> A root-level `AGENTS.md` is a portable option when several AI coding tools share the repo. Use one root file here; nested instructions are outside this lab.

✅ **Result:** All future requests will have a basic map of the workspace.

---

### Task 2: Dogfooding & Custom Skills

**Steps:**

1. Prompt: *"Use the integrated browser to play a complete round of the app like a critical dogfooder. Report usability problems and how fun it is, without changing code."*
2. Watch how the agent launches the built-in browser, interacts with the app, and writes a report
3. `/create-skill` *for dogfooding* — or: *"Save this as a dogfooding skill"*
4. Review the saved skill, then invoke it in a new Copilot chat to try the workflow again

> If you opened the integrated browser tab yourself, use **Share with Agent** in its toolbar to grant the agent access.

✅ **Result:** The agent used the browser to actually play the app and produced a critical report. You then saved that testing approach as a reusable dogfooding skill.

> 💡 **Context engineering insight:** The agent needs hands-on context — running the app, seeing the UI, clicking through flows — to truly understand how it works and validate functionality. Code alone isn't enough; interacting with the running product closes the gap between reading code and understanding the user experience.

---

### Task 3: Customization Tour

Tour the repo customizations to understand how context engineering works in practice.

**Steps:**

1. Open the Customization panel, Command: `Chat: Open Customizations`
2. Browse the repo customizations — instructions, skills, and agents
3. Confirm the **frontend design skill** and **Tailwind 4 instructions** are discovered for the Copilot harness

> 💡 **Think about:** What conventions or patterns from your own projects could become instructions or skills?

> 🔒 **Exclusion note:** Do not rely on `.copilotignore` or agent instructions to protect secrets or restrict tool access. Review [content exclusion support and limitations](https://docs.github.com/en/copilot/concepts/context/content-exclusion) for your environment; ignore files are not a security boundary.

---

## ✅ Part 1 Complete!

You've learned how to:
- Set up your development environment
- Generate and refine workspace instructions
- Dogfood your app with the agent's built-in browser
- Create and save custom skills
- Tour repo customizations (instructions, skills, agents)
