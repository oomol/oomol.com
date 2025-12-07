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
              <code>docker pull oomolstudio/headless:latest</code>
              <button
                className={styles.copyBtn}
                onClick={() => {
                  navigator.clipboard.writeText(
                    "docker pull oomolstudio/headless:latest"
                  );
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </section>

        {/* Docker Deployment Section */}
        <section className={styles.deploymentSection}>
          <div className={styles.deploymentCard}>
            <h2 className={styles.deploymentTitle}>Docker Deployment</h2>
            <div className={styles.deploymentCode}>
              {`docker run -d --privileged --name oomol-headless -p 4000:4000 -p 52222:52222 \\
  --mount type=bind,src=$HOME/.oomol-studio/headless/.env,dst=/app/.env \\
  --mount type=bind,src=$HOME/oomol-storage,dst=/oomol-driver/oomol-storage \\
  oomolstudio/headless:latest`}
            </div>
            <div className={styles.deploymentCTA}>
              <a href="/docs/headless" className={styles.deploymentLink}>
                View Full Documentation →
              </a>
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
              {/* 🖼️ 图片占位: Freedom 图标 (建议使用开放的鸟类图标或自由主题插图, SVG/PNG 80x80px) */}
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
              {/* 🖼️ 图片占位: 开源图标 (建议使用解锁或开源 logo, SVG/PNG 80x80px) */}
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
              {/* 🖼️ 图片占位: 社区图标 (建议使用握手或社区主题插图, SVG/PNG 80x80px) */}
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
          <a href="/docs/headless" className={styles.primaryBtn}>
            {translate({ message: "HEADLESS.hero.cta.docs" })}
          </a>
        </section>

        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
