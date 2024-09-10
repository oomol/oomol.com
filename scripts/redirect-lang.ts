import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

(() => {
  // not in browser
  if (!ExecutionEnvironment.canUseDOM) return;

  function redirect() {
    const rootPath = "/";
    const matchRouteRoot = location.pathname === rootPath;

    const localLocale = localStorage.getItem("locale");

    if (!localLocale) {
      const isZhCN = navigator.language.includes("zh-");

      if (matchRouteRoot) {
        if (isZhCN) {
          location.pathname = location.pathname.replace("/", "/zh-CN/");
          localStorage.setItem("locale", "zh-CN");
          return;
        }

        localStorage.setItem("locale", "en");
      }
    }

    if (matchRouteRoot) {
      // 如果当前 localStorage 的语言为英文, 且当前路径为中文首页，则跳转到英文首页 "/"
      if (localLocale === "en" && location.pathname.startsWith("/zh-CN/")) {
        location.pathname = location.pathname.replace("/zh-CN/", "/");
        return;
      }

      //如果当前 localStorage 的语言为中文, 且当前路径为英文首页，则跳转到中文首页 "/zh-CN/"
      if (localLocale === "zh-CN" && !location.pathname.startsWith("/zh-CN/")) {
        location.pathname = location.pathname.replace("/", "/zh-CN/");
        return;
      }
    }
  }

  redirect();
})();
