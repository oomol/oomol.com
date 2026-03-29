import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import React, { useRef, useState } from "react";

import { DownloadButton } from "../DownloadButton";

export default function HomepageFirstScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroVideoUrl = useBaseUrl(
    "/img/docs/cn/get-started/zero-to-one/merge-into-a-reusable-block-light.mp4"
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
          <p className={styles.ownershipNote}>
            <span>
              {translate({
                message: "HOME.FirstScreen.heroAdvantage",
              })}
            </span>
            <strong className={styles.ownershipHighlight}>
              {translate({
                message: "HOME.FirstScreen.heroAdvantageHighlight",
              })}
            </strong>
          </p>
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
            <DownloadButton centered />
            <Link to="/docs/cloud-services/cli" className={styles.secondaryCta}>
              {translate({
                message: "HOME.FirstScreen.cta.secondary",
              })}
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.videoShowcase}>
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
