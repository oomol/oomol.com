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
    title: "支持语言生态",
    tag: "可编程",
    inner: "支持引用 python，js 生态各种开源库和企业服务的 SDK生成节点",
    icon: "i-codicon-graph-line",
  },
  {
    imageUrl: "/img/cases-2.png",
    title: "支持私有部署",
    tag: "镜像导出",
    inner: "支持工作流可以导出 docker 镜像，自己部署到服务器使用",
    icon: "i-codicon-device-camera-video",
  },
  {
    imageUrl: "/img/cases-2.png",
    title: "支持社区分享",
    tag: "共享",
    inner: "支持使用社区的功能节点以及在社区分享自己的节点",
    icon: "i-codicon-device-camera-video",
  },
];

const scenesTitle = "优势功能";
const sceneSubtitle = "在以下场景使用 OOMOL，帮助用户提升工作效率。";
const title = "流程自动化场景";
const subtitle =
  "开发自定义节点和使用内置节点一样高效，不再因为定制需求而烦恼。";
const videoSrc =
  "https://www.youtube.com/embed/L3fYYybKWJE?si=gJ-r2pDJDdUtR_IM";
const thumbnailSrc = "/img/pages/home/first-screen.webp";

export default function WorkflowAutomation() {
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
