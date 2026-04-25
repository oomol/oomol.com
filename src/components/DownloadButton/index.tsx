import styles from "./styles.module.scss";

import BrowserOnly from "@docusaurus/BrowserOnly";
import { translate } from "@docusaurus/Translate";
import { DownloadUrl } from "@site/src/download_url";
import { cn, downloadStable } from "@site/src/lib/utils";

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
  showIcon?: boolean;
  showNote?: boolean;
  noteTone?: "default" | "inverse";
  /** `default` (40px) matches pricing subscribe CTAs; `lg` (48px) for hero sections. */
  buttonSize?: "default" | "lg";
  /** Stretch to parent width (e.g. pricing cards next to full-width Subscribe). */
  fullWidth?: boolean;
  /** Stretch to parent width only on small screens. */
  mobileFullWidth?: boolean;
  /** Merged onto the primary Button / link (e.g. pricing `planCta`). */
  className?: string;
  texts?: Partial<{
    macos: string;
    macosStable: string;
    macosNote: string;
    windows: string;
    windowsStable: string;
    windowsSubtitle: string;
  }>;
}

export const DownloadButton = ({
  stableTag,
  centered,
  showIcon = true,
  showNote = true,
  noteTone = "default",
  buttonSize = "lg",
  fullWidth = false,
  mobileFullWidth = false,
  className,
  texts,
}: DownloadButtonProps) => {
  const downloadIcon = (
    <span className={styles.downloadIconWrap} aria-hidden="true">
      <span className={`i-codicon-desktop-download ${styles.downloadIcon}`} />
    </span>
  );
  const renderedIcon = showIcon ? downloadIcon : null;
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
  const macosLabel =
    texts?.macos ??
    translate({
      message: "HOME.FirstScreen.download-macos",
    });
  const macosStableLabel =
    texts?.macosStable ??
    translate({
      message: "HOME.FirstScreen.download-macos-stable",
    });
  const macosNote =
    texts?.macosNote ??
    translate({
      message: "HOME.FirstScreen.download-macos-chip-note",
    });
  const windowsLabel =
    texts?.windows ??
    translate({
      message: "HOME.FirstScreen.download-windows",
    });
  const windowsStableLabel =
    texts?.windowsStable ??
    translate({
      message: "HOME.FirstScreen.download-windows-stable",
    });
  const windowsSubtitle =
    texts?.windowsSubtitle ??
    translate({
      message: "HOME.FirstScreen.download-windows-subtitle",
    });
  const size = buttonSize;
  const downloadClassName = cn(
    size === "default"
      ? `${styles.download} ${styles.downloadCompact}`
      : styles.download,
    className
  );
  const stackStretchClass = fullWidth ? styles.stackFullWidth : "";
  const mobileStackStretchClass = mobileFullWidth
    ? styles.mobileStackFullWidth
    : "";
  const outerBoxClass = fullWidth
    ? `${styles["button-box"]} ${styles.buttonBoxFullWidth} ${mobileStackStretchClass}`.trim()
    : `${styles["button-box"]} ${mobileStackStretchClass}`.trim();
  const macWindowsShellClass = [
    containerClassName,
    stackStretchClass,
    mobileStackStretchClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <BrowserOnly
      fallback={
        <div className={macWindowsShellClass}>
          <Button size={size} className={downloadClassName}>
            {renderedIcon}
            {stableTag ? macosStableLabel : macosLabel}
          </Button>
          {showNote ? <span className={noteClassName}>{macosNote}</span> : null}
        </div>
      }
    >
      {() => {
        return (
          <div className={outerBoxClass}>
            {detectOSAndArchitecture() === OS.MacOS ? (
              <div className={macWindowsShellClass}>
                <Button
                  asChild
                  size={size}
                  className={downloadClassName}
                  onClick={() =>
                    downloadStable(null, DownloadUrl.Stable.MacOS.AppleSilicon)
                  }
                >
                  <a href={DownloadUrl.Stable.MacOS.AppleSilicon}>
                    {renderedIcon}
                    {stableTag ? macosStableLabel : macosLabel}
                  </a>
                </Button>
                {showNote ? (
                  <span className={noteClassName}>{macosNote}</span>
                ) : null}
              </div>
            ) : (
              <div
                className={
                  [
                    windowsClassName,
                    fullWidth ? styles.stackFullWidth : "",
                    mobileFullWidth ? styles.mobileStackFullWidth : "",
                  ]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                <Button
                  asChild
                  size={size}
                  className={downloadClassName}
                  onClick={() =>
                    downloadStable(null, DownloadUrl.Stable.Windows.x64)
                  }
                >
                  <a href={DownloadUrl.Stable.Windows.x64}>
                    {renderedIcon}
                    {stableTag ? windowsStableLabel : windowsLabel}
                  </a>
                </Button>
                {showNote ? (
                  <span className={windowsSubtitleClassName}>
                    {windowsSubtitle}
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
