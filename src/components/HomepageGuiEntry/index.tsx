import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import ThemedImage from "@theme/ThemedImage";
import React from "react";

const zhCopy = {
  badge: "oo-cli 的 GUI 延伸",
  title: "同一套能力，也可以在 OOMOL AI 里继续用图形界面",
  description:
    "当你已经沿 oo-cli 这条路径把工具接起来之后，如果更喜欢图形界面，OOMOL AI 提供同一套能力的官方 GUI 入口，适合在 Web、桌面和 iOS 中继续使用。",
  points: ["Web", "Desktop", "iOS"],
  action: "了解 OOMOL AI",
};

const enCopy = {
  badge: "GUI extension for oo-cli",
  title: "The same capability layer also works through OOMOL AI",
  description:
    "Once you already understand the oo-cli path, OOMOL AI gives you the official GUI for the same capability layer when you want a visual interface across web, desktop, and iOS.",
  points: ["Web", "Desktop", "iOS"],
  action: "Explore OOMOL AI",
};

function renderLockedBrand(text: string) {
  const brand = "OOMOL AI";

  if (!text.includes(brand)) {
    return text;
  }

  const segments = text.split(brand);

  return segments.flatMap((segment, index) => {
    const result: React.ReactNode[] = [];

    if (segment) {
      result.push(
        <React.Fragment key={`segment-${index}`}>{segment}</React.Fragment>
      );
    }

    if (index < segments.length - 1) {
      result.push(
        <span key={`brand-${index}`} className={styles.brandNoWrap}>
          {brand}
        </span>
      );
    }

    return result;
  });
}

export default function HomepageGuiEntry() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const copy = i18n.currentLocale === "zh-CN" ? zhCopy : enCopy;
  const imageSources = {
    light: useBaseUrl("/img/pages/app/chat-light.png"),
    dark: useBaseUrl("/img/pages/app/chat-dark.png"),
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.copy}>
            <div className={styles.badge}>{copy.badge}</div>
            <h2 className={styles.title}>{renderLockedBrand(copy.title)}</h2>
            <p className={styles.description}>{copy.description}</p>
            <div className={styles.pointRow}>
              {copy.points.map(point => (
                <span key={point} className={styles.point}>
                  {point}
                </span>
              ))}
            </div>
            <div className={styles.actions}>
              <Button asChild size="sm" variant="outline">
                <Link to="/app">{copy.action}</Link>
              </Button>
            </div>
          </div>

          <div className={styles.media}>
            <div className={styles.mediaFrame}>
              <ThemedImage
                sources={imageSources}
                alt="OOMOL AI"
                className={styles.mediaImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
