import styles from "./AuroraText.module.scss";

import { useColorMode } from "@docusaurus/theme-common";
import React, { memo } from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  lightColors?: string[];
  speed?: number;
}

const AuroraTextComponent = memo(
  ({
    children,
    className = "",
    colors,
    lightColors,
    speed = 1,
  }: AuroraTextProps) => {
    const { colorMode } = useColorMode();

    // 默认的暗色模式颜色和亮色模式颜色
    const defaultDarkColors = ["#7D7FE9", "#FFFFFF", "#7DE993", "#FFFFFF"];
    const defaultLightColors = ["#4C1D95", "#1E293B", "#059669", "#1E293B"];

    // 根据主题选择颜色
    const selectedColors =
      colorMode === "light"
        ? lightColors || defaultLightColors
        : colors || defaultDarkColors;

    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${selectedColors.join(", ")}, ${
        selectedColors[0]
      })`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`,
    };

    return (
      <span className={`relative inline-block ${className}`}>
        <span className="sr-only">{children}</span>
        <span
          className={`relative ${styles.auroraText} bg-[length:200%_auto] bg-clip-text text-transparent`}
          style={gradientStyle}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    );
  }
);

AuroraTextComponent.displayName = "AuroraText";

export const AuroraText = AuroraTextComponent;
