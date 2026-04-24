import styles from "./styles.module.scss";

import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
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
import React, { useEffect, useState } from "react";

import Layout from "../../theme/Layout";

type PricingColumn<T> = {
  key: string;
  title: React.ReactNode;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
};

const LLM_PRICING_ENDPOINT =
  "https://console-server.oomol.com/api/models/models_with_config";
const SUBSCRIPTION_BILLING_URL = "https://console.oomol.com/billing/recharge";

type PricingTableKey = "llm" | "cloud-task" | "ai-gateway" | "fusion-api";

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

interface GatewayPricingRow extends PricingRowBase {
  plan: string;
  includedUsage: string;
  overage: string;
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

function formatTableCellValue(value: unknown) {
  return value == null ? "" : String(value);
}

function renderIdentifierBadge(value: unknown) {
  return <IdentifierBadge>{formatTableCellValue(value)}</IdentifierBadge>;
}

function renderSinglePriceValue(value: unknown) {
  return <PriceValue>{formatTableCellValue(value)}</PriceValue>;
}

function renderMultiLinePriceValue(value: unknown) {
  const normalizedValue = Array.isArray(value)
    ? value.map(formatTableCellValue).join("\n")
    : formatTableCellValue(value);
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
      <Table className={styles.dataTable}>
        <colgroup>
          {columns.map(column => (
            <col
              key={column.key}
              style={{ width: `${100 / columns.length}%` }}
            />
          ))}
        </colgroup>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead key={column.key}>{column.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className={styles.emptyCell}>
                <i
                  className="i-lucide-loader-circle inline-block size-4 animate-spin mr-2 align-[-3px]"
                  aria-hidden="true"
                />
                {translate({ message: "PRICING.table.loading" })}
              </TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className={styles.emptyCell}>
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

                  return <TableCell key={column.key}>{cellContent}</TableCell>;
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
  const cliInstallGuideUrl = useBaseUrl("/docs/oo-cli");
  const [activePricingTable, setActivePricingTable] =
    useState<PricingTableKey>("fusion-api");
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
    "PRICING.subscription.pro.feature4",
  ];
  const proMoreFeatures = [
    "PRICING.subscription.pro.feature5",
    "PRICING.subscription.pro.feature6",
  ];
  const growthFeatures = [
    "PRICING.subscription.growth.feature1",
    "PRICING.subscription.growth.feature2",
    "PRICING.subscription.growth.feature3",
    "PRICING.subscription.growth.feature4",
  ];
  const growthMoreFeatures = [
    "PRICING.subscription.growth.feature5",
    "PRICING.subscription.growth.feature6",
  ];
  const maxFeatures = [
    "PRICING.subscription.max.feature1",
    "PRICING.subscription.max.feature2",
    "PRICING.subscription.max.feature3",
    "PRICING.subscription.max.feature4",
  ];
  const maxMoreFeatures = [
    "PRICING.subscription.max.feature5",
    "PRICING.subscription.max.feature6",
  ];
  const freeHighlights = [
    "PRICING.subscription.free.highlight1",
    "PRICING.subscription.free.highlight2",
  ];
  const proHighlights = [
    "PRICING.subscription.pro.highlight1",
    "PRICING.subscription.pro.highlight2",
  ];
  const growthHighlights = [
    "PRICING.subscription.growth.highlight1",
    "PRICING.subscription.growth.highlight2",
  ];
  const maxHighlights = [
    "PRICING.subscription.max.highlight1",
    "PRICING.subscription.max.highlight2",
  ];
  const paidPlanCtaLabel = tPricing(
    "PRICING.subscription.subscribe",
    "Subscribe"
  );
  const freePlanCtaLabel = tPricing(
    "PRICING.subscription.free.cta",
    "Install oo-cli"
  );

  const planCards = [
    {
      key: "free",
      className: `${styles.planCard} ${styles.freePlan}`,
      descriptionKey: "PRICING.subscription.free.description",
      featureKeys: freeFeatures,
      highlightKeys: freeHighlights,
      moreFeatureKeys: freeMoreFeatures,
      nameKey: "PRICING.subscription.free.name",
      priceKey: "PRICING.subscription.free.price",
      isFree: true,
      isRecommended: false,
    },
    {
      key: "pro",
      className: `${styles.planCard} ${styles.proPlan}`,
      descriptionKey: "PRICING.subscription.pro.description",
      featureKeys: proFeatures,
      highlightKeys: proHighlights,
      moreFeatureKeys: proMoreFeatures,
      nameKey: "PRICING.subscription.pro.name",
      priceKey: "PRICING.subscription.pro.price",
      isFree: false,
      isRecommended: false,
    },
    {
      key: "growth",
      className: `${styles.planCard} ${styles.recommended} ${styles.growthPlan}`,
      descriptionKey: "PRICING.subscription.growth.description",
      featureKeys: growthFeatures,
      highlightKeys: growthHighlights,
      moreFeatureKeys: growthMoreFeatures,
      nameKey: "PRICING.subscription.growth.name",
      priceKey: "PRICING.subscription.growth.price",
      isFree: false,
      isRecommended: true,
    },
    {
      key: "max",
      className: `${styles.planCard} ${styles.maxPlan}`,
      descriptionKey: "PRICING.subscription.max.description",
      featureKeys: maxFeatures,
      highlightKeys: maxHighlights,
      moreFeatureKeys: maxMoreFeatures,
      nameKey: "PRICING.subscription.max.name",
      priceKey: "PRICING.subscription.max.price",
      isFree: false,
      isRecommended: false,
    },
  ];

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
    },
    {
      dataIndex: "inputPrice",
      key: "inputPrice",
      render: renderSinglePriceValue,
      title: `${tPricing("PRICING.tables.llm.inputPrice", "Input Price")} (${tPricing("PRICING.tables.llm.unit", "Credits/M Token")})`,
    },
    {
      dataIndex: "cachePrice",
      key: "cachePrice",
      render: renderSinglePriceValue,
      title: `${tPricing("PRICING.tables.llm.cachePrice", "Cache Price")} (${tPricing("PRICING.tables.llm.unit", "Credits/M Token")})`,
    },
    {
      dataIndex: "outputPrice",
      key: "outputPrice",
      render: renderSinglePriceValue,
      title: `${tPricing("PRICING.tables.llm.outputPrice", "Output Price")} (${tPricing("PRICING.tables.llm.unit", "Credits/M Token")})`,
    },
  ];

  const cloudTaskColumns: PricingColumn<CloudTaskPricingRow>[] = [
    {
      dataIndex: "service",
      key: "service",
      render: renderIdentifierBadge,
      title: tPricing("PRICING.tables.cloudTask.service", "Service"),
    },
    {
      dataIndex: "price",
      key: "price",
      render: renderSinglePriceValue,
      title: tPricing(
        "PRICING.tables.cloudTask.price",
        "Price (Credits/Minute)"
      ),
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
        "Billed by runtime. Anything under one minute is billed as one minute"
      ),
    },
  ];

  const gatewayColumns: PricingColumn<GatewayPricingRow>[] = [
    {
      dataIndex: "plan",
      key: "plan",
      render: renderIdentifierBadge,
      title: tPricing("PRICING.tables.gateway.plan", "Plan"),
    },
    {
      dataIndex: "includedUsage",
      key: "includedUsage",
      render: renderSinglePriceValue,
      title: tPricing("PRICING.tables.gateway.includedUsage", "Included Usage"),
    },
    {
      dataIndex: "overage",
      key: "overage",
      render: renderSinglePriceValue,
      title: tPricing("PRICING.tables.gateway.overage", "Overage"),
    },
    {
      dataIndex: "note",
      key: "note",
      title: tPricing("PRICING.tables.gateway.note", "Included"),
    },
  ];

  const gatewayRows: GatewayPricingRow[] = [
    {
      key: "gateway-free",
      plan: tPricing("PRICING.subscription.free.name", "Free"),
      includedUsage: tPricing(
        "PRICING.tables.gateway.freeIncluded",
        "20K requests / month"
      ),
      overage: tPricing(
        "PRICING.tables.gateway.freeOverage",
        "Upgrade to continue"
      ),
      note: tPricing(
        "PRICING.tables.gateway.freeNote",
        "Auth Link, OAuth callback, token refresh, and connection checks are included"
      ),
    },
    {
      key: "gateway-pro",
      plan: tPricing("PRICING.subscription.pro.name", "Pro"),
      includedUsage: tPricing(
        "PRICING.tables.gateway.proIncluded",
        "50K requests / month"
      ),
      overage: tPricing(
        "PRICING.tables.gateway.standardOverage",
        "0.3 / 1K requests"
      ),
      note: tPricing(
        "PRICING.tables.gateway.proNote",
        "Includes Auth Link and a higher monthly request allowance"
      ),
    },
    {
      key: "gateway-growth",
      plan: tPricing("PRICING.subscription.growth.name", "Growth"),
      includedUsage: tPricing(
        "PRICING.tables.gateway.growthIncluded",
        "200K requests / month"
      ),
      overage: tPricing(
        "PRICING.tables.gateway.standardOverage",
        "0.3 / 1K requests"
      ),
      note: tPricing(
        "PRICING.tables.gateway.growthNote",
        "Includes Auth Link and a larger monthly request allowance"
      ),
    },
    {
      key: "gateway-scale",
      plan: tPricing("PRICING.subscription.max.name", "Scale"),
      includedUsage: tPricing(
        "PRICING.tables.gateway.scaleIncluded",
        "1M requests / month"
      ),
      overage: tPricing(
        "PRICING.tables.gateway.scaleOverage",
        "0.25 / 1K requests"
      ),
      note: tPricing(
        "PRICING.tables.gateway.scaleNote",
        "Includes Auth Link and the highest monthly request allowance"
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
    },
    {
      dataIndex: "price",
      key: "price",
      render: renderMultiLinePriceValue,
      title: tPricing("PRICING.tables.fusionApi.price", "Price (Credits)"),
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
      description: tPricing(
        "PRICING.tables.fusionApi.description.jinaReader",
        "Jina Reader"
      ),
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
      key: "fusion-api" as const,
      label: tPricing(
        "PRICING.tables.tab.fusionApi",
        "Images & Other Services"
      ),
    },
    {
      key: "cloud-task" as const,
      label: tPricing("PRICING.tables.tab.cloudTask", "Cloud Task"),
    },
    {
      key: "llm" as const,
      label: tPricing("PRICING.tables.tab.llm", "LLMs"),
    },
    {
      key: "ai-gateway" as const,
      label: tPricing("PRICING.tables.tab.gateway", "Auth Link"),
    },
  ];

  function renderPricingTable(tableKey: PricingTableKey) {
    const isLLMTable = tableKey === "llm";
    const isCloudTaskTable = tableKey === "cloud-task";
    const isGatewayTable = tableKey === "ai-gateway";
    const tableAlert = isLLMTable
      ? tPricing(
          "PRICING.tables.llm.note",
          "Check this only when you call OOMOL-billed models directly. If you mainly use your own model configuration in CLI or Studio, that cost is usually paid by you instead. Rates update with the model configuration in the console. Units are credits per million tokens."
        )
      : isCloudTaskTable
        ? tPricing(
            "PRICING.tables.cloudTask.alert",
            "If you host tools on OOMOL, Cloud Task is usually the second cost to watch. It applies to cloud functions or APIs you publish through OOMOL and is billed by runtime."
          )
        : isGatewayTable
          ? tPricing(
              "PRICING.tables.gateway.alert",
              "Use this for services that need user authorization. Auth Link handles account connection and authorization, and only requests made after a user grants access are billed."
            )
          : tPricing(
              "PRICING.tables.fusionApi.alert",
              "This is usually the first usage-based pricing most users care about. Official OOMOL tools call these services directly, and you can call them yourself as well. Charges are deducted in credits based on each service unit."
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
              "Billed by runtime. Anything under one minute is billed as one minute"
            )}
            rows={cloudTaskRows}
          />
        ) : isGatewayTable ? (
          <PriceTable
            columns={gatewayColumns}
            emptyState={tPricing(
              "PRICING.tables.gateway.empty",
              "No Auth Link pricing data is available right now."
            )}
            rows={gatewayRows}
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
        <title>{translate({ message: "PRICING.page.title" })}</title>
        <meta
          name="description"
          content={translate({ message: "PRICING.page.description" })}
        />
      </Head>
      <main className={`${styles.page} oomol-landing-main`}>
        <section className={styles.heroSection}>
          <div className={styles.sectionInner}>
            <div className={styles.titleBox}>
              <h1 className={styles.heroTitle}>
                {translate({ message: "PRICING.title" })}
              </h1>
              <p className={styles.heroSubtitle}>
                {translate({ message: "PRICING.subtitle" })}
              </p>
            </div>
          </div>
        </section>

        <section className={styles.pricingModelSection}>
          <div className={styles.sectionInner}>
            <Alert variant="info" className={styles.pricingModelAlert}>
              <AlertDescription>
                {tPricing(
                  "PRICING.model.summary",
                  "Start in Studio for free, then decide whether you need cloud runtime or Auth Link. Free refreshes 200 Cloud Task minutes and 20K Auth Link requests every month."
                )}
              </AlertDescription>
            </Alert>
            <div className={styles.pricingModelGrid}>
              <div className={styles.pricingModelCard}>
                <div className={styles.pricingModelLabel}>
                  {tPricing("PRICING.model.local.label", "Local")}
                </div>
                <h2 className={styles.pricingModelTitle}>
                  {tPricing(
                    "PRICING.model.local.title",
                    "Build and validate in Studio for free"
                  )}
                </h2>
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
                <h2 className={styles.pricingModelTitle}>
                  {tPricing(
                    "PRICING.model.online.title",
                    "Go live first, then scale runtime and request volume"
                  )}
                </h2>
                <p className={styles.pricingModelText}>
                  {tPricing(
                    "PRICING.model.online.text",
                    "Free already lets you publish and use Cloud with 200 monthly Cloud Task minutes plus 20K Auth Link requests. Auth Link lets users connect accounts and grant access. Only requests made after authorization are billed."
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.subscriptionSection}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "PRICING.subscription.title" })}
            </h2>
            <p className={styles.sectionSubtitle}>
              {translate({ message: "PRICING.subscription.subtitle" })}
            </p>

            <div className={styles.planBox}>
              {planCards.map(plan => (
                <div key={plan.key} className={plan.className}>
                  {plan.isRecommended ? (
                    <div className={styles.badge}>
                      {translate({
                        message: "PRICING.subscription.recommended",
                      })}
                    </div>
                  ) : null}
                  <div className={styles.planHeader}>
                    <h3 className={styles.planName}>
                      {translate({ message: plan.nameKey })}
                    </h3>
                    <div className={styles.planPrice}>
                      <span className={styles.price}>
                        {translate({ message: plan.priceKey })}
                      </span>
                      {!plan.isFree ? (
                        <span className={styles.period}>
                          {translate({
                            message: "PRICING.subscription.period",
                          })}
                        </span>
                      ) : null}
                    </div>
                    <div className={styles.planDescription}>
                      {translate({ message: plan.descriptionKey })}
                    </div>
                    <div className={styles.planHighlights}>
                      {plan.highlightKeys.map(highlightKey => (
                        <span
                          key={highlightKey}
                          className={styles.planHighlight}
                        >
                          {translate({ message: highlightKey })}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.planActionArea}>
                    {plan.isFree ? (
                      <>
                        <Button
                          asChild
                          size="default"
                          className={styles.planCta}
                        >
                          <a href={cliInstallGuideUrl}>{freePlanCtaLabel}</a>
                        </Button>
                        <div
                          className={styles.planActionMeta}
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          asChild
                          size="default"
                          className={styles.planCta}
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
                        <div
                          className={styles.planActionMeta}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </div>
                  <div className={styles.planDetails}>
                    <div className={styles.featureList}>
                      {plan.featureKeys.map(featureKey => (
                        <div key={featureKey} className={styles.featureItem}>
                          <i className="i-codicon:check" />
                          <span>{translate({ message: featureKey })}</span>
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
                        {plan.moreFeatureKeys.map(featureKey => (
                          <div key={featureKey} className={styles.featureItem}>
                            <i className="i-codicon:check" />
                            <span>{translate({ message: featureKey })}</span>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${styles.tableSectionWrapper} ${styles.sectionFlushBottom}`}
        >
          <div className={styles.sectionInner}>
            <div className={styles.priceTablesSection}>
              <div className={styles.tableSectionHeader}>
                <h2 className={styles.tableSectionTitle}>
                  {tPricing("PRICING.tables.title", "Usage & Service Pricing")}
                </h2>
                <p className={styles.tableSectionSubtitle}>
                  {tPricing(
                    "PRICING.tables.subtitle",
                    "This section covers four categories: LLMs, Cloud Task, Auth Link, and OOMOL's first-party APIs."
                  )}
                </p>
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
                  <TabsContent key={tab.key} value={tab.key} className="mt-0">
                    {renderPricingTable(tab.key)}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        <GetStartedPrompt />
      </main>
    </Layout>
  );
}
