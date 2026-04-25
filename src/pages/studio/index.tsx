import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ResponsiveVideo from "@site/src/components/mdx/ResponsiveVideo";
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
    altKey: "STUDIO.principle1.imageAlt",
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
    altKey: "STUDIO.principle2.imageAlt",
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
    altKey: "STUDIO.principle3.imageAlt",
  },
];

const painPoints = [
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
  {
    labelKey: "STUDIO.story.point3.label",
    titleKey: "STUDIO.story.point3.title",
    descriptionKey: "STUDIO.story.point3.description",
  },
];

const STUDIO_OVERVIEW_VIDEO_SRC =
  "https://cloud-storage.oomol.com/users/019343aa-ff25-727c-a449-9017313539b0/chat-uploads/2026-03-23/4gxes_hu5_ua-OOMOL_Studio.webm";

export default function StudioPage() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const isZh = i18n.currentLocale === "zh-CN";
  const studioHeroPoster = isZh
    ? "/img/docs/cn/desktop.png"
    : "/img/docs/desktop.png";
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
                <DownloadButton centered showNote={false} />
                <Button asChild size="lg" variant="outline">
                  <Link to="/cloud">
                    {translate({ message: "HOME.StudioChain.action.cloud" })}
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.heroShowcase}>
            <div className={styles.heroShowcaseInner}>
              <div className={styles.heroVisual}>
                <div className={styles.visualFrame}>
                  <ResponsiveVideo
                    src={STUDIO_OVERVIEW_VIDEO_SRC}
                    type="video/webm"
                    aria-label={translate({ message: "STUDIO.hero.imageAlt" })}
                    className={styles.visualMedia}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={studioHeroPoster}
                    loadWhenInView={false}
                    style={{ borderRadius: 0 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
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
              {painPoints.map(point => (
                <article key={point.titleKey} className={styles.painPointCard}>
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
                      alt={translate({ message: principle.altKey })}
                      className={styles.principleImage}
                    />
                  </div>
                  <div className={styles.principleContent}>
                    <h2 className={styles.principleTitle}>
                      {translate({ message: principle.titleKey })}
                    </h2>
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
