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
}

export const DownloadButton = ({ stableTag }: DownloadButtonProps) => {
  return (
    <BrowserOnly
      fallback={
        <div className={styles.downloadContainer}>
          <Button className={styles.download}>
            <div
              className="i-codicon-desktop-download"
              style={{ fontSize: 18 }}
            />
            {translate({
              message: stableTag
                ? "HOME.FirstScreen.download-macos-stable"
                : "HOME.FirstScreen.download-macos",
            })}
          </Button>
          <span className={styles.chipNote}>
            {translate({
              message: "HOME.FirstScreen.download-macos-chip-note",
            })}
          </span>
        </div>
      }
    >
      {() => {
        return (
          <div className={styles["button-box"]}>
            {detectOSAndArchitecture() === OS.MacOS ? (
              <div className={styles.downloadContainer}>
                <Button
                  asChild
                  className={styles.download}
                  onClick={() =>
                    downloadStable(null, DownloadUrl.Stable.MacOS.AppleSilicon)
                  }
                >
                  <a href={DownloadUrl.Stable.MacOS.AppleSilicon}>
                    <div
                      className="i-codicon-desktop-download"
                      style={{ fontSize: 18 }}
                    />
                    {translate({
                      message: stableTag
                        ? "HOME.FirstScreen.download-macos-stable"
                        : "HOME.FirstScreen.download-macos",
                    })}
                  </a>
                </Button>
                <span className={styles.chipNote}>
                  {translate({
                    message: "HOME.FirstScreen.download-macos-chip-note",
                  })}
                </span>
              </div>
            ) : (
              <div className={styles.windowsBox}>
                <Button
                  asChild
                  className={styles.download}
                  onClick={() =>
                    downloadStable(null, DownloadUrl.Stable.Windows.x64)
                  }
                >
                  <a href={DownloadUrl.Stable.Windows.x64}>
                    <div
                      className="i-codicon-desktop-download"
                      style={{ fontSize: 18 }}
                    />
                    {translate({
                      message: stableTag
                        ? "HOME.FirstScreen.download-windows-stable"
                        : "HOME.FirstScreen.download-windows",
                    })}
                  </a>
                </Button>
                <span className={styles.windowsSubtitle}>
                  {translate({
                    message: "HOME.FirstScreen.download-windows-subtitle",
                  })}
                </span>
              </div>
            )}
          </div>
        );
      }}
    </BrowserOnly>
  );
};
