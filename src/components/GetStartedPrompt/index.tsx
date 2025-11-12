import styles from "./styles.module.scss";
import { DownloadButton } from "../DownloadButton";
import { translate } from "@docusaurus/Translate";

export const GetStartedPrompt = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textBox}>
          <img
            className={styles.logo}
            src="/img/logo2x.png"
            alt="OOMOL Logo"
          />
          <h2 className={styles.title}>
            {translate({ message: "HOME.GetStartedPrompt.title" })}
          </h2>
          <span className={styles.subtitle}>
            {translate({ message: "HOME.GetStartedPrompt.subtitle" })}
          </span>
          <DownloadButton />
        </div>
      </div>
    </div>
  );
};
