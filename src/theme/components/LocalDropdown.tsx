import styles from "./LocalDropdown.module.scss";

import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { DocusaurusContext } from "@docusaurus/types";
import { useAlternatePageUtils } from "@docusaurus/theme-common/internal";
import { Button } from "@site/src/components/ui/button";
import { useState } from "react";
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

  const [isShow, setIsShow] = useState(false);

  const handleLocaleChange = (locale: string) => {
    // 设置语言 cookie - 这是必要的副作用
    if (typeof window !== 'undefined') {
      const newCookie = `OOMOL_LOCALE=${locale}; path=/; domain=.${window.location.host}; max-age=31536000`;
      // eslint-disable-next-line react-hooks/immutability
      window.document.cookie = newCookie;
    }

    if (locale === currentLocale) {
      return;
    }
  };

  const renderBtnContent = () => {
    return (
      <div className={styles["item-box"]}>
        {locales.map(locale => {
          const baseTo = `${alternatePageUtils.createUrl({
            locale,
            fullyQualified: false,
          })}`;
          // preserve ?search#hash suffix on locale switches
          const to = `${baseTo}${search}${hash}${queryString}`;
          return (
            <BrowserOnly key={locale}>
              {() => (
                <a
                  href={to}
                  className={`${styles.item} ${locale === currentLocale ? styles.selected : ""}`}
                  onClick={() => handleLocaleChange(locale)}
                >
                  <div>{formateLocale(locale)}</div>
                </a>
              )}
            </BrowserOnly>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
    >
      <div className={styles.content}>{isShow && renderBtnContent()}</div>
      <Button className={styles["language-btn"]}>
        <div className="i-codicon-globe" />
        {formateLocale(currentLocale)}
      </Button>
    </div>
  );
};
