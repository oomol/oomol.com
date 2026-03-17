import type { DocusaurusContext } from "@docusaurus/types";

import { useColorMode } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  clearGoogleAnalyticsCookies,
  clearTrackingConsentState,
  ensureCloudflareBeacon,
  syncGoogleTracking,
  trackFirstLoginConversion,
} from "@site/src/lib/analytics";
import React, { useEffect } from "react";
import { CookieManager, useCookieConsent } from "react-cookie-manager";

type LegacyConsentCookie = {
  categories?: string[];
  consentTimestamp?: string;
  lastConsentTimestamp?: string;
};

type CookieManagerTranslations = {
  buttonText: string;
  declineButtonText: string;
  manageButtonText: string;
  privacyPolicyText: string;
  title: string;
  message: string;
  manageTitle: string;
  manageMessage: string;
  manageEssentialTitle: string;
  manageEssentialSubtitle: string;
  manageEssentialStatus: string;
  manageEssentialStatusButtonText: string;
  manageAnalyticsTitle: string;
  manageAnalyticsSubtitle: string;
  manageSocialTitle: string;
  manageSocialSubtitle: string;
  manageAdvertTitle: string;
  manageAdvertSubtitle: string;
  manageCookiesStatus: string;
  manageCookiesStatusConsented: string;
  manageCookiesStatusDeclined: string;
  manageCancelButtonText: string;
  manageSaveButtonText: string;
};

const COOKIE_KEY = "cc_cookie";
const COOKIE_EXPIRATION_DAYS = 365;
const OOMOL_ROOT_DOMAIN = "oomol.com";

const translationsByLocale: Record<string, CookieManagerTranslations> = {
  en: {
    buttonText: "Accept all",
    declineButtonText: "Reject all",
    manageButtonText: "Manage preferences",
    privacyPolicyText: "Privacy Policy",
    title: "Cookie settings",
    message:
      "We use optional cookies for site analytics and conversion tracking. Essential cookies remain enabled so the website can function correctly.",
    manageTitle: "Cookie settings",
    manageMessage:
      "Choose which optional cookies OOMOL may use on this device. You can reopen these settings from the footer at any time.",
    manageEssentialTitle: "Essential",
    manageEssentialSubtitle:
      "Required for core site behavior such as language preference, security, and session continuity.",
    manageEssentialStatus: "Status: Always enabled",
    manageEssentialStatusButtonText: "Always On",
    manageAnalyticsTitle: "Analytics",
    manageAnalyticsSubtitle:
      "Helps us understand visits, traffic sources, and product usage across the website.",
    manageSocialTitle: "Social",
    manageSocialSubtitle: "Enable social media features and sharing",
    manageAdvertTitle: "Advertising",
    manageAdvertSubtitle:
      "Allows Google Ads conversion tracking for key actions such as downloads and first sign-in.",
    manageCookiesStatus: "Status: {{status}} on {{date}}",
    manageCookiesStatusConsented: "Consented",
    manageCookiesStatusDeclined: "Declined",
    manageCancelButtonText: "Cancel",
    manageSaveButtonText: "Save preferences",
  },
  "zh-CN": {
    buttonText: "接受全部",
    declineButtonText: "拒绝全部",
    manageButtonText: "管理偏好",
    privacyPolicyText: "隐私政策",
    title: "Cookie 设置",
    message:
      "我们会把可选 Cookie 用于站点统计和转化跟踪。必要 Cookie 会保持开启，以保证网站正常工作。",
    manageTitle: "Cookie 设置",
    manageMessage:
      "选择 OOMOL 可以在当前设备上使用哪些可选 Cookie。你之后也可以随时在页脚重新打开这些设置。",
    manageEssentialTitle: "必要 Cookie",
    manageEssentialSubtitle:
      "用于语言偏好、安全能力和会话连续性等基础站点功能。",
    manageEssentialStatus: "状态：始终开启",
    manageEssentialStatusButtonText: "始终开启",
    manageAnalyticsTitle: "统计",
    manageAnalyticsSubtitle:
      "帮助我们了解访问来源、页面使用情况以及产品相关行为。",
    manageSocialTitle: "社交",
    manageSocialSubtitle: "启用社交媒体功能与分享",
    manageAdvertTitle: "广告与转化跟踪",
    manageAdvertSubtitle:
      "用于 Google Ads 转化跟踪，例如下载和首次登录这类关键动作。",
    manageCookiesStatus: "状态：{{date}} {{status}}",
    manageCookiesStatusConsented: "已同意",
    manageCookiesStatusDeclined: "已拒绝",
    manageCancelButtonText: "取消",
    manageSaveButtonText: "保存偏好",
  },
};

function getCookieDomain(hostname: string): string | undefined {
  const normalizedHostname = hostname.toLowerCase();

  if (
    normalizedHostname === OOMOL_ROOT_DOMAIN ||
    normalizedHostname.endsWith(`.${OOMOL_ROOT_DOMAIN}`)
  ) {
    return OOMOL_ROOT_DOMAIN;
  }

  return undefined;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${escapedName}=([^;]*)`)
  );

  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, days: number) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + days);

  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    `Expires=${expiresAt.toUTCString()}`,
    "SameSite=Lax",
  ];

  if (typeof window !== "undefined") {
    const domain = getCookieDomain(window.location.hostname);

    if (domain) {
      parts.push(`Domain=${domain}`);
    }

    if (window.location.protocol === "https:") {
      parts.push("Secure");
    }
  }

  document.cookie = parts.join("; ");
}

function migrateLegacyConsentCookie() {
  if (typeof window === "undefined") {
    return;
  }

  const rawCookie = readCookie(COOKIE_KEY);

  if (!rawCookie) {
    return;
  }

  try {
    const parsedCookie = JSON.parse(rawCookie) as
      | LegacyConsentCookie
      | Record<string, unknown>;

    if (
      "Analytics" in parsedCookie ||
      !Array.isArray(parsedCookie.categories)
    ) {
      return;
    }

    const hasStatisticsConsent = parsedCookie.categories.includes("statistics");
    const timestamp =
      parsedCookie.lastConsentTimestamp ??
      parsedCookie.consentTimestamp ??
      new Date().toISOString();

    writeCookie(
      COOKIE_KEY,
      JSON.stringify({
        Analytics: { consented: hasStatisticsConsent, timestamp },
        Social: { consented: false, timestamp },
        Advertising: { consented: hasStatisticsConsent, timestamp },
      }),
      COOKIE_EXPIRATION_DAYS
    );
  } catch {
    // Ignore malformed legacy consent cookies.
  }
}

const AnalyticsConsentBridge = () => {
  const { detailedConsent } = useCookieConsent();

  useEffect(() => {
    const analyticsGranted = detailedConsent?.Analytics.consented ?? false;
    const advertisingGranted = detailedConsent?.Advertising.consented ?? false;

    void syncGoogleTracking({
      analytics: analyticsGranted,
      advertising: advertisingGranted,
    });

    if (analyticsGranted) {
      ensureCloudflareBeacon();
    } else {
      clearGoogleAnalyticsCookies();
    }

    if (advertisingGranted) {
      trackFirstLoginConversion();
    }

    if (!analyticsGranted && !advertisingGranted) {
      clearTrackingConsentState();
    }
  }, [detailedConsent]);

  return null;
};

export const CookieConsentProvider = () => {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const { colorMode } = useColorMode();
  const privacyPolicyUrl = useBaseUrl("/privacy");
  const translations =
    translationsByLocale[currentLocale] ?? translationsByLocale.en;

  migrateLegacyConsentCookie();

  return (
    <CookieManager
      cookieKey={COOKIE_KEY}
      cookieCategories={{ Analytics: true, Social: false, Advertising: true }}
      disableAutomaticBlocking
      disableGeolocation
      displayType="popup"
      enableFloatingButton={false}
      expirationDays={COOKIE_EXPIRATION_DAYS}
      privacyPolicyUrl={privacyPolicyUrl}
      showManageButton={false}
      theme={colorMode === "dark" ? "dark" : "light"}
      translations={translations}
    >
      <AnalyticsConsentBridge />
    </CookieManager>
  );
};
