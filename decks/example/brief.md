# Presentation Brief

- Generated: 2026-03-07

## Audience

- Primary audience: Lab members and developers evaluating how to build Marp decks in this repository
- Existing knowledge: Comfortable with Markdown and basic CLI workflows, less familiar with Marp theming and repo-specific helpers
- What they care about: Creating slides quickly, keeping layout quality consistent, and understanding what marp-agent adds on top of plain Marp

## Duration

- Total talk length: 12 minutes
- Target slide count: 16

## Core Message

- One-sentence takeaway: marp-agent makes Marp slide authoring repeatable by combining a structured brief-to-outline workflow, automated validation, and repo-specific theme and plugin support.
- Supporting points:
  - The brief -> outline -> slide workflow keeps structure explicit before content gets dense.
  - The validator catches overflow and density problems before review.
  - The lab theme and plugins make advanced features like Japanese Mermaid diagrams, preview helpers, and laser pointer support practical.

## Audience Action

- What the audience should think, decide, or do after the talk: Start each new deck with `npm run new`, write `brief.md`, generate `outline.md`, author `slide.md`, and run validation before review or export.

## Required Sections

1. Marp strengths and common pain points
2. marp-agent workflow overview
3. Deck scaffolding with `npm run new`
4. Writing `brief.md`
5. Generating `outline.md`
6. Writing and validating `slide.md`
7. Validator rules
8. Validator before-and-after examples
9. lab theme capabilities
10. Japanese Mermaid and MathJax support
11. Preview helpers and plugins
12. Laser pointer feature
13. Key commands and closing summary

## Must-Use Assets

- Shared Marp logo
- Example Mermaid diagram with Japanese labels and MathJax
- Overview mode screenshot
- Laser pointer screenshot

## Forbidden Patterns

- Tiny text utilities as the main overflow fix
- Explaining marp-agent as only a theme without the workflow and validation story
- Mixing unrelated ideas into one slide
- CSS-first customization advice that skips the built-in helpers and validator

## References

- README.md
- decks/example/slide.md
- themes/lab.css
