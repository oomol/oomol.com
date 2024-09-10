const UnoCSS = require("@unocss/webpack").default;
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
  clientModules: ["./scripts/redirect-lang.ts"],

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
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      colorMode: {
        defaultMode: "dark",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        logo: {
          alt: "Oomol Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "overview",
            position: "left",
            label: "Docs",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          // { to: "/pricing", label: "Pricing", position: "left" },
          { to: "/updates", label: "Updates", position: "left" },
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
                to: "/docs/overview",
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
        appId: "36S5HY6ZV7",

        //  公开 API 密钥：提交它没有危险
        apiKey: "26b6fe54af78be1bd1fbe98e758d4c7f",

        indexName: "prod_oomol_com",

        // 可选：见下文
        contextualSearch: true,

        // 可选：声明哪些域名需要用 window.location 型的导航而不是 history.push。 适用于 Algolia 配置会爬取多个文档站点，而我们想要用 window.location.href 在它们之间跳转时。
        // externalUrlRegex: 'external\\.com|domain\\.com',

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
};

export default config;
