import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { HomepageFirstScreenVideoHero } from "@site/src/components/_archive/HomepageFirstScreenVideoHero";
import { Button } from "@site/src/components/ui/button";
import React from "react";

type InstallPlatform = "unix" | "windows";

const INSTALL_COMMANDS: Record<InstallPlatform, string> = {
  unix: "curl -fsSL https://cli.oomol.com/install.sh | bash",
  windows: "irm https://cli.oomol.com/install.ps1 | iex",
};

function detectInstallPlatform(): InstallPlatform {
  if (typeof navigator === "undefined") {
    return "unix";
  }

  const candidate =
    (
      navigator as Navigator & {
        userAgentData?: { platform?: string };
      }
    ).userAgentData?.platform ??
    navigator.platform ??
    navigator.userAgent;

  return /win/i.test(candidate) ? "windows" : "unix";
}

export default function HomepageFirstScreen() {
  const studioDownloadsHref = useBaseUrl("/downloads?section=studio-downloads");
  const [isCopied, setIsCopied] = React.useState(false);
  const [installPlatform, setInstallPlatform] =
    React.useState<InstallPlatform>("unix");
  const installCommand = INSTALL_COMMANDS[installPlatform];

  React.useEffect(() => {
    setInstallPlatform(detectInstallPlatform());
  }, []);

  const handleCopyInstallCommand = React.useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(installCommand);
    setIsCopied(true);
  }, [installCommand]);

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
            <div className={styles.installCommandGroup}>
              <button
                className={styles.installCommandStrip}
                onClick={() => void handleCopyInstallCommand()}
                type="button"
              >
                <code className={styles.installCommandText}>
                  {installCommand}
                </code>
              </button>
              <p className={styles.installCommandNote}>
                {isCopied
                  ? translate({
                      message: "HOME.FirstScreen.install.copied",
                    })
                  : translate({
                      message:
                        installPlatform === "windows"
                          ? "HOME.FirstScreen.install.note.windows"
                          : "HOME.FirstScreen.install.note.unix",
                    })}
              </p>
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
