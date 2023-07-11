import React from "react";
import styles from "./brand-assets.module.css";
import Layout from "../theme/Layout";

export default function BrandAssets(): JSX.Element {
    return (
        <Layout>
            <div className={styles.box}>
                Brand Assets
            </div>
        </Layout>
    );
}
