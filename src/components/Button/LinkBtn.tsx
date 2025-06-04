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
  const handleClick = () => {
    if (url) {
      window.open(url, "_blank");
    }
  };
  return (
    <button className={clsx(styles.container, className)} onClick={handleClick}>
      <div
        className={`${styles.linkBtn}
        ${iconPos === "left" ? styles.left : styles.right}`}
      >
        <div className={styles.linkText}>{text}</div>
        <span className={styles.linkIcon}>
          {typeof icon === "string" ? <i className={`${icon}`} /> : icon}
        </span>
      </div>
    </button>
  );
}
