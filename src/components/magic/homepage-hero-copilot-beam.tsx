import styles from "./homepage-hero-copilot-beam.module.scss";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  CopilotBeamIconGoogleDocs,
  CopilotBeamIconGoogleDrive,
  CopilotBeamIconMessenger,
  CopilotBeamIconNotion,
  CopilotBeamIconWhatsApp,
  CopilotBeamIconZapier,
} from "@site/src/components/magic/copilot-beam-brand-icons";
import { AnimatedBeam } from "@site/src/components/magic/animated-beam";
import { useReducedMotion } from "framer-motion";
import type { ComponentType } from "react";
import { useRef } from "react";

const SAAS_ICONS: readonly {
  key: string;
  Icon: ComponentType;
  titleKey: string;
}[] = [
  { key: "gdrive", Icon: CopilotBeamIconGoogleDrive, titleKey: "HOME.FirstScreen.copilotBeam.satellite.gdrive" },
  { key: "notion", Icon: CopilotBeamIconNotion, titleKey: "HOME.FirstScreen.copilotBeam.satellite.notion" },
  { key: "whatsapp", Icon: CopilotBeamIconWhatsApp, titleKey: "HOME.FirstScreen.copilotBeam.satellite.whatsapp" },
  { key: "gdocs", Icon: CopilotBeamIconGoogleDocs, titleKey: "HOME.FirstScreen.copilotBeam.satellite.gdocs" },
  { key: "zapier", Icon: CopilotBeamIconZapier, titleKey: "HOME.FirstScreen.copilotBeam.satellite.zapier" },
  { key: "messenger", Icon: CopilotBeamIconMessenger, titleKey: "HOME.FirstScreen.copilotBeam.satellite.messenger" },
] as const;

/**
 * Hero “co-pilot hub” diagram: SaaS tools connect into OOMOL (center), Magic UI animated-beam style.
 */
function getCurrentLocale(ctx: ReturnType<typeof useDocusaurusContext>): string {
  const raw = ctx as { i18n?: { currentLocale?: string } };
  return raw.i18n?.currentLocale ?? "en";
}

export function HomepageHeroCopilotBeam() {
  const reduceMotion = useReducedMotion();
  const docusaurusContext = useDocusaurusContext();
  const locale = getCurrentLocale(docusaurusContext);

  /** Hub chip is always light; keep the ink-on-paper mark (…-light.svg) in every theme. */
  const hubLogoSrc = useBaseUrl(`/img/logo-${locale === "zh-CN" ? "zh" : "en"}-light.svg`);

  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const left1 = useRef<HTMLDivElement>(null);
  const left2 = useRef<HTMLDivElement>(null);
  const left3 = useRef<HTMLDivElement>(null);
  const right1 = useRef<HTMLDivElement>(null);
  const right2 = useRef<HTMLDivElement>(null);
  const right3 = useRef<HTMLDivElement>(null);

  const leftRefs = [left1, left2, left3] as const;
  const rightRefs = [right1, right2, right3] as const;

  const beamCommon = {
    duration: 4.5 as const,
    pathColor: "var(--copilot-beam-stroke, var(--oomol-divider))" as const,
    pathOpacity: 0.38 as const,
  };

  return (
    <div
      className={styles.wrapper}
      aria-label={translate({
        message: "HOME.FirstScreen.copilotBeam.aria",
      })}
    >
      <div ref={containerRef} className={styles.row}>
        <div className={`${styles.column} ${styles.columnLeft}`}>
          {SAAS_ICONS.slice(0, 3).map((s, i) => {
            const SatelliteIcon = s.Icon;
            return (
              <div
                key={s.key}
                ref={leftRefs[i]}
                className={styles.satellite}
                title={translate({ message: s.titleKey })}
              >
                <SatelliteIcon />
              </div>
            );
          })}
        </div>

        <div className={styles.center}>
          <div ref={centerRef} className={styles.centerBadge}>
            <img
              src={hubLogoSrc}
              alt={translate({ message: "HOME.FirstScreen.copilotBeam.logoAlt" })}
              className={styles.centerLogo}
              width={36}
              height={36}
              decoding="async"
            />
            <span className={styles.centerName}>
              {translate({ message: "HOME.FirstScreen.copilotBeam.hubName" })}
            </span>
          </div>
          <p className={styles.tagline}>
            {translate({ message: "HOME.FirstScreen.copilotBeam.tagline" })}
          </p>
        </div>

        <div className={`${styles.column} ${styles.columnRight}`}>
          {SAAS_ICONS.slice(3, 6).map((s, i) => {
            const SatelliteIcon = s.Icon;
            return (
              <div
                key={s.key}
                ref={rightRefs[i]}
                className={styles.satellite}
                title={translate({ message: s.titleKey })}
              >
                <SatelliteIcon />
              </div>
            );
          })}
        </div>

        {!reduceMotion ? (
          <>
            {leftRefs.map((fromRef, i) => (
              <AnimatedBeam
                key={`lb-${i}`}
                containerRef={containerRef}
                fromRef={fromRef}
                toRef={centerRef}
                curvature={56 - i * 12}
                delay={i * 0.12}
                {...beamCommon}
              />
            ))}
            {rightRefs.map((fromRef, i) => (
              <AnimatedBeam
                key={`rb-${i}`}
                containerRef={containerRef}
                fromRef={fromRef}
                toRef={centerRef}
                curvature={-(56 - i * 12)}
                delay={0.2 + i * 0.12}
                reverse
                {...beamCommon}
              />
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}
