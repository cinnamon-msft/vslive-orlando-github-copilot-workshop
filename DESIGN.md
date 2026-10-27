# Design System

## Overview

The site combines a high-energy VS Live! Orlando event landing page with a quiet, dependable lesson reader. Its visual reference is a live technical production desk: near-black equipment, burnt-orange status lamps, cyan monitor traces, and carefully labeled controls. The composition is bold at the entry point and progressively calmer as learners move into instructions.

## Color

Use a full-palette strategy, with pure near-black carrying the dark theme and a seed-anchored burnt orange as the primary brand color.

```css
:root {
  --color-bg: oklch(0.09 0 0);
  --color-surface: oklch(0.145 0.008 260);
  --color-surface-raised: oklch(0.19 0.012 260);
  --color-ink: oklch(0.965 0.006 80);
  --color-muted: oklch(0.73 0.018 255);
  --color-primary: oklch(0.62 0.18 40);
  --color-primary-strong: oklch(0.55 0.17 40);
  --color-accent: oklch(0.82 0.15 205);
  --color-violet: oklch(0.70 0.16 300);
  --color-success: oklch(0.78 0.15 145);
  --color-focus: oklch(0.88 0.16 95);
  --color-border: oklch(0.30 0.018 260);
}
```

The light theme uses pure white, deep warm-black ink, darker orange actions, and a darker cyan for links. Text on saturated orange or violet fills is near-white. Never use gradient text.

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
