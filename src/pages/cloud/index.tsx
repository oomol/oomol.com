import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";

import Layout from "../../theme/Layout";

// 使用场景数据
const useCases = [
  {
    icon: "☁️",
    title: translate({ message: "CLOUD.useCase.quickDeploy.title" }),
    description: translate({
      message: "CLOUD.useCase.quickDeploy.description",
    }),
  },
  {
    icon: "🤖",
    title: translate({ message: "CLOUD.useCase.aiAgent.title" }),
    description: translate({ message: "CLOUD.useCase.aiAgent.description" }),
  },
  {
    icon: "📱",
    title: translate({ message: "CLOUD.useCase.miniapp.title" }),
    description: translate({ message: "CLOUD.useCase.miniapp.description" }),
  },
  {
    icon: "🚀",
    title: translate({ message: "CLOUD.useCase.noOps.title" }),
    description: translate({ message: "CLOUD.useCase.noOps.description" }),
  },
];

// 核心功能数据
const coreFeatures = [
  {
    icon: "🚀",
    title: translate({ message: "CLOUD.features.oneDeploy.title" }),
    description: translate({ message: "CLOUD.features.oneDeploy.description" }),
    features: [
      translate({ message: "CLOUD.features.oneDeploy.feature1" }),
      translate({ message: "CLOUD.features.oneDeploy.feature2" }),
      translate({ message: "CLOUD.features.oneDeploy.feature3" }),
    ],
  },
  {
    icon: "📊",
    title: translate({ message: "CLOUD.features.monitor.title" }),
    description: translate({ message: "CLOUD.features.monitor.description" }),
    features: [
      translate({ message: "CLOUD.features.monitor.feature1" }),
      translate({ message: "CLOUD.features.monitor.feature2" }),
      translate({ message: "CLOUD.features.monitor.feature3" }),
    ],
  },
  {
    icon: "🔐",
    title: translate({ message: "CLOUD.features.security.title" }),
    description: translate({ message: "CLOUD.features.security.description" }),
    features: [
      translate({ message: "CLOUD.features.security.feature1" }),
      translate({ message: "CLOUD.features.security.feature2" }),
      translate({ message: "CLOUD.features.security.feature3" }),
    ],
  },
];

// 使用场景卡片组件
const UseCaseCard = ({ useCase }: { useCase: (typeof useCases)[0] }) => {
  return (
    <div className={styles.useCaseCard}>
      <div className={styles.useCaseIcon}>{useCase.icon}</div>
      <h3 className={styles.useCaseTitle}>{useCase.title}</h3>
      <p className={styles.useCaseDescription}>{useCase.description}</p>
    </div>
  );
};

// 核心功能卡片组件
const FeatureCard = ({ feature }: { feature: (typeof coreFeatures)[0] }) => {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{feature.icon}</div>
      <h3 className={styles.featureTitle}>{feature.title}</h3>
      <p className={styles.featureDescription}>{feature.description}</p>
      <ul className={styles.featureList}>
        {feature.features.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default function CloudPage() {
  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero 区域 */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>OOMOL Cloud</h1>
          <p className={styles.heroDescription}>
            {translate({ message: "CLOUD.hero.description" })}
          </p>

          {/* 数据亮点 */}
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>自动扩缩容</span>
              <span className={styles.statLabel}>
                {translate({ message: "CLOUD.hero.stat1" })}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>RESTful API</span>
              <span className={styles.statLabel}>
                {translate({ message: "CLOUD.hero.stat2" })}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>MCP 协议</span>
              <span className={styles.statLabel}>
                {translate({ message: "CLOUD.hero.stat3" })}
              </span>
            </div>
          </div>

          {/* 双 CTA */}
          <div className={styles.heroCTA}>
            <a href="/downloads" className={styles.primaryButton}>
              {translate({ message: "CLOUD.hero.cta.start" })}
            </a>
            <a href="/docs" className={styles.secondaryButton}>
              {translate({ message: "CLOUD.hero.cta.docs" })}
            </a>
          </div>
        </div>

        {/* 使用场景 */}
        <section className={styles.useCasesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "CLOUD.useCases.title" })}
            </h2>
            <p className={styles.sectionSubtitle}>
              {translate({ message: "CLOUD.useCases.subtitle" })}
            </p>
          </div>
          <div className={styles.useCasesGrid}>
            {useCases.map((useCase, index) => (
              <UseCaseCard key={index} useCase={useCase} />
            ))}
          </div>
        </section>

        {/* 核心功能 */}
        <section className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "CLOUD.features.title" })}
            </h2>
          </div>
          <div className={styles.featuresGrid}>
            {coreFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </section>

        {/* CTA 区域 */}
        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
