import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Button } from "@site/src/components/ui/button";
import { HeroVideoDialog } from "@site/src/components/ui/hero-video-dialog";
import React from "react";

export default function CloudPageFirstScreen() {
  const copy = {
    slogan: translate({ message: "CLOUD.first.slogan" }),
    overview: translate({ message: "CLOUD.first.overview" }),
    highlights: [
      translate({ message: "CLOUD.first.highlight1" }),
      translate({ message: "CLOUD.first.highlight2" }),
      translate({ message: "CLOUD.first.highlight3" }),
      translate({ message: "CLOUD.first.highlight4" }),
    ],
    primaryCta: translate({ message: "CLOUD.first.cta.primary" }),
    secondaryCta: translate({ message: "CLOUD.first.cta.secondary" }),
    playAriaLabel: translate({
      message: "CLOUD.first.video.playAriaLabel",
    }),
    videoTitle: translate({ message: "CLOUD.first.video.title" }),
  };
  const heroVideoUrl =
    "https://static.oomol.com/assets/homepage/oomol-flow-en.webm";
  const heroVideoPosterUrl = useBaseUrl(
    "/img/pages/home/homepage-first-screen-workflow-poster.webp"
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleGroup}>
          <h1 className={styles.slogan}>{copy.slogan}</h1>
          <p className={styles.overview}>{copy.overview}</p>
          <div className={styles.highlights}>
            {copy.highlights.map(item => (
              <span key={item} className={styles.highlightPill}>
                {item}
              </span>
            ))}
          </div>
          <div className={styles.actions}>
            <Button asChild size="lg" className={styles.primaryCta}>
              <Link to="/docs/cloud-services/cloud-function">
                {copy.primaryCta}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={styles.secondaryCta}
            >
              <a
                href="https://console.oomol.com/cloud-function"
                rel="noreferrer"
                target="_blank"
              >
                {copy.secondaryCta}
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.videoShowcase}>
        <div className={styles.videoShowcaseInner}>
          <HeroVideoDialog
            videoSrc={heroVideoUrl}
            thumbnailSrc={heroVideoPosterUrl}
            thumbnailAlt={copy.videoTitle}
            title={copy.videoTitle}
            playAriaLabel={copy.playAriaLabel}
          />
        </div>
      </div>
    </section>
  );
}
