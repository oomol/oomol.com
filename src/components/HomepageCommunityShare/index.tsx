import React from "react";
import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";
import { BlurFade } from "../magic-ui/BlurFade";
import Link from "@docusaurus/Link";

type CommunityDataType = {
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
};

const communityData: CommunityDataType[] = [
  {
    title: "OOMOL Hub",
    description: translate({ message: "HOME.CommunityShare.hub.description" }),
    icon: "i-codicon-globe",
    link: "/hub",
    color: "blue",
  },
  {
    title: "GitHub Community",
    description: translate({ message: "HOME.CommunityShare.github.description" }),
    icon: "i-codicon-github",
    link: "https://github.com/oomol-lab",
    color: "green",
  },
  {
    title: "Discord",
    description: translate({ message: "HOME.CommunityShare.discord.description" }),
    icon: "i-codicon-comment-discussion",
    link: "/community",
    color: "purple",
  },
];

export default function HomepageCommunityShare() {
  const communityNodes = communityData.map((item, index) => {
    const isEven = index % 2 === 0;
    return (
      <BlurFade key={`community-${index}`} delay={0.25 + index * 0.05}>
        <div className={`${styles.communityCard} ${isEven ? styles.evenCard : styles.oddCard}`}>
          <div className={styles.communityContent}>
            <h3 className={styles.communityTitle}>{item.title}</h3>
            <p className={styles.communityDescription}>{item.description}</p>
            <Link to={item.link} className={styles.communityLink}>
              {translate({ message: "HOME.CommunityShare.learnMore" })}
              <i className="i-codicon-arrow-right" />
            </Link>
          </div>
          <div className={styles.communityImageContainer}>
            <div className={`${styles.communityIcon} ${styles[item.color]}`}>
              <i className={item.icon} />
            </div>
          </div>
        </div>
      </BlurFade>
    );
  });

  return (
    <div className={styles.community}>
      <div className={styles["community-mid"]}>
        <div className={styles.sectionTitle}>
          {translate({
            message: "HOME.CommunityShare.title",
          })}
        </div>
        <span className={styles.sectionSubtitle}>
          {translate({
            message: "HOME.CommunityShare.subtitle",
          })}
        </span>
        <div className={styles.communityList}>{communityNodes}</div>
      </div>
    </div>
  );
}