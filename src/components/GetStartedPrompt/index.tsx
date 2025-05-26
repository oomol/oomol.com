import styles from "./styles.module.scss";
import { DownloadButton } from "../DownloadButton";
import { translate } from "@docusaurus/Translate";

export const GetStartedPrompt = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textBox}>
          <h2 className={styles.title}>
            {translate({ message: "HOME.GetStartedPrompt.title" })}
          </h2>
          <span className={styles.subtitle}>
            {translate({ message: "HOME.GetStartedPrompt.subtitle" })}
          </span>
          <DownloadButton />
        </div>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src="/img/pages/home/started-card.webp"
          />
        </div>
      </div>
    </div>
  );
};
