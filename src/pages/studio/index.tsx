import styles from "./styles.module.scss";

import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import { translate } from "@docusaurus/Translate";
import CodeBlock from "@theme/CodeBlock";
import Layout from "@theme/Layout";
import React from "react";

export default function StudioPage() {
  return (
    <Layout
      title={translate({ message: "STUDIO.page.title" })}
      description={translate({ message: "STUDIO.page.description" })}
    >
      <div className={styles.container}>
        {/* 1. Header / Manifesto Title */}
        <header className={styles.manifestHeader}>
          <h1 className={styles.title}>{translate({ message: "STUDIO.manifesto.title" })}</h1>
          <p className={styles.subtitle}>
            {translate({ message: "STUDIO.manifesto.subtitle" })}
          </p>
        </header>

        {/* 2. The Story (The "Why") */}
        <section className={styles.storySection}>
          <p>
            {translate({ message: "STUDIO.story.paragraph1" })}
          </p>

          <div className={styles.frustrationBlock}>
            <p>
              {translate({ message: "STUDIO.story.frustration.line1" })}
              <br />
              <br />
              {translate({ message: "STUDIO.story.frustration.line2" })}
              <br />
              <br />
              {translate({ message: "STUDIO.story.frustration.line3" })}
            </p>
          </div>

          <p>
            {translate({ message: "STUDIO.story.paragraph2" })}
          </p>
          <p>
            {translate({ message: "STUDIO.story.paragraph3" })}
          </p>
        </section>

        {/* 3. The Principles (The "How") */}
        <section className={styles.principlesSection}>
          <div className={styles.principlesHeader}>
            <h2>{translate({ message: "STUDIO.principles.header" })}</h2>
          </div>

          {/* Principle 1 */}
          <div className={styles.principleItem}>
            <div className={styles.principleText}>
              <h3>{translate({ message: "STUDIO.principle1.title" })}</h3>
              <p>
                {translate({ message: "STUDIO.principle1.paragraph1" })}
              </p>
              <p>
                {translate({ message: "STUDIO.principle1.paragraph2" })}
              </p>
              <p>
                {translate({ message: "STUDIO.principle1.paragraph3" })}
              </p>
            </div>
            <div className={styles.principleVisual}>
              <CodeBlock language="typescript">
                {`${translate({ message: "STUDIO.principle1.codeComment1" })}
export default function summarize(text: string) {
  return llm.summarize(text);
}

${translate({ message: "STUDIO.principle1.codeComment2" })}
${translate({ message: "STUDIO.principle1.codeComment3" })}
${translate({ message: "STUDIO.principle1.codeComment4" })}`}
              </CodeBlock>
            </div>
          </div>

          {/* Principle 2 */}
          <div className={styles.principleItem}>
            <div className={styles.principleText}>
              <h3>{translate({ message: "STUDIO.principle2.title" })}</h3>
              <p>
                {translate({ message: "STUDIO.principle2.paragraph1" })}
              </p>
              <p>
                {translate({ message: "STUDIO.principle2.paragraph2" })}
              </p>
              <p>
                {translate({ message: "STUDIO.principle2.paragraph3" })}
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
              <h3>{translate({ message: "STUDIO.principle3.title" })}</h3>
              <p>
                {translate({ message: "STUDIO.principle3.paragraph1" })}
              </p>
              <p>
                {translate({ message: "STUDIO.principle3.paragraph2" })}
              </p>
              <p>
                {translate({ message: "STUDIO.principle3.paragraph3" })}
              </p>
            </div>
            <div className={styles.principleVisual}>
              <CodeBlock language="bash">
                {`${translate({ message: "STUDIO.principle3.codeComment" })}
$ pip install pandas numpy torch
$ apt-get install ffmpeg

${translate({ message: "STUDIO.principle3.codeComment2" })}`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
