import { useEffect, useRef } from "react";
import * as CookieConsent from "vanilla-cookieconsent";

import { pluginConfig } from "./cookieConsentConfig";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { DocusaurusContext } from "@docusaurus/types";
import { useColorMode } from "@docusaurus/theme-common";
import { useLocation } from "@docusaurus/router";

export const CookieConsentComponent = () => {
  const location = useLocation();
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
      // 在 docusaurus 这个框架下需要手动重置状态以确保弹窗能在 路由/语言 切换时正确显示，否则切换路由会消失
      CookieConsent.reset(false); // 保留用户选择
      void CookieConsent.run(pluginConfig);
      void CookieConsent.setLanguage(currentLocale);
    } catch (error) {
      console.error("Cookie consent initialization error:", error);
    }
  }, [currentLocale, location.pathname]);

  return <></>;
};
