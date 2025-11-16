import styles from "./styles.module.scss";

import React from "react";
import { translate } from "@docusaurus/Translate";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { DocusaurusContext } from "@docusaurus/types";

type CommunityLinkType = {
  icon: string;
  title: string;
  description: string;
  url: string;
  color: string;
};

export default function HomepageGuide() {
  const context = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
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
            className={styles[link.color]}
          >
            <Card className={styles["community-card"]}>
              <CardHeader>
                <div className={styles["card-icon"]}>
                  <i className={link.icon} />
                </div>
                <CardTitle className={styles["card-title"]}>{link.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={styles["card-description"]}>{link.description}</p>
                <div className={styles["card-arrow"]}>
                  <i className="i-codicon-arrow-right" />
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      <div style={{ marginTop: 40 }}>
        <Button asChild>
          <a href="https://hub.oomol.com/" target="_blank" rel="noopener noreferrer">
            <i className="i-codicon:arrow-right" />
            {translate({ message: "HOME.Guide.link-button-text" })}
          </a>
        </Button>
      </div>
    </section>
  );
}
