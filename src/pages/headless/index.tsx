import styles from "./styles.module.scss";

import { useState, useEffect, useCallback, useRef } from "react";
import clsx from "clsx";
import Layout from "../../theme/Layout";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import { Spin } from "@site/src/components/Spin/Spin";
import { translate } from "@docusaurus/Translate";

const headlessData = {
  docker: {
    title: translate({ message: "HEADLESS.docker.title" }),
    description: translate({ message: "HEADLESS.docker.description" }),
    features: [
      {
        content: translate({ message: "HEADLESS.docker.feature1" }),
        image: "/img/pages/headless/docker-deploy.svg",
      },
      {
        content: translate({ message: "HEADLESS.docker.feature2" }),
        image: "/img/pages/headless/docker-deploy.svg",
      },
      {
        content: translate({ message: "HEADLESS.docker.feature3" }),
        image: "/img/pages/headless/docker-deploy.svg",
      },
      {
        content: translate({ message: "HEADLESS.docker.feature4" }),
        image: "/img/pages/headless/docker-deploy.svg",
      },
    ],
  },
  package: {
    title: translate({ message: "HEADLESS.package.title" }),
    description: translate({ message: "HEADLESS.package.description" }),
    features: [
      {
        content: translate({ message: "HEADLESS.package.feature1" }),
        image: "/img/pages/headless/package-management.svg",
      },
      {
        content: translate({ message: "HEADLESS.package.feature2" }),
        image: "/img/pages/headless/package-management.svg",
      },
      {
        content: translate({ message: "HEADLESS.package.feature3" }),
        image: "/img/pages/headless/package-management.svg",
      },
      {
        content: translate({ message: "HEADLESS.package.feature4" }),
        image: "/img/pages/headless/package-management.svg",
      },
    ],
  },
  remote: {
    title: translate({ message: "HEADLESS.remote.title" }),
    description: translate({ message: "HEADLESS.remote.description" }),
    features: [
      {
        content: translate({ message: "HEADLESS.remote.feature1" }),
        image: "/img/pages/headless/remote-access.svg",
      },
      {
        content: translate({ message: "HEADLESS.remote.feature2" }),
        image: "/img/pages/headless/remote-access.svg",
      },
      {
        content: translate({ message: "HEADLESS.remote.feature3" }),
        image: "/img/pages/headless/remote-access.svg",
      },
    ],
  },
};

const TRANSITION_DURATION_MS = 5 * 1000;

interface FeatureBlockProps {
  title: string;
  description: string;
  features: {
    content: string;
    image: string;
  }[];
  layoutReverse?: boolean;
}

const FeatureBlock = ({
  title,
  description,
  features,
  layoutReverse,
}: FeatureBlockProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
      className={clsx(styles.featureBlock, {
        [styles.layoutReverse]: layoutReverse,
      })}
    >
      <div className={styles.featureLeft}>
        <h1 className={styles.featureTitle}>{title}</h1>
        <p className={styles.featureDescription}>{description}</p>
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
                    color="#06b6d4"
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

export default function HeadlessPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {translate({ message: "HEADLESS.title" })}
          </h2>
          <span className={styles.description}>
            {translate({ message: "HEADLESS.description" })}
          </span>
          <div className={styles.productInfo}>
            <h3>{translate({ message: "HEADLESS.productName" })}</h3>
            <p>{translate({ message: "HEADLESS.productDescription" })}</p>
          </div>
        </div>
        <div className={styles.wrapper}>
          <FeatureBlock
            title={headlessData.docker.title}
            description={headlessData.docker.description}
            features={headlessData.docker.features}
          />
          <FeatureBlock
            title={headlessData.package.title}
            description={headlessData.package.description}
            features={headlessData.package.features}
            layoutReverse
          />
          <FeatureBlock
            title={headlessData.remote.title}
            description={headlessData.remote.description}
            features={headlessData.remote.features}
          />
        </div>
        <GetStartedPrompt />
      </div>
    </Layout>
  );
}
