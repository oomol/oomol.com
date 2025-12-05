import styles from "./styles.module.scss";

import Layout from "../../theme/Layout";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import { translate } from "@docusaurus/Translate";

// 使用场景数据
const useCases = [
  {
    icon: "🐳",
    title: translate({ message: "HEADLESS.useCase.docker.title" }),
    description: translate({ message: "HEADLESS.useCase.docker.description" }),
  },
  {
    icon: "☁️",
    title: translate({ message: "HEADLESS.useCase.cloud.title" }),
    description: translate({ message: "HEADLESS.useCase.cloud.description" }),
  },
  {
    icon: "🔄",
    title: translate({ message: "HEADLESS.useCase.ci.title" }),
    description: translate({ message: "HEADLESS.useCase.ci.description" }),
  },
  {
    icon: "🌐",
    title: translate({ message: "HEADLESS.useCase.api.title" }),
    description: translate({ message: "HEADLESS.useCase.api.description" }),
  },
];

// 核心功能数据
const coreFeatures = [
  {
    icon: "🚀",
    title: translate({ message: "HEADLESS.features.deploy.title" }),
    description: translate({ message: "HEADLESS.features.deploy.description" }),
    features: [
      translate({ message: "HEADLESS.features.deploy.feature1" }),
      translate({ message: "HEADLESS.features.deploy.feature2" }),
      translate({ message: "HEADLESS.features.deploy.feature3" }),
    ],
  },
  {
    icon: "📦",
    title: translate({ message: "HEADLESS.features.package.title" }),
    description: translate({ message: "HEADLESS.features.package.description" }),
    features: [
      translate({ message: "HEADLESS.features.package.feature1" }),
      translate({ message: "HEADLESS.features.package.feature2" }),
      translate({ message: "HEADLESS.features.package.feature3" }),
    ],
  },
  {
    icon: "🔗",
    title: translate({ message: "HEADLESS.features.remote.title" }),
    description: translate({ message: "HEADLESS.features.remote.description" }),
    features: [
      translate({ message: "HEADLESS.features.remote.feature1" }),
      translate({ message: "HEADLESS.features.remote.feature2" }),
      translate({ message: "HEADLESS.features.remote.feature3" }),
    ],
  },
];

// 使用场景卡片组件
const UseCaseCard = ({ useCase }: { useCase: typeof useCases[0] }) => {
  return (
    <div className={styles.useCaseCard}>
      <div className={styles.useCaseIcon}>{useCase.icon}</div>
      <h3 className={styles.useCaseTitle}>{useCase.title}</h3>
      <p className={styles.useCaseDescription}>{useCase.description}</p>
    </div>
  );
};

// 核心功能卡片组件
const FeatureCard = ({ feature }: { feature: typeof coreFeatures[0] }) => {
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

export default function HeadlessPage() {
  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero 区域 */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>OOMOL Headless</h1>
          <p className={styles.heroDescription}>
            {translate({ message: "HEADLESS.hero.description" })}
          </p>

          {/* 数据亮点 */}
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>Docker</span>
              <span className={styles.statLabel}>{translate({ message: "HEADLESS.hero.stat1" })}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>远程访问</span>
              <span className={styles.statLabel}>{translate({ message: "HEADLESS.hero.stat2" })}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>包管理</span>
              <span className={styles.statLabel}>{translate({ message: "HEADLESS.hero.stat3" })}</span>
            </div>
          </div>

          {/* 双 CTA */}
          <div className={styles.heroCTA}>
            <a href="/downloads" className={styles.primaryButton}>
              {translate({ message: "HEADLESS.hero.cta.download" })}
            </a>
            <a href="/docs" className={styles.secondaryButton}>
              {translate({ message: "HEADLESS.hero.cta.docs" })}
            </a>
          </div>
        </div>

        {/* 使用场景 */}
        <section className={styles.useCasesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "HEADLESS.useCases.title" })}
            </h2>
            <p className={styles.sectionSubtitle}>
              {translate({ message: "HEADLESS.useCases.subtitle" })}
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
              {translate({ message: "HEADLESS.features.title" })}
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
