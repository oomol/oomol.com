import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";
import { useState, useEffect, useRef } from "react";

interface Step {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
}

const getSteps = (): Step[] => [
  {
    stepNumber: "01",
    title: translate({ message: "HOME.Lifecycle.step1.title" }),
    subtitle: translate({ message: "HOME.Lifecycle.step1.subtitle" }),
    description: translate({ message: "HOME.Lifecycle.step1.description" }),
  },
  {
    stepNumber: "02",
    title: translate({ message: "HOME.Lifecycle.step2.title" }),
    subtitle: translate({ message: "HOME.Lifecycle.step2.subtitle" }),
    description: translate({ message: "HOME.Lifecycle.step2.description" }),
  },
  {
    stepNumber: "03",
    title: translate({ message: "HOME.Lifecycle.step3.title" }),
    subtitle: translate({ message: "HOME.Lifecycle.step3.subtitle" }),
    description: translate({ message: "HOME.Lifecycle.step3.description" }),
  },
  {
    stepNumber: "04",
    title: translate({ message: "HOME.Lifecycle.step4.title" }),
    subtitle: translate({ message: "HOME.Lifecycle.step4.subtitle" }),
    description: translate({ message: "HOME.Lifecycle.step4.description" }),
  },
];

const STEPS_COUNT = 4;
const AUTO_SWITCH_DURATION = 10000; // 10秒自动切换

export default function HomepageLifecycle() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  const steps = getSteps();

  // 检测描述是否为列表格式(中文使用列表,英文使用段落)
  const checkIsListFormat = (description: string): boolean => {
    return description.includes("•") && description.includes("\n");
  };

  // 自动切换功能和进度条更新
  useEffect(() => {
    // 重置进度引用
    progressRef.current = 0;

    // 更新进度条 (每50ms更新一次,实现平滑动画)
    const progressInterval = setInterval(() => {
      progressRef.current = Math.min(
        progressRef.current + (50 / AUTO_SWITCH_DURATION) * 100,
        100
      );
      setProgress(progressRef.current);
    }, 50);

    // 自动切换到下一步
    const switchTimeout = setTimeout(() => {
      setActiveStep(prev => (prev + 1) % STEPS_COUNT);
    }, AUTO_SWITCH_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(switchTimeout);
    };
  }, [activeStep]);

  // 处理用户点击,重置计时器和进度
  const handleStepClick = (index: number) => {
    if (index !== activeStep) {
      setActiveStep(index);
      progressRef.current = 0;
      setProgress(0);
    }
  };

  return (
    <section className={styles.lifecycleSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {translate({ message: "HOME.Lifecycle.title" })}
          </h2>
          <p className={styles.sectionSubtitle}>
            {translate({ message: "HOME.Lifecycle.subtitle" })}
          </p>
        </div>

        {/* 左右分栏布局 */}
        <div className={styles.mainContent}>
          {/* 左侧流程导航 */}
          <div className={styles.stepsNavigation}>
            {steps.map((step, index) => (
              <div key={step.stepNumber}>
                <button
                  className={`${styles.stepItem} ${
                    index === activeStep ? styles.active : ""
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  <div className={styles.stepIndicator}>
                    <div className={styles.stepNumberWrapper}>
                      {index === activeStep && (
                        <svg
                          className={styles.progressRing}
                          width="58"
                          height="58"
                        >
                          <circle
                            className={styles.progressRingCircle}
                            stroke="var(--ifm-color-primary)"
                            strokeWidth="3"
                            fill="transparent"
                            r="26.5"
                            cx="29"
                            cy="29"
                            style={{
                              strokeDasharray: `${2 * Math.PI * 26.5}`,
                              strokeDashoffset: `${2 * Math.PI * 26.5 * (1 - progress / 100)}`,
                            }}
                          />
                        </svg>
                      )}
                      <span className={styles.stepNumber}>
                        {step.stepNumber}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={styles.stepConnector} />
                    )}
                  </div>
                  <div className={styles.stepInfo}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepSubtitle}>{step.subtitle}</p>

                    {/* 展开的描述内容 - 仅在激活时显示 */}
                    {index === activeStep && (
                      <div className={styles.stepContent}>
                        {checkIsListFormat(step.description) ? (
                          // 中文列表格式
                          <ul className={styles.stepList}>
                            {step.description.split("\n").map((line, idx) => (
                              <li key={idx}>{line.replace("• ", "")}</li>
                            ))}
                          </ul>
                        ) : (
                          // 英文段落格式
                          <div className={styles.stepDescription}>
                            <p>{step.description}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* 右侧内容区域 - 图片占位 */}
          <div className={styles.contentArea}>
            <div className={styles.imagePlaceholder}>
              {/* 这里可以放置图片或视频 */}
              <div className={styles.placeholderText}>
                Step {activeStep + 1} Image/Video Placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
