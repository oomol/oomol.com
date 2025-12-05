import "../../styles/uno.css";
import styles from "./styles.module.scss";

import type { ReactNode } from "react";

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

  return (
    <LayoutProvider>
      <Navbar />
      <div className={clsx(styles.wrapper, wrapperClassName)}>{children}</div>
      <Footer />
    </LayoutProvider>
  );
};

export default Layout;
