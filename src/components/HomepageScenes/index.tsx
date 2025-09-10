import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import { BlurFade } from "../magic-ui/BlurFade";

type ScenesDataType = {
  imageUrl: string;
  title: string;
  type: string;
  color: string;
  inner: string;
  icon: string;
};

const scenesData: ScenesDataType[] = [
  {
    imageUrl: "/img/cases-1.png",
    title: translate({ message: "HOME.Scenes.data-science.title" }),
    type: "purple",
    color: "blue",
    inner: translate({ message: "HOME.Scenes.data-science.inner" }),
    icon: "i-codicon-device-camera-video",
  },
  {
    imageUrl: "/img/cases-2.png",
    title: translate({ message: "HOME.Scenes.media-processing.title" }),
    type: "purple",
    color: "green",
    inner: translate({ message: "HOME.Scenes.media-processing.inner" }),
    icon: "i-codicon-file-media",
  },
  {
    imageUrl: "/img/scenes/text-processing.svg",
    title: translate({ message: "HOME.Scenes.text-processing.title" }),
    type: "purple",
    color: "purple",
    inner: translate({ message: "HOME.Scenes.text-processing.inner" }),
    icon: "i-codicon-file-text",
  },
  {
    imageUrl: "/img/scenes/audio-processing.svg",
    title: translate({ message: "HOME.Scenes.audio-processing.title" }),
    type: "purple",
    color: "teal",
    inner: translate({ message: "HOME.Scenes.audio-processing.inner" }),
    icon: "i-codicon-unmute",
  },
  {
    imageUrl: "/img/scenes/data-analysis.svg",
    title: translate({ message: "HOME.Scenes.data-analysis.title" }),
    type: "purple",
    color: "pink",
    inner: translate({ message: "HOME.Scenes.data-analysis.inner" }),
    icon: "i-codicon-graph",
  },
  {
    imageUrl: "/img/scenes/automation.svg",
    title: translate({ message: "HOME.Scenes.automation.title" }),
    type: "purple",
    color: "cyan",
    inner: translate({ message: "HOME.Scenes.automation.inner" }),
    icon: "i-codicon-gear",
  },
  {
    imageUrl: "/img/scenes/web-scraping.svg",
    title: translate({ message: "HOME.Scenes.web-scraping.title" }),
    type: "purple",
    color: "orange",
    inner: translate({ message: "HOME.Scenes.web-scraping.inner" }),
    icon: "i-codicon-globe",
  },
  {
    imageUrl: "/img/scenes/api-integration.svg",
    title: translate({ message: "HOME.Scenes.api-integration.title" }),
    type: "purple",
    color: "indigo",
    inner: translate({ message: "HOME.Scenes.api-integration.inner" }),
    icon: "i-codicon-plug",
  },
  {
    imageUrl: "/img/scenes/content-generation.svg",
    title: translate({ message: "HOME.Scenes.content-generation.title" }),
    type: "purple",
    color: "yellow",
    inner: translate({ message: "HOME.Scenes.content-generation.inner" }),
    icon: "i-codicon-wand",
  },
];

export default function HomepageScenes() {
  const scenesNodes = scenesData.map((data, index) => {
    return (
      <BlurFade key={`scenes-${index}`} delay={0.1 * index}>
        <div className={styles.gridItem}>
          <div className={styles.scenesCard}>
            <Image
              className={styles.scenesCardImage}
              sources={{
                light: useBaseUrl(data.imageUrl),
                dark: useBaseUrl(data.imageUrl),
              }}
            />
            <div className={styles.scenesCardContent}>

              <div className={styles.scenesTextTitle}>
                <i className={data.icon} />
                {data.title}
              </div>
              <p className={styles.scenesTextInner}>{data.inner}</p>
            </div>
          </div>
        </div>
      </BlurFade>
    );
  });
  return (
    <div className={styles.scenes}>
      <div className={styles["scenes-mid"]}>
        <div className={styles.sectionTitle}>
          {translate({
            message: "HOME.Scenes.title",
          })}
        </div>
        <span className={styles.sectionSubtitle}>
          {translate({
            message: "HOME.Scenes.subtitle",
          })}
        </span>
        <div className={styles.gridContainer}>
          {scenesNodes}
        </div>
      </div>
    </div>
  );
}
