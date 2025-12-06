import styles from "./styles.module.scss";

import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import CodeBlock from "@theme/CodeBlock";
import Layout from "@theme/Layout";
import React from "react";

export default function StudioPage() {
  return (
    <Layout
      title="OOMOL Studio - Design Philosophy"
      description="Built by developers, for developers. Why we built OOMOL Studio the way we did."
    >
      <div className={styles.container}>
        {/* 1. Header / Manifesto Title */}
        <header className={styles.manifestHeader}>
          <h1 className={styles.title}>Built by Developers, For Developers.</h1>
          <p className={styles.subtitle}>
            We built OOMOL Studio because we were tired of choosing between
            "easy to use" and "powerful enough."
          </p>
        </header>

        {/* 2. The Story (The "Why") */}
        <section className={styles.storySection}>
          <p>
            As engineers, we love automation. We love chaining tools together to
            build pipelines, agents, and data flows. But whenever we tried to
            use existing "Workflow Platforms," we hit a wall.
          </p>

          <div className={styles.frustrationBlock}>
            <p>
              "Why do I have to learn a proprietary JSON syntax just to write an
              if/else statement?"
              <br />
              <br />
              "Why can't I just import a library? Why do I have to wait for the
              platform to support it?"
              <br />
              <br />
              "Why am I coding in a textarea with no autocomplete?"
            </p>
          </div>

          <p>
            We realized that <strong>Low Code</strong> often meant{" "}
            <strong>High Frustration</strong> for professional developers. It
            abstracted away the things we actually liked: control, debugging,
            and the ecosystem.
          </p>
          <p>
            So we decided to build something different. Not a "No-Code" toy, but
            a real IDE.
          </p>
        </section>

        {/* 3. The Principles (The "How") */}
        <section className={styles.principlesSection}>
          <div className={styles.principlesHeader}>
            <h2>Our Design Philosophy</h2>
          </div>

          {/* Principle 1 */}
          <div className={styles.principleItem}>
            <div className={styles.principleText}>
              <h3>1. Code is the Source of Truth</h3>
              <p>
                We didn't invent a new visual language. We simply visualize
                standard code.
              </p>
              <p>
                In OOMOL, a <strong>Node</strong> is just a{" "}
                <strong>Function</strong>. The inputs are arguments, the outputs
                are return values.
              </p>
              <p>
                You don't "configure" a node; you write a function. The UI is
                just a reflection of your code's signature.
              </p>
            </div>
            <div className={styles.principleVisual}>
              <CodeBlock language="typescript">
                {`// This function...
export default function summarize(text: string) {
  return llm.summarize(text);
}

// ...Automatically becomes a Node with:
// Input port: "text"
// Output port: "result"`}
              </CodeBlock>
            </div>
          </div>

          {/* Principle 2 */}
          <div className={styles.principleItem}>
            <div className={styles.principleText}>
              <h3>2. Respect the Tooling</h3>
              <p>
                We believe you shouldn't have to downgrade your environment just
                to use a visual tool.
              </p>
              <p>
                That's why we embedded the full <strong>Monaco Editor</strong>{" "}
                (VS Code) into every node.
              </p>
              <p>
                Intellisense, Type Checking, Linting, Formatting, and even full
                <strong> Debugging Protocol (DAP)</strong> support. It feels
                like home because it <em>is</em> home.
              </p>
            </div>
            <div className={styles.principleVisual}>
              <CodeBlock language="json">
                {`{
  "editor": "VS Code (Monaco)",
  "features": [
    "Intellisense",
    "Go to Definition",
    "Breakpoints",
    "Variable Inspection"
  ]
}`}
              </CodeBlock>
            </div>
          </div>

          {/* Principle 3 */}
          <div className={styles.principleItem}>
            <div className={styles.principleText}>
              <h3>3. No Artificial Limits</h3>
              <p>
                Traditional platforms run your code in a restricted, proprietary
                sandbox. If you need a C++ binding or a system-level tool,
                you're stuck.
              </p>
              <p>
                OOMOL runs on <strong>Standard Docker Containers</strong>.
              </p>
              <p>
                Need <code>ffmpeg</code>? <code>apt-get install</code> it. Need
                a specific Python version? Just define it. You have full root
                access to the runtime environment.
              </p>
            </div>
            <div className={styles.principleVisual}>
              <CodeBlock language="bash">
                {`# No wrappers. Just standard tools.
$ pip install pandas numpy torch
$ apt-get install ffmpeg

# It just works.`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
