import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { Button } from "@site/src/components/ui/button";
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

const installCommands = [
  {
    prompt: "$",
    text: "curl -fsSL https://cli.oomol.com/install.sh | bash",
  },
  {
    prompt: "$",
    text: "oo login",
  },
];

const demoStages = [
  {
    index: "01",
    label: translate({ message: "HOME.CliEntry.demo.stage1.label" }),
    title: translate({ message: "HOME.CliEntry.demo.stage1.title" }),
    prompt: "$",
    text: 'oo search "generate a QR code"',
  },
  {
    index: "02",
    label: translate({ message: "HOME.CliEntry.demo.stage2.label" }),
    title: translate({ message: "HOME.CliEntry.demo.stage2.title" }),
    prompt: "$",
    text: "oo packages info foo/bar@latest",
  },
  {
    index: "03",
    label: translate({ message: "HOME.CliEntry.demo.stage3.label" }),
    title: translate({ message: "HOME.CliEntry.demo.stage3.title" }),
    prompt: "$",
    text: "oo cloud-task run foo/bar@1.2.3 --block-id main --data @input.json",
    followUp: "oo cloud-task result <task-id>",
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
          <h2 className={styles.sectionTitle}>
            {translate({ message: "HOME.CliEntry.title" })}
          </h2>
          <p className={styles.sectionSubtitle}>
            {translate({ message: "HOME.CliEntry.subtitle" })}
          </p>
          <div className={styles.benefitGrid}>
            <article className={styles.benefitCard}>
              <div className={styles.benefitLabel}>
                {translate({ message: "HOME.CliEntry.benefit1.label" })}
              </div>
              <p className={styles.benefitDescription}>
                {translate({ message: "HOME.CliEntry.benefit1.description" })}
              </p>
            </article>
            <article className={styles.benefitCard}>
              <div className={styles.benefitLabel}>
                {translate({ message: "HOME.CliEntry.benefit2.label" })}
              </div>
              <p className={styles.benefitDescription}>
                {translate({ message: "HOME.CliEntry.benefit2.description" })}
              </p>
            </article>
          </div>

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
            <Button asChild>
              <Link to="/cli">
                {translate({ message: "HOME.CliEntry.action.primary" })}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/cloud">
                {translate({ message: "HOME.CliEntry.action.secondary" })}
              </Link>
            </Button>
          </div>
        </div>

        <div className={styles.showcaseColumn}>
          <div className={styles.setupCard}>
            <div className={styles.panelEyebrow}>
              {translate({ message: "HOME.CliEntry.setup.eyebrow" })}
            </div>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>
                {translate({ message: "HOME.CliEntry.setup.title" })}
              </h3>
              <span className={styles.panelPill}>
                {translate({ message: "HOME.CliEntry.setup.pill" })}
              </span>
            </div>
            <p className={styles.panelNote}>
              {translate({ message: "HOME.CliEntry.setup.note" })}
            </p>
            <pre className={styles.commandBlock}>
              <code>
                {installCommands.map(command => (
                  <span key={command.text} className={styles.commandLine}>
                    <span className={styles.prompt}>{command.prompt}</span>{" "}
                    {command.text}
                  </span>
                ))}
              </code>
            </pre>
          </div>

          <div className={styles.demoCard}>
            <div className={styles.panelHeader}>
              <div>
                <div className={styles.panelEyebrow}>
                  {translate({ message: "HOME.CliEntry.demo.eyebrow" })}
                </div>
                <h3 className={styles.panelTitle}>
                  {translate({ message: "HOME.CliEntry.demo.title" })}
                </h3>
              </div>
              <span className={styles.liveBadge}>
                {translate({ message: "HOME.CliEntry.demo.badge" })}
              </span>
            </div>
            <p className={styles.panelNote}>
              {translate({ message: "HOME.CliEntry.demo.note" })}
            </p>

            <div className={styles.demoStageList}>
              {demoStages.map(stage => (
                <article key={stage.index} className={styles.demoStage}>
                  <div className={styles.demoStageHeader}>
                    <span className={styles.demoStageIndex}>{stage.index}</span>
                    <div className={styles.demoStageHeading}>
                      <div className={styles.demoStageLabel}>{stage.label}</div>
                      <h4 className={styles.demoStageTitle}>{stage.title}</h4>
                    </div>
                  </div>
                  <pre className={styles.stageCommandBlock}>
                    <code>
                      <span className={styles.commandLine}>
                        <span className={styles.prompt}>{stage.prompt}</span>{" "}
                        {stage.text}
                      </span>
                      {stage.followUp ? (
                        <span className={styles.commandLineMuted}>
                          <span className={styles.prompt}>$</span>{" "}
                          {stage.followUp}
                        </span>
                      ) : null}
                    </code>
                  </pre>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
