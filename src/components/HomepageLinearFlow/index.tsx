import styles from "./styles.module.scss";
import siteCtaStyles from "../SiteCta/styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { SiteCta } from "@site/src/components/SiteCta";
import { HeroVideoDialog } from "@site/src/components/ui/hero-video-dialog";
import { Button } from "@site/src/components/ui/button";
import { clsx } from "clsx";
import React, { useEffect, useRef } from "react";

const homepageMediaUrls = {
  cli: "https://static.oomol.com/assets/homepage/oomol-oo-cli-en.webm",
} as const;

const STUDIO_OVERVIEW_VIDEO_SRC =
  "https://cloud-storage.oomol.com/users/019343aa-ff25-727c-a449-9017313539b0/chat-uploads/2026-03-23/4gxes_hu5_ua-OOMOL_Studio.webm";

type Copy = {
  cli: {
    eyebrow: string;
    title: string;
    description: string;
    media: { title: string };
    guide: string;
    github: string;
  };
  studio: {
    eyebrow: string;
    title: string;
    description: string;
    media: { title: string };
    primary: string;
    secondary: string;
  };
  cloud: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{ title: string; text: string }>;
    quota: { title: string; text: string };
    media: { title: string };
    primary: string;
    secondary: string;
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    let isInView = false;

    const syncPlayback = async () => {
      if (!isInView || document.visibilityState !== "visible") {
        video.pause();
        return;
      }

      try {
        await video.play();
      } catch {
        // Ignore autoplay rejections on restrictive browsers.
      }
    };

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        isInView = entry?.isIntersecting ?? false;
        void syncPlayback();
      },
      {
        rootMargin: "240px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(video);
    const onVisibilityChange = () => {
      void syncPlayback();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      video.pause();
    };
  }, []);

  return (
    <div className={styles.videoCard}>
      <div className={styles.videoCardMedia}>
        <video
          ref={videoRef}
          className={styles.videoCardVideo}
          loop
          muted
          playsInline
          preload="none"
          aria-label={title}
        >
          <source src={src} type="video/webm" />
        </video>
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

function splitEyebrow(eyebrow: string): { number: string; label: string } {
  const parts = eyebrow.split(/\s*\/\s*/);
  if (parts.length >= 2) {
    return { number: parts[0], label: parts.slice(1).join(" / ") };
  }
  return { number: "", label: eyebrow };
}

export default function HomepageLinearFlow() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const cloudConsoleImage = useBaseUrl(
    i18n.currentLocale === "zh-CN"
      ? "/img/pages/home/cloud-console-zh.png"
      : "/img/pages/home/cloud-console-en.png"
  );
  const studioHeroPoster = useBaseUrl(
    "/img/pages/studio/studio-hero-video-poster.png"
  );
  const copy: Copy = {
    cli: {
      eyebrow: translate({
        id: "HOME.LinearFlow.cli.eyebrow",
        message: "03 / Use from oo-cli",
      }),
      title: translate({
        id: "HOME.LinearFlow.cli.title",
        message: "Finally, hand the tool back to oo-cli so agents can use it",
      }),
      description: translate({
        id: "HOME.LinearFlow.cli.description",
        message:
          "Once the tool is built and delivered, agents in Codex, OpenClaw, and Claude Code keep using the same oo-cli path to search for it, inspect it, and call it.",
      }),
      media: {
        title: translate({
          id: "HOME.LinearFlow.cli.media.title",
          message: "oo-cli invocation demo",
        }),
      },
      guide: translate({
        id: "HOME.LinearFlow.cli.guide",
        message: "Explore oo-cli",
      }),
      github: translate({
        id: "HOME.LinearFlow.cli.github",
        message: "View GitHub",
      }),
    },
    studio: {
      eyebrow: translate({
        id: "HOME.LinearFlow.studio.eyebrow",
        message: "01 / Build in Studio",
      }),
      title: translate({
        id: "HOME.LinearFlow.studio.title",
        message: "Start in OOMOL Studio to generate, compose, and validate",
      }),
      description: translate({
        id: "HOME.LinearFlow.studio.description",
        message:
          "Use the agent to get started, then keep editing code, dependencies, parameters, and workflows yourself. Studio is for building tools, not day-to-day tool use.",
      }),
      media: {
        title: translate({
          id: "HOME.LinearFlow.studio.media.title",
          message: "Studio demo video",
        }),
      },
      primary: translate({
        id: "HOME.LinearFlow.studio.primary",
        message: "Install OOMOL Studio",
      }),
      secondary: translate({
        id: "HOME.LinearFlow.studio.secondary",
        message: "Explore Studio",
      }),
    },
    cloud: {
      eyebrow: translate({
        id: "HOME.LinearFlow.cloud.eyebrow",
        message: "02 / Run it in Cloud",
      }),
      title: translate({
        id: "HOME.LinearFlow.cloud.title",
        message: "After validation, run your tool in Cloud",
      }),
      description: translate({
        id: "HOME.LinearFlow.cloud.description",
        message:
          "Cloud runs the tool, stores config and secrets, manages access, and tracks usage. You do not need to build a separate backend service for the same tool.",
      }),
      cards: [
        {
          title: translate({
            id: "HOME.LinearFlow.cloud.card1.title",
            message: "Publish the tool and keep it running",
          }),
          text: translate({
            id: "HOME.LinearFlow.cloud.card1.text",
            message:
              "Use the same tool for yourself, your team, or customers without copying and maintaining separate versions.",
          }),
        },
        {
          title: translate({
            id: "HOME.LinearFlow.cloud.card2.title",
            message: "Manage config, access, and usage in one place",
          }),
          text: translate({
            id: "HOME.LinearFlow.cloud.card2.text",
            message:
              "Secrets, permissions, versions, runtime config, and usage logs live in Cloud, making updates and troubleshooting easier.",
          }),
        },
      ],
      quota: {
        title: translate({
          id: "HOME.LinearFlow.cloud.quota.title",
          message: "Start with included usage",
        }),
        text: translate({
          id: "HOME.LinearFlow.cloud.quota.text",
          message:
            "Free users get 200 Cloud Task minutes each month. You can launch first without buying servers or reserving capacity.",
        }),
      },
      media: {
        title: translate({
          id: "HOME.LinearFlow.cloud.media.title",
          message: "Cloud console preview",
        }),
      },
      primary: translate({
        id: "HOME.LinearFlow.cloud.primary",
        message: "Explore Cloud",
      }),
      secondary: translate({
        id: "HOME.LinearFlow.cloud.secondary",
        message: "Open Cloud Console",
      }),
    },
    cta: {
      title: translate({
        id: "HOME.LinearFlow.cta.title",
        message:
          "Start with ready-made tools, then take the developer path when needed",
      }),
      description: translate({
        id: "HOME.LinearFlow.cta.description",
        message:
          "Use oo-cli to get ready-made capabilities working first. When you need to produce, combine, and deliver your own tools, move into Studio and Cloud.",
      }),
      primary: translate({
        id: "HOME.LinearFlow.cta.primary",
        message: "Start with oo-cli",
      }),
      secondary: translate({
        id: "HOME.LinearFlow.cta.secondary",
        message: "Explore Studio",
      }),
    },
  };

  const studioEyebrow = splitEyebrow(copy.studio.eyebrow);
  const cloudEyebrow = splitEyebrow(copy.cloud.eyebrow);
  const cliEyebrow = splitEyebrow(copy.cli.eyebrow);

  return (
    <div className={`${styles.flow} oomol-no-section-isolation`}>
      {/* ── Section: Studio ── */}
      <section className={clsx(styles.section, styles.sectionTint)}>
        <div className={styles.stepWatermark} aria-hidden="true">
          {studioEyebrow.number}
        </div>
        <div className={clsx(styles.container, styles.studioContainer)}>
          <div className={clsx(styles.copyPanel, styles.studioCopyPanel)}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowNumber}>
                {studioEyebrow.number}
              </span>
              <span className={styles.eyebrowLabel}>{studioEyebrow.label}</span>
            </span>
            <h2 className={clsx(styles.sectionTitle, styles.studioTitle)}>
              {copy.studio.title}
            </h2>
            <p className={clsx(styles.sectionDescription, styles.studioDescription)}>
              {copy.studio.description}
            </p>
            <div className={styles.inlineActions}>
              <Link to="/downloads" className={styles.primaryLink}>
                {copy.studio.primary}
              </Link>
              <Link to="/studio" className={styles.secondaryLink}>
                {copy.studio.secondary}
              </Link>
            </div>
          </div>

          <div className={clsx(styles.mediaPanel, styles.studioMediaPanel)}>
            <HeroVideoDialog
              videoSrc={STUDIO_OVERVIEW_VIDEO_SRC}
              thumbnailSrc={studioHeroPoster}
              thumbnailAlt={copy.studio.media.title}
              title={copy.studio.media.title}
              thumbnailAspectRatio="90 / 56"
              thumbnailObjectPosition="center top"
            />
          </div>
        </div>
      </section>

      {/* ── Section: Cloud ── */}
      <section className={clsx(styles.section, styles.cloudSection)}>
        <div className={styles.stepWatermark} aria-hidden="true">
          {cloudEyebrow.number}
        </div>
        <div className={clsx(styles.container, styles.cloudContainer)}>
          <div className={clsx(styles.copyPanel, styles.cloudCopyPanel)}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowNumber}>
                {cloudEyebrow.number}
              </span>
              <span className={styles.eyebrowLabel}>{cloudEyebrow.label}</span>
            </span>
            <h2 className={styles.sectionTitle}>{copy.cloud.title}</h2>
            <p className={styles.sectionDescription}>
              {copy.cloud.description}
            </p>
            <div className={styles.cloudCardStack}>
              {copy.cloud.cards.map(card => (
                <article key={card.title} className={styles.cloudCard}>
                  <h3 className={styles.cloudTitle}>{card.title}</h3>
                  <p className={styles.cloudText}>{card.text}</p>
                </article>
              ))}
            </div>
            <div className={styles.cloudQuotaNote}>
              <strong>{copy.cloud.quota.title}</strong>
              <span>{copy.cloud.quota.text}</span>
            </div>
            <div className={styles.inlineActions}>
              <Link to="/cloud" className={styles.primaryLink}>
                {copy.cloud.primary}
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
        <div className={styles.stepWatermark} aria-hidden="true">
          {cliEyebrow.number}
        </div>
        <div className={styles.container}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowNumber}>{cliEyebrow.number}</span>
              <span className={styles.eyebrowLabel}>{cliEyebrow.label}</span>
            </span>
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

      {/* <HomepageGuiEntry /> */}

      {/* ── CTA ── */}
      <SiteCta
        title={copy.cta.title}
        description={copy.cta.description}
        actions={
          <>
            <Button asChild size="lg" className={siteCtaStyles.actionButton}>
              <Link to="/cli">{copy.cta.primary}</Link>
            </Button>
            <Button
              asChild
              variant="contrast"
              size="lg"
              className={siteCtaStyles.actionButton}
            >
              <Link to="/studio">{copy.cta.secondary}</Link>
            </Button>
          </>
        }
      />
    </div>
  );
}
