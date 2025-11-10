import { defineConfig, presetIcons, presetWind } from "unocss";

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        bi: () => import('@iconify/json/json/bi.json').then(i => i.default),
        octicon: () => import('@iconify/json/json/octicon.json').then(i => i.default),
        'simple-icons': () => import('@iconify/json/json/simple-icons.json').then(i => i.default),
        codicon: () => import('@iconify/json/json/codicon.json').then(i => i.default),
        'file-icons': () => import('@iconify/json/json/file-icons.json').then(i => i.default),
        ic: () => import('@iconify/json/json/ic.json').then(i => i.default),
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
