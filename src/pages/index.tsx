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
import HomepageDownloads from "@site/src/components/HomepageDownloads";
import HomepageScenes from "@site/src/components/HomepageScenes";

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
                                            <Link to={"/download"}>
                                                <Button className={styles.sectionOneBtn} size="large"
                                                        shape="round">
                                                    <Translate>Download</Translate>
                                                </Button>
                                            </Link>
                                            <Button
                                                className={styles.sectionOneBtn}
                                                href={"https://console.oomol.com/"}
                                                target="_blank"
                                                type="primary"
                                                size="large"
                                                shape="round">
                                                Get Started
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
                    <HomepageScenes/>
                    <HomepageFeatures/>
                    <HomepageDownloads/>
                    <Analytics/>
                </main>
            </Layout>
        )
    );
}
