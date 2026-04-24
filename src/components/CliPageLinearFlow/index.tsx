import styles from "./styles.module.scss";
import siteCtaStyles from "@site/src/components/SiteCta/styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { SiteCta } from "@site/src/components/SiteCta";
import { Button } from "@site/src/components/ui/button";
import React from "react";

const COMMANDS_REFERENCE_ROUTE = "/docs/oo-cli/command-reference";

type Copy = {
  workflow: {
    eyebrow: string;
    title: string;
    description: string;
    terminal: {
      label: string;
      lines: Array<
        { kind: "comment"; text: string } | { kind: "command"; text: string }
      >;
    };
  };
  next: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{
      title: string;
      text: string;
      cta: string;
      href: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
};

export default function CliPageLinearFlow() {
  const copy: Copy = {
    workflow: {
      eyebrow: translate({ message: "CLI.flow.workflow.eyebrow" }),
      title: translate({ message: "CLI.flow.workflow.title" }),
      description: translate({
        message: "CLI.flow.workflow.description",
      }),
      terminal: {
        label: translate({ message: "CLI.flow.workflow.terminal.label" }),
        lines: [
          {
            kind: "comment",
            text: translate({
              message: "CLI.flow.workflow.terminal.comment1",
            }),
          },
          {
            kind: "command",
            text: "curl -fsSL https://cli.oomol.com/install.sh | bash",
          },
          { kind: "command", text: "oo login" },
          {
            kind: "comment",
            text: translate({
              message: "CLI.flow.workflow.terminal.comment2",
            }),
          },
          {
            kind: "command",
            text: 'oo search "generate a QR code for OOMOL"',
          },
          { kind: "command", text: "oo packages info foo/bar@latest" },
          {
            kind: "comment",
            text: translate({
              message: "CLI.flow.workflow.terminal.comment3",
            }),
          },
          {
            kind: "command",
            text: "oo connector run <serviceName> -a <action> --dry-run --data @input.json",
          },
          {
            kind: "command",
            text: "oo cloud-task run foo/bar@1.2.3 -b main --data @input.json",
          },
          { kind: "command", text: "oo cloud-task result task_123" },
        ],
      },
    },
    next: {
      eyebrow: translate({ message: "CLI.flow.next.eyebrow" }),
      title: translate({ message: "CLI.flow.next.title" }),
      description: translate({ message: "CLI.flow.next.description" }),
      cards: [
        {
          title: translate({ message: "CLI.flow.next.card1.title" }),
          text: translate({ message: "CLI.flow.next.card1.text" }),
          cta: translate({ message: "CLI.flow.next.card1.cta" }),
          href: "/studio",
        },
        {
          title: translate({ message: "CLI.flow.next.card2.title" }),
          text: translate({ message: "CLI.flow.next.card2.text" }),
          cta: translate({ message: "CLI.flow.next.card2.cta" }),
          href: "/cloud",
        },
      ],
    },
    cta: {
      title: translate({ message: "CLI.flow.cta.title" }),
      description: translate({ message: "CLI.flow.cta.description" }),
      primary: translate({ message: "CLI.flow.cta.primary" }),
      secondary: translate({ message: "CLI.flow.cta.secondary" }),
    },
  };

  return (
    <div className={styles.flow}>
      <section className={`${styles.section} ${styles.workflowSection}`}>
        <div className={`${styles.container} ${styles.twoColumn}`}>
          <div className={styles.copyPanel}>
            <span className={styles.eyebrow}>{copy.workflow.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.workflow.title}</h2>
            <p className={styles.sectionDescription}>
              {copy.workflow.description}
            </p>
          </div>

          <div className={styles.terminalPanel}>
            <div className={styles.terminalChrome} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={styles.terminalBody}>
              <div className={styles.terminalLabel}>
                {copy.workflow.terminal.label}
              </div>
              <pre className={styles.commandBlock}>
                {copy.workflow.terminal.lines.map((line, index) =>
                  line.kind === "comment" ? (
                    <span key={index} className={styles.commentLine}>
                      {line.text}
                    </span>
                  ) : (
                    <span key={index} className={styles.commandLine}>
                      <span className={styles.prompt}>$</span> {line.text}
                    </span>
                  )
                )}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.stackContainer}`}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>{copy.next.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{copy.next.title}</h2>
            <p className={styles.sectionDescription}>{copy.next.description}</p>
          </div>

          <div className={styles.nextGrid}>
            {copy.next.cards.map(card => (
              <article key={card.title} className={styles.nextCard}>
                <h3 className={styles.nextTitle}>{card.title}</h3>
                <p className={styles.nextText}>{card.text}</p>
                <Link to={card.href} className={styles.primaryLink}>
                  {card.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteCta
        title={copy.cta.title}
        description={copy.cta.description}
        actions={
          <>
            <Button asChild size="lg" className={siteCtaStyles.actionButton}>
              <Link to="/docs/oo-cli">{copy.cta.primary}</Link>
            </Button>
            <Link
              to={COMMANDS_REFERENCE_ROUTE}
              className={siteCtaStyles.ghostLink}
            >
              {copy.cta.secondary}
            </Link>
          </>
        }
      />
    </div>
  );
}
