import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";

// 导入 SVG 插图
import WorkflowIllustration from "@site/static/img/pages/home/core-feature-workflow.svg";
import ContainerIllustration from "@site/static/img/pages/home/core-feature-container.svg";
import McpIllustration from "@site/static/img/pages/home/core-feature-mcp.svg";
import VscodeIllustration from "@site/static/img/pages/home/core-feature-vscode.svg";

// 核心功能数据
const coreFeatures = [
  {
    number: "01",
    title: translate({ message: "HOME.CoreFeatures.workflow.title" }),
    description: translate({ message: "HOME.CoreFeatures.workflow.description" }),
    highlights: [
      translate({ message: "HOME.CoreFeatures.workflow.highlight1" }),
    ],
    color: "purple",
    illustration: WorkflowIllustration,
  },
  {
    number: "02",
    title: translate({ message: "HOME.CoreFeatures.container.title" }),
    description: translate({ message: "HOME.CoreFeatures.container.description" }),
    highlights: [
      translate({ message: "HOME.CoreFeatures.container.highlight1" }),
    ],
    color: "blue",
    illustration: ContainerIllustration,
  },
  {
    number: "03",
    title: translate({ message: "HOME.CoreFeatures.mcp.title" }),
    description: translate({ message: "HOME.CoreFeatures.mcp.description" }),
    highlights: [
      translate({ message: "HOME.CoreFeatures.mcp.highlight1" }),
    ],
    color: "pink",
    illustration: McpIllustration,
  },
  {
    number: "04",
    title: translate({ message: "HOME.CoreFeatures.vscode.title" }),
    description: translate({ message: "HOME.CoreFeatures.vscode.description" }),
    highlights: [
      translate({ message: "HOME.CoreFeatures.vscode.highlight1" }),
    ],
    color: "green",
    illustration: VscodeIllustration,
  },
];

export default function HomepageCoreFeatures() {
  return (
    <section className={styles.coreFeaturesSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {translate({ message: "HOME.CoreFeatures.title" })}
          </h2>
        </div>

        {/* Features List */}
        <div className={styles.featuresList}>
          {coreFeatures.map((feature, index) => (
            <div key={index} className={`${styles.featureCard} ${styles[feature.color]}`}>
              {/* 左侧：文字内容 */}
              <div className={styles.featureContent}>
                {/* 标题 */}
                <h3 className={styles.featureTitle}>{feature.title}</h3>

                {/* 描述 */}
                <p className={styles.featureDescription}>{feature.description}</p>

                {/* Highlights */}
                <ul className={styles.highlightsList}>
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className={styles.highlightItem}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 右侧：插图 */}
              <div className={styles.featureIllustration}>
                <feature.illustration className={styles.illustrationSvg} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
