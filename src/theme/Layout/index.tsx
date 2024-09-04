import "uno.css";
import "../../styles/uno.css";
import styles from "./styles.module.scss";

import React, { ReactNode, useEffect } from "react";
import LayoutProvider from "@theme/Layout/Provider";
import clsx from "clsx";
import Navbar from "@theme/Navbar";
import Footer from "@theme/Footer";
import BrowserOnly from "@docusaurus/BrowserOnly";

interface LayoutProps {
  children: ReactNode;
  wrapperClassName?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, wrapperClassName }) => {
  // REFACTOR: 因为不使用 arco-theme 暂时注释掉主题模式的切换
  // useEffect(() => {
  //   const htmlElement = document.documentElement;

  //   const handleThemeChange = () => {
  //     const themeMode = htmlElement.getAttribute("data-theme");
  //     if (themeMode === "dark") {
  //       document.body.setAttribute("arco-theme", "dark");
  //     } else {
  //       document.body.removeAttribute("arco-theme");
  //     }
  //   };

  //   // 初始设置主题模式
  //   handleThemeChange();

  //   // 监听 data-theme 属性变化
  //   const observer = new MutationObserver(mutationsList => {
  //     for (let mutation of mutationsList) {
  //       if (mutation.attributeName === "data-theme") {
  //         handleThemeChange();
  //       }
  //     }
  //   });
  //   observer.observe(htmlElement, { attributes: true });

  //   return () => observer.disconnect();
  // }, []);

  useEffect(() => {
    // 因为 defaultLocale 默认是英文，所以 "/" 为英文首页，中文首页的根目录则为 "/zh-CN/" 开头
    const rootPath = "/";
    const matchRouteRoot = location.pathname === rootPath;

    const localLocale = localStorage.getItem("locale");

    if (!localLocale) {
      return;
    }

    if (matchRouteRoot) {
      // 如果当前 localStorage 的语言为英文, 且当前路径为中文首页，则跳转到英文首页 "/"
      if (localLocale === "en" && location.pathname.startsWith("/zh-CN/")) {
        location.pathname = location.pathname.replace("/zh-CN/", "/");
        return;
      }

      // 如果当前 localStorage 的语言为中文, 且当前路径为英文首页，则跳转到中文首页 "/zh-CN/"
      if (localLocale === "zh-CN" && !location.pathname.startsWith("/zh-CN/")) {
        location.pathname = location.pathname.replace("/", "/zh-CN/");
        return;
      }
    }
  }, []);

  return (
    <BrowserOnly>
      {() => (
        <LayoutProvider>
          <Navbar />
          <div className={clsx(styles.wrapper, wrapperClassName)}>
            {children}
          </div>
          <Footer />
        </LayoutProvider>
      )}
    </BrowserOnly>
  );
};

export default Layout;
