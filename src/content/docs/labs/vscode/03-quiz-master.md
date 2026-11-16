---
title: "Part 3: Custom Quiz Master"
---

[← Part 2](../02-design/)

---

Define your own specialized workflows with custom agents, beyond generic coding prompts.

---

### Task: Your Own Quiz Master

**Steps:**

1. New Chat, pick *Quiz Master* as custom agent
2. `Update questions to …` or just `Update quiz`
3. Check the instructions in `.github/agents/quiz-master.agent.md`
4. Review the generated questions, then start a new **Copilot** chat with *Pixel Jam*. Supply the approved theme, relevant file references, and any design decisions from Quiz Master, then send: *"Visually integrate this approved quiz theme without changing the questions or game behavior. Use the integrated browser to verify the result."*
5. Review Pixel Jam's focused visual integration of the new theme and its browser verification.

> ⏱️ **Specialist transition exercise (2 minutes):** You review one specialist's work before briefing another. Context is not transferred automatically to the new chat; provide the decisions and files Pixel Jam needs. The template's **Polish this quiz theme** handoff button is Local-only and is not required for this Copilot workflow. In Part 4, the TDD orchestrator instead delegates work to subagents.

**Theme Ideas:**

- Skill Bingo: Workplace or technical skills
- Personality Bingo: Preferences, quirks, fun traits
- Secret Challenge Bingo: Quick micro-tasks with people you meet
- Team Bingo: Department or team categories
- Classic Facts Bingo: Birthday month, pets, etc.
- Work Culture Bingo: Productivity habits, meeting styles, tools
- Tech Life Bingo: Coding languages, shortcuts, frameworks, dev memes
- Travel Bingo: Cities lived in, countries visited, cultural traditions
- Creative Bingo: Music, art, design tastes, creative skills
- Micro-Challenge Bingo: Quick actions (teach a word, show a meme)
- Deep Chat Bingo: Reflective or meaningful conversation starters
- Office Humor Bingo: Desk quirks, caffeine habits, meeting hot takes
- Opposites Bingo: Find someone who is your opposite on specific axes
- Fandom Bingo: Sci-fi, gaming, books, shows, niche interests
- Lifestyle Bingo: Sleep, fitness, food, routines
- Mystery Bingo: Guess who matches a trait and verify
- Chaos Bingo: Surprising, absurd, unpredictable prompts

✅ **Result:** Quiz Master creates engaging themed questions, then your reviewed brief lets Pixel Jam visually integrate that specific theme.

---

## ✅ Part 3 Complete!

You've learned how to:
- Use custom agents for specialized workflows
- Generate themed quiz questions
- Review a specialist's output and provide a scoped brief to another custom agent
- Distinguish manual specialist transitions from autonomous subagent orchestration
