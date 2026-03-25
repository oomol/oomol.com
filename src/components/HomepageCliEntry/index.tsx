import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import React from "react";

const steps = [
  {
    index: "01",
    title: translate({ message: "HOME.CliEntry.step1.title" }),
    description: translate({ message: "HOME.CliEntry.step1.description" }),
  },
  {
    index: "02",
    title: translate({ message: "HOME.CliEntry.step2.title" }),
    description: translate({ message: "HOME.CliEntry.step2.description" }),
  },
  {
    index: "03",
    title: translate({ message: "HOME.CliEntry.step3.title" }),
    description: translate({ message: "HOME.CliEntry.step3.description" }),
  },
];

const commands = [
  {
    prompt: "$",
    text: "bun install -g @oomol-lab/oo-cli",
  },
  {
    prompt: "$",
    text: "oo login",
  },
  {
    prompt: "$",
    text: 'oo search "generate a QR code"',
  },
  {
    prompt: "$",
    text: "oo package info foo/bar@latest",
  },
  {
    prompt: "$",
    text: `oo cloud-task run foo/bar@1.2.3 --block-id main --data '{"text":"OOMOL"}'`,
  },
  {
    prompt: "$",
    text: "oo cloud-task result <task-id>",
  },
];

export default function HomepageCliEntry() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.copyColumn}>
          <div className={styles.badge}>
            {translate({ message: "HOME.CliEntry.badge" })}
          </div>
          <h2 className={styles.title}>
            {translate({ message: "HOME.CliEntry.title" })}
          </h2>
          <p className={styles.subtitle}>
            {translate({ message: "HOME.CliEntry.subtitle" })}
          </p>

          <div className={styles.stepList}>
            {steps.map(step => (
              <article key={step.index} className={styles.stepCard}>
                <div className={styles.stepIndex}>{step.index}</div>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.actions}>
            <Link to="/docs/cloud-services/cli" className={styles.primaryAction}>
              {translate({ message: "HOME.CliEntry.action.primary" })}
            </Link>
            <Link
              to="/docs/cloud-services/cloud-function"
              className={styles.secondaryAction}
            >
              {translate({ message: "HOME.CliEntry.action.secondary" })}
            </Link>
          </div>
        </div>

        <div className={styles.terminalCard}>
          <div className={styles.terminalHeader}>
            <span className={styles.terminalDot} />
            <span className={styles.terminalDot} />
            <span className={styles.terminalDot} />
            <span className={styles.terminalTitle}>
              {translate({ message: "HOME.CliEntry.terminal.title" })}
            </span>
          </div>
          <div className={styles.terminalBody}>
            <div className={styles.terminalNote}>
              {translate({ message: "HOME.CliEntry.terminal.note" })}
            </div>
            <pre className={styles.commandBlock}>
              <code>
                {commands.map(command => (
                  <span key={command.text} className={styles.commandLine}>
                    <span className={styles.prompt}>{command.prompt}</span>{" "}
                    {command.text}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
