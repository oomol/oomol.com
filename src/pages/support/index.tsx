import styles from "./styles.module.scss";

import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
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
        <title>{translate({ message: "SUPPORT.page.title" })}</title>
        <meta
          name="description"
          content={translate({ message: "SUPPORT.page.description" })}
        />
      </Head>
      <div className={styles.supportBox}>
        <h1 className={styles.supportTitle}>
          {translate({ message: "SUPPORT.title" })}
        </h1>
        <div className={styles.supportCellBox}>
          <Card className={styles.supportCell}>
            <CardHeader className={styles.supportHeader}>
              <div className={styles.supportCardTitleRow}>
                <i
                  className={`i-bi-github ${styles.titleIcon}`}
                  aria-hidden="true"
                />
                <CardTitle className={styles["support-title"]}>
                  {translate({ message: "SUPPORT.github.title" })}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className={styles.inner}>
              <div className={styles.text}>
                {translate({ message: "SUPPORT.github.description" })}
              </div>
              <Button asChild className={styles.supportAction}>
                <a
                  target="_blank"
                  href="https://github.com/orgs/oomol-lab/discussions"
                  rel="noopener noreferrer"
                >
                  {translate({ message: "SUPPORT.github.cta" })}
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
                  {translate({ message: "SUPPORT.discord.title" })}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className={styles.inner}>
              <div className={styles.text}>
                {translate({ message: "SUPPORT.discord.description" })}
              </div>
              <Button asChild className={styles.supportAction}>
                <a
                  target="_blank"
                  href="https://discord.gg/W3evr2kJDa"
                  rel="noopener noreferrer"
                >
                  {translate({ message: "SUPPORT.discord.cta" })}
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
                  {translate({ message: "SUPPORT.email.title" })}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className={styles.inner}>
              <div className={styles.text}>
                {translate({ message: "SUPPORT.email.description" })}
              </div>
              <Button asChild className={styles.supportAction}>
                <a href="mailto:support@oomol.com">
                  {translate({ message: "SUPPORT.email.cta" })}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
