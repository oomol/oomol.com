import { DownloadUrl } from "@site/src/download_url";
import styles from "./styles.module.scss";
import { Popover } from "../Popover";
import { Button } from "../Button";
import { translate } from "@docusaurus/Translate";
import { downloadStable } from "@site/src/lib/utils";
import BrowserOnly from "@docusaurus/BrowserOnly";

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

const content = (
  <div className={styles.popoverBox}>
    <a download href={DownloadUrl.Stable.MacOS.AppleSilicon}>
      <div
        className={styles.popoverLink}
        onClick={event =>
          downloadStable(event, DownloadUrl.Stable.MacOS.AppleSilicon)
        }
      >
        <div className={`${styles.icon} i-ic-baseline-apple`} />
        <span style={{ marginLeft: 8 }}>Apple Silicon</span>
      </div>
    </a>
    <a
      download
      href={DownloadUrl.Stable.MacOS.Intel}
      onClick={event => downloadStable(event, DownloadUrl.Stable.MacOS.Intel)}
    >
      <div className={styles.popoverLink}>
        <div className={`${styles.icon} i-file-icons-intel`} />
        <span style={{ marginLeft: 8 }}>Intel Chip</span>
      </div>
    </a>
  </div>
);

export interface DownloadButtonProps {
  stableTag?: boolean;
}

export const DownloadButton = ({ stableTag }: DownloadButtonProps) => {
  return (
    <BrowserOnly
      fallback={
        <Button
          className={styles.download}
          icon={
            <div
              className="i-codicon-desktop-download"
              style={{ fontSize: 18 }}
            />
          }
        >
          {translate({
            message: stableTag
              ? "HOME.FirstScreen.download-macos-stable"
              : "HOME.FirstScreen.download-macos",
          })}
        </Button>
      }
    >
      {() => {
        return (
          <div className={styles["button-box"]}>
            {detectOSAndArchitecture() === OS.MacOS ? (
              <Popover
                trigger={
                  <Button
                    className={styles.download}
                    icon={
                      <div
                        className="i-codicon-desktop-download"
                        style={{ fontSize: 18 }}
                      />
                    }
                  >
                    {translate({
                      message: stableTag
                        ? "HOME.FirstScreen.download-macos-stable"
                        : "HOME.FirstScreen.download-macos",
                    })}
                  </Button>
                }
                content={content}
              />
            ) : (
              <div className={styles.windowsBox}>
                <Button
                  className={styles.download}
                  onClick={() =>
                    downloadStable(null, DownloadUrl.Stable.Windows.x64)
                  }
                  href={DownloadUrl.Stable.Windows.x64}
                  icon={
                    <div
                      className="i-codicon-desktop-download"
                      style={{ fontSize: 18 }}
                    />
                  }
                >
                  {translate({
                    message: stableTag
                      ? "HOME.FirstScreen.download-windows-stable"
                      : "HOME.FirstScreen.download-windows",
                  })}
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
