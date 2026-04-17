import styles from "./styles.module.scss";
import terminalStyles from "@site/src/components/magic/terminal.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { HomepageFirstScreenVideoHero } from "@site/src/components/_archive/HomepageFirstScreenVideoHero";
import { HomepageHeroBeam } from "@site/src/components/magic/homepage-hero-beam";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@site/src/components/magic/terminal";
import { Button } from "@site/src/components/ui/button";
import { useReducedMotion } from "framer-motion";
import React from "react";

export default function HomepageFirstScreen() {
  const studioDownloadsHref = useBaseUrl("/downloads#studio-downloads");
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heroTop}>
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
          <div className={styles.heroVisual}>
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
        </div>
        <HomepageHeroBeam />
        <div className={styles.workflowArchive}>
          <h2 className={styles.workflowArchiveTitle}>
            {translate({ message: "HOME.FirstScreen.workflowArchive.title" })}
          </h2>
          <p className={styles.workflowArchiveLead}>
            {translate({ message: "HOME.FirstScreen.workflowArchive.lead" })}
          </p>
          <HomepageFirstScreenVideoHero />
        </div>
      </div>
    </section>
  );
}
