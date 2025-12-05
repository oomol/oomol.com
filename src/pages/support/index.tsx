import React from "react";
import styles from "./styles.module.scss";
import Layout from "../../theme/Layout";
import { Button } from "@site/src/components/ui/button";
export default function Support() {
  return (
    <Layout>
      <div className={styles.supportBox}>
        <div className={styles.supportTitle}>Support</div>
        <div className={styles.supportCellBox}>
          <div className={styles.supportCell}>
            <div className={styles.title}>
              <i className="i-bi-github" style={{ fontSize: "20px" }} />
              <span className={styles["support-title"]}>Github Support</span>
            </div>
            <div className={styles.inner}>
              <div className={styles.text}>
                Go to our GitHub discussions to browse for help and best
                practices.
              </div>
              <Button asChild>
                <a
                  target="_blank"
                  href="https://github.com/orgs/oomol-lab/discussions"
                  rel="noopener noreferrer"
                >
                  Github Discussions
                </a>
              </Button>
            </div>
          </div>
          <div className={styles.supportCell}>
            <div className={styles.title}>
              <i
                className="i-bi-discord"
                style={{ fontSize: "20px", opacity: 0.7 }}
              />
              <span className={styles["support-title"]}>Discord Support</span>
            </div>
            <div className={styles.inner}>
              <div className={styles.text}>
                If you need instant communication, please join our Discord
                server.
              </div>
              <Button asChild>
                <a
                  target="_blank"
                  href="https://discord.gg/W3evr2kJDa"
                  rel="noopener noreferrer"
                >
                  Join Discord
                </a>
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
              <Button asChild>
                <a href="mailto:support@oomol.com">Email To Us</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
