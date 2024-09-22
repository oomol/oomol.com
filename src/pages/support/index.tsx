import React from "react";
import styles from "./styles.module.scss";
import Layout from "../../theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Image from "@theme/ThemedImage";
import { Button } from "@site/src/components/Button";
export default function Support() {
  return (
    <Layout>
      <div className={styles.supportBox}>
        <div className={styles.supportTitle}>Support</div>
        <div className={styles.supportCellBox}>
          <div className={styles.supportCell}>
            <div className={styles.title}>
              <Image
                style={{ width: 20 }}
                sources={{
                  light: useBaseUrl("/img/github.svg"),
                  dark: useBaseUrl("/img/github.svg"),
                }}
              />
              <span className={styles["support-title"]}>Github Support</span>
            </div>
            <div className={styles.inner}>
              <div className={styles.text}>
                Go to our GitHub discussions to browse for help and best
                practices.
              </div>
              <Button
                target="_blank"
                href="https://github.com/orgs/oomol-lab/discussions"
              >
                Github Discussions
              </Button>
            </div>
          </div>
          <div className={styles.supportCell}>
            <div className={styles.title}>
              <Image
                style={{ width: 20, opacity: 0.7 }}
                sources={{
                  light: useBaseUrl("/img/discord_line.svg"),
                  dark: useBaseUrl("/img/discord_line.svg"),
                }}
              />
              <span className={styles["support-title"]}>Discord Support</span>
            </div>
            <div className={styles.inner}>
              <div className={styles.text}>
                If you need instant communication, please join our Discord
                server.
              </div>
              <Button target="_blank" href="https://discord.gg/W3evr2kJDa">
                Join Discord
              </Button>
            </div>
          </div>
          <div className={styles.supportCell}>
            <div className={styles.title}>
              <div className="i-codicon-mail" />
              <span className={styles["support-title"]}>Email Support</span>
            </div>
            <div className={styles.inner}>
              <div className={styles.text}>
                If you need help beyond the product, you can contact us by
                email.
              </div>
              <Button href="mailto:support@oomol.com">Email To Us</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
