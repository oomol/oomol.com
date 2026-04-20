import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Button } from "@site/src/components/ui/button";
import ThemedImage from "@theme/ThemedImage";
import React from "react";

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
  const copy = {
    badge: translate({
      id: "HOME.GuiEntry.badge",
      message: "GUI extension of oo-cli",
    }),
    title: translate({
      id: "HOME.GuiEntry.title",
      message: "You can keep using the same tools through OOMOL AI",
    }),
    description: translate({
      id: "HOME.GuiEntry.description",
      message:
        "Once you have tools connected through oo-cli, OOMOL AI gives you the official GUI for using those same capabilities across web, desktop, and iOS.",
    }),
    points: [
      translate({
        id: "HOME.GuiEntry.point1",
        message: "Web",
      }),
      translate({
        id: "HOME.GuiEntry.point2",
        message: "Desktop",
      }),
      translate({
        id: "HOME.GuiEntry.point3",
        message: "iOS",
      }),
    ],
    action: translate({
      id: "HOME.GuiEntry.action",
      message: "Explore OOMOL AI",
    }),
    imageAlt: translate({
      id: "HOME.GuiEntry.imageAlt",
      message: "OOMOL AI interface preview",
    }),
  };
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
                alt={copy.imageAlt}
                className={styles.mediaImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
