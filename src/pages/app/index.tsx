import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import cx from "clsx";
import { Download, Globe, Smartphone } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";

import Layout from "../../theme/Layout";

type ProblemCard = {
  title: string;
  body: string;
};

type ModelFeatureCard = {
  eyebrow: string;
  title: string;
  body: string;
  chips: string[];
};

type WorkflowStep = {
  title: string;
  body: string;
  detail: string;
  videoSrc: string;
  alt: string;
};

type PricingPack = {
  tier: string;
  name: string;
  price: number;
  description: string;
  note: string;
  featureTitle: string;
  features: string[];
  cta: string;
  featured: boolean;
};

type DownloadItem = {
  title: string;
  subtitle: string;
  description: string;
  action: string;
  href: string;
  external?: boolean;
  kind?: "web" | "desktop" | "ios";
};

const VIDEO_BASE_URL = "https://static.oomol.com/assets/homepage";

const VIDEO_FILES = {
  hero: { zh: "chart-gen-4k-ZH.mp4", en: "chart-gen-4K-en.mp4" },
  startFast: { zh: "use-skills-4K-ZH.mp4", en: "use-skills-4K-en.mp4" },
  keepEditing: { zh: "chart-edit-4k-ZH.mp4", en: "chart-edit-4K-en.mp4" },
  trustSources: { zh: "chat-source-4K-ZH.mp4", en: "chat-source-4K-en.mp4" },
  outputs: { zh: "epub-translate-4K-ZH.mp4", en: "epub-translator-4K-en.mp4" },
} as const;

const TRAILING_HANGING_PUNCTUATION = /([，。、；：？！])$/u;

function splitZhTitleAtComma(title: string) {
  const commaIndex = title.indexOf("，");

  if (commaIndex === -1 || commaIndex === title.length - 1) {
    return [title];
  }

  return [title.slice(0, commaIndex + 1), title.slice(commaIndex + 1)];
}

function renderHangingTitleLine(text: string, className: string) {
  const match = text.match(TRAILING_HANGING_PUNCTUATION);

  if (!match) {
    return <span className={className}>{text}</span>;
  }

  const punctuation = match[1];
  const content = text.slice(0, -punctuation.length);

  return (
    <span className={className}>
      {content}
      <span className={styles.hangingPunctuation}>{punctuation}</span>
    </span>
  );
}

const COPY = {
  zh: {
    brandLabel: "悟墨 AI",
    hero: {
      titleLine1: "把 oo-cli 的能力",
      titleLine2: "直接带进图形界面",
      lead: "悟墨 AI 是 OOMOL 官方图形入口，让 oo-cli 的能力在这里被更完整地整合、更自然地使用。",
      productScreenshotAlt: "悟墨 AI 中由 Agent 原生调用工具完成任务的界面",
    },
    actions: {
      openWeb: "打开网页版",
      downloadDesktop: "下载桌面版",
      ios: "iOS",
    },
    models: {
      title: "oo-cli 的能力，在这里被更完整地整合",
      description:
        "在终端和其他 Agent 里，oo-cli 是高效的接入方式；在悟墨 AI 中，同一套能力被直接做进界面与交互流程。",
      demo: {
        eyebrow: "界面整合",
        title: "不是替代 oo-cli，而是把同一套能力做成更顺手的图形体验",
        description:
          "搜索、执行、查看结果与继续处理，都可以在同一个界面里连续完成。",
        imageAlt: "悟墨 AI 中原生工具能力与小程序工作台界面",
      },
      cards: {
        chat: {
          eyebrow: "更完整地融合",
          title: "同一套能力，直接进入界面流程",
          body: "账号连接、任务运行和现成能力的调用，不再散落在额外步骤里，而是作为页面体验的一部分出现。",
          chips: ["界面整合", "连续流程", "直接可用"],
        },
        image: {
          eyebrow: "更原生地使用",
          title: "更适合日常使用与连续操作",
          body: "当你描述任务时，系统会在界面里继续衔接搜索、执行和结果处理，让使用过程更自然。",
          chips: ["描述任务", "继续执行", "返回结果"],
        },
      },
    },
    problems: {
      titleLine1: "为什么同一套能力，",
      titleLine2: "还值得做成原生界面",
      cards: [
        {
          title: "能力可以接入，体验还可以更顺",
          body: "在不同环境中使用同一套能力时，安装、切换和唤醒方式往往并不一致。",
        },
        {
          title: "调用可以完成，流程未必连贯",
          body: "如果搜索、执行和结果处理分散在不同位置，使用成本就会更高。",
        },
        {
          title: "工具已经够强，还需要更自然的入口",
          body: "当能力直接融入界面后，日常使用、结果查看与后续处理都会更完整。",
        },
      ] as ProblemCard[],
    },
    workflow: {
      steps: [
        {
          title: "先描述任务，再由界面承接流程",
          body: "你只需要表达目标，不必先思考命令或入口。",
          detail:
            "oo-cli 已经提供了能力接入；在这里，这些能力被继续整合进图形界面里。",
          alt: "悟墨 AI 中由 Agent 主动搜索和调用技能的界面",
        },
        {
          title: "搜索、执行与结果处理在界面里连续发生",
          body: "当任务需要继续调用能力时，流程会在当前页面中自然衔接。",
          detail: "你看到的是连贯的执行过程，而不是来回跳转的操作链。",
          alt: "悟墨 AI 中继续执行多步工具任务的界面",
        },
        {
          title: "同一套能力，可以在不同入口中使用",
          body: "oo-cli 适合接入终端和其他 Agent；悟墨 AI 适合提供更原生的图形体验。",
          detail: "两者面向的是同一套能力，只是入口和使用方式不同。",
          alt: "悟墨 AI 中将结果与 OOMOL 工具体系继续连接的界面",
        },
      ],
    },
    outputs: {
      title: "oo-cli 提供能力入口，悟墨 AI 提供原生界面体验",
      description:
        "如果你希望在终端或外部 Agent 中接入能力，就使用 oo-cli；如果你希望在 OOMOL 里更自然地使用同一套能力，就打开悟墨 AI。",
      imageAlt: "悟墨 AI 中使用同一套工具能力持续完成任务的界面",
    },
    pricing: {
      title: "同一套能力，共用同一套点数",
      description:
        "不论是通过 oo-cli 接入，还是在悟墨 AI 中直接使用，点数与消耗都统一管理。",
      pillars: [
        "Web、Desktop、iOS 共用同一套能力与计费",
        "购买后的点数会一直保留，不会按月清零",
        "从轻量调用到长链路任务，都有对应档位",
      ],
      summary: {
        eyebrow: "统一消耗",
        title: "为能力本身补充余量，而不是为某个入口单独计费",
        description:
          "当任务继续执行、处理结果并完成交付时，点数会按实际使用量消耗。你可以先小额补充，也可以为高频任务预留更多余量。",
        badge: "跨入口共用",
      },
      perPack: "/ 包",
      featureTitle: "适合这种任务节奏",
      cta: "去充值",
      note: "点数购买后会保留在账户里，不按月清零，也不会因为你切换使用入口而失效。",
      packs: {
        starter: {
          tier: "偶尔使用",
          name: "入门包",
          description: "到账 5 点数。适合轻量体验或偶尔补充余量。",
          note: "灵活",
          features: ["适合低频使用时快速补充", "无需一开始就准备过多余量"],
        },
        boost: {
          tier: "日常使用",
          name: "增强包",
          description:
            "到账 24 点数（20 基础点数 + 4 额外点数）。适合日常使用时持续处理任务与结果。",
          note: "推荐",
          features: ["更适合稳定的日常使用节奏", "连续处理多个任务时更从容"],
        },
        ultra: {
          tier: "高频任务",
          name: "超级包",
          description:
            "到账 128 点数（100 基础点数 + 28 额外点数）。适合批量处理、长链路任务与高频使用阶段。",
          note: "储备型",
          features: ["适合批量处理与长链路任务", "为高频阶段预留更充足余量"],
        },
      },
    },
    downloads: {
      title: "选择适合你的使用入口",
      items: {
        web: {
          title: "Web",
          subtitle: "官方入口",
          description: "最快体验 OOMOL 原生图形入口。",
          action: "打开网页版",
        },
        desktop: {
          title: "Desktop",
          subtitle: "桌面版",
          description:
            "以独立应用的方式使用同一套能力，打开更直接，体验更顺手。",
          action: "下载桌面版",
        },
        ios: {
          title: "iOS",
          subtitle: "移动端",
          description: "随时查看任务进展，并继续跟进当前对话。",
          action: "打开 App Store",
        },
      },
    },
    footerCopyright: "Copyright © 2026 悟墨 AI.",
  },
  en: {
    brandLabel: "OOMOL AI",
    hero: {
      titleLine1: "Bring oo-cli capabilities",
      titleLine2: "directly into a GUI experience",
      lead: "OOMOL AI is OOMOL's official GUI entry point, designed to make oo-cli capabilities feel more fully integrated and more natural to use.",
      productScreenshotAlt:
        "OOMOL AI interface where the agent natively calls tools to complete a task",
    },
    actions: {
      openWeb: "Open Web App",
      downloadDesktop: "Download Desktop App",
      ios: "iOS",
    },
    models: {
      title: "oo-cli capabilities, more fully integrated here",
      description:
        "In terminals and external agents, oo-cli is an efficient way to connect capabilities. In OOMOL AI, the same capabilities are built more directly into the interface and flow.",
      demo: {
        eyebrow: "Interface integration",
        title:
          "Not a replacement for oo-cli, but a more native GUI experience for the same capabilities",
        description:
          "Search, execution, results, and follow-up work can stay in the same interface.",
        imageAlt:
          "OOMOL AI workspace showing native tool capabilities and mini apps",
      },
      cards: {
        chat: {
          eyebrow: "More fully integrated",
          title: "The same capabilities, brought directly into the interface",
          body: "Account connections, task execution, and ready-made capabilities are no longer scattered across separate steps. They become part of the product flow itself.",
          chips: ["Interface flow", "Continuous use", "Directly available"],
        },
        image: {
          eyebrow: "More native to use",
          title: "Better suited to everyday use and continuous work",
          body: "When you describe a task, the interface can continue through search, execution, and result handling in a more natural way.",
          chips: ["Describe the task", "Continue execution", "Return results"],
        },
      },
    },
    problems: {
      titleLine1: "Why the same capabilities",
      titleLine2: "still benefit from a native GUI",
      cards: [
        {
          title:
            "Capabilities can connect, but the experience can still be smoother",
          body: "When the same capabilities are used across different environments, installation, switching, and wake-up flows are rarely identical.",
        },
        {
          title: "Execution can work, while the flow still feels fragmented",
          body: "If search, execution, and result handling live in different places, the overall experience becomes less seamless.",
        },
        {
          title: "Strong capabilities still need a more natural entry point",
          body: "Once those capabilities are brought directly into the interface, everyday use, result viewing, and follow-up work all feel more complete.",
        },
      ] as ProblemCard[],
    },
    workflow: {
      steps: [
        {
          title: "Start with the task, and let the interface carry the flow",
          body: "You focus on the goal instead of deciding on commands or entry points first.",
          detail:
            "oo-cli already provides the capability path. Here, that same path is carried further into the GUI layer.",
          alt: "OOMOL AI interface where the agent actively searches for and calls skills",
        },
        {
          title:
            "Search, execution, and results stay together in the interface",
          body: "When a task needs to continue through the capability layer, the current page can carry that process forward more naturally.",
          detail:
            "What you see is a connected execution flow rather than a chain of separate manual steps.",
          alt: "OOMOL AI interface continuing a multi-step tool task",
        },
        {
          title:
            "The same capabilities can be used through different entry points",
          body: "oo-cli fits terminal and external agent integration. OOMOL AI fits a more native GUI experience for the same capability set.",
          detail:
            "The capability layer stays the same. What changes is the entry point and the experience around it.",
          alt: "OOMOL AI interface connecting results back into the OOMOL toolchain",
        },
      ],
    },
    outputs: {
      title:
        "oo-cli provides the capability path. OOMOL AI provides the native GUI experience.",
      description:
        "Use oo-cli when you want to connect capabilities into a terminal or external agent. Open OOMOL AI when you want to use the same capabilities more natively inside OOMOL.",
      imageAlt:
        "OOMOL AI interface continuing work with the same tool capability layer",
    },
    pricing: {
      title: "One capability layer, one credit system",
      description:
        "Whether capabilities are connected through oo-cli or used directly inside OOMOL AI, credits and usage stay under the same system.",
      pillars: [
        "Web, desktop, and iOS share the same capability layer and billing",
        "Purchased credits stay in your account until you use them",
        "Pack sizes cover light usage through longer multi-step runs",
      ],
      summary: {
        eyebrow: "Shared usage",
        title:
          "Credits extend the capability layer itself, not one interface alone",
        description:
          "As tasks continue through execution, result handling, and delivery, credits reflect actual usage. Start small or keep more in reserve for heavier workloads.",
        badge: "One credit system",
      },
      perPack: "/ pack",
      featureTitle: "Works well for",
      cta: "Top Up",
      note: "Purchased credits stay in your account until you use them. They do not reset monthly and they do not disappear when you switch surfaces.",
      packs: {
        starter: {
          tier: "Occasional use",
          name: "Starter Pack",
          description:
            "Includes 5 credits. A small refill for light usage or occasional balance top-ups.",
          note: "Flexible",
          features: [
            "Useful when you only need a small additional balance",
            "No need to reserve too much upfront",
          ],
        },
        boost: {
          tier: "Daily use",
          name: "Boost Pack",
          description:
            "Includes 24 credits (20 base + 4 bonus). A better fit for regular day-to-day usage and ongoing task handling.",
          note: "Popular",
          features: [
            "A stronger fit for steady everyday usage",
            "More comfortable when several tasks arrive in a row",
          ],
        },
        ultra: {
          tier: "Heavy use",
          name: "Ultra Pack",
          description:
            "Includes 128 credits (100 base + 28 bonus). Best for batch processing, longer chains, and heavier usage periods.",
          note: "Reserve",
          features: [
            "Built for batch processing and longer workflows",
            "Keeps more headroom available during heavier periods",
          ],
        },
      },
    },
    downloads: {
      title: "Choose the entry point that fits you best",
      items: {
        web: {
          title: "Web",
          subtitle: "Native workspace",
          description:
            "The fastest way to experience OOMOL's native GUI entry.",
          action: "Open Web App",
        },
        desktop: {
          title: "Desktop",
          subtitle: "Desktop app",
          description:
            "Use the same capabilities in a dedicated app with a more direct and seamless experience.",
          action: "Download Desktop App",
        },
        ios: {
          title: "iOS",
          subtitle: "Mobile",
          description:
            "Track progress and continue the current conversation from your phone or tablet.",
          action: "Open App Store",
        },
      },
    },
    footerCopyright: "Copyright © 2026 OOMOL AI.",
  },
} as const;

function getLocalizedVideoSrc(
  file: { zh: string; en: string },
  isZh: boolean
): string {
  return `${VIDEO_BASE_URL}/${isZh ? file.zh : file.en}`;
}

function formatPackPrice(priceUsd: number): string {
  return `$ ${priceUsd}`;
}

const AutoPlayVideo = memo(function AutoPlayVideo({
  className,
  src,
  label,
}: {
  className: string;
  src: string;
  label: string;
}) {
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches
    ) {
      setShowControls(true);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const playVideo = () => {
      void video.play().catch(() => {});
    };

    if (typeof IntersectionObserver === "undefined") {
      playVideo();
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          playVideo();
          return;
        }

        video.pause();
      },
      { threshold: 0 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      controls={showControls}
      tabIndex={0}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onFocus={() => setShowControls(true)}
      onBlur={() => setShowControls(false)}
    />
  );
});

export default function AppPage() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const isZh = i18n.currentLocale === "zh-CN";
  const copy = isZh ? COPY.zh : COPY.en;

  const downloadsHref = useBaseUrl("/downloads");
  const appWebHref = "https://app.oomol.com";
  const appStoreHref =
    "https://apps.apple.com/cn/app/%E6%82%9F%E5%A2%A8-ai-oomol-%E5%AF%B9%E8%AF%9D%E5%BC%8F%E4%BA%91%E5%87%BD%E6%95%B0/id6749377154";
  const rechargeHref = "https://console.oomol.com/billing/token-recharge";
  const pricingTitleLines = isZh
    ? splitZhTitleAtComma(copy.pricing.title)
    : [copy.pricing.title];

  const nativeWorkspacePng = useBaseUrl(
    "/img/pages/app/chat-login-agent-miniapps.png"
  );

  const modelFeatureCards: readonly ModelFeatureCard[] = [
    {
      eyebrow: copy.models.cards.chat.eyebrow,
      title: copy.models.cards.chat.title,
      body: copy.models.cards.chat.body,
      chips: [...copy.models.cards.chat.chips],
    },
    {
      eyebrow: copy.models.cards.image.eyebrow,
      title: copy.models.cards.image.title,
      body: copy.models.cards.image.body,
      chips: [...copy.models.cards.image.chips],
    },
  ];

  const painCards: readonly ProblemCard[] = copy.problems.cards;

  const workflowSteps: readonly WorkflowStep[] = [
    {
      ...copy.workflow.steps[0],
      videoSrc: getLocalizedVideoSrc(VIDEO_FILES.startFast, isZh),
    },
    {
      ...copy.workflow.steps[1],
      videoSrc: getLocalizedVideoSrc(VIDEO_FILES.keepEditing, isZh),
    },
    {
      ...copy.workflow.steps[2],
      videoSrc: getLocalizedVideoSrc(VIDEO_FILES.trustSources, isZh),
    },
  ];

  const creditPacks: readonly PricingPack[] = [
    {
      tier: copy.pricing.packs.starter.tier,
      name: copy.pricing.packs.starter.name,
      price: 5,
      description: copy.pricing.packs.starter.description,
      note: copy.pricing.packs.starter.note,
      featureTitle: copy.pricing.featureTitle,
      features: [...copy.pricing.packs.starter.features],
      cta: copy.pricing.cta,
      featured: false,
    },
    {
      tier: copy.pricing.packs.boost.tier,
      name: copy.pricing.packs.boost.name,
      price: 20,
      description: copy.pricing.packs.boost.description,
      note: copy.pricing.packs.boost.note,
      featureTitle: copy.pricing.featureTitle,
      features: [...copy.pricing.packs.boost.features],
      cta: copy.pricing.cta,
      featured: true,
    },
    {
      tier: copy.pricing.packs.ultra.tier,
      name: copy.pricing.packs.ultra.name,
      price: 100,
      description: copy.pricing.packs.ultra.description,
      note: copy.pricing.packs.ultra.note,
      featureTitle: copy.pricing.featureTitle,
      features: [...copy.pricing.packs.ultra.features],
      cta: copy.pricing.cta,
      featured: false,
    },
  ];

  const downloadItems: readonly DownloadItem[] = [
    {
      title: copy.downloads.items.web.title,
      subtitle: copy.downloads.items.web.subtitle,
      description: copy.downloads.items.web.description,
      action: copy.downloads.items.web.action,
      href: appWebHref,
      external: true,
      kind: "web",
    },
    {
      title: copy.downloads.items.desktop.title,
      subtitle: copy.downloads.items.desktop.subtitle,
      description: copy.downloads.items.desktop.description,
      action: copy.downloads.items.desktop.action,
      href: downloadsHref,
      kind: "desktop",
    },
    {
      title: copy.downloads.items.ios.title,
      subtitle: copy.downloads.items.ios.subtitle,
      description: copy.downloads.items.ios.description,
      action: copy.downloads.items.ios.action,
      href: appStoreHref,
      external: true,
      kind: "ios",
    },
  ];

  return (
    <Layout>
      <main id="top" className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroHeader}>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleLine}>
                  {copy.hero.titleLine1}
                </span>
                <span
                  className={cx(styles.heroTitleLine, styles.heroTitleAccent)}
                >
                  {copy.hero.titleLine2}
                </span>
              </h1>
              <p className={styles.heroLead}>{copy.hero.lead}</p>

              <div className={styles.heroActions}>
                <a
                  className={cx(
                    styles.heroActionButton,
                    styles.heroActionButtonPrimary
                  )}
                  href={appWebHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className={styles.heroActionIcon} aria-hidden="true" />
                  <span>{copy.actions.openWeb}</span>
                </a>
                <a className={styles.heroActionButton} href={downloadsHref}>
                  <Download
                    className={styles.heroActionIcon}
                    aria-hidden="true"
                  />
                  <span>{copy.actions.downloadDesktop}</span>
                </a>
                <a
                  className={styles.heroActionButton}
                  href={appStoreHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Smartphone
                    className={styles.heroActionIcon}
                    aria-hidden="true"
                  />
                  <span>{copy.actions.ios}</span>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroVisualInner}>
              <div className={styles.heroFrame}>
                <AutoPlayVideo
                  className={styles.heroScreenshot}
                  src={getLocalizedVideoSrc(VIDEO_FILES.hero, isZh)}
                  label={copy.hero.productScreenshotAlt}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="models"
          className={cx(styles.section, styles.modelsSection)}
        >
          <div className={cx(styles.sectionIntro, styles.modelsIntro)}>
            <h2>{copy.models.title}</h2>
            <p>{copy.models.description}</p>
          </div>

          <div className={styles.modelFeatureGrid}>
            {modelFeatureCards.map(card => (
              <article key={card.title} className={styles.modelFeatureCard}>
                <p className={styles.modelFeatureEyebrow}>{card.eyebrow}</p>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <div
                  className={styles.modelFeatureChips}
                  aria-label={card.title}
                >
                  {card.chips.map(chip => (
                    <span key={chip} className={styles.modelFeatureChip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className={styles.modelDemo}>
            <div className={styles.modelDemoCopy}>
              <p className={styles.modelDemoEyebrow}>
                {copy.models.demo.eyebrow}
              </p>
              <h3>{copy.models.demo.title}</h3>
              <p>{copy.models.demo.description}</p>
            </div>

            <div className={styles.modelDemoFrame}>
              <img
                src={nativeWorkspacePng}
                alt={copy.models.demo.imageAlt}
                className={styles.modelDemoImage}
              />
            </div>
          </div>
        </section>

        <section id="problems" className={styles.section}>
          <div className={cx(styles.sectionIntro, styles.problemsIntro)}>
            <h2 className={styles.problemsTitle}>
              {renderHangingTitleLine(
                copy.problems.titleLine1,
                styles.problemsTitleLine
              )}
              {renderHangingTitleLine(
                copy.problems.titleLine2,
                styles.problemsTitleLine
              )}
            </h2>
          </div>

          <div className={styles.painGrid}>
            {painCards.map(card => (
              <article key={card.title} className={styles.painCard}>
                <h3>{card.title}</h3>
                <p className={styles.painBody}>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="workspace"
          className={cx(styles.section, styles.workspaceSection)}
        >
          <div className={styles.solutionList}>
            {workflowSteps.map(step => (
              <article key={step.title} className={styles.solutionItem}>
                <div className={styles.solutionMedia}>
                  <AutoPlayVideo
                    className={styles.outputImage}
                    src={step.videoSrc}
                    label={step.alt}
                  />
                </div>

                <div className={styles.solutionText}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <p>{step.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="outputs" className={styles.section}>
          <div className={cx(styles.sectionIntro, styles.outputsIntro)}>
            <h2>{copy.outputs.title}</h2>
            <p>{copy.outputs.description}</p>
          </div>

          <div className={styles.outputsShowcase}>
            <div className={styles.outputsShowcaseFrame}>
              <AutoPlayVideo
                className={styles.outputsShowcaseImage}
                src={getLocalizedVideoSrc(VIDEO_FILES.outputs, isZh)}
                label={copy.outputs.imageAlt}
              />
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className={cx(styles.section, styles.pricingSection)}
        >
          <div className={cx(styles.sectionIntro, styles.pricingIntro)}>
            <h2 className={styles.hangingTitle}>
              {renderHangingTitleLine(
                pricingTitleLines[0],
                styles.hangingTitleLine
              )}
              {pricingTitleLines[1]
                ? renderHangingTitleLine(
                    pricingTitleLines[1],
                    styles.hangingTitleLine
                  )
                : null}
            </h2>
            <p>{copy.pricing.description}</p>
          </div>

          <div className={styles.pricingGrid}>
            {creditPacks.map(pack => (
              <article
                key={pack.name}
                className={cx(
                  styles.pricingCard,
                  pack.featured && styles.pricingCardFeatured
                )}
              >
                <div className={styles.pricingCardTop}>
                  <div className={styles.pricingHeader}>
                    <div>
                      <p className={styles.planTier}>{pack.tier}</p>
                      <h3>{pack.name}</h3>
                    </div>
                  </div>

                  <div className={styles.planPriceRow}>
                    <strong>{formatPackPrice(pack.price)}</strong>
                    <span>{copy.pricing.perPack}</span>
                  </div>

                  <p className={styles.planDescription}>{pack.description}</p>
                </div>

                <div className={styles.pricingFeatureBlock}>
                  <ul className={styles.pricingFeatureList}>
                    {pack.features.map(feature => (
                      <li key={feature}>
                        <span className={styles.featureDot} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  className={cx(
                    styles.cardAction,
                    pack.featured && styles.cardActionPrimary
                  )}
                  href={rechargeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{pack.cta}</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          id="downloads"
          className={cx(styles.section, styles.entrySection)}
        >
          <div className={cx(styles.sectionIntro, styles.downloadsIntro)}>
            <h2>{copy.downloads.title}</h2>
          </div>

          <div className={styles.downloadGrid}>
            {downloadItems.map(item => (
              <article key={item.title} className={styles.downloadCard}>
                <div className={styles.downloadCardHeader}>
                  <span>{item.title}</span>
                  <strong>{item.subtitle}</strong>
                </div>
                <p>{item.description}</p>
                <a
                  className={cx(
                    styles.cardAction,
                    item.kind === "web" && styles.cardActionPrimary
                  )}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  <span>{item.action}</span>
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
