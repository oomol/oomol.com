import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
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

type AppCopy = {
  page: {
    title: string;
    description: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    lead: string;
    productScreenshotAlt: string;
  };
  actions: {
    openWeb: string;
    downloadDesktop: string;
    ios: string;
  };
  models: {
    title: string;
    description: string;
    demo: {
      title: string;
      description: string;
      imageAlt: string;
    };
    cards: {
      chat: ModelFeatureCard;
      image: ModelFeatureCard;
    };
  };
  problems: {
    titleLine1: string;
    titleLine2: string;
    cards: ProblemCard[];
  };
  workflow: {
    steps: Array<Omit<WorkflowStep, "videoSrc">>;
  };
  outputs: {
    title: string;
    description: string;
    imageAlt: string;
  };
  pricing: {
    title: string;
    description: string;
    perPack: string;
    featureTitle: string;
    cta: string;
    packs: {
      starter: Omit<PricingPack, "price" | "featureTitle" | "cta" | "featured">;
      boost: Omit<PricingPack, "price" | "featureTitle" | "cta" | "featured">;
      ultra: Omit<PricingPack, "price" | "featureTitle" | "cta" | "featured">;
    };
  };
  downloads: {
    title: string;
    items: {
      web: Omit<DownloadItem, "href" | "external" | "kind">;
      desktop: Omit<DownloadItem, "href" | "external" | "kind">;
      ios: Omit<DownloadItem, "href" | "external" | "kind">;
    };
  };
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

function createAppCopy(): AppCopy {
  return {
    page: {
      title: translate({
        id: "APP.page.title",
        message: "OOMOL AI - Use OOMOL tools in a visual workspace",
      }),
      description: translate({
        id: "APP.page.description",
        message:
          "Use connected OOMOL tools in a conversational GUI across web, desktop, and iOS. Review results, ask follow-up questions, and keep tasks moving across devices.",
      }),
    },
    hero: {
      titleLine1: translate({
        id: "APP.hero.titleLine1",
        message: "Keep using OOMOL tools",
      }),
      titleLine2: translate({
        id: "APP.hero.titleLine2",
        message: "in a visual workspace",
      }),
      lead: translate({
        id: "APP.hero.lead",
        message:
          "Use OOMOL AI on web, desktop, and iOS to start tasks through chat, review results, and decide what to do next. If your accounts, tools, and services are already connected, those capabilities are ready to use in the GUI.",
      }),
      productScreenshotAlt: translate({
        id: "APP.hero.productScreenshotAlt",
        message:
          "OOMOL AI interface where a task is completed through chat and tool use",
      }),
    },
    actions: {
      openWeb: translate({
        id: "APP.actions.openWeb",
        message: "Open Web App",
      }),
      downloadDesktop: translate({
        id: "APP.actions.downloadDesktop",
        message: "Download desktop app",
      }),
      ios: translate({ id: "APP.actions.ios", message: "iOS" }),
    },
    models: {
      title: translate({
        id: "APP.models.title",
        message:
          "Start the task, review the result, and keep going in one place",
      }),
      description: translate({
        id: "APP.models.description",
        message:
          "Connected accounts, tool calls, task results, and follow-up questions stay in the same visual workspace. You can review the output first, then decide how to refine, ask, or continue.",
      }),
      demo: {
        title: translate({
          id: "APP.models.demo.title",
          message: "No need to start over in another entry point",
        }),
        description: translate({
          id: "APP.models.demo.description",
          message:
            "Open OOMOL AI and continue reviewing, asking, and working around the same task.",
        }),
        imageAlt: translate({
          id: "APP.models.demo.imageAlt",
          message: "OOMOL AI workspace showing tool capabilities and mini apps",
        }),
      },
      cards: {
        chat: {
          eyebrow: translate({
            id: "APP.models.cards.chat.eyebrow",
            message: "Chat workspace",
          }),
          title: translate({
            id: "APP.models.cards.chat.title",
            message: "Describe the goal, then move the task forward",
          }),
          body: translate({
            id: "APP.models.cards.chat.body",
            message:
              "Say what you want to get done in natural language. Results and next actions stay on the page, so it is easy to keep going.",
          }),
          chips: [
            translate({
              id: "APP.models.cards.chat.chip1",
              message: "Start in chat",
            }),
            translate({
              id: "APP.models.cards.chat.chip2",
              message: "Keep results",
            }),
            translate({
              id: "APP.models.cards.chat.chip3",
              message: "Continue work",
            }),
          ],
        },
        image: {
          eyebrow: translate({
            id: "APP.models.cards.image.eyebrow",
            message: "Result review",
          }),
          title: translate({
            id: "APP.models.cards.image.title",
            message: "See the output clearly before choosing the next step",
          }),
          body: translate({
            id: "APP.models.cards.image.body",
            message:
              "Images, documents, spreadsheets, and intermediate results are easier to review on the page before you refine the request or continue.",
          }),
          chips: [
            translate({
              id: "APP.models.cards.image.chip1",
              message: "Preview results",
            }),
            translate({
              id: "APP.models.cards.image.chip2",
              message: "Refine request",
            }),
            translate({
              id: "APP.models.cards.image.chip3",
              message: "Iterate",
            }),
          ],
        },
      },
    },
    problems: {
      titleLine1: translate({
        id: "APP.problems.titleLine1",
        message: "When should you",
      }),
      titleLine2: translate({
        id: "APP.problems.titleLine2",
        message: "open OOMOL AI?",
      }),
      cards: [
        {
          title: translate({
            id: "APP.problems.cards.review.title",
            message: "When you need to review the result before continuing",
          }),
          body: translate({
            id: "APP.problems.cards.review.body",
            message:
              "Images, documents, spreadsheets, long text, and intermediate outputs are easier to inspect in a GUI. Once the result looks right, you can add more context and continue.",
          }),
        },
        {
          title: translate({
            id: "APP.problems.cards.iterate.title",
            message: "When the task takes more than one pass",
          }),
          body: translate({
            id: "APP.problems.cards.iterate.body",
            message:
              "Many tasks need several rounds: generate a first version, revise it, ask follow-up questions, and add constraints. OOMOL AI is built for that kind of continued work.",
          }),
        },
        {
          title: translate({
            id: "APP.problems.cards.devices.title",
            message: "When you want to continue across devices",
          }),
          body: translate({
            id: "APP.problems.cards.devices.body",
            message:
              "Handle complex work on desktop, open it quickly in a browser, or check progress from your iPhone. The entry point changes, but the OOMOL capabilities stay the same.",
          }),
        },
      ],
    },
    workflow: {
      steps: [
        {
          title: translate({
            id: "APP.workflow.steps.describe.title",
            message: "Say what you want to get done",
          }),
          body: translate({
            id: "APP.workflow.steps.describe.body",
            message:
              "Describe the goal in natural language, and OOMOL AI helps move the task forward in the current conversation.",
          }),
          detail: translate({
            id: "APP.workflow.steps.describe.detail",
            message:
              "Useful when you do not want to move every step back into the terminal.",
          }),
          alt: translate({
            id: "APP.workflow.steps.describe.alt",
            message: "OOMOL AI interface where a task starts from chat",
          }),
        },
        {
          title: translate({
            id: "APP.workflow.steps.review.title",
            message: "Review the result, then choose the next step",
          }),
          body: translate({
            id: "APP.workflow.steps.review.body",
            message:
              "Results stay on the page, so you can ask follow-up questions, change the request, or continue the task.",
          }),
          detail: translate({
            id: "APP.workflow.steps.review.detail",
            message:
              "A better fit for work that moves forward through review and iteration.",
          }),
          alt: translate({
            id: "APP.workflow.steps.review.alt",
            message: "OOMOL AI interface continuing a multi-step tool task",
          }),
        },
        {
          title: translate({
            id: "APP.workflow.steps.devices.title",
            message: "Switch devices and keep the task in view",
          }),
          body: translate({
            id: "APP.workflow.steps.devices.body",
            message:
              "Use it on web, desktop, or iOS when the same task needs attention in different settings.",
          }),
          detail: translate({
            id: "APP.workflow.steps.devices.detail",
            message:
              "Work through complex tasks at your desk, then check progress later from another device.",
          }),
          alt: translate({
            id: "APP.workflow.steps.devices.alt",
            message:
              "OOMOL AI interface continuing work with the same OOMOL capabilities",
          }),
        },
      ],
    },
    outputs: {
      title: translate({
        id: "APP.outputs.title",
        message: "Run fast in the terminal. Review clearly in the GUI.",
      }),
      description: translate({
        id: "APP.outputs.description",
        message:
          "oo-cli is a strong fit for searching, inspecting, and running tools from the terminal and agent workflows. OOMOL AI is for the moments when you need result previews, follow-up conversation, and continuity across devices while using the same capabilities.",
      }),
      imageAlt: translate({
        id: "APP.outputs.imageAlt",
        message:
          "OOMOL AI interface continuing work with the same tools in one workspace",
      }),
    },
    pricing: {
      title: translate({
        id: "APP.pricing.title",
        message: "One account, one credit system",
      }),
      description: translate({
        id: "APP.pricing.description",
        message:
          "OOMOL AI and oo-cli share the same account and credits. Whether a task starts from the terminal, web, desktop, or iOS, usage is counted the same way, so you do not need to top up each entry point separately.",
      }),
      perPack: translate({ id: "APP.pricing.perPack", message: "/ pack" }),
      featureTitle: translate({
        id: "APP.pricing.featureTitle",
        message: "Works well for",
      }),
      cta: translate({ id: "APP.pricing.cta", message: "Top Up" }),
      packs: {
        starter: {
          tier: translate({
            id: "APP.pricing.packs.starter.tier",
            message: "Occasional use",
          }),
          name: translate({
            id: "APP.pricing.packs.starter.name",
            message: "Starter Pack",
          }),
          description: translate({
            id: "APP.pricing.packs.starter.description",
            message:
              "Includes 5 credits. A small refill for light use or occasional top-ups.",
          }),
          note: translate({
            id: "APP.pricing.packs.starter.note",
            message: "Flexible",
          }),
          features: [
            translate({
              id: "APP.pricing.packs.starter.feature1",
              message: "Useful for a small first balance",
            }),
            translate({
              id: "APP.pricing.packs.starter.feature2",
              message: "No need to reserve too much upfront",
            }),
          ],
        },
        boost: {
          tier: translate({
            id: "APP.pricing.packs.boost.tier",
            message: "Daily use",
          }),
          name: translate({
            id: "APP.pricing.packs.boost.name",
            message: "Boost Pack",
          }),
          description: translate({
            id: "APP.pricing.packs.boost.description",
            message:
              "Includes 24 credits (20 base + 4 bonus). A better fit for regular day-to-day use.",
          }),
          note: translate({
            id: "APP.pricing.packs.boost.note",
            message: "Popular",
          }),
          features: [
            translate({
              id: "APP.pricing.packs.boost.feature1",
              message: "A stronger fit for steady daily use",
            }),
            translate({
              id: "APP.pricing.packs.boost.feature2",
              message: "More comfortable when several tasks arrive in a row",
            }),
          ],
        },
        ultra: {
          tier: translate({
            id: "APP.pricing.packs.ultra.tier",
            message: "Heavy use",
          }),
          name: translate({
            id: "APP.pricing.packs.ultra.name",
            message: "Ultra Pack",
          }),
          description: translate({
            id: "APP.pricing.packs.ultra.description",
            message:
              "Includes 128 credits (100 base + 28 bonus). Best for batch work and heavier periods.",
          }),
          note: translate({
            id: "APP.pricing.packs.ultra.note",
            message: "Reserve",
          }),
          features: [
            translate({
              id: "APP.pricing.packs.ultra.feature1",
              message: "Built for batch work and longer workflows",
            }),
            translate({
              id: "APP.pricing.packs.ultra.feature2",
              message: "Keeps more headroom available during heavier periods",
            }),
          ],
        },
      },
    },
    downloads: {
      title: translate({
        id: "APP.downloads.title",
        message: "Open it on the device you need",
      }),
      items: {
        web: {
          title: translate({
            id: "APP.downloads.items.web.title",
            message: "Web",
          }),
          subtitle: translate({
            id: "APP.downloads.items.web.subtitle",
            message: "Chat-based interface",
          }),
          description: translate({
            id: "APP.downloads.items.web.description",
            message:
              "Start in the browser without installing anything, then review and continue your task.",
          }),
          action: translate({
            id: "APP.downloads.items.web.action",
            message: "Open Web App",
          }),
        },
        desktop: {
          title: translate({
            id: "APP.downloads.items.desktop.title",
            message: "Desktop",
          }),
          subtitle: translate({
            id: "APP.downloads.items.desktop.subtitle",
            message: "Desktop app",
          }),
          description: translate({
            id: "APP.downloads.items.desktop.description",
            message:
              "Best when you want to keep a workspace open for longer or more complex tasks.",
          }),
          action: translate({
            id: "APP.downloads.items.desktop.action",
            message: "Download desktop app",
          }),
        },
        ios: {
          title: translate({
            id: "APP.downloads.items.ios.title",
            message: "iOS",
          }),
          subtitle: translate({
            id: "APP.downloads.items.ios.subtitle",
            message: "Mobile app",
          }),
          description: translate({
            id: "APP.downloads.items.ios.description",
            message:
              "Track progress and continue the current task from your phone or tablet.",
          }),
          action: translate({
            id: "APP.downloads.items.ios.action",
            message: "Open App Store",
          }),
        },
      },
    },
  };
}

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
  const copy = createAppCopy();

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
