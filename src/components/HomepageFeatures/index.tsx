import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { clsx } from "clsx";

type SuperiorityType = {
  imageUrl: string;
  width: number;
  title: string;
  inners: string[];
};

const superiorityList: SuperiorityType[] = [
  {
    imageUrl: "/img/cloud.svg",
    width: 360,
    title: "交互直观，配置灵活",
    inners: [
      "拖放即可轻松构建工作流程。",
      "用户可以自由配置节点的 UI 组件",
      "支持多种类型常用数据的展示 ",
    ],
  },
  {
    imageUrl: "/img/data.svg",
    width: 360,
    title: "环境预装，分享无忧",
    inners: [
      "无需为安装 Python、Node.js 运行环境而烦恼，开箱即用",
      "OOMOL 为用户将开发环境统一到容器中，不同系统的用户可以自由互相分享工作流",
      "安全隔离，不会影响用户本地环境。用户也不用担心设备中的数据安全问题",
    ],
  },
  {
    imageUrl: "/img/interactive.svg",
    width: 360,
    title: "对接社区，编程友好",
    inners: [
      "内置 Python、Node.js, 支持安装各种开源库",
      "编辑器支持代码补全、高亮以及 AI 代码提示",
      "具有精美易用的日志展示界面，方便工程师调试使用",
    ],
  },

  {
    imageUrl: "/img/open-source.svg",
    width: 320,
    title: "支持分享，拥抱开源",
    inners: [
      "支持将工作流、工具节点分享到 OOMOL 社区，方便其他用户使用",
      "用户可以将自己的工作流源代码分享到 Github",
      "OOMOL会在 oomol-lab 组织中开源 内置工具插件，常用工作流，底层运行容器等",
    ],
  },
];

function isOdd(num) {
  return num % 2 !== 0;
}

export default function HomepageFeatures() {
  const superiorityNode = superiorityList.map((data, index) => {
    const innerNodes = data.inners.map((inner, index) => {
      return <li key={`inner-${index}`}>{inner}</li>;
    });
    if (isOdd(index)) {
      return (
        <div
          className={clsx(
            styles.sectionTwo,
            isOdd(index) && styles.evenSectionTwo
          )}
          key={`${index}`}
        >
          <div className={styles.sectionTwoBox}>
            <div className={styles.sectionTwoSmall}>
              <Image
                style={{ width: data.width }}
                sources={{
                  light: useBaseUrl(data.imageUrl),
                  dark: useBaseUrl(data.imageUrl),
                }}
              />
            </div>
            <div className={styles.sectionTwoLarge}>
              <div className={styles.sectionTwoLargeBox}>
                <div className={styles.sectionTwoLargeTitle}>{data.title}</div>
                <div className={styles.sectionTwoLargeInner}>{innerNodes}</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={clsx(
            styles.sectionTwo,
            isOdd(index) && styles.evenSectionTwo
          )}
          key={`${index}`}
        >
          <div className={styles.sectionTwoBox}>
            <div className={styles.sectionTwoLarge}>
              <div className={styles.sectionTwoLargeBox}>
                <div className={styles.sectionTwoLargeTitle}>{data.title}</div>
                <div className={styles.sectionTwoLargeInner}>{innerNodes}</div>
              </div>
            </div>
            <div className={styles.sectionTwoSmall}>
              <Image
                style={{ width: data.width }}
                sources={{
                  light: useBaseUrl(data.imageUrl),
                  dark: useBaseUrl(data.imageUrl),
                }}
              />
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <>
      <div className={styles.sectionTitle}>功能和优势</div>
      {superiorityNode}
    </>
  );
}
