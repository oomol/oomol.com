import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const customScssPath = path.resolve(process.cwd(), "src/css/custom.scss");
const source = readFileSync(customScssPath, "utf8");

function normalizeCss(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([:;,{}()])\s*/g, "$1")
    .trim();
}

const normalizedSource = normalizeCss(source);

for (const pageClass of [".oomol-home-main", ".oomol-landing-main"]) {
  assert.ok(
    normalizedSource.includes(
      `${pageClass} [class*="Eyebrow"]:not([class*="EyebrowNumber"]):not([class*="EyebrowLabel"]):not([class*="EyebrowDivider"])::before`
    ),
    `Expected ${pageClass} Eyebrow bullet selector to exclude Number/Label/Divider variants.`
  );
}

console.log(
  "Eyebrow bullet exclusions are present for home and landing pages."
);
