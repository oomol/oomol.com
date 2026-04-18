import { defineConfig, presetIcons, presetWind } from "unocss";

/**
 * cva 内 `.join(" ")` 拼接的类名，Uno CLI 静态扫描可能漏收；safelist 保证写入 uno.css。
 * 开发/构建前请跑 `npm run build-unocss`（`npm start` 已会先执行）。
 */
const buttonBorderSafelist = [
  "border",
  "border-0",
  "border-solid",
  "border-transparent",
  "border-[var(--oomol-foreground)]",
  "border-[var(--oomol-primary)]",
  "border-[var(--oomol-error)]",
  "border-[var(--oomol-border-strong)]",
  "border-[var(--oomol-divider)]",
  "border-[var(--oomol-border-default)]",
  "hover:border-[var(--oomol-foreground-hover)]",
  "hover:border-[var(--oomol-primary-hover)]",
  "active:border-[var(--oomol-primary-active)]",
  "hover:border-[var(--oomol-border-strong)]",
] as const;

const oomolTypeSafelist = [
  "text-oomol-xs",
  "text-oomol-sm",
  "text-oomol-base",
  "text-oomol-lg",
  "text-oomol-mono",
  "text-oomol-body",
  "sm:text-oomol-lg",
  "sm:text-oomol-sm",
  "sm:text-oomol-xs",
] as const;

export default defineConfig({
  safelist: [...buttonBorderSafelist, ...oomolTypeSafelist],
  rules: [
    ["text-oomol-xs", { "font-size": "var(--oomol-font-size-xs)" }],
    ["text-oomol-sm", { "font-size": "var(--oomol-font-size-sm)" }],
    ["text-oomol-base", { "font-size": "var(--oomol-font-size-base)" }],
    ["text-oomol-lg", { "font-size": "var(--oomol-font-size-lg)" }],
    ["text-oomol-mono", { "font-size": "var(--oomol-body-mono)" }],
    ["text-oomol-body", { "font-size": "var(--oomol-body-base)" }],
  ],
  presets: [
    presetIcons({
      collections: {
        bi: () => import("@iconify/json/json/bi.json").then(i => i.default),
        octicon: () =>
          import("@iconify/json/json/octicon.json").then(i => i.default),
        "simple-icons": () =>
          import("@iconify/json/json/simple-icons.json").then(i => i.default),
        codicon: () =>
          import("@iconify/json/json/codicon.json").then(i => i.default),
        "file-icons": () =>
          import("@iconify/json/json/file-icons.json").then(i => i.default),
        ic: () => import("@iconify/json/json/ic.json").then(i => i.default),
        lucide: () =>
          import("@iconify/json/json/lucide.json").then(i => i.default),
      },
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
        "user-select": "none",
        cursor: "default",
      },
    }),
    presetWind(),
  ],
});
