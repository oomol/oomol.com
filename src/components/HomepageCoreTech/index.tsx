import React from "react";
import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";
import { BlurFade } from "../magic-ui/BlurFade";
import clsx from "clsx";

type CoreTechItemType = {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  highlight?: boolean;
};

const coreTechList: CoreTechItemType[] = [
  {
    icon: "i-codicon-symbol-method",
    title: translate({ message: "HOME.CoreTech.blockAPI.title" }),
    description: translate({
      message: "HOME.CoreTech.blockAPI.description",
    }),
    tags: [
      translate({ message: "HOME.CoreTech.blockAPI.tag1" }),
      translate({ message: "HOME.CoreTech.blockAPI.tag2" }),
      translate({ message: "HOME.CoreTech.blockAPI.tag3" }),
      translate({ message: "HOME.CoreTech.blockAPI.tag4" }),
    ],
    highlight: true,
  },
  {
    icon: "i-codicon-git-merge",
    title: translate({ message: "HOME.CoreTech.apiComposition.title" }),
    description: translate({ message: "HOME.CoreTech.apiComposition.description" }),
    tags: [
      translate({ message: "HOME.CoreTech.apiComposition.tag1" }),
      translate({ message: "HOME.CoreTech.apiComposition.tag2" }),
      translate({ message: "HOME.CoreTech.apiComposition.tag3" }),
      translate({ message: "HOME.CoreTech.apiComposition.tag4" }),
    ],
  },
  {
    icon: "i-codicon-code",
    title: translate({ message: "HOME.CoreTech.codingExperience.title" }),
    description: translate({ message: "HOME.CoreTech.codingExperience.description" }),
    tags: [
      translate({ message: "HOME.CoreTech.codingExperience.tag1" }),
      translate({ message: "HOME.CoreTech.codingExperience.tag2" }),
      translate({ message: "HOME.CoreTech.codingExperience.tag3" }),
      translate({ message: "HOME.CoreTech.codingExperience.tag4" }),
    ],
  },
  {
    icon: "i-codicon-cloud-upload",
    title: translate({ message: "HOME.CoreTech.multiDeploy.title" }),
    description: translate({ message: "HOME.CoreTech.multiDeploy.description" }),
    tags: [
      translate({ message: "HOME.CoreTech.multiDeploy.tag1" }),
      translate({ message: "HOME.CoreTech.multiDeploy.tag2" }),
      translate({ message: "HOME.CoreTech.multiDeploy.tag3" }),
      translate({ message: "HOME.CoreTech.multiDeploy.tag4" }),
    ],
  },
];

export const CoreTechItem = ({
  icon,
  title,
  description,
  tags,
  highlight = false,
}: CoreTechItemType) => {
  return (
    <BlurFade className={styles["tech-blur-fade"]}>
      <div
        className={clsx(styles["tech-item"], {
          [styles.highlight]: highlight,
        })}
      >
        <div className={styles["icon-wrapper"]}>
          <i className={clsx(icon, styles.icon)} />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </BlurFade>
  );
};

export default function HomepageCoreTech() {
  return (
    <section className={styles.container}>
      <div className={styles.titleBox}>
        <div className={styles.sectionTitle}>
          {translate({
            message: "HOME.CoreTech.title",
          })}
        </div>
        <span className={styles.sectionSubtitle}>
          {translate({
            message: "HOME.CoreTech.subtitle",
          })}
        </span>
      </div>
      <div className={styles.list}>
        {coreTechList.map((data, index) => {
          return (
            <CoreTechItem
              key={`core-tech-${index}`}
              icon={data.icon}
              title={data.title}
              description={data.description}
              tags={data.tags}
              highlight={data.highlight}
            />
          );
        })}
      </div>
    </section>
  );
}
