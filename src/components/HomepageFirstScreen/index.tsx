import React from "react";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Button } from "@arco-design/web-react";
import { IconDownload } from "@arco-design/web-react/icon";

const data = {
  slogan: "Workflow-based data processing IDE.",
  script:
    "OOMOL makes it easy to connect code snippets and API services through intuitive visual interactions.",
};
export default function HomepageFirstScreen() {
  return (
    <div className={styles.sectionOne}>
      <div className={styles.sectionOneBox}>
        <div className={styles.sectionOneMid}>
          <div className={styles.sectionOneText}>
            <div className={styles.sectionOneTextBox}>
              <div className={styles.sectionOneTextTitle}>{data.slogan}</div>
              <div className={styles.sectionOneTextInner}>{data.script}</div>
              <div className={styles.sectionOneBtnBox}>
                <Button
                  className={styles.sectionOneBtn}
                  href={"https://console.oomol.com/"}
                  target="_blank"
                  type="primary"
                  size="large"
                  shape="round"
                  icon={<IconDownload />}
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.sectionOneImageBox}>
            <Image
              className={styles.sectionOneImage}
              sources={{
                light: useBaseUrl("/img/oomol_studio.jpeg"),
                dark: useBaseUrl("/img/oomol_studio.jpeg"),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
