import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { clsx } from "clsx";
import { translate } from "@docusaurus/Translate";

type SuperiorityType = {
  imageUrl: string;
  title: string;
  icon: string;
  inners: string[];
};

const superiorityList: SuperiorityType[] = [
  {
    imageUrl: "/img/feature_1.jpg",
    title: translate({ message: "HOME.Features.intuitive-interaction.title" }),
    icon: "i-codicon-wand",
    inners: [
      translate({ message: "HOME.Features.intuitive-interaction.inner1" }),
      translate({ message: "HOME.Features.intuitive-interaction.inner2" }),
      translate({ message: "HOME.Features.intuitive-interaction.inner3" }),
    ],
  },
  {
    imageUrl: "/img/feature_2.jpg",
    title: translate({
      message: "HOME.Features.pre-installed-environment.title",
    }),
    icon: "i-codicon:server-environment",
    inners: [
      translate({ message: "HOME.Features.pre-installed-environment.inner1" }),
      translate({ message: "HOME.Features.pre-installed-environment.inner2" }),
      translate({ message: "HOME.Features.pre-installed-environment.inner3" }),
    ],
  },
  {
    imageUrl: "/img/feature_3.jpg",
    title: translate({ message: "HOME.Features.programming-friendly.title" }),
    icon: "i-codicon:code",
    inners: [
      translate({ message: "HOME.Features.programming-friendly.inner1" }),
      translate({ message: "HOME.Features.programming-friendly.inner2" }),
      translate({ message: "HOME.Features.programming-friendly.inner3" }),
    ],
  },

  {
    imageUrl: "/img/feature_4.jpg",
    title: translate({ message: "HOME.Features.support-sharing.title" }),
    icon: "i-codicon:globe",
    inners: [
      translate({ message: "HOME.Features.support-sharing.inner1" }),
      translate({ message: "HOME.Features.support-sharing.inner2" }),
      translate({ message: "HOME.Features.support-sharing.inner3" }),
    ],
  },
];

export const FeatureItem = ({
  imageUrl,
  title,
  inners,
  icon,
}: SuperiorityType) => {
  return (
    <div className={styles.feature}>
      <Image
        className={styles.image}
        sources={{
          light: useBaseUrl("/img/feature_1.png"),
          dark: useBaseUrl("/img/feature_1.png"),
        }}
      />
      <div className={styles.content}>
        <div className={styles.title}>
          <i className={`${icon} ${styles["sub-icon"]}`} />
          <h3 className={styles["title-text"]}>Intuitive Interaction</h3>
        </div>
        <p className="inner">
          {inners.map((inner, index) => {
            return <p key={`inner-${index}`}>{inner}</p>;
          })}
        </p>
      </div>
    </div>
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
              inners={data.inners}
            />
          );
        })}
      </div>
    </div>
  );
}
