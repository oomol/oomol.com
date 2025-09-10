import React from "react";
import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";
import { BlurFade } from "../magic-ui/BlurFade";
import LinkBtn from "../Button/LinkBtn";

export default function HomepageCreate() {
  return (
    <div className={styles.create}>
      <div className={styles["create-mid"]}>
        <div className={styles.sectionTitle}>
          {translate({
            message: "HOME.Create.title",
          })}
        </div>
        <span className={styles.sectionSubtitle}>
          {translate({
            message: "HOME.Create.subtitle",
          })}
        </span>
        <BlurFade delay={0.2}>
          <div className={styles.createContainer}>
            <div className={styles.createCard}>
              <div className={styles.createCardContent}>
                <div className={styles.createTextTitle}>
                  <i className="i-codicon-tools" />
                  {translate({ message: "HOME.Create.card.title" })}
                </div>
                <p className={styles.createTextInner}>
                  {translate({ message: "HOME.Create.card.description" })}
                </p>
                <div className={styles.createCardActions}>
                  <LinkBtn
                    text={translate({ message: "HOME.Create.card.button" })}
                    iconPos="right"
                    icon="i-codicon-arrow-right"
                    url="/studio"
                  />
                </div>
              </div>
              <div className={styles.createCardImage}>
                <img
                  src="/img/create-workflow.svg"
                  alt={translate({ message: "Visual AI Workflow" })}
                  className={styles.createImage}
                />
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}