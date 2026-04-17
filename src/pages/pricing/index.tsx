import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { DownloadButton } from "@site/src/components/DownloadButton";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import { Alert, AlertDescription } from "@site/src/components/ui/alert";
import { Button } from "@site/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@site/src/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@site/src/components/ui/tabs";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

type PricingColumn<T> = {
  key: string;
  title: React.ReactNode;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  width?: number | string;
};

import Layout from "../../theme/Layout";

const LLM_PRICING_ENDPOINT =
  "https://console-server.oomol.com/api/models/models_with_config";
const SUBSCRIPTION_BILLING_URL = "https://console.oomol.com/billing/recharge";

type PricingTableKey = "llm" | "cloud-task" | "fusion-api";

interface LLMModelConfig {
  model_name: string;
  model_display_name: string;
  channel_name: string;
  input_ratio: number;
  output_ratio: number;
  ratio: number;
}

interface LLMPricingResponse {
  success: boolean;
  message: string;
  data: LLMModelConfig[];
}

interface PricingRowBase {
  key: string;
}

interface LLMPricingRow extends PricingRowBase {
  channel: string;
  model: string;
  modelDisplayName?: string;
  inputPrice: string;
  cachePrice: string;
  outputPrice: string;
}

interface CloudTaskPricingRow extends PricingRowBase {
  service: string;
  price: string;
  note: string;
}

interface FusionApiPricingRow extends PricingRowBase {
  service: string;
  price: string | string[];
  description: string;
}

function tPricing(id: string, message: string) {
  return translate({ id, message });
}

function IdentifierBadge({ children }: { children: React.ReactNode }) {
  return <span className={styles.identifierBadge}>{children}</span>;
}

function PriceValue({
  children,
  multiline = false,
}: {
  children: string;
  multiline?: boolean;
}) {
  return (
    <div className={multiline ? styles.multilinePriceValue : styles.priceValue}>
      {children}
    </div>
  );
}

function formatPricingValue(value: number) {
  if (Number.isInteger(value)) {
    return String(value);
  }

  return value.toString();
}

function renderIdentifierBadge(value: string) {
  return <IdentifierBadge>{value}</IdentifierBadge>;
}

function renderSinglePriceValue(value: string) {
  return <PriceValue>{value}</PriceValue>;
}

function renderMultiLinePriceValue(value: string | string[]) {
  const normalizedValue = Array.isArray(value) ? value.join("\n") : value;
  return (
    <PriceValue multiline={Array.isArray(value)}>{normalizedValue}</PriceValue>
  );
}

function buildLLMPricingRows(data: LLMModelConfig[]) {
  return [...data]
    .sort(
      (left, right) =>
        left.channel_name.localeCompare(right.channel_name) ||
        left.model_name.localeCompare(right.model_name)
    )
    .map(item => ({
      key: `${item.channel_name}-${item.model_name}`,
      channel: item.channel_name,
      model: item.model_name,
      modelDisplayName: item.model_display_name || undefined,
      inputPrice: formatPricingValue(item.input_ratio),
      cachePrice: formatPricingValue(item.ratio),
      outputPrice: formatPricingValue(item.output_ratio),
    }));
}

function PriceTable<T extends PricingRowBase>({
  columns,
  rows,
  emptyState,
  loading = false,
}: {
  columns: PricingColumn<T>[];
  rows: T[];
  emptyState: string;
  loading?: boolean;
}) {
  return (
    <div className={styles.tableWrap}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead
                key={column.key}
                style={
                  column.width
                    ? {
                        width:
                          typeof column.width === "number"
                            ? `${column.width}px`
                            : column.width,
                      }
                    : undefined
                }
              >
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className={styles.emptyCell}
              >
                <Loader2 className="inline size-4 animate-spin mr-2 align-[-3px]" />
                Loading…
              </TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className={styles.emptyCell}
              >
                {emptyState}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <TableRow key={row.key}>
                {columns.map(column => {
                  const raw = column.dataIndex
                    ? (row as unknown as Record<string, unknown>)[
                        column.dataIndex as string
                      ]
                    : undefined;
                  const cellContent = column.render
                    ? column.render(raw, row, rowIndex)
                    : (raw as React.ReactNode);

                  return (
                    <TableCell key={column.key}>{cellContent}</TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default function Index() {
  const { i18n } = useDocusaurusContext() as unknown as DocusaurusContext & {
    i18n: { currentLocale: string };
  };
  const isZh = i18n.currentLocale === "zh-CN";
  const [activePricingTable, setActivePricingTable] =
    useState<PricingTableKey>("llm");
  const [llmRows, setLlmRows] = useState<LLMPricingRow[]>([]);
  const [isLLMLoading, setIsLLMLoading] = useState(true);
  const [llmLoadFailed, setLlmLoadFailed] = useState(false);
  const freeFeatures = [
    "PRICING.subscription.free.feature1",
    "PRICING.subscription.free.feature2",
    "PRICING.subscription.free.feature4",
    "PRICING.subscription.free.feature6",
  ];
  const freeMoreFeatures = [
    "PRICING.subscription.free.feature3",
    "PRICING.subscription.free.feature5",
  ];
  const proFeatures = [
    "PRICING.subscription.pro.feature1",
    "PRICING.subscription.pro.feature2",
    "PRICING.subscription.pro.feature3",
    "PRICING.subscription.pro.feature6",
  ];
  const proMoreFeatures = [
    "PRICING.subscription.pro.feature4",
    "PRICING.subscription.pro.feature5",
  ];
  const maxFeatures = [
    "PRICING.subscription.max.feature1",
    "PRICING.subscription.max.feature2",
    "PRICING.subscription.max.feature3",
    "PRICING.subscription.max.feature6",
  ];
  const maxMoreFeatures = [
    "PRICING.subscription.max.feature4",
    "PRICING.subscription.max.feature5",
  ];
  const freeHighlights = [
    "PRICING.subscription.free.highlight1",
    "PRICING.subscription.free.highlight2",
  ];
  const proHighlights = [
    "PRICING.subscription.pro.highlight1",
    "PRICING.subscription.pro.highlight2",
  ];
  const maxHighlights = [
    "PRICING.subscription.max.highlight1",
    "PRICING.subscription.max.highlight2",
  ];
  const paidPlanCtaLabel = tPricing(
    "PRICING.subscription.subscribe",
    "Subscribe"
  );
  const pageCopy = isZh
    ? {
        title: "价格 - OOMOL",
        description:
          "本地构建与验证始终免费。Free 用户每月还可直接使用 200 分钟 Cloud Task；超额后再充值或升级，OOMOL 提供的模型与服务按点数结算。",
      }
    : {
        title: "Pricing - OOMOL",
        description:
          "Local building and validation stay free. Free users also get 200 Cloud Task minutes every month, then top up or upgrade only after that included usage runs out. OOMOL-provided models and services use credits.",
      };

  useEffect(() => {
    let cancelled = false;

    async function loadLLMPricing() {
      setIsLLMLoading(true);
      setLlmLoadFailed(false);

      try {
        const response = await fetch(LLM_PRICING_ENDPOINT);
        if (!response.ok) {
          throw new Error(`Failed to fetch LLM pricing: ${response.status}`);
        }

        const result: LLMPricingResponse = await response.json();
        if (!result.success) {
          throw new Error(result.message || "Failed to fetch LLM pricing");
        }

        const rows = buildLLMPricingRows(result.data);

        if (!cancelled) {
          setLlmRows(rows);
        }
      } catch {
        if (!cancelled) {
          setLlmLoadFailed(true);
        }
      } finally {
        if (!cancelled) {
          setIsLLMLoading(false);
        }
      }
    }

    void loadLLMPricing();

    return () => {
      cancelled = true;
    };
  }, []);

  const llmColumns: PricingColumn<LLMPricingRow>[] = [
    {
      dataIndex: "channel",
      key: "channel",
      render: renderIdentifierBadge,
      title: tPricing("PRICING.tables.llm.channel", "Channel"),
      width: 180,
    },
    {
      dataIndex: "model",
      key: "model",
      render: (_, record) => (
        <div className={styles.modelCell}>
          <span className={styles.modelName}>{record.model}</span>
          {record.modelDisplayName ? (
            <span className={styles.modelAlias}>{record.modelDisplayName}</span>
          ) : null}
        </div>
      ),
      title: tPricing("PRICING.tables.llm.model", "Model"),
      width: 260,
    },
    {
      dataIndex: "inputPrice",
      key: "inputPrice",
      render: renderSinglePriceValue,
      title: `${tPricing("PRICING.tables.llm.inputPrice", "Input Price")} (${tPricing("PRICING.tables.llm.unit", "Credits/M Token")})`,
      width: 180,
    },
    {
      dataIndex: "cachePrice",
      key: "cachePrice",
      render: renderSinglePriceValue,
      title: `${tPricing("PRICING.tables.llm.cachePrice", "Cache Price")} (${tPricing("PRICING.tables.llm.unit", "Credits/M Token")})`,
      width: 180,
    },
    {
      dataIndex: "outputPrice",
      key: "outputPrice",
      render: renderSinglePriceValue,
      title: `${tPricing("PRICING.tables.llm.outputPrice", "Output Price")} (${tPricing("PRICING.tables.llm.unit", "Credits/M Token")})`,
      width: 180,
    },
  ];

  const cloudTaskColumns: PricingColumn<CloudTaskPricingRow>[] = [
    {
      dataIndex: "service",
      key: "service",
      render: renderIdentifierBadge,
      title: tPricing("PRICING.tables.cloudTask.service", "Service"),
      width: 260,
    },
    {
      dataIndex: "price",
      key: "price",
      render: renderSinglePriceValue,
      title: tPricing(
        "PRICING.tables.cloudTask.price",
        "Price (Credits/Minute)"
      ),
      width: 220,
    },
    {
      dataIndex: "note",
      key: "note",
      title: tPricing("PRICING.tables.cloudTask.remark", "Note"),
    },
  ];

  const cloudTaskRows: CloudTaskPricingRow[] = [
    {
      key: "cloud-task",
      service: "Cloud Task",
      price: "0.01",
      note: tPricing(
        "PRICING.tables.cloudTask.noteText",
        "Anything under one minute is billed as one minute"
      ),
    },
  ];

  const unitImage = tPricing("PRICING.tables.fusionApi.unit.image", "Image");
  const unitSecond = tPricing("PRICING.tables.fusionApi.unit.second", "Second");
  const unitMToken = tPricing(
    "PRICING.tables.fusionApi.unit.mToken",
    "M Token"
  );
  const unitTenThousandChars = tPricing(
    "PRICING.tables.fusionApi.unit.tenThousandChars",
    "10K Characters"
  );
  const unitHour = tPricing("PRICING.tables.fusionApi.unit.hour", "Hour");

  const fusionApiColumns: PricingColumn<FusionApiPricingRow>[] = [
    {
      dataIndex: "service",
      key: "service",
      render: renderIdentifierBadge,
      title: tPricing("PRICING.tables.fusionApi.service", "Service"),
      width: 260,
    },
    {
      dataIndex: "price",
      key: "price",
      render: renderMultiLinePriceValue,
      title: tPricing("PRICING.tables.fusionApi.price", "Price (Credits)"),
      width: 340,
    },
    {
      dataIndex: "description",
      key: "description",
      title: tPricing("PRICING.tables.fusionApi.description", "Description"),
    },
  ];

  const fusionApiRows: FusionApiPricingRow[] = [
    {
      key: "fal-nano-banana",
      service: "fal-nano-banana",
      price: `0.047 / ${unitImage}`,
      description: tPricing(
        "PRICING.tables.fusionApi.description.nanoBanana",
        "Nano Banana image generation or editing"
      ),
    },
    {
      key: "fal-nano-banana-pro",
      service: "fal-nano-banana-pro",
      price: `0.18 / ${unitImage}`,
      description: tPricing(
        "PRICING.tables.fusionApi.description.nanoBananaPro",
        "Nano Banana Pro image generation or editing"
      ),
    },
    {
      key: "wanx-kf2v-video",
      service: "wanx-kf2v-video",
      price: [
        `wan2.2-kf2v-flash 480p: 0.017 / ${unitSecond}`,
        `wan2.2-kf2v-flash 720p: 0.034 / ${unitSecond}`,
        `wan2.2-kf2v-flash 1080p: 0.085 / ${unitSecond}`,
        `wanx2.1-kf2v-plus 720p: 0.119 / ${unitSecond}`,
      ],
      description: tPricing(
        "PRICING.tables.fusionApi.description.wanxKf2v",
        "Wanx keyframe to video"
      ),
    },
    {
      key: "fal-sora2-text-to-video",
      service: "fal-sora2-text-to-video",
      price: [`720p: 0.36 / ${unitSecond}`, `1080p: 0.6 / ${unitSecond}`],
      description: tPricing(
        "PRICING.tables.fusionApi.description.soraTextToVideo",
        "Sora2 text to video"
      ),
    },
    {
      key: "fal-sora2-image-to-video",
      service: "fal-sora2-image-to-video",
      price: [`720p: 0.36 / ${unitSecond}`, `1080p: 0.6 / ${unitSecond}`],
      description: tPricing(
        "PRICING.tables.fusionApi.description.soraImageToVideo",
        "Sora2 image to video"
      ),
    },
    {
      key: "wanx-image",
      service: "wanx-image",
      price: `0.035 / ${unitImage}`,
      description: tPricing(
        "PRICING.tables.fusionApi.description.wanxImage",
        "Wanx image generation or editing"
      ),
    },
    {
      key: "tinify-png-shrink",
      service: "tinify-png-shrink",
      price: `0.009 / ${unitImage}`,
      description: tPricing(
        "PRICING.tables.fusionApi.description.imageCompress",
        "Image compression"
      ),
    },
    {
      key: "qwen-mt-image",
      service: "qwen-mt-image",
      price: `0.0005 / ${unitImage}`,
      description: tPricing(
        "PRICING.tables.fusionApi.description.qwenImageTranslate",
        "Qwen image translation"
      ),
    },
    {
      key: "qwen-image-edit-plus",
      service: "qwen-image-edit-plus",
      price: `0.017 / ${unitImage}`,
      description: tPricing(
        "PRICING.tables.fusionApi.description.qwenImageEdit",
        "Qwen image editing"
      ),
    },
    {
      key: "jina-reader",
      service: "jina-reader",
      price: [`search: 0.05 / ${unitMToken}`, `read: 0.05 / ${unitMToken}`],
      description: "Jina Reader",
    },
    {
      key: "fal-remove-background",
      service: "fal-remove-background",
      price: `0.021 / ${unitImage}`,
      description: tPricing(
        "PRICING.tables.fusionApi.description.removeBackground",
        "Background removal"
      ),
    },
    {
      key: "fal-flux-pro-kontext",
      service: "fal-flux-pro-kontext",
      price: `0.048 / ${unitImage}`,
      description: tPricing(
        "PRICING.tables.fusionApi.description.kontextImageEdit",
        "Kontext image editing"
      ),
    },
    {
      key: "fal-aura-sr",
      service: "fal-aura-sr",
      price: `0.0012 / ${unitImage}`,
      description: tPricing(
        "PRICING.tables.fusionApi.description.qualityEnhance",
        "Quality enhancement"
      ),
    },
    {
      key: "doubao-text-to-image-seedream",
      service: "doubao-text-to-image-seedream",
      price: `0.043 / ${unitImage}`,
      description: tPricing(
        "PRICING.tables.fusionApi.description.doubaoTextToImage",
        "Doubao text to image"
      ),
    },
    {
      key: "doubao-tts",
      service: "doubao-tts",
      price: `0.77 / ${unitTenThousandChars}`,
      description: tPricing(
        "PRICING.tables.fusionApi.description.doubaoTts",
        "Doubao text to speech"
      ),
    },
    {
      key: "doubao-stt",
      service: "doubao-stt",
      price: `0.34 / ${unitHour}`,
      description: tPricing(
        "PRICING.tables.fusionApi.description.doubaoStt",
        "Doubao speech to text"
      ),
    },
  ];

  const tableTabs = [
    {
      key: "llm" as const,
      label: tPricing("PRICING.tables.tab.llm", "LLM Pricing"),
    },
    {
      key: "cloud-task" as const,
      label: tPricing("PRICING.tables.tab.cloudTask", "Cloud Task Pricing"),
    },
    {
      key: "fusion-api" as const,
      label: tPricing("PRICING.tables.tab.fusionApi", "Fusion API Pricing"),
    },
  ];

  function renderPricingTable(tableKey: PricingTableKey) {
    const isLLMTable = tableKey === "llm";
    const isCloudTaskTable = tableKey === "cloud-task";
    const tableAlert = isLLMTable
      ? tPricing(
          "PRICING.tables.llm.note",
          "LLM rates update with the model configuration in console. Units are credits per M token."
        )
      : isCloudTaskTable
        ? tPricing(
            "PRICING.tables.cloudTask.alert",
            "Running tools locally in OOMOL Studio does not trigger Cloud Task billing. Running the same tools through OOMOL-hosted surfaces does."
          )
        : tPricing(
            "PRICING.tables.fusionApi.alert",
            "Some official Blocks provided by OOMOL use these services. Users can also call these APIs directly, and credits are deducted on invocation."
          );
    const tableEmptyState = tPricing(
      "PRICING.tables.llm.empty",
      "No LLM pricing data is available right now."
    );

    return (
      <div className={styles.tablePanel}>
        <Alert variant="info" className={styles.tableAlert}>
          <AlertDescription>{tableAlert}</AlertDescription>
        </Alert>
        {isLLMTable && llmLoadFailed ? (
          <div className={styles.tableStatus}>
            {tPricing(
              "PRICING.tables.llm.error",
              "LLM pricing is temporarily unavailable. Please refresh later or check console directly."
            )}
          </div>
        ) : isLLMTable ? (
          <PriceTable
            columns={llmColumns}
            emptyState={tableEmptyState}
            loading={isLLMLoading}
            rows={llmRows}
          />
        ) : isCloudTaskTable ? (
          <PriceTable
            columns={cloudTaskColumns}
            emptyState={tPricing(
              "PRICING.tables.cloudTask.noteText",
              "Anything under one minute is billed as one minute"
            )}
            rows={cloudTaskRows}
          />
        ) : (
          <PriceTable
            columns={fusionApiColumns}
            emptyState={tPricing(
              "PRICING.tables.fusionApi.description",
              "Description"
            )}
            rows={fusionApiRows}
          />
        )}
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{pageCopy.title}</title>
        <meta name="description" content={pageCopy.description} />
      </Head>
      <main className={`${styles.container} oomol-landing-main`}>
        <div className={styles.titleBox}>
          <div className={styles.title}>
            {translate({ message: "PRICING.title" })}
          </div>
          <div className={styles.subTitle}>
            {translate({ message: "PRICING.subtitle" })}
          </div>
        </div>

        <div className={styles.pricingModelSection}>
          <Alert variant="info" className={styles.pricingModelAlert}>
            <AlertDescription>
              {tPricing(
                "PRICING.model.summary",
                "Studio stays free for local work. Free users also get 200 Cloud Task minutes every month, then top up or upgrade only after that included usage runs out. OOMOL-provided models and services use credits."
              )}
            </AlertDescription>
          </Alert>
          <div className={styles.pricingModelGrid}>
            <div className={styles.pricingModelCard}>
              <div className={styles.pricingModelLabel}>
                {tPricing("PRICING.model.local.label", "Local")}
              </div>
              <div className={styles.pricingModelTitle}>
                {tPricing(
                  "PRICING.model.local.title",
                  "Build and validate in Studio for free"
                )}
              </div>
              <p className={styles.pricingModelText}>
                {tPricing(
                  "PRICING.model.local.text",
                  "Use the full local environment, verify results with your own dependencies and workflow, and connect your own model if you already have one."
                )}
              </p>
            </div>
            <div className={styles.pricingModelCard}>
              <div className={styles.pricingModelLabel}>
                {tPricing("PRICING.model.online.label", "Online")}
              </div>
              <div className={styles.pricingModelTitle}>
                {tPricing(
                  "PRICING.model.online.title",
                  "Free first, then top up when online usage grows"
                )}
              </div>
              <p className={styles.pricingModelText}>
                {tPricing(
                  "PRICING.model.online.text",
                  "Free users can already publish and use Cloud with 200 monthly Cloud Task minutes. Top up or move to a paid plan only when you need more included usage or higher limits."
                )}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.subscriptionSection}>
          <div className={styles.sectionTitle}>
            {translate({ message: "PRICING.subscription.title" })}
          </div>
          <div className={styles.sectionSubtitle}>
            {translate({ message: "PRICING.subscription.subtitle" })}
          </div>

          <div className={styles.planBox}>
            {/* 免费版 */}
            <div className={`${styles.planCard} ${styles.freePlan}`}>
              <div className={styles.planHeader}>
                <div className={styles.planName}>
                  {translate({ message: "PRICING.subscription.free.name" })}
                </div>
                <div className={styles.planPrice}>
                  <span className={styles.price}>
                    {translate({ message: "PRICING.subscription.free.price" })}
                  </span>
                </div>
                <div className={styles.planDescription}>
                  {translate({
                    message: "PRICING.subscription.free.description",
                  })}
                </div>
                <div className={styles.planHighlights}>
                  {freeHighlights.map(highlightKey => (
                    <span key={highlightKey} className={styles.planHighlight}>
                      {translate({ message: highlightKey })}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.planActionArea}>
                <div className={styles.downloadBtnWrapper}>
                  <DownloadButton />
                </div>
              </div>
              <div className={styles.planDetails}>
                <div className={styles.featureList}>
                  {freeFeatures.map(featureKey => (
                    <div key={featureKey} className={styles.featureItem}>
                      <i className="i-codicon:check" />
                      <span>
                        {translate({
                          message: featureKey,
                        })}
                      </span>
                    </div>
                  ))}
                </div>
                <details className={styles.featureDisclosure}>
                  <summary className={styles.featureDisclosureTrigger}>
                    <span className={styles.featureDisclosureOpenLabel}>
                      {translate({
                        message: "PRICING.subscription.showDetails",
                      })}
                    </span>
                    <span className={styles.featureDisclosureCloseLabel}>
                      {translate({
                        message: "PRICING.subscription.hideDetails",
                      })}
                    </span>
                    <i className="i-codicon:chevron-down" />
                  </summary>
                  <div className={styles.featureDisclosureContent}>
                    {freeMoreFeatures.map(featureKey => (
                      <div key={featureKey} className={styles.featureItem}>
                        <i className="i-codicon:check" />
                        <span>
                          {translate({
                            message: featureKey,
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </div>

            <div
              className={`${styles.planCard} ${styles.recommended} ${styles.proPlan}`}
            >
              <div className={styles.badge}>
                {translate({ message: "PRICING.subscription.recommended" })}
              </div>
              <div className={styles.planHeader}>
                <div className={styles.planName}>
                  {translate({ message: "PRICING.subscription.pro.name" })}
                </div>
                <div className={styles.planPrice}>
                  <span className={styles.price}>
                    {translate({
                      message: "PRICING.subscription.pro.price",
                    })}
                  </span>
                  <span className={styles.period}>
                    {translate({ message: "PRICING.subscription.period" })}
                  </span>
                </div>
                <div className={styles.planDescription}>
                  {translate({
                    message: "PRICING.subscription.pro.description",
                  })}
                </div>
                <div className={styles.planHighlights}>
                  {proHighlights.map(highlightKey => (
                    <span key={highlightKey} className={styles.planHighlight}>
                      {translate({ message: highlightKey })}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.planActionArea}>
                <Button
                  asChild
                  className={styles.subscribeBtn}
                  aria-label={paidPlanCtaLabel}
                >
                  <a
                    href={SUBSCRIPTION_BILLING_URL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {paidPlanCtaLabel}
                  </a>
                </Button>
                <div className={styles.planActionMeta} aria-hidden="true" />
              </div>
              <div className={styles.planDetails}>
                <div className={styles.featureList}>
                  {proFeatures.map(featureKey => (
                    <div key={featureKey} className={styles.featureItem}>
                      <i className="i-codicon:check" />
                      <span>
                        {translate({
                          message: featureKey,
                        })}
                      </span>
                    </div>
                  ))}
                </div>
                <details className={styles.featureDisclosure}>
                  <summary className={styles.featureDisclosureTrigger}>
                    <span className={styles.featureDisclosureOpenLabel}>
                      {translate({
                        message: "PRICING.subscription.showDetails",
                      })}
                    </span>
                    <span className={styles.featureDisclosureCloseLabel}>
                      {translate({
                        message: "PRICING.subscription.hideDetails",
                      })}
                    </span>
                    <i className="i-codicon:chevron-down" />
                  </summary>
                  <div className={styles.featureDisclosureContent}>
                    {proMoreFeatures.map(featureKey => (
                      <div key={featureKey} className={styles.featureItem}>
                        <i className="i-codicon:check" />
                        <span>
                          {translate({
                            message: featureKey,
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </div>

            <div className={`${styles.planCard} ${styles.maxPlan}`}>
              <div className={styles.planHeader}>
                <div className={styles.planName}>
                  {translate({ message: "PRICING.subscription.max.name" })}
                </div>
                <div className={styles.planPrice}>
                  <span className={styles.price}>
                    {translate({
                      message: "PRICING.subscription.max.price",
                    })}
                  </span>
                  <span className={styles.period}>
                    {translate({ message: "PRICING.subscription.period" })}
                  </span>
                </div>
                <div className={styles.planDescription}>
                  {translate({
                    message: "PRICING.subscription.max.description",
                  })}
                </div>
                <div className={styles.planHighlights}>
                  {maxHighlights.map(highlightKey => (
                    <span key={highlightKey} className={styles.planHighlight}>
                      {translate({ message: highlightKey })}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.planActionArea}>
                <Button
                  asChild
                  className={styles.subscribeBtn}
                  aria-label={paidPlanCtaLabel}
                >
                  <a
                    href={SUBSCRIPTION_BILLING_URL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {paidPlanCtaLabel}
                  </a>
                </Button>
                <div className={styles.planActionMeta} aria-hidden="true" />
              </div>
              <div className={styles.planDetails}>
                <div className={styles.featureList}>
                  {maxFeatures.map(featureKey => (
                    <div key={featureKey} className={styles.featureItem}>
                      <i className="i-codicon:check" />
                      <span>
                        {translate({
                          message: featureKey,
                        })}
                      </span>
                    </div>
                  ))}
                </div>
                <details className={styles.featureDisclosure}>
                  <summary className={styles.featureDisclosureTrigger}>
                    <span className={styles.featureDisclosureOpenLabel}>
                      {translate({
                        message: "PRICING.subscription.showDetails",
                      })}
                    </span>
                    <span className={styles.featureDisclosureCloseLabel}>
                      {translate({
                        message: "PRICING.subscription.hideDetails",
                      })}
                    </span>
                    <i className="i-codicon:chevron-down" />
                  </summary>
                  <div className={styles.featureDisclosureContent}>
                    {maxMoreFeatures.map(featureKey => (
                      <div key={featureKey} className={styles.featureItem}>
                        <i className="i-codicon:check" />
                        <span>
                          {translate({
                            message: featureKey,
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tableSectionWrapper}>
          <div className={styles.priceTablesSection}>
            <div className={styles.tableSectionHeader}>
              <div className={styles.tableSectionTitle}>
                {tPricing("PRICING.tables.title", "Detailed Pricing Tables")}
              </div>
              <div className={styles.tableSectionSubtitle}>
                {tPricing(
                  "PRICING.tables.subtitle",
                  "Think of pricing in two layers: the plans above include monthly usage, and the tables below show what happens after that included usage is used up."
                )}
              </div>
              <div className={styles.tableSyncNote}>
                {tPricing(
                  "PRICING.tables.syncNote",
                  "Free and paid plans can both run tools online. Free includes 200 Cloud Task minutes each month, paid plans include larger monthly allowances, and additional usage or model/service calls deduct credits."
                )}
              </div>
            </div>

            <Tabs
              value={activePricingTable}
              onValueChange={key =>
                setActivePricingTable(key as PricingTableKey)
              }
              className={styles.tableTabs}
            >
              <TabsList>
                {tableTabs.map(tab => (
                  <TabsTrigger key={tab.key} value={tab.key}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tableTabs.map(tab => (
                <TabsContent key={tab.key} value={tab.key}>
                  {renderPricingTable(tab.key)}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        <GetStartedPrompt />
      </main>
    </Layout>
  );
}
