import styles from "./styles.module.scss";

import type { ColumnProps } from "@arco-design/web-react/es/Table";

import { Alert, Table, Tabs } from "@arco-design/web-react";
import { translate } from "@docusaurus/Translate";
import { DownloadButton } from "@site/src/components/DownloadButton";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import { Button } from "@site/src/components/ui/button";
import React, { useEffect, useState } from "react";

import Layout from "../../theme/Layout";

const LLM_PRICING_ENDPOINT =
  "https://console-server.oomol.com/api/models/models_with_config";

type PricingTableKey = "llm" | "cloud-task" | "fusion-api";

interface LLMModelConfig {
  model_name: string;
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

function PriceTable<T extends PricingRowBase>({
  columns,
  rows,
  emptyState,
  loading = false,
}: {
  columns: ColumnProps<T>[];
  rows: T[];
  emptyState: string;
  loading?: boolean;
}) {
  return (
    <div className={styles.tableWrap}>
      <Table<T>
        border={{
          cell: false,
          wrapper: false,
        }}
        columns={columns}
        data={rows}
        loading={loading}
        noDataElement={<div className={styles.emptyCell}>{emptyState}</div>}
        pagination={false}
        rowKey="key"
        scroll={{ x: 960 }}
        tableLayoutFixed
      />
    </div>
  );
}

export default function Index() {
  const [activePricingTable, setActivePricingTable] =
    useState<PricingTableKey>("llm");
  const [llmRows, setLlmRows] = useState<LLMPricingRow[]>([]);
  const [isLLMLoading, setIsLLMLoading] = useState(true);
  const [llmLoadFailed, setLlmLoadFailed] = useState(false);

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

        const rows = [...result.data]
          .sort(
            (left, right) =>
              left.channel_name.localeCompare(right.channel_name) ||
              left.model_name.localeCompare(right.model_name)
          )
          .map(item => ({
            key: `${item.channel_name}-${item.model_name}`,
            channel: item.channel_name,
            model: item.model_name,
            inputPrice: formatPricingValue(item.input_ratio),
            cachePrice: formatPricingValue(item.ratio),
            outputPrice: formatPricingValue(item.output_ratio),
          }));

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

  const llmColumns: ColumnProps<LLMPricingRow>[] = [
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
      render: value => <span className={styles.modelName}>{value}</span>,
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

  const cloudTaskColumns: ColumnProps<CloudTaskPricingRow>[] = [
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

  const fusionApiColumns: ColumnProps<FusionApiPricingRow>[] = [
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
            "Running Blocks locally in OOMOL Studio does not trigger Cloud Task billing. Running Blocks in Chat or hub.oomol.com does."
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
        <Alert banner className={styles.tableAlert} content={tableAlert} />
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
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <div className={styles.title}>
            {translate({ message: "PRICING.title" })}
          </div>
          <div className={styles.subTitle}>
            {translate({ message: "PRICING.subtitle" })}
          </div>
        </div>

        {/* 订阅套餐部分 */}
        <div className={styles.subscriptionSection}>
          <div className={styles.sectionTitle}>
            {translate({ message: "PRICING.subscription.title" })}
          </div>
          <div className={styles.sectionSubtitle}>
            {translate({ message: "PRICING.subscription.subtitle" })}
          </div>

          <div className={styles.planBox}>
            {/* 免费版 */}
            <div className={styles.planCard}>
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
              </div>
              <div className={styles.downloadBtnWrapper}>
                <DownloadButton />
              </div>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.free.feature1",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.free.feature2",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.free.feature3",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.free.feature4",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* 标准版 */}
            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <div className={styles.planName}>
                  {translate({ message: "PRICING.subscription.standard.name" })}
                </div>
                <div className={styles.planPrice}>
                  <span className={styles.price}>
                    {translate({
                      message: "PRICING.subscription.standard.price",
                    })}
                  </span>
                  <span className={styles.period}>
                    {translate({ message: "PRICING.subscription.period" })}
                  </span>
                </div>
                <div className={styles.planDescription}>
                  {translate({
                    message: "PRICING.subscription.standard.description",
                  })}
                </div>
              </div>
              <Button asChild className={styles.subscribeBtn}>
                <a
                  href="https://console.oomol.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate({ message: "PRICING.subscription.subscribe" })}
                </a>
              </Button>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.standard.feature1",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.standard.feature2",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.standard.feature3",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.standard.feature4",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.standard.feature5",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* 专业版 */}
            <div className={`${styles.planCard} ${styles.recommended}`}>
              <div className={styles.badge}>
                {translate({ message: "PRICING.subscription.recommended" })}
              </div>
              <div className={styles.planHeader}>
                <div className={styles.planName}>
                  {translate({ message: "PRICING.subscription.pro.name" })}
                </div>
                <div className={styles.planPrice}>
                  <span className={styles.price}>
                    {translate({ message: "PRICING.subscription.pro.price" })}
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
              </div>
              <Button asChild className={styles.subscribeBtn}>
                <a
                  href="https://console.oomol.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {translate({ message: "PRICING.subscription.subscribe" })}
                </a>
              </Button>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.pro.feature1",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.pro.feature2",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.pro.feature3",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.pro.feature4",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.pro.feature5",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.subscription.pro.feature6",
                    })}
                  </span>
                </div>
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
                  "These tables mirror the pricing structure shown in OOMOL Console so you can verify pay-as-you-go charges directly from the website."
                )}
              </div>
              <div className={styles.tableSyncNote}>
                {tPricing(
                  "PRICING.tables.syncNote",
                  "LLM pricing is fetched live from console; Cloud Task and Fusion API rows reflect the current console table"
                )}
              </div>
            </div>

            <Tabs
              activeTab={activePricingTable}
              className={styles.tableTabs}
              type="line"
              size="large"
              onChange={key => setActivePricingTable(key as PricingTableKey)}
            >
              {tableTabs.map(tab => (
                <Tabs.TabPane key={tab.key} title={tab.label}>
                  {renderPricingTable(tab.key)}
                </Tabs.TabPane>
              ))}
            </Tabs>
          </div>
        </div>

        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
