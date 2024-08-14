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
    title: "数据科学",
    type: "purple",
    tag: "结构化数据",
    color: "blue",
    inner:
      "用户可以用熟悉的脚本语言进行数据处理、图表展示。在此之上，我们还支持用户使用 UI 界面来配置节点的参数，并且可以通过拖拽快、连接等简单操作来创建一个工作流。我们提供的容器环境又帮用户去除了分享的障碍，因此大幅缩短了从脚本到产品的距离。",
  },
  {
    imageUrl: "/img/media.jpg",
    title: "媒体处理",
    type: "purple",
    tag: "非结构化数据",
    color: "green",
    inner:
      "开发者可以将常用的视频处理库封装成一个个功能节点，节点可以用 OOMOL 提供的 UI 配置界面来添加各种可调的参数。基于这样的工具，像 tiktok 上的内容制作者就可以通过拖拽创建一个工作流来处理他们的的视频音频素材。比如将视频加上各种语言的字幕等工作可以自动化批量完成。",
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
