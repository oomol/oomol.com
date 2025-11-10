import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import FirstSceneCard from "./FirstSceneCard";
import clsx from "clsx";
import { HeroVideoDialog } from "../magic-ui/HeroVideoDialog";

type ScenesDataType = {
  imageUrl: string;
  videoSrc: string;
  title: string;
  inner: string;
  icon: string;
  zhCNVideoSrc?: string;
};

type SceneCardProps = {
  data: ScenesDataType;
  isFirst: boolean;
};

const scenesData: ScenesDataType[] = [
  {
    imageUrl: "/img/scenes/chat.svg",
    videoSrc: "https://www.youtube.com/embed/rAf3ADe4Tbw?si=rTphzk-C-N69q0ex",
    title: translate({ message: "HOME.Scenes.gpu-sharing.title" }),
    inner: translate({ message: "HOME.Scenes.gpu-sharing.inner" }),
    icon: "i-codicon-server-process",
    zhCNVideoSrc: "https://static.oomol.com/assets/ffmpeg.webm",
  },
  {
    imageUrl: "/img/scenes/magic.svg",
    videoSrc: "https://www.youtube.com/embed/AfD1fSwqihs?si=frfwFW9hSrIg4OQK",
    title: translate({ message: "HOME.Scenes.mcp-server.title" }),
    inner: translate({ message: "HOME.Scenes.mcp-server.inner" }),
    icon: "i-codicon-plug",
    zhCNVideoSrc: "https://static.oomol.com/assets/ai-image.webm",
  },
  {
    imageUrl: "/img/scenes/data.svg",
    videoSrc: "https://www.youtube.com/embed/EnpC6dMbiSE?si=OK16pulRymGoo8JV",
    title: translate({ message: "HOME.Scenes.data-api.title" }),
    inner: translate({ message: "HOME.Scenes.data-api.inner" }),
    icon: "i-codicon-graph",
    zhCNVideoSrc: "https://static.oomol.com/assets/chart.webm",
  },
  {
    imageUrl: "/img/scenes/magic.svg",
    videoSrc: "https://www.youtube.com/embed/jKuKNyFmwNo?si=pOeN1pVa7JUreBGk",
    title: translate({ message: "HOME.Scenes.ai-image-service.title" }),
    inner: translate({ message: "HOME.Scenes.ai-image-service.inner" }),
    icon: "i-codicon-file-media",
    zhCNVideoSrc: "https://static.oomol.com/assets/epub.webm",
  },

  {
    imageUrl: "/img/scenes/pdf.svg",
    videoSrc: "https://www.youtube.com/embed/mBhZo2SFwk0?si=8PRMDtyw49dCwGI-",
    title: translate({ message: "HOME.Scenes.iot-control.title" }),
    inner: translate({ message: "HOME.Scenes.iot-control.inner" }),
    icon: "i-codicon-radio-tower",
    zhCNVideoSrc: "https://static.oomol.com/assets/pdf.webm",
  },
  {
    imageUrl: "/img/scenes/chat.svg",
    videoSrc: "https://www.youtube.com/embed/gm3TKG89PPs?si=VHhmU9zk3Ol51meX",
    title: translate({ message: "HOME.Scenes.agent-toolchain.title" }),
    inner: translate({ message: "HOME.Scenes.agent-toolchain.inner" }),
    icon: "i-codicon-robot",
    zhCNVideoSrc: "https://static.oomol.com/assets/zip.webm",
  },
];

const SceneCard: React.FC<SceneCardProps> = ({ data, isFirst }) => {
  return (
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
            zhCNVideoSrc={data.zhCNVideoSrc}
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
};

export default function HomepageScenes() {
  const firstSceneData = scenesData[0];
  const restScenesData = scenesData.slice(1);

  const restScenesNodes = useMemo(
    () =>
      restScenesData.map((data, index) => (
        <SceneCard key={index + 1} data={data} isFirst={false} />
      )),
    [restScenesData]
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
