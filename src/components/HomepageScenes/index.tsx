import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import LinkBtn from "../Button/LinkBtn";
import FirstSceneCard from "./FirstSceneCard";
import clsx from "clsx";

type ScenesDataType = {
  imageUrl: string;
  title: string;
  inner: string;
  icon: string;
};

type SceneCardProps = {
  data: ScenesDataType;
  isFirst: boolean;
};

const scenesData: ScenesDataType[] = [
  {
    imageUrl: "/img/scenes/chat.png",
    title: translate({ message: "HOME.Scenes.data-science.title" }),
    inner: translate({ message: "HOME.Scenes.data-science.inner" }),
    icon: "i-codicon-device-camera-video",
  },
  {
    imageUrl: "/img/scenes/magic.png",
    title: translate({ message: "HOME.Scenes.media-processing.title" }),
    inner: translate({ message: "HOME.Scenes.media-processing.inner" }),
    icon: "i-codicon-file-media",
  },
  {
    imageUrl: "/img/scenes/zip.png",
    title: translate({ message: "HOME.Scenes.text-processing.title" }),
    inner: translate({ message: "HOME.Scenes.text-processing.inner" }),
    icon: "i-codicon-file-text",
  },
  {
    imageUrl: "/img/scenes/epub.png",
    title: translate({ message: "HOME.Scenes.audio-processing.title" }),
    inner: translate({ message: "HOME.Scenes.audio-processing.inner" }),
    icon: "i-codicon-unmute",
  },
  {
    imageUrl: "/img/scenes/download.png",
    title: translate({ message: "HOME.Scenes.data-analysis.title" }),
    inner: translate({ message: "HOME.Scenes.data-analysis.inner" }),
    icon: "i-codicon-graph",
  },
  {
    imageUrl: "/img/scenes/data.png",
    title: translate({ message: "HOME.Scenes.automation.title" }),
    inner: translate({ message: "HOME.Scenes.automation.inner" }),
    icon: "i-codicon-gear",
  },
];

const SceneCard: React.FC<SceneCardProps> = ({ data, isFirst }) => (
  <div
    className={clsx(styles.gridItem, {
      [styles.gridFirstItem]: isFirst,
    })}
  >
    <div className={styles.scenesCard}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.scenesCardImage}
          sources={{
            light: useBaseUrl(data.imageUrl),
            dark: useBaseUrl(data.imageUrl),
          }}
        />
      </div>

      <div className={styles.scenesCardContent}>
        <div className={styles.scenesTextTitle}>
          <i className={data.icon} />
          {data.title}
        </div>
        <p className={styles.scenesTextInner}>{data.inner}</p>
      </div>
    </div>
  </div>
);

export default function HomepageScenes() {
  const firstSceneData = scenesData[0];
  const restScenesData = scenesData.slice(1);

  const restScenesNodes = useMemo(
    () =>
      restScenesData.map((data, index) => (
        <SceneCard key={index + 1} data={data} isFirst={false} />
      )),
    []
  );
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
          <FirstSceneCard data={firstSceneData} />
          {restScenesNodes}
        </div>
      </div>
    </div>
  );
}
