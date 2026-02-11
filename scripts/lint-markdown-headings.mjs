import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const UTF8_BOM_RE = /^\uFEFF/;
const HEADING_RE = /^#{1,6}\s+\S/;

function sh(command) {
  return execSync(command, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function trySh(command) {
  try {
    return sh(command);
  } catch {
    return null;
  }
}

function findBaseRef() {
  const candidates = ["origin/develop", "develop"];
  for (const ref of candidates) {
    const mergeBase = trySh(`git merge-base HEAD ${ref}`);
    if (mergeBase) {
      return mergeBase;
    }
  }

  const headMinus1 = trySh("git rev-parse HEAD~1");
  return headMinus1;
}

function getChangedMarkdownFiles(baseRef) {
  const diff = baseRef
    ? sh(`git diff --name-only --diff-filter=AMR ${baseRef}...HEAD`)
    : sh("git diff --name-only --diff-filter=AMR");

  return diff
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((filePath) => filePath.endsWith(".md"));
}

function isBlank(line) {
  return line.trim().length === 0;
}

function stripUtf8Bom(line) {
  return line.replace(UTF8_BOM_RE, "");
}

function indexAfterFrontmatter(lines) {
  if (lines.length === 0) {
    return 0;
  }

  if (stripUtf8Bom(lines[0]).trim() !== "---") {
    return 0;
  }

  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === "---") {
      return i + 1;
    }
  }

  return lines.length;
}

function firstNonEmptyNonCommentLine(lines) {
  let inHtmlComment = false;
  const startIndex = indexAfterFrontmatter(lines);

  for (let i = startIndex; i < lines.length; i += 1) {
    const rawLine = stripUtf8Bom(lines[i]);
    const trimmed = rawLine.trim();

    if (inHtmlComment) {
      if (trimmed.includes("-->")) {
        inHtmlComment = false;
      }
      continue;
    }

    if (trimmed.startsWith("<!--")) {
      if (!trimmed.includes("-->")) {
        inHtmlComment = true;
      }
      continue;
    }

    if (trimmed.length === 0) {
      continue;
    }

    return { line: rawLine, lineNumber: i + 1 };
  }

  return null;
}

function lintMd041TopLevelHeading(filePath, lines) {
  const first = firstNonEmptyNonCommentLine(lines);
  if (!first) {
    return [];
  }

  const trimmed = stripUtf8Bom(first.line).trim();
  if (!(trimmed.startsWith("# ") || trimmed.startsWith("#\t"))) {
    return [
      {
        filePath,
        lineNumber: first.lineNumber,
        rule: "MD041",
        message:
          "First non-empty line must be a top-level H1 heading ('# ...').",
      },
    ];
  }

  return [];
}

function lintMd022HeadingsSurroundedByBlankLines(filePath, lines) {
  const issues = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = stripUtf8Bom(lines[i]);
    if (!HEADING_RE.test(line)) {
      continue;
    }

    const prev = i === 0 ? null : lines[i - 1];
    const next = i === lines.length - 1 ? null : lines[i + 1];

    if (prev !== null && !isBlank(prev)) {
      issues.push({
        filePath,
        lineNumber: i + 1,
        rule: "MD022",
        message: "Heading must be preceded by a blank line.",
      });
    }

    if (next !== null && !isBlank(next)) {
      issues.push({
        filePath,
        lineNumber: i + 1,
        rule: "MD022",
        message: "Heading must be followed by a blank line.",
      });
    }
  }

  return issues;
}

function main() {
  const insideRepo = trySh("git rev-parse --is-inside-work-tree");
  if (insideRepo !== "true") {
    console.log("markdown-lint: skipped (not a git work tree).");
    return;
  }

  const baseRef = findBaseRef();
  const files = getChangedMarkdownFiles(baseRef);
  if (files.length === 0) {
    console.log("markdown-lint: no changed .md files.");
    return;
  }

  const allIssues = [];

  for (const filePath of files) {
    const contents = readFileSync(filePath, "utf8");
    const lines = contents.split("\n");

    allIssues.push(...lintMd041TopLevelHeading(filePath, lines));
    allIssues.push(...lintMd022HeadingsSurroundedByBlankLines(filePath, lines));
  }

  if (allIssues.length > 0) {
    for (const issue of allIssues) {
      console.error(
        `${issue.filePath}:${issue.lineNumber} ${issue.rule} ${issue.message}`
      );
    }
    process.exitCode = 1;
    return;
  }

  console.log("markdown-lint: ok.");
}

main();
