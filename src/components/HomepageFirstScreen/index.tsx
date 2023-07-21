import React from "react";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";
import {Button} from "antd";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

const data = {
    slogan: "Seamlessly connects code and services.",
    script: "OOMOL is a robust workflow automation platform that effortlessly connects code and services through intuitive visual interactions, while also allowing seamless code integration.",
};
export default function HomepageFirstScreen() {
    return (
        <div className={styles.sectionOne}>
            <div className={styles.sectionOneBox}>
                <div className={styles.sectionOneMid}>
                    <div className={styles.sectionOneText}>
                        <div className={styles.sectionOneTextBox}>
                            <div className={styles.sectionOneTextTitle}>
                                {data.slogan}
                            </div>
                            <div className={styles.sectionOneTextInner}>
                                {data.script}
                            </div>
                            <div className={styles.sectionOneBtnBox}>
                                <Button href="#download" className={styles.sectionOneBtn} size="large"
                                        shape="round">
                                    Download
                                </Button>
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
            </div>
        </div>
    );
}
