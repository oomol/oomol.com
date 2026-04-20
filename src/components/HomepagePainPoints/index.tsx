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
        badge: "第一步：先用现成能力",
        title: "先让 Agent 直接把现成工作跑起来",
        subtitle:
          "如果现成工具已经够用，OOMOL 的第一层价值就很简单：先接上、先执行，不必一上来就自己做工具。",
        promptLabel: "直接这样说",
        resultLabel: "Agent 会自动执行",
        cards: [
          {
            title: "总结 GitHub PR，并发到 Slack",
            description: "适合把评审结论快速同步到团队，不再手动整理和转发。",
            prompt: "总结这个 PR 的关键信息，发到 Slack 频道。",
            result: "读取 diff、提炼结论、发送到指定频道。",
            apps: [
              { icon: "i-simple-icons-github", label: "GitHub" },
              { icon: "i-simple-icons-slack", label: "Slack" },
            ],
          },
          {
            title: "把 Notion 需求拆成 Linear 任务",
            description: "适合把需求页直接变成可跟踪任务，减少手动拆分。",
            prompt: "读这个 Notion 页面，拆成任务并同步到 Linear。",
            result: "提取需求、整理任务、写回 Linear。",
            apps: [
              { icon: "i-simple-icons-notion", label: "Notion" },
              { icon: "i-simple-icons-linear", label: "Linear" },
            ],
          },
          {
            title: "读取 Gmail 附件，再调用内部 API",
            description: "适合把邮件输入直接接到你的服务，省掉人工中转。",
            prompt: "读 Gmail 附件，调用我们的 PDF API，回传结果。",
            result: "下载附件、调用内部 API、返回处理结果。",
            apps: [
              { icon: "i-simple-icons-gmail", label: "Gmail" },
              { icon: "i-lucide-braces", label: "你的 API" },
            ],
          },
        ],
      }
    : {
        badge: "Step 1: Use what already exists",
        title: "Let agents run ready-made work first",
        subtitle:
          "If a ready-made tool already solves the job, OOMOL's first layer of value is simple: connect it, run it, and skip building your own tool at the start.",
        promptLabel: "Say this",
        resultLabel: "The agent does",
        cards: [
          {
            title: "Summarize a GitHub PR and send it to Slack",
            description:
              "Useful when you want to turn PR review into a team update without manual summarizing.",
            prompt:
              "Summarize the key points in this PR and send them to a Slack channel.",
            result:
              "Read the diff, extract key points, and post to the target channel.",
            apps: [
              { icon: "i-simple-icons-github", label: "GitHub" },
              { icon: "i-simple-icons-slack", label: "Slack" },
            ],
          },
          {
            title: "Turn a Notion spec into Linear tasks",
            description:
              "Useful when you want to turn a spec page into trackable work without manual breakdown.",
            prompt:
              "Read this Notion page, break it into tasks, and sync them to Linear.",
            result:
              "Extract requirements, shape tasks, and write them back to Linear.",
            apps: [
              { icon: "i-simple-icons-notion", label: "Notion" },
              { icon: "i-simple-icons-linear", label: "Linear" },
            ],
          },
          {
            title: "Read a Gmail attachment, then call an internal API",
            description:
              "Useful when you want to pipe email inputs straight into your own service.",
            prompt:
              "Read the Gmail attachment, call our PDF API, and return the result.",
            result:
              "Download the attachment, call your internal API, and return the output.",
            apps: [
              { icon: "i-simple-icons-gmail", label: "Gmail" },
              { icon: "i-lucide-braces", label: "Your API" },
            ],
          },
        ],
      };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>{copy.badge}</div>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
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
