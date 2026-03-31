import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { DownloadButton } from "../DownloadButton";

export const GetStartedPrompt = () => {
  const logoSrc = useBaseUrl("/img/logo2x.png");

  return (
    <div className={styles.container} id="download">
      <div className={styles.content}>
        <div className={styles.textBox}>
          <img className={styles.logo} src={logoSrc} alt="OOMOL Logo" />
          <h2 className={styles.title}>
            {translate({ message: "HOME.GetStartedPrompt.title" })}
          </h2>
          <span className={styles.subtitle}>
            {translate({ message: "HOME.GetStartedPrompt.subtitle" })}
          </span>
          <div className={styles.actions}>
            <DownloadButton />
            <Link to="/docs/cloud-services/cli" className={styles.secondaryLink}>
              {translate({ message: "HOME.Downloads.cli.action.guide" })}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
