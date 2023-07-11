import React from "react";
import Layout from "../theme/Layout";
import styles from "./pricing.module.css";
import {CheckCircleFilled} from "@ant-design/icons";
import {PricingData} from "./pricing-data";

export default function Pricing() {
    const planNode = PricingData.map((data, index) => {
        const planCell = data.inner.map((data, index) => {
            return (
                <div className={styles.planCell} key={`cell-${index}`}>
                    <div className={styles.planIcon}>
                        <CheckCircleFilled/>
                    </div>
                    <div className={styles.inner}>
                        {data}
                    </div>
                </div>
            );
        });
        return (
            <div className={styles.plan} key={`plan-${index}`}>
                <div className={styles.type}>
                    {data.type}
                </div>
                <div className={styles.value}>
                    {data.value}
                </div>
                {planCell}
            </div>
        );
    })
    return (
        <Layout>
            <div className={styles.box}>
                <div className={styles.title}>
                    Find a plan to power your projects
                </div>
                <div className={styles.planBox}>
                    {planNode}
                </div>
            </div>
        </Layout>
    );
}
