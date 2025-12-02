import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useColorMode } from "@docusaurus/theme-common";
import React, { useState, useEffect, useRef, memo } from "react";

// 核心功能数据
const coreFeatures = [
  {
    id: "workflow",
    title: translate({ message: "HOME.CoreFeatures.workflow.title" }),
    description: translate({
      message: "HOME.CoreFeatures.workflow.description",
    }),
    highlight: translate({ message: "HOME.CoreFeatures.workflow.highlight1" }),
    mediaType: "image" as const,
    mediaSrc: "/img/pages/home/core-feature-function",
    mediaAlt: "Workflow IDE Demo",
  },
  {
    id: "container",
    title: translate({ message: "HOME.CoreFeatures.container.title" }),
    description: translate({
      message: "HOME.CoreFeatures.container.description",
    }),
    highlight: translate({ message: "HOME.CoreFeatures.container.highlight1" }),
    mediaType: "empty" as const,
  },
  {
    id: "mcp",
    title: translate({ message: "HOME.CoreFeatures.mcp.title" }),
    description: translate({ message: "HOME.CoreFeatures.mcp.description" }),
    highlight: translate({ message: "HOME.CoreFeatures.mcp.highlight1" }),
    mediaType: "video" as const,
    mediaSrc: "/videos/mcp-demo.mp4",
    mediaAlt: "MCP Tool Generation Demo",
  },
  {
    id: "vscode",
    title: translate({ message: "HOME.CoreFeatures.vscode.title" }),
    description: translate({ message: "HOME.CoreFeatures.vscode.description" }),
    highlight: translate({ message: "HOME.CoreFeatures.vscode.highlight1" }),
    mediaType: "image" as const,
    mediaSrc: "/img/features/vscode",
    mediaAlt: "VSCode Development Demo",
  },
];

// Feature Item Component with lazy loading
const FeatureItem = memo(
  ({
    feature,
    index,
  }: {
    feature: (typeof coreFeatures)[0];
    index: number;
  }) => {
    const { colorMode } = useColorMode();
    const [isVisible, setIsVisible] = useState(false);
    const [shouldPlay, setShouldPlay] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

    // Always call hooks unconditionally
    const videoSrc = feature.mediaSrc || "";
    const imageSrcLight = feature.mediaSrc
      ? `${feature.mediaSrc}-light.png`
      : "";
    const imageSrcDark = feature.mediaSrc ? `${feature.mediaSrc}-dark.png` : "";

    const videoUrl = useBaseUrl(videoSrc);
    const imageUrlLight = useBaseUrl(imageSrcLight);
    const imageUrlDark = useBaseUrl(imageSrcDark);

    // Determine which URL to use based on media type and color mode
    const imageUrl = colorMode === "dark" ? imageUrlDark : imageUrlLight;

    // Intersection Observer for lazy loading
    useEffect(() => {
      const currentRef = itemRef.current;
      if (!currentRef) return;

      const observer = new window.IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              // Delay video playback slightly to improve performance
              setTimeout(() => setShouldPlay(true), 100);
            } else {
              // Pause video when out of view to save resources
              setShouldPlay(false);
            }
          });
        },
        {
          rootMargin: "50px", // Start loading slightly before element enters viewport
          threshold: 0.1,
        }
      );

      observer.observe(currentRef);

      return () => {
        observer.unobserve(currentRef);
      };
    }, []);

    return (
      <div
        ref={itemRef}
        className={`${styles.featureItem} ${index % 2 === 1 ? styles.reverse : ""}`}
      >
        {/* Text Content */}
        <div className={styles.featureContent}>
          <h3 className={styles.featureTitle}>{feature.title}</h3>
          <div className={styles.featureDescription}>
            {feature.description.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < feature.description.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
          <div className={styles.featureHighlight}>
            <span className={styles.highlightIcon}>✨</span>
            <span className={styles.highlightText}>{feature.highlight}</span>
          </div>
        </div>

        {/* Media Content - Lazy loaded */}
        <div className={styles.featureMedia}>
          {isVisible && feature.mediaType === "video" ? (
            <video
              className={styles.mediaVideo}
              autoPlay={shouldPlay}
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : isVisible && feature.mediaType === "image" ? (
            <img
              src={imageUrl}
              alt={feature.mediaAlt}
              className={styles.mediaImage}
              loading="lazy"
            />
          ) : feature.mediaType === "empty" ? (
            <div className={styles.mediaImage}></div>
          ) : (
            <div
              className={styles.mediaImage}
              style={{ minHeight: "300px" }}
            ></div>
          )}
        </div>
      </div>
    );
  }
);

FeatureItem.displayName = "FeatureItem";

export default function HomepageCoreFeatures() {
  return (
    <section className={styles.coreFeaturesSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {translate({ message: "HOME.CoreFeatures.title" })}
          </h2>
          <p className={styles.sectionSubtitle}>
            {translate({ message: "HOME.CoreFeatures.subtitle" })}
          </p>
        </div>

        {/* Features List */}
        <div className={styles.featuresList}>
          {coreFeatures.map((feature, index) => (
            <FeatureItem key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
