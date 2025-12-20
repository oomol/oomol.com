I will optimize the `/headless` page to align with the "developer-first" and "freedom" philosophy you described.

### Plan Overview

The goal is to transform the page from a generic product description to a developer-centric manifesto that emphasizes freedom, open source, and lack of lock-in.

### 1. Update `src/pages/headless/index.tsx`

I will restructure the page to include a new "Philosophy" section and update the Hero section.

- **Hero Section**: Refocus the message on "Runtime in a Container" and "Run Anywhere".
- **New Section: "Developer Freedom" (Philosophy)**:
  - addressing the "anti-lock-in" and "commercialization fears" directly.
  - Highlight:
    - **Deployment Freedom**: NAS, Server, Cloud.
    - **Open Source Kernel**: Explicitly mention `oomol-runtime` is open source.
    - **Trust**: "Code is Law" spirit.

### 2. Update Internationalization (i18n)

I will update `i18n/zh-CN/code.json` (and English equivalent) with the new copy to ensure the tone is right.

**New Copy Preview (Chinese):**

- **Hero Description**: "本质上是将 OOMOL Studio 的运行环境以容器镜像的方式交付给开发者。自由部署，拒绝捆绑。"
- **Philosophy Title**: "我们的承诺：自由与开放"
- **Key Points**:
  - "拒绝商业捆绑：我们开源了核心 Runtime，确保你永远拥有底层的掌控权。"
  - "部署无边界：无论是个人 NAS、私有服务器还是公有云，你的环境你做主。"
  - "安心共建：尊重开发者意志，公开透明，Code is Law。"

### 3. Visual/Structure Changes

- Add a section emphasizing the "Open Source" aspect, possibly with a link to the GitHub repo for the runtime.
- Use existing UI components (like `FeatureCard`) but repurposed for these new values.

I will proceed with editing `src/pages/headless/index.tsx` and the translation files upon your confirmation.
