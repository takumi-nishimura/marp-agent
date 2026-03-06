const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");
const { spawn } = require("node:child_process");

const { findSlideIdByDisplayedPage } = require("./lib/marp-pagination");

const repoRoot = path.resolve(__dirname, "..");
const defaultDeckPath = path.join(repoRoot, "decks", "example", "slide.md");
const configPath = path.join(repoRoot, "marp.config.js");

function printUsage() {
  console.error(
    "Usage: npm run slide -- [deck.md] [displayed-page]\n" +
      "       npm run slide -- [displayed-page]",
  );
}

function parsePositiveInteger(value) {
  if (!/^\d+$/.test(value)) return undefined;
  const parsed = Number(value);
  return parsed >= 1 ? parsed : undefined;
}

function parseArgs(args) {
  if (args.length === 0) {
    return { deckPath: defaultDeckPath };
  }

  const firstAsPage = parsePositiveInteger(args[0]);
  if (firstAsPage !== undefined) {
    if (args.length > 1) {
      throw new Error("Too many arguments.");
    }
    return { deckPath: defaultDeckPath, displayedPage: firstAsPage };
  }

  const deckPath = path.resolve(repoRoot, args[0]);
  const displayedPage =
    args[1] === undefined ? undefined : parsePositiveInteger(args[1]);

  if (args[1] !== undefined && displayedPage === undefined) {
    throw new Error(`Invalid displayed page: ${args[1]}`);
  }

  if (args.length > 2) {
    throw new Error("Too many arguments.");
  }

  return { deckPath, displayedPage };
}

function buildDeckUrl(baseUrl, deckPath, slideId) {
  const route = encodeURIComponent(path.basename(deckPath)).replace(
    /%2F/g,
    "/",
  );
  const hash = slideId ? `#${slideId}` : "";
  return `${baseUrl}/${route}${hash}`;
}

function openBrowser(url) {
  if (process.platform === "darwin") {
    return spawn("open", [url], { stdio: "ignore", detached: true });
  }

  if (process.platform === "win32") {
    return spawn("cmd", ["/c", "start", "", url], {
      stdio: "ignore",
      detached: true,
    });
  }

  return spawn("xdg-open", [url], { stdio: "ignore", detached: true });
}

function forwardLines(stream, writer, onLine) {
  const rl = readline.createInterface({ input: stream });
  rl.on("line", (line) => {
    writer.write(`${line}\n`);
    onLine(line);
  });
}

function main() {
  let parsedArgs;

  try {
    parsedArgs = parseArgs(process.argv.slice(2));
  } catch (error) {
    printUsage();
    console.error(error.message);
    process.exit(1);
  }

  const { deckPath, displayedPage } = parsedArgs;

  if (!fs.existsSync(deckPath)) {
    console.error(`Deck not found: ${deckPath}`);
    process.exit(1);
  }

  let slideId;

  if (displayedPage !== undefined) {
    const resolved = findSlideIdByDisplayedPage(
      deckPath,
      configPath,
      displayedPage,
    );
    if (!resolved) {
      console.error(
        `Displayed page ${displayedPage} was not found in ${path.relative(
          repoRoot,
          deckPath,
        )}.`,
      );
      process.exit(1);
    }
    slideId = resolved.slideId;
  }

  const deckDir = path.dirname(deckPath);
  const marpBin = path.join(
    repoRoot,
    "node_modules",
    ".bin",
    process.platform === "win32" ? "marp.cmd" : "marp",
  );
  const child = spawn(
    marpBin,
    ["--server", "--watch", "--config", configPath, deckDir],
    {
      cwd: repoRoot,
      stdio: ["inherit", "pipe", "pipe"],
    },
  );

  let opened = false;

  const tryOpen = (line) => {
    if (opened) return;
    const match = line.match(/http:\/\/localhost:\d+/);
    if (!match) return;

    const url = buildDeckUrl(match[0], deckPath, slideId);
    openBrowser(url).unref();
    opened = true;
    process.stdout.write(`[slide] Opened ${url}\n`);
  };

  forwardLines(child.stdout, process.stdout, tryOpen);
  forwardLines(child.stderr, process.stderr, tryOpen);

  const forwardSignal = (signal) => {
    if (!child.killed) child.kill(signal);
  };

  process.on("SIGINT", () => forwardSignal("SIGINT"));
  process.on("SIGTERM", () => forwardSignal("SIGTERM"));

  child.on("exit", (code, signal) => {
    if (signal) {
      process.exit(signal === "SIGINT" ? 130 : 143);
      return;
    }

    process.exit(code ?? 1);
  });
}

main();
