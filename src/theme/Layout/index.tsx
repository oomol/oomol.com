import "@arco-design/web-react/dist/css/arco.css";
import "../../styles/uno.css";
import styles from "./styles.module.scss";

import type { ReactNode } from "react";
import type { DocusaurusContext } from "@docusaurus/types";

import { useColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { ConfigProvider, Empty } from "@arco-design/web-react";
import enUS from "@arco-design/web-react/es/locale/en-US";
import zhCN from "@arco-design/web-react/es/locale/zh-CN";
import { CookieConsentProvider } from "@site/src/components/CookieConsent/CookieConsentProvider";
import Footer from "@theme/Footer";
import LayoutProvider from "@theme/Layout/Provider";
import Navbar from "@theme/Navbar";
import { clsx } from "clsx";
import React, { useEffect, useMemo } from "react";

interface LayoutProps {
  children: ReactNode;
  wrapperClassName?: string;
}

function ArcoBridge({ children }: { children: ReactNode }) {
  const { colorMode } = useColorMode();
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext() as unknown as DocusaurusContext;

  const arcoLocale = useMemo(
    () => (currentLocale === "zh-CN" ? zhCN : enUS),
    [currentLocale],
  );

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (colorMode === "dark") {
      document.body.setAttribute("arco-theme", "dark");
      return;
    }

    document.body.removeAttribute("arco-theme");
  }, [colorMode]);

  return (
    <ConfigProvider
      autoInsertSpaceInButton={false}
      componentConfig={{
        Button: {
          shape: "round",
        },
        Tabs: {
          animation: false,
          type: "rounded",
        },
        Table: {
          pagination: false,
          size: "small",
        },
      }}
      locale={arcoLocale}
      renderEmpty={componentName => (
        <Empty
          description={componentName ? `${componentName} is empty` : undefined}
        />
      )}
    >
      {children}
    </ConfigProvider>
  );
}

const Layout: React.FC<LayoutProps> = ({ children, wrapperClassName }) => {
  return (
    <LayoutProvider>
      <ArcoBridge>
        <Navbar />
        <div className={clsx(styles.wrapper, wrapperClassName)}>{children}</div>
        <Footer />
        <CookieConsentProvider />
      </ArcoBridge>
    </LayoutProvider>
  );
};

export default Layout;
