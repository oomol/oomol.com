import React from "react";
import Layout from "../../theme/Layout";
import CasePageDetail, {
  ScenesDataType,
} from "@site/src/components/CasePageDetail";
import CasePageVideo from "@site/src/components/CasePageVideo";
import { GetStartedPrompt } from "../../components/GetStartedPrompt";
import { translate } from "@docusaurus/Translate";

// const scenesData: ScenesDataType[] = [
//   {
//     imageUrl: "/img/cases-1.png",
//     title: translate({ message: "HOME.Scenes.data-science.title" }),
//     type: "purple",
//     tag: translate({ message: "HOME.Scenes.data-science.tag" }),
//     color: "blue",
//     inner: translate({ message: "HOME.Scenes.data-science.inner" }),
//     icon: "i-codicon-graph-line",
//   },
//   {
//     imageUrl: "/img/cases-2.png",
//     title: translate({ message: "HOME.Scenes.media-processing.title" }),
//     type: "purple",
//     tag: translate({ message: "HOME.Scenes.media-processing.tag" }),
//     color: "green",
//     inner: translate({ message: "HOME.Scenes.media-processing.inner" }),
//     icon: "i-codicon-device-camera-video",
//   },
// ];

// const scenesTitle = translate({
//   message: "HOME.Scenes.title",
// });
// const sceneSubtitle = translate({
//   message: "HOME.Scenes.subtitle",
// });
// const title = translate({ message: "HOME.FirstScreen.slogan" });
// const subtitle = translate({
//   message: "HOME.FirstScreen.script",
// });
// const videoSrc =
//   "https://www.youtube.com/embed/L3fYYybKWJE?si=gJ-r2pDJDdUtR_IM";
// const thumbnailSrc = "/img/pages/home/first-screen.webp";

const scenesData: ScenesDataType[] = [
  {
    imageUrl: "/img/cases-1.png",
    title: "支持 Python 生态",
    tag: "可编程",
    inner:
      "支持直接使用 Python 库做数据分析，支持预览 dataframe 和 matpilot 和 plotly",
    icon: "i-codicon-graph-line",
  },
  {
    imageUrl: "/img/cases-2.png",
    title: "支持封装复用",
    tag: "高效抽象",
    inner: "可以将常用的算法封装成 Shared Block 库，方便重复使用",
    icon: "i-codicon-device-camera-video",
  },
  {
    imageUrl: "/img/cases-2.png",
    title: "Block 支持传递变量",
    tag: "高效传递",
    inner: "支持 block 之间传递 dataframe 对象，不需要反复序列化数据，提高效率",
    icon: "i-codicon-device-camera-video",
  },
];

const scenesTitle = "优势功能";
const sceneSubtitle = "在以下场景使用 OOMOL，帮助用户提升工作效率。";
const title = "数据处理场景";
const subtitle =
  "既可以使用 python 库灵活处理数据，又可以在工作流中预览图表。灵活便利，提高效率。";
const videoSrc =
  "https://www.youtube.com/embed/L3fYYybKWJE?si=gJ-r2pDJDdUtR_IM";
const thumbnailSrc = "/img/pages/data-analysis/data_analysis.png";
export default function DataAnalysis() {
  return (
    <Layout>
      <CasePageVideo
        title={title}
        subtitle={subtitle}
        videoSrc={videoSrc}
        thumbnailSrc={thumbnailSrc}
      />
      <CasePageDetail
        scenesData={scenesData}
        title={scenesTitle}
        subtitle={sceneSubtitle}
      />
      <GetStartedPrompt />
    </Layout>
  );
}
