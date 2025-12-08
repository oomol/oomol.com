import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import Layout from "@theme/Layout";
import ThemedImage from "@theme/ThemedImage";
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
          <h1 className={styles.title}>
            {translate({ message: "STUDIO.manifesto.title" })}
          </h1>
          <p className={styles.subtitle}>
            {translate({ message: "STUDIO.manifesto.subtitle" })}
          </p>
        </header>

        {/* Hero Image */}
        <section className={styles.heroImageSection}>
          <div className={styles.heroImageWrapper}>
            <ThemedImage
              sources={{
                light: useBaseUrl("/img/pages/studio/studio-light.png"),
                dark: useBaseUrl("/img/pages/studio/studio-dark.png"),
              }}
              alt="OOMOL Studio"
              className={styles.heroImage}
            />
          </div>
        </section>

        {/* 2. The Story (The "Why") */}
        <section className={styles.storySection}>
          <p>{translate({ message: "STUDIO.story.paragraph1" })}</p>

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

          <p>{translate({ message: "STUDIO.story.paragraph2" })}</p>
          <p>{translate({ message: "STUDIO.story.paragraph3" })}</p>
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
              <p>{translate({ message: "STUDIO.principle1.paragraph1" })}</p>
              <p>{translate({ message: "STUDIO.principle1.paragraph2" })}</p>
              <p>{translate({ message: "STUDIO.principle1.paragraph3" })}</p>
            </div>
            <div className={styles.principleVisual}>
              <div className={styles.principleImageWrapper}>
                <ThemedImage
                  sources={{
                    light: useBaseUrl("/img/pages/studio/code-light.png"),
                    dark: useBaseUrl("/img/pages/studio/code-dark.png"),
                  }}
                  alt="Code as Truth"
                  className={styles.principleImage}
                />
              </div>
            </div>
          </div>

          {/* Principle 2 */}
          <div className={styles.principleItem}>
            <div className={styles.principleText}>
              <h3>{translate({ message: "STUDIO.principle2.title" })}</h3>
              <p>{translate({ message: "STUDIO.principle2.paragraph1" })}</p>
              <p>{translate({ message: "STUDIO.principle2.paragraph2" })}</p>
              <p>{translate({ message: "STUDIO.principle2.paragraph3" })}</p>
            </div>
            <div className={styles.principleVisual}>
              <div className={styles.principleImageWrapper}>
                <ThemedImage
                  sources={{
                    light: useBaseUrl("/img/pages/studio/edit-light.png"),
                    dark: useBaseUrl("/img/pages/studio/edit-dark.png"),
                  }}
                  alt="Respect Toolchain"
                  className={styles.principleImage}
                />
              </div>
            </div>
          </div>

          {/* Principle 3 */}
          <div className={styles.principleItem}>
            <div className={styles.principleText}>
              <h3>{translate({ message: "STUDIO.principle3.title" })}</h3>
              <p>{translate({ message: "STUDIO.principle3.paragraph1" })}</p>
              <p>{translate({ message: "STUDIO.principle3.paragraph2" })}</p>
              <p>{translate({ message: "STUDIO.principle3.paragraph3" })}</p>
            </div>
            <div className={styles.principleVisual}>
              <div className={styles.principleImageWrapper}>
                <ThemedImage
                  sources={{
                    light: useBaseUrl("/img/pages/studio/package-light.png"),
                    dark: useBaseUrl("/img/pages/studio/package-dark.png"),
                  }}
                  alt="No Artificial Limits"
                  className={styles.principleImage}
                />
              </div>
            </div>
          </div>
        </section>

        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
