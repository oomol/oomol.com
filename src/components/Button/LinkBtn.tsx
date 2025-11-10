import React, { ReactNode } from "react";
import styles from "./LinkBtn.module.scss";
import clsx from "clsx";

export interface LinkBtnProps {
  text: string;
  icon: ReactNode | string;
  url?: string;
  className?: string;
}
export default function LinkBtn({
  text,
  icon,
  url,
  className,
}: LinkBtnProps) {
  return (
    <button
      className={clsx(styles.container, className)}
      onClick={() => url && window.open(url, "_blank")}
    >
      <div className={styles.linkBtn}>
        {typeof icon === "string" ? (
          <i className={`${icon} ${styles.linkIcon}`} />
        ) : (
          <span className={styles.linkIcon}>{icon}</span>
        )}
        <div className={styles.linkText}>{text}</div>
      </div>
    </button>
  );
}
