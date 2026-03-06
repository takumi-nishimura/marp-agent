---
name: marp-slide-generation
description: Generate, revise, and validate slide decks in this repository with the brief-first Marp workflow. Use when Codex needs to create a new deck under decks/, turn brief.md into outline.md or slide.md, add Mermaid diagrams, render HTML/PDF/PPTX with the local Marp CLI, or fix slide density and overflow issues using this repo's theme and validator.
---

# Marp Slide Generation

## Follow the repository workflow

1. Create or identify the target deck under `decks/`.
   - For a new deck, run `npm run new decks/<path>`.
   - This scaffolds `brief.md`, `slide.md`, local asset folders, and a `shared` link to global assets.
2. Start from `brief.md`.
   - Keep the fixed headings from `template/brief.md`.
   - Replace non-applicable sections with `None` instead of deleting them.
   - Keep audience, action, required sections, and forbidden patterns concrete.
3. Generate or refresh `outline.md`.
   - Run `npm run outline -- decks/<name>/brief.md`.
   - Treat each slide's `Title`, `Takeaway`, `Layout hint`, and `Overflow risk` as the contract for authoring.
4. Write or revise `slide.md`.
   - Preserve the template frontmatter unless the user explicitly wants a different setup.
   - Prefer one idea per slide.
   - Split crowded content across slides instead of shrinking text.
   - Use `shared/...` for repo-wide assets and `assets/...` for deck-local assets.
5. Validate before handoff.
   - Run `npm run deck:validate -- decks/<name>/slide.md`.
   - If findings remain, fix them or call out the deliberate exception.
   - Use `npm run deck:validate -- decks/<name>/slide.md --report-dir out/<name>` when screenshots or reports will help review.

## Use repository-specific features

- Read `references/layout-patterns.md` for concrete slide patterns and helper classes.
- Use fenced `mermaid` blocks for diagrams. The repo renders them to inline SVG through a custom Marp plugin.
- Use `<!-- hide: true -->` to keep an authored slide out of rendered output.
- Check `decks/example/slide.md` before inventing new layout conventions.
- Inspect `themes/lab.css` only when the example deck does not cover the needed utility or color scheme.

## Render output with the local CLI

- Render with the vendored Marp CLI so `marp.config.js` and local plugins are applied.
- Run commands from the repo root or the deck directory.
- For live editing and browser preview, prefer the repository helper instead of invoking Marp server flags manually.

```bash
npm run slide -- decks/<name>/slide.md
npm run slide -- decks/<name>/slide.md 12
```

- The optional page argument is the displayed pagination number. The helper maps it to the correct URL hash even when the deck uses `paginate: skip`.

```bash
./node_modules/.bin/marp --allow-local-files --config-file marp.config.js decks/<name>/slide.md -o out/<name>.html
./node_modules/.bin/marp --allow-local-files --config-file marp.config.js decks/<name>/slide.md -o out/<name>.pdf
./node_modules/.bin/marp --allow-local-files --config-file marp.config.js decks/<name>/slide.md -o out/<name>.pptx
```

## Keep the quality bar high

- Favor explicit takeaways and audience actions over topic labels.
- Prefer theme helpers and structural layout changes over ad hoc inline styling.
- Watch for dense bullets, long headings, comparison overload, and figure-plus-text crowding. The validator already checks for these failure modes.
- If a requested slide feels overloaded, revise the outline first and then rewrite the affected slides.
