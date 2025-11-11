import styles from "./styles.module.scss";

import clsx from "clsx";
import Layout from "../../theme/Layout";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import { translate } from "@docusaurus/Translate";
import { FeatureBlockList } from "@site/src/components/FeatureBlockList/FeatureBlockList";
import StudioPdfCraftCase from "@site/src/components/StudioPdfCraftCase";

// 开发者工作流数据
const developerWorkflow = {
  steps: [
    {
      number: "1",
      title: translate({ message: "STUDIO.workflow.step1.title" }),
      description: translate({ message: "STUDIO.workflow.step1.description" }),
      features: [
        translate({ message: "STUDIO.workflow.step1.feature1" }),
        translate({ message: "STUDIO.workflow.step1.feature2" }),
      ],
    },
    {
      number: "2",
      title: translate({ message: "STUDIO.workflow.step2.title" }),
      description: translate({ message: "STUDIO.workflow.step2.description" }),
      features: [
        translate({ message: "STUDIO.workflow.step2.feature1" }),
        translate({ message: "STUDIO.workflow.step2.feature2" }),
      ],
    },
    {
      number: "3",
      title: translate({ message: "STUDIO.workflow.step3.title" }),
      description: translate({ message: "STUDIO.workflow.step3.description" }),
      features: [
        translate({ message: "STUDIO.workflow.step3.feature1" }),
        translate({ message: "STUDIO.workflow.step3.feature2" }),
      ],
    },
    {
      number: "4",
      title: translate({ message: "STUDIO.workflow.step4.title" }),
      description: translate({ message: "STUDIO.workflow.step4.description" }),
      features: [
        translate({ message: "STUDIO.workflow.step4.feature1" }),
        translate({ message: "STUDIO.workflow.step4.feature2" }),
        translate({ message: "STUDIO.workflow.step4.feature3" }),
      ],
    },
  ],
};

// 核心优势数据
const coreAdvantages = [
  {
    icon: "💻",
    title: translate({ message: "STUDIO.advantages.vscode.title" }),
    description: translate({ message: "STUDIO.advantages.vscode.description" }),
    features: [
      translate({ message: "STUDIO.advantages.vscode.feature1" }),
      translate({ message: "STUDIO.advantages.vscode.feature2" }),
      translate({ message: "STUDIO.advantages.vscode.feature3" }),
    ],
  },
  {
    icon: "🔗",
    title: translate({ message: "STUDIO.advantages.p2p.title" }),
    description: translate({ message: "STUDIO.advantages.p2p.description" }),
    features: [
      translate({ message: "STUDIO.advantages.p2p.feature1" }),
      translate({ message: "STUDIO.advantages.p2p.feature2" }),
      translate({ message: "STUDIO.advantages.p2p.feature3" }),
    ],
  },
  {
    icon: "🚀",
    title: translate({ message: "STUDIO.advantages.api.title" }),
    description: translate({ message: "STUDIO.advantages.api.description" }),
    features: [
      translate({ message: "STUDIO.advantages.api.feature1" }),
      translate({ message: "STUDIO.advantages.api.feature2" }),
      translate({ message: "STUDIO.advantages.api.feature3" }),
    ],
  },
];

// AI 集成能力数据
const aiCapabilities = {
  title: translate({ message: "STUDIO.ai.title" }),
  description: translate({ message: "STUDIO.ai.description" }),
  features: [
    {
      icon: "🤖",
      content: translate({ message: "STUDIO.ai.feature1" }),
    },
    {
      icon: "🎨",
      content: translate({ message: "STUDIO.ai.feature2" }),
    },
    {
      icon: "🎤",
      content: translate({ message: "STUDIO.ai.feature3" }),
    },
    {
      icon: "⚡",
      content: translate({ message: "STUDIO.ai.feature4" }),
    },
  ],
};

// 工作流步骤组件
const WorkflowStep = ({ step, index }: { step: typeof developerWorkflow.steps[0]; index: number }) => {
  return (
    <div className={styles.workflowStep}>
      <div className={styles.stepNumber}>{step.number}</div>
      <div className={styles.stepContent}>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        <p className={styles.stepDescription}>{step.description}</p>
        <ul className={styles.stepFeatures}>
          {step.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// 核心优势卡片组件
const AdvantageCard = ({ advantage }: { advantage: typeof coreAdvantages[0] }) => {
  return (
    <div className={styles.advantageCard}>
      <div className={styles.advantageIcon}>{advantage.icon}</div>
      <h3 className={styles.advantageTitle}>{advantage.title}</h3>
      <p className={styles.advantageDescription}>{advantage.description}</p>
      <ul className={styles.advantageFeatures}>
        {advantage.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

// AI 能力卡片组件
const AICapabilityCard = ({ capability }: { capability: typeof aiCapabilities.features[0] }) => {
  return (
    <div className={styles.aiCapabilityCard}>
      <span className={styles.aiIcon}>{capability.icon}</span>
      <span className={styles.aiContent}>{capability.content}</span>
    </div>
  );
};

export default function StudioPage() {
  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero 区域 */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>OOMOL Studio</h1>
          <p className={styles.heroDescription}>
            {translate({ message: "STUDIO.hero.description" })}
          </p>

          {/* 数据亮点 */}
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>20+</span>
              <span className={styles.statLabel}>{translate({ message: "STUDIO.hero.stat1" })}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>3 分钟</span>
              <span className={styles.statLabel}>{translate({ message: "STUDIO.hero.stat2" })}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>P2P</span>
              <span className={styles.statLabel}>{translate({ message: "STUDIO.hero.stat3" })}</span>
            </div>
          </div>

          {/* 双 CTA */}
          <div className={styles.heroCTA}>
            <a href="/downloads" className={styles.primaryButton}>
              {translate({ message: "STUDIO.hero.cta.download" })}
            </a>
            <a href="/docs" className={styles.secondaryButton}>
              {translate({ message: "STUDIO.hero.cta.docs" })}
            </a>
          </div>
        </div>

        {/* 开发者工作流 */}
        <section className={styles.workflowSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "STUDIO.workflow.title" })}
            </h2>
            <p className={styles.sectionSubtitle}>
              {translate({ message: "STUDIO.workflow.subtitle" })}
            </p>
          </div>
          <div className={styles.workflowSteps}>
            {developerWorkflow.steps.map((step, index) => (
              <WorkflowStep key={index} step={step} index={index} />
            ))}
          </div>
        </section>

        {/* 核心差异化优势 */}
        <section className={styles.advantagesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "STUDIO.advantages.title" })}
            </h2>
          </div>
          <div className={styles.advantagesGrid}>
            {coreAdvantages.map((advantage, index) => (
              <AdvantageCard key={index} advantage={advantage} />
            ))}
          </div>
        </section>

        {/* AI 集成能力 */}
        <section className={styles.aiSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{aiCapabilities.title}</h2>
            <p className={styles.sectionSubtitle}>{aiCapabilities.description}</p>
          </div>
          <div className={styles.aiCapabilitiesGrid}>
            {aiCapabilities.features.map((capability, index) => (
              <AICapabilityCard key={index} capability={capability} />
            ))}
          </div>
        </section>

        {/* PDF-Craft 实战案例 */}
        <StudioPdfCraftCase />

        {/* 技术特性快览 */}
        <section className={styles.techFeaturesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "STUDIO.techFeatures.title" })}
            </h2>
          </div>
          <FeatureBlockList />
        </section>

        {/* CTA 区域 */}
        <GetStartedPrompt />
      </div>
    </Layout>
  );
}