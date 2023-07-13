import React from 'react';
import styles from './styles.module.scss';
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

const superiorityList = [
    {
        imageUrl: "/img/workflow.svg",
        width: 300,
        title: "Coding & Workflow Orchestration",
        inner: "Inherit the perfect programming experience of vscode, and support visual Workflow at the same time Organize logically. It is possible to have the best authoring and orchestration experience all within one tool at the same time.",
    },
    {
        imageUrl: "/img/data.svg",
        width: 360,
        title: "Multilingual & Data processing, Rendering",
        inner: "Common development language and related language libraries can be used for data processing, and even cross-language cooperation is possible. The processed data can be rendered through the built-in graphics package, and if the built-in is not satisfied, it can also support community expansion. Processing data and graphical display export can be best experienced in one tool.",
    },
    {
        imageUrl: "/img/interactive.svg",
        width: 360,
        title: "Collaborate & Manage & Share",
        inner: "Natively supports the collaborative development tool git commonly used by the community to manage projects. Provide OOMOL The open source sharing community of Workflow function facilitates communication among developers. Let good ideas and innovations be seen by more people and used by more projects.",
    },
    {
        imageUrl: "/img/cloud.svg",
        width: 360,
        title: "Local & Cloud",
        inner: "本地使用更加安全、轻量和经济。 云端部署可以很方便地分享给他人使用，且支持长时间大算力的处理数据。 使用 Oomol 本地调试通过之后可以轻松的部署到云端，将调试脚本变为高可用的服务。 用户可以专注于构建数学模型以及自动化流程，而部署和运维可以交给我们。",
    },
    {
        imageUrl: "/img/open-source.svg",
        width: 320,
        title: "Kernel Open Source & Data Security",
        inner: "The core of the orchestration engine, vocana, is open source and supports use based on vscode plug-ins. Data usage complies with GDPR requirements. Provides secure and trusted productivity tools.",
    },
];
export default function HomepageFeatures() {
    const superiorityNode = superiorityList.map((data, index) => {
        if (isOdd(index)) {
            return (
                <div className={styles.sectionTwo} key={`${index}`}>
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
                                    {data.inner}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.sectionTwo} key={`${index}`}>
                    <div className={styles.sectionTwoBox}>
                        <div className={styles.sectionTwoLarge}>
                            <div className={styles.sectionTwoLargeBox}>
                                <div className={styles.sectionTwoLargeTitle}>
                                    {data.title}
                                </div>
                                <div className={styles.sectionTwoLargeInner}>
                                    {data.inner}
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
    function isOdd(num) {
        return num % 2 !== 0;
    }
    return (
        <>
            <div className={styles.sectionTitle}>The superiority of product design</div>
            {superiorityNode}
        </>
    );
}
