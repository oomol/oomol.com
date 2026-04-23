import styles from "./styles.module.scss";

import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { SiteCta } from "@site/src/components/SiteCta";
import { Button } from "@site/src/components/ui/button";
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
      light: "/img/pages/studio/code-light.webp",
      dark: "/img/pages/studio/code-dark.webp",
    },
    alt: "Write function tools with code in OOMOL Studio",
  },
  {
    titleKey: "STUDIO.principle2.title",
    paragraphs: [
      "STUDIO.principle2.paragraph1",
      "STUDIO.principle2.paragraph2",
      "STUDIO.principle2.paragraph3",
    ],
    image: {
      light: "/img/pages/studio/edit-light.webp",
      dark: "/img/pages/studio/edit-dark.webp",
    },
    alt: "Developer experience for function tools in OOMOL Studio",
  },
  {
    titleKey: "STUDIO.principle3.title",
    paragraphs: [
      "STUDIO.principle3.paragraph1",
      "STUDIO.principle3.paragraph2",
      "STUDIO.principle3.paragraph3",
    ],
    image: {
      light: "/img/pages/studio/package-light.webp",
      dark: "/img/pages/studio/package-dark.webp",
    },
    alt: "Local and cloud continuity for tools built in OOMOL Studio",
  },
];

const painPoints = [
  {
    labelKey: "STUDIO.story.point3.label",
    titleKey: "STUDIO.story.point3.title",
    descriptionKey: "STUDIO.story.point3.description",
  },
  {
    labelKey: "STUDIO.story.point1.label",
    titleKey: "STUDIO.story.point1.title",
    descriptionKey: "STUDIO.story.point1.description",
  },
  {
    labelKey: "STUDIO.story.point2.label",
    titleKey: "STUDIO.story.point2.title",
    descriptionKey: "STUDIO.story.point2.description",
  },
];

export default function StudioPage() {
  const studioPreviewLight = useBaseUrl("/img/pages/studio/studio-light.webp");
  const studioPreviewDark = useBaseUrl("/img/pages/studio/studio-dark.webp");
  const principle1Light = useBaseUrl("/img/pages/studio/code-light.webp");
  const principle1Dark = useBaseUrl("/img/pages/studio/code-dark.webp");
  const principle2Light = useBaseUrl("/img/pages/studio/edit-light.webp");
  const principle2Dark = useBaseUrl("/img/pages/studio/edit-dark.webp");
  const principle3Light = useBaseUrl("/img/pages/studio/package-light.webp");
  const principle3Dark = useBaseUrl("/img/pages/studio/package-dark.webp");
  const principleImages = [
    { light: principle1Light, dark: principle1Dark },
    { light: principle2Light, dark: principle2Dark },
    { light: principle3Light, dark: principle3Dark },
  ];
  const storyTitleLines = translate({
    message: "STUDIO.product.story.title",
  }).split("\n");
  const storyDescriptionLines = translate({
    message: "STUDIO.product.story.description",
  }).split("\n");
  const heroTitleLines = translate({
    message: "STUDIO.manifesto.title",
  }).split("\n");
  const principlesTitleLines = translate({
    message: "STUDIO.product.principles.title",
  }).split("\n");
  const heroKicker = translate({
    message: "STUDIO.product.hero.kicker",
  });
  const storyKicker = translate({
    message: "STUDIO.product.story.kicker",
  });
  const principlesKicker = translate({
    message: "STUDIO.product.principles.kicker",
  });

  return (
    <Layout>
      <Head>
        <title>{translate({ message: "STUDIO.page.title" })}</title>
        <meta
          name="description"
          content={translate({ message: "STUDIO.page.description" })}
        />
      </Head>
      <main className={`${styles.page} oomol-landing-main`}>
        <section className={styles.hero}>
          <div className={styles.sectionContainer}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}>{heroKicker}</div>
              <h1 className={styles.heroTitle}>
                {heroTitleLines.map((line, index) => (
                  <React.Fragment key={`${index}-${line}`}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </React.Fragment>
                ))}
              </h1>
              <p className={styles.heroDescription}>
                {translate({ message: "STUDIO.manifesto.subtitle" })}
              </p>

              <div className={styles.actions}>
                <DownloadButton centered />
              </div>
            </div>
          </div>

          <div className={styles.heroShowcase}>
            <div className={styles.heroShowcaseInner}>
              <div className={styles.heroVisual}>
                <div className={styles.visualFrame}>
                  <ThemedImage
                    sources={{
                      light: studioPreviewLight,
                      dark: studioPreviewDark,
                    }}
                    alt="OOMOL Studio"
                    className={styles.visualImage}
                    fetchPriority="high"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.eyebrow}>{storyKicker}</div>
              <h2 className={styles.sectionTitle}>
                {storyTitleLines.map((line, index) => (
                  <React.Fragment key={`${index}-${line}`}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </React.Fragment>
                ))}
              </h2>
              <p className={styles.sectionDescription}>
                {storyDescriptionLines.map((line, index) => (
                  <React.Fragment key={`${index}-${line}`}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </React.Fragment>
                ))}
              </p>
            </div>

            <div className={styles.painPointsGrid}>
              {painPoints.map((point, index) => (
                <article key={point.titleKey} className={styles.painPointCard}>
                  <div className={styles.painPointMeta}>
                    <span className={styles.painPointIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.painPointLabel}>
                      {translate({ message: point.labelKey })}
                    </span>
                  </div>
                  <h3 className={styles.painPointTitle}>
                    {translate({ message: point.titleKey })}
                  </h3>
                  <p className={styles.painPointText}>
                    {translate({ message: point.descriptionKey })}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.principlesSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.eyebrow}>{principlesKicker}</div>
              <h2 className={styles.sectionTitle}>
                {principlesTitleLines.map((line, index) => (
                  <React.Fragment key={`${index}-${line}`}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </React.Fragment>
                ))}
              </h2>
              <p className={styles.sectionDescription}>
                {translate({
                  message: "STUDIO.product.principles.description",
                })}
              </p>
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

        <SiteCta
          title={translate({ message: "STUDIO.product.cta.title" })}
          description={translate({ message: "STUDIO.product.cta.description" })}
          actions={
            <>
              <DownloadButton centered showNote noteTone="inverse" fullWidth />
              <Button asChild size="lg" variant="outline">
                <Link to="/cloud">
                  {translate({ message: "HOME.StudioChain.action.cloud" })}
                </Link>
              </Button>
            </>
          }
        />
      </main>
    </Layout>
  );
}
