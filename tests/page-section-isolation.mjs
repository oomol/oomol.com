import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const customScssPath = path.resolve(process.cwd(), "src/css/custom.scss");
const source = readFileSync(customScssPath, "utf8");

function readBlock(sourceText, header) {
  const headerIndex = sourceText.indexOf(header);
  assert.notEqual(headerIndex, -1, `Expected to find block header: ${header}`);

  const openBraceIndex = sourceText.indexOf("{", headerIndex + header.length);
  assert.notEqual(openBraceIndex, -1, `Expected ${header} to open a block.`);

  let depth = 1;

  for (let index = openBraceIndex + 1; index < sourceText.length; index += 1) {
    const char = sourceText[index];

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return sourceText.slice(openBraceIndex + 1, index);
      }
    }
  }

  throw new Error(`Expected ${header} to close its block.`);
}

function readRuleBlock(sourceText, selector) {
  const selectorIndex = sourceText.indexOf(selector);
  assert.notEqual(
    selectorIndex,
    -1,
    `Expected to find selector in custom.scss: ${selector}`
  );

  const openBraceIndex = sourceText.indexOf(
    "{",
    selectorIndex + selector.length
  );
  assert.notEqual(openBraceIndex, -1, `Expected ${selector} to open a rule.`);

  let depth = 1;

  for (let index = openBraceIndex + 1; index < sourceText.length; index += 1) {
    const char = sourceText[index];

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return sourceText.slice(openBraceIndex + 1, index);
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

const contentVisibilitySupportBlock = readBlock(
  source,
  "@supports (content-visibility: auto)"
);

const isolatedSectionsRule = readRuleBlock(
  contentVisibilitySupportBlock,
  ".oomol-home-main > *"
);

assert.ok(
  contentVisibilitySupportBlock.includes(".oomol-home-main > *"),
  "Expected oomol-home-main direct children to participate in section isolation."
);
assert.ok(
  contentVisibilitySupportBlock.includes(".oomol-landing-main > *"),
  "Expected oomol-landing-main direct children to participate in section isolation."
);
assertDeclaration(
  isolatedSectionsRule,
  "content-visibility",
  "auto",
  "Expected section isolation to use content-visibility: auto."
);
assertDeclaration(
  isolatedSectionsRule,
  "contain",
  "content",
  "Expected section isolation to use contain: content."
);
assertDeclaration(
  isolatedSectionsRule,
  "contain-intrinsic-size",
  "auto var(--oomol-page-block-intrinsic-size)",
  "Expected section isolation to keep a stable intrinsic size fallback."
);

const optOutRule = readRuleBlock(
  contentVisibilitySupportBlock,
  ".oomol-home-main > .oomol-no-section-isolation"
);

assert.ok(
  contentVisibilitySupportBlock.includes(
    ".oomol-home-main > .oomol-no-section-isolation"
  ),
  "Expected oomol-home-main to expose a section-isolation opt-out class."
);
assert.ok(
  contentVisibilitySupportBlock.includes(".oomol-home-main > :target"),
  "Expected oomol-home-main direct hash targets to opt out of section isolation."
);
assert.ok(
  contentVisibilitySupportBlock.includes(
    ".oomol-landing-main > .oomol-no-section-isolation"
  ),
  "Expected oomol-landing-main to expose a section-isolation opt-out class."
);
assert.ok(
  contentVisibilitySupportBlock.includes(".oomol-landing-main > :target"),
  "Expected oomol-landing-main direct hash targets to opt out of section isolation."
);
assertDeclaration(
  optOutRule,
  "content-visibility",
  "visible",
  "Expected isolation opt-outs to restore content visibility."
);
assertDeclaration(
  optOutRule,
  "contain",
  "none",
  "Expected isolation opt-outs to drop contain: content."
);
assertDeclaration(
  optOutRule,
  "contain-intrinsic-size",
  "auto",
  "Expected isolation opt-outs to drop the synthetic intrinsic size."
);

console.log("Page-section isolation rules are present in custom.scss.");
