# Design System

## Overview

The site combines a high-energy Live! 360 Tech Con 2026 event landing page with a quiet, dependable lesson reader. Its visual identity follows the event badge: confident teal lettering, warm neutral accents, and a 360-degree mark. The composition is bold at the entry point and progressively calmer as learners move into instructions.

## Color

Use a full-palette strategy, with near-black carrying the dark theme and event teal as the primary brand color.

```css
:root {
  --color-bg: oklch(0.12 0.012 190);
  --color-surface: oklch(0.17 0.014 190);
  --color-surface-raised: oklch(0.21 0.016 190);
  --color-ink: oklch(0.965 0.006 80);
  --color-muted: oklch(0.76 0.018 190);
  --color-primary: oklch(0.74 0.095 188);
  --color-primary-strong: oklch(0.66 0.1 188);
  --color-accent: oklch(0.82 0.075 188);
  --color-violet: oklch(0.70 0.16 300);
  --color-success: oklch(0.78 0.15 145);
  --color-focus: oklch(0.88 0.08 188);
  --color-border: oklch(0.32 0.018 190);
}
```

The light theme uses warm off-white, deep ink, dark teal actions, and teal links. Use dark text on bright teal fills and light text on dark teal fills. Never use gradient text.

## Typography

- Display and body: Archivo Variable. Use broad weight contrast and compact display leading without exceeding `-0.04em` letter spacing.
- Code and terminal material: JetBrains Mono.
- Body copy: 1rem minimum, 1.65 line height, 65–75ch measure.
- Headings use balanced wrapping. Long prose uses pretty wrapping.

## Layout

- Global content width: 1200px; lesson prose width: 72ch.
- Landing page: an asymmetric hero followed by a four-stage signal path, not an identical card grid.
- Lesson reader: Starlight shell with custom lab identity, clear sequence navigation, and a sticky progress summary only where it does not crowd content.
- Spacing uses a fluid scale and alternates tight instructional groups with generous narrative transitions.
- Mobile begins at 320px. Code scrolls horizontally; headings never overflow.

## Components

### Site header

Compact brand mark, workshop title, preparation link, GitHub source link, progress access, and theme control. Sticky with an opaque-enough surface for reliable contrast.

### Hero signal board

A composed visual of app, terminal, VS Code, and Visual Studio fragments connected as one workflow. It is illustrative and semantic, not a collection of fake metrics.

### Four-stage pathway

An ordered sequence because the order is meaningful. Each stage shows duration, platform, outcome, and current progress with a distinct visual treatment.

### Lab overview

Shows the lab goal, time, prerequisites, starter path, expected outcome, and step list before the learner begins.

### Progress control

A native button with explicit complete/incomplete text, visible focus, and an adjacent status announcement. State is versioned in local storage and never blocks navigation.

### Callouts and code

Use Starlight semantics with restrained color roles. Code blocks prioritize contrast and horizontal scrolling. Warnings never rely on color alone.

## Motion

- One orchestrated hero load using opacity, clip, and subtle blur; all content is visible without JavaScript.
- Pathway state transitions use color and a short transform no longer than 220ms.
- No looping decoration or bounce.
- `prefers-reduced-motion: reduce` disables transforms, smooth scrolling, and nonessential transitions.

## Imagery

Use real source screenshots inside lessons. The landing hero uses a custom HTML/CSS technical composition derived from the four workshop surfaces rather than generic stock photography. Provide meaningful alt text for instructional screenshots and empty alt text only for genuinely decorative material.

## Accessibility

- Body text contrast targets 7:1 in both themes; controls and large text meet WCAG 2.2 AA.
- Focus ring uses the dedicated yellow token and remains visible on every surface.
- Minimum interactive target size is 44px where practical.
- Theme and progress work without pointer input.
- Skip link, landmarks, logical heading order, current-page state, and polite progress announcements are required.
