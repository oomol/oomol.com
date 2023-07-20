import React from 'react';
import styles from './styles.module.scss';
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { clsx } from 'clsx';


type SuperiorityType = {
    imageUrl: string,
    width: number,
    title: string,
    inners: string[],
};

const superiorityList: SuperiorityType[] = [
    {
        imageUrl: "/img/data.svg",
        width: 360,
        title: "Easy Kick-Start",
        inners: [
            "Get started swiftly with an out-of-the-box environment and adaptable customization options.",
            "Code only when necessary, keeping simplicity at the forefront.",
            "Experience cross-platform compatibility and multi-language support, with LSP syntax highlighting and code completion.",
        ],
    },
    {
        imageUrl: "/img/cloud.svg",
        width: 360,
        title: "Seamless Scalability",
        inners: [
            "Effortlessly scale from a single machine to clusters without any code modifications.",
            "Deploy directly to OOMOL Cloud for seamless expansion.",
        ],
    },
    {
        imageUrl: "/img/interactive.svg",
        width: 360,
        title: "Thriving Ecosystem",
        inners: [
            "Join an inclusive community where sharing workflows is a breeze.",
            "Explore a rich assortment of built-in apps to suit diverse needs.",
            "Unlock the potential of composability with existing packages or services using just a YAML file.",
        ],
    },
    {
        imageUrl: "/img/open-source.svg",
        width: 320,
        title: "Fortified Security Measures",
        inners: [
            "Ensure utmost security with workflows running in isolated environments",
            "Benefit from effective secrets management for added protection.",
            "The Vocana engine, responsible for the workflow runtime, is open-sourced to ensure transparency and reliability.",
        ],
    },
];

function isOdd(num) {
    return num % 2 !== 0;
}

export default function HomepageFeatures() {
    const superiorityNode = superiorityList.map((data, index) => {
        // const reverseWrapEven = index % 2 !== 0;
        const innerNodes = data.inners.map((inner, index) => {
            return (
                <li key={`inner-${index}`}>
                    {inner}
                </li>
            );
        });
        if (isOdd(index)) {
            return (
                <div className={clsx(
                    styles.sectionTwo,
                    isOdd(index) && styles.evenSectionTwo
                )} key={`${index}`}>
                    <div className={styles.sectionTwoBox}>
                        <div className={styles.sectionTwoSmall}>
                            <Image
                                style={{width: data.width}}
                                sources={{
                                    light: useBaseUrl(data.imageUrl),
                                    dark: useBaseUrl(data.imageUrl),
                                }}
                            />
                        </div>
                        <div className={styles.sectionTwoLarge}>
                            <div className={styles.sectionTwoLargeBox}>
                                <div className={styles.sectionTwoLargeTitle}>
                                    {data.title}
                                </div>
                                <div className={styles.sectionTwoLargeInner}>
                                    {innerNodes}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={clsx(
                    styles.sectionTwo,
                    isOdd(index) && styles.evenSectionTwo
                )} key={`${index}`}>
                    <div className={styles.sectionTwoBox}>
                        <div className={styles.sectionTwoLarge}>
                            <div className={styles.sectionTwoLargeBox}>
                                <div className={styles.sectionTwoLargeTitle}>
                                    {data.title}
                                </div>
                                <div className={styles.sectionTwoLargeInner}>
                                    {innerNodes}
                                </div>
                            </div>
                        </div>
                        <div className={styles.sectionTwoSmall}>
                            <Image
                                style={{width: data.width}}
                                sources={{
                                    light: useBaseUrl(data.imageUrl),
                                    dark: useBaseUrl(data.imageUrl),
                                }}
                            />
                        </div>
                    </div>
                </div>
            )
        }
    });

    return (
        <>
            <div className={styles.sectionTitle}>The superiority of product design</div>
            {superiorityNode}
        </>
    );
}
