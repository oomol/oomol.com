import styles from "./styles.module.scss";

import React from "react";
import { translate } from "@docusaurus/Translate";
import LinkBtn from "../Button/LinkBtn";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

type CommunityLinkType = {
  icon: string;
  title: string;
  description: string;
  url: string;
  color: string;
};

export default function HomepageGuide() {
  const context: any = useDocusaurusContext();
  const { i18n } = context;

  const communityLinks: CommunityLinkType[] = [
    {
      icon: "i-codicon-github",
      title: translate({ message: "HOME.Guide.github.title" }),
      description: translate({ message: "HOME.Guide.github.description" }),
      url: "https://github.com/oomol-lab",
      color: "github",
    },
    {
      icon: "i-codicon-comment-discussion",
      title: translate({ message: "HOME.Guide.discord.title" }),
      description: translate({ message: "HOME.Guide.discord.description" }),
      url: "https://discord.gg/oomol",
      color: "discord",
    },
    {
      icon: "i-codicon-book",
      title: translate({ message: "HOME.Guide.docs.title" }),
      description: translate({ message: "HOME.Guide.docs.description" }),
      url:
        i18n.currentLocale === "zh-CN"
          ? "https://oomol.com/zh-CN/docs"
          : "https://oomol.com/docs",
      color: "docs",
    },
  ];

  return (
    <section className={styles.container}>
      <h2 className={styles["section-title"]}>
        {translate({ message: "HOME.Guide.title" })}
      </h2>
      <p className={styles.subtitle}>
        {translate({ message: "HOME.Guide.subtitle" })}
      </p>

      <div className={styles["community-grid"]}>
        {communityLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles["community-card"]} ${styles[link.color]}`}
          >
            <div className={styles["card-icon"]}>
              <i className={link.icon} />
            </div>
            <h3 className={styles["card-title"]}>{link.title}</h3>
            <p className={styles["card-description"]}>{link.description}</p>
            <div className={styles["card-arrow"]}>
              <i className="i-codicon-arrow-right" />
            </div>
          </a>
        ))}
      </div>

      <div style={{ marginTop: 40 }}>
        <LinkBtn
          text={translate({ message: "HOME.Guide.link-button-text" })}
          icon="i-codicon:arrow-right"
          url={"https://hub.oomol.com/"}
        />
      </div>
    </section>
  );
}
