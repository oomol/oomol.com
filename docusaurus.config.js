// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Oomol',
  tagline: 'Oomol are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-test-site.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        logo: {
          alt: 'Oomol Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/price/intro', label: 'Price', position: 'left'},
          {to: '/releases', label: 'Releases', position: 'left'},
          // TODO: 等登录注册有网页版再放出来
          // {
          //   to: '/login',
          //   label: 'Login',
          //   position: 'right',
          // },
          // {
          //   to: '/signup',
          //   label: 'Sign Up',
          //   position: 'right',
          // },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      
      footer: {
        style: 'light',
        links: [
          {
            title: 'Repositories',
            items: [
              {
                label: 'OOMOL',
                href: '/',
                target: '_self',
              },
              {
                label: 'OOMOL-Studio',
                href: 'https://github.com/oomol/oomol-studio',
                target: '_self',
              },
            ],
          },
          {
            title: 'Contact',
            items: [
              {
                label: 'Mail',
                href: 'mailto:contact@oomol-studio',
                target: '_self',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/oomol-studio',
                target: '_self',
              },
            ],
          },
          {
            title: 'Network',
            items: [
              {
                label: 'Blog',
                to: 'blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/oomol/oomol-studio',
                target: '_self',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Sponsors',
                to: '/#sponsors',
              },
              {
                label: 'Discord',
                href: '/',
                target: '_self',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} OOMOL Studio Contributors. CC-BY / MIT`,
      },
      // TODO: 当前还不需要搜索模块，等内容更全了再添加
      algolia: {
        // Algolia 提供的应用 ID
        appId: 'YOUR_APP_ID',

        //  公开 API 密钥：提交它没有危险
        apiKey: 'YOUR_SEARCH_API_KEY',

        indexName: 'YOUR_INDEX_NAME',

        // 可选：见下文
        contextualSearch: true,

        // 可选：声明哪些域名需要用 window.location 型的导航而不是 history.push。 适用于 Algolia 配置会爬取多个文档站点，而我们想要用 window.location.href 在它们之间跳转时。
        // externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        //... other Algolia params
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
