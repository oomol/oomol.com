import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

export interface AssetBlockProps {
  width?: number | string;
  height: number | string;
  backgroundColor: string;
  borderColor: string;
  centerType: "svg" | "text";
  centerIcon?: ReactNode | string;
  centerText?: string | ReactNode;
  centerTextColor?: string;
  centerWidth?: number | string;
  centerHeight?: number | string;
  cornerIcon: ReactNode | string;
  linkUrl?: string;
}
export default function AssetBlock({
  width,
  height,
  backgroundColor,
  borderColor,
  centerType,
  centerIcon,
  centerText,
  centerTextColor,
  centerWidth,
  centerHeight,
  cornerIcon,
  linkUrl,
}: AssetBlockProps) {
  return (
    <div
      className={styles.assetBlock}
      style={{
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
    >
      <div
        className={styles.centerContent}
        style={{ maxWidth: centerWidth, height: centerHeight }}
      >
        {centerType === "text" ? (
          <span
            className={styles.centerText}
            style={{ color: centerTextColor }}
          >
            {centerText}
          </span>
        ) : (
          centerIcon
        )}
      </div>
      <div className={styles.cornerIcon}>{cornerIcon}</div>
    </div>
  );
}
