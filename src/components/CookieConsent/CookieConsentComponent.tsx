import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";

import { pluginConfig } from "./cookieConsentConfig";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { DocusaurusContext } from "@docusaurus/types";
import { useColorMode } from "@docusaurus/theme-common";

export const CookieConsentComponent = () => {
  if (window !== window.parent) {
    return null;
  }

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

  useEffect(() => {
    try {
      void CookieConsent.run(pluginConfig);
      void CookieConsent.setLanguage(currentLocale);
    } catch (error) {
      console.error("Cookie consent initialization error:", error);
    }
  }, [currentLocale]);
  return <></>;
};
