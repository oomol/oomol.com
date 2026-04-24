import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CloudPageDeveloperBenefits from "@site/src/components/CloudPageDeveloperBenefits";
import ResponsiveVideo from "@site/src/components/mdx/ResponsiveVideo";
import { SiteCta } from "@site/src/components/SiteCta";
import { Button } from "@site/src/components/ui/button";
import { clsx } from "clsx";
import React from "react";

const homepageMediaUrls = {
  cli: "https://static.oomol.com/assets/homepage/oomol-oo-cli-en.webm",
} as const;

type Copy = {
  cloud: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    media: { title: string };
    docs: string;
    secondary: string;
  };
  cli: {
    eyebrow: string;
    title: string;
    description: string;
    media: { title: string };
    guide: string;
    github: string;
  };
  cta: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
};

type VideoCardProps = {
  title: string;
  src: string;
};

type ImageCardProps = {
  title: string;
  src: string;
};

function VideoCard({ title, src }: VideoCardProps) {
  return (
    <div className={styles.videoCard}>
      <div className={styles.videoCardMedia}>
        <ResponsiveVideo
          autoPlay
          className={styles.videoCardVideo}
          loop
          muted
          playsInline
          preload="none"
          src={src}
          type="video/webm"
          loadRootMargin="360px 0px"
          aria-label={title}
        />
      </div>
    </div>
  );
}

function ImageCard({ title, src }: ImageCardProps) {
  return (
    <div className={styles.videoCard}>
      <div className={styles.imageCardMedia}>
        <img
          className={styles.imageCardImage}
          src={src}
          alt={title}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

export default function CloudPageLinearFlow() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const copy: Copy = {
    cloud: {
      eyebrow: translate({ message: "CLOUD.flow.cloud.eyebrow" }),
      title: translate({ message: "CLOUD.flow.cloud.title" }),
      description: translate({ message: "CLOUD.flow.cloud.description" }),
      points: [
        translate({ message: "CLOUD.flow.cloud.point1" }),
        translate({ message: "CLOUD.flow.cloud.point2" }),
        translate({ message: "CLOUD.flow.cloud.point3" }),
      ],
      media: {
        title: translate({ message: "CLOUD.flow.cloud.media.title" }),
      },
      docs: translate({ message: "CLOUD.flow.cloud.docs" }),
      secondary: translate({ message: "CLOUD.flow.cloud.secondary" }),
    },
    cli: {
      eyebrow: translate({ message: "CLOUD.flow.cli.eyebrow" }),
      title: translate({ message: "CLOUD.flow.cli.title" }),
      description: translate({ message: "CLOUD.flow.cli.description" }),
      media: {
        title: translate({ message: "CLOUD.flow.cli.media.title" }),
      },
      guide: translate({ message: "CLOUD.flow.cli.guide" }),
      github: translate({ message: "CLOUD.flow.cli.github" }),
    },
    cta: {
      title: translate({ message: "CLOUD.flow.cta.title" }),
      description: translate({ message: "CLOUD.flow.cta.description" }),
      primary: translate({ message: "CLOUD.flow.cta.primary" }),
      secondary: translate({ message: "CLOUD.flow.cta.secondary" }),
    },
  };
  const cloudConsoleImage = useBaseUrl(
    i18n.currentLocale === "zh-CN"
      ? "/img/pages/home/cloud-console-zh.png"
      : "/img/pages/home/cloud-console-en.png"
  );

  return (
    <div className={`${styles.flow} oomol-no-section-isolation`}>
      {/* ── Section: Cloud ── */}
      <section className={clsx(styles.section, styles.cloudSection)}>
        <div className={clsx(styles.container, styles.cloudContainer)}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.cloud.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.cloud.title}</h2>
            <p className={styles.sectionDescription}>
              {copy.cloud.description}
            </p>
            <div
              className={styles.cloudPointList}
              aria-label={translate({
                message: "CLOUD.flow.cloud.pointsAriaLabel",
              })}
            >
              {copy.cloud.points.map(point => (
                <span key={point} className={styles.cloudPoint}>
                  {point}
                </span>
              ))}
            </div>
            <div className={styles.inlineActions}>
              <Link
                to="/docs/cloud-services/cloud-function"
                className={styles.primaryLink}
              >
                {copy.cloud.docs}
              </Link>
              <a
                href="https://console.oomol.com/cloud-function"
                target="_blank"
                rel="noreferrer"
                className={styles.secondaryLink}
              >
                {copy.cloud.secondary}
              </a>
            </div>
          </div>

          <div className={clsx(styles.mediaPanel, styles.cloudMediaPanel)}>
            <ImageCard title={copy.cloud.media.title} src={cloudConsoleImage} />
          </div>
        </div>
      </section>

      {/* ── Section: oo-cli ── */}
      <section className={clsx(styles.section, styles.cliSection)}>
        <div className={styles.container}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.cli.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.cli.title}</h2>
            <p className={styles.sectionDescription}>{copy.cli.description}</p>
            <div className={styles.inlineActions}>
              <Link to="/docs/oo-cli" className={styles.primaryLink}>
                {copy.cli.guide}
              </Link>
              <a
                href="https://github.com/oomol-lab/oo-cli"
                target="_blank"
                rel="noreferrer"
                className={styles.secondaryLink}
              >
                {copy.cli.github}
              </a>
            </div>
          </div>

          <div className={styles.mediaPanel}>
            <VideoCard
              title={copy.cli.media.title}
              src={homepageMediaUrls.cli}
            />
          </div>
        </div>
      </section>

      <CloudPageDeveloperBenefits />

      {/* ── CTA ── */}
      <SiteCta
        title={copy.cta.title}
        description={copy.cta.description}
        actions={
          <>
            <Button asChild size="lg">
              <Link to="/docs/cloud-services/cloud-function">
                {copy.cta.primary}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href="https://console.oomol.com/cloud-function"
                target="_blank"
                rel="noreferrer"
              >
                {copy.cta.secondary}
              </a>
            </Button>
          </>
        }
      />
    </div>
  );
}
