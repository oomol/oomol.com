import styles from "./styles.module.scss";

import { clsx } from "clsx";
import React from "react";

interface SiteCtaProps {
  title: string;
  description: string;
  actions: React.ReactNode;
  className?: string;
  id?: string;
}

export function SiteCta({
  title,
  description,
  actions,
  className,
  id,
}: SiteCtaProps) {
  return (
    <section
      id={id}
      className={clsx(styles.section, className)}
      data-oomol-surface="footer-band"
    >
      <div className={styles.inner}>
        <h2 className={styles.ctaTitle}>{title}</h2>
        <p className={styles.ctaDescription}>{description}</p>
        <div className={styles.actions}>{actions}</div>
      </div>
    </section>
  );
}
