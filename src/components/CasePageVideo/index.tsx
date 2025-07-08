import styles from "./styles.module.scss";

import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { GradualSpacing } from "../magic-ui/GradualSpacing";
import clsx from "clsx";
import { HeroVideoDialog } from "../magic-ui/HeroVideoDialog";
import { title } from "framer-motion/client";

interface CasePageVideoProps {
  title: string;
  subtitle: string;
  videoSrc: string;
  thumbnailSrc: string;
}

export default function CasePageVideo({
  title,
  subtitle,
  videoSrc,
  thumbnailSrc,
}: CasePageVideoProps) {
  const context: any = useDocusaurusContext();
  const { i18n } = context;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles["slogan-box"]}>
            {/* <h2>{title}</h2> */}
            <GradualSpacing
              text={title}
              className={clsx(
                styles["slogan"],
                i18n.currentLocale === "zh-CN" && styles["slogan-cn"]
              )}
            />
          </div>
          <div className={styles["intro-box"]}>
            <span className={styles.overview}>{subtitle}</span>
          </div>
        </div>
      </div>
      <div className={styles["image-box"]}>
        <div className={styles.halo}>
          <HeroVideoDialog
            className={styles.video}
            animationStyle="from-center"
            videoSrc={videoSrc}
            thumbnailSrc={thumbnailSrc}
            thumbnailAlt="Hero Video"
          />
        </div>
      </div>
    </section>
  );
}
