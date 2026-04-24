import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
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
  const [copiedTarget, setCopiedTarget] = React.useState<CopyTarget>(null);
  const [installPlatform, setInstallPlatform] =
    React.useState<InstallPlatform>("unix");

  React.useEffect(() => {
    setInstallPlatform(detectInstallPlatform());
  }, []);

  const installCommand = INSTALL_COMMANDS[installPlatform];

  const installDescription =
    installPlatform === "windows"
      ? translate({
          message: "HOME.Downloads.cli.installDescription.windows",
        })
      : translate({
          message: "HOME.Downloads.cli.installDescription.unix",
        });

  const agentPrompt =
    installPlatform === "windows"
      ? translate({ message: "HOME.Downloads.cli.agentPrompt.windows" })
      : translate({ message: "HOME.Downloads.cli.agentPrompt.unix" });

  const copyLabel = translate({
    message: "COMMON.copy",
  });
  const copiedLabel = translate({
    message: "COMMON.copied",
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
