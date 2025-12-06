import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import Layout from "@theme/Layout";
import React from "react";

export default function HeadlessPage() {
  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>OOMOL Headless</h1>
            <p className={styles.heroSubtitle}>
              {translate({ message: "HEADLESS.hero.description" })}
            </p>
            <div className={styles.commandBlock}>
              <code>docker pull oomol/runtime</code>
              <button
                className={styles.copyBtn}
                onClick={() => {
                  navigator.clipboard.writeText("docker pull oomol/runtime");
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </section>

        {/* Manifesto / Philosophy Section */}
        <section className={styles.philosophySection}>
          <div className={styles.philosophyHeader}>
            <h2>{translate({ message: "HEADLESS.philosophy.title" })}</h2>
            <p>{translate({ message: "HEADLESS.philosophy.subtitle" })}</p>
          </div>

          <div className={styles.cardGrid}>
            {/* Freedom */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>🕊️</div>
              <h3>
                {translate({ message: "HEADLESS.philosophy.freedom.title" })}
              </h3>
              <p>
                {translate({ message: "HEADLESS.philosophy.freedom.desc" })}
              </p>
            </div>

            {/* Open Source */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>🔓</div>
              <h3>
                {translate({ message: "HEADLESS.philosophy.opensource.title" })}
              </h3>
              <p>
                {translate({ message: "HEADLESS.philosophy.opensource.desc" })}
              </p>
              <a
                href="https://github.com/oomol/oomol-runtime"
                target="_blank"
                rel="noreferrer"
                className={styles.cardLink}
              >
                GitHub →
              </a>
            </div>

            {/* Community */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>🤝</div>
              <h3>
                {translate({ message: "HEADLESS.philosophy.community.title" })}
              </h3>
              <p>
                {translate({ message: "HEADLESS.philosophy.community.desc" })}
              </p>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className={styles.ctaSection}>
          <a
            href="https://docs.oomol.com/headless/getting-started"
            className={styles.primaryBtn}
          >
            {translate({ message: "HEADLESS.hero.cta.docs" })}
          </a>
        </section>

        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
