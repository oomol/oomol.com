import styles from "./styles.module.scss";

import { useState, useEffect, useCallback, useRef } from "react";
import clsx from "clsx";
import Layout from "../../theme/Layout";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import { Spin } from "@site/src/components/Spin/Spin";
import { translate } from "@docusaurus/Translate";

const shareData = {
  flowCommunity: {
    title: translate({ message: "SHARE.flowCommunity.title" }),
    description: translate({ message: "SHARE.flowCommunity.description" }),
    features: [
      {
        content: translate({ message: "SHARE.flowCommunity.feature1" }),
        image: "/img/pages/share/publish-flow.svg",
      },
      {
        content: translate({ message: "SHARE.flowCommunity.feature2" }),
        image: "/img/pages/share/publish-flow.svg",
      },
      {
        content: translate({ message: "SHARE.flowCommunity.feature3" }),
        image: "/img/pages/share/publish-flow.svg",
      },
      {
        content: translate({ message: "SHARE.flowCommunity.feature4" }),
        image: "/img/pages/share/publish-flow.svg",
      },
    ],
  },
  analytics: {
    title: translate({ message: "SHARE.analytics.title" }),
    description: translate({ message: "SHARE.analytics.description" }),
    features: [
      {
        content: translate({ message: "SHARE.analytics.feature1" }),
        image: "/img/pages/share/publish-flow.svg",
      },
      {
        content: translate({ message: "SHARE.analytics.feature2" }),
        image: "/img/pages/share/publish-flow.svg",
      },
      {
        content: translate({ message: "SHARE.analytics.feature3" }),
        image: "/img/pages/share/publish-flow.svg",
      },
    ],
  },
};

interface ShareBlockProps {
  title: string;
  description: string;
  features: {
    content: string;
    image: string;
  }[];
  layoutReverse?: boolean;
}

const ShareBlock = ({
  title,
  description,
  features,
  layoutReverse,
}: ShareBlockProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const TRANSITION_DURATION_MS = 5 * 1000;

  const startAutoplayTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % features.length);
    }, TRANSITION_DURATION_MS);
  }, [features.length]);

  useEffect(() => {
    startAutoplayTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startAutoplayTimer]);

  const handleClick = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      startAutoplayTimer();
    },
    [startAutoplayTimer]
  );

  return (
    <div
      className={clsx(styles.shareBlock, {
        [styles.layoutReverse]: layoutReverse,
      })}
    >
      <div className={styles.shareLeft}>
        <h1 className={styles.shareTitle}>{title}</h1>
        <p className={styles.shareDescription}>{description}</p>
        {features.map((item, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={index}
              className={clsx(styles.feature, {
                [styles.active]: isActive,
              })}
              onClick={() => handleClick(index)}
            >
              <div className={styles.featureIcon}>
                {isActive ? (
                  <Spin
                    size={24}
                    strokeWidth={4}
                    color="#7D7FE9"
                    duration={TRANSITION_DURATION_MS}
                  />
                ) : (
                  <i className={`${styles.icon} i-codicon-arrow-right`} />
                )}
              </div>
              <div
                className={clsx(styles.featureContent, {
                  [styles.active]: isActive,
                })}
              >
                {item.content}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.imageWrapper}>
        {features.map((feature, index) => (
          <img
            key={index}
            className={clsx(
              styles.image,
              index === currentIndex && styles.imageVisible
            )}
            src={feature.image}
            alt={feature.content}
          />
        ))}
      </div>
    </div>
  );
};

export default function SharePage() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{translate({ message: "SHARE.title" })}</h2>
          <span className={styles.description}>
            {translate({ message: "SHARE.description" })}
          </span>
          <div className={styles.productInfo}>
            <h3>OOMOL Hub</h3>
            <p>{translate({ message: "SHARE.hub.description" })}</p>
          </div>
        </div>
        <div className={styles["share-wrapper"]}>
          <ShareBlock
            title={shareData.flowCommunity.title}
            description={shareData.flowCommunity.description}
            features={shareData.flowCommunity.features}
          />
          <ShareBlock
            title={shareData.analytics.title}
            description={shareData.analytics.description}
            features={shareData.analytics.features}
            layoutReverse
          />
        </div>
        <GetStartedPrompt />
      </div>
    </Layout>
  );
}