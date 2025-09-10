import styles from "./styles.module.scss";

import { useState, useEffect, useCallback, useRef } from "react";
import clsx from "clsx";
import Layout from "../../theme/Layout";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import { Spin } from "@site/src/components/Spin/Spin";
import { translate } from "@docusaurus/Translate";

const useData = {
  chatTools: {
    title: translate({ message: "USE.chatTools.title" }),
    description: translate({ message: "USE.chatTools.description" }),
    features: [
      {
        content: translate({ message: "USE.chatTools.feature1" }),
        image: "/img/pages/use/natural-chat.svg",
      },
      {
        content: translate({ message: "USE.chatTools.feature2" }),
        image: "/img/pages/use/natural-chat.svg",
      },
      {
        content: translate({ message: "USE.chatTools.feature3" }),
        image: "/img/pages/use/natural-chat.svg",
      },
      {
        content: translate({ message: "USE.chatTools.feature4" }),
        image: "/img/pages/use/natural-chat.svg",
      },
    ],
  },
  userExperience: {
    title: translate({ message: "USE.userExperience.title" }),
    description: translate({ message: "USE.userExperience.description" }),
    features: [
      {
        content: translate({ message: "USE.userExperience.feature1" }),
        image: "/img/pages/use/natural-chat.svg",
      },
      {
        content: translate({ message: "USE.userExperience.feature2" }),
        image: "/img/pages/use/natural-chat.svg",
      },
      {
        content: translate({ message: "USE.userExperience.feature3" }),
        image: "/img/pages/use/natural-chat.svg",
      },
    ],
  },
};

interface UseBlockProps {
  title: string;
  description: string;
  features: {
    content: string;
    image: string;
  }[];
  layoutReverse?: boolean;
}

const UseBlock = ({
  title,
  description,
  features,
  layoutReverse,
}: UseBlockProps) => {
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
      className={clsx(styles.useBlock, {
        [styles.layoutReverse]: layoutReverse,
      })}
    >
      <div className={styles.useLeft}>
        <h1 className={styles.useTitle}>{title}</h1>
        <p className={styles.useDescription}>{description}</p>
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

export default function UsePage() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{translate({ message: "USE.title" })}</h2>
          <span className={styles.description}>
            {translate({ message: "USE.description" })}
          </span>
          <div className={styles.productInfo}>
            <h3>OOMOL Chat</h3>
            <p>{translate({ message: "USE.chat.description" })}</p>
          </div>
        </div>
        <div className={styles["use-wrapper"]}>
          <UseBlock
            title={useData.chatTools.title}
            description={useData.chatTools.description}
            features={useData.chatTools.features}
          />
          <UseBlock
            title={useData.userExperience.title}
            description={useData.userExperience.description}
            features={useData.userExperience.features}
            layoutReverse
          />
        </div>
        <GetStartedPrompt />
      </div>
    </Layout>
  );
}