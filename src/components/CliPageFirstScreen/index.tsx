import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@site/src/components/magic/terminal";
import { Button } from "@site/src/components/ui/button";
import { useReducedMotion } from "framer-motion";
import React from "react";

type InstallPlatform = "unix" | "windows";

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

function CliTerminalDemo({ staticMode }: { staticMode: boolean }) {
  return (
    <Terminal className={styles.heroTerminal} staticMode={staticMode}>
      <TypingAnimation className={styles.commandLine} duration={12}>
        $ curl -fsSL https://cli.oomol.com/install.sh | bash
      </TypingAnimation>

      <AnimatedSpan className={styles.successLine}>
        {translate({
          message: "CLI.hero.terminal.installsLatest",
        }).replace("{version}", LATEST_OO_CLI_VERSION)}
      </AnimatedSpan>

      <TypingAnimation className={styles.commandLine} duration={12}>
        $ oo login
      </TypingAnimation>

      <AnimatedSpan className={styles.successLine}>
        {translate({ message: "CLI.hero.terminal.loginReady" })}
      </AnimatedSpan>

      <TypingAnimation className={styles.commandLine} duration={12}>
        {translate({ message: "CLI.hero.terminal.searchQr" })}
      </TypingAnimation>

      <AnimatedSpan className={styles.mutedLine}>
        {translate({ message: "CLI.hero.terminal.searchTogether" })}
      </AnimatedSpan>

      <TypingAnimation className={styles.commandLine} duration={12}>
        $ oo packages search "generate a QR code"
      </TypingAnimation>

      <AnimatedSpan className={styles.mutedLine}>
        {translate({ message: "CLI.hero.terminal.narrowPackages" })}
      </AnimatedSpan>

      <TypingAnimation className={styles.commandLine} duration={12}>
        {"$ oo packages info <packageSpecifier>"}
      </TypingAnimation>

      <AnimatedSpan className={styles.mutedLine}>
        {translate({ message: "CLI.hero.terminal.inspectPackage" })}
      </AnimatedSpan>

      <TypingAnimation className={styles.commandLine} duration={12}>
        {
          "$ oo cloud-task run <packageSpecifier> -b <blockId> --data @input.json"
        }
      </TypingAnimation>

      <AnimatedSpan className={styles.mutedLine}>
        {translate({ message: "CLI.hero.terminal.executeBlock" })}
      </AnimatedSpan>

      <TypingAnimation className={styles.commandLine} duration={12}>
        {"$ oo cloud-task result <taskId>"}
      </TypingAnimation>

      <AnimatedSpan className={styles.successLine}>
        {translate({ message: "CLI.hero.terminal.fetchResult" })}
      </AnimatedSpan>
    </Terminal>
  );
}

export default function CliPageFirstScreen() {
  const reduceMotion = useReducedMotion();
  const [isCopied, setIsCopied] = React.useState(false);
  const [installPlatform, setInstallPlatform] =
    React.useState<InstallPlatform>("unix");
  const copy = {
    slogan: translate({ message: "CLI.hero.slogan" }),
    overview: translate({ message: "CLI.hero.overview" }),
    primaryCta: translate({ message: "CLI.hero.cta.primary" }),
    secondaryCta: translate({ message: "CLI.hero.cta.secondary" }),
    installNote: {
      unix: translate({ message: "CLI.hero.installNote.unix" }),
      windows: translate({ message: "CLI.hero.installNote.windows" }),
    },
    copiedNote: translate({ message: "CLI.hero.copiedNote" }),
  };
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
          <CliTerminalDemo staticMode={reduceMotion === true} />
        </div>
      </div>
    </section>
  );
}
