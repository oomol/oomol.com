import React from "react";
import styles from "./styles.module.scss";
import Layout from "../../theme/Layout";

export default function Index() {
    return (
        <Layout>
            <div className={styles.box}>
                System Status
            </div>
        </Layout>
    );
}
