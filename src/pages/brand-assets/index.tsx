import React from "react";
import styles from "./styles.module.scss";
import Layout from "../../theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Image from "@theme/ThemedImage";
import HomepageStarter from "@site/src/components/HomepageStarter";

export default function Index() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.title}>Brand assets</div>
          <div className={styles["sub-title"]}>
            Download official Oomol logos
          </div>
          <div className={styles.details}>
            All Oomol trademarks,logos, or other brand elements can never be
            modified or used for
            <br />
            any other purpose other than to represent Oomol Inc.
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles["card-left"]}>
            <Image
              className={styles["card-brand"]}
              sources={{
                light: useBaseUrl("/img/brand.png"),
                dark: useBaseUrl("/img/brand.png"),
              }}
            />
          </div>
          <div className={styles["card-right"]}>
            <div className={styles.name}>Oomol logos</div>
            <div className={styles.script}>
              Download Oomol official logos, including as SVG's, in both light
              and dark theme.
              <br />
              Do not use any other color for the wordmark.
            </div>
            <div>
              {/* TODO: 重构组件后删除此注释 */}
              {/* <button icon={<IconDownload />}>Download logo kit</button> */}
              <button>Download logo kit</button>
            </div>
          </div>
        </div>
      </div>
      <HomepageStarter />
    </Layout>
  );
}
