import styles from "./style.module.scss";

import { useState, useEffect, useCallback, useRef } from "react";
import clsx from "clsx";
import Layout from "../../theme/Layout";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import { Spin } from "@site/src/components/Spin/Spin";
import { FeatureBlockList } from "@site/src/components/FeatureBlockList/FeatureBlockList";
import { translate } from "@docusaurus/Translate";

const featuresData = {
  sceneOne: {
    title: translate({ message: "FEATURES.sceneOne.title" }),
    features: [
      {
        content: translate({ message: "FEATURES.sceneOne.content-1" }),
        image: "/img/pages/features/feature-1.webp",
      },
      {
        content: translate({ message: "FEATURES.sceneOne.content-2" }),
        image: "/img/pages/features/feature-2.webp",
      },
      {
        content: translate({ message: "FEATURES.sceneOne.content-3" }),
        image: "/img/pages/features/feature-3.webp",
      },
      {
        content: translate({ message: "FEATURES.sceneOne.content-4" }),
        image: "/img/pages/features/feature-4.webp",
      },
    ],
  },
  sceneTwo: {
    title: translate({ message: "FEATURES.sceneTwo.title" }),
    features: [
      {
        content: translate({ message: "FEATURES.sceneTwo.content-5" }),
        image: "/img/pages/features/feature-5.webp",
      },
      {
        content: translate({ message: "FEATURES.sceneTwo.content-6" }),
        image: "/img/pages/features/feature-6.webp",
      },
      {
        content: translate({ message: "FEATURES.sceneTwo.content-7" }),
        image: "/img/pages/features/feature-7.webp",
      },
    ],
  },
};

interface FeaturesBlockProps {
  title: string;
  features: {
    content: string;
    image: string;
  }[];
  layoutReverse?: boolean;
}

const FeaturesBlock = ({
  title,
  features,
  layoutReverse,
}: FeaturesBlockProps) => {
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
      className={clsx(styles.featuresBlock, {
        [styles.layoutReverse]: layoutReverse,
      })}
    >
      <div className={styles.featuresLeft}>
        <h1 className={styles.featureTitle}>{title}</h1>
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
      <img className={styles.image} src={features[currentIndex].image} />
    </div>
  );
};

export default function Index() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {translate({ message: "FEATURES.title" })}
          </h2>
          <span className={styles.description}>
            {translate({ message: "FEATURES.description" })}
          </span>
        </div>
        <div className={styles["features-wrapper"]}>
          <FeaturesBlock
            title={featuresData.sceneOne.title}
            features={featuresData.sceneOne.features}
          />
          <FeaturesBlock
            title={featuresData.sceneTwo.title}
            features={featuresData.sceneTwo.features}
            layoutReverse
          />
        </div>
        <div className={styles.blocks}>
          <FeatureBlockList />
        </div>
        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
