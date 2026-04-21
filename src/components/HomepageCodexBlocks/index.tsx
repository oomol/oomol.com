import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { Button } from "@site/src/components/ui/button";
import React from "react";

const showcaseItems = [
  {
    icon: "i-lucide-panels-top-left",
    eyebrow: translate({ message: "HOME.CodexBlocks.card1.eyebrow" }),
    title: translate({ message: "HOME.CodexBlocks.card1.title" }),
    description: translate({ message: "HOME.CodexBlocks.card1.description" }),
    previewTitle: translate({ message: "HOME.CodexBlocks.card1.previewTitle" }),
    previewNote: translate({ message: "HOME.CodexBlocks.card1.previewNote" }),
  },
  {
    icon: "i-lucide-orbit",
    eyebrow: translate({ message: "HOME.CodexBlocks.card2.eyebrow" }),
    title: translate({ message: "HOME.CodexBlocks.card2.title" }),
    description: translate({ message: "HOME.CodexBlocks.card2.description" }),
    previewTitle: translate({ message: "HOME.CodexBlocks.card2.previewTitle" }),
    previewNote: translate({ message: "HOME.CodexBlocks.card2.previewNote" }),
  },
];

export default function HomepageCodexBlocks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            {translate({ message: "HOME.CodexBlocks.badge" })}
          </div>
          <h2 className={styles.sectionTitle}>
            {translate({ message: "HOME.CodexBlocks.title" })}
          </h2>
          <p className={styles.sectionSubtitle}>
            {translate({ message: "HOME.CodexBlocks.subtitle" })}
          </p>
          <div className={styles.headerActions}>
            <Button asChild>
              <Link to="/cli">
                {translate({ message: "HOME.CodexBlocks.action.primary" })}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/cloud">
                {translate({ message: "HOME.CodexBlocks.action.secondary" })}
              </Link>
            </Button>
          </div>
        </div>

        <div className={styles.grid}>
          {showcaseItems.map(item => (
            <article key={item.title} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap} aria-hidden="true">
                  <i className={item.icon} />
                </div>
                <div className={styles.cardEyebrow}>{item.eyebrow}</div>
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>

              <div className={styles.videoBlock}>
                <div className={styles.videoFrame}>
                  <div className={styles.videoOverlay}>
                    <div className={styles.playButton} aria-hidden="true">
                      <i className="i-lucide-play" />
                    </div>
                    <div className={styles.videoLabel}>
                      {translate({ message: "HOME.CodexBlocks.video" })}
                    </div>
                  </div>
                  <div className={styles.videoChrome}>
                    <span className={styles.videoDot} />
                    <span className={styles.videoDot} />
                    <span className={styles.videoDot} />
                  </div>
                  <div className={styles.videoCanvas}>
                    <div className={styles.videoGradient} />
                    <div className={styles.videoTracks}>
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
                <div className={styles.videoMeta}>
                  <div className={styles.videoMetaTitle}>
                    {item.previewTitle}
                  </div>
                  <p className={styles.videoMetaNote}>{item.previewNote}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
