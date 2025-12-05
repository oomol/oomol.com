import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import React from "react";

export default function StudioPdfCraftCase() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {translate({ message: "STUDIO.case.title" })}
          </h2>
          <p className={styles.subtitle}>
            {translate({ message: "STUDIO.case.subtitle" })}
          </p>
        </div>

        <div className={styles.content}>
          {/* 左侧: 构建流程 */}
          <div className={styles.leftSection}>
            <div className={styles.processCard}>
              <h3 className={styles.cardTitle}>
                {translate({ message: "STUDIO.case.process.title" })}
              </h3>

              <div className={styles.steps}>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>
                      {translate({ message: "STUDIO.case.step1.title" })}
                    </h4>
                    <p className={styles.stepDesc}>
                      {translate({ message: "STUDIO.case.step1.desc" })}
                    </p>
                    <div className={styles.stepTags}>
                      <span className={styles.tag}>PDF Parser</span>
                      <span className={styles.tag}>OCR Engine</span>
                      <span className={styles.tag}>Format Converter</span>
                    </div>
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>
                      {translate({ message: "STUDIO.case.step2.title" })}
                    </h4>
                    <p className={styles.stepDesc}>
                      {translate({ message: "STUDIO.case.step2.desc" })}
                    </p>
                    <div className={styles.stepTags}>
                      <span className={styles.tag}>Visual Flow</span>
                      <span className={styles.tag}>Block Connection</span>
                    </div>
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>
                      {translate({ message: "STUDIO.case.step3.title" })}
                    </h4>
                    <p className={styles.stepDesc}>
                      {translate({ message: "STUDIO.case.step3.desc" })}
                    </p>
                    <div className={styles.stepTags}>
                      <span className={styles.tag}>RESTful API</span>
                      <span className={styles.tag}>MCP Protocol</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧: 部署选项 */}
          <div className={styles.rightSection}>
            <div className={styles.deployCard}>
              <h3 className={styles.cardTitle}>
                {translate({ message: "STUDIO.case.deploy.title" })}
              </h3>

              <div className={styles.deployOptions}>
                <div className={styles.deployOption}>
                  <div className={styles.optionIcon}>💻</div>
                  <div className={styles.optionContent}>
                    <h4 className={styles.optionTitle}>
                      {translate({ message: "STUDIO.case.deploy.local.title" })}
                    </h4>
                    <p className={styles.optionDesc}>
                      {translate({ message: "STUDIO.case.deploy.local.desc" })}
                    </p>
                    <div className={styles.optionBadge}>
                      {translate({ message: "STUDIO.case.deploy.local.badge" })}
                    </div>
                  </div>
                </div>

                <div className={styles.deployOption}>
                  <div className={styles.optionIcon}>🔗</div>
                  <div className={styles.optionContent}>
                    <h4 className={styles.optionTitle}>
                      {translate({ message: "STUDIO.case.deploy.frp.title" })}
                    </h4>
                    <p className={styles.optionDesc}>
                      {translate({ message: "STUDIO.case.deploy.frp.desc" })}
                    </p>
                    <div className={styles.optionBadge}>
                      {translate({ message: "STUDIO.case.deploy.frp.badge" })}
                    </div>
                  </div>
                </div>

                <div className={styles.deployOption}>
                  <div className={styles.optionIcon}>☁️</div>
                  <div className={styles.optionContent}>
                    <h4 className={styles.optionTitle}>
                      {translate({ message: "STUDIO.case.deploy.cloud.title" })}
                    </h4>
                    <p className={styles.optionDesc}>
                      {translate({ message: "STUDIO.case.deploy.cloud.desc" })}
                    </p>
                    <div className={styles.optionBadge}>
                      {translate({ message: "STUDIO.case.deploy.cloud.badge" })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部统计 */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>3000+</div>
            <div className={styles.statLabel}>GitHub Stars</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>10+</div>
            <div className={styles.statLabel}>
              {translate({ message: "STUDIO.case.stat2" })}
            </div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>3</div>
            <div className={styles.statLabel}>
              {translate({ message: "STUDIO.case.stat3" })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
