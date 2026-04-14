import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

export default function CloudPageBrandBreak() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const isZh = i18n.currentLocale === "zh-CN";

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.headline}>
          {isZh
            ? "把自己的工具\n带进 oo-cli"
            : "Bring your own tools\nto oo-cli"}
        </h2>
        <p className={styles.subline}>
          {isZh
            ? "Studio 生成并验证，Cloud 发布并运行，oo-cli 在 Codex、Claude Code 和终端里直接搜索、查看和调用。"
            : "Build and validate in Studio, publish through Cloud, then search, inspect, and run the tool through oo-cli in Codex, Claude Code, and the terminal."}
        </p>
        <div className={styles.showcaseRow}>
          <div className={styles.showcaseCard}>
            <div className={styles.showcaseCardIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <span className={styles.showcaseCardLabel}>
              {isZh ? "Studio 生成与验证" : "Build in Studio"}
            </span>
          </div>
          <div className={styles.showcaseArrow} aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
          <div className={styles.showcaseCard}>
            <div className={styles.showcaseCardIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className={styles.showcaseCardLabel}>
              {isZh ? "Cloud 发布与运行" : "Publish through Cloud"}
            </span>
          </div>
          <div className={styles.showcaseArrow} aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
          <div className={styles.showcaseCard}>
            <div className={styles.showcaseCardIcon}>
              <i
                className={`${styles.showcaseGlyph} i-lucide-bot`}
                aria-hidden="true"
              />
            </div>
            <span className={styles.showcaseCardLabel}>
              {isZh ? "oo-cli 直接调用" : "Run with oo-cli"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
