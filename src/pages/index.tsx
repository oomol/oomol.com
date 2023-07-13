import React from "react";
import Link from "@docusaurus/Link";
import {Analytics} from "@vercel/analytics/react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "../theme/Layout";
import styles from "./index.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Translate, {translate} from "@docusaurus/Translate";
import {Button, ConfigProvider} from 'antd';
import {DownloadOutlined} from "@ant-design/icons";
import { createCache, extractStyle } from '@ant-design/cssinjs';
import CustomAntdTheme from '../utils/customAntdTheme';
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HomepageDownload from "@site/src/components/HomepageDownload";

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        CustomAntdTheme(
            <Layout>
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
                                                OOMOL is a workflow authoring and orchestration tool. Provides a
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
                                        Diffusion, and deeply integrated OOMOL
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
                    <HomepageFeatures/>
                    <HomepageDownload/>
                    <Analytics/>
                </main>
            </Layout>
        )
    );
}
