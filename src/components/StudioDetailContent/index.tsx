import styles from "./styles.module.scss";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";
import React from "react";

type StudioDetailContentProps = {
  variant?: "page" | "home";
};

const principles = [
  {
    titleKey: "STUDIO.principle1.title",
    paragraphKeys: [
      "STUDIO.principle1.paragraph1",
      "STUDIO.principle1.paragraph2",
      "STUDIO.principle1.paragraph3",
    ],
    image: {
      light: "/img/pages/studio/code-light.png",
      dark: "/img/pages/studio/code-dark.png",
    },
    alt: "Code as Truth",
  },
  {
    titleKey: "STUDIO.principle2.title",
    paragraphKeys: [
      "STUDIO.principle2.paragraph1",
      "STUDIO.principle2.paragraph2",
      "STUDIO.principle2.paragraph3",
    ],
    image: {
      light: "/img/pages/studio/edit-light.png",
      dark: "/img/pages/studio/edit-dark.png",
    },
    alt: "Respect Toolchain",
  },
  {
    titleKey: "STUDIO.principle3.title",
    paragraphKeys: [
      "STUDIO.principle3.paragraph1",
      "STUDIO.principle3.paragraph2",
      "STUDIO.principle3.paragraph3",
    ],
    image: {
      light: "/img/pages/studio/package-light.png",
      dark: "/img/pages/studio/package-dark.png",
    },
    alt: "No Artificial Limits",
  },
];

export default function StudioDetailContent({
  variant = "page",
}: StudioDetailContentProps) {
  if (variant === "home") {
    return (
      <section className={styles.homeSection}>
        <div className={styles.homeContainer}>
          <header className={styles.homeHeader}>
            <h2 className={styles.homeTitle}>
              {translate({ message: "STUDIO.manifesto.title" })}
            </h2>
            <p className={styles.homeSubtitle}>
              {translate({ message: "STUDIO.manifesto.subtitle" })}
            </p>
          </header>

          <div className={styles.homeHero}>
            <div className={styles.homeStoryCard}>
              <p className={styles.homeStoryLead}>
                {translate({ message: "STUDIO.story.paragraph1" })}
              </p>

              <div className={styles.homeFrustrationBlock}>
                <p>{translate({ message: "STUDIO.story.frustration.line1" })}</p>
                <p>{translate({ message: "STUDIO.story.frustration.line2" })}</p>
                <p>{translate({ message: "STUDIO.story.frustration.line3" })}</p>
              </div>

              <div className={styles.homeStorySummary}>
                <p>{translate({ message: "STUDIO.story.paragraph2" })}</p>
                <p>{translate({ message: "STUDIO.story.paragraph3" })}</p>
              </div>
            </div>

            <div className={styles.homePreviewCard}>
              <div className={styles.homePreviewFrame}>
                <ThemedImage
                  sources={{
                    light: useBaseUrl("/img/pages/studio/studio-light.png"),
                    dark: useBaseUrl("/img/pages/studio/studio-dark.png"),
                  }}
                  alt="OOMOL Studio"
                  className={styles.homePreviewImage}
                />
              </div>
            </div>
          </div>

          <div className={styles.homePrinciplesGrid}>
            {principles.map(principle => (
              <article
                key={principle.titleKey}
                className={styles.homePrincipleCard}
              >
                <div className={styles.homePrincipleMedia}>
                  <ThemedImage
                    sources={{
                      light: useBaseUrl(principle.image.light),
                      dark: useBaseUrl(principle.image.dark),
                    }}
                    alt={principle.alt}
                    className={styles.homePrincipleImage}
                  />
                </div>
                <div className={styles.homePrincipleContent}>
                  <h3>
                    {translate({
                      message: principle.titleKey,
                    })}
                  </h3>
                  {principle.paragraphKeys.map(key => (
                    <p key={key}>
                      {translate({
                        message: key,
                      })}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.manifestHeader}>
        <h1 className={styles.title}>
          {translate({ message: "STUDIO.manifesto.title" })}
        </h1>
        <p className={styles.subtitle}>
          {translate({ message: "STUDIO.manifesto.subtitle" })}
        </p>
      </header>

      <section className={styles.heroImageSection}>
        <div className={styles.heroImageWrapper}>
          <ThemedImage
            sources={{
              light: useBaseUrl("/img/pages/studio/studio-light.png"),
              dark: useBaseUrl("/img/pages/studio/studio-dark.png"),
            }}
            alt="OOMOL Studio"
            className={styles.heroImage}
          />
        </div>
      </section>

      <section className={styles.storySection}>
        <p>{translate({ message: "STUDIO.story.paragraph1" })}</p>

        <div className={styles.frustrationBlock}>
          <p>
            {translate({ message: "STUDIO.story.frustration.line1" })}
            <br />
            <br />
            {translate({ message: "STUDIO.story.frustration.line2" })}
            <br />
            <br />
            {translate({ message: "STUDIO.story.frustration.line3" })}
          </p>
        </div>

        <p>{translate({ message: "STUDIO.story.paragraph2" })}</p>
        <p>{translate({ message: "STUDIO.story.paragraph3" })}</p>
      </section>

      <section className={styles.principlesSection}>
        {principles.map(principle => (
          <div key={principle.titleKey} className={styles.principleItem}>
            <div className={styles.principleText}>
              <h3>{translate({ message: principle.titleKey })}</h3>
              {principle.paragraphKeys.map(key => (
                <p key={key}>{translate({ message: key })}</p>
              ))}
            </div>
            <div className={styles.principleVisual}>
              <div className={styles.principleImageWrapper}>
                <ThemedImage
                  sources={{
                    light: useBaseUrl(principle.image.light),
                    dark: useBaseUrl(principle.image.dark),
                  }}
                  alt={principle.alt}
                  className={styles.principleImage}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
