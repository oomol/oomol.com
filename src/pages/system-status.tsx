import React from "react";
import styles from "./system-status.module.css";
import Layout from "../theme/Layout";

export default function SystemStatus(): JSX.Element {
    return (
        <Layout>
            <div className={styles.box}>
                System Status
            </div>
        </Layout>
    );
}
