import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { translate } from "@docusaurus/Translate";
import { BlurFade } from "../magic-ui/BlurFade";
import clsx from "clsx";
import LinkBtn from "../Button/LinkBtn";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

type SuperiorityType = {
  imageUrl: string;
  title: string;
  inner: string;
  contentFirst?: boolean;
};

const superiorityList: SuperiorityType[] = [
  {
    imageUrl: "/img/pages/home/superiority-1.webp",
    title: translate({ message: "HOME.Features.intuitive-interaction.title" }),
    inner: translate({ message: "HOME.Features.intuitive-interaction.inner" }),
  },
  {
    imageUrl: "/img/pages/home/superiority-2.webp",

    title: translate({ message: "HOME.Features.programming-friendly.title" }),
    inner: translate({
      message: "HOME.Features.pre-installed-environment.inner",
    }),
  },
  {
    imageUrl: "/img/pages/home/superiority-3.webp",
    title: translate({
      message: "HOME.Features.pre-installed-environment.title",
    }),
    inner: translate({ message: "HOME.Features.programming-friendly.inner" }),
    contentFirst: true,
  },
  {
    imageUrl: "/img/pages/home/superiority-4.webp",
    title: translate({ message: "HOME.Features.support-sharing.title" }),
    inner: translate({ message: "HOME.Features.support-sharing.inner" }),
    contentFirst: true,
  },
  {
    imageUrl: "/img/pages/home/superiority-5.webp",
    title: translate({ message: "HOME.Features.block-sharing.title" }),
    inner: translate({ message: "HOME.Features.block-sharing.inner" }),
    contentFirst: true,
  },
];

export const FeatureItem = ({
  title,
  imageUrl,
  inner,
  contentFirst = false,
}: SuperiorityType) => {
  return (
    <BlurFade className={styles["feature-blur-fade"]}>
      <div
        className={clsx(styles.feature, {
          [styles.contentFirst]: contentFirst,
        })}
      >
        <Image
          className={styles.image}
          sources={{
            light: useBaseUrl(imageUrl),
            dark: useBaseUrl(imageUrl),
          }}
        />
        <div className={styles.content}>
          <div className={styles.title}>
            <h3 className={styles["title-text"]}>{title}</h3>
          </div>
          <p className={styles.inner}>{inner}</p>
        </div>
      </div>
    </BlurFade>
  );
};

export default function HomepageFeatures() {
  const context: any = useDocusaurusContext();
  const { i18n } = context;
  return (
    <section className={styles.container}>
      <div className={styles.titleBox}>
        <div className={styles.sectionTitle}>
          {translate({
            message: "HOME.Features.title",
          })}
        </div>
        <span className={styles.sectionSubtitle}>
          {translate({
            message: "HOME.Features.subtitle",
          })}
        </span>
      </div>
      <div className={styles.list}>
        {superiorityList.map((data, index) => {
          return (
            <FeatureItem
              key={`feature-${index}`}
              imageUrl={data.imageUrl}
              title={data.title}
              inner={data.inner}
              contentFirst={data.contentFirst}
            />
          );
        })}
      </div>
      <LinkBtn
        text={translate({ message: "HOME.Features.linkBtn-text" })}
        icon="i-codicon-arrow-right"
        url={
          i18n.currentLocale === "zh-CN"
            ? "https://oomol.com/zh-CN/features"
            : "https://oomol.com/features"
        }
      />
    </section>
  );
}
