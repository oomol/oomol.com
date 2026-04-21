import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";
import React from "react";

export default function HomepageCommunityShare() {
  const assetPoints = [
    {
      title: translate({ id: "HOME.CommunityShare.point1.title" }),
      description: translate({ id: "HOME.CommunityShare.point1.description" }),
    },
    {
      title: translate({ id: "HOME.CommunityShare.point2.title" }),
      description: translate({ id: "HOME.CommunityShare.point2.description" }),
    },
    {
      title: translate({ id: "HOME.CommunityShare.point3.title" }),
      description: translate({ id: "HOME.CommunityShare.point3.description" }),
    },
  ];

  const communityHomeLight = useBaseUrl(
    "/img/pages/home/community-home-light.webp"
  );
  const communityHomeDark = useBaseUrl(
    "/img/pages/home/community-home-dark.webp"
  );
  const communityDetailLight = useBaseUrl(
    "/img/pages/home/community-detail-light.webp"
  );
  const communityDetailDark = useBaseUrl(
    "/img/pages/home/community-detail-dark.webp"
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>
            {translate({ id: "HOME.CommunityShare.title" })}
          </h2>
          <p className={styles.sectionSubtitle}>
            {translate({ id: "HOME.CommunityShare.subtitle" })}
          </p>
          <div className={styles.pointsGrid}>
            {assetPoints.map(point => (
              <div key={point.title} className={styles.pointCard}>
                <h3 className={styles.pointTitle}>{point.title}</h3>
                <p className={styles.pointDescription}>{point.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imagesWrapper}>
          <div className={`${styles.imageContainer} ${styles.primaryImage}`}>
            <ThemedImage
              sources={{
                light: communityHomeLight,
                dark: communityHomeDark,
              }}
              alt="Reusable capability catalog"
              className={styles.image}
            />
          </div>
          <div className={`${styles.imageContainer} ${styles.secondaryImage}`}>
            <ThemedImage
              sources={{
                light: communityDetailLight,
                dark: communityDetailDark,
              }}
              alt="Capability asset details"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
