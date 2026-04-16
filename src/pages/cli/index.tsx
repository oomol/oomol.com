import type { DocusaurusContext } from "@docusaurus/types";

import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CliPageIntro from "@site/src/components/CliPageIntro";
import React from "react";

import Layout from "../../theme/Layout";

const zhCopy = {
  title: "oo-cli - 为 Agent 提供更多工具",
  description:
    "在一个 CLI 里搜索工具、查看输入、调用 connector、运行 cloud task、安装 skills，让 Agent 直接开始做事。",
};

const enCopy = {
  title: "oo-cli - More Tools for Agents",
  description:
    "Search tools, inspect inputs, run connectors, launch cloud tasks, install skills, and let agents get to work from one CLI.",
};

export default function CliPage() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const copy = i18n.currentLocale === "zh-CN" ? zhCopy : enCopy;

  return (
    <Layout>
      <Head>
        <title>{copy.title}</title>
        <meta name="description" content={copy.description} />
      </Head>
      <main>
        <CliPageIntro />
      </main>
    </Layout>
  );
}
