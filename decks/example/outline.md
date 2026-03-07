# Outline

- Source brief: brief.md
- Generated: 2026-03-07
- Target slide count: 16

## Deck Intent

- Audience summary: Primary audience: Lab members and developers evaluating how to build Marp decks in this repository / Existing knowledge: Comfortable with Markdown and basic CLI workflows, less familiar with Marp theming and repo-specific helpers / What they care about: Creating slides quickly, keeping layout quality consistent, and understanding what marp-agent adds on top of plain Marp
- Core message: One-sentence takeaway: marp-agent makes Marp slide authoring repeatable by combining a structured brief-to-outline workflow, automated validation, and repo-specific theme and plugin support.
- Must-use assets: Shared Marp logo / Example Mermaid diagram with Japanese labels and MathJax / Overview mode screenshot / Laser pointer screenshot
- Forbidden patterns: Tiny text utilities as the main overflow fix / Explaining marp-agent as only a theme without the workflow and validation story / Mixing unrelated ideas into one slide / CSS-first customization advice that skips the built-in helpers and validator

## Slide Plan

### Slide 1: marp-agent

- Title: marp-agent
- Takeaway: marp-agent combines workflow, validation, and theme support so Marp decks stay structured from design to export.
- Layout hint: title slide
- Overflow risk: low

### Slide 2: Marp とは? & その課題

- Title: Marp とは? & その課題
- Takeaway: Plain Marp is easy to start with, but layout drift and dense content make quality hard to sustain without guardrails.
- Layout hint: two-column comparison
- Overflow risk: medium

### Slide 3: marp-agent のアプローチ

- Title: marp-agent のアプローチ
- Takeaway: The brief -> outline -> slide workflow connects planning to concrete HTML, PDF, and PPTX outputs.
- Layout hint: diagram or sequenced bullets
- Overflow risk: low

### Slide 4: Step 1: デッキの作成

- Title: Step 1: デッキの作成
- Takeaway: `npm run new` standardizes the deck structure and shared asset wiring before authors start writing slides.
- Layout hint: code-and-file-tree comparison
- Overflow risk: low

### Slide 5: Step 2: brief.md を書く

- Title: Step 2: brief.md を書く
- Takeaway: `brief.md` captures audience, duration, message, and constraints before slide-level writing starts.
- Layout hint: code sample plus checklist
- Overflow risk: medium

### Slide 6: Step 3: アウトライン生成

- Title: Step 3: アウトライン生成
- Takeaway: `outline.md` turns the brief into a slide-by-slide plan with layout hints and overflow warnings.
- Layout hint: command plus compact table
- Overflow risk: low

### Slide 7: Step 4: スライド執筆 & バリデーション

- Title: Step 4: スライド執筆 & バリデーション
- Takeaway: Validation and report generation make review concrete by locating problems per slide.
- Layout hint: two-column code and artifact summary
- Overflow risk: medium

### Slide 8: バリデータの検査ルール

- Title: バリデータの検査ルール
- Takeaway: The validator encodes practical thresholds for headings, bullet density, comparisons, typography, and overflow risk.
- Layout hint: comparison table
- Overflow risk: medium

### Slide 9: バリデータが防ぐもの

- Title: バリデータが防ぐもの
- Takeaway: The validator acts as a guardrail that pushes authors to split dense slides instead of shrinking text.
- Layout hint: before-and-after comparison
- Overflow risk: medium

### Slide 10: lab テーマの特徴

- Title: lab テーマの特徴
- Takeaway: The lab theme packages layout helpers, typography scales, color schemes, and callouts into reusable conventions.
- Layout hint: feature comparison columns
- Overflow risk: medium

### Slide 11: Mermaid 図の日本語対応

- Title: Mermaid 図の日本語対応
- Takeaway: `beautiful-mermaid` and MathJax support make Japanese Mermaid diagrams render reliably inside Marp slides.
- Layout hint: problem statement plus diagram
- Overflow risk: medium

### Slide 12: プレビュー & プラグイン

- Title: プレビュー & プラグイン
- Takeaway: Preview helpers and plugins shorten the edit-review loop while supporting selective rendering and Mermaid conversion.
- Layout hint: two-column feature plus screenshot
- Overflow risk: low

### Slide 13: レーザーポインター

- Title: レーザーポインター
- Takeaway: The built-in laser pointer improves live delivery without requiring extra presentation tooling.
- Layout hint: two-column feature plus screenshot
- Overflow risk: low

### Slide 14: コマンド一覧

- Title: コマンド一覧
- Takeaway: A small command set covers deck creation, outline generation, validation, theme builds, and preview workflows.
- Layout hint: command reference table
- Overflow risk: medium

### Slide 15: まとめ

- Title: まとめ
- Takeaway: The combination of structured planning, automated validation, and repo-specific helpers is the core value of marp-agent.
- Layout hint: numbered summary with callouts
- Overflow risk: medium

### Slide 16: Thank you!

- Title: Thank you!
- Takeaway: End with the repository link and leave the audience with a clear path to try the workflow themselves.
- Layout hint: closing title slide
- Overflow risk: low

## Source Notes

- README.md
- decks/example/slide.md
- themes/lab.css
