I will redesign the `src/pages/studio/index.tsx` page to be a "Design Philosophy" manifest, focusing on a developer-to-developer narrative rather than marketing features.

**Key Changes:**

1.  **Shift Tone:** Change from "Product Marketing" to "Engineering Blog/Manifesto".
2.  **New Structure:**
    *   **Header:** "Built by Developers, For Developers."
    *   **The "Why" (The Frustration):** A storytelling section about why traditional workflow tools fail developers (black boxes, proprietary DSLs, bad editors).
    *   **The "How" (Design Decisions):**
        *   **Principle 1: Code is the Source of Truth.** Explaining the `Node == Function` mapping.
        *   **Principle 2: Respect the Tooling.** Why we integrated full VS Code (Monaco) and LSP, not just a text area.
        *   **Principle 3: No Artificial Limits.** Why we use real Docker containers, allowing full `npm`/`pip` access.
    *   **The Result:** A brief summary of what this enables (bridging visual & code).
3.  **Visual Style:**
    *   Use a cleaner, editorial layout (more whitespace, better typography).
    *   Use code snippets side-by-side with "Node" visuals to demonstrate the mapping.
    *   Remove the repetitive "Feature Grid" and "Comparison Table" that duplicates the homepage.

**File Changes:**
*   `src/pages/studio/index.tsx`: Complete rewrite of the content.
*   `src/pages/studio/styles.module.scss`: Update styles for the editorial/manifest layout.
