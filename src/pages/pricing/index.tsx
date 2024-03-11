import React from "react";
import Layout from "../../theme/Layout";
import styles from "./styles.module.scss";
import { CheckCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import { ButtonType } from "antd/es/button";
import HomepageStarter from "@site/src/components/HomepageStarter";

export const PricingData = [
  {
    meta: {
      type: "FREE",
      sub_title: "The basics for individuals",
      value: "$0",
    },
    inner: [
      "Browse, download, and share workflows and components with the community",
      "Store workflows in private spaces",
      "Collaborate with others",
      "Version history of workflows and components",
    ],
    button: {
      text: "Sign up for free",
      type: "default",
    },
  },
  {
    meta: {
      type: "PRO",
      sub_title: "Advanced features for teams",
      value: "$20",
    },
    inner: [
      "Browse, download, and share workflows and components with the community",
      "Store workflows in private spaces",
      "Collaborate with team members in public spaces or private spaces",
      "Centralized billing, on team level",
      "Option to extend disk space for your spaces",
      "Run and automate workflows (starting at 0.10 $ / min)",
    ],
    button: {
      text: "Subscribe",
      type: "primary",
    },
  },
];

export default function Index() {
  const planNode = PricingData.map((data, index) => {
    const planCell = data.inner.map((data, index) => {
      return (
        <div className={styles.planCell} key={`cell-${index}`}>
          <div className={styles.planIcon}>
            <CheckCircleFilled />
          </div>
          <div className={styles.inner}>{data}</div>
        </div>
      );
    });
    const isTeam = data.meta.type === "PRO ";
    return (
      <div
        className={styles.plan}
        style={{
          borderColor: isTeam ? "#7D7FE9" : "#d9d9d9",
        }}
        key={`plan-${index}`}
      >
        <div>
          {isTeam && <div className={styles.tag}>RECOMMENDED</div>}
          <div className={styles.meta}>
            <div className={styles.type}>{data.meta.type}</div>
            <div className={styles.subTitle}>{data.meta.sub_title}</div>
            <div className={styles.price}>{data.meta.value}</div>
            <div className={styles.month}>per user/month</div>
          </div>
          {planCell}
        </div>
        <Button
          size="large"
          className={styles.btn}
          type={data.button.type as ButtonType}
        >
          {data.button.text}
        </Button>
      </div>
    );
  });
  return (
    <Layout>
      <div className={styles.box}>
        <div className={styles.title}>Find a plan to power your projects</div>
        <div className={styles.planBox}>{planNode}</div>
      </div>
      <HomepageStarter />
    </Layout>
  );
}
