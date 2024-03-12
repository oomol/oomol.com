import React from "react";
import styles from "./styles.module.scss";
import Layout from "../../theme/Layout";
import HomepageStarter from "@site/src/components/HomepageStarter";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Image from "@theme/ThemedImage";

export default function Index() {
  return (
    <Layout>
      <div className={styles.box}>
        <div className={styles.about}>
          <div className={styles["about-left"]}>
            <div className={styles.title}>About OOMOL</div>
            <div className={styles.description}>
              OOMOL is a robust workflow automation platform that effortlessly
              connects code and services through intuitive visual interactions,
              while also allowing seamless code integration.
            </div>
          </div>
          <div className={styles["about-right"]}>
            <Image
              style={{ width: 720 }}
              sources={{
                light: useBaseUrl("/img/oomol_studio.jpeg"),
                dark: useBaseUrl("/img/oomol_studio.jpeg"),
              }}
            />
          </div>
        </div>
      </div>
      <HomepageStarter />
    </Layout>
  );
}
