import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import Layout from "@theme/Layout";
import React from "react";

export default function HeadlessPage() {
  const { i18n } = useDocusaurusContext() as unknown as {
    i18n: { currentLocale: string };
  };
  const docsUrl =
    i18n.currentLocale === "zh-CN"
      ? "/zh-CN/docs/headless/"
      : "/docs/headless/";

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
            <h2 className={styles.deploymentTitle}>
              {translate({ message: "HEADLESS.deployment.title" })}
            </h2>
            <div className={styles.deploymentCode}>
              {`docker run -d --privileged --name oomol-headless -p 4000:4000 -p 52222:52222 \\
  --mount type=bind,src=$HOME/.oomol-studio/headless/.env,dst=/app/.env \\
  --mount type=bind,src=$HOME/oomol-storage,dst=/oomol-driver/oomol-storage \\
  oomolstudio/headless:latest`}
            </div>
            <div className={styles.deploymentCTA}>
              <a href={docsUrl} className={styles.deploymentLink}>
                {translate({ message: "HEADLESS.deployment.viewDocs" })}
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

        {/* Open Source Projects Section */}
        <section className={styles.opensourceSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "CLOUD.opensource.title" })}
            </h2>
            <p className={styles.sectionSubtitle}>
              {translate({ message: "CLOUD.opensource.subtitle" })}
            </p>
          </div>
          <div className={styles.projectsGrid}>
            <a
              href="https://github.com/oomol-lab/ovm"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectCard}
            >
              <h3 className={styles.projectTitle}>
                {translate({ message: "CLOUD.opensource.ovm.title" })}
              </h3>
              <p className={styles.projectDescription}>
                {translate({ message: "CLOUD.opensource.ovm.description" })}
              </p>
              <span className={styles.projectLink}>GitHub →</span>
            </a>
            <a
              href="https://github.com/oomol-lab/ovm-core"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectCard}
            >
              <h3 className={styles.projectTitle}>
                {translate({ message: "CLOUD.opensource.ovm-core.title" })}
              </h3>
              <p className={styles.projectDescription}>
                {translate({
                  message: "CLOUD.opensource.ovm-core.description",
                })}
              </p>
              <span className={styles.projectLink}>GitHub →</span>
            </a>
            <a
              href="https://github.com/oomol-lab/ovm-win"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectCard}
            >
              <h3 className={styles.projectTitle}>
                {translate({ message: "CLOUD.opensource.ovm-win.title" })}
              </h3>
              <p className={styles.projectDescription}>
                {translate({ message: "CLOUD.opensource.ovm-win.description" })}
              </p>
              <span className={styles.projectLink}>GitHub →</span>
            </a>
            <a
              href="https://github.com/oomol-lab/ovm-mac"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectCard}
            >
              <h3 className={styles.projectTitle}>
                {translate({ message: "CLOUD.opensource.ovm-mac.title" })}
              </h3>
              <p className={styles.projectDescription}>
                {translate({ message: "CLOUD.opensource.ovm-mac.description" })}
              </p>
              <span className={styles.projectLink}>GitHub →</span>
            </a>
          </div>
        </section>

        {/* Footer CTA */}
        <section className={styles.ctaSection}>
          <a
            href={docsUrl}
            className={`${styles.primaryButton} ${styles.large}`}
          >
            {translate({ message: "HEADLESS.hero.cta.docs" })}
          </a>
        </section>

        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
