import React from "react";
import Layout from "../../theme/Layout";
import styles from "./styles.module.scss";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import { DownloadButton } from "@site/src/components/DownloadButton";
import { Button } from "@site/src/components/ui/button";
import { translate } from "@docusaurus/Translate";

export default function Index() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <div className={styles.title}>
            {translate({ message: "PRICING.title" })}
          </div>
          <div className={styles.subTitle}>
            {translate({ message: "PRICING.subtitle" })}
          </div>
        </div>
        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
