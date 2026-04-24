import styles from "./styles.module.scss";

import type { Ref } from "react";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { AnimatedBeam } from "@site/src/components/magic/animated-beam";
import ThemedImage from "@theme/ThemedImage";
import { useReducedMotion } from "framer-motion";
import React, { createRef, forwardRef, useRef } from "react";

const reasonCards = [
  {
    index: "01",
    title: translate({ message: "HOME.CliReasons.card1.title" }),
    description: translate({
      message: "HOME.CliReasons.card1.description",
    }),
  },
  {
    index: "02",
    title: translate({ message: "HOME.CliReasons.card2.title" }),
    description: translate({
      message: "HOME.CliReasons.card2.description",
    }),
  },
];

const agentSurfaces = [
  {
    labelKey: "COMMON.brand.codex",
    iconPath: "/img/pages/home/codex-color.svg",
  },
  {
    labelKey: "COMMON.brand.claudeCode",
    iconPath: "/img/pages/home/claude-color.svg",
  },
  {
    labelKey: "COMMON.brand.openClaw",
    iconPath: "/img/pages/home/openclaw-color.svg",
  },
  { labelKey: "COMMON.brand.cursor", iconPath: "/img/pages/home/cursor.svg" },
  {
    labelKey: "COMMON.brand.qode",
    iconPath: "/img/pages/home/qoder-color.svg",
  },
] as const;

const beamApps = [
  {
    labelKey: "COMMON.brand.github",
    iconPath: "/img/pages/home/brand-icons/github.svg",
  },
  {
    labelKey: "COMMON.brand.slack",
    iconPath: "/img/pages/home/brand-icons/slack.svg",
  },
  {
    labelKey: "COMMON.brand.notion",
    iconPath: "/img/pages/home/brand-icons/notion.svg",
  },
  {
    labelKey: "COMMON.brand.gmail",
    iconPath: "/img/pages/home/brand-icons/gmail.svg",
  },
  {
    labelKey: "COMMON.brand.linear",
    iconPath: "/img/pages/home/brand-icons/linear.svg",
  },
] as const;

const BeamAgentNode = forwardRef(function BeamAgentNode(
  {
    labelKey,
    iconPath,
  }: {
    labelKey: string;
    iconPath: string;
  },
  ref: Ref<HTMLDivElement>
) {
  const iconSrc = useBaseUrl(iconPath);
  const label = translate({ message: labelKey });

  return (
    <div ref={ref} className={styles.agentNode} aria-label={label}>
      <img
        className={styles.agentIcon}
        src={iconSrc}
        alt=""
        aria-hidden="true"
      />
    </div>
  );
});

const BeamAppNode = forwardRef(function BeamAppNode(
  {
    labelKey,
    iconPath,
  }: {
    labelKey: string;
    iconPath: string;
  },
  ref: Ref<HTMLDivElement>
) {
  const iconSrc = useBaseUrl(iconPath);
  const label = translate({ message: labelKey });

  return (
    <div ref={ref} className={styles.appNode} aria-label={label}>
      <img className={styles.appIcon} src={iconSrc} alt="" aria-hidden="true" />
    </div>
  );
});

function CliReasonsBeam() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const agentRefs = useRef(
    agentSurfaces.map(() => createRef<HTMLDivElement>())
  );
  const appRefs = useRef(beamApps.map(() => createRef<HTMLDivElement>()));
  const hubLogoSources = {
    light: useBaseUrl("/img/pages/home/oomol-logo-light.svg"),
    dark: useBaseUrl("/img/pages/home/oomol-logo-dark.svg"),
  };

  return (
    <div className={styles.visualCard}>
      <div ref={containerRef} className={styles.beamCanvas}>
        <div className={styles.beamAgentsColumn}>
          {agentSurfaces.map((agent, index) => (
            <BeamAgentNode
              key={agent.labelKey}
              ref={agentRefs.current[index]}
              labelKey={agent.labelKey}
              iconPath={agent.iconPath}
            />
          ))}
        </div>

        <div className={styles.beamCenterColumn}>
          <div
            ref={hubRef}
            className={styles.hubNode}
            aria-label={translate({ message: "COMMON.brand.oomol" })}
          >
            <ThemedImage
              className={styles.hubLogo}
              sources={hubLogoSources}
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>

        <div className={styles.beamAppsColumn}>
          {beamApps.map(({ labelKey, iconPath }, index) => (
            <BeamAppNode
              key={labelKey}
              ref={appRefs.current[index]}
              labelKey={labelKey}
              iconPath={iconPath}
            />
          ))}
        </div>

        {!reduceMotion
          ? agentRefs.current.map((ref, index) => (
              <AnimatedBeam
                key={`agent-${agentSurfaces[index].labelKey}`}
                containerRef={containerRef}
                fromRef={ref}
                toRef={hubRef}
                pathColor="var(--cli-reasons-beam-path)"
                pathWidth={1.45}
                pathOpacity={1}
                duration={4.6}
                delay={index * 0.12}
                gradientStartColor="var(--cli-reasons-agent-beam-start)"
                gradientStopColor="var(--cli-reasons-agent-beam-stop)"
              />
            ))
          : null}

        {!reduceMotion
          ? appRefs.current.map((ref, index) => (
              <AnimatedBeam
                key={`app-${beamApps[index].labelKey}`}
                containerRef={containerRef}
                fromRef={ref}
                toRef={hubRef}
                pathColor="var(--cli-reasons-beam-path)"
                pathWidth={1.45}
                pathOpacity={1}
                duration={4.6}
                delay={0.16 + index * 0.12}
                gradientStartColor="var(--cli-reasons-app-beam-start)"
                gradientStopColor="var(--cli-reasons-app-beam-stop)"
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default function HomepageCliReasons() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.copyColumn}>
          <div className={styles.copyIntro}>
            <h2 className={styles.sectionTitle}>
              {translate({ message: "HOME.CliReasons.title" })}
            </h2>
            <p className={styles.sectionSubtitle}>
              {translate({ message: "HOME.CliReasons.subtitle" })}
            </p>
          </div>

          <div className={styles.cardList}>
            {reasonCards.map(card => (
              <article key={card.index} className={styles.reasonCard}>
                <div className={styles.reasonBody}>
                  <h3 className={styles.reasonTitle}>{card.title}</h3>
                  <p className={styles.reasonDescription}>{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.visualColumn}>
          <CliReasonsBeam />
        </div>
      </div>
    </section>
  );
}
