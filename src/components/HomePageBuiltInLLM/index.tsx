import styles from "./styles.module.scss";

import ClaudeSVG from "@site/static/img/pages/home/claude.svg";
import ClaudeLightHighSVG from "@site/static/img/pages/home/claude-highlight.svg";
import OpenAISVG from "@site/static/img/pages/home/openai.svg";
import OpenAILightHighSVG from "@site/static/img/pages/home/openai-highlight.svg";
import OpenAIDarkHighSVG from "@site/static/img/pages/home/openai-dark-highlight.svg";
import DoubaoSVG from "@site/static/img/pages/home/doubao.svg";
import DoubaoLightHighSVG from "@site/static/img/pages/home/doubao-highlight.svg";
import GrokSVG from "@site/static/img/pages/home/grok.svg";
import GrokLightHighSVG from "@site/static/img/pages/home/grok-highlight.svg";
import GrokDarkHighSVG from "@site/static/img/pages/home/grok-dark-highlight.svg";
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
import { useColorMode } from "@docusaurus/theme-common";
import CodeExample from "./CodeExample";

const llmData = [
  {
    defaultIcon: <ClaudeSVG />,
    lightHoverIcon: <ClaudeLightHighSVG />,
    darkHoverIcon: <ClaudeLightHighSVG />,
  },
  {
    defaultIcon: <OpenAISVG />,
    lightHoverIcon: <OpenAIDarkHighSVG />,
    darkHoverIcon: <OpenAILightHighSVG />,
  },
  {
    defaultIcon: <GeminiSVG />,
    lightHoverIcon: <GeminiLightHighSVG />,
    darkHoverIcon: <GeminiLightHighSVG />,
  },
  {
    defaultIcon: <DoubaoSVG />,
    lightHoverIcon: <DoubaoLightHighSVG />,
    darkHoverIcon: <DoubaoLightHighSVG />,
  },
  {
    defaultIcon: <DeepSeekSVG />,
    lightHoverIcon: <DeepSeekLightHighSVG />,
    darkHoverIcon: <DeepSeekLightHighSVG />,
  },
  {
    defaultIcon: <QwenSVG />,
    lightHoverIcon: <QwenLightHighSVG />,
    darkHoverIcon: <QwenLightHighSVG />,
  },
  {
    defaultIcon: <GrokSVG />,
    lightHoverIcon: <GrokDarkHighSVG />,
    darkHoverIcon: <GrokLightHighSVG />,
  },
  {
    defaultIcon: <MistralAISVG />,
    lightHoverIcon: <MistralAILightHighSVG />,
    darkHoverIcon: <MistralAILightHighSVG />,
  },
];

const LLMItemComponent = memo(
  ({
    defaultIcon = <ClaudeSVG />,
    lightHoverIcon = <ClaudeLightHighSVG />,
    darkHoverIcon = <ClaudeLightHighSVG />,
    className,
  }: {
    defaultIcon?: React.ReactNode;
    lightHoverIcon?: React.ReactNode;
    darkHoverIcon?: React.ReactNode;
    className?: string;
  }) => {
    const { colorMode } = useColorMode();
    const hoverIcon = colorMode === "dark" ? darkHoverIcon : lightHoverIcon;

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
            lightHoverIcon={item.lightHoverIcon}
            darkHoverIcon={item.darkHoverIcon}
          />
        ))}
      </div>
      <CodeExample />
    </div>
  );
}
