import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { DocusaurusContext } from "@docusaurus/types";
import React from "react";

export default function HomepageBrandBreak() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const isZh = i18n.currentLocale === "zh-CN";

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.headline}>
          {isZh ? "一次构建\n持续交付" : "Build once\nDeliver continuously"}
        </h2>
        <p className={styles.subline}>
          {isZh
            ? "从 Skill 创建到云端运行，一条完整的路径。"
            : "From skill creation to cloud runtime — one complete path."}
        </p>
        <div className={styles.showcaseRow}>
          <div className={styles.showcaseCard}>
            <div className={styles.showcaseCardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <span className={styles.showcaseCardLabel}>
              {isZh ? "Studio 创建" : "Create in Studio"}
            </span>
          </div>
          <div className={styles.showcaseArrow} aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
          <div className={styles.showcaseCard}>
            <div className={styles.showcaseCardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className={styles.showcaseCardLabel}>
              {isZh ? "Cloud 运行" : "Run on Cloud"}
            </span>
          </div>
          <div className={styles.showcaseArrow} aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
          <div className={styles.showcaseCard}>
            <div className={styles.showcaseCardIcon}>
              <i className={`${styles.showcaseGlyph} i-lucide-bot`} aria-hidden="true" />
            </div>
            <span className={styles.showcaseCardLabel}>
              {isZh ? "oo-cli 使用" : "Use via oo-cli"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
