import React from "react";
import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";
import { BlurFade } from "../magic-ui/BlurFade";
import Link from "@docusaurus/Link";

type ProductDataType = {
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
};

const productsData: ProductDataType[] = [
  {
    title: "OOMOL Studio",
    description: translate({ message: "HOME.Products.studio.description" }),
    icon: "i-codicon-tools",
    link: "/studio",
    color: "blue",
  },
  {
    title: "OOMOL Chat",
    description: translate({ message: "HOME.Products.chat.description" }),
    icon: "i-codicon-comment-discussion",
    link: "/chat",
    color: "purple",
  },
  {
    title: "OOMOL Hub",
    description: translate({ message: "HOME.Products.hub.description" }),
    icon: "i-codicon-globe",
    link: "/hub",
    color: "green",
  },
  {
    title: "OOMOL Headless",
    description: translate({ message: "HOME.Products.headless.description" }),
    icon: "i-codicon-server",
    link: "/headless",
    color: "cyan",
  },
];

export default function HomepageProducts() {
  const productNodes = productsData.map((product, index) => {
    const isEven = index % 2 === 0;
    return (
      <BlurFade key={`product-${index}`} delay={0.25 + index * 0.05}>
        <div className={`${styles.productCard} ${isEven ? styles.evenCard : styles.oddCard}`}>
          <div className={styles.productContent}>
            <h3 className={styles.productTitle}>{product.title}</h3>
            <p className={styles.productDescription}>{product.description}</p>
            <Link to={product.link} className={styles.productLink}>
              了解更多
              <i className="i-codicon-arrow-right" />
            </Link>
          </div>
          <div className={styles.productImageContainer}>
            <div className={`${styles.productIcon} ${styles[product.color]}`}>
              <i className={product.icon} />
            </div>
          </div>
        </div>
      </BlurFade>
    );
  });

  return (
    <div className={styles.products}>
      <div className={styles["products-mid"]}>
        <div className={styles.sectionTitle}>
          {translate({
            message: "HOME.Products.title",
          })}
        </div>
        <span className={styles.sectionSubtitle}>
          {translate({
            message: "HOME.Products.subtitle",
          })}
        </span>
        <div className={styles.productList}>{productNodes}</div>
      </div>
    </div>
  );
}