import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const customScssPath = path.resolve(process.cwd(), "src/css/custom.scss");
const appPagePath = path.resolve(process.cwd(), "src/pages/app/index.tsx");
const customSource = readFileSync(customScssPath, "utf8");
const appPageSource = readFileSync(appPagePath, "utf8");

function readBlock(source, header) {
  const headerIndex = source.indexOf(header);
  assert.notEqual(headerIndex, -1, `Expected to find block header: ${header}`);

  const openBraceIndex = source.indexOf("{", headerIndex + header.length);
  assert.notEqual(openBraceIndex, -1, `Expected ${header} to open a block.`);

  let depth = 1;

  for (let index = openBraceIndex + 1; index < source.length; index += 1) {
    const char = source[index];

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(openBraceIndex + 1, index);
      }
    }
  }

  throw new Error(`Expected ${header} to close its block.`);
}

function readRuleBlock(source, selector) {
  const selectorIndex = source.indexOf(selector);
  assert.notEqual(selectorIndex, -1, `Expected to find selector: ${selector}`);

  const openBraceIndex = source.indexOf("{", selectorIndex + selector.length);
  assert.notEqual(openBraceIndex, -1, `Expected ${selector} to open a rule.`);

  let depth = 1;

  for (let index = openBraceIndex + 1; index < source.length; index += 1) {
    const char = source[index];

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(openBraceIndex + 1, index);
      }
    }
  }

  throw new Error(`Expected ${selector} to close its rule.`);
}

function normalizeCss(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([:;,{}])\s*/g, "$1")
    .trim();
}

function assertDeclaration(ruleBlock, property, value, message) {
  const normalizedRuleBlock = normalizeCss(ruleBlock);
  assert.ok(
    normalizedRuleBlock.includes(`${property}:${value}`),
    message ?? `Expected declaration ${property}: ${value}.`
  );
}

assert.match(
  appPageSource,
  /<section[\s\S]*?id="models-demo"[\s\S]*?<h2 id="models-demo-heading"/,
  "Expected a nested hash target canary inside src/pages/app/index.tsx."
);

const contentVisibilitySupportBlock = readBlock(
  customSource,
  "@supports (content-visibility: auto)"
);
const hasTargetSupportBlock = readBlock(
  contentVisibilitySupportBlock,
  "@supports selector(:has(:target))"
);

assert.ok(
  hasTargetSupportBlock.includes(".oomol-home-main > :has(:target)"),
  "Expected oomol-home-main deep :target opt-out selector."
);
assert.ok(
  hasTargetSupportBlock.includes(".oomol-landing-main > :has(:target)"),
  "Expected oomol-landing-main deep :target opt-out selector."
);

const deepTargetOptOutRule = readRuleBlock(
  hasTargetSupportBlock,
  ".oomol-home-main > :has(:target)"
);

assertDeclaration(
  deepTargetOptOutRule,
  "content-visibility",
  "visible",
  "Expected deep :target sections to disable content-visibility."
);
assertDeclaration(
  deepTargetOptOutRule,
  "contain",
  "none",
  "Expected deep :target sections to drop contain: content."
);
assertDeclaration(
  deepTargetOptOutRule,
  "contain-intrinsic-size",
  "auto",
  "Expected deep :target sections to drop synthetic intrinsic size."
);

console.log(
  "Deep hash targets stay opt-out capable under page-section isolation."
);
