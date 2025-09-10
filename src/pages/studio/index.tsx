import styles from "./styles.module.scss";

import { useState, useEffect, useCallback, useRef } from "react";
import clsx from "clsx";
import Layout from "../../theme/Layout";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import { Spin } from "@site/src/components/Spin/Spin";
import { translate } from "@docusaurus/Translate";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import { FeatureBlockList } from "@site/src/components/FeatureBlockList/FeatureBlockList";

const createData = {
  workflowEngine: {
    title: translate({ message: "CREATE.workflow.title" }),
    description: translate({ message: "CREATE.workflow.description" }),
    features: [
      {
        content: translate({ message: "CREATE.workflow.feature1" }),
        image: "/img/pages/create/workflow-editor.svg",
      },
      {
        content: translate({ message: "CREATE.workflow.feature2" }),
        image: "/img/pages/create/workflow-editor.svg",
      },
      {
        content: translate({ message: "CREATE.workflow.feature3" }),
        image: "/img/pages/create/workflow-editor.svg",
      },
      {
        content: translate({ message: "CREATE.workflow.feature4" }),
        image: "/img/pages/create/workflow-editor.svg",
      },
    ],
  },
  aiIntegration: {
    title: translate({ message: "CREATE.ai.title" }),
    description: translate({ message: "CREATE.ai.description" }),
    features: [
      {
        content: translate({ message: "CREATE.ai.feature1" }),
        image: "/img/pages/create/workflow-editor.svg",
      },
      {
        content: translate({ message: "CREATE.ai.feature2" }),
        image: "/img/pages/create/workflow-editor.svg",
      },
      {
        content: translate({ message: "CREATE.ai.feature3" }),
        image: "/img/pages/create/workflow-editor.svg",
      },
    ],
  },
};

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

interface CreateBlockProps {
  title: string;
  description: string;
  features: {
    content: string;
    image: string;
  }[];
  layoutReverse?: boolean;
}

interface FeaturesBlockProps {
  title: string;
  features: {
    content: string;
    image: string;
  }[];
  layoutReverse?: boolean;
}

const CreateBlock = ({
  title,
  description,
  features,
  layoutReverse,
}: CreateBlockProps) => {
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
      className={clsx(styles.createBlock, {
        [styles.layoutReverse]: layoutReverse,
      })}
    >
      <div className={styles.createLeft}>
        <h1 className={styles.createTitle}>{title}</h1>
        <p className={styles.createDescription}>{description}</p>
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

export default function CreatePage() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{translate({ message: "CREATE.title" })}</h2>
          <span className={styles.description}>
            {translate({ message: "CREATE.description" })}
          </span>
          <div className={styles.productInfo}>
            <h3>OOMOL Studio</h3>
            <p>{translate({ message: "CREATE.studio.description" })}</p>
          </div>
        </div>
        <div className={styles["create-wrapper"]}>
          <CreateBlock
            title={createData.workflowEngine.title}
            description={createData.workflowEngine.description}
            features={createData.workflowEngine.features}
          />
          <CreateBlock
            title={createData.aiIntegration.title}
            description={createData.aiIntegration.description}
            features={createData.aiIntegration.features}
            layoutReverse
          />
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
        <HomepageFeatures />
        <GetStartedPrompt />
      </div>
    </Layout>
  );
}