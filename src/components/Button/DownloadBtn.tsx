import React from "react";
import styles from "./DownloadBtn.module.scss";

export default function DownloadBtn({ text }: { text?: string }) {
  return (
    <button className={styles.container}>
      <div className={styles.downloadBtn}>
        <i className={`${styles.downloadIcon} i-codicon:desktop-download`} />
        <div className={styles.downloadText}>{text}</div>
      </div>
    </button>
  );
}
