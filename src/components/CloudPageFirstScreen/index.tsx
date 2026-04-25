import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Button } from "@site/src/components/ui/button";
import React from "react";

export default function CloudPageFirstScreen() {
  const copy = {
    slogan: translate({ message: "CLOUD.first.slogan" }),
    overview: translate({ message: "CLOUD.first.overview" }),
    primaryCta: translate({ message: "CLOUD.first.cta.primary" }),
    secondaryCta: translate({ message: "CLOUD.first.cta.secondary" }),
    videoTitle: translate({ message: "CLOUD.first.video.title" }),
  };
  const heroVideoPosterUrl = useBaseUrl("/img/pages/studio/cloud-cover.png");

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleGroup}>
          <h1 className={styles.slogan}>{copy.slogan}</h1>
          <p className={styles.overview}>{copy.overview}</p>
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
          <img
            className={styles.showcaseImage}
            src={heroVideoPosterUrl}
            alt={copy.videoTitle}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
