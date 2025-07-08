import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { BlurFade } from "../magic-ui/BlurFade";

export type ScenesDataType = {
  imageUrl: string;
  title: string;
  tag: string;
  inner: string;
  icon: string;
};

interface CasePageScenesProps {
  scenesData: ScenesDataType[];
  title: string;
  subtitle: string;
}

export default function CasePageScenes({
  scenesData,
  title,
  subtitle,
}: CasePageScenesProps) {
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
        <div className={styles.sectionTitle}>{title}</div>
        <span className={styles.sectionSubtitle}>{subtitle}</span>
        <div className={styles.sectionInner}>{scenesNodes}</div>
      </div>
    </div>
  );
}
