import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import ThemedImage from "@theme/ThemedImage";

import Layout from "../../theme/Layout";

// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

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

const ModeItem = ({
  mode,
  index,
}: {
  mode: (typeof modes)[0];
  index: number;
}) => {
  return (
    <div className={styles.modeItem}>
      <div className={styles.modeText}>
        <div className={styles.modeNumber}>0{index + 1}</div>
        <h3 className={styles.modeTitle}>{mode.title}</h3>
        <p className={styles.modeDescription}>{mode.description}</p>
      </div>
      <div className={styles.modeVisual}>
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
      </div>
    </div>
  );
};

export default function CloudPage() {
  // const { i18n } = useDocusaurusContext() as unknown as {
  //   i18n: { currentLocale: string };
  // };
  // const pricingUrl =
  //   i18n.currentLocale === "zh-CN" ? "/zh-CN/pricing" : "/pricing";

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
            <a
              href="https://console.oomol.com/cloud-function"
              className={`${styles.primaryButton} ${styles.large}`}
            >
              {translate({ message: "CLOUD.hero.cta.start" })}
            </a>
          </div>
        </div>

        {/* Pain Points Section (Empathy) */}

        {/* Solution / Modes Section */}
        <section className={styles.modesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "CLOUD.solution.title" })}
            </h2>
          </div>
          <section className={styles.painPointsSection}>
            <div className={styles.painPointsContent}>
              <div className={styles.painPointsText}>
                {translate({ message: "CLOUD.painPoints.description" })}
              </div>
            </div>
          </section>
          <div className={styles.modesContainer}>
            {modes.map((mode, index) => (
              <ModeItem key={index} mode={mode} index={index} />
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        {/* <section className={styles.pricingSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "CLOUD.pricing.title" })}
            </h2>
          </div>
          <div className={styles.pricingContent}>
            <p className={styles.pricingDescription}>
              {translate({ message: "CLOUD.pricing.description" })}
            </p>
            <a
              href={pricingUrl}
              className={`${styles.primaryButton} ${styles.large}`}
            >
              {translate({ message: "CLOUD.pricing.cta" })}
            </a>
          </div>
        </section> */}

        {/* Final CTA */}
        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
