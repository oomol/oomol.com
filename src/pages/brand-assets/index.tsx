import React from "react";
import styles from "./styles.module.scss";
import Layout from "../../theme/Layout";
import { translate } from "@docusaurus/Translate";
import { Button } from "@site/src/components/Button";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Index() {
  const { i18n } = useDocusaurusContext() as any;
  const locale = i18n.currentLocale;

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {translate({
            message: "HOME.BrandAssets.title",
          })}
        </h1>
        {locale === "en" ? (
          <div className={styles["description-en-box"]}>
            <p className={styles["description-en"]}>
              {translate({
                message: "HOME.BrandAssets.description-1",
              })}
            </p>
            <p className={styles["description-en"]}>
              {translate({
                message: "HOME.BrandAssets.description-2",
              })}
            </p>
          </div>
        ) : (
          <p className={styles.description}>
            {translate({
              message: "HOME.BrandAssets.description",
            })}
          </p>
        )}
        <h2 className={styles["sub-title"]}>OOMOL Logos</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <img
              className={styles.logo}
              src="/img/logo-symbol.svg"
              alt="logo-symbol"
            />
            <Button
              className={styles.download}
              href="https://static.oomol.com/logo/logo-symbol.zip"
            >
              {translate({
                message: "HOME.BrandAssets.download-btn-text",
              })}
              &nbsp; Logo.zip
            </Button>
          </div>
          <div className={styles.card}>
            <img
              className={styles.logo}
              alt="OOMOL Brand"
              src={locale === "en" ? "/img/logo-en.svg" : "/img/logo-zh.svg"}
              loading="lazy"
            />
            <Button
              className={styles.download}
              href={
                locale === "en"
                  ? "https://static.oomol.com/logo/logo-en.zip"
                  : "https://static.oomol.com/logo/logo-zhCN.zip"
              }
            >
              {translate({
                message: "HOME.BrandAssets.download-btn-text",
              })}
              &nbsp; OOMOL-Brand.zip
            </Button>
          </div>
          <div className={styles.card}>
            <img
              className={styles.logo}
              src="/img/logo2x.png"
              alt="OOMOL Icon"
            />
            <Button
              className={styles.download}
              href="https://static.oomol.com/logo/icon.zip"
            >
              {translate({
                message: "HOME.BrandAssets.download-btn-text",
              })}
              &nbsp; OOMOL-Icon.zip
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
