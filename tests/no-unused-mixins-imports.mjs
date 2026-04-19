import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const srcDir = path.resolve(projectRoot, "src");
const mixinsPath = path.resolve(srcDir, "css/mixins.scss");
const mixinsSource = readFileSync(mixinsPath, "utf8");
const mixinsImportStatement = '@use "../../css/mixins.scss" as *;';

const mixinNames = [...mixinsSource.matchAll(/@mixin\s+([A-Za-z0-9_-]+)/g)].map(
  match => match[1]
);
const variableNames = [...mixinsSource.matchAll(/^\$([A-Za-z0-9_-]+):/gm)].map(
  match => match[1]
);

const helperUsagePatterns = [
  ...mixinNames.map(name => ({
    kind: "mixin",
    name,
    pattern: new RegExp(`@include\\s+${escapeRegExp(name)}\\b`),
  })),
  ...variableNames.map(name => ({
    kind: "variable",
    name,
    pattern: new RegExp(`\\$${escapeRegExp(name)}\\b`),
  })),
];

const offenders = [];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!entry.name.endsWith(".scss")) {
      continue;
    }

    const relativePath = path.relative(projectRoot, fullPath);
    const source = readFileSync(fullPath, "utf8");

    if (!source.includes(mixinsImportStatement)) {
      continue;
    }

    const strippedSource = stripComments(
      source.replace(mixinsImportStatement, "")
    );
    const matchedHelper = helperUsagePatterns.find(({ pattern }) =>
      pattern.test(strippedSource)
    );

    if (!matchedHelper) {
      offenders.push(relativePath);
    }
  }
}

walk(srcDir);

assert.equal(
  offenders.length,
  0,
  [
    "Some style modules import src/css/mixins.scss without using any exported Sass helper.",
    "Remove the unused @use to keep module dependencies explicit and avoid cargo-cult imports.",
    "",
    "Offending files:",
    ...offenders.map(file => `- ${file}`),
  ].join("\n")
);

console.log(
  "All src/css/mixins.scss imports are backed by actual Sass helper usage."
);
