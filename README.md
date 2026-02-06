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
├── slide.md          # Slide content (from template)
├── assets/
│   ├── img/          # Local images
│   └── video/        # Local videos
└── shared -> ../../assets  # Symlink to global assets
```

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
├── decks/            # Presentation decks
│   └── example/
│       ├── slide.md
│       └── shared -> ../../assets
├── scripts/          # Utility scripts
│   └── new-deck.js   # Deck creation script
├── template/         # Deck template
│   └── slide.md
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
