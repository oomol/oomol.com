import React from "react";
import styles from "./styles.module.scss";

export default function HomepageStarter() {
  return (
    <div className={styles.sectionStarter}>
      <img src="/img/logo.svg" alt="logo" />
      <div className={styles.title}>Start creating today</div>
      <div className={styles.inner}>
        Whether you’re new to Oomol or back to see what’s new, we’ll have you
        set up and ready to do your best work in minutes.
      </div>
      <button
      // href="https://console.oomol.com/"
      // target="_blank"
      // size={"large"}
      >
        Download
      </button>
    </div>
  );
}
