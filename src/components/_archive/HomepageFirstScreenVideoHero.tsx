import styles from "@site/src/components/HomepageFirstScreen/styles.module.scss";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import React, { useRef, useState } from "react";

/**
 * Original homepage hero video block — kept for reuse / future layouts.
 * Not mounted on the default homepage after the Magic UI–style refresh.
 */
export function HomepageFirstScreenVideoHero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroVideoUrl = useBaseUrl(
    "https://static.oomol.com/assets/homepage/oomol-flow-en.webm"
  );
  const heroVideoPosterUrl = useBaseUrl(
    "/img/pages/home/homepage-first-screen-workflow-poster.webp"
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
    <div id="workflow-video" className={styles.videoShowcase}>
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
            preload="none"
            onPlay={() => setIsPlaying(true)}
            onPause={() => {
              if (videoRef.current && videoRef.current.currentTime === 0) {
                setIsPlaying(false);
              }
            }}
            onEnded={() => setIsPlaying(false)}
          >
            <source src={heroVideoUrl} type="video/webm" />
          </video>
        </div>
      </div>
    </div>
  );
}
