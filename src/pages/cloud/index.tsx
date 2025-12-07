import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";

import Layout from "../../theme/Layout";

// Three Modes Data
const modes = [
  {
    // Library 模式: 发布为函数库
    imageLight: "/img/pages/cloud/publish-light.png",
    imageDark: "/img/pages/cloud/publish-dark.png",
    title: translate({ message: "CLOUD.modes.library.title" }),
    description: translate({ message: "CLOUD.modes.library.description" }),
  },
  {
    // Serverless 模式: 部署为云函数
    imageLight: "/img/pages/cloud/create-api-light.png",
    imageDark: "/img/pages/cloud/create-api-dark.png",
    title: translate({ message: "CLOUD.modes.serverless.title" }),
    description: translate({ message: "CLOUD.modes.serverless.description" }),
  },
  {
    // MCP 模式: 提供给 AI 调用
    imageLight: "/img/pages/cloud/ai-chat-light.png",
    imageDark: "/img/pages/cloud/ai-chat-dark.png",
    title: translate({ message: "CLOUD.modes.mcp.title" }),
    description: translate({ message: "CLOUD.modes.mcp.description" }),
  },
];

const ModeCard = ({ mode }: { mode: (typeof modes)[0] }) => {
  return (
    <div className={styles.modeCard}>
      <div className={styles.modeImageWrapper}>
        <ThemedImage
          sources={{
            light: useBaseUrl(mode.imageLight),
            dark: useBaseUrl(mode.imageDark),
          }}
          alt={mode.title}
          className={styles.modeImage}
        />
      </div>
      <h3 className={styles.modeTitle}>{mode.title}</h3>
      <p className={styles.modeDescription}>{mode.description}</p>
    </div>
  );
};

export default function CloudPage() {
  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>
            {translate({ message: "CLOUD.hero.title" })}
          </h1>
          <p className={styles.heroDescription}>
            {translate({ message: "CLOUD.hero.description" })}
          </p>

          <div className={styles.heroStats}>
            <div className={styles.stat}>
              {/* 🖼️ 图片占位: 免费徽章图标 (SVG/PNG 60x60px) */}
              <span className={styles.statValue}>✨</span>
              <span className={styles.statLabel}>
                {translate({ message: "CLOUD.hero.stat1" })}
              </span>
            </div>
            <div className={styles.stat}>
              {/* 🖼️ 图片占位: 定价徽章图标 (SVG/PNG 60x60px) */}
              <span className={styles.statValue}>💰</span>
              <span className={styles.statLabel}>
                {translate({ message: "CLOUD.hero.stat2" })}
              </span>
            </div>
            <div className={styles.stat}>
              {/* 🖼️ 图片占位: 低维护徽章图标 (SVG/PNG 60x60px) */}
              <span className={styles.statValue}>☕️</span>
              <span className={styles.statLabel}>
                {translate({ message: "CLOUD.hero.stat3" })}
              </span>
            </div>
          </div>

          <div className={styles.heroCTA}>
            <a href="/downloads" className={styles.primaryButton}>
              {translate({ message: "CLOUD.hero.cta.start" })}
            </a>
            <a href="/docs" className={styles.secondaryButton}>
              {translate({ message: "CLOUD.hero.cta.docs" })}
            </a>
          </div>
        </div>

        {/* Pain Points Section (Empathy) */}
        <section className={styles.painPointsSection}>
          <div className={styles.painPointsContent}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "CLOUD.painPoints.title" })}
            </h2>
            <p className={styles.sectionSubtitle}>
              {translate({ message: "CLOUD.painPoints.subtitle" })}
            </p>
            <div className={styles.painPointsText}>
              {translate({ message: "CLOUD.painPoints.description" })}
            </div>
          </div>
        </section>

        {/* Solution / Modes Section */}
        <section className={styles.modesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "CLOUD.solution.title" })}
            </h2>
            <p className={styles.sectionSubtitle}>
              {translate({ message: "CLOUD.solution.subtitle" })}
            </p>
          </div>
          <div className={styles.modesGrid}>
            {modes.map((mode, index) => (
              <ModeCard key={index} mode={mode} />
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className={styles.pricingSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "CLOUD.pricing.title" })}
            </h2>
          </div>
          <div className={styles.pricingContent}>
            <p className={styles.pricingDescription}>
              {translate({ message: "CLOUD.pricing.description" })}
            </p>
            <a href="/pricing" className={styles.pricingButton}>
              {translate({ message: "CLOUD.pricing.cta" })}
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
