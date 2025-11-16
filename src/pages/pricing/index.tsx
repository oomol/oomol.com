import React from "react";
import Layout from "../../theme/Layout";
import styles from "./styles.module.scss";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import { DownloadButton } from "@site/src/components/DownloadButton";
import { Button } from "@site/src/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@site/src/components/ui/accordion";
import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { DocusaurusContext } from "@docusaurus/types";

export default function Index() {
  const context = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const { i18n } = context;
  const QAData = [
    {
      question: translate({
        message: "PRICING.question.text1",
      }),
      answer: translate({
        message: "PRICING.question.text1.answer",
      }),
    },
    {
      question: translate({
        message: "PRICING.question.text2",
      }),
      answer: translate({
        message: "PRICING.question.text2.answer",
      }),
    },
  ];

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
        <div className={styles.questionTitleBox}>
          <div className={styles.questionTitle}>
            {translate({ message: "PRICING.question.title" })}
          </div>
          <div className={styles.questionSubtitleBox}>
            <div className={styles.questionSubtitle}>
              {translate({ message: "PRICING.question.subtitle" })}
            </div>
            <a
              href={
                i18n.currentLocale === "zh-CN"
                  ? "https://oomol.com/zh-CN/contact-us"
                  : "https://oomol.com/contact-us"
              }
              className={styles.contactLink}
            >
              {translate({ message: "PRICING.question.link" })}
            </a>
          </div>
        </div>
        <div className={styles.questionBox}>
          <div className={styles.QABox}>
            <Accordion type="single" collapsible className="w-full">
              {QAData.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-none">
                  <AccordionTrigger className={styles.dropdownHeader}>
                    <span className={styles.mainText}>{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className={styles.dropdownContent}>
                    {item.answer}
                  </AccordionContent>
                  {index !== QAData.length - 1 && <div className={styles.line} />}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <GetStartedPrompt />
        </div>
      </div>
    </Layout>
  );
}
