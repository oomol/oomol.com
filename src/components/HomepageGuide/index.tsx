import styles from "./styles.module.scss";

import React from "react";
import { translate } from "@docusaurus/Translate";
import LinkBtn from "../Button/LinkBtn";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { HeroVideoDialog } from "../magic-ui/HeroVideoDialog";

export default function HomepageGuide() {
  const context: any = useDocusaurusContext();
  const { i18n } = context;
  return (
    <section className={styles.container}>
      <h2 className={styles["section-title"]}>
        {translate({ message: "HOME.Guide.title" })}
      </h2>
      <p className={styles.subtitle}>
        {translate({ message: "HOME.Guide.subtitle" })}
      </p>
      <div className={styles["image-box"]}>
        <div className={styles.halo}>
          <HeroVideoDialog
            className={styles.video}
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/T1zuyzZw8pk?si=Mr9egxVAoQYB_Nzj"
            thumbnailSrc={useBaseUrl("/img/pages/home/share.png")}
            thumbnailAlt="Hero Video"
            zhCNVideoSrc="https://static.oomol.com/assets/publish.webm"
          />
        </div>
      </div>
      <div style={{ marginBottom: 72 }}>
        <LinkBtn
          text={translate({ message: "HOME.Guide.link-button-text" })}
          iconPos="right"
          icon="i-codicon:arrow-right"
          url={"https://hub.oomol.com/"}
        />
      </div>
    </section>
  );
}
