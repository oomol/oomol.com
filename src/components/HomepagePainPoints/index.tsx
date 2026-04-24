import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import React from "react";

export default function HomepagePainPoints() {
  const copy = {
    title: translate({
      id: "HOME.PainPoints.title",
      message: "Connect the tools your team already uses",
    }),
    subtitle: translate({
      id: "HOME.PainPoints.subtitle",
      message:
        "GitHub, Slack, Notion, Gmail, and your own APIs can work together through OOMOL, so agents can help without asking your team to change how they already work.",
    }),
    promptLabel: translate({
      id: "HOME.PainPoints.promptLabel",
      message: "Say this",
    }),
    resultLabel: translate({
      id: "HOME.PainPoints.resultLabel",
      message: "The agent does",
    }),
    cards: [
      {
        title: translate({
          id: "HOME.PainPoints.card1.title",
          message: "Summarize a GitHub PR and send it to Slack",
        }),
        description: translate({
          id: "HOME.PainPoints.card1.description",
          message:
            "Useful when you want to turn PR review into a team update without manual summarizing.",
        }),
        prompt: translate({
          id: "HOME.PainPoints.card1.prompt",
          message:
            "Summarize the key points in this PR and send them to a Slack channel.",
        }),
        result: translate({
          id: "HOME.PainPoints.card1.solution",
          message:
            "Read the diff, extract key points, and post to the target channel.",
        }),
        apps: [
          { icon: "i-simple-icons-github", label: "GitHub" },
          { icon: "i-simple-icons-slack", label: "Slack" },
        ],
      },
      {
        title: translate({
          id: "HOME.PainPoints.card2.title",
          message: "Turn a Notion spec into Linear tasks",
        }),
        description: translate({
          id: "HOME.PainPoints.card2.description",
          message:
            "Useful when you want to turn a spec page into trackable work without manual breakdown.",
        }),
        prompt: translate({
          id: "HOME.PainPoints.card2.prompt",
          message:
            "Read this Notion page, break it into tasks, and sync them to Linear.",
        }),
        result: translate({
          id: "HOME.PainPoints.card2.solution",
          message:
            "Extract requirements, shape tasks, and write them back to Linear.",
        }),
        apps: [
          { icon: "i-simple-icons-notion", label: "Notion" },
          { icon: "i-simple-icons-linear", label: "Linear" },
        ],
      },
      {
        title: translate({
          id: "HOME.PainPoints.card3.title",
          message: "Read a Gmail attachment, then call your API",
        }),
        description: translate({
          id: "HOME.PainPoints.card3.description",
          message:
            "Useful when you want to pipe email inputs straight into your own service.",
        }),
        prompt: translate({
          id: "HOME.PainPoints.card3.prompt",
          message:
            "Read the Gmail attachment, call our PDF API, and return the result.",
        }),
        result: translate({
          id: "HOME.PainPoints.card3.solution",
          message:
            "Download the attachment, call your API, and return the output.",
        }),
        apps: [
          { icon: "i-simple-icons-gmail", label: "Gmail" },
          {
            icon: "i-lucide-braces",
            label: translate({
              id: "HOME.PainPoints.card3.apiLabel",
              message: "Your API",
            }),
          },
        ],
      },
    ],
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{copy.title}</h2>
          <p className={styles.sectionSubtitle}>{copy.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {copy.cards.map(card => (
            <article key={card.title} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTop}>
                  <div className={styles.appRow}>
                    {card.apps.map(app => (
                      <span key={app.label} className={styles.appChip}>
                        <i
                          className={`${styles.appIcon} ${app.icon}`}
                          aria-hidden="true"
                        />
                        <span>{app.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.cardLead}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDescription}>{card.description}</p>
                </div>
              </div>
              <div className={styles.exampleBlock}>
                <div className={styles.exampleLabel}>{copy.promptLabel}</div>
                <p className={styles.exampleText}>{card.prompt}</p>
              </div>
              <div className={styles.resultBlock}>
                <div className={styles.resultIconWrap}>
                  <i className="i-lucide-play" aria-hidden="true" />
                </div>
                <div className={styles.resultContent}>
                  <div className={styles.resultLabel}>{copy.resultLabel}</div>
                  <p className={styles.resultText}>{card.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
