import styles from "./styles.module.scss";

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

interface PricingColumn {
  key: string;
  label: string;
  className?: string;
}

interface PricingRow {
  key: string;
  [key: string]: React.ReactNode;
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
}: {
  columns: PricingColumn[];
  rows: PricingRow[];
  emptyState: string;
}) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.pricingTable}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={column.className}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <tr key={row.key}>
                {columns.map((column) => (
                  <td key={column.key} className={column.className}>
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className={styles.emptyCell}>
                {emptyState}
              </td>
            </tr>
          )}
        </tbody>
      </table>
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

        const rows = result.data
          .map((item) => ({
            key: `${item.channel_name}-${item.model_name}`,
            channel: item.channel_name,
            model: item.model_name,
            inputPrice: formatPricingValue(item.input_ratio),
            cachePrice: formatPricingValue(item.ratio),
            outputPrice: formatPricingValue(item.output_ratio),
          }))
          .sort(
            (left, right) =>
              left.channel.localeCompare(right.channel) ||
              left.model.localeCompare(right.model),
          );

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
      label: translate({ message: "PRICING.tables.llm.channel" }),
      className: styles.channelColumn,
    },
    {
      key: "model",
      label: translate({ message: "PRICING.tables.llm.model" }),
      className: styles.modelColumn,
    },
    {
      key: "inputPrice",
      label: `${translate({
        message: "PRICING.tables.llm.inputPrice",
      })} (${translate({ message: "PRICING.tables.llm.unit" })})`,
      className: styles.numberColumn,
    },
    {
      key: "cachePrice",
      label: `${translate({
        message: "PRICING.tables.llm.cachePrice",
      })} (${translate({ message: "PRICING.tables.llm.unit" })})`,
      className: styles.numberColumn,
    },
    {
      key: "outputPrice",
      label: `${translate({
        message: "PRICING.tables.llm.outputPrice",
      })} (${translate({ message: "PRICING.tables.llm.unit" })})`,
      className: styles.numberColumn,
    },
  ];

  const cloudTaskColumns: PricingColumn[] = [
    {
      key: "service",
      label: translate({ message: "PRICING.tables.cloudTask.service" }),
      className: styles.modelColumn,
    },
    {
      key: "price",
      label: translate({ message: "PRICING.tables.cloudTask.price" }),
      className: styles.numberColumn,
    },
    {
      key: "note",
      label: translate({ message: "PRICING.tables.cloudTask.remark" }),
    },
  ];

  const cloudTaskRows: PricingRow[] = [
    {
      key: "cloud-task",
      service: "Cloud Task",
      price: "0.01",
      note: translate({ message: "PRICING.tables.cloudTask.noteText" }),
    },
  ];

  const unitImage = translate({ message: "PRICING.tables.fusionApi.unit.image" });
  const unitSecond = translate({
    message: "PRICING.tables.fusionApi.unit.second",
  });
  const unitMToken = translate({
    message: "PRICING.tables.fusionApi.unit.mToken",
  });
  const unitTenThousandChars = translate({
    message: "PRICING.tables.fusionApi.unit.tenThousandChars",
  });
  const unitHour = translate({ message: "PRICING.tables.fusionApi.unit.hour" });

  const fusionApiColumns: PricingColumn[] = [
    {
      key: "service",
      label: translate({ message: "PRICING.tables.fusionApi.service" }),
      className: styles.modelColumn,
    },
    {
      key: "price",
      label: translate({ message: "PRICING.tables.fusionApi.price" }),
    },
    {
      key: "description",
      label: translate({ message: "PRICING.tables.fusionApi.description" }),
    },
  ];

  const fusionApiRows: PricingRow[] = [
    {
      key: "fal-nano-banana",
      service: "fal-nano-banana",
      price: <div className={styles.multilineCell}>{`0.047 / ${unitImage}`}</div>,
      description: translate({
        message: "PRICING.tables.fusionApi.description.nanoBanana",
      }),
    },
    {
      key: "fal-nano-banana-pro",
      service: "fal-nano-banana-pro",
      price: <div className={styles.multilineCell}>{`0.18 / ${unitImage}`}</div>,
      description: translate({
        message: "PRICING.tables.fusionApi.description.nanoBananaPro",
      }),
    },
    {
      key: "wanx-kf2v-video",
      service: "wanx-kf2v-video",
      price: (
        <div className={styles.multilineCell}>
          {[
            `wan2.2-kf2v-flash 480p: 0.017 / ${unitSecond}`,
            `wan2.2-kf2v-flash 720p: 0.034 / ${unitSecond}`,
            `wan2.2-kf2v-flash 1080p: 0.085 / ${unitSecond}`,
            `wanx2.1-kf2v-plus 720p: 0.119 / ${unitSecond}`,
          ].join("\n")}
        </div>
      ),
      description: translate({
        message: "PRICING.tables.fusionApi.description.wanxKf2v",
      }),
    },
    {
      key: "fal-sora2-text-to-video",
      service: "fal-sora2-text-to-video",
      price: (
        <div className={styles.multilineCell}>
          {[`720p: 0.36 / ${unitSecond}`, `1080p: 0.6 / ${unitSecond}`].join(
            "\n",
          )}
        </div>
      ),
      description: translate({
        message: "PRICING.tables.fusionApi.description.soraTextToVideo",
      }),
    },
    {
      key: "fal-sora2-image-to-video",
      service: "fal-sora2-image-to-video",
      price: (
        <div className={styles.multilineCell}>
          {[`720p: 0.36 / ${unitSecond}`, `1080p: 0.6 / ${unitSecond}`].join(
            "\n",
          )}
        </div>
      ),
      description: translate({
        message: "PRICING.tables.fusionApi.description.soraImageToVideo",
      }),
    },
    {
      key: "wanx-image",
      service: "wanx-image",
      price: <div className={styles.multilineCell}>{`0.035 / ${unitImage}`}</div>,
      description: translate({
        message: "PRICING.tables.fusionApi.description.wanxImage",
      }),
    },
    {
      key: "tinify-png-shrink",
      service: "tinify-png-shrink",
      price: <div className={styles.multilineCell}>{`0.009 / ${unitImage}`}</div>,
      description: translate({
        message: "PRICING.tables.fusionApi.description.imageCompress",
      }),
    },
    {
      key: "qwen-mt-image",
      service: "qwen-mt-image",
      price: (
        <div className={styles.multilineCell}>{`0.0005 / ${unitImage}`}</div>
      ),
      description: translate({
        message: "PRICING.tables.fusionApi.description.qwenImageTranslate",
      }),
    },
    {
      key: "qwen-image-edit-plus",
      service: "qwen-image-edit-plus",
      price: <div className={styles.multilineCell}>{`0.017 / ${unitImage}`}</div>,
      description: translate({
        message: "PRICING.tables.fusionApi.description.qwenImageEdit",
      }),
    },
    {
      key: "jina-reader",
      service: "jina-reader",
      price: (
        <div className={styles.multilineCell}>
          {[
            `search: 0.05 / ${unitMToken}`,
            `read: 0.05 / ${unitMToken}`,
          ].join("\n")}
        </div>
      ),
      description: "Jina Reader",
    },
    {
      key: "fal-remove-background",
      service: "fal-remove-background",
      price: <div className={styles.multilineCell}>{`0.021 / ${unitImage}`}</div>,
      description: translate({
        message: "PRICING.tables.fusionApi.description.removeBackground",
      }),
    },
    {
      key: "fal-flux-pro-kontext",
      service: "fal-flux-pro-kontext",
      price: <div className={styles.multilineCell}>{`0.048 / ${unitImage}`}</div>,
      description: translate({
        message: "PRICING.tables.fusionApi.description.kontextImageEdit",
      }),
    },
    {
      key: "fal-aura-sr",
      service: "fal-aura-sr",
      price: (
        <div className={styles.multilineCell}>{`0.0012 / ${unitImage}`}</div>
      ),
      description: translate({
        message: "PRICING.tables.fusionApi.description.qualityEnhance",
      }),
    },
    {
      key: "doubao-text-to-image-seedream",
      service: "doubao-text-to-image-seedream",
      price: <div className={styles.multilineCell}>{`0.043 / ${unitImage}`}</div>,
      description: translate({
        message: "PRICING.tables.fusionApi.description.doubaoTextToImage",
      }),
    },
    {
      key: "doubao-tts",
      service: "doubao-tts",
      price: (
        <div className={styles.multilineCell}>
          {`0.77 / ${unitTenThousandChars}`}
        </div>
      ),
      description: translate({
        message: "PRICING.tables.fusionApi.description.doubaoTts",
      }),
    },
    {
      key: "doubao-stt",
      service: "doubao-stt",
      price: <div className={styles.multilineCell}>{`0.34 / ${unitHour}`}</div>,
      description: translate({
        message: "PRICING.tables.fusionApi.description.doubaoStt",
      }),
    },
  ];

  const tableTabs = [
    {
      key: "llm" as const,
      label: translate({ message: "PRICING.tables.tab.llm" }),
    },
    {
      key: "cloud-task" as const,
      label: translate({ message: "PRICING.tables.tab.cloudTask" }),
    },
    {
      key: "fusion-api" as const,
      label: translate({ message: "PRICING.tables.tab.fusionApi" }),
    },
  ];

  let activeTableAlert = translate({ message: "PRICING.tables.llm.note" });
  let activeTableColumns = llmColumns;
  let activeTableRows: PricingRow[] = llmRows;
  let activeEmptyState = translate({ message: "PRICING.tables.llm.empty" });

  if (activePricingTable === "cloud-task") {
    activeTableAlert = translate({ message: "PRICING.tables.cloudTask.alert" });
    activeTableColumns = cloudTaskColumns;
    activeTableRows = cloudTaskRows;
    activeEmptyState = translate({ message: "PRICING.tables.cloudTask.noteText" });
  }

  if (activePricingTable === "fusion-api") {
    activeTableAlert = translate({ message: "PRICING.tables.fusionApi.alert" });
    activeTableColumns = fusionApiColumns;
    activeTableRows = fusionApiRows;
    activeEmptyState = translate({
      message: "PRICING.tables.fusionApi.description",
    });
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

        {/* 按量计费部分 */}
        <div className={styles.payAsYouGoSection}>
          <div className={styles.sectionTitle}>
            {translate({ message: "PRICING.payAsYouGo.title" })}
          </div>
          <div className={styles.sectionSubtitle}>
            {translate({ message: "PRICING.payAsYouGo.subtitle" })}
          </div>

          <div className={styles.planBox}>
            {/* 任务调用卡片 */}
            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <div className={styles.planName}>
                  {translate({
                    message: "PRICING.payAsYouGo.taskExecution.name",
                  })}
                </div>
                <div className={styles.planPrice}>
                  <span className={styles.price}>
                    {translate({
                      message: "PRICING.payAsYouGo.taskExecution.price",
                    })}
                  </span>
                </div>
                <div className={styles.planDescription}>
                  {translate({
                    message: "PRICING.payAsYouGo.taskExecution.description",
                  })}
                </div>
              </div>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.payAsYouGo.taskExecution.feature1",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.payAsYouGo.taskExecution.feature2",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.payAsYouGo.taskExecution.feature3",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* 大语言模型卡片 */}
            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <div className={styles.planName}>
                  {translate({ message: "PRICING.payAsYouGo.llm.name" })}
                </div>
                <div className={styles.planPrice}>
                  <span className={styles.price}>
                    {translate({ message: "PRICING.payAsYouGo.llm.price" })}
                  </span>
                </div>
                <div className={styles.planDescription}>
                  {translate({ message: "PRICING.payAsYouGo.llm.description" })}
                </div>
              </div>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({ message: "PRICING.payAsYouGo.llm.feature1" })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({ message: "PRICING.payAsYouGo.llm.feature2" })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({ message: "PRICING.payAsYouGo.llm.feature3" })}
                  </span>
                </div>
              </div>
            </div>

            {/* 融合 API 卡片 */}
            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <div className={styles.planName}>
                  {translate({ message: "PRICING.payAsYouGo.fusionAPI.name" })}
                </div>
                <div className={styles.planPrice}>
                  <span className={styles.price}>
                    {translate({
                      message: "PRICING.payAsYouGo.fusionAPI.price",
                    })}
                  </span>
                </div>
                <div className={styles.planDescription}>
                  {translate({
                    message: "PRICING.payAsYouGo.fusionAPI.description",
                  })}
                </div>
              </div>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.payAsYouGo.fusionAPI.feature1",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.payAsYouGo.fusionAPI.feature2",
                    })}
                  </span>
                </div>
                <div className={styles.featureItem}>
                  <i className="i-codicon:check" />
                  <span>
                    {translate({
                      message: "PRICING.payAsYouGo.fusionAPI.feature3",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.priceTablesSection}>
            <div className={styles.tableSectionHeader}>
              <div className={styles.tableSectionTitle}>
                {translate({ message: "PRICING.tables.title" })}
              </div>
              <div className={styles.tableSectionSubtitle}>
                {translate({ message: "PRICING.tables.subtitle" })}
              </div>
              <div className={styles.tableSyncNote}>
                {translate({ message: "PRICING.tables.syncNote" })}
              </div>
            </div>

            <div className={styles.tableTabs} role="tablist">
              {tableTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={activePricingTable === tab.key}
                  className={`${styles.tableTab} ${
                    activePricingTable === tab.key ? styles.tableTabActive : ""
                  }`}
                  onClick={() => setActivePricingTable(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className={styles.tablePanel}>
              <div className={styles.tableAlert}>{activeTableAlert}</div>

              {activePricingTable === "llm" ? (
                isLLMLoading ? (
                  <div className={styles.tableStatus}>
                    {translate({ message: "PRICING.tables.llm.loading" })}
                  </div>
                ) : llmLoadFailed ? (
                  <div className={styles.tableStatus}>
                    {translate({ message: "PRICING.tables.llm.error" })}
                  </div>
                ) : (
                  <PriceTable
                    columns={activeTableColumns}
                    rows={activeTableRows}
                    emptyState={activeEmptyState}
                  />
                )
              ) : (
                <PriceTable
                  columns={activeTableColumns}
                  rows={activeTableRows}
                  emptyState={activeEmptyState}
                />
              )}
            </div>
          </div>
        </div>

        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
