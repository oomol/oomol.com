import styles from "./styles.module.scss";

import type { Ref } from "react";

import { translate } from "@docusaurus/Translate";
import { AnimatedBeam } from "@site/src/components/magic/animated-beam";
import {
  CopilotBeamIconGoogleDocs,
  CopilotBeamIconGoogleDrive,
  CopilotBeamIconMessenger,
  CopilotBeamIconNotion,
  CopilotBeamIconWhatsApp,
} from "@site/src/components/magic/copilot-beam-brand-icons";
import { useReducedMotion } from "framer-motion";
import React, { createRef, forwardRef, useMemo, useRef } from "react";

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
  { label: "Codex", mark: "CX" },
  { label: "Claude Code", mark: "CC" },
  { label: "Cline", mark: "CL" },
  { label: "Hermes", mark: "HM" },
  { label: "OpenCrawl", mark: "OC" },
] as const;

const beamApps = [
  { label: "Google Drive", Icon: CopilotBeamIconGoogleDrive },
  { label: "Google Docs", Icon: CopilotBeamIconGoogleDocs },
  { label: "WhatsApp", Icon: CopilotBeamIconWhatsApp },
  { label: "Messenger", Icon: CopilotBeamIconMessenger },
  { label: "Notion", Icon: CopilotBeamIconNotion },
] as const;

const beamCurvatures = [150, 82, 0, -82, -150] as const;

const BeamAgentNode = forwardRef(function BeamAgentNode(
  {
    label,
    mark,
  }: {
    label: string;
    mark: string;
  },
  ref: Ref<HTMLDivElement>
) {
  return (
    <div ref={ref} className={styles.agentNode} aria-label={label}>
      <span className={styles.agentMark} aria-hidden="true">
        {mark}
      </span>
    </div>
  );
});

const BeamAppNode = forwardRef(function BeamAppNode(
  {
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  },
  ref: Ref<HTMLDivElement>
) {
  return (
    <div ref={ref} className={styles.appNode} aria-label={label}>
      {children}
    </div>
  );
});

function CliReasonsBeam() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const agentRefs = useMemo(
    () => agentSurfaces.map(() => createRef<HTMLDivElement>()),
    []
  );
  const appRefs = useMemo(
    () => beamApps.map(() => createRef<HTMLDivElement>()),
    []
  );

  return (
    <div className={styles.visualCard}>
      <div ref={containerRef} className={styles.beamCanvas}>
        {!reduceMotion
          ? agentRefs.map((ref, index) => (
              <AnimatedBeam
                key={`agent-${agentSurfaces[index].label}`}
                containerRef={containerRef}
                fromRef={hubRef}
                toRef={ref}
                curvature={beamCurvatures[index]}
                pathColor="rgba(24, 24, 27, 0.11)"
                pathWidth={1.45}
                pathOpacity={1}
                duration={4.6}
                delay={index * 0.12}
                gradientStartColor="rgba(99, 102, 241, 0)"
                gradientStopColor="rgba(99, 102, 241, 0.58)"
              />
            ))
          : null}

        {!reduceMotion
          ? appRefs.map((ref, index) => (
              <AnimatedBeam
                key={`app-${beamApps[index].label}`}
                containerRef={containerRef}
                fromRef={hubRef}
                toRef={ref}
                curvature={beamCurvatures[index]}
                pathColor="rgba(24, 24, 27, 0.11)"
                pathWidth={1.45}
                pathOpacity={1}
                duration={4.6}
                delay={0.16 + index * 0.12}
                gradientStartColor="rgba(59, 130, 246, 0)"
                gradientStopColor="rgba(59, 130, 246, 0.58)"
              />
            ))
          : null}

        <div className={styles.beamAgentsColumn}>
          {agentSurfaces.map((agent, index) => (
            <BeamAgentNode
              key={agent.label}
              ref={agentRefs[index]}
              label={agent.label}
              mark={agent.mark}
            />
          ))}
        </div>

        <div className={styles.beamCenterColumn}>
          <div ref={hubRef} className={styles.hubNode}>
            <span className={styles.hubText}>oo-cli</span>
          </div>
        </div>

        <div className={styles.beamAppsColumn}>
          {beamApps.map(({ label, Icon }, index) => (
            <BeamAppNode key={label} ref={appRefs[index]} label={label}>
              <Icon />
            </BeamAppNode>
          ))}
        </div>
      </div>

      <p className={styles.visualNote}>
        {translate({ message: "HOME.CliReasons.visual.note" })}
      </p>
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
