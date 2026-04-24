import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Head from "@docusaurus/Head";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button } from "@site/src/components/ui/button";
import { downloadStable } from "@site/src/lib/utils";
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
  href?: string;
  external?: boolean;
  kind?: "web" | "desktop" | "ios";
};

const VIDEO_BASE_URL = "/video/app";

const VIDEO_FILES = {
  hero: { zh: "chart-gen-zh-web.mp4", en: "chart-gen-en-web.mp4" },
  startFast: { zh: "use-skills-zh-web.mp4", en: "use-skills-en-web.mp4" },
  keepEditing: { zh: "chart-edit-zh-web.mp4", en: "chart-edit-zh-web.mp4" },
  trustSources: {
    zh: "chat-source-zh-web.mp4",
    en: "chat-source-en-web.mp4",
  },
  outputs: {
    zh: "epub-translator-zh-web.mp4",
    en: "epub-translator-en-web.mp4",
  },
} as const;

/** 与导出素材一致；若源文件改版请同步更新图片固有尺寸。 */
const APP_MEDIA_INTRINSIC_SIZE = {
  nativeWorkspace: { width: 2470, height: 1964 },
} as const;

const APP_DESKTOP_DOWNLOAD_URLS = {
  macos: "https://app-downloads.oomol.com/oomol-ai/darwin/arm64",
  windows: "https://app-downloads.oomol.com/oomol-ai/win32/x64",
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
    page: {
      title: "悟墨 AI（OOMOL AI）- OOMOL 的官方图形入口",
      description:
        "当你更喜欢图形界面时，可以在 Web、桌面和 iOS 中直接使用 OOMOL 的工具，适合连续对话、查看结果和继续处理任务。",
    },
    hero: {
      titleLine1: "悟墨 AI，让 OOMOL 工具",
      titleLine2: "在图形界面里直接可用",
      lead: "面向日常使用的官方图形入口。你可以在 Web、桌面和 iOS 上发起任务、查看结果，并在同一个上下文里继续处理。",
      productScreenshotAlt: "悟墨 AI 中由 Agent 原生调用工具完成任务的界面",
    },
    actions: {
      openWeb: "打开网页版",
      downloadDesktop: "下载桌面版",
      ios: "iOS",
    },
    models: {
      title: "把任务留在一个工作区",
      description:
        "从连接账号、调用工具，到查看输出、继续追问，都在同一处完成。",
      demo: {
        title: "任务不用在多个入口之间来回切换",
        description: "搜索、执行、结果和后续处理都围绕同一个上下文展开。",
        imageAlt: "悟墨 AI 中原生工具能力与小程序工作台界面",
      },
      cards: {
        chat: {
          eyebrow: "连续处理",
          title: "从发起任务到查看结果，都在当前页面",
          body: "账号连接、任务运行和工具调用会自然衔接到当前工作区，不需要在不同产品形态之间来回找入口。",
          chips: ["一个工作区", "连续处理", "直接使用"],
        },
        image: {
          eyebrow: "后续跟进",
          title: "拿到结果后，可以继续追问或继续执行",
          body: "图片、文档、表格和中间结果都留在页面里，适合边看边改、边确认边推进。",
          chips: ["查看结果", "继续追问", "继续执行"],
        },
      },
    },
    problems: {
      titleLine1: "这些场景，",
      titleLine2: "图形界面更合适",
      cards: [
        {
          title: "需要反复查看和调整",
          body: "当任务不是一次性结束，而是需要看结果、补充要求、继续修改时，图形界面更直观。",
        },
        {
          title: "希望结果和上下文留在一起",
          body: "图片、文档、表格或中间结果保留在当前工作区里，后续处理会更容易接上。",
        },
        {
          title: "想减少入口和设备切换",
          body: "Web、桌面和 iOS 使用一致的图形入口，日常打开、回来继续都更顺手。",
        },
      ] as ProblemCard[],
    },
    workflow: {
      steps: [
        {
          title: "描述任务后，直接开始",
          body: "用自然语言说明目标，悟墨 AI 会在当前工作区里衔接搜索、工具调用和执行过程。",
          detail: "适合不想切换终端或多套入口的日常任务。",
          alt: "悟墨 AI 中由 Agent 主动搜索和调用技能的界面",
        },
        {
          title: "看到结果后，接着处理",
          body: "结果、补充要求和下一步操作都保留在当前页面。",
          detail: "适合边看边改、边确认边推进的任务。",
          alt: "悟墨 AI 中继续执行多步工具任务的界面",
        },
        {
          title: "换到其他设备，也能继续",
          body: "Web、桌面和 iOS 使用同一套入口和上下文，不需要重新适应。",
          detail: "在电脑前处理复杂任务，离开座位后继续查看进展。",
          alt: "悟墨 AI 中将结果与 OOMOL 工具体系继续连接的界面",
        },
      ],
    },
    outputs: {
      title: "CLI 适合集成，悟墨 AI 适合日常使用",
      description:
        "oo-cli 适合把工具接入 Agent 和终端流程；悟墨 AI 适合你直接打开，用图形界面查看结果并继续处理。",
      imageAlt: "悟墨 AI 中使用同一套工具能力持续完成任务的界面",
    },
    pricing: {
      title: "共用同一套点数",
      description:
        "悟墨 AI 与 oo-cli 共用同一套点数。你按实际使用消耗，不按 Web、桌面和 iOS 分开计费。",
      pillars: [
        "Web、Desktop、iOS 共用同一账户与点数",
        "购买后的点数会一直保留，不会按月清零",
        "从轻量体验到高频使用都有对应档位",
      ],
      summary: {
        eyebrow: "统一计费",
        title: "不是给某个入口单独充值",
        description:
          "无论你从 oo-cli 还是悟墨 AI 发起任务，消耗都按实际使用计算。用得更多时再补充即可。",
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
          description: "到账 5 点数。适合轻量体验或偶尔补充。",
          note: "灵活",
          features: ["先小额体验", "不用一开始准备太多余量"],
        },
        boost: {
          tier: "日常使用",
          name: "增强包",
          description:
            "到账 24 点数（20 基础点数 + 4 额外点数）。适合日常使用。",
          note: "推荐",
          features: ["适合稳定日常使用", "连续处理多个任务更从容"],
        },
        ultra: {
          tier: "高频任务",
          name: "超级包",
          description:
            "到账 128 点数（100 基础点数 + 28 额外点数）。适合批量任务与高频阶段。",
          note: "储备型",
          features: ["适合批量与长链路任务", "为高频阶段预留更多余量"],
        },
      },
    },
    downloads: {
      title: "选择当前最方便的入口",
      items: {
        web: {
          title: "网页版",
          subtitle: "对话式图形入口",
          description: "无需安装，打开浏览器即可开始。",
          action: "打开网页版",
        },
        desktop: {
          title: "桌面版",
          subtitle: "桌面应用",
          description: "适合长时间保持工作区，并连续处理复杂任务。",
          action: "下载桌面版",
        },
        ios: {
          title: "iOS",
          subtitle: "移动应用",
          description: "适合在移动设备上查看进展，并继续当前任务。",
          action: "打开 App Store",
        },
      },
    },
    footerCopyright: "Copyright © 2026 悟墨 AI.",
  },
  en: {
    brandLabel: "OOMOL AI",
    page: {
      title: "OOMOL AI - OOMOL's official GUI",
      description:
        "When you prefer a GUI, use OOMOL tools on web, desktop, and iOS for ongoing work, reviewing results, and keeping tasks moving.",
    },
    hero: {
      titleLine1: "OOMOL AI brings tool use",
      titleLine2: "into a visual workspace",
      lead: "OOMOL AI is the official GUI for using tools directly. It is better suited to ongoing conversations, reviewing results, and keeping work moving.",
      productScreenshotAlt:
        "OOMOL AI interface where the agent natively calls tools to complete a task",
    },
    actions: {
      openWeb: "Open Web App",
      downloadDesktop: "Download desktop app",
      ios: "iOS",
    },
    models: {
      title: "Better for everyday use",
      description:
        "Search, execution, results, and follow-up work all stay in one workspace.",
      demo: {
        title: "Keep the task moving in one workspace",
        description:
          "From searching for tools to reviewing results and continuing the work, you do not need to bounce between separate interfaces.",
        imageAlt:
          "OOMOL AI workspace showing native tool capabilities and mini apps",
      },
      cards: {
        chat: {
          eyebrow: "Continuous work",
          title: "Search, execution, and results stay in one interface",
          body: "Account connections, task runs, and ready-made tools all land in the current workspace instead of being scattered across extra steps.",
          chips: ["One workspace", "Ongoing work", "Use directly"],
        },
        image: {
          eyebrow: "Follow-up",
          title:
            "Better for reviewing results, asking follow-up questions, and continuing the work",
          body: "Once you have the result, you can refine the request, ask follow-up questions, or continue the next action without switching to another interface.",
          chips: ["Review result", "Ask follow-up", "Keep going"],
        },
      },
    },
    problems: {
      titleLine1: "When does a GUI",
      titleLine2: "feel more natural?",
      cards: [
        {
          title: "When you keep it open all day",
          body: "Compared with one-off command calls, a GUI is better suited to something you keep open and return to throughout the day.",
        },
        {
          title:
            "When you need to see the result before deciding the next step",
          body: "Images, documents, spreadsheets, and intermediate results are easier to follow when they stay in the current workspace.",
        },
        {
          title: "When you want less switching and more continuity",
          body: "If search, execution, and follow-up all stay in one workspace, tasks feel easier to carry forward.",
        },
      ] as ProblemCard[],
    },
    workflow: {
      steps: [
        {
          title: "State the goal, then start working",
          body: "You describe the task, and the interface handles the searching and execution from there.",
          detail:
            "It feels more like an everyday workspace than a string of commands.",
          alt: "OOMOL AI interface where the agent actively searches for and calls skills",
        },
        {
          title: "Once the result appears, keep going",
          body: "Review the output, refine the request, and continue from the same page.",
          detail:
            "It fits tasks where you need to see, edit, and continue in one flow.",
          alt: "OOMOL AI interface continuing a multi-step tool task",
        },
        {
          title: "Switch devices without switching mental modes",
          body: "Web, desktop, and iOS all let you continue the same work without learning a different interface.",
          detail: "Use whichever one is most convenient in the moment.",
          alt: "OOMOL AI interface connecting results back into the OOMOL toolchain",
        },
      ],
    },
    outputs: {
      title:
        "Terminals are great for integration. GUIs are better for ongoing use.",
      description:
        "Use oo-cli when you want tools connected into agents and terminal workflows. Open OOMOL AI when you want to use those same tools yourself in a visual workspace.",
      imageAlt:
        "OOMOL AI interface continuing work with the same tools in one workspace",
    },
    pricing: {
      title: "One credit system",
      description:
        "OOMOL AI and oo-cli use the same credits. You pay for actual usage, not separately for web, desktop, and iOS.",
      pillars: [
        "Web, desktop, and iOS share one account and one credit balance",
        "Purchased credits stay in your account until you use them",
        "Pack sizes cover light use through heavier ongoing work",
      ],
      summary: {
        eyebrow: "Shared billing",
        title: "You top up usage, not a specific app",
        description:
          "Whether a task starts from oo-cli or OOMOL AI, usage is counted the same way. Add more only when you need more headroom.",
        badge: "One credit system",
      },
      perPack: "/ pack",
      featureTitle: "Works well for",
      cta: "Top Up",
      note: "Purchased credits stay in your account until you use them. They do not reset monthly, and switching between entry points does not affect them.",
      packs: {
        starter: {
          tier: "Occasional use",
          name: "Starter Pack",
          description:
            "Includes 5 credits. A small refill for light use or occasional top-ups.",
          note: "Flexible",
          features: [
            "Useful for a small first balance",
            "No need to reserve too much upfront",
          ],
        },
        boost: {
          tier: "Daily use",
          name: "Boost Pack",
          description:
            "Includes 24 credits (20 base + 4 bonus). A better fit for regular day-to-day use.",
          note: "Popular",
          features: [
            "A stronger fit for steady daily use",
            "More comfortable when several tasks arrive in a row",
          ],
        },
        ultra: {
          tier: "Heavy use",
          name: "Ultra Pack",
          description:
            "Includes 128 credits (100 base + 28 bonus). Best for batch work and heavier periods.",
          note: "Reserve",
          features: [
            "Built for batch work and longer workflows",
            "Keeps more headroom available during heavier periods",
          ],
        },
      },
    },
    downloads: {
      title: "Open it in whichever app fits you best",
      items: {
        web: {
          title: "Web",
          subtitle: "Chat-based interface",
          description: "The fastest way to start using it.",
          action: "Open Web App",
        },
        desktop: {
          title: "Desktop",
          subtitle: "Desktop app",
          description:
            "Best when you want a more stable workspace for longer-running work.",
          action: "Download desktop app",
        },
        ios: {
          title: "iOS",
          subtitle: "Mobile app",
          description:
            "Track progress and continue the current task from your phone or tablet.",
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

function resolveAppDesktopDownloadUrl() {
  if (typeof navigator === "undefined") {
    return "";
  }

  const platformSignature = `${navigator.platform} ${navigator.userAgent}`;

  return /Win/i.test(platformSignature)
    ? APP_DESKTOP_DOWNLOAD_URLS.windows
    : APP_DESKTOP_DOWNLOAD_URLS.macos;
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
  const [shouldLoad, setShouldLoad] = useState(false);
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
      setShouldLoad(true);
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
          setShouldLoad(true);
          playVideo();
          return;
        }

        video.pause();
      },
      {
        rootMargin: "320px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.load();
    void video.play().catch(() => {});
  }, [shouldLoad, src]);

  return (
    <video
      ref={videoRef}
      className={className}
      aria-label={label}
      muted
      loop
      playsInline
      preload={shouldLoad ? "metadata" : "none"}
      controls={showControls}
      tabIndex={0}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onFocus={() => setShowControls(true)}
      onBlur={() => setShowControls(false)}
    >
      {shouldLoad ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
});

export default function AppPage() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const isZh = i18n.currentLocale === "zh-CN";
  const copy = isZh ? COPY.zh : COPY.en;

  const appWebHref = "https://app.oomol.com";
  const appStoreHref = "https://apps.apple.com/app/id6749377154";
  const rechargeHref = "https://console.oomol.com/billing/token-recharge";
  const [desktopDownloadHref, setDesktopDownloadHref] = useState<string>("");
  const pricingTitleLines = isZh
    ? splitZhTitleAtComma(copy.pricing.title)
    : [copy.pricing.title];

  const nativeWorkspacePng = useBaseUrl(
    "/img/pages/app/chat-login-agent-miniapps.webp"
  );
  const heroVideoSrc = useBaseUrl(getLocalizedVideoSrc(VIDEO_FILES.hero, isZh));
  const outputsVideoSrc = useBaseUrl(
    getLocalizedVideoSrc(VIDEO_FILES.outputs, isZh)
  );

  useEffect(() => {
    setDesktopDownloadHref(resolveAppDesktopDownloadUrl());
  }, []);

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
      videoSrc: useBaseUrl(getLocalizedVideoSrc(VIDEO_FILES.startFast, isZh)),
    },
    {
      ...copy.workflow.steps[1],
      videoSrc: useBaseUrl(getLocalizedVideoSrc(VIDEO_FILES.keepEditing, isZh)),
    },
    {
      ...copy.workflow.steps[2],
      videoSrc: useBaseUrl(
        getLocalizedVideoSrc(VIDEO_FILES.trustSources, isZh)
      ),
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
      href: desktopDownloadHref || undefined,
      external: true,
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
      <Head>
        <title>{copy.page.title}</title>
        <meta name="description" content={copy.page.description} />
      </Head>
      <main
        id="top"
        className={cx(styles.page, "oomol-landing-main", "oomol-app-page")}
      >
        <section className={styles.hero}>
          <div className={styles.heroHeader}>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleLine}>
                  {copy.hero.titleLine1}
                </span>
                <span className={styles.heroTitleLine}>
                  {copy.hero.titleLine2}
                </span>
              </h1>
              <p className={styles.heroLead}>{copy.hero.lead}</p>

              <div className={styles.heroActions}>
                <Button asChild size="lg">
                  <a
                    href={appWebHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe aria-hidden="true" />
                    <span>{copy.actions.openWeb}</span>
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href={desktopDownloadHref || undefined}
                    aria-disabled={!desktopDownloadHref}
                    onClick={event => {
                      if (!desktopDownloadHref) {
                        event.preventDefault();
                        return;
                      }

                      downloadStable(event, desktopDownloadHref);
                    }}
                  >
                    <Download aria-hidden="true" />
                    <span>{copy.actions.downloadDesktop}</span>
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href={appStoreHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Smartphone aria-hidden="true" />
                    <span>{copy.actions.ios}</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroVisualInner}>
              <figure className={styles.mediaFigure}>
                <div className={styles.heroFrame}>
                  <AutoPlayVideo
                    className={styles.heroScreenshot}
                    src={heroVideoSrc}
                    label={copy.hero.productScreenshotAlt}
                  />
                </div>
              </figure>
            </div>
          </div>
        </section>

        <section
          id="models"
          className={cx(styles.section, styles.sectionMuted)}
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
        </section>

        <section
          id="models-demo"
          className={styles.section}
          aria-labelledby="models-demo-heading"
        >
          <div className={styles.modelDemo}>
            <div className={styles.modelDemoCopy}>
              <h2 id="models-demo-heading" className={styles.modelDemoTitle}>
                {copy.models.demo.title}
              </h2>
              <p>{copy.models.demo.description}</p>
            </div>

            <figure
              className={cx(styles.mediaFigure, styles.modelDemoMediaFigure)}
            >
              <img
                src={nativeWorkspacePng}
                alt={copy.models.demo.imageAlt}
                className={styles.modelDemoImage}
                width={APP_MEDIA_INTRINSIC_SIZE.nativeWorkspace.width}
                height={APP_MEDIA_INTRINSIC_SIZE.nativeWorkspace.height}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section
          id="problems"
          className={cx(styles.section, styles.sectionMuted)}
        >
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

        <section id="workspace" className={styles.section}>
          <div className={styles.solutionList}>
            {workflowSteps.map(step => (
              <article key={step.title} className={styles.solutionItem}>
                <div className={styles.solutionMedia}>
                  <figure className={styles.mediaFigure}>
                    <AutoPlayVideo
                      className={styles.outputImage}
                      src={step.videoSrc}
                      label={step.alt}
                    />
                  </figure>
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
            <figure
              className={cx(styles.mediaFigure, styles.outputsShowcaseFigure)}
            >
              <div className={styles.outputsShowcaseFrame}>
                <AutoPlayVideo
                  className={styles.outputsShowcaseImage}
                  src={outputsVideoSrc}
                  label={copy.outputs.imageAlt}
                />
              </div>
            </figure>
          </div>
        </section>

        <section
          id="pricing"
          className={cx(styles.section, styles.sectionMuted)}
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

                <Button
                  asChild
                  variant={pack.featured ? "default" : "outline"}
                  className={styles.cardAction}
                >
                  <a
                    href={rechargeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{pack.cta}</span>
                  </a>
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section
          id="downloads"
          className={cx(
            styles.section,
            styles.sectionMuted,
            styles.sectionFlushBottom
          )}
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
                <Button
                  asChild
                  variant={item.kind === "web" ? "default" : "outline"}
                  className={styles.cardAction}
                >
                  <a
                    href={item.href}
                    onClick={
                      item.kind === "desktop"
                        ? event => {
                            if (!item.href) {
                              event.preventDefault();
                              return;
                            }

                            downloadStable(event, item.href);
                          }
                        : undefined
                    }
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    <span>{item.action}</span>
                  </a>
                </Button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
