import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useColorMode } from "@docusaurus/theme-common";
import React from "react";

// 核心功能数据
const coreFeatures = [
  {
    id: "workflow",
    title: translate({ message: "HOME.CoreFeatures.workflow.title" }),
    description: translate({ message: "HOME.CoreFeatures.workflow.description" }),
    highlight: translate({ message: "HOME.CoreFeatures.workflow.highlight1" }),
    mediaType: "video" as const,
    mediaSrc: "/videos/workflow-demo.mp4",
    mediaAlt: "Workflow IDE Demo",
  },
  {
    id: "container",
    title: translate({ message: "HOME.CoreFeatures.container.title" }),
    description: translate({ message: "HOME.CoreFeatures.container.description" }),
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

// Feature Item Component
function FeatureItem({ feature, index }: { feature: typeof coreFeatures[0], index: number }) {
  const { colorMode } = useColorMode();

  // Always call hooks unconditionally
  const videoSrc = feature.mediaSrc || '';
  const imageSrcLight = feature.mediaSrc ? `${feature.mediaSrc}-light.png` : '';
  const imageSrcDark = feature.mediaSrc ? `${feature.mediaSrc}-dark.png` : '';

  const videoUrl = useBaseUrl(videoSrc);
  const imageUrlLight = useBaseUrl(imageSrcLight);
  const imageUrlDark = useBaseUrl(imageSrcDark);

  // Determine which URL to use based on media type and color mode
  const imageUrl = colorMode === "dark" ? imageUrlDark : imageUrlLight;

  return (
    <div
      className={`${styles.featureItem} ${index % 2 === 1 ? styles.reverse : ''}`}
    >
      {/* Text Content */}
      <div className={styles.featureContent}>
        <h3 className={styles.featureTitle}>{feature.title}</h3>
        <div className={styles.featureDescription}>
          {feature.description.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < feature.description.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        <div className={styles.featureHighlight}>
          <span className={styles.highlightIcon}>✨</span>
          <span className={styles.highlightText}>{feature.highlight}</span>
        </div>
      </div>

      {/* Media Content */}
      <div className={styles.featureMedia}>
        {feature.mediaType === "video" ? (
          <video
            className={styles.mediaVideo}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : feature.mediaType === "image" ? (
          <img
            src={imageUrl}
            alt={feature.mediaAlt}
            className={styles.mediaImage}
          />
        ) : feature.mediaType === "empty" ? (
          <div className={styles.mediaImage}></div>
        ) : null}
      </div>
    </div>
  );
}

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
