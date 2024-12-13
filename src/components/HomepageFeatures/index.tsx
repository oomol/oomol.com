import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { clsx } from "clsx";
import { translate } from "@docusaurus/Translate";

export const FeatureItem = () => {
  return (
    <div className={styles.feature}>
      <Image
        className={styles.image}
        sources={{
          light: useBaseUrl("/img/feature_1.png"),
          dark: useBaseUrl("/img/feature_1.png"),
        }}
      />
      <div className="content">
        <div className="title">
          <i className="i-codicon-wand" />
          <h3 className="sub-title">Intuitive Interaction</h3>
        </div>
        <p className="inner">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
};

type SuperiorityType = {
  imageUrl: string;
  width: number;
  title: string;
  inners: string[];
};

const superiorityList: SuperiorityType[] = [
  {
    imageUrl: "/img/feature_1.jpg",
    width: 540,
    title: translate({ message: "HOME.Features.intuitive-interaction.title" }),
    inners: [
      translate({ message: "HOME.Features.intuitive-interaction.inner1" }),
      translate({ message: "HOME.Features.intuitive-interaction.inner2" }),
      translate({ message: "HOME.Features.intuitive-interaction.inner3" }),
    ],
  },
  {
    imageUrl: "/img/feature_2.jpg",
    width: 540,
    title: translate({
      message: "HOME.Features.pre-installed-environment.title",
    }),
    inners: [
      translate({ message: "HOME.Features.pre-installed-environment.inner1" }),
      translate({ message: "HOME.Features.pre-installed-environment.inner2" }),
      translate({ message: "HOME.Features.pre-installed-environment.inner3" }),
    ],
  },
  {
    imageUrl: "/img/feature_3.jpg",
    width: 540,
    title: translate({ message: "HOME.Features.programming-friendly.title" }),
    inners: [
      translate({ message: "HOME.Features.programming-friendly.inner1" }),
      translate({ message: "HOME.Features.programming-friendly.inner2" }),
      translate({ message: "HOME.Features.programming-friendly.inner3" }),
    ],
  },

  {
    imageUrl: "/img/feature_4.jpg",
    width: 540,
    title: translate({ message: "HOME.Features.support-sharing.title" }),
    inners: [
      translate({ message: "HOME.Features.support-sharing.inner1" }),
      translate({ message: "HOME.Features.support-sharing.inner2" }),
      translate({ message: "HOME.Features.support-sharing.inner3" }),
    ],
  },
];

function isOdd(num) {
  return num % 2 !== 0;
}

export default function HomepageFeatures() {
  const superiorityNode = superiorityList.map((data, index) => {
    const innerNodes = data.inners.map((inner, index) => {
      return (
        <div className={styles.sectionList} key={`inner-${index}`}>
          {inner}
        </div>
      );
    });
    if (isOdd(index)) {
      return (
        <div
          className={clsx(
            styles.sectionTwo,
            isOdd(index) && styles.evenSectionTwo
          )}
          key={`${index}`}
        >
          <div className={styles.sectionTwoBox}>
            <div className={styles.sectionTwoSmall}>
              <Image
                style={{ width: data.width, borderRadius: 8 }}
                sources={{
                  light: useBaseUrl(data.imageUrl),
                  dark: useBaseUrl(data.imageUrl),
                }}
              />
            </div>
            <div className={styles.sectionTwoLarge}>
              <div className={styles.sectionTwoLargeBox}>
                <div className={styles.sectionTwoLargeTitle}>{data.title}</div>
                <div className={styles.sectionTwoLargeInner}>{innerNodes}</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={clsx(
            styles.sectionTwo,
            isOdd(index) && styles.evenSectionTwo
          )}
          key={`${index}`}
        >
          <div className={styles.sectionTwoBox}>
            <div className={styles.sectionTwoLarge}>
              <div className={styles.sectionTwoLargeBox}>
                <div className={styles.sectionTwoLargeTitle}>{data.title}</div>
                <div className={styles.sectionTwoLargeInner}>{innerNodes}</div>
              </div>
            </div>
            <div className={styles.sectionTwoSmall}>
              <Image
                style={{ width: data.width, borderRadius: 8 }}
                sources={{
                  light: useBaseUrl(data.imageUrl),
                  dark: useBaseUrl(data.imageUrl),
                }}
              />
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>
        <i className="i-codicon-symbol-misc" />
        {translate({
          message: "HOME.Features.title",
        })}
      </div>
      {superiorityNode}
      {/* <FeatureItem /> */}
    </div>
  );
}
