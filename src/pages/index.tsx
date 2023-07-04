import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { Analytics } from "@vercel/analytics/react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import styles from "./index.module.css";
import Image from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Translate, { translate } from "@docusaurus/Translate";
import { Button } from 'antd';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  console.log(siteConfig);
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      {/*<HomepageHeader />*/}
      <main>
        <div className={styles.sectionOne}>
          <div className={styles.sectionOneBox}>
            <div className={styles.sectionOneSide}>
              <Image
                  style={{ width: 380, marginRight: 88 }}
                  sources={{
                    light: useBaseUrl("/img/side_left.svg"),
                    dark: useBaseUrl("/img/side_left.svg"),
                  }}
              />
            </div>
            <div className={styles.sectionOneMid}>
              <div className={styles.sectionOneText}>
                <div className={styles.sectionOneTextBox}>
                  <div className={styles.sectionOneTextTitle}>
                    <Translate>
                      A powerful automation and data analysis tool
                    </Translate>
                  </div>
                  <div className={styles.sectionOneTextInner}>
                    <Translate>
                      Using familiar programming languages, a rich set of built-in
                      toolkits, and an active community sharing resources, it
                      helps you effortlessly accomplish automation and data
                      analysis tasks.
                    </Translate>
                    <Translate>
                      Assisting you in effortlessly accomplishing automation and
                      data analysis tasks.
                    </Translate>
                  </div>
                  {/*<div className={styles.sectionOneTextBtn}>*/}

                  {/*</div>*/}
                  <Button type="primary">
                    <Translate>Download</Translate>
                  </Button>
                </div>
              </div>
              <div className={styles.sectionOneImageBox}>
                <Image
                    className={styles.sectionOneImage}
                    sources={{
                      light: useBaseUrl("/img/oomol_studio.png"),
                      dark: useBaseUrl("/img/oomol_studio.png"),
                    }}
                />
              </div>
            </div>
            <div className={styles.sectionOneSide}>
              <Image
                  style={{ width: 380, marginLeft: 88 }}
                  sources={{
                    light: useBaseUrl("/img/side_right.svg"),
                    dark: useBaseUrl("/img/side_right.svg"),
                  }}
              />
            </div>
          </div>
        </div>
        <div className={styles.scenes}>
          <div className={styles.sectionTitle}>提高效率的使用场景</div>
          <div className={styles.sectionInner}>
            <div className={styles.sectionCell}>
              <div className={styles.scenesImage}></div>
              <div>AI 场景支持</div>
              <div>
                内置 Python、R、 JavaScript 等语言环境以及相应的数据分析库
              </div>
            </div>
            <div className={styles.sectionCell}>
              <div className={styles.scenesImage}></div>
              <div>数据处理场景</div>
              <div>原生支持 Langchain, 并且内置各种 AI 服务套件 </div>
            </div>
            <div className={styles.sectionCell}>
              <div className={styles.scenesImage}></div>
              <div>AI 系统的扩展和部署</div>
              <div>原生支持 Langchain, 并且内置各种 AI 服务套件 </div>
            </div>
          </div>
        </div>
        <div className={styles.sectionTwo}>
          <div className={styles.sectionTitle}>产品设计的优越性</div>
          <div className={styles.sectionTwoBox}>
            <div className={styles.sectionTwoSmall}>
              <Image
                style={{ width: 300 }}
                sources={{
                  light: useBaseUrl("/img/workflow.svg"),
                  dark: useBaseUrl("/img/workflow.svg"),
                }}
              />
            </div>
            <div className={styles.sectionTwoLarge}>
              <div className={styles.sectionTwoLargeBox}>
                <div className={styles.sectionTwoLargeTitle}>
                  代码编写 & 工作流编排
                </div>
                <div className={styles.sectionTwoLargeInner}>
                  继承 vscode 的完善编程体验，同时支持可视化 Workflow
                  进行逻辑编排。
                  可以同时在一个工具内同时拥有最好的编写和编排体验。
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.sectionTwo}>
          <div className={styles.sectionTwoBox}>
            <div className={styles.sectionTwoLarge}>
              <div className={styles.sectionTwoLargeBox}>
                <div className={styles.sectionTwoLargeTitle}>
                  多语言 & 数据处理、渲染
                </div>
                <div className={styles.sectionTwoLargeInner}>
                  可以用常见的开发语言以及相关的语言库进行数据处理，甚至可以进行跨语言配合。
                  处理后的数据可以通过内置的图包进行渲染，如果内置的不满足也可以支持社区扩展。
                  处理数据和图表化显示导出可以在一个工具中获得最好的体验。
                </div>
              </div>
            </div>
            <div className={styles.sectionTwoSmall}>
              <Image
                style={{ width: 360 }}
                sources={{
                  light: useBaseUrl("/img/data.svg"),
                  dark: useBaseUrl("/img/data.svg"),
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.sectionTwo}>
          <div className={styles.sectionTwoBox}>
            <div className={styles.sectionTwoSmall}>
              <Image
                style={{ width: 360 }}
                sources={{
                  light: useBaseUrl("/img/interactive.svg"),
                  dark: useBaseUrl("/img/interactive.svg"),
                }}
              />
            </div>
            <div className={styles.sectionTwoLarge}>
              <div className={styles.sectionTwoLargeBox}>
                <div className={styles.sectionTwoLargeTitle}>
                  协作 & 管理 & 分享
                </div>
                <div className={styles.sectionTwoLargeInner}>
                  原生支持社区常用的协作开发工具 git 管理项目。 提供 Oomol
                  Workflow 功能的开源分享社区，方便开发者交流。
                  让好的想法和创新被更多人看见以及被更多的工程使用。
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.sectionTwo}>
          <div className={styles.sectionTwoBox}>
            <div className={styles.sectionTwoLarge}>
              <div className={styles.sectionTwoLargeBox}>
                <div className={styles.sectionTwoLargeTitle}>本地 & 云端</div>
                <div className={styles.sectionTwoLargeInner}>
                  本地使用更加安全、轻量和经济。
                  云端部署可以很方便地分享给他人使用，且支持长时间大算力的处理数据。
                  使用 Oomol Studio
                  本地调试通过之后可以轻松的部署到云端，将调试脚本变为高可用的服务。
                  用户可以专注于构建数学模型以及自动化流程，而部署和运维可以交给我们。
                </div>
              </div>
            </div>
            <div className={styles.sectionTwoSmall}>
              <Image
                style={{ width: 360 }}
                sources={{
                  light: useBaseUrl("/img/cloud.svg"),
                  dark: useBaseUrl("/img/cloud.svg"),
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.sectionTwo}>
          <div className={styles.sectionTwoBox}>
            <div className={styles.sectionTwoSmall}>
              <Image
                style={{ width: 320 }}
                sources={{
                  light: useBaseUrl("/img/opensource.svg"),
                  dark: useBaseUrl("/img/opensource.svg"),
                }}
              />
            </div>
            <div className={styles.sectionTwoLarge}>
              <div className={styles.sectionTwoLargeBox}>
                <div className={styles.sectionTwoLargeTitle}>
                  内核开源 & 数据安全
                </div>
                <div className={styles.sectionTwoLargeInner}>
                  编排引擎内核 vocana 开源，支持基于 vscode 插件使用。
                  数据使用符合 GDPR 要求。 提供安全和值得信赖的生产力工具。
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.sectionDownload}>
          <div className={styles.sectionDownloadCellBox}>
            <div className={styles.sectionDownloadCell}>
              <Image
                style={{ width: 80 }}
                sources={{
                  light: useBaseUrl("/img/windows.svg"),
                  dark: useBaseUrl("/img/windows.svg"),
                }}
              />
            </div>
            <div className={styles.sectionDownloadBtn}>
              <Image
                style={{ width: 14 }}
                sources={{
                  light: useBaseUrl("/img/download.svg"),
                  dark: useBaseUrl("/img/download.svg"),
                }}
              />
              <span style={{ marginLeft: 8 }}>Windows</span>
            </div>
          </div>
          <div className={styles.sectionDownloadCellBox}>
            <div className={styles.sectionDownloadCell}>
              <Image
                style={{ width: 120 }}
                sources={{
                  light: useBaseUrl("/img/linux.svg"),
                  dark: useBaseUrl("/img/linux.svg"),
                }}
              />
            </div>
            <div className={styles.sectionDownloadBtn}>
              <Image
                style={{ width: 14 }}
                sources={{
                  light: useBaseUrl("/img/download.svg"),
                  dark: useBaseUrl("/img/download.svg"),
                }}
              />
              <span style={{ marginLeft: 8 }}>Linux</span>
            </div>
          </div>
          <div className={styles.sectionDownloadCellBox}>
            <div className={styles.sectionDownloadCell}>
              <Image
                style={{ width: 100 }}
                sources={{
                  light: useBaseUrl("/img/macos.svg"),
                  dark: useBaseUrl("/img/macos.svg"),
                }}
              />
            </div>
            <div className={styles.sectionDownloadBtn}>
              <Image
                style={{ width: 14 }}
                sources={{
                  light: useBaseUrl("/img/download.svg"),
                  dark: useBaseUrl("/img/download.svg"),
                }}
              />
              <span style={{ marginLeft: 8 }}>MacOS</span>
            </div>
          </div>
        </div>
        <Analytics />
      </main>
    </Layout>
  );
}
