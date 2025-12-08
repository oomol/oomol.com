import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import Link from "@docusaurus/Link";

// 产品对比数据 - 重构为卡片式数据结构
const products = [
  {
    name: translate({ message: "HOME.ProductComparison.product.studio" }),
    stage: translate({ message: "HOME.ProductComparison.studio.stage" }),
    capability: translate({
      message: "HOME.ProductComparison.studio.capability",
    }),
    scenario: translate({ message: "HOME.ProductComparison.studio.scenario" }),
    tech: translate({ message: "HOME.ProductComparison.studio.tech" }),
    icon: "🖥️",
    color: "primary",
    link: "/studio",
  },
  {
    name: translate({ message: "HOME.ProductComparison.product.headless" }),
    stage: translate({ message: "HOME.ProductComparison.headless.stage" }),
    capability: translate({
      message: "HOME.ProductComparison.headless.capability",
    }),
    scenario: translate({
      message: "HOME.ProductComparison.headless.scenario",
    }),
    tech: translate({ message: "HOME.ProductComparison.headless.tech" }),
    icon: "🐳",
    color: "secondary",
    link: "/headless",
  },
  {
    name: translate({ message: "HOME.ProductComparison.product.cloud" }),
    stage: translate({ message: "HOME.ProductComparison.cloud.stage" }),
    capability: translate({
      message: "HOME.ProductComparison.cloud.capability",
    }),
    scenario: translate({ message: "HOME.ProductComparison.cloud.scenario" }),
    tech: translate({ message: "HOME.ProductComparison.cloud.tech" }),
    icon: "☁️",
    color: "tertiary",
    link: "/cloud",
  },
];

export default function HomepageProductComparison() {
  return (
    <section className={styles.comparisonSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {translate({ message: "HOME.ProductComparison.title" })}
          </h2>
          <p className={styles.sectionSubtitle}>
            {translate({ message: "HOME.ProductComparison.subtitle" })}
          </p>
        </div>

        {/* 产品卡片网格 */}
        <div className={styles.productsGrid}>
          {products.map((product, index) => (
            <Link
              key={index}
              to={product.link}
              className={`${styles.productCard} ${styles[product.color]}`}
            >
              {/* 卡片头部 */}
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>{product.icon}</div>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <div className={styles.cardBadge}>{product.stage}</div>
              </div>

              {/* 卡片内容 */}
              <div className={styles.cardBody}>
                <div className={styles.infoSection}>
                  <div className={styles.infoLabel}>
                    {translate({
                      message: "HOME.ProductComparison.dimension.capability",
                    })}
                  </div>
                  <div className={styles.infoContent}>{product.capability}</div>
                </div>

                <div className={styles.infoSection}>
                  <div className={styles.infoLabel}>
                    {translate({
                      message: "HOME.ProductComparison.dimension.scenario",
                    })}
                  </div>
                  <div className={styles.infoContent}>{product.scenario}</div>
                </div>

                <div className={styles.infoSection}>
                  <div className={styles.infoLabel}>
                    {translate({
                      message: "HOME.ProductComparison.dimension.tech",
                    })}
                  </div>
                  <div className={styles.infoContent}>{product.tech}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
