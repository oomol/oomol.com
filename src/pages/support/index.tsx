import styles from "./styles.module.scss";

import { Button } from "@site/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@site/src/components/ui/card";
import React from "react";

import Layout from "../../theme/Layout";

export default function Support() {
  return (
    <Layout>
      <div className={styles.supportBox}>
        <div className={styles.supportTitle}>Support</div>
        <div className={styles.supportCellBox}>
          <Card className={styles.supportCell}>
            <CardHeader className={styles.supportHeader}>
              <div className={styles.title}>
                <i className="i-bi-github" style={{ fontSize: "20px" }} />
                <CardTitle className={styles["support-title"]}>
                  Github Support
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className={styles.inner}>
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
            </CardContent>
          </Card>
          <Card className={styles.supportCell}>
            <CardHeader className={styles.supportHeader}>
              <div className={styles.title}>
                <i
                  className="i-bi-discord"
                  style={{ fontSize: "20px", opacity: 0.7 }}
                />
                <CardTitle className={styles["support-title"]}>
                  Discord Support
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className={styles.inner}>
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
            </CardContent>
          </Card>
          <Card className={styles.supportCell}>
            <CardHeader className={styles.supportHeader}>
              <div className={styles.title}>
                <div className="i-codicon-mail" />
                <CardTitle className={styles["support-title"]}>
                  Email Support
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className={styles.inner}>
              <div className={styles.text}>
                If you need help beyond the product, you can contact us by
                email.
              </div>
              <Button asChild>
                <a href="mailto:support@oomol.com">Email To Us</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
