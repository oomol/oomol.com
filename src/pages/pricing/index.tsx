import React from "react";
import Layout from "../../theme/Layout";
import styles from "./styles.module.less";
import {CheckCircleFilled} from "@ant-design/icons";

export const PricingData = [
    {
        type: "Hobby",
        value: "$0",
        inner: [
            "Support for 35+ Frameworks",
            "Fast Globally (Edge Network)",
            "Automatic CI/CD (Git Integration)",
            "Functions (Serverless, Edge)",
            "Starter Database (KV, Postgres)",
            "Web Analytics",
            "Community Support"
        ],
    },
    {
        type: "Pro",
        value: "$20",
        inner: [
            "Support for 35+ Frameworks",
            "Fast Globally (Edge Network)",
            "Automatic CI/CD (Git Integration)",
            "Functions (Serverless, Edge)",
            "Starter Database (KV, Postgres)",
            "Web Analytics",
            "Community Support"
        ],
    },
    {
        type: "Enterprise",
        value: "Custom",
        inner: [
            "Support for 35+ Frameworks",
            "Fast Globally (Edge Network)",
            "Automatic CI/CD (Git Integration)",
            "Functions (Serverless, Edge)",
            "Starter Database (KV, Postgres)",
            "Web Analytics",
            "Community Support"
        ],
    },
]

export default function Index() {
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
