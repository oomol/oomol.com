import styles from "@site/src/components/HomepageFirstScreen/styles.module.scss";

import useBaseUrl from "@docusaurus/useBaseUrl";
import { HeroVideoDialog } from "@site/src/components/ui/hero-video-dialog";
import React from "react";

/**
 * Original homepage hero video block — kept for reuse / future layouts.
 * Not mounted on the default homepage after the Magic UI–style refresh.
 */
export function HomepageFirstScreenVideoHero() {
  const heroVideoUrl = useBaseUrl(
    "https://static.oomol.com/assets/homepage/oomol-flow-en.webm"
  );
  const heroVideoPosterUrl = useBaseUrl(
    "/img/pages/home/homepage-first-screen-workflow-poster.webp"
  );

  return (
    <div id="workflow-video" className={styles.videoShowcase}>
      <div className={styles.videoShowcaseInner}>
        <HeroVideoDialog
          videoSrc={heroVideoUrl}
          thumbnailSrc={heroVideoPosterUrl}
          thumbnailAlt="OOMOL homepage workflow demo"
          title="OOMOL homepage workflow demo"
        />
      </div>
    </div>
  );
}
