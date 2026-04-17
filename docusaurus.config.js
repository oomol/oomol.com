import { themes } from "prism-react-renderer";

const UnoCSS = require("@unocss/webpack");
const path = require("path");

const CATALOG_ENDPOINT = "https://connector.oomol.com/v1/catalog";

const DEFAULT_CATALOG_STATS = {
  providerCount: 1000,
  actionCount: 40000,
};

async function loadCatalogStats() {
  try {
    const response = await fetch(CATALOG_ENDPOINT);
    if (!response.ok) {
      throw new Error(`Failed to fetch catalog stats: ${response.status}`);
    }

    const result = await response.json();
    const providerCount = result?.data?.providerCount;
    const actionCount = result?.data?.actionCount;

    if (
      !result?.success ||
      typeof providerCount !== "number" ||
      !Number.isFinite(providerCount) ||
      providerCount < 0 ||
      typeof actionCount !== "number" ||
      !Number.isFinite(actionCount) ||
      actionCount < 0
    ) {
      throw new Error("Invalid catalog stats response");
    }

    return {
      providerCount,
      actionCount,
    };
  } catch (error) {
    console.warn(
      "[catalog-stats] Failed to load catalog stats, using fallback counts.",
      error
    );
    return DEFAULT_CATALOG_STATS;
  }
}


const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "OOMOL",
  tagline: "Start with oo-cli. Build in Studio. Deliver through Cloud.",
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
    mermaid: true,
  },
  headTags: [
    {
      tagName: "style",
      attributes: {},
      innerHTML: `
        [class*="themedComponent"] {
          display: none;
        }

        html[data-theme="light"] [class*="themedComponent--light"] {
          display: initial;
        }

        html[data-theme="dark"] [class*="themedComponent--dark"] {
          display: initial;
        }

        html:not([data-theme]) [class*="themedComponent--light"] {
          display: initial;
        }
      `,
    },
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "OOMOL",
        description:
          "Let agents use your apps, APIs, and internal tools through one continuous path from oo-cli to Studio and Cloud.",
        url: "https://oomol.com",
        logo: "https://oomol.com/img/logo2x.png",
        sameAs: ["https://hub.oomol.com"],
      }),
    },
  ],
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
    function catalogStatsPlugin() {
      return {
        name: "catalog-stats",
        async loadContent() {
          return loadCatalogStats();
        },
        contentLoaded({ content, actions }) {
          actions.setGlobalData(content);
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

  themes: ["@docusaurus/theme-mermaid"],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: "keywords",
          content:
            "agent tools, oo-cli, OOMOL Studio, OOMOL Cloud, MCP tools, workflow automation, connectors, cloud tasks, developer tools, OOMOL",
        },
        {
          name: "description",
          content:
            "Let agents use your apps, APIs, and internal tools. Start with oo-cli, build in Studio when needed, and deliver through Cloud.",
        },
        { property: "og:site_name", content: "OOMOL" },
        { property: "og:type", content: "website" },
        {
          property: "og:image",
          content: "https://oomol.com/img/og-default.png",
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: "https://oomol.com/img/og-default.png",
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
            label: "Product",
            position: "left",
            className: "productDropdown",
            items: [
              {
                to: "/docs/oo-cli",
                label: "navbar.oo-cli",
                className: "productDropdownItem productDropdownItemCli",
              },
              {
                to: "/studio",
                label: "navbar.oomol-studio",
                className: "productDropdownItem productDropdownItemStudio",
              },
              {
                to: "/cloud",
                label: "navbar.oomol-cloud",
                className: "productDropdownItem productDropdownItemCloud",
              },
              {
                to: "/app",
                label: "navbar.oomol-ai",
                className: "productDropdownItem productDropdownItemAi",
              },
            ],
          },
          { to: "/downloads", label: "navbar.download", position: "left" },
          {
            type: "doc",
            docId: "overview",
            position: "left",
            label: "Docs",
          },
          { to: "/pricing", label: "navbar.pricing", position: "left" },
          { to: "/updates", label: "Updates", position: "left" },
          { to: "/blog", label: "Blog", position: "left" },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Platform",
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
            title: "Support",
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
      mermaid: {
        theme: { light: "base", dark: "dark" },
      },
    }),
  future: {
    v4: true,
    experimental_faster: true,
  },
};

export default config;
