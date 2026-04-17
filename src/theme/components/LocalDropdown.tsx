import styles from "./LocalDropdown.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import BrowserOnly from "@docusaurus/BrowserOnly";
import { useLocation } from "@docusaurus/router";
import { useAlternatePageUtils } from "@docusaurus/theme-common/internal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@site/src/components/ui/dropdown-menu";
import { Check } from "lucide-react";

export interface LocalDropdownProps {
  queryString?: string;
  triggerClassName?: string;
}

const localeMap = {
  "zh-CN": "简体中文",
  en: "English",
};

const formateLocale = (locale: string) => {
  return localeMap[locale] || locale;
};

export const LocalDropdown = ({
  queryString = "",
  triggerClassName,
}: LocalDropdownProps) => {
  const {
    i18n: { currentLocale, locales },
  } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string; locales: string[] };
  };
  const alternatePageUtils = useAlternatePageUtils();
  const { search, hash } = useLocation();

  const handleLocaleChange = (locale: string) => {
    if (locale === currentLocale) {
      return;
    }

    if (typeof window !== "undefined") {
      const cookieValue =
        "OOMOL_LOCALE=" +
        locale +
        "; path=/; domain=." +
        window.location.host +
        "; max-age=31536000";
      window.document.cookie = cookieValue;
    }

    const baseTo = alternatePageUtils.createUrl({
      locale,
      fullyQualified: false,
    });
    const to = baseTo + search + hash + queryString;
    window.location.href = to;
  };

  return (
    <BrowserOnly>
      {() => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={`${styles.triggerButton}${triggerClassName ? ` ${triggerClassName}` : ""}`}
              size="sm"
              variant="ghost"
            >
              <i className={`i-codicon-globe ${styles.triggerIcon}`} />
              {formateLocale(currentLocale)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className={styles.menu}>
            {locales.map(locale => (
              <DropdownMenuItem
                key={locale}
                className={styles.menuItem}
                onSelect={() => handleLocaleChange(locale)}
              >
                <span className="flex-1">{formateLocale(locale)}</span>
                {locale === currentLocale && (
                  <Check className="ml-auto size-4 text-[var(--oomol-primary)]" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </BrowserOnly>
  );
};
