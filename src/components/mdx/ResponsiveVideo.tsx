import type { ComponentProps, CSSProperties } from "react";

import useBaseUrl from "@docusaurus/useBaseUrl";
import React, { useEffect, useMemo, useRef, useState } from "react";

export interface ResponsiveVideoProps
  extends Omit<ComponentProps<"video">, "poster" | "src"> {
  src: string;
  type?: string;
  poster?: string;
  style?: CSSProperties;
  loadRootMargin?: string;
  loadWhenInView?: boolean;
}

export default function ResponsiveVideo({
  autoPlay,
  controls,
  loadRootMargin = "320px 0px",
  loadWhenInView = true,
  muted,
  playsInline,
  preload,
  src,
  type,
  poster,
  style,
  ...properties
}: ResponsiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const resolvedSrc = useBaseUrl(src);
  const resolvedPoster = poster ? useBaseUrl(poster) : undefined;
  const [shouldLoad, setShouldLoad] = useState(!loadWhenInView);

  useEffect(() => {
    setShouldLoad(!loadWhenInView);
  }, [loadWhenInView, resolvedSrc]);

  useEffect(() => {
    if (!loadWhenInView) {
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          return;
        }

        setShouldLoad(true);
        observer.disconnect();
      },
      {
        rootMargin: loadRootMargin,
        threshold: 0.01,
      }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [loadRootMargin, loadWhenInView, resolvedSrc]);

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.load();

    if (!autoPlay) {
      return;
    }

    void video.play().catch(() => {});
  }, [autoPlay, shouldLoad]);

  const effectivePreload = useMemo(() => {
    if (!shouldLoad) {
      return "none";
    }

    return preload ?? "metadata";
  }, [preload, shouldLoad]);

  return (
    <video
      {...properties}
      autoPlay={autoPlay}
      controls={controls}
      muted={muted}
      playsInline={playsInline}
      preload={effectivePreload}
      ref={videoRef}
      poster={resolvedPoster}
      style={{
        width: "100%",
        borderRadius: "var(--oomol-radius-2xl)",
        background: "var(--oomol-chrome-void)",
        ...style,
      }}
    >
      {shouldLoad ? (
        type ? (
          <source src={resolvedSrc} type={type} />
        ) : (
          <source src={resolvedSrc} />
        )
      ) : null}
    </video>
  );
}
