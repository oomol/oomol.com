import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Button } from "@site/src/components/ui/button";
import React, { useRef, useState } from "react";

export default function HomepageFirstScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroVideoUrl = useBaseUrl(
    "https://static.oomol.com/assets/homepage/oomol-flow-en.webm"
  );
  const heroVideoPosterUrl = useBaseUrl(
    "/img/pages/home/homepage-first-screen-workflow-poster.png"
  );

  const handlePlay = async () => {
    if (!videoRef.current) {
      return;
    }

    try {
      await videoRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div className={styles.titleGroup}>
          <h1 className={styles.slogan}>
            {translate({
              message: "HOME.FirstScreen.heroTitle",
            })}
          </h1>
          <p className={styles.overview}>
            {translate({
              message: "HOME.FirstScreen.heroLead",
            })}
          </p>
          <div className={styles.actions}>
            <Button asChild size="lg" className={styles.primaryCta}>
              <Link to="/docs/cloud-services/cli">
                {translate({
                  message: "HOME.FirstScreen.cta.primary",
                })}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={styles.secondaryCta}
            >
              <Link to="#hero-demo">
                {translate({
                  message: "HOME.FirstScreen.cta.secondary",
                })}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div id="hero-demo" className={styles.videoShowcase}>
        <div className={styles.videoShowcaseInner}>
          <div className={styles.videoFrame}>
            {!isPlaying && (
              <button
                type="button"
                className={styles.playOverlay}
                onClick={handlePlay}
                aria-label={translate({
                  message: "HOME.FirstScreen.video.playAriaLabel",
                })}
              >
                <span className={styles.playButton}>
                  <span className={styles.playTriangle} aria-hidden="true" />
                </span>
              </button>
            )}
            <video
              ref={videoRef}
              className={styles.heroVideo}
              controls={isPlaying}
              poster={heroVideoPosterUrl}
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => {
                if (videoRef.current && videoRef.current.currentTime === 0) {
                  setIsPlaying(false);
                }
              }}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={heroVideoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
