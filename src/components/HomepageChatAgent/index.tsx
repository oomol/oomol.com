import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";

export default function HomepageChatAgent() {
  return (
    <section className={styles.chatAgentSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {translate({ message: "HOME.ChatAgent.title" })}
          </h2>
          <p className={styles.sectionDescription}>
            {translate({ message: "HOME.ChatAgent.description" })}
          </p>
        </div>

        {/* Feature Cards */}
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}>🔧</div>
            <div className={styles.cardContent}>
              {translate({ message: "HOME.ChatAgent.feature1" })}
            </div>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}>🤖</div>
            <div className={styles.cardContent}>
              {translate({ message: "HOME.ChatAgent.feature2" })}
            </div>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.cardIcon}>🚀</div>
            <div className={styles.cardContent}>
              {translate({ message: "HOME.ChatAgent.feature3" })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
