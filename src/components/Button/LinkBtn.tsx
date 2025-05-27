import React from "react";
import styles from "./LinkBtn.module.scss";

export interface LinkBtnProps {
  text: string;
  iconPos: "left" | "right";
  icon: string;
  url: string;
}
export default function LinkBtn({
  text,
  iconPos = "left",
  icon,
  url,
}: LinkBtnProps) {
  return (
    <button
      className={styles.container}
      onClick={() => window.open(url, "_blank")}
    >
      <div
        className={`${styles.linkBtn}
        ${iconPos === "left" ? styles.left : styles.right}`}
      >
        <div className={styles.linkText}>{text}</div>
        <i className={`${styles.linkIcon} ${icon}`} />
      </div>
    </button>
  );
}
