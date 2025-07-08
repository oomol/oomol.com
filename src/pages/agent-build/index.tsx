import React from "react";
import Layout from "../../theme/Layout";
import CasePageDetail, {
  ScenesDataType,
} from "@site/src/components/CasePageDetail";
import CasePageVideo from "@site/src/components/CasePageVideo";
import Head from "@docusaurus/Head";
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
    title: "构建 AI 智能体",
    tag: "Agent",
    inner: "支持高效构建 AI Agent，并且支持多 Agent 模式",
    icon: "i-codicon-graph-line",
  },
  {
    imageUrl: "/img/cases-2.png",
    title: "MCP 生产工厂",
    tag: "MCP",
    inner: "支持高效将开源库和  AI Agent 封装为 MCP 服务",
    icon: "i-codicon-device-camera-video",
  },
  {
    imageUrl: "/img/cases-2.png",
    title: "导出和分享",
    tag: "导出",
    inner: "支持导出后直接分享和使用基于 flow 定义的 AI 服务",
    icon: "i-codicon-device-camera-video",
  },
];

const scenesTitle = "优势功能";
const sceneSubtitle = "在以下场景使用 OOMOL，帮助用户提升工作效率。";
const title = "AI Agent 构建场景";
const subtitle =
  "使用丰富的开源生态库构建你的 Agent，不再被千遍一律的内置功能束缚。创意的价值，往往体现在不同之处。";
const videoSrc =
  "https://www.youtube.com/embed/L3fYYybKWJE?si=gJ-r2pDJDdUtR_IM";
const thumbnailSrc = "/img/pages/home/first-screen.webp";
export default function AgentBuild() {
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
