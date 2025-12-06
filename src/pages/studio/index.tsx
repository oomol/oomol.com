import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";

import Layout from "../../theme/Layout";

// 开发者痛点
const developerPainPoints = [
  {
    id: "learning-curve",
    icon: "🤯",
    title: translate({ message: "STUDIO.painPoints.learningCurve.title" }),
    description: translate({
      message: "STUDIO.painPoints.learningCurve.description",
    }),
  },
  {
    id: "extension-difficulty",
    icon: "🚧",
    title: translate({ message: "STUDIO.painPoints.extension.title" }),
    description: translate({
      message: "STUDIO.painPoints.extension.description",
    }),
  },
  {
    id: "tool-switching",
    icon: "😫",
    title: translate({ message: "STUDIO.painPoints.toolSwitching.title" }),
    description: translate({
      message: "STUDIO.painPoints.toolSwitching.description",
    }),
  },
];

// OOMOL 解决方案
const oomolSolutions = [
  {
    id: "functions-not-nodes",
    icon: "⚡",
    title: translate({ message: "STUDIO.solutions.functions.title" }),
    description: translate({
      message: "STUDIO.solutions.functions.description",
    }),
    highlight: translate({ message: "STUDIO.solutions.functions.highlight" }),
  },
  {
    id: "vscode-based",
    icon: "💻",
    title: translate({ message: "STUDIO.solutions.vscode.title" }),
    description: translate({
      message: "STUDIO.solutions.vscode.description",
    }),
    highlight: translate({ message: "STUDIO.solutions.vscode.highlight" }),
  },
  {
    id: "container-support",
    icon: "📦",
    title: translate({ message: "STUDIO.solutions.container.title" }),
    description: translate({
      message: "STUDIO.solutions.container.description",
    }),
    highlight: translate({ message: "STUDIO.solutions.container.highlight" }),
  },
];

// 痛点卡片组件
const PainPointCard = ({ point }: { point: (typeof developerPainPoints)[0] }) => {
  return (
    <div className={styles.painPointCard}>
      <div className={styles.painPointIcon}>{point.icon}</div>
      <h3 className={styles.painPointTitle}>{point.title}</h3>
      <p className={styles.painPointDescription}>{point.description}</p>
    </div>
  );
};

// 解决方案卡片组件
const SolutionCard = ({ solution }: { solution: (typeof oomolSolutions)[0] }) => {
  return (
    <div className={styles.solutionCard}>
      <div className={styles.solutionIcon}>{solution.icon}</div>
      <h3 className={styles.solutionTitle}>{solution.title}</h3>
      <p className={styles.solutionDescription}>{solution.description}</p>
      <div className={styles.solutionHighlight}>
        <span className={styles.highlightIcon}>→</span>
        <span className={styles.highlightText}>{solution.highlight}</span>
      </div>
    </div>
  );
};

export default function StudioPage() {
  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero 区域 */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>OOMOL Studio</h1>
          <p className={styles.heroSubtitle}>
            {translate({ message: "STUDIO.hero.subtitle" })}
          </p>
          <p className={styles.heroDescription}>
            {translate({ message: "STUDIO.hero.description" })}
          </p>
        </section>

        {/* 痛点区域 */}
        <section className={styles.painPointsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "STUDIO.painPoints.title" })}
            </h2>
            <p className={styles.sectionSubtitle}>
              {translate({ message: "STUDIO.painPoints.subtitle" })}
            </p>
          </div>
          <div className={styles.painPointsGrid}>
            {developerPainPoints.map(point => (
              <PainPointCard key={point.id} point={point} />
            ))}
          </div>
        </section>

        {/* 解决方案区域 */}
        <section className={styles.solutionsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "STUDIO.solutions.title" })}
            </h2>
            <p className={styles.sectionSubtitle}>
              {translate({ message: "STUDIO.solutions.subtitle" })}
            </p>
          </div>
          <div className={styles.solutionsGrid}>
            {oomolSolutions.map(solution => (
              <SolutionCard key={solution.id} solution={solution} />
            ))}
          </div>
        </section>

        {/* CTA 下载区域 */}
        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
