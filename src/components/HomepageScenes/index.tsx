import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";

type ScenesDataType = {
  imageUrl: string;
  title: string;
  type: string;
  tag: string;
  color: string;
  inner: string;
};

const scenesData: ScenesDataType[] = [
  {
    imageUrl: "/img/table.jpg",
    title: translate({ message: "HOME.Scenes.data-science.title" }),
    type: "purple",
    tag: translate({ message: "HOME.Scenes.data-science.tag" }),
    color: "blue",
    inner: translate({ message: "HOME.Scenes.data-science.inner" }),
  },
  {
    imageUrl: "/img/media.jpg",
    title: translate({ message: "HOME.Scenes.media-processing.title" }),
    type: "purple",
    tag: translate({ message: "HOME.Scenes.media-processing.tag" }),
    color: "green",
    inner: translate({ message: "HOME.Scenes.media-processing.inner" }),
  },
];

export default function HomepageScenes() {
  const scenesNodes = scenesData.map((data, index) => {
    return (
      <div className={styles.sectionCell} key={`scenes-${index}`}>
        <div className={styles.scenesText}>
          <div className={styles.scenesTextTitle}>
            {data.title}
            <span className={styles.scenesTag}>{data.tag}</span>
          </div>
          <div className={styles.scenesTextInner}>{data.inner}</div>
        </div>
        <div>
          <Image
            className={styles.scenesImage}
            sources={{
              light: useBaseUrl(data.imageUrl),
              dark: useBaseUrl(data.imageUrl),
            }}
          />
        </div>
      </div>
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
        <div className={styles.sectionInner}>{scenesNodes}</div>
      </div>
    </div>
  );
}
