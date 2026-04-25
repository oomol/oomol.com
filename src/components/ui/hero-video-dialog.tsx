import styles from "./hero-video-dialog.module.scss";

import { translate } from "@docusaurus/Translate";
import * as Dialog from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import React from "react";

type AnimationStyle = "from-center";

type HeroVideoDialogProps = {
  className?: string;
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  thumbnailAspectRatio?: React.CSSProperties["aspectRatio"];
  thumbnailObjectPosition?: React.CSSProperties["objectPosition"];
  title?: string;
  playAriaLabel?: string;
  closeAriaLabel?: string;
};

const DIRECT_VIDEO_RE = /\.(mp4|webm|ogg|mov|m4v)(?:[?#].*)?$/i;
const ANIMATION_STYLE_CLASS_MAP: Record<AnimationStyle, string> = {
  "from-center": styles.fromCenter,
};

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function withAutoplay(src: string) {
  if (DIRECT_VIDEO_RE.test(src)) {
    return src;
  }

  try {
    const url = new URL(src);
    if (!url.searchParams.has("autoplay")) {
      url.searchParams.set("autoplay", "1");
    }
    return url.toString();
  } catch {
    return src.includes("?") ? `${src}&autoplay=1` : `${src}?autoplay=1`;
  }
}

export function HeroVideoDialog({
  className,
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  thumbnailAspectRatio,
  thumbnailObjectPosition,
  title,
  playAriaLabel,
  closeAriaLabel,
}: HeroVideoDialogProps) {
  const resolvedTitle = title ?? thumbnailAlt;
  const resolvedPlayLabel =
    playAriaLabel ??
    translate({
      id: "HOME.FirstScreen.video.playAriaLabel",
      message: "Play demo video",
    });
  const resolvedCloseLabel =
    closeAriaLabel ??
    translate({
      id: "HOME.FirstScreen.video.closeAriaLabel",
      message: "Close video dialog",
    });
  const resolvedVideoSrc = withAutoplay(videoSrc);
  const isDirectVideo = DIRECT_VIDEO_RE.test(videoSrc);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={clsx(styles.trigger, className)}
          aria-label={resolvedPlayLabel}
        >
          <div className={styles.thumbnailFrame}>
            <img
              src={thumbnailSrc}
              alt={thumbnailAlt}
              className={styles.thumbnail}
              style={{
                aspectRatio: thumbnailAspectRatio,
                objectPosition: thumbnailObjectPosition,
              }}
              loading="lazy"
              decoding="async"
            />
            <span className={styles.playOverlay} aria-hidden="true">
              <span className={styles.playButton}>
                <span className={styles.playTriangle} />
              </span>
            </span>
          </div>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={clsx(
            styles.content,
            ANIMATION_STYLE_CLASS_MAP[animationStyle]
          )}
        >
          <Dialog.Title className={styles.srOnly}>{resolvedTitle}</Dialog.Title>
          <Dialog.Close asChild>
            <button
              type="button"
              className={styles.close}
              aria-label={resolvedCloseLabel}
            >
              <CloseIcon />
            </button>
          </Dialog.Close>

          {isDirectVideo ? (
            <video
              className={styles.media}
              src={resolvedVideoSrc}
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
          ) : (
            <iframe
              className={styles.media}
              src={resolvedVideoSrc}
              title={resolvedTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
