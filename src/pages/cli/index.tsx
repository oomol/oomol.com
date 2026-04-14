import type { DocusaurusContext } from "@docusaurus/types";

import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CliPageIntro from "@site/src/components/CliPageIntro";
import React from "react";

import Layout from "../../theme/Layout";

const zhCopy = {
  title: "oo-cli - 给 Agent 调用工具的默认入口",
  description:
    "在 Codex、Claude Code 或任意终端里搜索、查看并运行现成工具。现成工具不够时，再进入 Studio 和 Cloud 继续扩展。",
};

const enCopy = {
  title: "oo-cli - The default entry point for agents to use tools",
  description:
    "Search, inspect, and run ready-made tools in Codex, Claude Code, or any terminal. When existing tools stop short, continue in Studio and Cloud.",
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
