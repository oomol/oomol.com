import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { usePluginData } from "@docusaurus/useGlobalData";
import React from "react";

const toolIcons = [
  { icon: "i-simple-icons-github", labelKey: "COMMON.brand.github" },
  { icon: "i-simple-icons-slack", labelKey: "COMMON.brand.slack" },
  { icon: "i-simple-icons-notion", labelKey: "COMMON.brand.notion" },
  { icon: "i-simple-icons-gmail", labelKey: "COMMON.brand.gmail" },
  { icon: "i-simple-icons-linear", labelKey: "COMMON.brand.linear" },
  { icon: "i-simple-icons-vercel", labelKey: "COMMON.brand.vercel" },
  { icon: "i-simple-icons-supabase", labelKey: "COMMON.brand.supabase" },
  { icon: "i-simple-icons-twilio", labelKey: "COMMON.brand.twilio" },
];

const DEFAULT_CATALOG_STATS = {
  providerCount: 1000,
  actionCount: 40000,
};

type CatalogStats = typeof DEFAULT_CATALOG_STATS;

type ToolStripCopy = {
  title: string;
  description: string;
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

export default function HomepageToolStrip() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const pluginData = usePluginData("catalog-stats") as CatalogStats | undefined;
  const numberLocale = i18n.currentLocale === "zh-CN" ? "zh-CN" : "en-US";
  const catalogStats = pluginData ?? DEFAULT_CATALOG_STATS;
  const providerCount = formatCount(catalogStats.providerCount, numberLocale);
  const actionCount = formatCount(catalogStats.actionCount, numberLocale);

  const copy: ToolStripCopy = {
    title: translate({
      id: "HOME.ToolStrip.title",
      message: "Deep coverage for common tools",
    }),
    description: translate(
      {
        id: "HOME.ToolStrip.description",
        message:
          "OOMOL comes with support for {providerCount} apps and {actionCount} packaged tools. Start by using what already exists through oo-cli, then decide what is worth orchestrating further, extending, or turning into your own tool.",
      },
      {
        providerCount,
        actionCount,
      }
    ),
    providerStat: {
      label: translate({
        id: "HOME.ToolStrip.providerStat.label",
        message: "apps",
      }),
      text: translate({
        id: "HOME.ToolStrip.providerStat.text",
        message:
          "Covering common services across collaboration, development, marketing, and payments.",
      }),
    },
    actionStat: {
      label: translate({
        id: "HOME.ToolStrip.actionStat.label",
        message: "packaged tools",
      }),
      text: translate({
        id: "HOME.ToolStrip.actionStat.text",
        message: "Not raw APIs, but ready-to-use actions.",
      }),
    },
    wallTitle: translate({
      id: "HOME.ToolStrip.wallTitle",
      message: "Common apps are already available",
    }),
  };

  const stats = [
    {
      value: providerCount,
      ...copy.providerStat,
    },
    {
      value: actionCount,
      ...copy.actionStat,
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.copyColumn}>
          <h2 className={styles.sectionTitle}>{copy.title}</h2>
          <p className={styles.sectionDescription}>{copy.description}</p>
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
                <div key={tool.labelKey} className={styles.toolChip}>
                  <i
                    className={`${styles.toolIcon} ${tool.icon}`}
                    aria-hidden="true"
                  />
                  <span className={styles.toolLabel}>
                    {translate({ message: tool.labelKey })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
