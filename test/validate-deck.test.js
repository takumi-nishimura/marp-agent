const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  formatSummary,
  validateDeckFile,
  validateDeckMarkdown,
} = require("../scripts/lib/deck-validator");

function fixture(name) {
  return path.join(__dirname, "..", "fixtures", "evaluation", name);
}

test("validator flags dense bullets", () => {
  const markdown = fs.readFileSync(fixture("dense-bullets-slide.md"), "utf8");
  const result = validateDeckMarkdown(markdown);

  assert.equal(result.slideCount, 1);
  assert.equal(
    result.findings.some((finding) => finding.ruleId === "dense-bullets"),
    true,
  );
});

test("validator flags figure-plus-text density", () => {
  const markdown = fs.readFileSync(fixture("figure-heavy-slide.md"), "utf8");
  const result = validateDeckMarkdown(markdown);

  assert.equal(
    result.findings.some((finding) => finding.ruleId === "figure-text-density"),
    true,
  );
});

test("validator flags long heading and overflow risk", () => {
  const markdown = fs.readFileSync(fixture("long-japanese-slide.md"), "utf8");
  const result = validateDeckMarkdown(markdown);

  assert.equal(
    result.findings.some((finding) => finding.ruleId === "long-heading"),
    true,
  );
  assert.equal(
    result.findings.some((finding) => finding.ruleId === "overflow-risk"),
    true,
  );
});

test("validator flags comparison density", () => {
  const markdown = fs.readFileSync(fixture("comparison-slide.md"), "utf8");
  const result = validateDeckMarkdown(markdown);

  assert.equal(
    result.findings.some(
      (finding) => finding.ruleId === "comparison-overpacked",
    ),
    true,
  );
});

test("validator ignores helper CSS and footnotes in balanced column layouts", () => {
  const markdown = fs.readFileSync(fixture("layout-balanced-slide.md"), "utf8");
  const result = validateDeckMarkdown(markdown);

  assert.equal(result.findings.length, 0);
});

test("validator skips overflow heuristics on title slides", () => {
  const markdown = fs.readFileSync(fixture("title-slide.md"), "utf8");
  const result = validateDeckMarkdown(markdown);

  assert.equal(
    result.findings.some((finding) => finding.ruleId === "overflow-risk"),
    false,
  );
  assert.equal(
    result.findings.some((finding) => finding.ruleId === "typography-drift"),
    false,
  );
});

test("validator writes report artifacts and uses injected screenshot exporter", () => {
  const reportDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "marp-agent-report-"),
  );
  const screenshotPath = path.join(reportDir, "screenshots", "slide-001.png");
  const deckPath = fixture("dense-bullets-slide.md");

  try {
    const result = validateDeckFile(deckPath, {
      reportDir,
      imageExporter: () => {
        fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
        fs.writeFileSync(screenshotPath, "fake image");
        return [screenshotPath];
      },
    });

    const reportJsonPath = path.join(reportDir, "report.json");
    const reportMarkdownPath = path.join(reportDir, "report.md");
    const summary = formatSummary(deckPath, result);

    assert.equal(fs.existsSync(reportJsonPath), true);
    assert.equal(fs.existsSync(reportMarkdownPath), true);
    assert.equal(fs.existsSync(screenshotPath), true);
    assert.match(summary, /Findings:/);
  } finally {
    fs.rmSync(reportDir, { recursive: true, force: true });
  }
});
