import styles from "./AuroraText.module.scss";

import React, { memo } from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

export const AuroraText = memo(
  ({
    children,
    className = "",
    colors = ["#7D7FE9", "#FFFFFF", "#7DE993", "#FFFFFF"],
    speed = 1,
  }: AuroraTextProps) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
        colors[0]
      })`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`,
    };

    return (
      <h2 className={`relative inline-block ${className}`}>
        <span className="sr-only">{children}</span>
        <span
          className={`relative ${styles.auroraText} bg-[length:200%_auto] bg-clip-text text-transparent`}
          style={gradientStyle}
          aria-hidden="true"
        >
          {children}
        </span>
      </h2>
    );
  }
);
