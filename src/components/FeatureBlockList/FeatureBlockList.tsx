import styles from "./FeatureBlockList.module.scss";

import { translate } from "@docusaurus/Translate";

interface FeatureBlockProps {
  icon: string;
  content: string;
}

const FeatureBlock = ({ icon, content }: FeatureBlockProps) => {
  return (
    <div className={styles.container}>
      <i className={`${styles.icon} ${icon}`} />
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export const FeatureBlockList = () => {
  const features = [
    {
      icon: "i-codicon-sync",
      content: translate({ message: "FEATURES.block-1.title" }),
    },
    {
      icon: "i-codicon-shield",
      content: translate({ message: "FEATURES.block-2.title" }),
    },
    {
      icon: "i-codicon-mirror",
      content: translate({ message: "FEATURES.block-3.title" }),
    },
    {
      icon: "i-codicon-live-share",
      content: translate({ message: "FEATURES.block-4.title" }),
    },
    {
      icon: "i-codicon-package",
      content: translate({ message: "FEATURES.block-5.title" }),
    },
    {
      icon: "i-codicon-github",
      content: translate({ message: "FEATURES.block-6.title" }),
    },
  ];

  return (
    <div className={styles.list}>
      {features.map((feature, index) => (
        <FeatureBlock
          key={index}
          icon={feature.icon}
          content={feature.content}
        />
      ))}
    </div>
  );
};
