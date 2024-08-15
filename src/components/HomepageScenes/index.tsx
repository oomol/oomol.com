import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Tag } from "@arco-design/web-react";

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
    title: "Data Science",
    type: "purple",
    tag: "Structured Data",
    color: "blue",
    inner:
      "Users can process data and display charts using familiar scripting languages. In addition, we support users in configuring node parameters through a UI interface, allowing them to create a workflow with simple operations such as drag-and-drop and connections. The container environment we provide also removes barriers to sharing, significantly reducing the distance from script to product.",
  },
  {
    imageUrl: "/img/media.jpg",
    title: "Media Processing",
    type: "purple",
    tag: "Unstructured Data",
    color: "green",
    inner:
      "Developers can encapsulate common video processing libraries into functional nodes, which can be added with various adjustable parameters using the UI configuration interface provided by OOMOL. With such a tool, content creators on platforms like TikTok can drag and drop to create a workflow for processing their video and audio materials. Tasks such as adding subtitles in multiple languages to videos can be automated and completed in batches.",
  },
];
export default function HomepageScenes() {
  const scenesNodes = scenesData.map((data, index) => {
    return (
      <div className={styles.sectionCell} key={`scenes-${index}`}>
        <div className={styles.scenesText}>
          <div className={styles.scenesTextTitle}>
            {data.title}
            <Tag
              key={index}
              style={{ marginLeft: 6 }}
              color={data.color}
              bordered
            >
              {data.tag}
            </Tag>
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
        <div className={styles.sectionTitle}>Usage Scenarios</div>
        <div className={styles.sectionInner}>{scenesNodes}</div>
      </div>
    </div>
  );
}
