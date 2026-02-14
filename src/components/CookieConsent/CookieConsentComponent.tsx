import type { DocusaurusContext } from "@docusaurus/types";

import { useColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";

import { pluginConfig } from "./cookieConsentConfig";

export const CookieConsentComponent = () => {
  const { colorMode } = useColorMode();

  const {
    i18n: { currentLocale },
  } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };

  useEffect(() => {
    if (colorMode === "dark") {
      document.documentElement.classList.add("cc--darkmode");
    } else {
      document.documentElement.classList.remove("cc--darkmode");
    }
  }, [colorMode]);

  // 首次初始化 Cookie Consent（只运行一次）
  useEffect(() => {
    try {
      void CookieConsent.run(pluginConfig);
    } catch (error) {
      console.error("Cookie consent initialization error:", error);
    }
  }, []);

  // 语言切换时更新
  useEffect(() => {
    try {
      void CookieConsent.setLanguage(currentLocale);
    } catch (error) {
      console.error("Cookie consent language update error:", error);
    }
  }, [currentLocale]);

  return <></>;
};
