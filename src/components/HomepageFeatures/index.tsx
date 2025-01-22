import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import { BlurFade } from "../magic-ui/BlurFade";

type SuperiorityType = {
  imageUrl: string;
  title: string;
  icon: string;
  inner: string;
};

const superiorityList: SuperiorityType[] = [
  {
    imageUrl: "/img/superiority-1.png",
    title: translate({ message: "HOME.Features.intuitive-interaction.title" }),
    icon: "i-codicon-wand",
    inner: translate({ message: "HOME.Features.intuitive-interaction.inner" }),
  },
  {
    imageUrl: "/img/superiority-2.png",
    title: translate({
      message: "HOME.Features.pre-installed-environment.title",
    }),
    icon: "i-codicon:server-environment",
    inner: translate({
      message: "HOME.Features.pre-installed-environment.inner",
    }),
  },
  {
    imageUrl: "/img/superiority-3.png",
    title: translate({ message: "HOME.Features.programming-friendly.title" }),
    icon: "i-codicon:code",
    inner: translate({ message: "HOME.Features.programming-friendly.inner" }),
  },
  {
    imageUrl: "/img/superiority-4.png",
    title: translate({ message: "HOME.Features.support-sharing.title" }),
    icon: "i-codicon:globe",
    inner: translate({ message: "HOME.Features.support-sharing.inner" }),
  },
];

export const FeatureItem = ({
  title,
  imageUrl,
  inner,
  icon,
}: SuperiorityType) => {
  return (
    <BlurFade className={styles["feature-blur-fade"]}>
      <div className={styles.feature}>
        <Image
          className={styles.image}
          sources={{
            light: useBaseUrl(imageUrl),
            dark: useBaseUrl(imageUrl),
          }}
        />
        <div className={styles.content}>
          <div className={styles.title}>
            <i className={`${icon} ${styles["sub-icon"]}`} />
            <h3 className={styles["title-text"]}>{title}</h3>
          </div>
          <p className={styles.inner}>{inner}</p>
        </div>
      </div>
    </BlurFade>
  );
};

export default function HomepageFeatures() {
  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>
        <i className={`${styles.icon} i-codicon-symbol-misc`} />
        {translate({
          message: "HOME.Features.title",
        })}
      </div>
      <div className={styles.list}>
        {superiorityList.map((data, index) => {
          return (
            <FeatureItem
              key={`feature-${index}`}
              imageUrl={data.imageUrl}
              title={data.title}
              icon={data.icon}
              inner={data.inner}
            />
          );
        })}
      </div>
    </div>
  );
}
