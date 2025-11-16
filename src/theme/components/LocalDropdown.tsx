import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { DocusaurusContext } from "@docusaurus/types";
import { useAlternatePageUtils } from "@docusaurus/theme-common/internal";
import { Button } from "@site/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@site/src/components/ui/dropdown-menu";
import BrowserOnly from "@docusaurus/BrowserOnly";

export interface LocalDropdownProps {
  queryString?: string;
}

const localeMap = {
  "zh-CN": "简体中文",
  en: "English",
};

const formateLocale = (locale: string) => {
  return localeMap[locale] || locale;
};

export const LocalDropdown = ({ queryString = "" }: LocalDropdownProps) => {
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

    if (typeof window !== 'undefined') {
      const cookieValue = "OOMOL_LOCALE=" + locale + "; path=/; domain=." + window.location.host + "; max-age=31536000";
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
            <Button variant="ghost" className="gap-2">
              <div className="i-codicon-globe" />
              {formateLocale(currentLocale)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup value={currentLocale} onValueChange={handleLocaleChange}>
              {locales.map(locale => (
                <DropdownMenuRadioItem key={locale} value={locale}>
                  {formateLocale(locale)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </BrowserOnly>
  );
};
