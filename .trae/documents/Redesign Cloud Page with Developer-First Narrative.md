I will update the **OOMOL Cloud** page (`src/pages/cloud`) to reflect the new developer-centric narrative, focusing on "Empathy," "Simplicity," and the "Three Core Modes."

### 1. Update Translation Files (`i18n/zh-CN/code.json` & `i18n/en/code.json`)

I will update the `CLOUD.*` keys to match the new copy.

- **Hero Section:**
  - Title: "Focus on Coding, Enjoy Programming" (专注代码，享受编程)
  - Subtitle: "You write the Function Block, leave the rest to OOMOL." (你只管写函数 Block，剩下的交给 OOMOL。)
- **Pain Points Section (New):**
  - Narrative: "Writing code is creative; delivering it shouldn't be a burden. Forget about server provisioning, environment setup, and deployment headaches." (作为开发者，我们深知：写代码是创造的乐趣，但交付往往是枯燥的负担...)
- **Three Modes (The Solution):**
  - **Function Library:** Share and compose (发布为函数库，供他人复用或组合)
  - **Serverless API:** One-click deploy, auto-scaling (部署为云函数，提供 Serverless API 服务)
  - **MCP for AI:** Native AI integration (以 MCP 方式提供给 AI 调用)
- **Pricing/Closing:**
  - "Pay-as-you-go. No upfront costs. Save money, save effort." (按调用收取费用，不用预支钱。省钱省力，享受编程。)

### 2. Update Page Component (`src/pages/cloud/index.tsx`)

I will restructure the page layout:

- **Hero:** Update title, description, and stats to highlight "No Ops" and "Pay-as-you-go".
- **Pain Points Section:** Add a new text-focused section to present the "Developer's Dilemma" narrative with affinity.
- **Core Modes Section:** Replace the generic "Use Cases" with the specific "Three Modes" (Library, API, MCP) as described.
- **Value/Pricing Section:** Emphasize the "Pay-as-you-go" model and "Enjoy Programming" philosophy.

### 3. Update Styles (`src/pages/cloud/styles.module.scss`)

- Add styling for the new **Pain Points** section (clean, readable typography, centered layout).
- Adjust existing card styles if necessary to fit the new content structure.

This approach ensures the page speaks directly to developers' pain points and clearly presents OOMOL Cloud as the solution, exactly as requested.
