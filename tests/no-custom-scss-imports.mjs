import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const srcDir = path.resolve(process.cwd(), "src");
const allowedImporters = new Set([path.join("src", "css", "custom.scss")]);
const styleExtensions = new Set([".css", ".scss"]);
const offenders = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!styleExtensions.has(path.extname(entry.name))) {
      continue;
    }

    const relativePath = path.relative(process.cwd(), fullPath);
    const source = readFileSync(fullPath, "utf8");
    const importsCustomScss =
      /@use\s+["'][^"']*custom\.scss["']\s+as\s+\*/.test(source);

    if (importsCustomScss && !allowedImporters.has(relativePath)) {
      offenders.push(relativePath);
    }
  }
}

walk(srcDir);

assert.equal(
  offenders.length,
  0,
  [
    "Style modules must not import src/css/custom.scss directly.",
    "custom.scss emits global CSS, so importing it from modules duplicates the entire stylesheet bundle.",
    "",
    "Offending files:",
    ...offenders.map(file => `- ${file}`),
  ].join("\n")
);

console.log("No style modules import src/css/custom.scss directly.");
