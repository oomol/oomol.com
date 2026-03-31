import styles from "./styles.module.scss";

import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";
import React from "react";

import { DownloadButton } from "../../components/DownloadButton";
import Layout from "../../theme/Layout";

const principles = [
  {
    titleKey: "STUDIO.principle1.title",
    paragraphs: [
      "STUDIO.principle1.paragraph1",
      "STUDIO.principle1.paragraph2",
      "STUDIO.principle1.paragraph3",
    ],
    image: {
      light: "/img/pages/studio/code-light.png",
      dark: "/img/pages/studio/code-dark.png",
    },
    alt: "Write blocks with code in OOMOL Studio",
  },
  {
    titleKey: "STUDIO.principle2.title",
    paragraphs: [
      "STUDIO.principle2.paragraph1",
      "STUDIO.principle2.paragraph2",
      "STUDIO.principle2.paragraph3",
    ],
    image: {
      light: "/img/pages/studio/edit-light.png",
      dark: "/img/pages/studio/edit-dark.png",
    },
    alt: "Developer experience in OOMOL Studio",
  },
  {
    titleKey: "STUDIO.principle3.title",
    paragraphs: [
      "STUDIO.principle3.paragraph1",
      "STUDIO.principle3.paragraph2",
      "STUDIO.principle3.paragraph3",
    ],
    image: {
      light: "/img/pages/studio/package-light.png",
      dark: "/img/pages/studio/package-dark.png",
    },
    alt: "Local and cloud continuity in OOMOL Studio",
  },
];

const frustrations = [
  "STUDIO.story.frustration.line1",
  "STUDIO.story.frustration.line2",
  "STUDIO.story.frustration.line3",
];

export default function StudioPage() {
  const studioPreviewLight = useBaseUrl("/img/pages/studio/studio-light.png");
  const studioPreviewDark = useBaseUrl("/img/pages/studio/studio-dark.png");
  const principle1Light = useBaseUrl("/img/pages/studio/code-light.png");
  const principle1Dark = useBaseUrl("/img/pages/studio/code-dark.png");
  const principle2Light = useBaseUrl("/img/pages/studio/edit-light.png");
  const principle2Dark = useBaseUrl("/img/pages/studio/edit-dark.png");
  const principle3Light = useBaseUrl("/img/pages/studio/package-light.png");
  const principle3Dark = useBaseUrl("/img/pages/studio/package-dark.png");
  const principleImages = [
    { light: principle1Light, dark: principle1Dark },
    { light: principle2Light, dark: principle2Dark },
    { light: principle3Light, dark: principle3Dark },
  ];

  return (
    <Layout>
      <Head>
        <title>{translate({ message: "STUDIO.page.title" })}</title>
        <meta
          name="description"
          content={translate({ message: "STUDIO.page.description" })}
        />
      </Head>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroCopy}>
              <div className={styles.kicker}>
                {translate({ message: "STUDIO.product.hero.kicker" })}
              </div>
              <h1 className={styles.heroTitle}>
                {translate({ message: "STUDIO.manifesto.title" })}
              </h1>
              <p className={styles.heroDescription}>
                {translate({ message: "STUDIO.manifesto.subtitle" })}
              </p>

              <div className={styles.actions}>
                <DownloadButton />
                <Link to="/downloads" className={styles.secondaryAction}>
                  {translate({ message: "STUDIO.product.hero.secondary" })}
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.visualFrame}>
                <ThemedImage
                  sources={{
                    light: studioPreviewLight,
                    dark: studioPreviewDark,
                  }}
                  alt="OOMOL Studio"
                  className={styles.visualImage}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>
                {translate({ message: "STUDIO.product.story.kicker" })}
              </div>
              <h2 className={styles.sectionTitle}>
                {translate({ message: "STUDIO.product.story.title" })}
              </h2>
            </div>

            <div className={styles.storyGrid}>
              <div className={styles.storyCopy}>
                <p className={styles.storyLead}>
                  {translate({ message: "STUDIO.story.paragraph1" })}
                </p>
                <p className={styles.storyBody}>
                  {translate({ message: "STUDIO.story.paragraph2" })}
                </p>
                <p className={styles.storyBody}>
                  {translate({ message: "STUDIO.story.paragraph3" })}
                </p>
              </div>

              <div className={styles.quoteStack}>
                {frustrations.map(key => (
                  <blockquote key={key} className={styles.quoteCard}>
                    {translate({ message: key })}
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.principlesSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionLabel}>
                {translate({ message: "STUDIO.product.principles.kicker" })}
              </div>
              <h2 className={styles.sectionTitle}>
                {translate({ message: "STUDIO.product.principles.title" })}
              </h2>
            </div>

            <div className={styles.principlesGrid}>
              {principles.map((principle, index) => (
                <article
                  key={principle.titleKey}
                  className={styles.principleCard}
                >
                  <div className={styles.principleMedia}>
                    <ThemedImage
                      sources={principleImages[index]}
                      alt={principle.alt}
                      className={styles.principleImage}
                    />
                  </div>
                  <div className={styles.principleContent}>
                    <h3 className={styles.principleTitle}>
                      {translate({ message: principle.titleKey })}
                    </h3>
                    <div className={styles.principleParagraphs}>
                      {principle.paragraphs.map(key => (
                        <p key={key} className={styles.principleText}>
                          {translate({ message: key })}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>
                {translate({ message: "STUDIO.product.cta.title" })}
              </h2>
              <p className={styles.ctaDescription}>
                {translate({ message: "STUDIO.product.cta.description" })}
              </p>
              <div className={styles.ctaActions}>
                <DownloadButton showNote={false} />
                <Link to="/cloud" className={styles.secondaryAction}>
                  {translate({ message: "STUDIO.product.cta.secondary" })}
                </Link>
              </div>
              <p className={styles.ctaNote}>
                {translate({
                  message: "HOME.FirstScreen.download-macos-chip-note",
                })}
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
