import React from "react";
import styles from "./styles.module.scss";
import useBaseUrl from "@docusaurus/useBaseUrl";
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

type FirstSceneCardProps = {
  data: ScenesDataType;
};

const FirstSceneCard: React.FC<FirstSceneCardProps> = ({ data }) => (
  <div className={clsx(styles.gridItem, styles.gridFirstItem)}>
    <div className={styles.scenesCard}>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
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

export default FirstSceneCard;
