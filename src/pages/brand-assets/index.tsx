import React from "react";
import styles from "./styles.module.scss";
import Layout from "../../theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Image from "@theme/ThemedImage";
import HomepageStarter from "@site/src/components/HomepageStarter";
import { translate } from "@docusaurus/Translate";
import { Button } from "@site/src/components/Button";

export default function Index() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.title}>
            {translate({ message: "HOME.BrandAssets.title" })}
          </div>
          <div className={styles["sub-title"]}>
            {translate({ message: "HOME.BrandAssets.subtitle" })}
          </div>
          <div className={styles.details}>
            {translate({ message: "HOME.BrandAssets.details-1" })}
            <br />
            {translate({ message: "HOME.BrandAssets.details-2" })}
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
            <div className={styles.name}>
              {" "}
              {translate({ message: "HOME.BrandAssets.logo-name" })}
            </div>
            <div className={styles.script}>
              {translate({ message: "HOME.BrandAssets.scripts-1" })}
              <br />
              {translate({ message: "HOME.BrandAssets.scripts-2" })}
            </div>
            <div className={styles["button-box"]}>
              <Button className={styles.button}>
                {translate({ message: "HOME.BrandAssets.download-btn-text" })}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <HomepageStarter /> */}
    </Layout>
  );
}
