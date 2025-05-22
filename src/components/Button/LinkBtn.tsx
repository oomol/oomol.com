import React from "react";
import styles from "./LinkBtn.module.scss";

export interface LinkBtnProps {
  text: string;
  position?: "left" | "right";
  iconType?: string;
  url: string;
}
export default function LinkBtn({
  text,
  position = "left",
  iconType,
  url,
}: LinkBtnProps) {
  return (
    <button
      className={styles.container}
      onClick={() => window.open(url, "_blank")}
    >
      <div
        className={
          position === "left" ? styles["linkBtn-left"] : styles["linkBtn-right"]
        }
      >
        <div className={styles.linkText}>{text}</div>
        <i className={`${styles.linkIcon} i-codicon:${iconType}`} />
      </div>
    </button>
  );
}
