import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";

import Layout from "../../theme/Layout";

export default function AppPage() {
  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            {translate({ message: "APP.new.hero.title" })}
          </h1>
          <p
            className={styles.heroSubtitle}
            style={{
              fontSize: "1.8rem",
              fontWeight: 600,
              marginBottom: "1.5rem",
              color: "var(--ifm-heading-color)",
            }}
          >
            {translate({ message: "APP.new.hero.subtitle" })}
          </p>
          <p className={styles.heroDescription}>
            {translate({ message: "APP.new.hero.description" })}
          </p>
          <div className={styles.heroCTA}>
            <a href="/downloads" className={styles.primaryButton}>
              {translate({ message: "APP.new.cta.download" })}
            </a>
            <a href="/docs" className={styles.secondaryButton}>
              {translate({ message: "APP.new.cta.docs" })}
            </a>
          </div>
        </section>

        {/* Concept Section */}
        <section className={styles.conceptSection}>
          <h2 className={styles.sectionTitle}>
            {translate({ message: "APP.new.concept.title" })}
          </h2>
          <p className={styles.sectionDescription}>
            {translate({ message: "APP.new.concept.description" })}
          </p>
        </section>

        {/* Product Split Section */}
        <section className={styles.productSplitSection}>
          <div className={styles.productCard}>
            <div className={styles.productIcon}>🤖</div>
            <h3 className={styles.productTitle}>
              {translate({ message: "APP.new.chat.title" })}
            </h3>
            <h4 className={styles.productSubtitle}>
              {translate({ message: "APP.new.chat.subtitle" })}
            </h4>
            <p className={styles.productDesc}>
              {translate({ message: "APP.new.chat.description" })}
            </p>
            <div className={styles.devValueBox}>
              <span className={styles.devValueLabel}>Developer Value:</span>
              <p>{translate({ message: "APP.new.chat.devValue" })}</p>
            </div>
          </div>

          <div className={styles.productCard}>
            <div className={styles.productIcon}>📱</div>
            <h3 className={styles.productTitle}>
              {translate({ message: "APP.new.applet.title" })}
            </h3>
            <h4 className={styles.productSubtitle}>
              {translate({ message: "APP.new.applet.subtitle" })}
            </h4>
            <p className={styles.productDesc}>
              {translate({ message: "APP.new.applet.description" })}
            </p>
            <div className={styles.devValueBox}>
              <span className={styles.devValueLabel}>Developer Value:</span>
              <p>{translate({ message: "APP.new.applet.devValue" })}</p>
            </div>
          </div>
        </section>

        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
