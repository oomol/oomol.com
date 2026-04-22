import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

type CopyTarget = "command" | "prompt" | null;
type InstallPlatform = "unix" | "windows";

const INSTALL_COMMANDS: Record<InstallPlatform, string> = {
  unix: "curl -fsSL https://cli.oomol.com/install.sh | bash",
  windows: "irm https://cli.oomol.com/install.ps1 | iex",
};

function detectInstallPlatform(): InstallPlatform {
  if (typeof navigator === "undefined") {
    return "unix";
  }

  const candidate =
    (
      navigator as Navigator & {
        userAgentData?: { platform?: string };
      }
    ).userAgentData?.platform ??
    navigator.platform ??
    navigator.userAgent;

  return /win/i.test(candidate) ? "windows" : "unix";
}

export default function DownloadsCliPanel() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const isZh = i18n.currentLocale === "zh-CN";
  const [copiedTarget, setCopiedTarget] = React.useState<CopyTarget>(null);
  const [installPlatform, setInstallPlatform] =
    React.useState<InstallPlatform>("unix");

  React.useEffect(() => {
    setInstallPlatform(detectInstallPlatform());
  }, []);

  const installCommand = INSTALL_COMMANDS[installPlatform];

  const installDescription = isZh
    ? installPlatform === "windows"
      ? "已根据当前浏览器环境选择 Windows PowerShell 安装命令。Windows CMD 请查看安装文档。"
      : "已根据当前浏览器环境选择 macOS / Linux 的 curl 安装命令。"
    : installPlatform === "windows"
      ? "Showing the Windows PowerShell install command for your current browser environment. See the docs for Windows CMD."
      : "Showing the curl install command for macOS / Linux based on your current browser environment.";

  const agentPrompt = isZh
    ? installPlatform === "windows"
      ? [
          "请帮我安装并检查 oo-cli：",
          "",
          "1. 按当前环境的官方方式安装 oo-cli。",
          "   - Windows PowerShell：`irm https://cli.oomol.com/install.ps1 | iex`",
          "",
          "2. 运行 `oo login`。",
          "",
          "3. 确认 CLI 已经可以正常使用。",
          "",
          "4. 告诉我下一条最适合在 oo-cli 里执行的命令。",
        ].join("\n")
      : [
          "请帮我安装并检查 oo-cli：",
          "",
          "1. 按当前环境的官方方式安装 oo-cli。",
          "   - macOS / Linux：`curl -fsSL https://cli.oomol.com/install.sh | bash`",
          "",
          "2. 运行 `oo login`。",
          "",
          "3. 确认 CLI 已经可以正常使用。",
          "",
          "4. 告诉我下一条最适合在 oo-cli 里执行的命令。",
        ].join("\n")
    : installPlatform === "windows"
      ? [
          "Please help me install and verify oo-cli:",
          "",
          "1. Install oo-cli using the official method for this environment.",
          "   - Windows PowerShell: `irm https://cli.oomol.com/install.ps1 | iex`",
          "",
          "2. Run `oo login`.",
          "",
          "3. Confirm that the CLI is ready to use.",
          "",
          "4. Tell me the best next oo-cli command to run.",
        ].join("\n")
      : [
          "Please help me install and verify oo-cli:",
          "",
          "1. Install oo-cli using the official method for this environment.",
          "   - macOS / Linux: `curl -fsSL https://cli.oomol.com/install.sh | bash`",
          "",
          "2. Run `oo login`.",
          "",
          "3. Confirm that the CLI is ready to use.",
          "",
          "4. Tell me the best next oo-cli command to run.",
        ].join("\n");

  const copyLabel = translate({
    message: "HOME.Downloads.cli.copy",
  });
  const copiedLabel = translate({
    message: "HOME.Downloads.cli.copied",
  });

  const handleCopy = React.useCallback(
    async (value: string, target: Exclude<CopyTarget, null>) => {
      if (typeof navigator === "undefined" || !navigator.clipboard) {
        return;
      }

      await navigator.clipboard.writeText(value);
      setCopiedTarget(target);
      window.setTimeout(() => {
        setCopiedTarget(current => (current === target ? null : current));
      }, 1600);
    },
    []
  );

  return (
    <div className={styles.cliSection}>
      <div className={styles.cliMethodsGrid}>
        <article
          className={`${styles.cliMethodCard} ${styles.cliMethodCardCompact}`}
        >
          <div className={styles.cliMethodHeader}>
            <h3 className={styles.cliMethodTitle}>
              {translate({
                message: "HOME.Downloads.cli.method.install.title",
              })}
            </h3>
          </div>
          <p className={styles.cliMethodDescription}>{installDescription}</p>
          <div
            className={`${styles.cliSnippetBox} ${styles.cliSnippetBoxSingle}`}
          >
            <pre className={`${styles.cliSnippet} ${styles.cliSnippetSingle}`}>
              {installCommand}
            </pre>
            <button
              className={styles.cliCopyButton}
              onClick={() => void handleCopy(installCommand, "command")}
              type="button"
              aria-label={
                copiedTarget === "command"
                  ? copiedLabel
                  : `${copyLabel}: ${translate({
                      message: "HOME.Downloads.cli.method.install.title",
                    })}`
              }
              title={copiedTarget === "command" ? copiedLabel : copyLabel}
            >
              <span
                className={`${styles.cliCopyIcon} ${
                  copiedTarget === "command"
                    ? "i-lucide-check"
                    : "i-lucide-copy"
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
        </article>

        <article className={styles.cliMethodCard}>
          <div className={styles.cliMethodHeader}>
            <h3 className={styles.cliMethodTitle}>
              {translate({
                message: "HOME.Downloads.cli.method.agent.title",
              })}
            </h3>
          </div>
          <p className={styles.cliMethodDescription}>
            {translate({
              message: "HOME.Downloads.cli.method.agent.description",
            })}
          </p>
          <div className={styles.cliSnippetBox}>
            <pre className={styles.cliSnippet}>{agentPrompt}</pre>
            <button
              className={styles.cliCopyButton}
              onClick={() => void handleCopy(agentPrompt, "prompt")}
              type="button"
              aria-label={
                copiedTarget === "prompt"
                  ? copiedLabel
                  : `${copyLabel}: ${translate({
                      message: "HOME.Downloads.cli.method.agent.title",
                    })}`
              }
              title={copiedTarget === "prompt" ? copiedLabel : copyLabel}
            >
              <span
                className={`${styles.cliCopyIcon} ${
                  copiedTarget === "prompt" ? "i-lucide-check" : "i-lucide-copy"
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
