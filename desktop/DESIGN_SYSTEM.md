# Codex Science Desktop Design System

Generated from `ui-ux-pro-max` for an AI-assisted scientific research desktop dashboard, then adapted for a dense research workbench.

## Direction

- Product type: desktop research workbench.
- Visual mode: quiet predictive-analytics dashboard.
- Density: high, with compact workflow routing and a large assistant canvas.
- Motion: subtle, limited to loading and small state transitions.
- Accessibility: visible focus states, 40px+ controls, high-contrast text, reduced-motion support.

## Core Layout

- Left sidebar: workflow navigation.
- Center: active research workflow, chat transcript, and task composer.
- Right inspector: provider profile, workflow checks, and guardrails.
- Modal: provider account setup.

## Colors

| Role | Value |
|---|---|
| Background | `#f8fafc` |
| Surface | `#ffffff` |
| Text | `#0f172a` |
| Muted | `#64748b` |
| Border | `#dbe3ef` |
| Primary | `#2563eb` |
| Danger | `#b91c1c` |

Workflow accents are used sparingly for routing, never as a full-screen theme.

## Interaction Rules

- Provider actions are always visible in the top bar.
- Workflow templates fill the composer but do not auto-send.
- API keys are saved through Electron IPC and never exposed to the renderer after save.
- Buttons show loading state during provider tests and assistant requests.
- Every icon-only button has an accessible label.

## Avoid

- Marketing hero layouts.
- Decorative gradient backgrounds.
- Color-only status meaning.
- Placeholder-only setup fields.
- Hidden provider or credential assumptions.
