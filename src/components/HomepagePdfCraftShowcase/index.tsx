import React from "react";
import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";
import clsx from "clsx";

export default function HomepagePdfCraftShowcase() {
  return (
    <section id="pdf-craft-case" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {translate({ message: "HOME.PdfCraft.title" })}
          </h2>
          <p className={styles.subtitle}>
            {translate({ message: "HOME.PdfCraft.subtitle" })}
          </p>
        </div>

        <div className={styles.content}>
          {/* 左侧: PDF-Craft 项目介绍 */}
          <div className={styles.leftSection}>
            <div className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <div className={styles.projectIcon}>📄</div>
                <div>
                  <h3 className={styles.projectName}>PDF-Craft</h3>
                  <div className={styles.projectStats}>
                    <a
                      href="https://github.com/oomol-lab/pdf-craft"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.githubLink}
                    >
                      <span className={styles.starIcon}>⭐</span>
                      <span className={styles.starCount}>3000+ Stars</span>
                    </a>
                  </div>
                </div>
              </div>
              <p className={styles.projectDescription}>
                {translate({ message: "HOME.PdfCraft.description" })}
              </p>
              <div className={styles.projectFeatures}>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>{translate({ message: "HOME.PdfCraft.feature1" })}</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>{translate({ message: "HOME.PdfCraft.feature2" })}</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>{translate({ message: "HOME.PdfCraft.feature3" })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧: 两种使用方式对比 */}
          <div className={styles.rightSection}>
            <div className={styles.comparisonCards}>
              {/* 传统方式 */}
              <div className={clsx(styles.comparisonCard, styles.traditional)}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardBadge}>
                    {translate({ message: "HOME.PdfCraft.traditional.badge" })}
                  </span>
                </div>
                <h4 className={styles.cardTitle}>
                  {translate({ message: "HOME.PdfCraft.traditional.title" })}
                </h4>
                <div className={styles.cardContent}>
                  <div className={styles.priceTag}>$$$</div>
                  <p className={styles.cardDescription}>
                    {translate({ message: "HOME.PdfCraft.traditional.description" })}
                  </p>
                </div>
              </div>

              {/* OOMOL 方式 */}
              <div className={clsx(styles.comparisonCard, styles.oomol)}>
                <div className={styles.cardHeader}>
                  <span className={clsx(styles.cardBadge, styles.recommended)}>
                    {translate({ message: "HOME.PdfCraft.oomol.badge" })}
                  </span>
                </div>
                <h4 className={styles.cardTitle}>
                  {translate({ message: "HOME.PdfCraft.oomol.title" })}
                </h4>
                <div className={styles.cardContent}>
                  <ul className={styles.methodList}>
                    <li>
                      <span className={styles.checkIcon}>✓</span>
                      <span>{translate({ message: "HOME.PdfCraft.oomol.method1" })}</span>
                    </li>
                    <li>
                      <span className={styles.checkIcon}>✓</span>
                      <span>{translate({ message: "HOME.PdfCraft.oomol.method2" })}</span>
                    </li>
                    <li>
                      <span className={styles.checkIcon}>✓</span>
                      <span>{translate({ message: "HOME.PdfCraft.oomol.method3" })}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA 按钮 */}
        <div className={styles.ctaSection}>
          <a
            href="https://pdf.oomol.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryButton}
          >
            {translate({ message: "HOME.PdfCraft.cta.primary" })}
          </a>
          <a
            href="https://github.com/oomol-lab/pdf-craft"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryButton}
          >
            {translate({ message: "HOME.PdfCraft.cta.secondary" })}
          </a>
        </div>
      </div>
    </section>
  );
}
