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

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-CN"],
  },
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
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
        onUntruncatedBlogPosts: "ignore",
      },
    ],
    function () {
      return {
        name: "docusaurus-plugin-inject-html",
        injectHtmlTags() {
          return {
            headTags: [
              `<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "80d2394da3f3405dbada0e172278e3a0"}'></script><!-- End Cloudflare Web Analytics -->`,
              // Google tag manager
              `<script async src="https://www.googletagmanager.com/gtag/js?id=G-DYDQECKKB5"></script>`,
              // Configure Google Analytics and Google Ads
              `<script>window.dataLayer=window.dataLayer||[]; function gtag(){dataLayer.push(arguments)} gtag('js',new Date()); gtag('config','G-DYDQECKKB5'); gtag('config','AW-17222662466');</script>`,
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
          onUntruncatedBlogPosts: "ignore",
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
      metadata: [
        {
          name: "keywords",
          content:
            "workflow, AI platform, workflow automation, service integration, code connector, workflow management, developer tools, AI workflow, service orchestration, automation platform, OOMOL",
        },
        {
          name: "description",
          content: "Create, Share and Use AI Tools",
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
            tagline: "Create, Share and Use AI Tools",
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
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "OOMOL",
        logo: {
          alt: "OOMOL Logo",
          src: "img/logo-en-light.svg",
          srcDark: "img/logo-en-dark.svg",
        },
        items: [
          {
            type: "dropdown",
            label: "Product",
            position: "left",
            items: [
              {
                to: "/studio",
                label: "navbar.oomol-studio",
                className: "navbar-item-with-icon navbar-item-studio",
              },
              {
                to: "/chat",
                label: "navbar.oomol-chat",
                className: "navbar-item-with-icon navbar-item-chat",
              },
              {
                to: "/cloud",
                label: "navbar.oomol-cloud",
                className: "navbar-item-with-icon navbar-item-cloud",
              },
              {
                to: "/headless",
                label: "navbar.oomol-headless",
                className: "navbar-item-with-icon navbar-item-headless",
              },
            ],
          },
          {
            type: "doc",
            docId: "get-started/quickstarts",
            position: "left",
            label: "Docs",
          },
          { to: "/updates", label: "Updates", position: "left" },
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/contact-us", label: "Community", position: "left" },
          { to: "/pricing", label: "Pricing", position: "left" },
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
                label: "Contact Us",
                to: "/contact-us",
              },
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
        additionalLanguages: ["json"],
      },
    }),
  future: {
    v4: true,
    experimental_faster: true,
  },
};

export default config;
