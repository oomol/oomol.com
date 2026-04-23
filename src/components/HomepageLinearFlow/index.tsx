import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageGuiEntry from "@site/src/components/HomepageGuiEntry";
import { SiteCta } from "@site/src/components/SiteCta";
import { Button } from "@site/src/components/ui/button";
import { clsx } from "clsx";
import React, { useEffect, useRef } from "react";

const homepageMediaUrls = {
  cli: "https://static.oomol.com/assets/homepage/oomol-oo-cli-en.webm",
  studio:
    "https://static.oomol.com/assets/homepage/OOMOL-Studio-gen-use-skils-en.webm",
} as const;

type Copy = {
  cli: {
    eyebrow: string;
    title: string;
    description: string;
    media: { title: string; note: string };
    guide: string;
    github: string;
  };
  studio: {
    eyebrow: string;
    title: string;
    description: string;
    media: { title: string; note: string };
    primary: string;
    secondary: string;
  };
  cloud: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{ title: string; text: string }>;
    quota: { title: string; text: string };
    media: { title: string; note: string };
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
  note: string;
  src: string;
};

type ImageCardProps = {
  title: string;
  note: string;
  src: string;
};

function VideoCard({ title, note, src }: VideoCardProps) {
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
      <div className={styles.videoCardMeta}>
        <h3 className={styles.videoCardTitle}>{title}</h3>
        <p className={styles.videoCardNote}>{note}</p>
      </div>
    </div>
  );
}

function ImageCard({ title, note, src }: ImageCardProps) {
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
      <div className={styles.videoCardMeta}>
        <h3 className={styles.videoCardTitle}>{title}</h3>
        <p className={styles.videoCardNote}>{note}</p>
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
      ? "/img/pages/home/cloud-console-zh.webp"
      : "/img/pages/home/cloud-console-en.webp"
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
        note: translate({
          id: "HOME.LinearFlow.cli.media.note",
          message:
            "Shows a delivered tool being searched, inspected, and called in Codex.",
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
        note: translate({
          id: "HOME.LinearFlow.studio.media.note",
          message:
            "Show the path from prompting to generating a tool and validating it locally.",
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
        message: "02 / Deliver through Cloud",
      }),
      title: translate({
        id: "HOME.LinearFlow.cloud.title",
        message:
          "Once validation is done, let Cloud handle delivery and runtime",
      }),
      description: translate({
        id: "HOME.LinearFlow.cloud.description",
        message:
          "Cloud takes over runtime, configuration, secrets, access, and delivery so you do not need to build another backend around the same implementation.",
      }),
      cards: [
        {
          title: translate({
            id: "HOME.LinearFlow.cloud.card1.title",
            message: "Handle delivery and hosted runtime in one place",
          }),
          text: translate({
            id: "HOME.LinearFlow.cloud.card1.text",
            message:
              "Keep the same implementation as you deliver the tool to yourself, your team, or customers.",
          }),
        },
        {
          title: translate({
            id: "HOME.LinearFlow.cloud.card2.title",
            message: "Keep config, access, and usage in one backend",
          }),
          text: translate({
            id: "HOME.LinearFlow.cloud.card2.text",
            message:
              "Manage secrets, access, releases, runtime settings, and usage data in one place.",
          }),
        },
      ],
      quota: {
        title: translate({
          id: "HOME.LinearFlow.cloud.quota.title",
          message: "Start delivery with included usage",
        }),
        text: translate({
          id: "HOME.LinearFlow.cloud.quota.text",
          message:
            "Free users get 200 Cloud Task minutes refreshed every month, so first delivery does not require buying servers or reserving capacity.",
        }),
      },
      media: {
        title: translate({
          id: "HOME.LinearFlow.cloud.media.title",
          message: "Cloud console preview",
        }),
        note: translate({
          id: "HOME.LinearFlow.cloud.media.note",
          message:
            "Bring runtime settings, secrets, and delivery into one backend.",
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
        <div className={styles.container}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowNumber}>
                {studioEyebrow.number}
              </span>
              <span className={styles.eyebrowLabel}>{studioEyebrow.label}</span>
            </span>
            <h2 className={styles.sectionTitle}>{copy.studio.title}</h2>
            <p className={styles.sectionDescription}>
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

          <div className={styles.mediaPanel}>
            <VideoCard
              title={copy.studio.media.title}
              note={copy.studio.media.note}
              src={homepageMediaUrls.studio}
            />
          </div>
        </div>
      </section>

      {/* ── Section: Cloud ── */}
      <section className={clsx(styles.section, styles.cloudSection)}>
        <div className={styles.stepWatermark} aria-hidden="true">
          {cloudEyebrow.number}
        </div>
        <div className={styles.container}>
          <div className={styles.copyPanel}>
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

          <div className={styles.mediaPanel}>
            <ImageCard
              title={copy.cloud.media.title}
              note={copy.cloud.media.note}
              src={cloudConsoleImage}
            />
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
              note={copy.cli.media.note}
              src={homepageMediaUrls.cli}
            />
          </div>
        </div>
      </section>

      <HomepageGuiEntry />

      {/* ── CTA ── */}
      <SiteCta
        title={copy.cta.title}
        description={copy.cta.description}
        actions={
          <>
            <Button asChild size="lg">
              <Link to="/cli">{copy.cta.primary}</Link>
            </Button>
            <Button asChild variant="contrast" size="lg">
              <Link to="/studio">{copy.cta.secondary}</Link>
            </Button>
          </>
        }
      />
    </div>
  );
}
