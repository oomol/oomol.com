import "@arco-themes/react-oomol/css/arco.css";
import styles from "./styles.module.scss";

import React, { ReactNode, useEffect } from "react";
import LayoutProvider from "@theme/Layout/Provider";
import clsx from "clsx";
import Navbar from "@theme/Navbar";
import Footer from "@theme/Footer";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { ConfigProvider } from "@arco-design/web-react";
import { componentConfig } from "@arco-themes/react-oomol/config";

interface LayoutProps {
  children: ReactNode;
  wrapperClassName?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, wrapperClassName }) => {
  useEffect(() => {
    const htmlElement = document.documentElement;

    const handleThemeChange = () => {
      const themeMode = htmlElement.getAttribute("data-theme");
      if (themeMode === "dark") {
        document.body.setAttribute("arco-theme", "dark");
      } else {
        document.body.removeAttribute("arco-theme");
      }
    };

    // 初始设置主题模式
    handleThemeChange();

    // 监听 data-theme 属性变化
    const observer = new MutationObserver(mutationsList => {
      for (let mutation of mutationsList) {
        if (mutation.attributeName === "data-theme") {
          handleThemeChange();
        }
      }
    });
    observer.observe(htmlElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <BrowserOnly>
      {() => (
        <ConfigProvider componentConfig={componentConfig}>
          <LayoutProvider>
            <Navbar />
            <div className={clsx(styles.wrapper, wrapperClassName)}>
              {children}
            </div>
            <Footer />
          </LayoutProvider>
        </ConfigProvider>
      )}
    </BrowserOnly>
  );
};

export default Layout;
