import styles from "./hero-video-dialog.module.scss";

import { translate } from "@docusaurus/Translate";
import * as Dialog from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import React from "react";

type AnimationStyle = "from-center";

type HeroVideoPlaylistItem = {
  src: string;
  label?: string;
  title?: string;
  transitionTitle?: string;
};

type HeroVideoDialogProps = {
  className?: string;
  animationStyle?: AnimationStyle;
  videoSrc?: string;
  videoPlaylist?: HeroVideoPlaylistItem[];
  mediaAspectRatio?: React.CSSProperties["aspectRatio"];
  thumbnailSrc: string;
  thumbnailAlt?: string;
  thumbnailAspectRatio?: React.CSSProperties["aspectRatio"];
  thumbnailObjectPosition?: React.CSSProperties["objectPosition"];
  title?: string;
  playAriaLabel?: string;
  closeAriaLabel?: string;
  playlistEndingTitle?: string;
  transitionDurationMs?: number;
};

type PlaybackPhase = "transition" | "video" | "ending";

const DIRECT_VIDEO_RE = /\.(mp4|webm|ogg|mov|m4v)(?:[?#].*)?$/i;
const ANIMATION_STYLE_CLASS_MAP: Record<AnimationStyle, string> = {
  "from-center": styles.fromCenter,
};
const DEFAULT_TRANSITION_DURATION_MS = 1400;

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

function parseAspectRatio(
  aspectRatio?: React.CSSProperties["aspectRatio"]
): number | null {
  if (!aspectRatio) {
    return null;
  }

  if (typeof aspectRatio === "number") {
    return Number.isFinite(aspectRatio) && aspectRatio > 0 ? aspectRatio : null;
  }

  const normalized = aspectRatio.replace(/\s+/g, "");
  const [width, height] = normalized.split("/");

  if (!width || !height) {
    const value = Number(normalized);
    return Number.isFinite(value) && value > 0 ? value : null;
  }

  const widthValue = Number(width);
  const heightValue = Number(height);

  if (!Number.isFinite(widthValue) || !Number.isFinite(heightValue)) {
    return null;
  }

  if (widthValue <= 0 || heightValue <= 0) {
    return null;
  }

  return widthValue / heightValue;
}

export function HeroVideoDialog({
  className,
  animationStyle = "from-center",
  videoSrc,
  videoPlaylist,
  mediaAspectRatio,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  thumbnailAspectRatio,
  thumbnailObjectPosition,
  title,
  playAriaLabel,
  closeAriaLabel,
  playlistEndingTitle,
  transitionDurationMs = DEFAULT_TRANSITION_DURATION_MS,
}: HeroVideoDialogProps) {
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
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<PlaybackPhase>("video");
  const playlist =
    videoPlaylist && videoPlaylist.length > 0
      ? videoPlaylist
      : videoSrc
        ? [{ src: videoSrc, title }]
        : [];
  const activeVideo = playlist[activeIndex] ?? playlist[0];

  if (!activeVideo) {
    return null;
  }

  const resolvedTitle = activeVideo.title ?? title ?? thumbnailAlt;
  const resolvedVideoSrc = withAutoplay(activeVideo.src);
  const isDirectVideo = DIRECT_VIDEO_RE.test(activeVideo.src);
  const shouldUseInterludes =
    isDirectVideo && (playlist.length > 1 || Boolean(playlistEndingTitle));
  const interludeTitle = activeVideo.transitionTitle ?? activeVideo.title;
  const showInterlude =
    isDirectVideo && (phase === "transition" || phase === "ending");
  const interludeDisplayTitle =
    phase === "ending" ? playlistEndingTitle : interludeTitle;
  const resolvedMediaAspectRatio =
    mediaAspectRatio ?? (isDirectVideo ? "16 / 9" : undefined);
  const numericMediaAspectRatio = parseAspectRatio(resolvedMediaAspectRatio);
  const contentStyle =
    numericMediaAspectRatio && isDirectVideo
      ? ({
          width: `min(1520px, calc((100vh - 3rem) * ${numericMediaAspectRatio}), calc(100vw - 0.75rem))`,
          "--hero-media-aspect-ratio": String(resolvedMediaAspectRatio),
          "--hero-transition-duration": `${transitionDurationMs}ms`,
        } as React.CSSProperties)
      : ({
          "--hero-media-aspect-ratio": String(
            resolvedMediaAspectRatio ?? "16 / 9"
          ),
          "--hero-transition-duration": `${transitionDurationMs}ms`,
        } as React.CSSProperties);

  React.useEffect(() => {
    if (!open || phase !== "transition") {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase("video");
    }, transitionDurationMs);

    return () => window.clearTimeout(timeoutId);
  }, [open, phase, transitionDurationMs, activeIndex]);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setActiveIndex(0);
      setPhase("video");
      return;
    }
    setActiveIndex(0);
    setPhase(shouldUseInterludes ? "transition" : "video");
  }

  function handleVideoEnded() {
    if (activeIndex < playlist.length - 1) {
      setActiveIndex(activeIndex + 1);
      setPhase("transition");
      return;
    }

    if (playlistEndingTitle) {
      setPhase("ending");
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
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
          style={contentStyle}
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

          <div
            className={styles.mediaShell}
          >
            <div className={styles.mediaViewport}>
              {showInterlude && interludeDisplayTitle ? (
                <div
                  className={clsx(
                    styles.interludeFrame,
                    phase === "ending"
                      ? styles.interludeFrameEnding
                      : styles.interludeFrameTransition
                  )}
                  aria-hidden="true"
                >
                  <div
                    className={clsx(
                      styles.interludeBackdrop,
                      phase === "ending" && styles.interludeBackdropEnding
                    )}
                  />
                  <div className={styles.interludeGrid} />
                  <div
                    className={clsx(
                      styles.interludeContent,
                      phase === "ending" && styles.interludeContentEnding
                    )}
                  >
                    <p className={styles.interludeTitle}>
                      {interludeDisplayTitle}
                    </p>
                  </div>
                </div>
              ) : null}

              {isDirectVideo && phase === "video" ? (
                <video
                  key={resolvedVideoSrc}
                  className={clsx(styles.media, styles.videoMedia)}
                  src={resolvedVideoSrc}
                  autoPlay
                  playsInline
                  preload="metadata"
                  onEnded={shouldUseInterludes ? handleVideoEnded : undefined}
                />
              ) : (
                !isDirectVideo ? (
                  <iframe
                    className={clsx(styles.media, styles.iframeMedia)}
                    src={resolvedVideoSrc}
                    title={resolvedTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : null
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
