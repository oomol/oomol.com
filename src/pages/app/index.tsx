import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import ThemedImage from "@theme/ThemedImage";

import Layout from "../../theme/Layout";

export default function AppPage() {
  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            {translate({ id: "APP.new.hero.title", message: "OOMOL App" })}
          </h1>
          <p className={styles.heroSubtitle}>
            {translate({
              id: "APP.new.hero.subtitle",
              message: "交付 AI 产品的最后一公里",
            })}
          </p>
          <p className={styles.heroDescription}>
            {translate({
              id: "APP.new.hero.description",
              message:
                "无需编写 UI，将你的 Block 函数直接转化为 AI Chat 技能与 Applet 小程序，瞬间交付给用户。",
            })}
          </p>
          <div className={styles.heroCTA}>
            <a
              href="/downloads"
              className={`${styles.primaryButton} ${styles.large}`}
            >
              {translate({ id: "APP.new.cta.download", message: "下载体验" })}
            </a>
            <a
              href="/docs"
              className={`${styles.secondaryButton} ${styles.large}`}
            >
              {translate({ id: "APP.new.cta.docs", message: "查看文档" })}
            </a>
          </div>
        </section>

        {/* Product Section */}
        <section className={styles.productSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({
                id: "APP.new.concept.title",
                message: "代码即产品",
              })}
            </h2>
            <p className={styles.sectionSubtitle}>
              {translate({
                id: "APP.new.concept.description",
                message:
                  "OOMOL 负责将你的后端逻辑 (Block) 自动封装为前端产品。你专注于编写函数，我们负责连接用户。",
              })}
            </p>
          </div>

          <div className={styles.productContainer}>
            {/* OOMOL Chat */}
            <div className={styles.productItem}>
              <div className={styles.productText}>
                <div className={styles.productLabelRow}>
                  <span className={styles.productPill}>
                    {translate({
                      id: "APP.new.chat.pill",
                      message: "Chat · Workflow Copilot",
                    })}
                  </span>
                  <span className={styles.productTag}>
                    {translate({
                      id: "APP.new.chat.subtitle",
                      message: "AI 助手 · 探索性交互",
                    })}
                  </span>
                </div>
                <h3 className={styles.productTitle}>
                  {translate({
                    id: "APP.new.chat.title",
                    message: "OOMOL Chat",
                  })}
                </h3>
                <p className={styles.productDesc}>
                  {translate({
                    id: "APP.new.chat.description",
                    message:
                      "当用户需求模糊时，AI 智能调度你的工具来解决问题。",
                  })}
                </p>
                <div className={styles.productMetaGrid}>
                  <div className={styles.productMetaItem}>
                    <div className={styles.productMetaLabel}>
                      {translate({
                        id: "APP.new.chat.meta1.label",
                        message: "适合谁",
                      })}
                    </div>
                    <div className={styles.productMetaValue}>
                      {translate({
                        id: "APP.new.chat.meta1.value",
                        message: "需要把想法快速变成自动化工作流的人",
                      })}
                    </div>
                  </div>
                  <div className={styles.productMetaItem}>
                    <div className={styles.productMetaLabel}>
                      {translate({
                        id: "APP.new.chat.meta2.label",
                        message: "核心体验",
                      })}
                    </div>
                    <div className={styles.productMetaValue}>
                      {translate({
                        id: "APP.new.chat.meta2.value",
                        message: "像和同事讨论一样，一步步对话搭建流程",
                      })}
                    </div>
                  </div>
                </div>
                <p className={styles.devValue}>
                  {translate({
                    id: "APP.new.chat.devValue",
                    message: "Tools as Skills：你的函数就是 AI 的手脚",
                  })}
                </p>
              </div>
              <div className={styles.productVisual}>
                <div className={styles.productImageWrapper}>
                  <ThemedImage
                    sources={{
                      light: useBaseUrl("/img/pages/app/chat-light.png"),
                      dark: useBaseUrl("/img/pages/app/chat-dark.png"),
                    }}
                    alt="OOMOL Chat"
                    className={styles.productImage}
                  />
                </div>
              </div>
            </div>

            {/* OOMOL Applet */}
            <div className={styles.productItem}>
              <div className={styles.productText}>
                <div className={styles.productLabelRow}>
                  <span className={styles.productPill}>
                    {translate({
                      id: "APP.new.applet.pill",
                      message: "Applet · 可编排应用",
                    })}
                  </span>
                  <span className={styles.productTag}>
                    {translate({
                      id: "APP.new.applet.subtitle",
                      message: "表单小程序 · 确定性交互",
                    })}
                  </span>
                </div>
                <h3 className={styles.productTitle}>
                  {translate({
                    id: "APP.new.applet.title",
                    message: "OOMOL Applet",
                  })}
                </h3>
                <p className={styles.productDesc}>
                  {translate({
                    id: "APP.new.applet.description",
                    message: "当用户需求明确时，直接填参调用，高效精准。",
                  })}
                </p>
                <div className={styles.productMetaGrid}>
                  <div className={styles.productMetaItem}>
                    <div className={styles.productMetaLabel}>
                      {translate({
                        id: "APP.new.applet.meta1.label",
                        message: "适合谁",
                      })}
                    </div>
                    <div className={styles.productMetaValue}>
                      {translate({
                        id: "APP.new.applet.meta1.value",
                        message: "需要发布、复用、分享自动化能力的团队",
                      })}
                    </div>
                  </div>
                  <div className={styles.productMetaItem}>
                    <div className={styles.productMetaLabel}>
                      {translate({
                        id: "APP.new.applet.meta2.label",
                        message: "核心体验",
                      })}
                    </div>
                    <div className={styles.productMetaValue}>
                      {translate({
                        id: "APP.new.applet.meta2.value",
                        message: "像搭乐高一样，把能力组件编排成产品",
                      })}
                    </div>
                  </div>
                </div>
                <p className={styles.devValue}>
                  {translate({
                    id: "APP.new.applet.devValue",
                    message: "Function as App：自动生成表单 UI，零前端代码",
                  })}
                </p>
              </div>
              <div className={styles.productVisual}>
                <div className={styles.productImageWrapper}>
                  <ThemedImage
                    sources={{
                      light: useBaseUrl("/img/pages/app/applet-light.png"),
                      dark: useBaseUrl("/img/pages/app/applet-dark.png"),
                    }}
                    alt="OOMOL Applet"
                    className={styles.productImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
