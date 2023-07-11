import React from "react";
import styles from "./system-status.module.css";
import Layout from "../theme/Layout";

export default function SystemStatus() {
    return (
        <Layout>
            <div className={styles.box}>
                System Status
            </div>
        </Layout>
    );
}
