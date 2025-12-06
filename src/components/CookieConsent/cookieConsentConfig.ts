import type { CookieConsentConfig } from "vanilla-cookieconsent";

import Cookies from "js-cookie";
import * as CookieConsent from "vanilla-cookieconsent";

function handleGAConversion() {
  const COOKIE_FIRST_SIGN_IN = "oomol-first-login";
  const COOKIE_DOMAIN = "oomol.com";

  if (!Cookies.get(COOKIE_FIRST_SIGN_IN)) {
    console.log("Not a first-time user, skipping conversion event");
    return;
  }

  Cookies.remove(COOKIE_FIRST_SIGN_IN, { path: "", domain: COOKIE_DOMAIN });

  // 轮询检查 gtag 是否存在
  const checkGtagAvailability = (maxAttempts = 20, interval = 100) => {
    let attempts = 0;
    let timeoutId: number | null = null;

    const poll = () => {
      const win = window as any;
      attempts++;

      if (typeof win.gtag !== "undefined" && typeof win.gtag === "function") {
        // 成功找到 gtag，清除定时器并执行 gtag 事件
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        win.gtag("event", "conversion", {
          send_to: "AW-17222662466/iUF7CKXnmeIaEMLys5RA",
        });
        return;
      }

      if (attempts >= maxAttempts) {
        // 达到最大尝试次数，清除定时器
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        return;
      }

      timeoutId = window.setTimeout(poll, interval);
    };

    poll();
  };

  checkGtagAvailability();
}
export const pluginConfig: CookieConsentConfig = {
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
    if (CookieConsent.acceptedCategory("statistics")) {
      handleGAConversion();
    }
  },

  onConsent: function () {
    if (CookieConsent.acceptedCategory("statistics")) {
      handleGAConversion();
    }
  },

  onChange: function ({ changedCategories }) {
    if (changedCategories.includes("statistics")) {
      if (CookieConsent.acceptedCategory("statistics")) {
        handleGAConversion();
      }
    }
  },

  categories: {
    necessary: { readOnly: true, enabled: true },
    statistics: { autoClear: { cookies: [{ name: /^(_ga|_gid)/ }] } },
  },

  language: {
    default: "en",
    autoDetect: "document",

    translations: {
      en: async () => {
        const res = await fetch(new URL("./en.json", import.meta.url).href);
        const data = await res.json();

        return {
          consentModal: {
            title: data.consentModal.title,
            description: data.consentModal.description,
            acceptAllBtn: data.consentModal.acceptAllBtn,
            acceptNecessaryBtn: data.consentModal.acceptNecessaryBtn,
            showPreferencesBtn: data.consentModal.showPreferencesBtn,
            footer: `
                  <a href="https://oomol.com/privacy/">${data.consentModal["privacy-link"]}</a>
                  <a href="https://oomol.com/terms/">${data.consentModal["terms-link"]}</a>
                `,
          },
          preferencesModal: {
            title: data.preferencesModal.title,
            acceptAllBtn: data.preferencesModal["accept-all"],
            acceptNecessaryBtn: data.preferencesModal["accept-necessary"],
            savePreferencesBtn: data.preferencesModal["save-preferences"],
            closeIconLabel: data.preferencesModal.close,
            sections: [
              {
                title: data.preferencesModal["usage-explanation"].title,
                description:
                  data.preferencesModal["usage-explanation"].description,
              },
              {
                title: data.preferencesModal.necessary.title,
                description: data.preferencesModal.necessary.description,
                linkedCategory: "necessary",
              },
              {
                title: data.preferencesModal.statistics.title,
                linkedCategory: "statistics",
                cookieTable: {
                  headers: {
                    name: data.preferencesModal.statistics.table.name,
                    domain: data.preferencesModal.statistics.table.domain,
                    description:
                      data.preferencesModal.statistics.table.description,
                    expiration:
                      data.preferencesModal.statistics.table.expiration,
                  },
                  body: [
                    {
                      name: "_ga",
                      domain: "Google Analytics",
                      description:
                        data.preferencesModal.statistics["google-analytics"],
                      expiration: "",
                    },
                  ],
                },
              },
              {
                title: data.preferencesModal["more-info"].title,
                description:
                  data.preferencesModal["more-info"].description +
                  ' <a href="https://oomol.com/community">Contact us</a>',
              },
            ],
          },
        };
      },

      "zh-CN": async () => {
        const res = await fetch(new URL("./zh-CN.json", import.meta.url).href);
        const data = await res.json();

        return {
          consentModal: {
            title: data.consentModal.title,
            description: data.consentModal.description,
            acceptAllBtn: data.consentModal.acceptAllBtn,
            acceptNecessaryBtn: data.consentModal.acceptNecessaryBtn,
            showPreferencesBtn: data.consentModal.showPreferencesBtn,
            footer: `
                  <a href="https://oomol.com/privacy/">${data.consentModal["privacy-link"]}</a>
                  <a href="https://oomol.com/terms/">${data.consentModal["terms-link"]}</a>
                `,
          },
          preferencesModal: {
            title: data.preferencesModal.title,
            acceptAllBtn: data.preferencesModal["accept-all"],
            acceptNecessaryBtn: data.preferencesModal["accept-necessary"],
            savePreferencesBtn: data.preferencesModal["save-preferences"],
            closeIconLabel: data.preferencesModal.close,
            sections: [
              {
                title: data.preferencesModal["usage-explanation"].title,
                description:
                  data.preferencesModal["usage-explanation"].description,
              },
              {
                title: data.preferencesModal.necessary.title,
                description: data.preferencesModal.necessary.description,
                linkedCategory: "necessary",
              },
              {
                title: data.preferencesModal.statistics.title,
                linkedCategory: "statistics",
                cookieTable: {
                  headers: {
                    name: data.preferencesModal.statistics.table.name,
                    domain: data.preferencesModal.statistics.table.domain,
                    description:
                      data.preferencesModal.statistics.table.description,
                    expiration:
                      data.preferencesModal.statistics.table.expiration,
                  },
                  body: [
                    {
                      name: "_ga",
                      domain: "Google Analytics",
                      description:
                        data.preferencesModal.statistics["google-analytics"],
                      expiration: "",
                    },
                  ],
                },
              },
              {
                title: data.preferencesModal["more-info"].title,
                description: `${data.preferencesModal["more-info"].description} <a href="https://oomol.com/community">请联系我们</a>`,
              },
            ],
          },
        };
      },
    },
  },
};
