const UnoCSS = require("@unocss/webpack");
const path = require("path");

import { themes } from "prism-react-renderer";

const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "OOMOL",
  tagline: "Easily connect code and services",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://oomol.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "oomol", // Usually your GitHub org/user name.
  projectName: "oomol.com", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-CN"],
  },
  plugins: [
    "docusaurus-plugin-sass",
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "updates",
        routeBasePath: "updates",
        path: "./updates",
        showReadingTime: true,
        blogSidebarCount: "ALL",
        blogSidebarTitle: "Updates",
      },
    ],
    function () {
      return {
        name: "docusaurus-plugin-inject-html",
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: "script",
                innerHTML: `
  (() => {
  // not in browser
  if (typeof window === "undefined") return;

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
`,
              },
              ,
            ],
          };
        },
      };
    },
    function () {
      return {
        name: "unocss",
        configureWebpack() {
          return {
            plugins: [UnoCSS(path.join(__dirname, "uno.config.ts"))],
            optimization: {
              realContentHash: true,
            },
          };
        },
      };
    },
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: "ALL",
          blogSidebarTitle: "All posts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.scss")],
        },
        gtag: {
          trackingID: "G-RN1L1NVSQK",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: "keywords",
          content:
            "workflow, AI platform, workflow automation, service integration, code connector, workflow management, developer tools, AI workflow, service orchestration, automation platform, OOMOL",
        },
        {
          name: "description",
          content: "AI Programmable Workflow Platform",
        },
      ],
      headTags: [
        {
          tagName: "script",
          attributes: {
            type: "application/ld+json",
          },
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "OOMOL",
            tagline: "AI Programmable Workflow Platform",
            favicon: "img/favicon.ico",
            url: "https://oomol.com",
            sameAs: ["https://hub.oomol.com"],
            // TODO: add logo to the website
            // logo: "https://oomol.com/logo.svg",
          }),
        },
      ],

      // Replace with your project's social card
      colorMode: {
        defaultMode: "dark",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: "OOMOL",
        logo: {
          alt: "OOMOL Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            to: "/features",
            label: "Features",
            position: "left",
          },
          {
            type: "doc",
            docId: "get-started/quickstarts",
            position: "left",
            label: "Docs",
          },
          { to: "/updates", label: "Updates", position: "left" },
          { to: "/pricing", label: "Pricing", position: "left" },
          { to: "/community", label: "Community", position: "left" },
          { to: "/downloads", label: "Downloads", position: "left" },
          // { to: "/blog", label: "Blog", position: "left" },
          // { to: "/pricing", label: "Pricing", position: "left" },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Product",
            items: [
              {
                label: "Roadmap",
                href: "https://github.com/orgs/oomol-lab/projects/1/views/1",
              },
              // {
              //   label: "Oomol Cloud",
              //   to: "/oomol-cloud",
              // },
              // {
              //   label: "Oomol Api",
              //   to: "/oomol-api",
              // },
              // {
              //   label: "Pricing",
              //   to: "/pricing",
              // },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Support",
                to: "/support",
              },
              // {
              //   label: "System Status",
              //   to: "/system-status",
              // },
              {
                label: "Brand Assets",
                to: "/brand-assets",
              },
              // {
              //   label: "Download",
              //   to: "/download",
              // },
            ],
          },
          {
            title: "Developers",
            items: [
              {
                label: "Documentation",
                to: "/docs/get-started/quickstarts",
              },
              {
                label: "Updates",
                to: "/updates",
              },
              // {
              //   label: "Open Source",
              //   to: "open-source",
              // },
              // {
              //   label: 'Contributing',
              //   to: 'contributing'
              // }
            ],
          },
          {
            title: "Company",
            items: [
              // {
              //   label: "About Us",
              //   to: "/about-us",
              // },
              // {
              //   label: "Blog",
              //   to: "/blog",
              // },
              {
                label: "Terms",
                to: "/terms",
              },
              {
                label: "Privacy",
                to: "/privacy",
              },
              // {
              //   label: 'Acceptable Use Policy',
              //   to: '/acceptable',
              // },
              // {
              //   label: 'Support Policy',
              //   to: '/support',
              // }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} OOMOL Contributors.`,
      },
      // TODO: 当前还不需要搜索模块，等内容更全了再添加
      algolia: {
        // Algolia 提供的应用 ID
        appId: "CY4DH1NDYK",

        //  公开 API 密钥：提交它没有危险
        apiKey: "94380a0fe06111f7a47c5d3b70a4f0c3",

        indexName: "oomol",

        // 可选：见下文
        contextualSearch: true,

        // 可选：声明哪些域名需要用 window.location 型的导航而不是 history.push。 适用于 Algolia 配置会爬取多个文档站点，而我们想要用 window.location.href 在它们之间跳转时。
        externalUrlRegex: "external\\.com|oomol\\.com",

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: "/docs/", // or as RegExp: /\/docs\//
          to: "/",
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        //... other Algolia params
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
      },
    }),
  future: {
    v4: true,
    experimental_faster: true,
  },
};

export default config;
