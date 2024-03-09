import React from "react";
import Layout from "../../theme/Layout";
import styles from "./styles.module.scss";
import { List } from "antd";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Image from "@theme/ThemedImage";
import { ForkOutlined, StarOutlined } from "@ant-design/icons";

export default function Index() {
  const data = [
    {
      title: "ovm-desktop",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    },
    {
      title: "ovm-core",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    },
    {
      title: "vocana",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    },
    {
      title: "mac-power-monitor",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    },
  ];
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles["mid-box"]}>
          <div className={styles.box}>
            <div className={styles.title}>Open Source Project</div>
            <div className={styles["sub-title"]}>
              Support open source tools and communities.
            </div>
          </div>
          <div className={styles.list}>
            <List
              bordered
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <div style={{ width: "100%" }}>
                    <div className={styles["project-name"]}>
                      <Image
                        width={20}
                        sources={{
                          light: useBaseUrl("img/github.svg"),
                          dark: useBaseUrl("img/github.svg"),
                        }}
                      />
                      <span>{item.title}</span>
                    </div>
                    <div className={styles.description}>{item.description}</div>
                    <div className={styles.source}>
                      <div>oomol/oomol</div>
                      <div className={styles.data}>
                        <div>
                          <span className={styles.cell}>800</span>
                          <ForkOutlined />
                        </div>
                        <div>
                          <span className={styles.cell}>600</span>
                          <StarOutlined />
                        </div>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
