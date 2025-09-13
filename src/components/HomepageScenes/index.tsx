import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import LinkBtn from "../Button/LinkBtn";
import FirstSceneCard from "./FirstSceneCard";
import clsx from "clsx";
import { HeroVideoDialog } from "../magic-ui/HeroVideoDialog";

type ScenesDataType = {
  imageUrl: string;
  videoSrc: string;
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
    videoSrc: "https://www.youtube.com/embed/L3fYYybKWJE?si=gJ-r2pDJDdUtR_IM",
    title: translate({ message: "HOME.Scenes.data-science.title" }),
    inner: translate({ message: "HOME.Scenes.data-science.inner" }),
    icon: "i-codicon-device-camera-video",
  },
  {
    imageUrl: "/img/scenes/magic.png",
    videoSrc: "https://www.youtube.com/embed/L3fYYybKWJE?si=gJ-r2pDJDdUtR_IM",
    title: translate({ message: "HOME.Scenes.ai-image-edit.title" }),
    inner: translate({ message: "HOME.Scenes.ai-image-edit.inner" }),
    icon: "i-codicon-file-media",
  },
  {
    imageUrl: "/img/scenes/zip.png",
    videoSrc: "https://www.youtube.com/embed/L3fYYybKWJE?si=gJ-r2pDJDdUtR_IM",
    title: translate({ message: "HOME.Scenes.zip-archive-manipulation.title" }),
    inner: translate({ message: "HOME.Scenes.zip-archive-manipulation.inner" }),
    icon: "i-codicon-file-zip",
  },
  {
    imageUrl: "/img/scenes/epub.png",
    videoSrc: "https://www.youtube.com/embed/L3fYYybKWJE?si=gJ-r2pDJDdUtR_IM",
    title: translate({ message: "HOME.Scenes.txt-to-epub.title" }),
    inner: translate({ message: "HOME.Scenes.txt-to-epub.inner" }),
    icon: "i-codicon-unmute",
  },

  {
    imageUrl: "/img/scenes/download.png",
    videoSrc: "https://www.youtube.com/embed/L3fYYybKWJE?si=gJ-r2pDJDdUtR_IM",
    title: translate({ message: "HOME.Scenes.video-downloader.title" }),
    inner: translate({ message: "HOME.Scenes.video-downloader.inner" }),
    icon: "i-codicon-gear",
  },
  {
    imageUrl: "/img/scenes/data.png",
    videoSrc: "https://www.youtube.com/embed/L3fYYybKWJE?si=gJ-r2pDJDdUtR_IM",
    title: translate({ message: "HOME.Scenes.data-analysis.title" }),
    inner: translate({ message: "HOME.Scenes.data-analysis.inner" }),
    icon: "i-codicon-graph",
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
        <HeroVideoDialog
          className={styles.scenesCardImage}
          animationStyle="from-center"
          videoSrc={data.videoSrc}
          thumbnailSrc={useBaseUrl(data.imageUrl)}
          thumbnailAlt={data.title}
          showPlayButtonOnHover={true}
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
