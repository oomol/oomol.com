import { useState, useEffect } from "react";

export const useThemeMode = () => {
  // 此处 typeof window !== "undefined" 是为了避开服务端渲染，构建时候会找不到 window 对象
  // ref: https://docusaurus.io/docs/advanced/ssg

  if (typeof window !== "undefined") {
    const [themeMode, setThemeMode] = useState(
      localStorage.getItem("themeMode")
    );

    useEffect(() => {
      const htmlElement = document.documentElement;
      const dataTheme = htmlElement.getAttribute("data-theme");

      // 设置初始主题模式
      setThemeMode(dataTheme);

      // 监听主题模式变化
      const observer = new MutationObserver(mutationsList => {
        for (let mutation of mutationsList) {
          if (mutation.attributeName === "data-theme") {
            setThemeMode(htmlElement.getAttribute("data-theme"));
          }
        }
      });

      observer.observe(htmlElement, { attributes: true });

      return () => observer.disconnect();
    }, []);

    return themeMode;
  }
};
