import React from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.scss';

interface ComparisonRow {
  feature: string;
  others: 'no' | 'limited' | 'yes';
  oomol: string;
}

export default function HomepageWhyOomol(): React.ReactElement {
  const comparisonData: ComparisonRow[] = [
    {
      feature: translate({ id: 'HOME.WhyOomol.feature1', message: '自己构建函数' }),
      others: 'no',
      oomol: translate({ id: 'HOME.WhyOomol.oomol1', message: 'Block = 函数,可生成' }),
    },
    {
      feature: translate({ id: 'HOME.WhyOomol.feature2', message: '组合函数 → 新 API' }),
      others: 'limited',
      oomol: translate({ id: 'HOME.WhyOomol.oomol2', message: '完整工作流构建' }),
    },
    {
      feature: translate({ id: 'HOME.WhyOomol.feature3', message: '本地 GPU 运行' }),
      others: 'no',
      oomol: translate({ id: 'HOME.WhyOomol.oomol3', message: '支持 WSL2 + NVIDIA' }),
    },
    {
      feature: translate({ id: 'HOME.WhyOomol.feature4', message: '本地部署 + 云部署' }),
      others: 'no',
      oomol: translate({ id: 'HOME.WhyOomol.oomol4', message: '一体化' }),
    },
    {
      feature: translate({ id: 'HOME.WhyOomol.feature5', message: 'MCP 工具生成' }),
      others: 'no',
      oomol: translate({ id: 'HOME.WhyOomol.oomol5', message: '原生支持' }),
    },
    {
      feature: translate({ id: 'HOME.WhyOomol.feature6', message: '真正开发者体验' }),
      others: 'no',
      oomol: translate({ id: 'HOME.WhyOomol.oomol6', message: 'VSCode 原生 + AI' }),
    },
  ];

  const getStatusIcon = (status: 'no' | 'limited' | 'yes') => {
    switch (status) {
      case 'yes':
        return '✅';
      case 'limited':
        return '⚠️';
      case 'no':
        return '❌';
    }
  };

  const getOthersText = (status: 'no' | 'limited' | 'yes') => {
    switch (status) {
      case 'yes':
        return translate({ id: 'HOME.WhyOomol.supported', message: '支持' });
      case 'limited':
        return translate({ id: 'HOME.WhyOomol.limited', message: '受限' });
      case 'no':
        return translate({ id: 'HOME.WhyOomol.notSupported', message: '很少支持' });
    }
  };

  return (
    <section className={styles.whyOomol}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            {translate({ id: 'HOME.WhyOomol.title', message: '为什么选择 OOMOL' })}
          </h2>
          <p className={styles.subtitle}>
            {translate({ id: 'HOME.WhyOomol.subtitle', message: '与其他工具的对比,看看 OOMOL 如何重新定义开发者体验' })}
          </p>
        </div>

        <div className={styles.comparisonWrapper}>
          <div className={styles.comparisonTable}>
            {/* 表头 */}
            <div className={styles.tableHeader}>
              <div className={styles.headerCell}>
                {translate({ id: 'HOME.WhyOomol.featureColumn', message: '特性' })}
              </div>
              <div className={styles.headerCell}>
                {translate({ id: 'HOME.WhyOomol.othersColumn', message: '其他工具' })}
              </div>
              <div className={clsx(styles.headerCell, styles.oomolColumn)}>
                <span className={styles.oomolBadge}>OOMOL</span>
              </div>
            </div>

            {/* 表格内容 */}
            <div className={styles.tableBody}>
              {comparisonData.map((row, index) => (
                <div key={index} className={styles.tableRow}>
                  <div className={styles.featureCell}>{row.feature}</div>
                  <div className={styles.statusCell}>
                    <span className={styles.statusIcon}>{getStatusIcon(row.others)}</span>
                    <span className={styles.statusText}>{getOthersText(row.others)}</span>
                  </div>
                  <div className={clsx(styles.statusCell, styles.oomolCell)}>
                    <span className={styles.statusIcon}>✅</span>
                    <span className={styles.statusText}>{row.oomol}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
