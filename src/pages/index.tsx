import React from "react";
import Link from "@docusaurus/Link";
import {Analytics} from "@vercel/analytics/react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "../theme/Layout";
import styles from "./index.module.css";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Translate, {translate} from "@docusaurus/Translate";
import {Button, ConfigProvider} from 'antd';
import {DownloadOutlined} from "@ant-design/icons";

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: "#7d7fe9",
            }
        }}>
            <Layout
                // title={`Hello from ${siteConfig.title}`}
                // description="Description will go into a meta tag in <head />"
            >
                {/*<HomepageHeader />*/}
                <main>
                    <div className={styles.sectionOne}>
                        <div className={styles.sectionOneBox}>
                            <div className={styles.sectionOneSide}>
                                <Image
                                    style={{width: 380, marginRight: 88}}
                                    sources={{
                                        light: useBaseUrl("/img/side_left.svg"),
                                        dark: useBaseUrl("/img/side_left.svg"),
                                    }}
                                />
                            </div>
                            <div className={styles.sectionOneMid}>
                                <div className={styles.sectionOneText}>
                                    <div className={styles.sectionOneTextBox}>
                                        <div className={styles.sectionOneTextTitle}>
                                            <Translate>
                                                Easily connect code and services
                                            </Translate>
                                        </div>
                                        <div className={styles.sectionOneTextInner}>
                                            <Translate>
                                                OOMOL STUDIO is a workflow authoring and orchestration tool. Provides a
                                                variety of programming language operating environments, built-in rich
                                                tool suites, and supports containers and cloud-native.
                                            </Translate>
                                        </div>
                                        <div className={styles.sectionOneBtnBox}>
                                            <Button className={styles.sectionOneBtn} size="large"
                                                    shape="round">
                                                <Translate>Download</Translate>
                                            </Button>
                                            <Button className={styles.sectionOneBtn} type="primary" size="large" shape="round">
                                                <Translate>Get Started</Translate>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.sectionOneImageBox}>
                                    <Image
                                        className={styles.sectionOneImage}
                                        sources={{
                                            light: useBaseUrl("/img/oomol_studio.png"),
                                            dark: useBaseUrl("/img/oomol_studio.png"),
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={styles.sectionOneSide}>
                                <Image
                                    style={{width: 380, marginLeft: 88}}
                                    sources={{
                                        light: useBaseUrl("/img/side_right.svg"),
                                        dark: useBaseUrl("/img/side_right.svg"),
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.scenes}>
                        <div className={styles.sectionTitle}>
                            Use Scenarios to Improve Efficiency
                        </div>
                        <div className={styles.sectionInner}>
                            <div className={styles.sectionCell}>
                                <div className={styles.scenesImage}>
                                    <Image
                                        style={{width: "100%"}}
                                        sources={{
                                            light: useBaseUrl("/img/ai.jpg"),
                                            dark: useBaseUrl("/img/ai.jpg"),
                                        }}
                                    />
                                </div>
                                <div className={styles.scenesText}>
                                    <div className={styles.scenesTextTitle}>AI scene support</div>
                                    <div className={styles.scenesTextInner}>
                                        Built-in generative AI open source libraries such as LangChain and Stable
                                        Diffusion, and deeply integrated OOMOL STUDIO
                                        visual workflow. Developers can start projects quickly and expand development
                                        flexibly.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.sectionCell}>
                                <div className={styles.scenesImage}>
                                    <Image
                                        style={{width: "100%"}}
                                        sources={{
                                            light: useBaseUrl("/img/data.jpg"),
                                            dark: useBaseUrl("/img/data.jpg"),
                                        }}
                                    />
                                </div>
                                <div className={styles.scenesText}>
                                    <div className={styles.scenesTextTitle}>Data Processing and Analysis</div>
                                    <div className={styles.scenesTextInner}>
                                        It supports multiple languages such as Python, JavaScript, and R to be used in
                                        conjunction to give full play to the advantages of each language ecology. And it
                                        can be deployed to the cloud with one click, so that it can be easily shared
                                        with others.
                                    </div>
                                </div>
                            </div>
                            {/*<div className={styles.sectionCell}>*/}
                            {/*    <div className={styles.scenesImage}>*/}
                            {/*        <Image*/}
                            {/*            style={{width: "100%"}}*/}
                            {/*            sources={{*/}
                            {/*                light: useBaseUrl("/img/trade.jpg"),*/}
                            {/*                dark: useBaseUrl("/img/trade.jpg"),*/}
                            {/*            }}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*    <div className={styles.scenesText}>*/}
                            {/*        <div className={styles.scenesTextTitle}>轻松实现量化交易模型</div>*/}
                            {/*        <div className={styles.scenesTextInner}>*/}
                            {/*            原生支持 Langchain, 并且内置各种 AI 服务套件*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <div className={styles.sectionTwo}>
                        <div className={styles.sectionTitle}>The superiority of product design</div>
                        <div className={styles.sectionTwoBox}>
                            <div className={styles.sectionTwoSmall}>
                                <Image
                                    style={{width: 300}}
                                    sources={{
                                        light: useBaseUrl("/img/workflow.svg"),
                                        dark: useBaseUrl("/img/workflow.svg"),
                                    }}
                                />
                            </div>
                            <div className={styles.sectionTwoLarge}>
                                <div className={styles.sectionTwoLargeBox}>
                                    <div className={styles.sectionTwoLargeTitle}>
                                        Coding & Workflow Orchestration
                                    </div>
                                    <div className={styles.sectionTwoLargeInner}>
                                        Inherit the perfect programming experience of vscode, and support visual
                                        Workflow at the same time
                                        Organize logically. It is possible to have the best authoring and orchestration
                                        experience all within one tool at the same time.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.sectionTwo}>
                        <div className={styles.sectionTwoBox}>
                            <div className={styles.sectionTwoLarge}>
                                <div className={styles.sectionTwoLargeBox}>
                                    <div className={styles.sectionTwoLargeTitle}>
                                        Multilingual & Data processing, Rendering
                                    </div>
                                    <div className={styles.sectionTwoLargeInner}>
                                        Common development language and related language libraries can be used for
                                        data processing, and even cross-language cooperation is possible.
                                        The processed data can be rendered through the built-in graphics package, and if
                                        the built-in is not satisfied, it can also support community expansion.
                                        Processing data and graphical display export can be best experienced in one
                                        tool.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.sectionTwoSmall}>
                                <Image
                                    style={{width: 360}}
                                    sources={{
                                        light: useBaseUrl("/img/data.svg"),
                                        dark: useBaseUrl("/img/data.svg"),
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.sectionTwo}>
                        <div className={styles.sectionTwoBox}>
                            <div className={styles.sectionTwoSmall}>
                                <Image
                                    style={{width: 360}}
                                    sources={{
                                        light: useBaseUrl("/img/interactive.svg"),
                                        dark: useBaseUrl("/img/interactive.svg"),
                                    }}
                                />
                            </div>
                            <div className={styles.sectionTwoLarge}>
                                <div className={styles.sectionTwoLargeBox}>
                                    <div className={styles.sectionTwoLargeTitle}>
                                        Collaborate & Manage & Share
                                    </div>
                                    <div className={styles.sectionTwoLargeInner}>
                                        Natively supports the collaborative development tool git commonly used by the
                                        community to manage projects. Provide OOMOL STUDIO
                                        The open source sharing community of Workflow function facilitates communication
                                        among developers.
                                        Let good ideas and innovations be seen by more people and used by more projects.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.sectionTwo}>
                        <div className={styles.sectionTwoBox}>
                            <div className={styles.sectionTwoLarge}>
                                <div className={styles.sectionTwoLargeBox}>
                                    <div className={styles.sectionTwoLargeTitle}>Local & Cloud</div>
                                    <div className={styles.sectionTwoLargeInner}>
                                        本地使用更加安全、轻量和经济。
                                        云端部署可以很方便地分享给他人使用，且支持长时间大算力的处理数据。
                                        使用 Oomol Studio
                                        本地调试通过之后可以轻松的部署到云端，将调试脚本变为高可用的服务。
                                        用户可以专注于构建数学模型以及自动化流程，而部署和运维可以交给我们。
                                    </div>
                                </div>
                            </div>
                            <div className={styles.sectionTwoSmall}>
                                <Image
                                    style={{width: 360}}
                                    sources={{
                                        light: useBaseUrl("/img/cloud.svg"),
                                        dark: useBaseUrl("/img/cloud.svg"),
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.sectionTwo}>
                        <div className={styles.sectionTwoBox}>
                            <div className={styles.sectionTwoSmall}>
                                <Image
                                    style={{width: 320}}
                                    sources={{
                                        light: useBaseUrl("/img/opensource.svg"),
                                        dark: useBaseUrl("/img/opensource.svg"),
                                    }}
                                />
                            </div>
                            <div className={styles.sectionTwoLarge}>
                                <div className={styles.sectionTwoLargeBox}>
                                    <div className={styles.sectionTwoLargeTitle}>
                                        Kernel Open Source & Data Security
                                    </div>
                                    <div className={styles.sectionTwoLargeInner}>
                                        The core of the orchestration engine, vocana, is open source and supports use
                                        based on vscode plug-ins. Data usage complies with GDPR requirements. Provides
                                        secure and trusted productivity tools.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.sectionDownload}>
                        <div className={styles.sectionDownloadCellBox}>
                            <div className={styles.sectionDownloadCell}>
                                <Image
                                    style={{width: 80}}
                                    sources={{
                                        light: useBaseUrl("/img/windows.svg"),
                                        dark: useBaseUrl("/img/windows.svg"),
                                    }}
                                />
                            </div>
                            <Button icon={<DownloadOutlined/>}>Windows</Button>
                        </div>
                        <div className={styles.sectionDownloadCellBox}>
                            <div className={styles.sectionDownloadCell}>
                                <Image
                                    style={{width: 120}}
                                    sources={{
                                        light: useBaseUrl("/img/linux.svg"),
                                        dark: useBaseUrl("/img/linux.svg"),
                                    }}
                                />
                            </div>
                            <Button icon={<DownloadOutlined/>}>Linux</Button>
                        </div>
                        <div className={styles.sectionDownloadCellBox}>
                            <div className={styles.sectionDownloadCell}>
                                <Image
                                    style={{width: 100}}
                                    sources={{
                                        light: useBaseUrl("/img/macos.svg"),
                                        dark: useBaseUrl("/img/macos.svg"),
                                    }}
                                />
                            </div>
                            <Button icon={<DownloadOutlined/>}>MacOS</Button>
                        </div>
                    </div>
                    <Analytics/>
                </main>
            </Layout>
        </ConfigProvider>
    );
}
