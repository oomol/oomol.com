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
                  {translate({ message: "PRICING.subscription.free.description" })}
                </div>
              </div>
              <div className={styles.downloadBtnWrapper}>
                <DownloadButton />
              </div>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>{translate({ message: "PRICING.subscription.free.feature1" })}</span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>{translate({ message: "PRICING.subscription.free.feature2" })}</span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>{translate({ message: "PRICING.subscription.free.feature3" })}</span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>{translate({ message: "PRICING.subscription.free.feature4" })}</span>
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
                    {translate({ message: "PRICING.subscription.standard.price" })}
                  </span>
                  <span className={styles.period}>
                    {translate({ message: "PRICING.subscription.period" })}
                  </span>
                </div>
                <div className={styles.planDescription}>
                  {translate({ message: "PRICING.subscription.standard.description" })}
                </div>
              </div>
              <Button asChild className={styles.subscribeBtn}>
                <a href="https://console.oomol.com/" target="_blank" rel="noopener noreferrer">
                  {translate({ message: "PRICING.subscription.subscribe" })}
                </a>
              </Button>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>{translate({ message: "PRICING.subscription.standard.feature1" })}</span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>{translate({ message: "PRICING.subscription.standard.feature2" })}</span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>{translate({ message: "PRICING.subscription.standard.feature3" })}</span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>{translate({ message: "PRICING.subscription.standard.feature4" })}</span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>{translate({ message: "PRICING.subscription.standard.feature5" })}</span>
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
                  {translate({ message: "PRICING.subscription.pro.description" })}
                </div>
              </div>
              <Button asChild className={styles.subscribeBtn}>
                <a href="https://console.oomol.com/" target="_blank" rel="noopener noreferrer">
                  {translate({ message: "PRICING.subscription.subscribe" })}
                </a>
              </Button>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>{translate({ message: "PRICING.subscription.pro.feature1" })}</span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>{translate({ message: "PRICING.subscription.pro.feature2" })}</span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>{translate({ message: "PRICING.subscription.pro.feature3" })}</span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>{translate({ message: "PRICING.subscription.pro.feature4" })}</span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>{translate({ message: "PRICING.subscription.pro.feature5" })}</span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>{translate({ message: "PRICING.subscription.pro.feature6" })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 按量计费部分 */}
        <div className={styles.payAsYouGoSection}>
          <div className={styles.sectionTitle}>
            {translate({ message: "PRICING.payAsYouGo.title" })}
          </div>
          <div className={styles.sectionSubtitle}>
            {translate({ message: "PRICING.payAsYouGo.subtitle" })}
          </div>

          <div className={styles.pricingTable}>
            <table>
              <thead>
                <tr>
                  <th>{translate({ message: "PRICING.payAsYouGo.table.item" })}</th>
                  <th>{translate({ message: "PRICING.payAsYouGo.table.price" })}</th>
                </tr>
              </thead>
              <tbody>
                {/* 执行任务 */}
                <tr className={styles.categoryRow}>
                  <td colSpan={2}>
                    <strong>{translate({ message: "PRICING.payAsYouGo.category.execution" })}</strong>
                  </td>
                </tr>
                <tr>
                  <td className={styles.itemCell}>
                    {translate({ message: "PRICING.payAsYouGo.execution.workflow" })}
                  </td>
                  <td className={styles.priceCell}>
                    {translate({ message: "PRICING.payAsYouGo.execution.workflow.price" })}
                  </td>
                </tr>
                <tr>
                  <td className={styles.itemCell}>
                    {translate({ message: "PRICING.payAsYouGo.execution.block" })}
                  </td>
                  <td className={styles.priceCell}>
                    {translate({ message: "PRICING.payAsYouGo.execution.block.price" })}
                  </td>
                </tr>
                <tr>
                  <td className={styles.itemCell}>
                    {translate({ message: "PRICING.payAsYouGo.execution.computeTime" })}
                  </td>
                  <td className={styles.priceCell}>
                    {translate({ message: "PRICING.payAsYouGo.execution.computeTime.price" })}
                  </td>
                </tr>

                {/* 大模型 */}
                <tr className={styles.categoryRow}>
                  <td colSpan={2}>
                    <strong>{translate({ message: "PRICING.payAsYouGo.category.llm" })}</strong>
                  </td>
                </tr>
                <tr>
                  <td className={styles.itemCell}>
                    {translate({ message: "PRICING.payAsYouGo.llm.gpt4" })}
                  </td>
                  <td className={styles.priceCell}>
                    {translate({ message: "PRICING.payAsYouGo.llm.gpt4.price" })}
                  </td>
                </tr>
                <tr>
                  <td className={styles.itemCell}>
                    {translate({ message: "PRICING.payAsYouGo.llm.claude" })}
                  </td>
                  <td className={styles.priceCell}>
                    {translate({ message: "PRICING.payAsYouGo.llm.claude.price" })}
                  </td>
                </tr>
                <tr>
                  <td className={styles.itemCell}>
                    {translate({ message: "PRICING.payAsYouGo.llm.gemini" })}
                  </td>
                  <td className={styles.priceCell}>
                    {translate({ message: "PRICING.payAsYouGo.llm.gemini.price" })}
                  </td>
                </tr>

                {/* 融合 API */}
                <tr className={styles.categoryRow}>
                  <td colSpan={2}>
                    <strong>{translate({ message: "PRICING.payAsYouGo.category.fusionAPI" })}</strong>
                  </td>
                </tr>
                <tr>
                  <td className={styles.itemCell}>
                    {translate({ message: "PRICING.payAsYouGo.fusionAPI.imageGen" })}
                  </td>
                  <td className={styles.priceCell}>
                    {translate({ message: "PRICING.payAsYouGo.fusionAPI.imageGen.price" })}
                  </td>
                </tr>
                <tr>
                  <td className={styles.itemCell}>
                    {translate({ message: "PRICING.payAsYouGo.fusionAPI.ocr" })}
                  </td>
                  <td className={styles.priceCell}>
                    {translate({ message: "PRICING.payAsYouGo.fusionAPI.ocr.price" })}
                  </td>
                </tr>
                <tr>
                  <td className={styles.itemCell}>
                    {translate({ message: "PRICING.payAsYouGo.fusionAPI.tts" })}
                  </td>
                  <td className={styles.priceCell}>
                    {translate({ message: "PRICING.payAsYouGo.fusionAPI.tts.price" })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
