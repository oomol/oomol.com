import { translate } from "@docusaurus/Translate";
import { Button } from "../Button";
import { BlurFade } from "../magic-ui/BlurFade";
import styles from "./style.module.scss";
import React from "react";

const pricingData = [
  {
    title: "免费",
    description: "这是一些描述文本。",
    price: "¥0.00/月",
    features: [
      "1M+ Token",
      "每个 Flow 最多 20 个 Block",
      "每个项目最多 3 个 Flow",
      "最多 3 个 Disks",
    ],
    buttonText: "默认服务",
  },
  {
    title: "专业",
    description: "这是一些描述文本。",
    price: "¥50.00/月",
    features: [
      "同步设置",
      "同步密钥",
      "5M+ Token",
      "每个 Flow 最多 20 个 Block",
      "最多 3 个 Disks",
    ],
    buttonText: "立即订阅",
    className: styles.pro,
  },
];

const pricingTopUpData = [
  {
    title: "2M Token 加油包",
    price: "¥380.00",
    buttonText: "立即购买",
  },
  {
    title: "4M Token 加油包",
    price: "¥680.00",
    buttonText: "立即购买",
  },
];

const HomepagePricing = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <img src={"/img/pricing.svg"} />
        {translate({ message: "HOME.Pricing.title" })}
      </h1>
      <BlurFade>
        <div className={styles.pricing}>
          {pricingData.map((item, index) => (
            <div key={index} className={`${styles.card} ${item.className}`}>
              <h2 className={styles["card-title"]}>{item.title}</h2>
              {item.description && <p>{item.description}</p>}
              <h3 className={styles.price}>{item.price}</h3>
              {item.features && (
                <ul>
                  {item.features.map((feature, idx) => (
                    <li key={idx} className={styles.option}>
                      <i className={`${styles.check} i-codicon:check`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              <Button className={styles.btn}>{item.buttonText}</Button>
            </div>
          ))}
          <div className={styles["top-up-box"]}>
            {pricingTopUpData.map((item, index) => (
              <div key={index} className={`${styles.card} ${styles["top-up"]}`}>
                <h2>{item.title}</h2>
                <h3>{item.price}</h3>
                <Button className={styles.btn}>{item.buttonText}</Button>
              </div>
            ))}
          </div>
        </div>
      </BlurFade>
    </div>
  );
};

export default HomepagePricing;
