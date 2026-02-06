const fs = require("fs");
const path = require("path");
const os = require("os");

const name = process.argv[2];
if (!name) {
  console.error("Usage: npm run new <path>");
  console.error("Path is relative to repository root.");
  console.error("Examples:");
  console.error("  npm run new decks/2025/presentation");
  console.error("  npm run new decks/2026/test");
  process.exit(1);
}

// Resolve all paths from repository root
const repoRoot = path.resolve(__dirname, "..");
const deckDir = path.join(repoRoot, name);
const templatePath = path.join(repoRoot, "template", "slide.md");
const date = new Date().toISOString().split("T")[0];

// Check if template exists
if (!fs.existsSync(templatePath)) {
  console.error(`Error: Template not found at ${templatePath}`);
  process.exit(1);
}

// Create directory
fs.mkdirSync(deckDir, { recursive: true });

// Copy template with date replacement
let content = fs.readFileSync(templatePath, "utf8");
content = content.replace("date", date);
fs.writeFileSync(path.join(deckDir, "slide.md"), content);

// Create local assets directories
fs.mkdirSync(path.join(deckDir, "assets", "img"), { recursive: true });
fs.mkdirSync(path.join(deckDir, "assets", "video"), { recursive: true });
fs.writeFileSync(path.join(deckDir, "assets", "video", ".gitkeep"), "");

// Create shared symlink to global assets
const assetsDir = path.join(repoRoot, "assets");
const sharedPath = path.join(deckDir, "shared");
const relativePath = path.relative(deckDir, assetsDir);

// Remove existing symlink if exists
if (fs.existsSync(sharedPath) || fs.lstatSync(sharedPath, { throwIfNoEntry: false })) {
  try {
    fs.unlinkSync(sharedPath);
  } catch (err) {
    // Ignore errors if file doesn't exist
  }
}

// Create symlink with OS-specific handling
try {
  const symlinkType = os.platform() === "win32" ? "junction" : "dir";
  fs.symlinkSync(relativePath, sharedPath, symlinkType);
  const relativeToRepo = path.relative(repoRoot, deckDir);
  console.log(`✓ Created: ${relativeToRepo}/`);
  console.log(`  - slide.md`);
  console.log(`  - assets/img/`);
  console.log(`  - assets/video/`);
  console.log(`  - shared -> ${relativePath}`);
} catch (err) {
  console.error(`Error creating symlink: ${err.message}`);
  if (os.platform() === "win32") {
    console.error(
      "\nNote: On Windows, you may need to run as Administrator or enable Developer Mode."
    );
    console.error("Alternatively, manually create the symlink:");
    console.error(`  mklink /J "${sharedPath}" "${path.resolve(deckDir, relativePath)}"`);
  }
  process.exit(1);
}
