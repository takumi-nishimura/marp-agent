# Marp Agent

A Marp-based presentation framework with a custom theme and workflow.

## Setup

```bash
npm install
```

## Usage

### Create a New Deck

All paths are relative to repository root.

```bash
npm run new decks/my-presentation
npm run new decks/2025/conference-talk
npm run new decks/2026/test
```

This will create:

```
decks/<name>/
├── brief.md          # Structured authoring input
├── slide.md          # Marp slide deck
├── assets/
│   ├── img/          # Local images
│   └── video/        # Local videos
└── shared -> ../../assets  # Symlink to global assets
```

### Brief-First Authoring Flow

Start with `brief.md`, generate `outline.md`, then turn that outline into `slide.md`.

`brief.md` uses a fixed schema so generation starts from a stable input:

- `Audience`
- `Duration`
- `Core message`
- `Audience action`
- `Required sections`
- `Must-use assets`
- `Forbidden patterns`
- `References`

Keep the brief compact and concrete. If a section does not apply, write `None` instead of deleting it.

Generate an outline from the brief:

```bash
npm run outline -- decks/my-presentation/brief.md
```

The generator writes `outline.md` next to the brief. Each planned slide includes:

- `Title`
- `Takeaway`
- `Layout hint`
- `Overflow risk`

Validate a deck before review:

```bash
npm run deck:validate -- decks/my-presentation/slide.md

# Write JSON/Markdown reports and per-slide screenshots for flagged slides
npm run deck:validate -- decks/my-presentation/slide.md --report-dir out/my-presentation
```

The validator reports:

- Overflow risk heuristics
- Typography drift toward tiny text
- Structure issues such as dense bullets, long headings, figure-plus-text density, and overpacked comparison/table slides

### Theme Development

```bash
# Build theme once
npm run theme:build

# Watch for changes
npm run theme:watch
```

### Testing

```bash
# Run tests
npm test

# Verify deck scaffold output
npm run test:scaffold

# Run browser-based tests when they exist
npm run test:e2e

# Interactive mode
npm run test:ui

# Headed mode (visible browser)
npm run test:headed
```

## Project Structure

```
.
├── assets/           # Global shared assets
│   ├── img/
│   ├── logos/
│   └── video/
├── fixtures/         # Evaluation fixtures for authoring and validation
│   └── evaluation/
├── decks/            # Presentation decks
│   └── example/
│       ├── brief.md
│       ├── outline.md
│       ├── slide.md
│       └── shared -> ../../assets
├── scripts/          # Utility scripts
│   ├── generate-outline.js
│   ├── new-deck.js
│   └── validate-deck.js
├── template/         # Deck template
│   ├── brief.md
│   └── slide.md
├── test/             # Scaffold regression tests
│   ├── new-deck.test.js
│   ├── outline.test.js
│   └── validate-deck.test.js
├── themes/           # Marp themes
│   ├── lab.css
│   └── src/
└── vendor/           # Vendored dependencies
    └── marp-cli/
```

## OS Compatibility

The deck creation script supports:

- **macOS/Linux**: Uses standard symlinks
- **Windows**: Uses directory junctions (no admin rights required)

On Windows, if symlink creation fails, you may need to:

- Run as Administrator, or
- Enable Developer Mode in Windows Settings

Alternatively, create the symlink manually:

```cmd
mklink /J "decks\<name>\shared" "..\..\assets"
```
