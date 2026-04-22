import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const truncateMarkerPattern = /<!--\s*truncate\s*-->|{\/\*\s*truncate\s*\*\/}/;
const blogRoots = [
  path.resolve(projectRoot, "blog"),
  path.resolve(projectRoot, "updates"),
  path.resolve(projectRoot, "i18n/zh-CN/docusaurus-plugin-content-blog"),
  path.resolve(projectRoot, "i18n/zh-CN/docusaurus-plugin-content-blog-updates"),
];
const blogExtensions = new Set([".md", ".mdx"]);
const missingDescription = [];
const missingImage = [];
const missingTruncateMarker = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!blogExtensions.has(path.extname(entry.name))) {
      continue;
    }

    const relativePath = path.relative(projectRoot, fullPath);
    const source = readFileSync(fullPath, "utf8");
    const frontMatterMatch = source.match(/^---\n([\s\S]*?)\n---/);
    const frontMatter = frontMatterMatch ? frontMatterMatch[1] : "";

    if (!truncateMarkerPattern.test(source)) {
      missingTruncateMarker.push(relativePath);
    }

    if (!/^description:\s*["'\S]/m.test(frontMatter)) {
      missingDescription.push(relativePath);
    }

    if (!/^image:\s*["'\S]/m.test(frontMatter)) {
      missingImage.push(relativePath);
    }
  }
}

blogRoots.forEach(walk);

assert.equal(
  missingTruncateMarker.length,
  0,
  [
    "Every blog/update post should include a truncation marker so list pages render excerpts consistently.",
    "Add `<!-- truncate -->` (or `{/* truncate */}`) at the intended preview cutoff.",
    "",
    "Offending files:",
    ...missingTruncateMarker.map(file => `- ${file}`),
  ].join("\n")
);

assert.equal(
  missingDescription.length,
  0,
  [
    "Every blog/update post should define frontmatter `description` for a controlled list-page summary.",
    "",
    "Offending files:",
    ...missingDescription.map(file => `- ${file}`),
  ].join("\n")
);

assert.equal(
  missingImage.length,
  0,
  [
    "Every blog/update post should define frontmatter `image` for a single, stable list-page cover.",
    "",
    "Offending files:",
    ...missingImage.map(file => `- ${file}`),
  ].join("\n")
);

console.log(
  "All blog and update posts include preview metadata and truncation markers."
);
