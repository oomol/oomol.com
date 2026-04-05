import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
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

const COPY = {
  zh: {
    brandLabel: "悟墨 AI",
    hero: {
      titleLine1: "科学分析，",
      titleLine2: "清晰决策",
      lead: "悟墨 AI 是一款面向大学生、老师和科研工作者的智能体工具，专注于数据分析、论文出图等任务。",
      productScreenshotAlt: "悟墨 AI 产品界面截图",
    },
    actions: {
      openWeb: "打开网页版",
      downloadDesktop: "下载桌面版",
      ios: "iOS",
    },
    models: {
      title: "这些模型能力，打开就能用",
      description:
        "可以按任务切换聊天模型，也可以直接调用 nano-banana 系列生图能力，不需要自己另外找入口。",
      demo: {
        eyebrow: "能力演示",
        title:
          "GPT 的业务理解能力和 nano-banana 的生图能力，可以一起完成更贴近业务的图像结果",
        description:
          "下面这张演示图就是基于 GPT 对业务内容的理解，再结合 nano-banana 的画图能力共同生成的结果。",
        imageAlt: "基于 GPT 业务理解与 nano-banana 生图能力共同生成的演示图",
      },
      cards: {
        chat: {
          eyebrow: "聊天模型",
          title: "支持切换 OpenAI GPT-5.4 和 Qwen 3.5 Plus",
          body: "同一个产品里就能切换使用 OpenAI 的 GPT-5.4 或千问的 Qwen 3.5 Plus，按任务选择更合适的模型。",
          chips: ["OpenAI GPT-5.4", "Qwen 3.5 Plus"],
        },
        image: {
          eyebrow: "生图模型",
          title: "内置 nano-banana 各个系列生图能力",
          body: "支持 nano-banana、nano-banana-2 和 nano-banana-pro，覆盖从快速出图到更高质量生成的不同场景。",
          chips: ["nano-banana", "nano-banana-2", "nano-banana-pro"],
        },
      },
    },
    problems: {
      titleLine1: "用户最常遇到的",
      titleLine2: "三个问题",
      cards: [
        {
          title: "不想学一堆 AI，只想直接用",
          body: "很多人缺的不是能力，而是没时间先研究各种 AI 用法。",
        },
        {
          title: "图表能生成，后续难修改",
          body: "一旦要补标注、调版式或改局部细节，很多工具最后还是得从头再来。",
        },
        {
          title: "来源说不清，结果不敢信",
          body: "很多 AI 看起来答得很完整，但依据从哪里来、能不能核实说不清，用户自然不敢直接相信。",
        },
      ] as ProblemCard[],
    },
    workflow: {
      steps: [
        {
          title: "直接开做，不用先学 AI",
          body: "常见的数据分析和研究任务，直接说需求就能开始。",
          detail:
            "搜资料、做分析、整理结果，这些常用能力都已经内置好，不用自己配工具。",
          alt: "悟墨 AI 中可直接开始分析与研究任务的界面",
        },
        {
          title: "图表和插图，不满意还能接着改",
          body: "先出结果，再慢慢调。改标注、配色、版式，不用每次都从头来。",
          detail:
            "图表支持继续优化和重绘，论文插图也能局部修改，不用在几个工具之间来回折腾。",
          alt: "悟墨 AI 中可继续编辑的图表结果",
        },
        {
          title: "来源说得清，结果才敢用",
          body: "查到的数据、论文和资料，都会尽量把来源带上；写成报告时，也会把引用标出来。",
          detail:
            "不只是给你一个结论，而是把依据一并交代清楚，这样更容易核实，也更让人放心。",
          alt: "悟墨 AI 在结果中保留来源、依据与引用信息",
        },
      ],
    },
    outputs: {
      title: "不只是聊天，而是把任务交给悟墨 AI",
      description:
        "分析、出图、整理和交付，不必停在对话里。你可以直接把任务交给悟墨 AI，让它继续往下做。",
      imageAlt: "悟墨 AI 任务执行与工具界面展示",
    },
    pricing: {
      title: "积分包充值，按你的工作节奏来",
      description:
        "只在需要更多积分时再补就好。三档积分包分别适合偶尔补量、稳定使用和批量任务，购买后的积分会一直保留，不会过期。",
      pillars: [
        "需要更多积分时再补，不绑月付周期",
        "购买后的积分会一直保留，不会过期",
        "从临时补量到批量任务，都有对应档位",
      ],
      summary: {
        eyebrow: "按需充值",
        title: "先买一包放在账户里，什么时候要用什么时候用",
        description:
          "积分包适合灵活补充余额。任务多的时候再加，任务少的时候慢慢用，不必担心月底清零。",
        badge: "积分不会过期",
      },
      perPack: "/ 包",
      featureTitle: "适合这种使用方式",
      cta: "去充值",
      note: "积分包购买后会保留在账户里，不按月清零，也不会因为使用节奏慢而失效。",
      packs: {
        starter: {
          tier: "偶尔补量",
          name: "入门包",
          description:
            "到账 5 点数。适合偶尔跑任务时补一点余额，先继续做，不用一开始就买太多。",
          note: "灵活",
          features: [
            "偶尔补一点，就能把当前任务继续做完",
            "先小额补充，不必预估长期用量",
          ],
        },
        boost: {
          tier: "日常主力",
          name: "增强包",
          description:
            "到账 24 点数（20 基础点数 + 4 额外点数）。适合稳定使用的日常分析、出图和整理任务，一次补充更从容，连续几次任务也不容易中断。",
          note: "推荐",
          features: [
            "给稳定的日常工作节奏留出更舒服的余量",
            "连续做几次任务时，不容易因为余额不够被打断",
          ],
        },
        ultra: {
          tier: "高频任务",
          name: "超级包",
          description:
            "到账 128 点数（100 基础点数 + 28 额外点数）。适合批量处理、长流程和高频任务，先备一大包，进入重任务阶段时更稳，也更省心。",
          note: "储备型",
          features: [
            "更适合批量执行、长流程和阶段性的高强度使用",
            "先备好一笔大额储备，重任务推进起来更从容",
          ],
        },
      },
    },
    downloads: {
      title: "开始试试吧",
      items: {
        web: {
          title: "Web",
          subtitle: "最快开始",
          description: "直接打开网页版，用真实任务试一次。",
          action: "打开网页版",
        },
        desktop: {
          title: "Desktop",
          subtitle: "本地继续做",
          description: "下载桌面版，把分析、出图和整理放到本地环境里。",
          action: "下载桌面版",
        },
        ios: {
          title: "iOS",
          subtitle: "移动端查看",
          description: "在手机或平板上查看任务进度和结果。",
          action: "打开 App Store",
        },
      },
    },
    footerCopyright: "Copyright © 2026 悟墨 AI.",
  },
  en: {
    brandLabel: "OOMOL AI",
    hero: {
      titleLine1: "Scientific Analysis,",
      titleLine2: "Clear Decisions",
      lead: "OOMOL AI is an agentic tool for students, teachers, and researchers, focused on data analysis, paper figures, and similar work.",
      productScreenshotAlt: "OOMOL AI product interface screenshot",
    },
    actions: {
      openWeb: "Open Web App",
      downloadDesktop: "Download Desktop App",
      ios: "iOS",
    },
    models: {
      title: "Model access that is ready to use",
      description:
        "Switch chat models by task and use the nano-banana image generation lineup directly in the product, without hunting for separate entry points.",
      demo: {
        eyebrow: "Capability demo",
        title:
          "GPT-level business understanding and nano-banana image generation can work together to produce visuals that fit the task better",
        description:
          "The demo image below was generated by combining GPT's understanding of the business context with nano-banana's drawing capability.",
        imageAlt:
          "Demo image generated with GPT business understanding and nano-banana image generation",
      },
      cards: {
        chat: {
          eyebrow: "Chat models",
          title: "Switch between OpenAI GPT-5.4 and Qwen 3.5 Plus",
          body: "Use OpenAI GPT-5.4 or Qwen 3.5 Plus in the same product and choose the model that fits the task in front of you.",
          chips: ["OpenAI GPT-5.4", "Qwen 3.5 Plus"],
        },
        image: {
          eyebrow: "Image models",
          title: "Built-in nano-banana generation across the lineup",
          body: "Supports nano-banana, nano-banana-2, and nano-banana-pro for everything from quick first drafts to higher-quality image generation.",
          chips: ["nano-banana", "nano-banana-2", "nano-banana-pro"],
        },
      },
    },
    problems: {
      titleLine1: "The Three Problems",
      titleLine2: "Users Hit Most Often",
      cards: [
        {
          title: "I don't want to study AI first",
          body: "For many people, the real bottleneck is not ability. It is not having time to learn a stack of AI tools before they can start.",
        },
        {
          title: "Charts come out fast, but edits are hard",
          body: "Once you need labels, layout tweaks, or local figure edits, many tools still force you to start over.",
        },
        {
          title: "No clear sources, no confidence",
          body: "Many AI outputs look complete, but if the source is unclear and hard to verify, people do not want to trust them.",
        },
      ] as ProblemCard[],
    },
    workflow: {
      steps: [
        {
          title: "Start right away, without learning AI first",
          body: "For common analysis and research tasks, you can begin just by describing the job.",
          detail:
            "Searching, analysis, and result organization are already built in, so you do not need to assemble tools yourself.",
          alt: "OOMOL AI interface for starting analysis and research tasks directly",
        },
        {
          title: "Keep refining charts and figures after the first result",
          body: "Get a first draft, then keep improving labels, colors, and layout without restarting.",
          detail:
            "Charts can be refined and redrawn, and paper figures can be edited locally instead of bouncing across multiple tools.",
          alt: "Editable chart result in OOMOL AI",
        },
        {
          title: "You can trust results only when the sources are clear",
          body: "Data, papers, and references keep their sources whenever possible, and reports keep citations visible too.",
          detail:
            "It does not just hand you a conclusion. It also keeps the evidence nearby, which makes checking and using the result much safer.",
          alt: "OOMOL AI result view with sources, evidence, and citations",
        },
      ],
    },
    outputs: {
      title: "Not just chat. Hand the task to OOMOL AI.",
      description:
        "Analysis, figures, organization, and delivery should not stop at the conversation. Hand the task to OOMOL AI and let it continue.",
      imageAlt: "OOMOL AI task execution and tool interface",
    },
    pricing: {
      title: "Top up with credit packs on your schedule",
      description:
        "Add credits only when you need more. Three pack sizes cover occasional refills, steady day-to-day work, and heavier batch runs, and purchased credits stay in your account until you use them.",
      pillars: [
        "Top up only when you actually need more credits",
        "Purchased credits stay in your account and never expire",
        "Three pack sizes cover light refills through heavier runs",
      ],
      summary: {
        eyebrow: "Flexible top-up",
        title: "Keep a pack in your account and use it on your timeline",
        description:
          "Credit packs are built for flexible overflow usage. Add more when work spikes, and use the balance slowly when it does not. Nothing resets at the end of the month.",
        badge: "Credits never expire",
      },
      perPack: "/ pack",
      featureTitle: "Works well for",
      cta: "Top Up",
      note: "Purchased credit packs stay in your account until you use them. They do not reset monthly and do not expire.",
      packs: {
        starter: {
          tier: "Light refill",
          name: "Starter Pack",
          description:
            "Includes 5 credits. A small refill for the moments when you only need a bit more credit to keep moving.",
          note: "Flexible",
          features: [
            "Occasional top-ups when you only need a little more",
            "A low-commitment refill without planning long-term usage",
          ],
        },
        boost: {
          tier: "Daily work",
          name: "Boost Pack",
          description:
            "Includes 24 credits (20 base + 4 bonus). A practical refill for regular analysis, charting, and organization work, with enough room for several tasks in a row.",
          note: "Popular",
          features: [
            "A better fit for steady day-to-day work",
            "Extra headroom when several tasks land back to back",
          ],
        },
        ultra: {
          tier: "Heavy usage",
          name: "Ultra Pack",
          description:
            "Includes 128 credits (100 base + 28 bonus). A larger reserve for batch runs, longer workflows, and periods when you know the workload will stay high.",
          note: "Reserve",
          features: [
            "Built for batch runs, longer workflows, and heavier usage windows",
            "A larger reserve that helps intensive work keep moving",
          ],
        },
      },
    },
    downloads: {
      title: "Give it a try",
      items: {
        web: {
          title: "Web",
          subtitle: "Fastest start",
          description: "Open the web app and try it on a real task.",
          action: "Open Web App",
        },
        desktop: {
          title: "Desktop",
          subtitle: "Keep working locally",
          description:
            "Download the desktop app to keep analysis, charting, and organization in your local environment.",
          action: "Download Desktop App",
        },
        ios: {
          title: "iOS",
          subtitle: "Check on mobile",
          description:
            "Track task progress and view results on your phone or tablet.",
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

  const catPng = useBaseUrl("/img/pages/app/cat.png");
  const nanoBananaPng = useBaseUrl("/img/pages/app/nano-banana.png");

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
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>
              {copy.hero.titleLine1}
              <span>{copy.hero.titleLine2}</span>
            </h1>
            <p className={styles.heroLead}>{copy.hero.lead}</p>

            <div className={styles.heroActions}>
              <a
                className={clsx(
                  styles.heroActionButton,
                  styles.heroActionButtonPrimary
                )}
                href={appWebHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{copy.actions.openWeb}</span>
              </a>
              <a className={styles.heroActionButton} href={downloadsHref}>
                <span>{copy.actions.downloadDesktop}</span>
              </a>
              <a
                className={styles.heroActionButton}
                href={appStoreHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{copy.actions.ios}</span>
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <AutoPlayVideo
              className={styles.heroScreenshot}
              src={getLocalizedVideoSrc(VIDEO_FILES.hero, isZh)}
              label={copy.hero.productScreenshotAlt}
            />
          </div>
        </section>

        <section
          id="models"
          className={clsx(styles.section, styles.modelsSection)}
        >
          <div className={clsx(styles.sectionIntro, styles.modelsIntro)}>
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
                src={nanoBananaPng}
                alt={copy.models.demo.imageAlt}
                className={styles.modelDemoImage}
              />
            </div>
          </div>
        </section>

        <section id="problems" className={styles.section}>
          <div className={clsx(styles.sectionIntro, styles.problemsIntro)}>
            <h2 className={styles.problemsTitle}>
              {copy.problems.titleLine1}
              <br />
              {copy.problems.titleLine2}
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
          className={clsx(styles.section, styles.workspaceSection)}
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
          <div className={clsx(styles.sectionIntro, styles.outputsIntro)}>
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
          className={clsx(styles.section, styles.pricingSection)}
        >
          <div className={clsx(styles.sectionIntro, styles.pricingIntro)}>
            <h2>{copy.pricing.title}</h2>
            <p>{copy.pricing.description}</p>
          </div>

          <div className={styles.pricingPillars}>
            {copy.pricing.pillars.map(pillar => (
              <div key={pillar} className={styles.pricingPillar}>
                {pillar}
              </div>
            ))}
          </div>

          <div className={styles.pricingSummary}>
            <div className={styles.pricingSummaryCopy}>
              <p className={styles.pricingSummaryEyebrow}>
                {copy.pricing.summary.eyebrow}
              </p>
              <h3>{copy.pricing.summary.title}</h3>
              <p className={styles.pricingSummaryDescription}>
                {copy.pricing.summary.description}
              </p>
            </div>
            <span className={styles.pricingSummaryBadge}>
              {copy.pricing.summary.badge}
            </span>
          </div>

          <div className={styles.pricingGrid}>
            {creditPacks.map(pack => (
              <article
                key={pack.name}
                className={clsx(
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
                    <span className={styles.planBadge}>{pack.note}</span>
                  </div>

                  <div className={styles.planPriceRow}>
                    <strong>{formatPackPrice(pack.price)}</strong>
                    <span>{copy.pricing.perPack}</span>
                  </div>

                  <p className={styles.planDescription}>{pack.description}</p>
                </div>

                <div className={styles.pricingFeatureBlock}>
                  <p className={styles.pricingFeatureTitle}>
                    {pack.featureTitle}
                  </p>
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
                  className={clsx(
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

          <div className={styles.pricingNote}>
            <p>{copy.pricing.note}</p>
          </div>
        </section>

        <section
          id="downloads"
          className={clsx(styles.section, styles.entrySection)}
        >
          <div className={clsx(styles.sectionIntro, styles.downloadsIntro)}>
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
                  className={clsx(
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
