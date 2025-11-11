import styles from "./styles.module.scss";

import Layout from "../../theme/Layout";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import { translate } from "@docusaurus/Translate";

// 使用场景数据
const useCases = [
  {
    icon: "💬",
    title: translate({ message: "CHAT.useCase.conversation.title" }),
    description: translate({ message: "CHAT.useCase.conversation.description" }),
  },
  {
    icon: "🔧",
    title: translate({ message: "CHAT.useCase.tools.title" }),
    description: translate({ message: "CHAT.useCase.tools.description" }),
  },
  {
    icon: "📚",
    title: translate({ message: "CHAT.useCase.knowledge.title" }),
    description: translate({ message: "CHAT.useCase.knowledge.description" }),
  },
  {
    icon: "🤝",
    title: translate({ message: "CHAT.useCase.collaboration.title" }),
    description: translate({ message: "CHAT.useCase.collaboration.description" }),
  },
];

// 核心功能数据
const coreFeatures = [
  {
    icon: "🤖",
    title: translate({ message: "CHAT.features.mcp.title" }),
    description: translate({ message: "CHAT.features.mcp.description" }),
    features: [
      translate({ message: "CHAT.features.mcp.feature1" }),
      translate({ message: "CHAT.features.mcp.feature2" }),
      translate({ message: "CHAT.features.mcp.feature3" }),
    ],
  },
  {
    icon: "🎯",
    title: translate({ message: "CHAT.features.agent.title" }),
    description: translate({ message: "CHAT.features.agent.description" }),
    features: [
      translate({ message: "CHAT.features.agent.feature1" }),
      translate({ message: "CHAT.features.agent.feature2" }),
      translate({ message: "CHAT.features.agent.feature3" }),
    ],
  },
  {
    icon: "⚡",
    title: translate({ message: "CHAT.features.models.title" }),
    description: translate({ message: "CHAT.features.models.description" }),
    features: [
      translate({ message: "CHAT.features.models.feature1" }),
      translate({ message: "CHAT.features.models.feature2" }),
      translate({ message: "CHAT.features.models.feature3" }),
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

export default function ChatPage() {
  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero 区域 */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>OOMOL Chat</h1>
          <p className={styles.heroDescription}>
            {translate({ message: "CHAT.hero.description" })}
          </p>

          {/* 数据亮点 */}
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>MCP</span>
              <span className={styles.statLabel}>{translate({ message: "CHAT.hero.stat1" })}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>多模型</span>
              <span className={styles.statLabel}>{translate({ message: "CHAT.hero.stat2" })}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>AI Agent</span>
              <span className={styles.statLabel}>{translate({ message: "CHAT.hero.stat3" })}</span>
            </div>
          </div>

          {/* 双 CTA */}
          <div className={styles.heroCTA}>
            <a href="/downloads" className={styles.primaryButton}>
              {translate({ message: "CHAT.hero.cta.download" })}
            </a>
            <a href="/docs" className={styles.secondaryButton}>
              {translate({ message: "CHAT.hero.cta.docs" })}
            </a>
          </div>
        </div>

        {/* 使用场景 */}
        <section className={styles.useCasesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "CHAT.useCases.title" })}
            </h2>
            <p className={styles.sectionSubtitle}>
              {translate({ message: "CHAT.useCases.subtitle" })}
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
              {translate({ message: "CHAT.features.title" })}
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
