import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import {
  HomepageFirstScreenVideoDialog,
  HomepageFirstScreenVideoHero,
} from "@site/src/components/HomepageFirstScreenVideoHero";
import { Button, buttonVariants } from "@site/src/components/ui/button";
import { clsx } from "clsx";

export default function HomepageFirstScreen() {
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
