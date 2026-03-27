import styles from "./styles.module.scss";

import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";
import React from "react";

import Layout from "../../theme/Layout";

const deliveryModes = [
  {
    index: "01",
    titleKey: "CLOUD.modes.serverless.title",
    descriptionKey: "CLOUD.modes.serverless.description",
  },
  {
    index: "02",
    titleKey: "CLOUD.modes.mcp.title",
    descriptionKey: "CLOUD.modes.mcp.description",
  },
  {
    index: "03",
    titleKey: "CLOUD.modes.library.title",
    descriptionKey: "CLOUD.modes.library.description",
  },
];

const openSourceProjects = [
  {
    titleKey: "CLOUD.opensource.ovm.title",
    descriptionKey: "CLOUD.opensource.ovm.description",
  },
  {
    titleKey: "CLOUD.opensource.ovm-core.title",
    descriptionKey: "CLOUD.opensource.ovm-core.description",
  },
  {
    titleKey: "CLOUD.opensource.ovm-win.title",
    descriptionKey: "CLOUD.opensource.ovm-win.description",
  },
  {
    titleKey: "CLOUD.opensource.ovm-mac.title",
    descriptionKey: "CLOUD.opensource.ovm-mac.description",
  },
];

export default function CloudPage() {
  const publishLight = useBaseUrl("/img/pages/home/publish-light.png");
  const publishDark = useBaseUrl("/img/pages/home/publish-dark.png");
  const cloudConsoleUrl = "https://console.oomol.com/cloud-function";

  return (
    <Layout>
      <Head>
        <title>{translate({ message: "CLOUD.hero.title" })}</title>
        <meta
          name="description"
          content={translate({ message: "CLOUD.hero.description" })}
        />
      </Head>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroCopy}>
              <div className={styles.kicker}>
                {translate({ message: "CLOUD.hero.kicker" })}
              </div>
              <h1 className={styles.heroTitle}>
                {translate({ message: "CLOUD.hero.title" })}
              </h1>
              <p className={styles.heroDescription}>
                {translate({ message: "CLOUD.hero.description" })}
              </p>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>
                    {translate({ message: "CLOUD.hero.stat1" })}
                  </span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>
                    {translate({ message: "CLOUD.hero.stat2" })}
                  </span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>
                    {translate({ message: "CLOUD.hero.stat3" })}
                  </span>
                </div>
              </div>

              <div className={styles.actions}>
                <Link to="/studio" className={styles.primaryAction}>
                  {translate({ message: "CLOUD.hero.cta.start" })}
                </Link>
                <a
                  href={cloudConsoleUrl}
                  className={styles.secondaryAction}
                  target="_blank"
                  rel="noreferrer"
                >
                  {translate({ message: "CLOUD.hero.cta.console" })}
                </a>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.visualFrame}>
                <ThemedImage
                  sources={{
                    light: publishLight,
                    dark: publishDark,
                  }}
                  alt="Deploy blocks with OOMOL Cloud"
                  className={styles.visualImage}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.narrativeSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>
                {translate({ message: "CLOUD.painPoints.subtitle" })}
              </div>
              <h2 className={styles.sectionTitle}>
                {translate({ message: "CLOUD.painPoints.title" })}
              </h2>
            </div>
            <p className={styles.sectionBody}>
              {translate({ message: "CLOUD.painPoints.description" })}
            </p>
          </div>
        </section>

        <section className={styles.deliverySection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>
                {translate({ message: "CLOUD.solution.kicker" })}
              </div>
              <h2 className={styles.sectionTitle}>
                {translate({ message: "CLOUD.solution.title" })}
              </h2>
              <p className={styles.sectionSubtitle}>
                {translate({ message: "CLOUD.solution.subtitle" })}
              </p>
            </div>

            <div className={styles.modeGrid}>
              {deliveryModes.map(mode => (
                <article key={mode.titleKey} className={styles.modeCard}>
                  <div className={styles.modeIndex}>{mode.index}</div>
                  <h3 className={styles.modeTitle}>
                    {translate({ message: mode.titleKey })}
                  </h3>
                  <p className={styles.modeDescription}>
                    {translate({ message: mode.descriptionKey })}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.pricingSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.pricingCard}>
              <div className={styles.sectionLabel}>
                {translate({ message: "CLOUD.pricing.kicker" })}
              </div>
              <h2 className={styles.sectionTitle}>
                {translate({ message: "CLOUD.pricing.title" })}
              </h2>
              <p className={styles.sectionBody}>
                {translate({ message: "CLOUD.pricing.description" })}
              </p>
              <Link to="/pricing" className={styles.inlineLink}>
                {translate({ message: "CLOUD.pricing.cta" })}
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.openSourceSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>
                {translate({ message: "CLOUD.opensource.projects.title" })}
              </div>
              <h2 className={styles.sectionTitle}>
                {translate({ message: "CLOUD.opensource.title" })}
              </h2>
              <p className={styles.sectionSubtitle}>
                {translate({ message: "CLOUD.opensource.subtitle" })}
              </p>
            </div>
            <p className={styles.sectionBody}>
              {translate({ message: "CLOUD.opensource.description" })}
            </p>

            <div className={styles.projectGrid}>
              {openSourceProjects.map(project => (
                <article
                  key={project.titleKey}
                  className={styles.projectCard}
                >
                  <h3 className={styles.projectTitle}>
                    {translate({ message: project.titleKey })}
                  </h3>
                  <p className={styles.projectDescription}>
                    {translate({ message: project.descriptionKey })}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>
                {translate({ message: "HOME.ProductComparison.title" })}
              </h2>
              <p className={styles.ctaDescription}>
                {translate({ message: "HOME.ProductComparison.subtitle" })}
              </p>
              <div className={styles.actions}>
                <Link to="/studio" className={styles.primaryAction}>
                  {translate({ message: "CLOUD.cta.primary" })}
                </Link>
                <a
                  href={cloudConsoleUrl}
                  className={styles.secondaryAction}
                  target="_blank"
                  rel="noreferrer"
                >
                  {translate({ message: "CLOUD.cta.secondary" })}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
