import "../../styles/uno.css";
import styles from "./styles.module.scss";

import type { ReactNode } from "react";

import { CookieConsentProvider } from "@site/src/components/CookieConsent/CookieConsentProvider";
import Footer from "@theme/Footer";
import LayoutProvider from "@theme/Layout/Provider";
import Navbar from "@theme/Navbar";
import { clsx } from "clsx";
import React from "react";

interface LayoutProps {
  children: ReactNode;
  wrapperClassName?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, wrapperClassName }) => {
  return (
    <LayoutProvider>
      <Navbar />
      <div className={clsx(styles.wrapper, wrapperClassName)}>{children}</div>
      <Footer />
      <CookieConsentProvider />
    </LayoutProvider>
  );
};

export default Layout;
