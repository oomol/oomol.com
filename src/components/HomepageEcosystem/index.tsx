import React from "react";
import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";
import { BlurFade } from "../magic-ui/BlurFade";
import { Card, CardContent, CardHeader } from "../ui/card";
import clsx from "clsx";

type ProductType = {
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
  icon: string;
};

const products: ProductType[] = [
  {
    name: translate({ message: "HOME.Ecosystem.studio.title" }),
    subtitle: translate({ message: "HOME.Ecosystem.studio.subtitle" }),
    description: translate({ message: "HOME.Ecosystem.studio.description" }),
    features: [
      translate({ message: "HOME.Ecosystem.studio.feature1" }),
      translate({ message: "HOME.Ecosystem.studio.feature2" }),
      translate({ message: "HOME.Ecosystem.studio.feature3" }),
      translate({ message: "HOME.Ecosystem.studio.feature4" }),
    ],
    color: "purple",
    icon: "i-codicon-code",
  },
  {
    name: translate({ message: "HOME.Ecosystem.hub.title" }),
    subtitle: translate({ message: "HOME.Ecosystem.hub.subtitle" }),
    description: translate({ message: "HOME.Ecosystem.hub.description" }),
    features: [
      translate({ message: "HOME.Ecosystem.hub.feature1" }),
      translate({ message: "HOME.Ecosystem.hub.feature2" }),
      translate({ message: "HOME.Ecosystem.hub.feature3" }),
      translate({ message: "HOME.Ecosystem.hub.feature4" }),
    ],
    color: "green",
    icon: "i-codicon-globe",
  },
  {
    name: translate({ message: "HOME.Ecosystem.cloud.title" }),
    subtitle: translate({ message: "HOME.Ecosystem.cloud.subtitle" }),
    description: translate({ message: "HOME.Ecosystem.cloud.description" }),
    features: [
      translate({ message: "HOME.Ecosystem.cloud.feature1" }),
      translate({ message: "HOME.Ecosystem.cloud.feature2" }),
      translate({ message: "HOME.Ecosystem.cloud.feature3" }),
      translate({ message: "HOME.Ecosystem.cloud.feature4" }),
    ],
    color: "blue",
    icon: "i-codicon-cloud",
  },
  {
    name: translate({ message: "HOME.Ecosystem.chat.title" }),
    subtitle: translate({ message: "HOME.Ecosystem.chat.subtitle" }),
    description: translate({ message: "HOME.Ecosystem.chat.description" }),
    features: [
      translate({ message: "HOME.Ecosystem.chat.feature1" }),
      translate({ message: "HOME.Ecosystem.chat.feature2" }),
      translate({ message: "HOME.Ecosystem.chat.feature3" }),
      translate({ message: "HOME.Ecosystem.chat.feature4" }),
    ],
    color: "orange",
    icon: "i-codicon-comment-discussion",
  },
];

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <BlurFade className={styles["product-blur-fade"]}>
      <Card className={clsx(styles["product-card"], styles[product.color])}>
        <CardHeader className={styles["product-header"]}>
          <div className={styles["icon-wrapper"]}>
            <i className={clsx(product.icon, styles.icon)} />
          </div>
          <div className={styles["product-info"]}>
            <h3 className={styles["product-name"]}>{product.name}</h3>
            <span className={styles["product-subtitle"]}>
              {product.subtitle}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className={styles["product-description"]}>{product.description}</p>
          <div className={styles["product-features"]}>
            {product.features.map((feature, index) => (
              <span key={index} className={styles.feature}>
                <i className="i-codicon-check" />
                {feature}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </BlurFade>
  );
};

export default function HomepageEcosystem() {
  return (
    <section className={styles.container}>
      <div className={styles.titleBox}>
        <div className={styles.sectionTitle}>
          {translate({
            message: "HOME.Ecosystem.title",
          })}
        </div>
        <span className={styles.sectionSubtitle}>
          {translate({
            message: "HOME.Ecosystem.subtitle",
          })}
        </span>
      </div>
      <div className={styles.grid}>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
}
