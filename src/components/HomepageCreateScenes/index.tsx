import React from "react";
import styles from "./styles.module.scss";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import i18n from "@generated/i18n";
import LinkBtn from "../Button/LinkBtn";
import { HeroVideoDialog } from "../magic-ui/HeroVideoDialog";

type CreateScenesDataType = {
  imageUrl: string;
  title: string;
  type: string;
  tag: string;
  color: string;
  inner: string;
  icon: string;
};

const createScenesData: CreateScenesDataType[] = [
  {
    imageUrl: "/img/cases-1.png",
    title: translate({ message: "HOME.Scenes.ai-vibe-coding.title" }),
    type: "purple",
    tag: translate({ message: "HOME.Scenes.ai-vibe-coding.tag" }),
    color: "blue",
    inner: translate({ message: "HOME.Scenes.ai-vibe-coding.inner" }),
    icon: "i-codicon-wand",
  },
  {
    imageUrl: "/img/cases-2.png",
    title: translate({ message: "HOME.Scenes.drag-drop-manual.title" }),
    type: "purple",
    tag: translate({ message: "HOME.Scenes.drag-drop-manual.tag" }),
    color: "green",
    inner: translate({ message: "HOME.Scenes.drag-drop-manual.inner" }),
    icon: "i-codicon-symbol-interface",
  },
];

export default function HomepageCreateScenes() {
  const createScenesNodes = createScenesData.map((data, index) => {
    return (
      <div key={index} className={styles.sectionCell}>
        <div className={styles.createScenesText}>
          <span className={styles.createScenesTag}>{data.tag}</span>
          <div className={styles.createScenesTextTitle}>
            <i className={data.icon} />
            {data.title}
          </div>
          <p className={styles.createScenesTextInner}>{data.inner}</p>
        </div>
        <HeroVideoDialog
          className={styles["video"]}
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/L3fYYybKWJE?si=gJ-r2pDJDdUtR_IM"
          thumbnailSrc={useBaseUrl(data.imageUrl)}
          thumbnailAlt="Hero Video"
        />
      </div>
    );
  });
  return (
    <div className={styles.createScenes}>
      <div className={styles["create-scenes-mid"]}>
        <div className={styles.sectionTitle}>
          {translate({
            message: "HOME.Create.title",
          })}
        </div>
        <span className={styles.sectionSubtitle}>
          {translate({
            message: "HOME.Create.subtitle",
          })}
        </span>
        <div className={styles.sectionInner}>{createScenesNodes}</div>
        <LinkBtn
          text={translate({
            message: "HOME.Create.browse-docs",
          })}
          iconPos="right"
          icon="i-codicon:arrow-right"
          url={
            i18n.currentLocale === "zh-CN"
              ? "https://oomol.com/zh-CN/docs/get-started/quickstarts/"
              : "https://oomol.com/docs/get-started/quickstarts/"
          }
        />
      </div>
    </div>
  );
}
