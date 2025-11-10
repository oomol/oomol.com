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
    icon: "i-codicon-server",
    title: translate({ message: "HOME.CoreTech.local-computing.title" }),
    description: translate({
      message: "HOME.CoreTech.local-computing.description",
    }),
    tags: [
      translate({ message: "HOME.CoreTech.local-computing.tag1" }),
      translate({ message: "HOME.CoreTech.local-computing.tag2" }),
      translate({ message: "HOME.CoreTech.local-computing.tag3" }),
      translate({ message: "HOME.CoreTech.local-computing.tag4" }),
    ],
    highlight: true,
  },
  {
    icon: "i-codicon-symbol-method",
    title: translate({ message: "HOME.CoreTech.workflow.title" }),
    description: translate({ message: "HOME.CoreTech.workflow.description" }),
    tags: [
      translate({ message: "HOME.CoreTech.workflow.tag1" }),
      translate({ message: "HOME.CoreTech.workflow.tag2" }),
      translate({ message: "HOME.CoreTech.workflow.tag3" }),
    ],
  },
  {
    icon: "i-codicon-plug",
    title: translate({ message: "HOME.CoreTech.mcp.title" }),
    description: translate({ message: "HOME.CoreTech.mcp.description" }),
    tags: [
      translate({ message: "HOME.CoreTech.mcp.tag1" }),
      translate({ message: "HOME.CoreTech.mcp.tag2" }),
      translate({ message: "HOME.CoreTech.mcp.tag3" }),
    ],
  },
  {
    icon: "i-codicon-code",
    title: translate({ message: "HOME.CoreTech.vscode.title" }),
    description: translate({ message: "HOME.CoreTech.vscode.description" }),
    tags: [
      translate({ message: "HOME.CoreTech.vscode.tag1" }),
      translate({ message: "HOME.CoreTech.vscode.tag2" }),
      translate({ message: "HOME.CoreTech.vscode.tag3" }),
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
