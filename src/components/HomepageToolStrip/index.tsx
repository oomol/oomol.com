import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { usePluginData } from "@docusaurus/useGlobalData";
import React from "react";

const toolIcons = [
  { icon: "i-simple-icons-github", label: "GitHub" },
  { icon: "i-simple-icons-slack", label: "Slack" },
  { icon: "i-simple-icons-notion", label: "Notion" },
  { icon: "i-simple-icons-gmail", label: "Gmail" },
  { icon: "i-simple-icons-linear", label: "Linear" },
  { icon: "i-simple-icons-vercel", label: "Vercel" },
  { icon: "i-simple-icons-supabase", label: "Supabase" },
  { icon: "i-simple-icons-twilio", label: "Twilio" },
];

const DEFAULT_CATALOG_STATS = {
  providerCount: 1000,
  actionCount: 40000,
};

type CatalogStats = typeof DEFAULT_CATALOG_STATS;

type ToolStripCopy = {
  title: string;
  getDescription: (stats: CatalogStats, locale: string) => string;
  providerStat: {
    label: string;
    text: string;
  };
  actionStat: {
    label: string;
    text: string;
  };
  wallTitle: string;
};

function formatCount(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(value);
}

const zhCopy: ToolStripCopy = {
  title: "先看 OOMOL 已经接好了多少应用",
  getDescription: (stats, locale) =>
    `OOMOL 内置支持 ${formatCount(stats.providerCount, locale)} 个应用，包含 ${formatCount(stats.actionCount, locale)} 个封装工具。先通过 oo-cli 用现成连接把工作跑起来，再决定哪些环节值得继续编排、扩展，或做成你自己的工具。`,
  providerStat: {
    label: "个应用",
    text: "覆盖办公、协作、开发、营销和支付等常见服务。",
  },
  actionStat: {
    label: "封装工具",
    text: "不是零散接口，而是可直接调用的能力入口。",
  },
  wallTitle: "常见应用已内置接入",
};

const enCopy: ToolStripCopy = {
  title: "Start with how many apps are already connected",
  getDescription: (stats, locale) =>
    `OOMOL comes with support for ${formatCount(stats.providerCount, locale)} apps and ${formatCount(stats.actionCount, locale)} wrapped tools. Start by using what already exists through oo-cli, then decide what is worth orchestrating further, extending, or turning into your own tool.`,
  providerStat: {
    label: "apps",
    text: "Covering common services across collaboration, development, marketing, and payments.",
  },
  actionStat: {
    label: "wrapped tools",
    text: "Packaged as usable capability entry points instead of raw integration fragments.",
  },
  wallTitle: "Common apps are already available",
};

export default function HomepageToolStrip() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const pluginData = usePluginData("catalog-stats") as CatalogStats | undefined;
  const numberLocale = i18n.currentLocale === "zh-CN" ? "zh-CN" : "en-US";
  const copy = i18n.currentLocale === "zh-CN" ? zhCopy : enCopy;
  const catalogStats = pluginData ?? DEFAULT_CATALOG_STATS;

  const stats = [
    {
      value: formatCount(catalogStats.providerCount, numberLocale),
      ...copy.providerStat,
    },
    {
      value: formatCount(catalogStats.actionCount, numberLocale),
      ...copy.actionStat,
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.copyColumn}>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.description}>
            {copy.getDescription(catalogStats, numberLocale)}
          </p>
        </div>

        <div className={styles.surfacePanel}>
          <div className={styles.statGrid}>
            {stats.map(stat => (
              <article key={stat.label} className={styles.statCard}>
                <div className={styles.statValue}>{stat.value}</div>
                <p className={styles.statText}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  {stat.text}
                </p>
              </article>
            ))}
          </div>

          <div className={styles.toolWall}>
            <div className={styles.wallTitle}>{copy.wallTitle}</div>
            <div className={styles.toolGrid}>
              {toolIcons.map(tool => (
                <div key={tool.label} className={styles.toolChip}>
                  <i
                    className={`${styles.toolIcon} ${tool.icon}`}
                    aria-hidden="true"
                  />
                  <span className={styles.toolLabel}>{tool.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
