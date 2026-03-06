# Evaluation Fixtures

These fixtures intentionally cover common deck-generation edge cases.

- `good-brief.md`: A compact, well-structured input brief for outline generation.
- `dense-bullets-slide.md`: A slide with too many bullets.
- `figure-heavy-slide.md`: A slide that combines a visual with too much explanation.
- `long-japanese-slide.md`: A slide with long Japanese copy that should trip overflow heuristics.
- `comparison-slide.md`: A comparison slide that is too dense for a single frame.
- `layout-balanced-slide.md`: A structured two-column slide with helper CSS and footnotes that should stay clean.
- `title-slide.md`: A title slide with local styles and scripts that should not trip overflow heuristics.
