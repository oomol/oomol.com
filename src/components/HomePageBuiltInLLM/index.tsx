import styles from "./styles.module.scss";

import ClaudeSVG from "@site/static/img/pages/home/claude.svg";
import ClaudeLightHighSVG from "@site/static/img/pages/home/claude-highlight.svg";
import OpenAISVG from "@site/static/img/pages/home/openai.svg";
import OpenAILightHighSVG from "@site/static/img/pages/home/openai-highlight.svg";
import DoubaoSVG from "@site/static/img/pages/home/doubao.svg";
import DoubaoLightHighSVG from "@site/static/img/pages/home/doubao-highlight.svg";
import GrokSVG from "@site/static/img/pages/home/grok.svg";
import GrokLightHighSVG from "@site/static/img/pages/home/grok-highlight.svg";
import GeminiSVG from "@site/static/img/pages/home/gemini.svg";
import GeminiLightHighSVG from "@site/static/img/pages/home/gemini-highlight.svg";
import MistralAISVG from "@site/static/img/pages/home/mistralai.svg";
import MistralAILightHighSVG from "@site/static/img/pages/home/mistralai-highlight.svg";
import QwenSVG from "@site/static/img/pages/home/qwen.svg";
import QwenLightHighSVG from "@site/static/img/pages/home/qwen-highlight.svg";
import DeepSeekSVG from "@site/static/img/pages/home/deepseek.svg";
import DeepSeekLightHighSVG from "@site/static/img/pages/home/deepseek-highlight.svg";

import { memo } from "react";
import { translate } from "@docusaurus/Translate";

const llmData = [
  {
    defaultIcon: <ClaudeSVG />,
    hoverIcon: <ClaudeLightHighSVG />,
  },
  {
    defaultIcon: <OpenAISVG />,
    hoverIcon: <OpenAILightHighSVG />,
  },
  {
    defaultIcon: <GeminiSVG />,
    hoverIcon: <GeminiLightHighSVG />,
  },
  {
    defaultIcon: <DoubaoSVG />,
    hoverIcon: <DoubaoLightHighSVG />,
  },
  {
    defaultIcon: <DeepSeekSVG />,
    hoverIcon: <DeepSeekLightHighSVG />,
  },
  {
    defaultIcon: <QwenSVG />,
    hoverIcon: <QwenLightHighSVG />,
  },
  {
    defaultIcon: <GrokSVG />,
    hoverIcon: <GrokLightHighSVG />,
  },
  {
    defaultIcon: <MistralAISVG />,
    hoverIcon: <MistralAILightHighSVG />,
  },
];

const LLMItemComponent = memo(
  ({
    defaultIcon = <ClaudeSVG />,
    hoverIcon = <ClaudeLightHighSVG />,
    className,
  }: {
    defaultIcon?: React.ReactNode;
    hoverIcon?: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={`${styles.llmItem} ${className || ""}`}>
        <div className={styles.iconWrapper}>
          <div className={styles.defaultIconWrapper}>{defaultIcon}</div>
          <div className={styles.hoverIconWrapper}>{hoverIcon}</div>
        </div>
      </div>
    );
  }
);

LLMItemComponent.displayName = "LLMItem";

export const LLMItem = LLMItemComponent;

export default function HomePageBuiltInLLM() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          {translate({ id: "HOME.Built-in.title" })}
        </h2>
        <p className={styles.subtitle}>
          {translate({ id: "HOME.Built-in.subtitle" })}
        </p>
      </div>
      <div className={styles.llmList}>
        {llmData.map((item, index) => (
          <LLMItem
            key={index}
            defaultIcon={item.defaultIcon}
            hoverIcon={item.hoverIcon}
          />
        ))}
      </div>
    </div>
  );
}
