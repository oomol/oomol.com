import styles from "./homepage-hero-beam.module.scss";

import { translate } from "@docusaurus/Translate";
import { AnimatedBeam } from "@site/src/components/magic/animated-beam";
import { useReducedMotion } from "framer-motion";
import React, { useRef } from "react";

/**
 * Magic UI–style integration strip: Agents → oo-cli → Studio → Cloud.
 */
export function HomepageHeroBeam() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);
  const cliRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={styles.flow}
      aria-label={translate({ message: "HOME.FirstScreen.flow.aria" })}
    >
      <div ref={containerRef} className={styles.flowInner}>
        {!reduceMotion ? (
          <>
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={agentRef}
              toRef={cliRef}
              curvature={-36}
              duration={4.2}
              pathOpacity={0.22}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={cliRef}
              toRef={studioRef}
              curvature={28}
              duration={4.2}
              delay={0.15}
              pathOpacity={0.22}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={studioRef}
              toRef={cloudRef}
              curvature={-32}
              duration={4.2}
              delay={0.3}
              pathOpacity={0.22}
            />
          </>
        ) : null}

        <div ref={agentRef} className={styles.node}>
          <div className={styles.nodeIcon}>
            <i className="i-lucide-bot" aria-hidden="true" />
          </div>
          <span className={styles.nodeLabel}>
            {translate({ message: "HOME.FirstScreen.flow.agent" })}
          </span>
        </div>
        <div ref={cliRef} className={styles.node}>
          <div className={styles.nodeIcon}>
            <i className="i-lucide-terminal-square" aria-hidden="true" />
          </div>
          <span className={styles.nodeLabel}>
            {translate({ message: "HOME.FirstScreen.flow.cli" })}
          </span>
        </div>
        <div ref={studioRef} className={styles.node}>
          <div className={styles.nodeIcon}>
            <i className="i-lucide-panels-top-left" aria-hidden="true" />
          </div>
          <span className={styles.nodeLabel}>
            {translate({ message: "HOME.FirstScreen.flow.studio" })}
          </span>
        </div>
        <div ref={cloudRef} className={styles.node}>
          <div className={styles.nodeIcon}>
            <i className="i-lucide-cloud" aria-hidden="true" />
          </div>
          <span className={styles.nodeLabel}>
            {translate({ message: "HOME.FirstScreen.flow.cloud" })}
          </span>
        </div>
      </div>
    </div>
  );
}
