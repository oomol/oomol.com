import styles from "./styles.module.scss";

import React from "react";
import { translate } from "@docusaurus/Translate";
import LinkBtn from "../Button/LinkBtn";

type ProjectsData = {
  imgUrl: string;
  url: string;
};

// TODO: add zh-CN url
const projectsData: ProjectsData[] = [
  {
    imgUrl: "/img/pages/home/project-1.png",
    url: "https://hub.oomol.com/package/videos-translater",
  },
  {
    imgUrl: "/img/pages/home/project-2.png",
    url: "https://hub.oomol.com/package/pdf-craft-starter",
  },
  {
    imgUrl: "/img/pages/home/project-3.png",
    url: "https://hub.oomol.com/package/ffmpeg",
  },
  {
    imgUrl: "/img/pages/home/project-4.png",
    url: "https://hub.oomol.com/package/data-lab",
  },
  {
    imgUrl: "/img/pages/home/project-5.png",
    url: "https://hub.oomol.com/package/default",
  },
  {
    imgUrl: "/img/pages/home/project-6.png",
    url: "https://hub.oomol.com/package/oomol-transform",
  },
  {
    imgUrl: "/img/pages/home/project-7.png",
    url: "https://hub.oomol.com/package/tiny-png",
  },
  {
    imgUrl: "/img/pages/home/project-8.png",
    url: "https://hub.oomol.com/package/mineru",
  },
  {
    imgUrl: "/img/pages/home/project-9.png",
    url: "https://hub.oomol.com/package/whisper",
  },
  {
    imgUrl: "/img/pages/home/project-10.png",
    url: "https://hub.oomol.com/package/siliconflow",
  },
  {
    imgUrl: "/img/pages/home/project-11.png",
    url: "https://hub.oomol.com/package/v2ex-lottery",
  },
  {
    imgUrl: "/img/pages/home/project-12.png",
    url: "https://hub.oomol.com/package/manga-translator",
  },
];

interface ProjectItemProps extends ProjectsData {
  itemIndex: number;
}

const ProjectItem = ({ imgUrl, url, itemIndex }: ProjectItemProps) => {
  const title = translate({
    message: `HOME.Guide.project-${itemIndex + 1}.title`,
  });

  const description = translate({
    message: `HOME.Guide.project-${itemIndex + 1}.description`,
  });

  return (
    <div className={styles.project} onClick={() => window.open(url)}>
      <img className={styles.image} src={imgUrl} alt={title} />
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
};

export default function HomepageGuide() {
  return (
    <section className={styles.container}>
      <h2 className={styles["section-title"]}>
        {" "}
        {translate({ message: "HOME.Guide.title" })}
      </h2>
      <p className={styles.subtitle}>
        {translate({ message: "HOME.Guide.subtitle" })}
      </p>
      <div className={styles.projects}>
        {projectsData.map((project, index) => (
          <ProjectItem {...project} key={index} itemIndex={index} />
        ))}
      </div>
      <LinkBtn
        text={translate({ message: "HOME.Guide.link-button-text" })}
        iconPos="right"
        iconType="arrow-right"
        url="https://hub.oomol.com"
      />
    </section>
  );
}
