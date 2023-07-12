import React from "react";
import styles from "./support.module.css";
import Layout from "../theme/Layout";
import {Button} from "antd";

export default function AboutUs() {
    return (
        <Layout>
            <div className={styles.supportBox}>
                <div className={styles.supportTitle}>
                    support
                </div>
                <div className={styles.supportCellBox}>
                    <div className={styles.supportCell}>
                        <div className={styles.title}>Discord Support</div>
                        <div className={styles.inner}>
                            <div className={styles.text}>
                                We offer email based support. If you need SLAs, guaranteed response times, or have an issue,
                                please contact us here.
                            </div>
                            <Button>Join Discord</Button>
                        </div>
                    </div>
                    <div className={styles.supportCell}>
                        <div className={styles.title}>Email Support</div>
                        <div className={styles.inner}>
                            <div className={styles.text}>
                                We offer email based support. If you need SLAs, guaranteed response times, or have an issue,
                                please contact us here.
                            </div>
                            <Button>Email To Us</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
