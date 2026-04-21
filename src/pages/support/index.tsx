import styles from "./styles.module.scss";

import Head from "@docusaurus/Head";
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
      <Head>
        <title>Support - OOMOL</title>
        <meta
          name="description"
          content="Get help through GitHub Discussions, Discord, or email."
        />
      </Head>
      <div className={styles.supportBox}>
        <h1 className={styles.supportTitle}>Support</h1>
        <div className={styles.supportCellBox}>
          <Card className={styles.supportCell}>
            <CardHeader className={styles.supportHeader}>
              <div className={styles.supportCardTitleRow}>
                <i
                  className={`i-bi-github ${styles.titleIcon}`}
                  aria-hidden="true"
                />
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
              <Button asChild className={styles.supportAction}>
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
              <div className={styles.supportCardTitleRow}>
                <i
                  className={`i-bi-discord ${styles.titleIconMuted}`}
                  aria-hidden="true"
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
              <Button asChild className={styles.supportAction}>
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
              <div className={styles.supportCardTitleRow}>
                <i
                  className={`i-codicon-mail ${styles.titleIcon}`}
                  aria-hidden="true"
                />
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
              <Button asChild className={styles.supportAction}>
                <a href="mailto:support@oomol.com">Email To Us</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
