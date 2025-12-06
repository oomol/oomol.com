import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";

import Layout from "../../theme/Layout";

// Three Modes Data
const modes = [
  {
    icon: "📦",
    title: translate({ message: "CLOUD.modes.library.title" }),
    description: translate({ message: "CLOUD.modes.library.description" }),
  },
  {
    icon: "⚡️",
    title: translate({ message: "CLOUD.modes.serverless.title" }),
    description: translate({ message: "CLOUD.modes.serverless.description" }),
  },
  {
    icon: "🤖",
    title: translate({ message: "CLOUD.modes.mcp.title" }),
    description: translate({ message: "CLOUD.modes.mcp.description" }),
  },
];

const ModeCard = ({ mode }: { mode: (typeof modes)[0] }) => {
  return (
    <div className={styles.modeCard}>
      <div className={styles.modeIcon}>{mode.icon}</div>
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
              <span className={styles.statValue}>✨</span>
              <span className={styles.statLabel}>
                {translate({ message: "CLOUD.hero.stat1" })}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>💰</span>
              <span className={styles.statLabel}>
                {translate({ message: "CLOUD.hero.stat2" })}
              </span>
            </div>
            <div className={styles.stat}>
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
