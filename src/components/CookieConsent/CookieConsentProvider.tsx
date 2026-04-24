import type { DetailedCookieConsent } from "./cookieConsentStorage";
import type { DocusaurusContext } from "@docusaurus/types";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@site/src/components/ui/button";
import {
  clearGoogleAnalyticsCookies,
  clearTrackingConsentState,
  ensureCloudflareBeacon,
  syncGoogleTracking,
  trackFirstLoginConversion,
} from "@site/src/lib/analytics";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  buildConsent,
  migrateLegacyConsentCookie,
  persistConsent,
  readStoredConsent,
} from "./cookieConsentStorage";

type Translations = {
  buttonText: string;
  declineButtonText: string;
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
  manageAdvertTitle: string;
  manageAdvertSubtitle: string;
  manageCookiesStatus: string;
  manageCookiesStatusConsented: string;
  manageCookiesStatusDeclined: string;
  manageCancelButtonText: string;
  manageSaveButtonText: string;
};

const COOKIE_POPUP_INITIAL_DELAY_MS = 1200;

const CATEGORY_VISIBILITY = {
  Analytics: true,
  Social: false,
  Advertising: true,
} as const;

function formatConsentDate(timestamp: string, locale: string): string {
  try {
    return new Date(timestamp).toLocaleString(
      locale === "zh-CN" ? "zh-CN" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  } catch {
    return "";
  }
}

function interpolateStatus(
  template: string,
  date: string,
  status: string
): string {
  return template.replace("{{date}}", date).replace("{{status}}", status);
}

function CookiePreferenceSwitch({
  ariaLabel,
  checked,
  onCheckedChange,
}: {
  ariaLabel: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  return (
    <button
      aria-label={ariaLabel}
      aria-checked={checked}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-solid transition-colors ${
        checked
          ? "border-[var(--oomol-primary)] bg-[var(--oomol-primary)]"
          : "border-[var(--oomol-border-default)] bg-[var(--oomol-bg-spotlight)]"
      }`}
      onClick={() => onCheckedChange(!checked)}
      role="switch"
      type="button"
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-[var(--oomol-white)] shadow-[var(--oomol-shadow-sm)] transition-transform ${
          checked ? "translate-x-[1.18rem]" : "translate-x-1"
        }`}
      />
    </button>
  );
}

type CookieConsentContextValue = {
  detailedConsent: DetailedCookieConsent | null;
  openPreferencesModal: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null
);

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);

  if (!ctx) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider"
    );
  }

  return ctx;
}

const AnalyticsConsentBridge: React.FC = () => {
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

const CookieConsentProviderInner: React.FC = () => {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const privacyPolicyUrl = useBaseUrl("/privacy");
  const t: Translations = {
    buttonText: translate({ message: "COOKIE.button.acceptAll" }),
    declineButtonText: translate({ message: "COOKIE.button.rejectAll" }),
    privacyPolicyText: translate({ message: "COOKIE.privacyPolicy" }),
    title: translate({ message: "COOKIE.title" }),
    message: translate({ message: "COOKIE.message" }),
    manageTitle: translate({ message: "COOKIE.manage.title" }),
    manageMessage: translate({ message: "COOKIE.manage.message" }),
    manageEssentialTitle: translate({
      message: "COOKIE.manage.essential.title",
    }),
    manageEssentialSubtitle: translate({
      message: "COOKIE.manage.essential.subtitle",
    }),
    manageEssentialStatus: translate({
      message: "COOKIE.manage.essential.status",
    }),
    manageEssentialStatusButtonText: translate({
      message: "COOKIE.manage.essential.statusButton",
    }),
    manageAnalyticsTitle: translate({
      message: "COOKIE.manage.analytics.title",
    }),
    manageAnalyticsSubtitle: translate({
      message: "COOKIE.manage.analytics.subtitle",
    }),
    manageAdvertTitle: translate({
      message: "COOKIE.manage.advertising.title",
    }),
    manageAdvertSubtitle: translate({
      message: "COOKIE.manage.advertising.subtitle",
    }),
    manageCookiesStatus: translate({ message: "COOKIE.manage.status" }),
    manageCookiesStatusConsented: translate({
      message: "COOKIE.manage.status.consented",
    }),
    manageCookiesStatusDeclined: translate({
      message: "COOKIE.manage.status.declined",
    }),
    manageCancelButtonText: translate({ message: "COOKIE.manage.cancel" }),
    manageSaveButtonText: translate({ message: "COOKIE.manage.save" }),
  };
  const localeTag = currentLocale === "zh-CN" ? "zh-CN" : "en-US";

  const [detailedConsent, setDetailedConsent] =
    useState<DetailedCookieConsent | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [preferencesSession, setPreferencesSession] = useState(0);

  const [draftAnalytics, setDraftAnalytics] = useState(false);
  const [draftAdvertising, setDraftAdvertising] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    migrateLegacyConsentCookie();
    const stored = readStoredConsent();
    setDetailedConsent(stored);

    if (stored) {
      return;
    }

    const timer = window.setTimeout(() => {
      setBannerVisible(true);
    }, COOKIE_POPUP_INITIAL_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!preferencesOpen) {
      return;
    }

    setDraftAnalytics(detailedConsent?.Analytics.consented ?? false);
    setDraftAdvertising(detailedConsent?.Advertising.consented ?? false);
  }, [preferencesOpen, preferencesSession, detailedConsent]);

  const openPreferencesModal = useCallback(() => {
    setPreferencesSession(c => c + 1);
    setPreferencesOpen(true);
  }, []);

  const ctx = useMemo(
    () => ({
      detailedConsent,
      openPreferencesModal,
    }),
    [detailedConsent, openPreferencesModal]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const onShow = () => {
      openPreferencesModal();
    };

    window.addEventListener("show-cookie-consent", onShow);

    return () => {
      window.removeEventListener("show-cookie-consent", onShow);
    };
  }, [openPreferencesModal]);

  const applyConsent = (next: DetailedCookieConsent) => {
    persistConsent(next);
    setDetailedConsent(next);
    setBannerVisible(false);
  };

  const handleAcceptAll = () => {
    applyConsent(buildConsent(true, true));
  };

  const handleRejectAll = () => {
    applyConsent(buildConsent(false, false));
  };

  const handleSavePreferences = () => {
    applyConsent(buildConsent(draftAnalytics, draftAdvertising));
    setPreferencesOpen(false);
  };

  const renderStatus = (category: "Analytics" | "Advertising") => {
    const status = detailedConsent?.[category];

    if (!status) {
      return null;
    }

    const dateStr = formatConsentDate(status.timestamp, localeTag);
    const statusLabel = status.consented
      ? t.manageCookiesStatusConsented
      : t.manageCookiesStatusDeclined;

    return (
      <p className="mt-2 m-0 text-left text-oomol-xs font-medium leading-snug text-[var(--oomol-text-tertiary)]">
        {interpolateStatus(t.manageCookiesStatus, dateStr, statusLabel)}
      </p>
    );
  };

  const showBanner = bannerVisible && detailedConsent === null;

  return (
    <CookieConsentContext.Provider value={ctx}>
      <AnalyticsConsentBridge />

      {showBanner ? (
        <div
          className="fixed inset-x-4 bottom-4 box-border w-auto max-w-[calc(100dvw-2rem)] rounded-xl border border-solid border-[var(--oomol-border-default)] bg-[var(--oomol-bg-base)] px-5 py-4 text-[var(--oomol-text-secondary)] shadow-[var(--oomol-shadow-md)] [font-family:var(--oomol-font-body)] md:inset-x-auto md:bottom-6 md:right-6 md:w-[min(28rem,calc(100dvw-3rem))]"
          role="region"
          aria-label={t.title}
          style={{ zIndex: "var(--oomol-z-cookie-banner)" }}
        >
          <div className="flex flex-col gap-3.5">
            <h3 className="m-0 text-oomol-lg font-semibold leading-tight tracking-[-0.02em] text-[var(--oomol-text-primary)] [font-family:var(--oomol-font-display)]">
              {t.title}
            </h3>
            <div className="flex flex-col gap-2">
              <p className="m-0 text-oomol-mono leading-relaxed text-[var(--oomol-text-secondary)]">
                {t.message}
              </p>
              <div
                aria-hidden
                className="h-px w-full shrink-0 bg-[var(--oomol-divider)]"
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a
                className="order-2 inline-flex max-w-full shrink-0 text-oomol-xs font-medium text-[var(--oomol-text-tertiary)] underline-offset-[3px] transition-colors hover:text-[var(--oomol-text-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--oomol-bg-base)] sm:order-1"
                href={privacyPolicyUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {t.privacyPolicyText}
              </a>
              <div className="order-1 flex flex-wrap items-center justify-end gap-2 sm:order-2">
                <Button
                  className="h-8 rounded-md px-3"
                  onClick={handleRejectAll}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  {t.declineButtonText}
                </Button>
                <Button
                  className="h-8 rounded-md px-3"
                  onClick={handleAcceptAll}
                  size="sm"
                  type="button"
                >
                  {t.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Dialog.Root onOpenChange={setPreferencesOpen} open={preferencesOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            className="fixed inset-0 bg-[var(--oomol-mask)] backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            style={{ zIndex: "var(--oomol-z-dialog-overlay)" }}
          />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 flex w-[min(26rem,calc(100vw-2rem))] max-h-[min(90dvh,calc(100vh-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-2xl border border-solid border-[var(--oomol-border-default)] bg-[var(--oomol-bg-elevated)] p-0 text-[var(--oomol-text-secondary)] shadow-[var(--oomol-shadow-lg)] [font-family:var(--oomol-font-body)] focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            key={preferencesSession}
            style={{ zIndex: "var(--oomol-z-dialog-content)" }}
          >
            <div className="flex w-full min-w-0 flex-col">
              <div className="border-b border-solid border-[var(--oomol-divider)] px-5 py-4">
                <Dialog.Title className="m-0 text-oomol-base font-semibold leading-snug tracking-[-0.02em] text-[var(--oomol-text-primary)] [font-family:var(--oomol-font-display)] sm:text-oomol-lg">
                  {t.manageTitle}
                </Dialog.Title>
                <Dialog.Description className="mt-2 m-0 text-oomol-mono leading-relaxed text-[var(--oomol-text-secondary)] sm:text-oomol-sm">
                  {t.manageMessage}
                </Dialog.Description>
              </div>

              <div className="px-5 py-4">
                <div className="divide-y divide-[var(--oomol-divider)] overflow-hidden rounded-xl border border-solid border-[var(--oomol-border-default)] bg-[var(--oomol-bg-container)]">
                  <div className="px-4 py-3.5 sm:px-5 sm:py-4">
                    <div className="flex items-start justify-between gap-3 sm:items-center">
                      <h4 className="m-0 min-w-0 flex-1 text-oomol-sm font-semibold leading-snug text-[var(--oomol-text-primary)]">
                        {t.manageEssentialTitle}
                      </h4>
                      <span className="shrink-0 rounded-full border border-solid border-[var(--oomol-border-default)] bg-[var(--oomol-bg-spotlight)] px-2.5 py-1 text-center text-oomol-xs font-semibold tabular-nums text-[var(--oomol-text-tertiary)] sm:px-3 sm:text-oomol-xs">
                        {t.manageEssentialStatusButtonText}
                      </span>
                    </div>
                    <p className="mt-2 m-0 text-oomol-mono leading-relaxed text-[var(--oomol-text-secondary)]">
                      {t.manageEssentialSubtitle}
                    </p>
                    <p className="mt-2 m-0 text-oomol-xs font-medium leading-snug text-[var(--oomol-text-tertiary)]">
                      {t.manageEssentialStatus}
                    </p>
                  </div>

                  {CATEGORY_VISIBILITY.Analytics ? (
                    <div className="px-4 py-3.5 sm:px-5 sm:py-4">
                      <div className="flex items-start justify-between gap-3 sm:items-center">
                        <h4 className="m-0 min-w-0 flex-1 text-oomol-sm font-semibold leading-snug text-[var(--oomol-text-primary)]">
                          {t.manageAnalyticsTitle}
                        </h4>
                        <CookiePreferenceSwitch
                          ariaLabel={t.manageAnalyticsTitle}
                          checked={draftAnalytics}
                          onCheckedChange={setDraftAnalytics}
                        />
                      </div>
                      <p className="mt-2 m-0 text-oomol-mono leading-relaxed text-[var(--oomol-text-secondary)]">
                        {t.manageAnalyticsSubtitle}
                      </p>
                      {renderStatus("Analytics")}
                    </div>
                  ) : null}

                  {CATEGORY_VISIBILITY.Advertising ? (
                    <div className="px-4 py-3.5 sm:px-5 sm:py-4">
                      <div className="flex items-start justify-between gap-3 sm:items-center">
                        <h4 className="m-0 min-w-0 flex-1 text-oomol-sm font-semibold leading-snug text-[var(--oomol-text-primary)]">
                          {t.manageAdvertTitle}
                        </h4>
                        <CookiePreferenceSwitch
                          ariaLabel={t.manageAdvertTitle}
                          checked={draftAdvertising}
                          onCheckedChange={setDraftAdvertising}
                        />
                      </div>
                      <p className="mt-2 m-0 text-oomol-mono leading-relaxed text-[var(--oomol-text-secondary)]">
                        {t.manageAdvertSubtitle}
                      </p>
                      {renderStatus("Advertising")}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-solid border-[var(--oomol-divider)] px-5 py-3.5 sm:flex-row sm:justify-end sm:gap-3 sm:py-4">
                <Dialog.Close asChild>
                  <Button
                    className="h-9 w-full rounded-lg px-4 text-oomol-sm sm:w-auto"
                    type="button"
                    variant="outline"
                  >
                    {t.manageCancelButtonText}
                  </Button>
                </Dialog.Close>
                <Button
                  className="h-9 w-full rounded-lg px-4 text-oomol-sm sm:w-auto"
                  onClick={handleSavePreferences}
                  type="button"
                >
                  {t.manageSaveButtonText}
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </CookieConsentContext.Provider>
  );
};

export const CookieConsentProvider: React.FC = () => (
  <CookieConsentProviderInner />
);
