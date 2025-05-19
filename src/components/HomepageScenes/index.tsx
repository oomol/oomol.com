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
  tag: string;
  color: string;
  inner: string;
  icon: string;
};

const scenesData: ScenesDataType[] = [
  {
    imageUrl: "/img/cases-1.png",
    title: translate({ message: "HOME.Scenes.data-science.title" }),
    type: "purple",
    tag: translate({ message: "HOME.Scenes.data-science.tag" }),
    color: "blue",
    inner: translate({ message: "HOME.Scenes.data-science.inner" }),
    icon: "i-codicon-graph-line",
  },
  {
    imageUrl: "/img/cases-2.png",
    title: translate({ message: "HOME.Scenes.media-processing.title" }),
    type: "purple",
    tag: translate({ message: "HOME.Scenes.media-processing.tag" }),
    color: "green",
    inner: translate({ message: "HOME.Scenes.media-processing.inner" }),
    icon: "i-codicon-device-camera-video",
  },
];

export default function HomepageScenes() {
  const scenesNodes = scenesData.map((data, index) => {
    return (
      <BlurFade key={`scenes-${index}`}>
        <div className={styles.sectionCell}>
          <div className={styles.scenesText}>
            <span className={styles.scenesTag}>{data.tag}</span>
            <div className={styles.scenesTextTitle}>
              <i className={data.icon} />
              {data.title}
            </div>
            <p className={styles.scenesTextInner}>{data.inner}</p>
          </div>
          <Image
            className={styles.scenesImage}
            sources={{
              light: useBaseUrl(data.imageUrl),
              dark: useBaseUrl(data.imageUrl),
            }}
          />
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
        <div className={styles.sectionInner}>{scenesNodes}</div>
      </div>
    </div>
  );
}
