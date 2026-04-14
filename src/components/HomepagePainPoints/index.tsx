import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";

export default function HomepagePainPoints() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const isZh = i18n.currentLocale === "zh-CN";

  const copy = isZh
    ? {
        title: "几个典型的使用场景",
        subtitle:
          "从研发协作到文档流转，再到邮件和内部 API，先让 Agent 把这些常见工作跑起来。",
        promptLabel: "你可以直接这样说",
        resultLabel: "Agent 会串起这些动作",
        cards: [
          {
            title: "总结 GitHub PR，并发到 Slack",
            description: "把代码变更和团队同步串成一次动作。",
            prompt: "总结这个 PR，发到 Slack 频道。",
            result: "读取 diff、写摘要、发送到指定频道。",
            apps: [
              { icon: "i-simple-icons-github", label: "GitHub" },
              { icon: "i-simple-icons-slack", label: "Slack" },
            ],
          },
          {
            title: "把 Notion 需求拆成 Linear 任务",
            description: "让文档、任务拆解和跟踪保持在一条链路里。",
            prompt: "读这个 Notion 页面，拆成任务并同步到 Linear。",
            result: "读取文档、拆解事项、写回 Linear。",
            apps: [
              { icon: "i-simple-icons-notion", label: "Notion" },
              { icon: "i-simple-icons-linear", label: "Linear" },
            ],
          },
          {
            title: "读取 Gmail 附件，再调用内部 API",
            description: "把现成输入和你自己的处理逻辑接成一次执行。",
            prompt: "读 Gmail 附件，调用我们的 PDF API，回传结果。",
            result: "先取邮件附件，再继续调用你的 API 完成处理。",
            apps: [
              { icon: "i-simple-icons-gmail", label: "Gmail" },
              { icon: "i-lucide-braces", label: "你的 API" },
            ],
          },
        ],
      }
    : {
        title: "A few typical scenarios",
        subtitle:
          "From engineering collaboration to document flows to email plus internal APIs, start by letting agents run common work that already exists.",
        promptLabel: "You can say",
        resultLabel: "The agent will chain together",
        cards: [
          {
            title: "Summarize a GitHub PR and send it to Slack",
            description:
              "Turn code changes and team communication into one action.",
            prompt: "Summarize this PR and send it to a Slack channel.",
            result:
              "Read the diff, write the summary, and post it to the target channel.",
            apps: [
              { icon: "i-simple-icons-github", label: "GitHub" },
              { icon: "i-simple-icons-slack", label: "Slack" },
            ],
          },
          {
            title: "Turn a Notion spec into Linear tasks",
            description:
              "Keep the doc, task breakdown, and execution tracking on one path.",
            prompt:
              "Read this Notion page, break it into tasks, and sync them to Linear.",
            result:
              "Read the document, split the work, and write it back to Linear.",
            apps: [
              { icon: "i-simple-icons-notion", label: "Notion" },
              { icon: "i-simple-icons-linear", label: "Linear" },
            ],
          },
          {
            title: "Read a Gmail attachment, then call an internal API",
            description:
              "Connect ready-made input with your own processing logic in one execution path.",
            prompt:
              "Read the Gmail attachment, call our PDF API, and return the result.",
            result:
              "Pull the attachment first, then continue through your API to finish the job.",
            apps: [
              { icon: "i-simple-icons-gmail", label: "Gmail" },
              { icon: "i-lucide-braces", label: "Your API" },
            ],
          },
        ],
      };

  const cards = copy.cards.map(card => ({
    ...card,
    apps: card.apps.map(app =>
      app.label === "你的 API" || app.label === "Your API"
        ? {
            ...app,
            label: isZh ? "你的 API" : "Your API",
          }
        : app
    ),
  }));

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {cards.map(card => (
            <article key={card.title} className={styles.card}>
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
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
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
