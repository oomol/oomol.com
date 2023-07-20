import React from "react";
import Link from "@docusaurus/Link";
import {Analytics} from "@vercel/analytics/react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "../theme/Layout";
import styles from "./index.module.scss";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Translate from "@docusaurus/Translate";
import {Button} from 'antd';
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
                            <div className={styles.sectionOneMid}>
                                <div className={styles.sectionOneText}>
                                    <div className={styles.sectionOneTextBox}>
                                        <div className={styles.sectionOneTextTitle}>
                                            Seamlessly connects code and services.
                                        </div>
                                        <div className={styles.sectionOneTextInner}>
                                            OOMOL is a robust workflow automation platform that effortlessly connects
                                            code and services through intuitive visual interactions, while also allowing
                                            seamless code integration.
                                        </div>
                                        <div className={styles.sectionOneBtnBox}>
                                            <Link to={"/download"}>
                                                <Button className={styles.sectionOneBtn} size="large"
                                                        shape="round">
                                                    Download
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
                                        style={{width: 900, paddingTop: 50}}
                                        sources={{
                                            light: useBaseUrl("/img/oomol_studio.png"),
                                            dark: useBaseUrl("/img/oomol_studio.png"),
                                        }}
                                    />
                                </div>
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
