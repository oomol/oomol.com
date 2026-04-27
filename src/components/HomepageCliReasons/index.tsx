import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@site/src/components/magic/terminal";
import React from "react";

type CopyTarget = "prompt" | null;
type InstallPlatform = "unix" | "windows";
type TerminalHeightStyle = React.CSSProperties & {
  "--homepage-cli-terminal-height"?: string;
};

const INSTALL_COMMANDS: Record<InstallPlatform, string> = {
  unix: "curl -fsSL https://cli.oomol.com/install.sh | bash",
  windows: "irm https://cli.oomol.com/install.ps1 | iex",
};

const reasonCards = [
  {
    index: "01",
    title: translate({ message: "HOME.CliReasons.card1.title" }),
    description: translate({
      message: "HOME.CliReasons.card1.description",
    }),
    href: "/docs/oo-cli",
    linkLabel: translate({ message: "HOME.CliReasons.card1.link" }),
  },
  {
    index: "02",
    title: translate({ message: "HOME.CliReasons.card2.title" }),
    description: translate({
      message: "HOME.CliReasons.card2.description",
    }),
    href: "/studio",
    linkLabel: translate({ message: "HOME.CliReasons.card2.link" }),
  },
];

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

function HomepageInstallPromptCard() {
  const [copiedTarget, setCopiedTarget] = React.useState<CopyTarget>(null);
  const [installPlatform, setInstallPlatform] =
    React.useState<InstallPlatform>("unix");

  React.useEffect(() => {
    setInstallPlatform(detectInstallPlatform());
  }, []);

  const installCommand = INSTALL_COMMANDS[installPlatform];
  const agentPrompt =
    installPlatform === "windows"
      ? translate({ message: "HOME.Downloads.cli.agentPrompt.windows" })
      : translate({ message: "HOME.Downloads.cli.agentPrompt.unix" });
  const copiedLabel = translate({ message: "COMMON.copied" });

  const handleCopy = React.useCallback(async (value: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(value);
    setCopiedTarget("prompt");
    window.setTimeout(() => {
      setCopiedTarget(current => (current === "prompt" ? null : current));
    }, 1600);
  }, []);

  return (
    <div className={styles.installTerminalWrap}>
      <Terminal className={styles.installTerminal} staticMode>
        <AnimatedSpan className={styles.mutedLine}>
          {translate({
            message: "HOME.CliReasons.installTerminal.agentPrompt",
          })}
        </AnimatedSpan>

        <TypingAnimation className={styles.commandLine} duration={12}>
          {`$ ${installCommand}`}
        </TypingAnimation>

        <AnimatedSpan className={styles.successLine}>
          {translate({ message: "HOME.CliReasons.installTerminal.installed" })}
        </AnimatedSpan>

        <TypingAnimation className={styles.commandLine} duration={12}>
          $ oo login
        </TypingAnimation>

        <AnimatedSpan className={styles.successLine}>
          {translate({ message: "HOME.CliReasons.installTerminal.loginReady" })}
        </AnimatedSpan>

        <TypingAnimation className={styles.commandLine} duration={12}>
          $ oo --version
        </TypingAnimation>

        <AnimatedSpan className={styles.mutedLine}>
          {translate({
            message: "HOME.CliReasons.installTerminal.nextCommand",
          })}
        </AnimatedSpan>
      </Terminal>

      <div className={styles.installTerminalAction}>
        <button
          className={styles.copyPromptButton}
          onClick={() => void handleCopy(agentPrompt)}
          type="button"
          aria-label={
            copiedTarget === "prompt"
              ? copiedLabel
              : translate({
                  message: "HOME.CliReasons.installTerminal.copyPrompt",
                })
          }
          title={
            copiedTarget === "prompt"
              ? copiedLabel
              : translate({
                  message: "HOME.CliReasons.installTerminal.copyPrompt",
                })
          }
        >
          <span
            className={
              copiedTarget === "prompt" ? "i-lucide-check" : "i-lucide-copy"
            }
            aria-hidden="true"
          />
          <span>
            {copiedTarget === "prompt"
              ? copiedLabel
              : translate({
                  message: "HOME.CliReasons.installTerminal.copyPrompt",
                })}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function HomepageCliReasons() {
  const copyColumnRef = React.useRef<HTMLDivElement | null>(null);
  const [terminalHeight, setTerminalHeight] = React.useState<number | null>(
    null
  );

  React.useEffect(() => {
    const copyColumn = copyColumnRef.current;
    if (!copyColumn) {
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 997px)");

    const syncTerminalHeight = () => {
      if (!desktopQuery.matches) {
        setTerminalHeight(null);
        return;
      }

      const nextHeight = Math.ceil(copyColumn.getBoundingClientRect().height);
      setTerminalHeight(current =>
        current === nextHeight ? current : nextHeight
      );
    };

    syncTerminalHeight();

    const resizeObserver = new ResizeObserver(syncTerminalHeight);
    resizeObserver.observe(copyColumn);
    desktopQuery.addEventListener("change", syncTerminalHeight);
    window.addEventListener("resize", syncTerminalHeight);

    return () => {
      resizeObserver.disconnect();
      desktopQuery.removeEventListener("change", syncTerminalHeight);
      window.removeEventListener("resize", syncTerminalHeight);
    };
  }, []);

  const terminalStyle: TerminalHeightStyle =
    terminalHeight === null
      ? {}
      : { "--homepage-cli-terminal-height": `${terminalHeight}px` };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.copyColumn} ref={copyColumnRef}>
          <div className={styles.copyIntro}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "HOME.CliReasons.title" })}
            </h2>
            <p className={styles.sectionSubtitle}>
              {translate({ message: "HOME.CliReasons.subtitle" })}
            </p>
          </div>

          <div className={styles.cardList}>
            {reasonCards.map(card => (
              <article key={card.index} className={styles.reasonCard}>
                <div className={styles.reasonBody}>
                  <div className={styles.reasonHeader}>
                    <h3 className={styles.reasonTitle}>{card.title}</h3>
                    <Link to={card.href} className={styles.reasonLink}>
                      {card.linkLabel}
                    </Link>
                  </div>
                  <p className={styles.reasonDescription}>{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.visualColumn}>
          <div style={terminalStyle}>
            <HomepageInstallPromptCard />
          </div>
        </div>
      </div>
    </section>
  );
}
