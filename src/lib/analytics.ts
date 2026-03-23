type GtagCommand = "config" | "consent" | "event" | "js" | "set";

type TrackingConsentState = {
  advertising: boolean;
  analytics: boolean;
};

type GtagFunction = Gtag.Gtag;

declare global {
  interface Window {
    __oomolCloudflareLoaded?: boolean;
    __oomolGoogleTagConfigured?: {
      ads: boolean;
      analytics: boolean;
    };
    __oomolGoogleTagLoaded?: boolean;
    __oomolGoogleTagLoadingPromise?: Promise<boolean>;
    __oomolTrackingConsent?: TrackingConsentState;
    dataLayer?: unknown[];
    gtag?: GtagFunction;
  }
}

const GOOGLE_ANALYTICS_ID = "G-4BP2RZ6YFF";
const GOOGLE_ADS_ID = "AW-17222662466";
const GOOGLE_ADS_DOWNLOAD_CONVERSION_ID = "AW-17222662466/zd4PCKjnmeIaEMLys5RA";
const GOOGLE_ADS_FIRST_LOGIN_CONVERSION_ID =
  "AW-17222662466/iUF7CKXnmeIaEMLys5RA";
const CLOUDFLARE_BEACON_SRC =
  "https://static.cloudflareinsights.com/beacon.min.js";
const CLOUDFLARE_BEACON_TOKEN = "80d2394da3f3405dbada0e172278e3a0";
const COOKIE_FIRST_SIGN_IN = "oomol-first-login";
const OOMOL_ROOT_DOMAIN = "oomol.com";

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

function getCookieCandidateDomains(
  hostname: string
): Array<string | undefined> {
  const normalizedHostname = hostname.toLowerCase();
  const rootDomain = getCookieDomain(normalizedHostname);

  return Array.from(
    new Set([
      undefined,
      normalizedHostname,
      `.${normalizedHostname}`,
      rootDomain,
      rootDomain ? `.${rootDomain}` : undefined,
    ])
  );
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

function deleteCookie(name: string, domain?: string) {
  const parts = [
    `${name}=`,
    "Path=/",
    "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    "SameSite=Lax",
  ];

  if (domain) {
    parts.push(`Domain=${domain}`);
  }

  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    parts.push("Secure");
  }

  document.cookie = parts.join("; ");
}

function removeCookieEverywhere(name: string) {
  if (typeof window === "undefined") {
    return;
  }

  for (const domain of getCookieCandidateDomains(window.location.hostname)) {
    deleteCookie(name, domain);
  }
}

function setTrackingConsentState(consentState: TrackingConsentState) {
  if (typeof window === "undefined") {
    return;
  }

  window.__oomolTrackingConsent = consentState;
}

function isAdvertisingEnabled(): boolean {
  return typeof window !== "undefined"
    ? window.__oomolTrackingConsent?.advertising === true
    : false;
}

function ensureGtag(): Promise<boolean> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.resolve(false);
  }

  if (window.__oomolGoogleTagLoaded) {
    return Promise.resolve(true);
  }

  if (window.__oomolGoogleTagLoadingPromise) {
    return window.__oomolGoogleTagLoadingPromise;
  }

  window.__oomolGoogleTagLoadingPromise = new Promise<boolean>(resolve => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src*="googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}"]`
    );

    if (existingScript) {
      window.__oomolGoogleTagLoaded = true;
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
    script.onload = () => {
      window.__oomolGoogleTagLoaded = true;
      resolve(true);
    };
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  }).finally(() => {
    window.__oomolGoogleTagLoadingPromise = undefined;
  });

  return window.__oomolGoogleTagLoadingPromise;
}

function initializeGtag() {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== "function") {
    window.gtag = ((...args: unknown[]) => {
      window.dataLayer?.push(args);
    }) as unknown as NonNullable<Window["gtag"]>;
  }

  if (!window.__oomolGoogleTagConfigured) {
    window.gtag("js", new Date());
    window.gtag("consent", "default", {
      ad_personalization: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      analytics_storage: "denied",
    } as unknown as Gtag.ConsentParams);
    window.__oomolGoogleTagConfigured = {
      ads: false,
      analytics: false,
    };
  }
}

function setGoogleDisableFlags(consentState: TrackingConsentState) {
  if (typeof window === "undefined") {
    return;
  }

  (
    window as unknown as Window & {
      [key: `ga-disable-${string}`]: boolean | undefined;
    }
  )[`ga-disable-${GOOGLE_ANALYTICS_ID}`] = !consentState.analytics;
  (
    window as unknown as Window & {
      [key: `ga-disable-${string}`]: boolean | undefined;
    }
  )[`ga-disable-${GOOGLE_ADS_ID}`] = !consentState.advertising;
}

export function hasGtag(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

export function clearTrackingConsentState() {
  setTrackingConsentState({
    advertising: false,
    analytics: false,
  });
}

export function trackGtagEvent(
  eventName: string,
  params?: Record<string, unknown>
): boolean {
  if (!hasGtag()) {
    return false;
  }

  window.gtag?.("event", eventName, params);
  return true;
}

export function updateGoogleConsent(
  consentState: TrackingConsentState
): boolean {
  if (!hasGtag()) {
    return false;
  }

  window.gtag?.("consent", "update", {
    ad_storage: consentState.advertising ? "granted" : "denied",
    ad_user_data: consentState.advertising ? "granted" : "denied",
    ad_personalization: consentState.advertising ? "granted" : "denied",
    analytics_storage: consentState.analytics ? "granted" : "denied",
  } as unknown as Gtag.ConsentParams);

  return true;
}

export async function syncGoogleTracking(consentState: TrackingConsentState) {
  setTrackingConsentState(consentState);
  setGoogleDisableFlags(consentState);

  if (!consentState.analytics && !consentState.advertising) {
    updateGoogleConsent(consentState);
    return;
  }

  const scriptLoaded = await ensureGtag();

  if (!scriptLoaded) {
    return;
  }

  initializeGtag();
  updateGoogleConsent(consentState);

  if (consentState.analytics && !window.__oomolGoogleTagConfigured?.analytics) {
    window.gtag?.("config", GOOGLE_ANALYTICS_ID);
    window.__oomolGoogleTagConfigured = {
      ads: window.__oomolGoogleTagConfigured?.ads ?? false,
      analytics: true,
    };
  }

  if (consentState.advertising && !window.__oomolGoogleTagConfigured?.ads) {
    window.gtag?.("config", GOOGLE_ADS_ID);
    window.__oomolGoogleTagConfigured = {
      ads: true,
      analytics: window.__oomolGoogleTagConfigured?.analytics ?? false,
    };
  }
}

export function clearGoogleAnalyticsCookies() {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  const cookieNames = document.cookie
    .split(";")
    .map(cookieItem => cookieItem.trim().split("=")[0])
    .filter(Boolean);

  for (const cookieName of cookieNames) {
    if (!/^(_ga|_gid|_gat|_ga_)/.test(cookieName)) {
      continue;
    }

    for (const domain of getCookieCandidateDomains(window.location.hostname)) {
      deleteCookie(cookieName, domain);
    }
  }
}

export function ensureCloudflareBeacon() {
  if (
    typeof document === "undefined" ||
    typeof window === "undefined" ||
    window.__oomolCloudflareLoaded
  ) {
    return;
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${CLOUDFLARE_BEACON_SRC}"]`
  );

  if (existingScript) {
    window.__oomolCloudflareLoaded = true;
    return;
  }

  const script = document.createElement("script");
  script.defer = true;
  script.src = CLOUDFLARE_BEACON_SRC;
  script.setAttribute(
    "data-cf-beacon",
    JSON.stringify({ token: CLOUDFLARE_BEACON_TOKEN })
  );
  document.head.appendChild(script);
  window.__oomolCloudflareLoaded = true;
}

export function trackAdsConversion(sendTo: string): boolean {
  if (!isAdvertisingEnabled()) {
    return false;
  }

  return trackGtagEvent("conversion", { send_to: sendTo });
}

export function trackDownloadConversion(): boolean {
  return trackAdsConversion(GOOGLE_ADS_DOWNLOAD_CONVERSION_ID);
}

export function trackFirstLoginConversion() {
  const firstLoginCookie = readCookie(COOKIE_FIRST_SIGN_IN);

  if (!firstLoginCookie) {
    return;
  }

  removeCookieEverywhere(COOKIE_FIRST_SIGN_IN);

  const tryTrackConversion = (remainingAttempts = 20) => {
    if (trackAdsConversion(GOOGLE_ADS_FIRST_LOGIN_CONVERSION_ID)) {
      return;
    }

    if (remainingAttempts <= 1) {
      return;
    }

    window.setTimeout(() => {
      tryTrackConversion(remainingAttempts - 1);
    }, 100);
  };

  tryTrackConversion();
}
