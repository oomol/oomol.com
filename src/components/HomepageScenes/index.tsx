import React from "react";
import styles from "./styles.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

type ScenesDataType = {
    imageUrl: string,
    title: string,
    inner: string,
};

const scenesData: ScenesDataType[] = [
    {
        imageUrl: "/img/ai.jpg",
        title: "AI scene support",
        inner: "Built-in generative AI open source libraries such as LangChain and Stable Diffusion, and deeply integrated OOMOL visual workflow. Developers can start projects quickly and expand development flexibly.",
    },
    {
        imageUrl: "/img/data.jpg",
        title: "Data Processing and Analysis",
        inner: "It supports multiple languages such as Python, JavaScript, and R to be used in conjunction to give full play to the advantages of each language ecology. And it can be deployed to the cloud with one click, so that it can be easily shared with others.",
    },
];
export default function HomepageScenes() {
    const scenesNodes = scenesData.map((data, index) => {
        return (
            <div className={styles.sectionCell} key={`scenes-${index}`}>
                <div className={styles.scenesImage}>
                    <Image
                        style={{width: "100%"}}
                        sources={{
                            light: useBaseUrl(data.imageUrl),
                            dark: useBaseUrl(data.imageUrl),
                        }}
                    />
                </div>
                <div className={styles.scenesText}>
                    <div className={styles.scenesTextTitle}>
                        {data.title}
                    </div>
                    <div className={styles.scenesTextInner}>
                        {data.inner}
                    </div>
                </div>
            </div>
        );
    })
    return (
        <div className={styles.scenes}>
            <div className={styles.sectionTitle}>
                Use Scenarios to Improve Efficiency
            </div>
            <div className={styles.sectionInner}>
                {scenesNodes}
            </div>
        </div>
    );
}
