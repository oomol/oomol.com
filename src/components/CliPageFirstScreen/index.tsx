import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@site/src/components/magic/terminal";
import { Button } from "@site/src/components/ui/button";
import { useReducedMotion } from "framer-motion";
import React from "react";

type InstallPlatform = "unix" | "windows";

type Copy = {
  slogan: string;
  overview: string;
  primaryCta: string;
  secondaryCta: string;
  installNote: Record<InstallPlatform, string>;
  copiedNote: string;
};

const zhCopy: Copy = {
  slogan: `为 Agent
提供更多工具`,
  overview: `Agent 会分析、会规划，但真正执行还得连上现有工具。oo-cli 把现实世界里的工具接到 Agent 手里，让它真正开始做事。`,
  primaryCta: "查看安装文档",
  secondaryCta: "查看 GitHub",
  installNote: {
    unix: "点击复制当前系统的 oo-cli 安装命令",
    windows: "点击复制 Windows PowerShell 的 oo-cli 安装命令",
  },
  copiedNote: "oo-cli 安装命令已复制",
};

const enCopy: Copy = {
  slogan: `More Tools
for Agents`,
  overview: `Agents can analyze and plan, but execution still depends on real-world tools. oo-cli connects them to those tools so they can actually get work done.`,
  primaryCta: "Read the install guide",
  secondaryCta: "View GitHub",
  installNote: {
    unix: "Click to copy the oo-cli install command for your system.",
    windows: "Click to copy the oo-cli install command for Windows PowerShell.",
  },
  copiedNote: "oo-cli install command copied.",
};

const LATEST_OO_CLI_VERSION = "0.2.27";
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

function CliTerminalDemo({
  isZh,
  staticMode,
}: {
  isZh: boolean;
  staticMode: boolean;
}) {
  return (
    <Terminal className={styles.heroTerminal} staticMode={staticMode}>
      <TypingAnimation className={styles.commandLine} duration={12}>
        $ curl -fsSL https://cli.oomol.com/install.sh | bash
      </TypingAnimation>

      <AnimatedSpan className={styles.successLine}>
        {isZh
          ? `# 安装最新版本：oo-cli ${LATEST_OO_CLI_VERSION}`
          : `# installs latest: oo-cli ${LATEST_OO_CLI_VERSION}`}
      </AnimatedSpan>

      <TypingAnimation className={styles.commandLine} duration={12}>
        $ oo login
      </TypingAnimation>

      <AnimatedSpan className={styles.successLine}>
        {isZh
          ? "# 登录 OOMOL 账号，确认 CLI 已可用"
          : "# sign in with your OOMOL account and confirm the CLI is ready"}
      </AnimatedSpan>

      <TypingAnimation className={styles.commandLine} duration={12}>
        {isZh
          ? '$ oo search "给 OOMOL 生成二维码"'
          : '$ oo search "generate a QR code for OOMOL"'}
      </TypingAnimation>

      <AnimatedSpan className={styles.mutedLine}>
        {isZh
          ? "# 同时搜索 packages 和 connector actions"
          : "# searches packages and connector actions together"}
      </AnimatedSpan>

      <TypingAnimation className={styles.commandLine} duration={12}>
        $ oo packages search "generate a QR code"
      </TypingAnimation>

      <AnimatedSpan className={styles.mutedLine}>
        {isZh
          ? "# 收窄到已发布 package，准备选包"
          : "# narrow it down to published packages before choosing one"}
      </AnimatedSpan>

      <TypingAnimation className={styles.commandLine} duration={12}>
        {"$ oo packages info <packageSpecifier>"}
      </TypingAnimation>

      <AnimatedSpan className={styles.mutedLine}>
        {isZh
          ? "# 选包时先看 schema、版本和可执行 block"
          : "# inspect schema, version, and runnable blocks before execution"}
      </AnimatedSpan>

      <TypingAnimation className={styles.commandLine} duration={12}>
        {
          "$ oo cloud-task run <packageSpecifier> -b <blockId> --data @input.json"
        }
      </TypingAnimation>

      <AnimatedSpan className={styles.mutedLine}>
        {isZh
          ? "# Executor 执行 package block"
          : "# execute the selected package block"}
      </AnimatedSpan>

      <TypingAnimation className={styles.commandLine} duration={12}>
        {"$ oo cloud-task result <taskId>"}
      </TypingAnimation>

      <AnimatedSpan className={styles.successLine}>
        {isZh
          ? "# 任务完成后在终端里取回结果"
          : "# fetch the result back in the terminal"}
      </AnimatedSpan>
    </Terminal>
  );
}

export default function CliPageFirstScreen() {
  const reduceMotion = useReducedMotion();
  const [isCopied, setIsCopied] = React.useState(false);
  const [installPlatform, setInstallPlatform] =
    React.useState<InstallPlatform>("unix");
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const isZh = i18n.currentLocale === "zh-CN";
  const copy = isZh ? zhCopy : enCopy;
  const installCommand = INSTALL_COMMANDS[installPlatform];

  React.useEffect(() => {
    setInstallPlatform(detectInstallPlatform());
  }, []);

  const handleCopyInstallCommand = React.useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(installCommand);
    setIsCopied(true);
  }, [installCommand]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.titleGroup}>
          <h1 className={styles.slogan}>{copy.slogan}</h1>
          <p className={styles.overview}>{copy.overview}</p>
          <div className={styles.actions}>
            <Button asChild size="lg" className={styles.primaryCta}>
              <Link to="/docs/oo-cli">{copy.primaryCta}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={styles.secondaryCta}
            >
              <a
                href="https://github.com/oomol-lab/oo-cli"
                rel="noreferrer"
                target="_blank"
              >
                {copy.secondaryCta}
              </a>
            </Button>
          </div>
          <div className={styles.installCommandGroup}>
            <button
              className={styles.installCommandStrip}
              onClick={() => void handleCopyInstallCommand()}
              type="button"
            >
              <code className={styles.installCommandText}>
                {installCommand}
              </code>
            </button>
            <p className={styles.installCommandNote}>
              {isCopied ? copy.copiedNote : copy.installNote[installPlatform]}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.showcase}>
        <div className={styles.showcaseInner}>
          <CliTerminalDemo isZh={isZh} staticMode={reduceMotion === true} />
        </div>
      </div>
    </section>
  );
}
