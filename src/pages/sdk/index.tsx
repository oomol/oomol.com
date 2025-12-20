import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import Layout from "@theme/Layout";
import React from "react";

// SDK 数据
const sdkCategories = [
  {
    title: translate({ message: "SDK.category.cloud.title" }),
    description: translate({ message: "SDK.category.cloud.description" }),
    sdks: [
      {
        name: "OOMOL Cloud MCP SDK",
        language: "TypeScript",
        icon: "☁️",
        description: translate({ message: "SDK.cloud.mcp.description" }),
        features: [
          translate({ message: "SDK.cloud.mcp.feature1" }),
          translate({ message: "SDK.cloud.mcp.feature2" }),
          translate({ message: "SDK.cloud.mcp.feature3" }),
        ],
        github: "https://github.com/oomol-lab/oomol-cloud-mcp-sdk-ts",
        npm: "oomol-cloud-mcp-sdk",
      },
      {
        name: "OOMOL Block MCP SDK",
        language: "TypeScript",
        icon: "🔌",
        description: translate({ message: "SDK.block.mcp.description" }),
        features: [
          translate({ message: "SDK.block.mcp.feature1" }),
          translate({ message: "SDK.block.mcp.feature2" }),
          translate({ message: "SDK.block.mcp.feature3" }),
        ],
        github: "https://github.com/oomol-lab/oomol-block-mcp-sdk-ts",
        npm: "oomol-block-mcp-sdk",
      },
      {
        name: "OOMOL Cloud Task SDK (Python)",
        language: "Python",
        icon: "🐍",
        description: translate({
          message: "SDK.cloud.task.python.description",
        }),
        features: [
          translate({ message: "SDK.cloud.task.feature1" }),
          translate({ message: "SDK.cloud.task.feature2" }),
          translate({ message: "SDK.cloud.task.feature3" }),
        ],
        github: "https://github.com/oomol-lab/oomol-cloud-task-sdk-py",
        pypi: "oomol-cloud-task-sdk",
      },
      {
        name: "OOMOL Cloud Task SDK (TypeScript)",
        language: "TypeScript",
        icon: "📦",
        description: translate({ message: "SDK.cloud.task.ts.description" }),
        features: [
          translate({ message: "SDK.cloud.task.feature1" }),
          translate({ message: "SDK.cloud.task.feature2" }),
          translate({ message: "SDK.cloud.task.feature3" }),
        ],
        github: "https://github.com/oomol-lab/oomol-cloud-task-sdk-ts",
        npm: "oomol-cloud-task-sdk",
      },
    ],
  },
  {
    title: translate({ message: "SDK.category.fusion.title" }),
    description: translate({ message: "SDK.category.fusion.description" }),
    sdks: [
      {
        name: "OOMOL Fusion SDK (TypeScript)",
        language: "TypeScript",
        icon: "⚡",
        description: translate({ message: "SDK.fusion.ts.description" }),
        features: [
          translate({ message: "SDK.fusion.feature1" }),
          translate({ message: "SDK.fusion.feature2" }),
          translate({ message: "SDK.fusion.feature3" }),
        ],
        github: "https://github.com/oomol-lab/oomol-fusion-sdk-ts",
        npm: "oomol-fusion-sdk",
      },
      {
        name: "OOMOL Fusion SDK (Python)",
        language: "Python",
        icon: "🐍",
        description: translate({ message: "SDK.fusion.py.description" }),
        features: [
          translate({ message: "SDK.fusion.feature1" }),
          translate({ message: "SDK.fusion.feature2" }),
          translate({ message: "SDK.fusion.feature3" }),
        ],
        github: "https://github.com/oomol-lab/oomol-fusion-sdk-py",
        pypi: "oomol-fusion-sdk",
      },
    ],
  },
  {
    title: translate({ message: "SDK.category.connect.title" }),
    description: translate({ message: "SDK.category.connect.description" }),
    sdks: [
      {
        name: "OOMOL Connect MCP SDK",
        language: "TypeScript",
        icon: "🔗",
        description: translate({ message: "SDK.connect.mcp.description" }),
        features: [
          translate({ message: "SDK.connect.mcp.feature1" }),
          translate({ message: "SDK.connect.mcp.feature2" }),
          translate({ message: "SDK.connect.mcp.feature3" }),
        ],
        github: "https://github.com/oomol-lab/oomol-connect-mcp-sdk-ts",
        npm: "oomol-connect-mcp-sdk",
      },
      {
        name: "OOMOL Connect SDK (TypeScript)",
        language: "TypeScript",
        icon: "🚀",
        description: translate({ message: "SDK.connect.api.description" }),
        features: [
          translate({ message: "SDK.connect.api.feature1" }),
          translate({ message: "SDK.connect.api.feature2" }),
          translate({ message: "SDK.connect.api.feature3" }),
        ],
        github: "https://github.com/oomol-lab/oomol-connect-sdk-ts",
        npm: "oomol-connect-sdk",
      },
      {
        name: "OOMOL Connect SDK (Python)",
        language: "Python",
        icon: "🐍",
        description: translate({ message: "SDK.connect.api.description" }),
        features: [
          translate({ message: "SDK.connect.api.feature1" }),
          translate({ message: "SDK.connect.api.feature2" }),
          translate({ message: "SDK.connect.api.feature3" }),
        ],
        github: "https://github.com/oomol-lab/oomol-connect-sdk-py",
        pypi: "oomol-connect-sdk",
      },
    ],
  },
];

// SDK 卡片组件
const SDKCard = ({ sdk }: { sdk: (typeof sdkCategories)[0]["sdks"][0] }) => {
  return (
    <div className={styles.sdkCard}>
      <div className={styles.sdkHeader}>
        <div className={styles.sdkIcon}>{sdk.icon}</div>
        <div className={styles.sdkMeta}>
          <h3 className={styles.sdkName}>{sdk.name}</h3>
          <span className={styles.sdkLanguage}>{sdk.language}</span>
        </div>
      </div>

      <p className={styles.sdkDescription}>{sdk.description}</p>

      <ul className={styles.sdkFeatures}>
        {sdk.features.map((feature, index) => (
          <li key={index}>
            <span className={styles.featureIcon}>✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <div className={styles.sdkLinks}>
        <a
          href={sdk.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkButton}
        >
          <span className={styles.linkIcon}>
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </span>
          GitHub
        </a>
        {sdk.npm && (
          <a
            href={`https://www.npmjs.com/package/${sdk.npm}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkButton}
          >
            <span className={styles.linkIcon}>📦</span>
            NPM
          </a>
        )}
        {sdk.pypi && (
          <a
            href={`https://pypi.org/project/${sdk.pypi}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkButton}
          >
            <span className={styles.linkIcon}>🐍</span>
            PyPI
          </a>
        )}
      </div>
    </div>
  );
};

export default function SDKPage() {
  return (
    <Layout>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              {translate({ message: "SDK.hero.title" })}
            </h1>
            <p className={styles.heroSubtitle}>
              {translate({ message: "SDK.hero.description" })}
            </p>
          </div>
        </section>

        {/* SDK Categories */}
        {sdkCategories.map((category, catIndex) => (
          <section key={catIndex} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              <p className={styles.categoryDescription}>
                {category.description}
              </p>
            </div>
            <div
              className={`${styles.sdkGrid} ${catIndex === 0 ? styles.sdkGridTwoColumns : ""}`}
            >
              {category.sdks.map((sdk, sdkIndex) => (
                <SDKCard key={sdkIndex} sdk={sdk} />
              ))}
            </div>
          </section>
        ))}

        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
