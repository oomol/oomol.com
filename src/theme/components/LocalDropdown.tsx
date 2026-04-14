import styles from "./LocalDropdown.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import { Dropdown, Menu } from "@arco-design/web-react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useLocation } from "@docusaurus/router";
import { useAlternatePageUtils } from "@docusaurus/theme-common/internal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";

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
        <Dropdown
          droplist={
            <Menu
              className={styles.menu}
              onClickMenuItem={handleLocaleChange}
              selectedKeys={[currentLocale]}
            >
              {locales.map(locale => (
                <Menu.Item className={styles.menuItem} key={locale}>
                  {formateLocale(locale)}
                </Menu.Item>
              ))}
            </Menu>
          }
          position="top"
          trigger="click"
        >
          <Button className={styles.triggerButton} size="sm" variant="ghost">
            <i className={`i-codicon-globe ${styles.triggerIcon}`} />
            {formateLocale(currentLocale)}
          </Button>
        </Dropdown>
      )}
    </BrowserOnly>
  );
};
