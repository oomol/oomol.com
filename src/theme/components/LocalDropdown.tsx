import styles from "./LocalDropdown.module.scss";

import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useAlternatePageUtils } from "@docusaurus/theme-common/internal";
import { Button } from "@site/src/components/Button";
import { useState } from "react";

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
  } = useDocusaurusContext() as any;
  const alternatePageUtils = useAlternatePageUtils();
  const { search, hash } = useLocation();

  const [isShow, setIsShow] = useState(false);

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
            <a
              key={locale}
              href={to}
              className={`${styles.item} ${locale === currentLocale ? styles.selected : ""}`}
              onClick={() => localStorage.setItem("locale", locale)}
            >
              <div>{formateLocale(locale)}</div>
            </a>
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
      <Button
        className={styles["language-btn"]}
        icon={<div className="i-codicon-globe" />}
        iconPosition="start"
      >
        {formateLocale(currentLocale)}
      </Button>
    </div>
  );
};
