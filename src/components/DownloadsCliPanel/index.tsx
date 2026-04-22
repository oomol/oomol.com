import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import React from "react";

const INSTALL_COMMAND =
  "curl -fsSL https://cli.oomol.com/install.sh | bash\noo login";

type CopyTarget = "command" | "prompt" | null;

export default function DownloadsCliPanel() {
  const [copiedTarget, setCopiedTarget] = React.useState<CopyTarget>(null);

  const agentPrompt = translate({
    message: "HOME.Downloads.cli.method.agent.prompt",
  });

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
        <article className={styles.cliMethodCard}>
          <div className={styles.cliMethodHeader}>
            <h3 className={styles.cliMethodTitle}>
              {translate({
                message: "HOME.Downloads.cli.method.install.title",
              })}
            </h3>
          </div>
          <p className={styles.cliMethodDescription}>
            {translate({
              message: "HOME.Downloads.cli.method.install.description",
            })}
          </p>
          <div className={styles.cliSnippetBox}>
            <pre className={styles.cliSnippet}>{INSTALL_COMMAND}</pre>
            <button
              className={styles.cliCopyButton}
              onClick={() => void handleCopy(INSTALL_COMMAND, "command")}
              type="button"
            >
              {copiedTarget === "command" ? copiedLabel : copyLabel}
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
            >
              {copiedTarget === "prompt" ? copiedLabel : copyLabel}
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
