import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";

// 价值主张数据
const valueProps = [
  {
    icon: "💻",
    title: translate({ message: "HOME.ValueProps.localCompute.title" }),
    description: translate({ message: "HOME.ValueProps.localCompute.description" }),
    color: "primary",
  },
  {
    icon: "🚀",
    title: translate({ message: "HOME.ValueProps.workflowAPI.title" }),
    description: translate({ message: "HOME.ValueProps.workflowAPI.description" }),
    color: "secondary",
  },
  {
    icon: "✨",
    title: translate({ message: "HOME.ValueProps.aiNative.title" }),
    description: translate({ message: "HOME.ValueProps.aiNative.description" }),
    color: "tertiary",
  },
];

export default function HomepageValueProps() {
  return (
    <section className={styles.valuePropsSection}>
      <div className={styles.container}>
        {/* 价值主张卡片网格 */}
        <div className={styles.valuePropsGrid}>
          {valueProps.map((prop, index) => (
            <div key={index} className={`${styles.valuePropCard} ${styles[prop.color]}`}>
              {/* 图标 */}
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{prop.icon}</span>
              </div>

              {/* 标题 */}
              <h3 className={styles.title}>{prop.title}</h3>

              {/* 描述 */}
              <p className={styles.description}>{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
