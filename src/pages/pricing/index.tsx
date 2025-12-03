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

        {/* 订阅部分 */}
        <div className={styles.subscriptionSection}>
          <div className={styles.sectionTitle}>
            {translate({ message: "PRICING.subscription.title" })}
          </div>
          <div className={styles.sectionSubtitle}>
            {translate({ message: "PRICING.subscription.subtitle" })}
          </div>

          <div className={styles.planBox}>
            {/* 免费版 */}
            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <div className={styles.planName}>
                  {translate({ message: "PRICING.subscription.free.name" })}
                </div>
                <div className={styles.planPrice}>
                  <span className={styles.price}>
                    {translate({ message: "PRICING.subscription.free.price" })}
                  </span>
                </div>
                <div className={styles.planDescription}>
                  {translate({
                    message: "PRICING.subscription.free.description",
                  })}
                </div>
              </div>
              <div className={styles.downloadBtnWrapper}>
                <DownloadButton />
              </div>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.free.feature1",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.free.feature2",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.free.feature3",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.free.feature4",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* 标准版 */}
            <div className={`${styles.planCard} ${styles.recommended}`}>
              <div className={styles.badge}>
                {translate({ message: "PRICING.subscription.recommended" })}
              </div>
              <div className={styles.planHeader}>
                <div className={styles.planName}>
                  {translate({ message: "PRICING.subscription.standard.name" })}
                </div>
                <div className={styles.planPrice}>
                  <span className={styles.price}>
                    {translate({
                      message: "PRICING.subscription.standard.price",
                    })}
                  </span>
                  <span className={styles.period}>
                    {translate({ message: "PRICING.subscription.period" })}
                  </span>
                </div>
                <div className={styles.planDescription}>
                  {translate({
                    message: "PRICING.subscription.standard.description",
                  })}
                </div>
              </div>
              <Button asChild className={styles.subscribeBtn}>
                <a
                  href="https://console.oomol.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate({ message: "PRICING.subscription.subscribe" })}
                </a>
              </Button>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.standard.feature1",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.standard.feature2",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.standard.feature3",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.standard.feature4",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.standard.feature5",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* 专业版 */}
            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <div className={styles.planName}>
                  {translate({ message: "PRICING.subscription.pro.name" })}
                </div>
                <div className={styles.planPrice}>
                  <span className={styles.price}>
                    {translate({ message: "PRICING.subscription.pro.price" })}
                  </span>
                  <span className={styles.period}>
                    {translate({ message: "PRICING.subscription.period" })}
                  </span>
                </div>
                <div className={styles.planDescription}>
                  {translate({
                    message: "PRICING.subscription.pro.description",
                  })}
                </div>
              </div>
              <Button asChild className={styles.subscribeBtn}>
                <a
                  href="https://console.oomol.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate({ message: "PRICING.subscription.subscribe" })}
                </a>
              </Button>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.pro.feature1",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.pro.feature2",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.pro.feature3",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.pro.feature4",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.pro.feature5",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.pro.feature6",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
