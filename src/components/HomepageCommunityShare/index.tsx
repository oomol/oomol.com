import React from "react";
import styles from "./styles.module.scss";
import { translate } from "@docusaurus/Translate";
import { useColorMode } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function HomepageCommunityShare() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const communityHomeLight = useBaseUrl(
    "/img/pages/home/community-home-light.png"
  );
  const communityHomeDark = useBaseUrl(
    "/img/pages/home/community-home-dark.png"
  );
  const communityDetailLight = useBaseUrl(
    "/img/pages/home/community-detail-light.png"
  );
  const communityDetailDark = useBaseUrl(
    "/img/pages/home/community-detail-dark.png"
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          {translate({ id: "HOME.CommunityShare.title" })}
        </h2>
        <p className={styles.subtitle}>
          {translate({ id: "HOME.CommunityShare.subtitle" })}
        </p>
      </div>

      <div className={styles.imagesWrapper}>
        <div className={styles.imageContainer}>
          <img
            src={isDark ? communityHomeDark : communityHomeLight}
            alt="Community Home"
            className={styles.image}
          />
        </div>
        <div className={styles.imageContainer}>
          <img
            src={isDark ? communityDetailDark : communityDetailLight}
            alt="Community Detail"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
}
