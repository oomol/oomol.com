import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";

// 对比数据
const comparisonData = [
  {
    feature: translate({ message: "HOME.WhyOomol.feature.buildFunctions" }),
    others: translate({ message: "HOME.WhyOomol.others.buildFunctions" }),
    oomol: translate({ message: "HOME.WhyOomol.oomol.buildFunctions" }),
    othersStatus: "no",
    oomolStatus: "yes",
  },
  {
    feature: translate({ message: "HOME.WhyOomol.feature.composeAPI" }),
    others: translate({ message: "HOME.WhyOomol.others.composeAPI" }),
    oomol: translate({ message: "HOME.WhyOomol.oomol.composeAPI" }),
    othersStatus: "limited",
    oomolStatus: "yes",
  },
  {
    feature: translate({ message: "HOME.WhyOomol.feature.localGPU" }),
    others: translate({ message: "HOME.WhyOomol.others.localGPU" }),
    oomol: translate({ message: "HOME.WhyOomol.oomol.localGPU" }),
    othersStatus: "no",
    oomolStatus: "yes",
  },
  {
    feature: translate({ message: "HOME.WhyOomol.feature.deployment" }),
    others: translate({ message: "HOME.WhyOomol.others.deployment" }),
    oomol: translate({ message: "HOME.WhyOomol.oomol.deployment" }),
    othersStatus: "no",
    oomolStatus: "yes",
  },
  {
    feature: translate({ message: "HOME.WhyOomol.feature.mcpTools" }),
    others: translate({ message: "HOME.WhyOomol.others.mcpTools" }),
    oomol: translate({ message: "HOME.WhyOomol.oomol.mcpTools" }),
    othersStatus: "no",
    oomolStatus: "yes",
  },
  {
    feature: translate({ message: "HOME.WhyOomol.feature.devExperience" }),
    others: translate({ message: "HOME.WhyOomol.others.devExperience" }),
    oomol: translate({ message: "HOME.WhyOomol.oomol.devExperience" }),
    othersStatus: "no",
    oomolStatus: "yes",
  },
];

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "yes") {
    return <span className={styles.iconYes}>✅</span>;
  }
  if (status === "limited") {
    return <span className={styles.iconLimited}>⚠️</span>;
  }
  return <span className={styles.iconNo}>❌</span>;
};

export default function HomepageWhyOomol() {
  return (
    <section className={styles.whyOomolSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {translate({ message: "HOME.WhyOomol.title" })}
          </h2>
        </div>

        {/* Comparison Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th className={styles.featureColumn}>
                  {translate({ message: "HOME.WhyOomol.column.feature" })}
                </th>
                <th className={styles.othersColumn}>
                  {translate({ message: "HOME.WhyOomol.column.others" })}
                </th>
                <th className={styles.oomolColumn}>
                  {translate({ message: "HOME.WhyOomol.column.oomol" })}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.featureCell}>{row.feature}</td>
                  <td className={styles.othersCell}>
                    <div className={styles.cellContent}>
                      <StatusIcon status={row.othersStatus} />
                      <span>{row.others}</span>
                    </div>
                  </td>
                  <td className={styles.oomolCell}>
                    <div className={styles.cellContent}>
                      <StatusIcon status={row.oomolStatus} />
                      <span>{row.oomol}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className={styles.mobileCards}>
          {comparisonData.map((row, index) => (
            <div key={index} className={styles.mobileCard}>
              <h3 className={styles.mobileFeature}>{row.feature}</h3>
              <div className={styles.mobileComparison}>
                <div className={styles.mobileOthers}>
                  <div className={styles.mobileLabel}>
                    {translate({ message: "HOME.WhyOomol.column.others" })}
                  </div>
                  <div className={styles.mobileValue}>
                    <StatusIcon status={row.othersStatus} />
                    <span>{row.others}</span>
                  </div>
                </div>
                <div className={styles.mobileOomol}>
                  <div className={styles.mobileLabel}>
                    {translate({ message: "HOME.WhyOomol.column.oomol" })}
                  </div>
                  <div className={styles.mobileValue}>
                    <StatusIcon status={row.oomolStatus} />
                    <span>{row.oomol}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
