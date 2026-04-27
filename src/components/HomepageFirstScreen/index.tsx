import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import {
  HomepageFirstScreenVideoDialog,
  HomepageFirstScreenVideoHero,
} from "@site/src/components/HomepageFirstScreenVideoHero";
import { Button, buttonVariants } from "@site/src/components/ui/button";
import { clsx } from "clsx";

const animatedGridSquares = [
  { x: 1, y: 0, delay: 0 },
  { x: 5, y: 1, delay: 0.9 },
  { x: 10, y: 0, delay: 1.8 },
  { x: 13, y: 3, delay: 0.35 },
  { x: 3, y: 4, delay: 2.15 },
  { x: 8, y: 5, delay: 1.25 },
  { x: 15, y: 6, delay: 2.7 },
  { x: 0, y: 8, delay: 1.55 },
  { x: 6, y: 9, delay: 0.55 },
  { x: 12, y: 10, delay: 2.35 },
] as const;

function HomepageGridBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.stageFrame} />
      <svg className={styles.gridPattern} width="100%" height="100%">
        <defs>
          <pattern
            id="homepage-grid-pattern"
            width="72"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 72 0 L 0 0 0 72" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#homepage-grid-pattern)" />
        {animatedGridSquares.map(square => (
          <rect
            key={`${square.x}-${square.y}`}
            className={styles.gridSquare}
            x={square.x * 72 + 1}
            y={square.y * 72 + 1}
            width="70"
            height="70"
            style={{ animationDelay: `${square.delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function HomepageFirstScreen() {
  return (
    <section className={styles.section}>
      <HomepageGridBackdrop />
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
              <HomepageFirstScreenVideoDialog
                className={clsx(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  styles.secondaryCta
                )}
                trigger={translate({
                  message: "HOME.FirstScreen.cta.secondary",
                })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.workflowArchive}>
        <HomepageFirstScreenVideoHero />
      </div>
    </section>
  );
}
