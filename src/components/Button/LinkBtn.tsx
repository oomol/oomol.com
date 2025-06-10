import React, { ReactNode } from "react";
import styles from "./LinkBtn.module.scss";
import clsx from "clsx";

export interface LinkBtnProps {
  text: string;
  iconPos: "left" | "right";
  icon: ReactNode | string;
  url?: string;
  className?: string;
}
export default function LinkBtn({
  text,
  iconPos = "left",
  icon,
  url,
  className,
}: LinkBtnProps) {
  return (
    <button
      className={clsx(styles.container, className)}
      onClick={() => url && window.open(url, "_blank")}
    >
      <div
        className={`${styles.linkBtn}
        ${iconPos === "left" ? styles.left : styles.right}`}
      >
        <div className={styles.linkText}>{text}</div>
        {typeof icon === "string" ? (
          <i className={`${icon} ${styles.linkIcon}`} />
        ) : (
          icon
        )}
      </div>
    </button>
  );
}
