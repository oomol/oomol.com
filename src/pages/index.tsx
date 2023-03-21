import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import undraw_docusaurus_mountain from '@site/static/img/undraw_docusaurus_mountain.svg';

import styles from './index.module.css';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    console.log(siteConfig);
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/intro">
                        Docusaurus Tutorial - 5min ⏱️
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            {/*<HomepageHeader />*/}
            <main>
                <div className={styles.sectionOne}>
                    <div className={styles.sectionOneLeft}>
                        <div>
                            <div>
                                好用的自动化、数据分析工具。
                            </div>
                            <div>
                                使用熟悉的开发语言，丰富的内置工具套件，活跃的社区分享<br/>
                                帮助你轻松完成自动化、数据分析构建工作
                            </div>
                            <div>
                                <button>下载使用</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.sectionOneRight}>
                        {/*<img src={}/>*/}
                    </div>
                </div>
                <div className={styles.sectionTwo}>
                    <div className={styles.sectionTwoLeft}>
                    </div>
                    <div className={styles.sectionTwoRight}>
                        继承 vscode 的全部开发体验<br/>
                        支持可视化 Pipeline 进行逻辑编排<br/>
                        可以同时在一个工具内同时拥有最好的编写和编排体验<br/>
                    </div>
                </div>
                <div className={styles.sectionTwo}>
                    <div className={styles.sectionTwoLeft}>
                        可以用常见的开发语言以及相关的语言库进行数据处理，甚至可以进行跨语言配合。<br/>
                        处理后的数据可以通过内置的图包进行渲染，如果内置的不满足也可以支持社区扩展.<br/>
                        处理数据和图表化显示导出可以在一个工具中获得最好的体验。
                    </div>
                    <div className={styles.sectionTwoRight}>
                    </div>
                </div>
                <div className={styles.sectionTwo}>
                    <div className={styles.sectionTwoLeft}>
                    </div>
                    <div className={styles.sectionTwoRight}>
                        在本地调试通过之后，可以轻松的部署到云端。方便将代码变为高可用的服务。<br/>
                        可以方便的分析给别人使用以及可以长时间大算力的处理数据。<br/>
                        用户可以专注于构建数学模型或者自动化流程，而部署和运维可以交给我们。
                    </div>
                </div>
                <div className={styles.sectionTwo}>
                    <div className={styles.sectionTwoLeft}>
                        我们将支持社区常用的协作开发工具<br/>
                        我们还会提供 Oomol pipeline 功能的开源分享社区，方便大家交流。<br/>
                        让好的想法和创新被更多人看见以及被更多的工程使用。
                    </div>
                    <div className={styles.sectionTwoRight}>
                    </div>
                </div>
                <div className={styles.sectionTwo}>
                    <div className={styles.sectionTwoLeft}>
                    </div>
                    <div className={styles.sectionTwoRight}>
                        编排引擎内核 vocana 开源，支持 vscode 插件<br/>
                        数据使用符合 GDPR 要求<br/>
                        总结：提供安全和值得信赖的生产力工具。
                    </div>
                </div>
                <div className={styles.sectionDownload}>
                    <div className={styles.sectionDownloadCell}>
                        <div>logo</div>
                        <div>MacOS</div>
                    </div>
                    <div className={styles.sectionDownloadCell}>
                        <div>logo</div>
                        <div>Windows</div>
                    </div>
                    <div className={styles.sectionDownloadCell}>
                        <div>logo</div>
                        <div>Linux</div>
                    </div>
                </div>
                {/*<HomepageFeatures/>*/}
            </main>
        </Layout>
    );
}
