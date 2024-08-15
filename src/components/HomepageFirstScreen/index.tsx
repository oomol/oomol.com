import React from "react";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Button, Tag } from "@arco-design/web-react";
import { IconDownload } from "@arco-design/web-react/icon";

const data = {
  slogan: "Workflow-based data processing IDE.",
  script:
    "OOMOL makes it easy to connect code snippets and API services through intuitive visual interactions.",
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
  return (
    <div className={styles.sectionOne}>
      <div className={styles.sectionOneBox}>
        <div className={styles.sectionOneMid}>
          <div className={styles.sectionOneText}>
            <div className={styles.sectionOneTextBox}>
              <div className={styles.sectionOneTextTitle}>{data.slogan}</div>
              <div className={styles.sectionOneTextInner}>{data.script}</div>
              <div className={styles.sectionOneBtnBox}>
                <Button
                  className={styles.sectionOneBtn}
                  href={"https://console.oomol.com/"}
                  target="_blank"
                  type="primary"
                  size="large"
                  shape="round"
                  icon={<IconDownload />}
                >
                  Download for {detectOSAndArchitecture()}
                  <Tag style={{ marginLeft: 8 }}>{supportsM1WebAssembly()}</Tag>
                </Button>
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
