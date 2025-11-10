import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import { useColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { DocusaurusContext } from "@docusaurus/types";

export default function HomepageStarter() {
  const { colorMode } = useColorMode();
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
      <img src={logoSrc} alt="logo" />
      <div className={styles.title}>Start creating today</div>
      <div className={styles.inner}>
        Whether you’re new to Oomol or back to see what’s new, we’ll have you
        set up and ready to do your best work in minutes.
      </div>
      <button
      // href="https://console.oomol.com/"
      // target="_blank"
      // size={"large"}
      >
        Download
      </button>
    </div>
  );
}
