# Layout Patterns

Use this file when `decks/example/slide.md` is too large to scan in full and you only need the common authoring patterns.

## Frontmatter and title slide

- Start from `template/slide.md`.
- Keep:
  - `marp: true`
  - `theme: lab`
  - `paginate: true`
  - `transition: slide`
- Keep the `style:` block that maps logo variables to `shared/logos/...` unless the deck intentionally changes branding.
- Use `<!-- _class: title -->` for the opening slide.
- Use `<div class="info">...</div>` for affiliation, speaker, or short context on title slides.

## Useful classes and blocks

- `.title`: centered title-slide treatment.
- `.invert`: alternate light or dark variant depending on the color scheme.
- `.col`: two-column layout with two child `<div>` blocks.
- `.fit`: available when content needs the theme's fitting behavior, but prefer splitting slides first.
- `.note`, `.tip`, `.warning`, `.caution`, `.important`: callout blocks.
- Width helpers for figures: `.w-full`, `.w-3/4`, `.w-1/2`, `.w-1/3`, `.w-1/4`.

## Diagram and media patterns

- Use fenced `mermaid` blocks for flowcharts, sequence diagrams, and state diagrams.
- Prefer short node labels so the generated SVG stays readable.
- Use `shared/...` for global assets like logos and shared figures.
- Use deck-local `assets/img/...` and `assets/video/...` for presentation-specific media.
- Wrap images in `<figure>` when a caption or width utility improves readability.

## Authoring heuristics

- Make the slide title a conclusion, not a topic bucket.
- Keep one main claim per slide.
- If a slide needs more than a short list plus one visual, split it.
- Avoid shrinking below the normal text scale just to fit content.
- Convert process explanations into diagrams when sequence matters.
- Use hidden slides only for backup material that should stay in source control but not in rendered output.

## Validation loop

1. Edit `brief.md` when the story or scope changes.
2. Regenerate `outline.md` after meaningful brief changes.
3. Update `slide.md`.
4. Run `npm run deck:validate -- decks/<name>/slide.md`.
5. Rework flagged slides instead of suppressing the findings.
