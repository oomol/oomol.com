import styles from "../HomepageFirstScreen/styles.module.scss";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { HomepageConnectionBeam } from "@site/src/components/HomepageConnectionBeam";
import { HeroVideoDialog } from "@site/src/components/ui/hero-video-dialog";
import React from "react";

type HomepageFirstScreenVideoDialogProps = {
  className?: string;
  trigger: React.ReactNode;
};

function useHomepageVideoDialogProps() {
  const codexVideoUrl = useBaseUrl("/video/home/homepage-hero-codex.mp4");
  const openClawVideoUrl = useBaseUrl("/video/home/homepage-hero-openclaw.mp4");
  const claudeVideoUrl = useBaseUrl("/video/home/homepage-hero-claude.mp4");
  const heroVideoPosterUrl = useBaseUrl(
    "/img/pages/home/homepage-first-screen-hero-video-poster.png"
  );

  return {
    videoPlaylist: [
      {
        src: codexVideoUrl,
        label: "Codex",
        title: "Codex demo video",
        transitionTitle: "Using Codex",
      },
      {
        src: openClawVideoUrl,
        label: "OpenClaw",
        title: "OpenClaw demo video",
        transitionTitle: "Using OpenClaw",
      },
      {
        src: claudeVideoUrl,
        label: "Claude Code",
        title: "Claude Code demo video",
        transitionTitle: "Using Claude Code",
      },
    ],
    mediaAspectRatio: "3424 / 2160",
    playlistEndingTitle: "Works In Any Agent",
    thumbnailSrc: heroVideoPosterUrl,
    thumbnailAlt: translate({
      message: "HOME.FirstScreen.video.thumbnailAlt",
    }),
    title: translate({ message: "HOME.FirstScreen.video.title" }),
  };
}

export function HomepageFirstScreenVideoDialog({
  className,
  trigger,
}: HomepageFirstScreenVideoDialogProps) {
  const videoDialogProps = useHomepageVideoDialogProps();

  return (
    <HeroVideoDialog
      {...videoDialogProps}
      className={className}
      trigger={trigger}
    />
  );
}

export function HomepageFirstScreenVideoHero() {
  return (
    <div id="workflow-video" className={styles.videoShowcase}>
      <div className={styles.videoShowcaseInner}>
        <HomepageConnectionBeam className={styles.heroConnectionBeam} />
      </div>
    </div>
  );
}
