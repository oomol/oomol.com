import styles from "../HomepageFirstScreen/styles.module.scss";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { HeroVideoDialog } from "@site/src/components/ui/hero-video-dialog";
import React from "react";

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
          thumbnailAlt={translate({
            message: "HOME.FirstScreen.video.thumbnailAlt",
          })}
          title={translate({ message: "HOME.FirstScreen.video.title" })}
        />
      </div>
    </div>
  );
}
