export const COOKIE_KEY = "cc_cookie";
export const COOKIE_EXPIRATION_DAYS = 365;

export type ConsentStatus = {
  consented: boolean;
  timestamp: string;
};

export type DetailedCookieConsent = {
  Analytics: ConsentStatus;
  Social: ConsentStatus;
  Advertising: ConsentStatus;
};

export type LegacyConsentCookie = {
  categories?: string[];
  consentTimestamp?: string;
  lastConsentTimestamp?: string;
};

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

export function normalizeDetailedConsent(raw: unknown): DetailedCookieConsent {
  const safeStatus = (status: unknown, fallbackTs: string): ConsentStatus => {
    if (
      status &&
      typeof status === "object" &&
      "consented" in status &&
      "timestamp" in status &&
      typeof (status as ConsentStatus).consented === "boolean" &&
      typeof (status as ConsentStatus).timestamp === "string"
    ) {
      return status as ConsentStatus;
    }

    return { consented: false, timestamp: fallbackTs };
  };

  const existingTimestamps: number[] = [];

  try {
    if (raw && typeof raw === "object") {
      for (const s of Object.values(raw as Record<string, ConsentStatus>)) {
        const t = s?.timestamp ? new Date(s.timestamp).getTime() : NaN;
        if (!Number.isNaN(t)) {
          existingTimestamps.push(t);
        }
      }
    }
  } catch {
    // ignore
  }

  const baseTimestamp = existingTimestamps.length
    ? new Date(Math.min(...existingTimestamps)).toISOString()
    : new Date().toISOString();

  const r = raw as Partial<DetailedCookieConsent> | null | undefined;

  return {
    Analytics: safeStatus(r?.Analytics, baseTimestamp),
    Social: safeStatus(r?.Social, baseTimestamp),
    Advertising: safeStatus(r?.Advertising, baseTimestamp),
  };
}

export function migrateLegacyConsentCookie() {
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

export function readStoredConsent(): DetailedCookieConsent | null {
  if (typeof document === "undefined") {
    return null;
  }

  const raw = readCookie(COOKIE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    const normalized = normalizeDetailedConsent(parsed);
    const oldestTimestamp = Math.min(
      ...Object.values(normalized).map(status =>
        new Date(status.timestamp).getTime()
      )
    );
    const expirationTime =
      oldestTimestamp + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

    if (Date.now() > expirationTime) {
      writeCookie(COOKIE_KEY, "", -COOKIE_EXPIRATION_DAYS);
      return null;
    }

    return normalized;
  } catch {
    return null;
  }
}

export function persistConsent(detailed: DetailedCookieConsent) {
  writeCookie(COOKIE_KEY, JSON.stringify(detailed), COOKIE_EXPIRATION_DAYS);
}

export function buildConsent(
  analytics: boolean,
  advertising: boolean
): DetailedCookieConsent {
  const timestamp = new Date().toISOString();

  return {
    Analytics: { consented: analytics, timestamp },
    Social: { consented: false, timestamp },
    Advertising: { consented: advertising, timestamp },
  };
}
