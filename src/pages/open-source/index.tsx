import React from "react";
import Layout from "../../theme/Layout";
import styles from "./styles.module.scss";
import ComingSoon from "@site/src/components/ComingSoon";

export default function Index() {
    return (
        <Layout>
            <div className={styles.box}>
                open source
            </div>
            <ComingSoon name={"Open source"}/>
        </Layout>
    );
}
