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
              message: "Direct Product Surfaces for Your Functions",
            })}
          </p>
          <p className={styles.heroDescription}>
            {translate({
              id: "APP.new.hero.description",
              message:
                "Turn function capabilities directly into Chat skills or Applet entry points, without building separate UI from scratch.",
            })}
          </p>
          <div className={styles.heroCTA}>
            <a
              href="https://app.oomol.com"
              className={`${styles.primaryButton} ${styles.large}`}
            >
              {translate({
                id: "APP.new.hero.cta.web",
                message: "Use in Web",
              })}
            </a>
            <a
              href={useBaseUrl("/downloads")}
              className={`${styles.secondaryButton} ${styles.large}`}
            >
              {translate({
                id: "APP.new.hero.cta.studio",
                message: "Use in OOMOL Studio",
              })}
            </a>
          </div>
        </section>

        {/* Product Section */}
        <section className={styles.productSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {translate({
                id: "APP.new.concept.title",
                message: "Code is Product",
              })}
            </h2>
            <p className={styles.sectionSubtitle}>
              {translate({
                id: "APP.new.concept.description",
                message:
                  "OOMOL wraps function capabilities into usable product surfaces. You focus on the function; we connect it to the user.",
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
                      message: "AI Assistant · Exploratory Interaction",
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
                      "When user intent is still vague, let AI choose and call your function capabilities through conversation.",
                  })}
                </p>
                <div className={styles.productMetaGrid}>
                  <div className={styles.productMetaItem}>
                    <div className={styles.productMetaLabel}>
                      {translate({
                        id: "APP.new.chat.meta1.label",
                        message: "For Whom",
                      })}
                    </div>
                    <div className={styles.productMetaValue}>
                      {translate({
                        id: "APP.new.chat.meta1.value",
                        message:
                          "Best when capabilities need to be exposed through conversation and intent needs clarification first",
                      })}
                    </div>
                  </div>
                  <div className={styles.productMetaItem}>
                    <div className={styles.productMetaLabel}>
                      {translate({
                        id: "APP.new.chat.meta2.label",
                        message: "Core Experience",
                      })}
                    </div>
                    <div className={styles.productMetaValue}>
                      {translate({
                        id: "APP.new.chat.meta2.value",
                        message:
                          "Understand intent first, then call the right service with less user setup",
                      })}
                    </div>
                  </div>
                </div>
                <p className={styles.devValue}>
                  {translate({
                    id: "APP.new.chat.devValue",
                    message:
                      "Functions as Skills: your functions become AI-callable capabilities.",
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
                      message: "Parameterized Surface · Applet",
                    })}
                  </span>
                  <span className={styles.productTag}>
                    {translate({
                      id: "APP.new.applet.subtitle",
                      message: "Form Applet · Deterministic Interaction",
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
                    message:
                      "When inputs are clear, call the function directly through structured parameters for more reliable delivery.",
                  })}
                </p>
                <div className={styles.productMetaGrid}>
                  <div className={styles.productMetaItem}>
                    <div className={styles.productMetaLabel}>
                      {translate({
                        id: "APP.new.applet.meta1.label",
                        message: "For Whom",
                      })}
                    </div>
                    <div className={styles.productMetaValue}>
                      {translate({
                        id: "APP.new.applet.meta1.value",
                        message:
                          "Best for teams delivering fixed-input function capabilities to internal or external users",
                      })}
                    </div>
                  </div>
                  <div className={styles.productMetaItem}>
                    <div className={styles.productMetaLabel}>
                      {translate({
                        id: "APP.new.applet.meta2.label",
                        message: "Core Experience",
                      })}
                    </div>
                    <div className={styles.productMetaValue}>
                      {translate({
                        id: "APP.new.applet.meta2.value",
                        message:
                          "Wrap a function as a fillable, executable, and reusable product entry point",
                      })}
                    </div>
                  </div>
                </div>
                <p className={styles.devValue}>
                  {translate({
                    id: "APP.new.applet.devValue",
                    message:
                      "Function as App: auto-generated parameter UI with less frontend boilerplate.",
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
