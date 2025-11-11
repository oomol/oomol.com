import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";

// 产品对比数据
const comparisonData = {
  headers: [
    translate({ message: "HOME.ProductComparison.product.studio" }),
    translate({ message: "HOME.ProductComparison.product.headless" }),
    translate({ message: "HOME.ProductComparison.product.cloud" }),
  ],
  rows: [
    {
      dimension: translate({ message: "HOME.ProductComparison.dimension.stage" }),
      values: [
        translate({ message: "HOME.ProductComparison.studio.stage" }),
        translate({ message: "HOME.ProductComparison.headless.stage" }),
        translate({ message: "HOME.ProductComparison.cloud.stage" }),
      ],
    },
    {
      dimension: translate({ message: "HOME.ProductComparison.dimension.capability" }),
      values: [
        translate({ message: "HOME.ProductComparison.studio.capability" }),
        translate({ message: "HOME.ProductComparison.headless.capability" }),
        translate({ message: "HOME.ProductComparison.cloud.capability" }),
      ],
    },
    {
      dimension: translate({ message: "HOME.ProductComparison.dimension.scenario" }),
      values: [
        translate({ message: "HOME.ProductComparison.studio.scenario" }),
        translate({ message: "HOME.ProductComparison.headless.scenario" }),
        translate({ message: "HOME.ProductComparison.cloud.scenario" }),
      ],
    },
    {
      dimension: translate({ message: "HOME.ProductComparison.dimension.tech" }),
      values: [
        translate({ message: "HOME.ProductComparison.studio.tech" }),
        translate({ message: "HOME.ProductComparison.headless.tech" }),
        translate({ message: "HOME.ProductComparison.cloud.tech" }),
      ],
    },
  ],
};

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

        {/* 桌面端表格视图 */}
        <div className={styles.tableWrapper}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th className={styles.dimensionHeader}>
                  {translate({ message: "HOME.ProductComparison.dimension.header" })}
                </th>
                {comparisonData.headers.map((header, index) => (
                  <th key={index} className={styles.productHeader}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonData.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className={styles.dimensionCell}>{row.dimension}</td>
                  {row.values.map((value, colIndex) => (
                    <td key={colIndex} className={styles.valueCell}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 移动端卡片视图 */}
        <div className={styles.cardsWrapper}>
          {comparisonData.headers.map((productName, productIndex) => (
            <div key={productIndex} className={styles.productCard}>
              <h3 className={styles.productCardTitle}>{productName}</h3>
              <div className={styles.productCardContent}>
                {comparisonData.rows.map((row, rowIndex) => (
                  <div key={rowIndex} className={styles.productCardRow}>
                    <div className={styles.productCardDimension}>{row.dimension}</div>
                    <div className={styles.productCardValue}>{row.values[productIndex]}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
