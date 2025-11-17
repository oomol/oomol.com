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
        <div className={styles.planBox}>
          <div className={styles.freePlan}>
            <div className={styles.planBadge}>
              {translate({ message: "PRICING.free.badge" })}
            </div>
            <div className={styles.freePlanTitle}>
              {translate({ message: "PRICING.free.title" })}
            </div>
            <div className={styles.freePlanSubtitle}>
              {translate({ message: "PRICING.free.subtitle" })}
            </div>
            <div className={styles.freeText}>
              {translate({ message: "PRICING.free.text" })}
            </div>
            <DownloadButton />
            <div className={styles.listBox}>
              <div className={styles.listItem}>
                <i className={`${styles["listIcon"]} i-codicon-check`} />
                <div className={styles.listText}>
                  {translate({ message: "PRICING.free.feature1" })}
                </div>
              </div>
              <div className={styles.listItem}>
                <i className={`${styles["listIcon"]} i-codicon:check`} />
                <div className={styles.listText}>
                  {translate({ message: "PRICING.free.feature2" })}
                </div>
              </div>
              <div className={styles.listItem}>
                <i className={`${styles["listIcon"]} i-codicon:check`} />
                <div className={styles.listText}>
                  {translate({ message: "PRICING.free.feature3" })}
                </div>
              </div>
              <div className={styles.listItem}>
                <i className={`${styles["listIcon"]} i-codicon:check`} />
                <div className={styles.listText}>
                  {translate({ message: "PRICING.free.feature4" })}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.standardPlan}>
            <div className={styles.standardPlanTitle}>
              {translate({ message: "PRICING.standard.title" })}
            </div>
            <div className={styles.standardPlanSubtitle}>
              {translate({ message: "PRICING.standard.subtitle" })}
            </div>
            <div className={styles.standardPrice}>
              <div className={styles.priceBefore}>
                {translate({ message: "PRICING.standard.price.before" })}
              </div>
              <div className={styles.priceAfter}>
                {translate({ message: "PRICING.standard.price.after" })}
              </div>
            </div>
            <Button asChild className={styles.modifyBtn}>
              <a href="https://console.oomol.com/" target="_blank" rel="noopener noreferrer">
                <i className="i-codicon:credit-card" />
                {translate({ message: "PRICING.buttonText" })}
              </a>
            </Button>
            <div className={styles.listBox}>
              <div className={styles.listItem}>
                <i className={`${styles["listIcon"]} i-codicon-check`} />
                <div className={styles.listText}>
                  {translate({ message: "PRICING.standard.list.text1" })}
                </div>
              </div>
              <div className={styles.listItem}>
                <i className={`${styles["listIcon"]} i-codicon-check`} />
                <div className={styles.listText}>
                  {translate({ message: "PRICING.standard.list.text2" })}
                </div>
              </div>
              <div className={styles.listItem}>
                <i className={`${styles["listIcon"]} i-codicon-check`} />
                <div className={styles.listText}>
                  {translate({ message: "PRICING.standard.list.text3" })}
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
