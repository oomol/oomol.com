import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import { Alert, Table, Tabs } from "@arco-design/web-react";
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

interface PricingColumn {
  key: string;
  label: string;
  className?: string;
}

interface PricingRow {
  key: string;
  [key: string]: React.ReactNode;
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
  children: React.ReactNode;
  multiline?: boolean;
}) {
  return (
    <div
      className={multiline ? styles.multilinePriceValue : styles.priceValue}
    >
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

function PriceTable({
  columns,
  rows,
  emptyState,
  loading = false,
}: {
  columns: PricingColumn[];
  rows: PricingRow[];
  emptyState: string;
  loading?: boolean;
}) {
  return (
    <div className={styles.tableWrap}>
      <Table
        border={{
          cell: true,
          wrapper: true,
        }}
        className={styles.pricingTable}
        columns={columns.map((column) => ({
          className: column.className,
          dataIndex: column.key,
          title: column.label,
        }))}
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
  const [llmRows, setLlmRows] = useState<PricingRow[]>([]);
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
              left.model_name.localeCompare(right.model_name),
          )
          .map((item) => ({
            key: `${item.channel_name}-${item.model_name}`,
            channel: <IdentifierBadge>{item.channel_name}</IdentifierBadge>,
            model: <span className={styles.modelName}>{item.model_name}</span>,
            inputPrice: (
              <PriceValue>{formatPricingValue(item.input_ratio)}</PriceValue>
            ),
            cachePrice: <PriceValue>{formatPricingValue(item.ratio)}</PriceValue>,
            outputPrice: (
              <PriceValue>{formatPricingValue(item.output_ratio)}</PriceValue>
            ),
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

  const llmColumns: PricingColumn[] = [
    {
      key: "channel",
      label: tPricing("PRICING.tables.llm.channel", "Channel"),
      className: styles.channelColumn,
    },
    {
      key: "model",
      label: tPricing("PRICING.tables.llm.model", "Model"),
      className: styles.modelColumn,
    },
    {
      key: "inputPrice",
      label: `${tPricing("PRICING.tables.llm.inputPrice", "Input Price")} (${tPricing("PRICING.tables.llm.unit", "Credits/M Token")})`,
      className: styles.numberColumn,
    },
    {
      key: "cachePrice",
      label: `${tPricing("PRICING.tables.llm.cachePrice", "Cache Price")} (${tPricing("PRICING.tables.llm.unit", "Credits/M Token")})`,
      className: styles.numberColumn,
    },
    {
      key: "outputPrice",
      label: `${tPricing("PRICING.tables.llm.outputPrice", "Output Price")} (${tPricing("PRICING.tables.llm.unit", "Credits/M Token")})`,
      className: styles.numberColumn,
    },
  ];

  const cloudTaskColumns: PricingColumn[] = [
    {
      key: "service",
      label: tPricing("PRICING.tables.cloudTask.service", "Service"),
      className: styles.modelColumn,
    },
    {
      key: "price",
      label: tPricing(
        "PRICING.tables.cloudTask.price",
        "Price (Credits/Minute)",
      ),
      className: styles.numberColumn,
    },
    {
      key: "note",
      label: tPricing("PRICING.tables.cloudTask.remark", "Note"),
    },
  ];

  const cloudTaskRows: PricingRow[] = [
    {
      key: "cloud-task",
      service: <IdentifierBadge>Cloud Task</IdentifierBadge>,
      price: <PriceValue>0.01</PriceValue>,
      note: tPricing(
        "PRICING.tables.cloudTask.noteText",
        "Anything under one minute is billed as one minute",
      ),
    },
  ];

  const unitImage = tPricing("PRICING.tables.fusionApi.unit.image", "Image");
  const unitSecond = tPricing("PRICING.tables.fusionApi.unit.second", "Second");
  const unitMToken = tPricing("PRICING.tables.fusionApi.unit.mToken", "M Token");
  const unitTenThousandChars = tPricing(
    "PRICING.tables.fusionApi.unit.tenThousandChars",
    "10K Characters",
  );
  const unitHour = tPricing("PRICING.tables.fusionApi.unit.hour", "Hour");

  const fusionApiColumns: PricingColumn[] = [
    {
      key: "service",
      label: tPricing("PRICING.tables.fusionApi.service", "Service"),
      className: styles.modelColumn,
    },
    {
      key: "price",
      label: tPricing("PRICING.tables.fusionApi.price", "Price (Credits)"),
    },
    {
      key: "description",
      label: tPricing("PRICING.tables.fusionApi.description", "Description"),
    },
  ];

  const fusionApiRows: PricingRow[] = [
    {
      key: "fal-nano-banana",
      service: <IdentifierBadge>fal-nano-banana</IdentifierBadge>,
      price: <PriceValue>{`0.047 / ${unitImage}`}</PriceValue>,
      description: tPricing(
        "PRICING.tables.fusionApi.description.nanoBanana",
        "Nano Banana image generation or editing",
      ),
    },
    {
      key: "fal-nano-banana-pro",
      service: <IdentifierBadge>fal-nano-banana-pro</IdentifierBadge>,
      price: <PriceValue>{`0.18 / ${unitImage}`}</PriceValue>,
      description: tPricing(
        "PRICING.tables.fusionApi.description.nanoBananaPro",
        "Nano Banana Pro image generation or editing",
      ),
    },
    {
      key: "wanx-kf2v-video",
      service: <IdentifierBadge>wanx-kf2v-video</IdentifierBadge>,
      price: (
        <PriceValue multiline>
          {[
            `wan2.2-kf2v-flash 480p: 0.017 / ${unitSecond}`,
            `wan2.2-kf2v-flash 720p: 0.034 / ${unitSecond}`,
            `wan2.2-kf2v-flash 1080p: 0.085 / ${unitSecond}`,
            `wanx2.1-kf2v-plus 720p: 0.119 / ${unitSecond}`,
          ].join("\n")}
        </PriceValue>
      ),
      description: tPricing(
        "PRICING.tables.fusionApi.description.wanxKf2v",
        "Wanx keyframe to video",
      ),
    },
    {
      key: "fal-sora2-text-to-video",
      service: <IdentifierBadge>fal-sora2-text-to-video</IdentifierBadge>,
      price: (
        <PriceValue multiline>
          {[`720p: 0.36 / ${unitSecond}`, `1080p: 0.6 / ${unitSecond}`].join(
            "\n",
          )}
        </PriceValue>
      ),
      description: tPricing(
        "PRICING.tables.fusionApi.description.soraTextToVideo",
        "Sora2 text to video",
      ),
    },
    {
      key: "fal-sora2-image-to-video",
      service: <IdentifierBadge>fal-sora2-image-to-video</IdentifierBadge>,
      price: (
        <PriceValue multiline>
          {[`720p: 0.36 / ${unitSecond}`, `1080p: 0.6 / ${unitSecond}`].join(
            "\n",
          )}
        </PriceValue>
      ),
      description: tPricing(
        "PRICING.tables.fusionApi.description.soraImageToVideo",
        "Sora2 image to video",
      ),
    },
    {
      key: "wanx-image",
      service: <IdentifierBadge>wanx-image</IdentifierBadge>,
      price: <PriceValue>{`0.035 / ${unitImage}`}</PriceValue>,
      description: tPricing(
        "PRICING.tables.fusionApi.description.wanxImage",
        "Wanx image generation or editing",
      ),
    },
    {
      key: "tinify-png-shrink",
      service: <IdentifierBadge>tinify-png-shrink</IdentifierBadge>,
      price: <PriceValue>{`0.009 / ${unitImage}`}</PriceValue>,
      description: tPricing(
        "PRICING.tables.fusionApi.description.imageCompress",
        "Image compression",
      ),
    },
    {
      key: "qwen-mt-image",
      service: <IdentifierBadge>qwen-mt-image</IdentifierBadge>,
      price: <PriceValue>{`0.0005 / ${unitImage}`}</PriceValue>,
      description: tPricing(
        "PRICING.tables.fusionApi.description.qwenImageTranslate",
        "Qwen image translation",
      ),
    },
    {
      key: "qwen-image-edit-plus",
      service: <IdentifierBadge>qwen-image-edit-plus</IdentifierBadge>,
      price: <PriceValue>{`0.017 / ${unitImage}`}</PriceValue>,
      description: tPricing(
        "PRICING.tables.fusionApi.description.qwenImageEdit",
        "Qwen image editing",
      ),
    },
    {
      key: "jina-reader",
      service: <IdentifierBadge>jina-reader</IdentifierBadge>,
      price: (
        <PriceValue multiline>
          {[
            `search: 0.05 / ${unitMToken}`,
            `read: 0.05 / ${unitMToken}`,
          ].join("\n")}
        </PriceValue>
      ),
      description: "Jina Reader",
    },
    {
      key: "fal-remove-background",
      service: <IdentifierBadge>fal-remove-background</IdentifierBadge>,
      price: <PriceValue>{`0.021 / ${unitImage}`}</PriceValue>,
      description: tPricing(
        "PRICING.tables.fusionApi.description.removeBackground",
        "Background removal",
      ),
    },
    {
      key: "fal-flux-pro-kontext",
      service: <IdentifierBadge>fal-flux-pro-kontext</IdentifierBadge>,
      price: <PriceValue>{`0.048 / ${unitImage}`}</PriceValue>,
      description: tPricing(
        "PRICING.tables.fusionApi.description.kontextImageEdit",
        "Kontext image editing",
      ),
    },
    {
      key: "fal-aura-sr",
      service: <IdentifierBadge>fal-aura-sr</IdentifierBadge>,
      price: <PriceValue>{`0.0012 / ${unitImage}`}</PriceValue>,
      description: tPricing(
        "PRICING.tables.fusionApi.description.qualityEnhance",
        "Quality enhancement",
      ),
    },
    {
      key: "doubao-text-to-image-seedream",
      service: <IdentifierBadge>doubao-text-to-image-seedream</IdentifierBadge>,
      price: <PriceValue>{`0.043 / ${unitImage}`}</PriceValue>,
      description: tPricing(
        "PRICING.tables.fusionApi.description.doubaoTextToImage",
        "Doubao text to image",
      ),
    },
    {
      key: "doubao-tts",
      service: <IdentifierBadge>doubao-tts</IdentifierBadge>,
      price: <PriceValue>{`0.77 / ${unitTenThousandChars}`}</PriceValue>,
      description: tPricing(
        "PRICING.tables.fusionApi.description.doubaoTts",
        "Doubao text to speech",
      ),
    },
    {
      key: "doubao-stt",
      service: <IdentifierBadge>doubao-stt</IdentifierBadge>,
      price: <PriceValue>{`0.34 / ${unitHour}`}</PriceValue>,
      description: tPricing(
        "PRICING.tables.fusionApi.description.doubaoStt",
        "Doubao speech to text",
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
          "LLM rates update with the model configuration in console. Units are credits per M token.",
        )
      : isCloudTaskTable
        ? tPricing(
            "PRICING.tables.cloudTask.alert",
            "Running Blocks locally in OOMOL Studio does not trigger Cloud Task billing. Running Blocks in Chat or hub.oomol.com does.",
          )
        : tPricing(
            "PRICING.tables.fusionApi.alert",
            "Some official Blocks provided by OOMOL use these services. Users can also call these APIs directly, and credits are deducted on invocation.",
          );
    const tableColumns = isLLMTable
      ? llmColumns
      : isCloudTaskTable
        ? cloudTaskColumns
        : fusionApiColumns;
    const tableRows = isLLMTable
      ? llmRows
      : isCloudTaskTable
        ? cloudTaskRows
        : fusionApiRows;
    const tableEmptyState = isLLMTable
      ? tPricing(
          "PRICING.tables.llm.empty",
          "No LLM pricing data is available right now.",
        )
      : isCloudTaskTable
        ? tPricing(
            "PRICING.tables.cloudTask.noteText",
            "Anything under one minute is billed as one minute",
          )
        : tPricing("PRICING.tables.fusionApi.description", "Description");

    return (
      <div className={styles.tablePanel}>
        <Alert banner className={styles.tableAlert} content={tableAlert} />
        {isLLMTable && llmLoadFailed ? (
          <div className={styles.tableStatus}>
            {tPricing(
              "PRICING.tables.llm.error",
              "LLM pricing is temporarily unavailable. Please refresh later or check console directly.",
            )}
          </div>
        ) : (
          <PriceTable
            columns={tableColumns}
            emptyState={tableEmptyState}
            loading={isLLMTable && isLLMLoading}
            rows={tableRows}
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
                  "These tables mirror the pricing structure shown in OOMOL Console so you can verify pay-as-you-go charges directly from the website.",
                )}
              </div>
              <div className={styles.tableSyncNote}>
                {tPricing(
                  "PRICING.tables.syncNote",
                  "LLM pricing is fetched live from console; Cloud Task and Fusion API rows reflect the current console table",
                )}
              </div>
            </div>

            <Tabs
              activeTab={activePricingTable}
              className={styles.tableTabs}
              onChange={key => setActivePricingTable(key as PricingTableKey)}
            >
              {tableTabs.map((tab) => (
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
