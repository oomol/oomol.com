import styles from "./styles.module.scss";

import Head from "@docusaurus/Head";
import { Button } from "@site/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@site/src/components/ui/card";
import Layout from "@theme/Layout";
import React from "react";

export default function Support() {
  return (
    <Layout>
      <Head>
        <title>技术支持 - OOMOL</title>
        <meta
          name="description"
          content="通过 GitHub 讨论区、Discord 或邮件获取 OOMOL 支持。"
        />
      </Head>
      <div className={styles.supportBox}>
        <div className={styles.supportTitle}>技术支持</div>
        <div className={styles.supportCellBox}>
          <Card className={styles.supportCell}>
            <CardHeader className={styles.supportHeader}>
              <div className={styles.title}>
                <i
                  className={`i-bi-github ${styles.titleIcon}`}
                  aria-hidden="true"
                />
                <CardTitle className={styles["support-title"]}>
                  Github 支持
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className={styles.inner}>
              <div className={styles.text}>
                访问我们的 GitHub 讨论区，浏览帮助和最佳实践。
              </div>
              <Button asChild>
                <a
                  target="_blank"
                  href="https://github.com/orgs/oomol-lab/discussions"
                  rel="noopener noreferrer"
                >
                  Github 讨论区
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card className={styles.supportCell}>
            <CardHeader className={styles.supportHeader}>
              <div className={styles.title}>
                <i
                  className={`i-bi-discord ${styles.titleIconMuted}`}
                  aria-hidden="true"
                />
                <CardTitle className={styles["support-title"]}>
                  Discord 支持
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className={styles.inner}>
              <div className={styles.text}>
                如果您需要即时沟通，请加入我们的 Discord 服务器。
              </div>
              <Button asChild>
                <a
                  target="_blank"
                  href="https://discord.gg/W3evr2kJDa"
                  rel="noopener noreferrer"
                >
                  加入 Discord
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card className={styles.supportCell}>
            <CardHeader className={styles.supportHeader}>
              <div className={styles.title}>
                <i
                  className={`i-codicon-mail ${styles.titleIcon}`}
                  aria-hidden="true"
                />
                <CardTitle className={styles["support-title"]}>
                  邮件支持
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className={styles.inner}>
              <div className={styles.text}>
                如果您需要产品之外的帮助，可以通过邮件联系我们。
              </div>
              <Button asChild>
                <a href="mailto:support@oomol.com">发送邮件</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
