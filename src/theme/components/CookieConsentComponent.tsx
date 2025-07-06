import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import { CookieConsentConfig } from "vanilla-cookieconsent";

const pluginConfig: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom right",
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      position: "left",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },

  autoShow: true,

  onFirstConsent: function () {
    console.log("onFirstAction fired");
    // 可以在这里添加首次同意时的自定义逻辑
  },

  onConsent: function ({ cookie }) {
    console.log("onConsent fired ...");
    // 当用户同意时，可以在这里初始化分析工具
    if (cookie.categories.includes("analytics")) {
      // 如果用户同意分析类 cookie，可以在这里初始化 Google Analytics 等
      console.log("Analytics cookies accepted");
    }
  },

  onChange: function ({ changedCategories, cookie }) {
    console.log("onChange fired ...");
    // 当用户更改同意设置时，可以在这里更新分析工具设置
    if (changedCategories.includes("analytics")) {
      if (cookie.categories.includes("analytics")) {
        console.log("Analytics cookies accepted");
        // 重新启用分析
      } else {
        console.log("Analytics cookies rejected");
        // 禁用分析
      }
    }
  },

  categories: {
    necessary: {
      readOnly: true,
      enabled: true,
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^(_ga|_gid)/,
          },
        ],
      },
    },
  },

  language: {
    default: "en",

    translations: {
      en: {
        consentModal: {
          title: "Cookie 设置",
          description:
            '我们的网站使用 Cookie 来了解您如何与它交互。只有在您明确接受的情况下，跟踪才会启用。<a href="/privacy" data-cc="show-preferencesModal" class="cc__link">管理偏好设置</a>',
          acceptAllBtn: "接受全部",
          acceptNecessaryBtn: "仅接受必要的",
          showPreferencesBtn: "管理偏好设置",
          //closeIconLabel: 'Close',
          footer: `
            <a href="/privacy">隐私政策</a>
            <a href="/terms">使用条款</a>
          `,
        },
        preferencesModal: {
          title: "Cookie 偏好设置",
          acceptAllBtn: "接受全部",
          acceptNecessaryBtn: "仅接受必要的",
          savePreferencesBtn: "保存偏好设置",
          closeIconLabel: "关闭",
          sections: [
            {
              title: "Cookie 使用说明",
              description:
                '我们使用 Cookie 来确保网站的基本功能并增强您的在线体验。您可以随时为每个类别选择加入/退出。有关 Cookie 和其他敏感数据的更多详细信息，请阅读完整的 <a href="/privacy" class="cc__link">隐私政策</a>。',
            },
            {
              title: "必要的 Cookie",
              description:
                "这些 Cookie 对于网站的基本功能是必不可少的，无法禁用。",
              linkedCategory: "necessary",
            },
            {
              title: "性能和分析 Cookie",
              linkedCategory: "analytics",
              cookieTable: {
                headers: {
                  name: "名称",
                  domain: "服务",
                  description: "描述",
                  expiration: "过期时间",
                },
                body: [
                  {
                    name: "_ga",
                    domain: "Google Analytics",
                    description:
                      '由 <a href="https://analytics.google.com">Google Analytics</a> 设置的 Cookie。',
                    expiration: "12天后过期",
                  },
                  {
                    name: "_gid",
                    domain: "Google Analytics",
                    description:
                      '由 <a href="https://analytics.google.com">Google Analytics</a> 设置的 Cookie',
                    expiration: "会话结束时",
                  },
                ],
              },
            },
            {
              title: "更多信息",
              description:
                '如果您对我们的 Cookie 政策和您的选择有任何疑问，请 <a class="cc__link" href="/support">联系我们</a>。',
            },
          ],
        },
      },
    },
  },
};

export const CookieConsentComponent = () => {
  useEffect(() => {
    document.documentElement.classList.add("cc--darkmode");

    try {
      if (typeof window !== "undefined") {
        void CookieConsent.run(pluginConfig);
      }
    } catch (error) {
      console.error("Cookie consent initialization error:", error);
    }
  }, []);

  return <></>;
};
