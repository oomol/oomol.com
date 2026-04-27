import styles from "./styles.module.scss";

import type { Ref } from "react";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { AnimatedBeam } from "@site/src/components/magic/animated-beam";
import ThemedImage from "@theme/ThemedImage";
import { clsx } from "clsx";
import { useReducedMotion } from "framer-motion";
import React, { createRef, forwardRef, useRef } from "react";

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

export function HomepageConnectionBeam({ className }: { className?: string }) {
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
    <div className={clsx(styles.visualCard, className)}>
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
                pathColor="var(--connection-beam-path)"
                pathWidth={1.45}
                pathOpacity={1}
                duration={4.6}
                delay={index * 0.12}
                gradientStartColor="var(--connection-beam-agent-start)"
                gradientStopColor="var(--connection-beam-agent-stop)"
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
                pathColor="var(--connection-beam-path)"
                pathWidth={1.45}
                pathOpacity={1}
                duration={4.6}
                delay={0.16 + index * 0.12}
                gradientStartColor="var(--connection-beam-app-start)"
                gradientStopColor="var(--connection-beam-app-stop)"
              />
            ))
          : null}
      </div>
    </div>
  );
}
