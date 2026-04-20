import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { HomepageFirstScreenVideoHero } from "@site/src/components/_archive/HomepageFirstScreenVideoHero";
import { Button } from "@site/src/components/ui/button";
import React from "react";

export default function HomepageFirstScreen() {
  const studioDownloadsHref = useBaseUrl("/downloads?section=studio-downloads");

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.titleGroup}>
            <h1 className={styles.slogan}>
              {translate({
                message: "HOME.FirstScreen.heroTitle",
              })}
            </h1>
            <p className={styles.overview}>
              {translate({
                message: "HOME.FirstScreen.heroLead",
              })}
            </p>
            <div className={styles.actions}>
              <Button asChild size="lg" className={styles.primaryCta}>
                <Link to="/cli">
                  {translate({
                    message: "HOME.FirstScreen.cta.primary",
                  })}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className={styles.secondaryCta}
              >
                <Link to={studioDownloadsHref}>
                  {translate({
                    message: "HOME.FirstScreen.cta.secondary",
                  })}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 这里保留的是旧版首页实验方案的说明；当前首页不再使用 beam / terminal 组合。

        <div className={styles.heroTerminal}>
          <Terminal staticMode={reduceMotion === true}>
            <TypingAnimation>
              {translate({ message: "HOME.FirstScreen.terminal.l1" })}
            </TypingAnimation>
            <AnimatedSpan className={terminalStyles.lineOk}>
              {translate({ message: "HOME.FirstScreen.terminal.l2" })}
            </AnimatedSpan>
            <TypingAnimation>
              {translate({ message: "HOME.FirstScreen.terminal.l3" })}
            </TypingAnimation>
            <AnimatedSpan className={terminalStyles.lineOk}>
              {translate({ message: "HOME.FirstScreen.terminal.l4" })}
            </AnimatedSpan>
            <TypingAnimation>
              {translate({ message: "HOME.FirstScreen.terminal.l5" })}
            </TypingAnimation>
          </Terminal>
        </div>

        <HomepageHeroBeam />
        */}

        <div className={styles.workflowArchive}>
          <HomepageFirstScreenVideoHero />
        </div>
      </div>
    </section>
  );
}
