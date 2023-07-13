import React from "react";
import styles from "./styles.module.scss";
import Layout from "../../theme/Layout";
import ComingSoon from "@site/src/components/ComingSoon";

export default function Index() {
    return (
        <Layout>
            <ComingSoon name={"Brand assets"}/>
        </Layout>
    );
}
