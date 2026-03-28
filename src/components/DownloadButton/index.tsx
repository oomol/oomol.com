import styles from "./styles.module.scss";

import BrowserOnly from "@docusaurus/BrowserOnly";
import { translate } from "@docusaurus/Translate";
import { DownloadUrl } from "@site/src/download_url";
import { downloadStable } from "@site/src/lib/utils";

import { Button } from "../ui/button";

enum OS {
  Windows = "Windows",
  MacOS = "MacOS",
}

function detectOSAndArchitecture(): OS {
  const userAgent = navigator.userAgent;
  let os = OS.Windows;

  if (userAgent.indexOf("Win") !== -1) {
    os = OS.Windows;
  } else if (userAgent.indexOf("Mac") !== -1) {
    os = OS.MacOS;
  }

  return os;
}

export interface DownloadButtonProps {
  stableTag?: boolean;
  centered?: boolean;
  showNote?: boolean;
  noteTone?: "default" | "inverse";
}

export const DownloadButton = ({
  stableTag,
  centered,
  showNote = true,
  noteTone = "default",
}: DownloadButtonProps) => {
  const downloadIcon = (
    <span className={styles.downloadIconWrap} aria-hidden="true">
      <span className={`i-codicon-desktop-download ${styles.downloadIcon}`} />
    </span>
  );
  const containerClassName = centered
    ? `${styles.downloadContainer} ${styles.centered}`
    : styles.downloadContainer;
  const windowsClassName = centered
    ? `${styles.windowsBox} ${styles.centered}`
    : styles.windowsBox;
  const noteClassName =
    noteTone === "inverse"
      ? `${styles.chipNote} ${styles.inverseNote}`
      : styles.chipNote;
  const windowsSubtitleClassName =
    noteTone === "inverse"
      ? `${styles.windowsSubtitle} ${styles.inverseNote}`
      : styles.windowsSubtitle;

  return (
    <BrowserOnly
      fallback={
        <div className={containerClassName}>
          <Button className={styles.download}>
            {downloadIcon}
            {translate({
              message: stableTag
                ? "HOME.FirstScreen.download-macos-stable"
                : "HOME.FirstScreen.download-macos",
            })}
          </Button>
          {showNote ? (
            <span className={noteClassName}>
              {translate({
                message: "HOME.FirstScreen.download-macos-chip-note",
              })}
            </span>
          ) : null}
        </div>
      }
    >
      {() => {
        return (
          <div className={styles["button-box"]}>
            {detectOSAndArchitecture() === OS.MacOS ? (
              <div className={containerClassName}>
                <Button
                  asChild
                  className={styles.download}
                  onClick={() =>
                    downloadStable(null, DownloadUrl.Stable.MacOS.AppleSilicon)
                  }
                >
                  <a href={DownloadUrl.Stable.MacOS.AppleSilicon}>
                    {downloadIcon}
                    {translate({
                      message: stableTag
                        ? "HOME.FirstScreen.download-macos-stable"
                        : "HOME.FirstScreen.download-macos",
                    })}
                  </a>
                </Button>
                {showNote ? (
                  <span className={noteClassName}>
                    {translate({
                      message: "HOME.FirstScreen.download-macos-chip-note",
                    })}
                  </span>
                ) : null}
              </div>
            ) : (
              <div className={windowsClassName}>
                <Button
                  asChild
                  className={styles.download}
                  onClick={() =>
                    downloadStable(null, DownloadUrl.Stable.Windows.x64)
                  }
                >
                  <a href={DownloadUrl.Stable.Windows.x64}>
                    {downloadIcon}
                    {translate({
                      message: stableTag
                        ? "HOME.FirstScreen.download-windows-stable"
                        : "HOME.FirstScreen.download-windows",
                    })}
                  </a>
                </Button>
                {showNote ? (
                  <span className={windowsSubtitleClassName}>
                    {translate({
                      message: "HOME.FirstScreen.download-windows-subtitle",
                    })}
                  </span>
                ) : null}
              </div>
            )}
          </div>
        );
      }}
    </BrowserOnly>
  );
};
