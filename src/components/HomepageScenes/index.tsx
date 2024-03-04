import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

type ScenesDataType = {
  imageUrl: string;
  title: string;
  inner: string;
};

const scenesData: ScenesDataType[] = [
  {
    imageUrl: "/img/ai.jpg",
    title: "Creative Arts Inspiration",
    inner:
      "By leveraging Oomol Studio's visual configurations for Stable Diffusion AI models, artists can significantly enhance their creative process, as it simplifies the otherwise complex task of using Stable Diffusion, empowering them to effortlessly explore unique and visually stunning inspirations from descriptive text.",
  },
  {
    imageUrl: "/img/data.jpg",
    title: "Data Processing and Analysis",
    inner:
      "Data scientists enhance their work by using Oomol Studio, which supports multiple languages like Python, JavaScript, and R, allowing them to leverage the strengths of each language's ecosystem, and seamlessly deploy their projects to the cloud for easy collaboration with co-workers.",
  },
];
export default function HomepageScenes() {
  const scenesNodes = scenesData.map((data, index) => {
    return (
      <div className={styles.sectionCell} key={`scenes-${index}`}>
        <Image
          style={{ width: "100%" }}
          sources={{
            light: useBaseUrl(data.imageUrl),
            dark: useBaseUrl(data.imageUrl),
          }}
        />
        <div className={styles.scenesText}>
          <div className={styles.scenesTextTitle}>{data.title}</div>
          <div className={styles.scenesTextInner}>{data.inner}</div>
        </div>
      </div>
    );
  });
  return (
    <div className={styles.scenes}>
      <div className={styles.sectionTitle}>Productivity, Improved</div>
      <div className={styles.sectionInner}>{scenesNodes}</div>
    </div>
  );
}
