import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import clsx from "clsx";

type ScenesDataType = {
  imageUrl: string;
  title: string;
  inner: string;
  icon: string;
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

export default FirstSceneCard;
