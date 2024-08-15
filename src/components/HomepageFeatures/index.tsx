import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { clsx } from "clsx";

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
    title: "Intuitive interaction",
    inners: [
      "Easily build workflows with drag and drop.",
      "Users can flexibly configure node parameters through UI components.",
      "Supports preview of multiple types of commonly used data. ",
    ],
  },
  {
    imageUrl: "/img/feature_2.jpg",
    width: 540,
    title: "Pre-installed environment",
    inners: [
      "No need to worry about installing Python or Node.js running environment, it can be used right out of the box.",
      "OOMOL unifies the development environment into containers for users, and users of different systems can freely share workflows with each other.",
      "Safe isolation will not affect the user's local environment. Users also don’t have to worry about data security issues in their devices.",
    ],
  },
  {
    imageUrl: "/img/feature_3.jpg",
    width: 540,
    title: "Programming friendly",
    inners: [
      "Built-in Python, Node.js, supports installation of various open source libraries.",
      "Based on vscode framework, supports code completion, highlighting and AI code prompts",
      "With a beautiful and easy-to-use log display interface, it is convenient for engineers to debug and use.",
    ],
  },

  {
    imageUrl: "/img/feature_4.jpg",
    width: 540,
    title: "Support sharing",
    inners: [
      "Support sharing workflows and tool nodes to the OOMOL community for easy use by other users.",
      "Users can share their workflow source code with GitHub.",
      "OOMOL will be open-sourced in the oomol-lab organization, with built-in tool plug-ins, common workflows, and underlying running containers, etc.",
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
    <>
      <div className={styles.sectionTitle}>Features and Benefits</div>
      {superiorityNode}
    </>
  );
}
