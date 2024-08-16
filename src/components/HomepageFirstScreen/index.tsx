import React from "react";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Button, Popover, Tag } from "@arco-design/web-react";
import { IconDown, IconDownload } from "@arco-design/web-react/icon";
import content from "@arco-design/web-react/es/Layout/content";
const ButtonGroup = Button.Group;

import Translate, { translate } from "@docusaurus/Translate";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const data = {
  slogan: translate({
    message: "HOME.FirstScreen.slogan",
  }),
  script: translate({
    message: "HOME.FirstScreen.script",
  }),
};

enum Platform {
  ARM = "Apple Silicon",
  X64 = "Intel Chip",
}
enum OS {
  Windows = "Windows",
  MacOS = "MacOS",
}
function supportsM1WebAssembly(): Platform {
  try {
    // 创建一个WebAssembly实例，检查是否可以成功实例化
    const module = new WebAssembly.Module(
      Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x1, 0x0, 0x0, 0x0)
    );
    new WebAssembly.Instance(module);
    return Platform.ARM;
  } catch (e) {
    return Platform.X64;
  }
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

export default function HomepageFirstScreen() {
  const context: any = useDocusaurusContext();
  const { i18n } = context;
  console.log("i18n >>>> ", i18n.currentLocale);

  const content = (
    <div className={styles.popoverBox}>
      <div className={styles.popoverBtn}>
        <IconDownload style={{ marginLeft: 8 }} />
        <span style={{ marginLeft: 8 }}>Intel Chip</span>
      </div>
      <div className={styles.popoverBtn}>
        <IconDownload style={{ marginLeft: 8 }} />
        <span style={{ marginLeft: 8 }}>Apple Silicon</span>
      </div>
    </div>
  );
  return (
    <div className={styles.sectionOne}>
      <div className={styles.sectionOneBox}>
        <div className={styles.sectionOneMid}>
          <div className={styles.sectionOneText}>
            <div className={styles.sectionOneTextBox}>
              <div className={styles.sectionOneTextTitle}>{data.slogan}</div>
              <div className={styles.sectionOneTextInner}>{data.script}</div>
              <div className={styles.sectionOneBtnBox}>
                {detectOSAndArchitecture() === OS.MacOS ? (
                  <Popover position="bottom" content={content}>
                    <Button
                      className={styles.sectionOneBtn}
                      type="primary"
                      size="large"
                      icon={<IconDownload />}
                    >
                      Download for MacOS
                      <IconDown />
                    </Button>
                  </Popover>
                ) : (
                  <div className={styles.windowsBox}>
                    <Button
                      className={styles.sectionOneBtn}
                      type="primary"
                      size="large"
                      icon={<IconDownload />}
                    >
                      Download for Windows
                    </Button>
                    <span className={styles.windowsSubtitle}>
                      only supports x64
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.sectionOneImageBox}>
            <Image
              className={styles.sectionOneImage}
              sources={{
                light: useBaseUrl("/img/oomol_studio.jpeg"),
                dark: useBaseUrl("/img/oomol_studio.jpeg"),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
