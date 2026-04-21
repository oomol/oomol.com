import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import { useHydratedColorMode } from "@site/src/lib/useHydratedColorMode";
import React, { useMemo } from "react";

export default function HomepageStarter() {
  const { colorMode } = useHydratedColorMode();
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const locale = i18n.currentLocale;

  const logoSrc = useMemo(() => {
    const langPrefix = locale === "zh-CN" ? "zh" : "en";
    const themePrefix = colorMode === "dark" ? "dark" : "light";
    return `/img/logo-${langPrefix}-${themePrefix}.svg`;
  }, [locale, colorMode]);

  return (
    <div className={styles.sectionStarter}>
      <img src={logoSrc} alt="logo" loading="lazy" decoding="async" />
      <h2 className={styles.sectionTitle}>Start creating today</h2>
      <p className={styles.sectionDescription}>
        Whether you’re new to Oomol or back to see what’s new, we’ll have you
        set up and ready to do your best work in minutes.
      </p>
      <Button asChild size="lg" className={styles.cta}>
        <Link to="/downloads">Download</Link>
      </Button>
    </div>
  );
}
