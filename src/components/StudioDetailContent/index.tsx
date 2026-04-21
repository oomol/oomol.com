import styles from "./styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Button } from "@site/src/components/ui/button";
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
  const studioPreviewLight = useBaseUrl("/img/pages/studio/studio-light.png");
  const studioPreviewDark = useBaseUrl("/img/pages/studio/studio-dark.png");
  const principle1Light = useBaseUrl("/img/pages/studio/code-light.png");
  const principle1Dark = useBaseUrl("/img/pages/studio/code-dark.png");
  const principle2Light = useBaseUrl("/img/pages/studio/edit-light.png");
  const principle2Dark = useBaseUrl("/img/pages/studio/edit-dark.png");
  const principle3Light = useBaseUrl("/img/pages/studio/package-light.png");
  const principle3Dark = useBaseUrl("/img/pages/studio/package-dark.png");

  const principleImageSources = [
    { light: principle1Light, dark: principle1Dark },
    { light: principle2Light, dark: principle2Dark },
    { light: principle3Light, dark: principle3Dark },
  ];
  const publishPreviewLight = useBaseUrl("/img/pages/home/publish-light.png");
  const publishPreviewDark = useBaseUrl("/img/pages/home/publish-dark.png");

  if (variant === "home") {
    const homeCards = [
      {
        title: translate({ message: "HOME.StudioChain.card1.title" }),
        description: translate({
          message: "HOME.StudioChain.card1.description",
        }),
        image: {
          light: principle1Light,
          dark: principle1Dark,
        },
        alt: "Build blocks in OOMOL Studio",
      },
      {
        title: translate({ message: "HOME.StudioChain.card2.title" }),
        description: translate({
          message: "HOME.StudioChain.card2.description",
        }),
        image: {
          light: publishPreviewLight,
          dark: publishPreviewDark,
        },
        alt: "Deploy blocks with OOMOL Cloud",
      },
    ];

    return (
      <section className={styles.homeSection}>
        <div className={styles.homeContainer}>
          <header className={styles.homeHeader}>
            <h2 className={styles.homeTitle}>
              {translate({ message: "HOME.StudioChain.title" })}
            </h2>
            <p className={styles.homeSubtitle}>
              {translate({ message: "HOME.StudioChain.subtitle" })}
            </p>
          </header>

          <div className={styles.homeHero}>
            <div className={styles.homeStoryCard}>
              <p className={styles.homeStoryLead}>
                {translate({ message: "HOME.StudioChain.lead" })}
              </p>
              <div className={styles.homeStorySummary}>
                <p>{translate({ message: "HOME.StudioChain.summary" })}</p>
              </div>
              <div className={styles.homeActions}>
                <Button asChild>
                  <Link to="/studio">
                    {translate({ message: "HOME.StudioChain.action.studio" })}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/cloud">
                    {translate({ message: "HOME.StudioChain.action.cloud" })}
                  </Link>
                </Button>
              </div>
            </div>

            <div className={styles.homePreviewCard}>
              <div className={styles.homePreviewFrame}>
                <ThemedImage
                  sources={{
                    light: studioPreviewLight,
                    dark: studioPreviewDark,
                  }}
                  alt="OOMOL Studio"
                  className={styles.homePreviewImage}
                />
              </div>
            </div>
          </div>

          <div className={styles.homePrinciplesGrid}>
            {homeCards.map(card => (
              <article key={card.title} className={styles.homePrincipleCard}>
                <div className={styles.homePrincipleMedia}>
                  <ThemedImage
                    sources={card.image}
                    alt={card.alt}
                    className={styles.homePrincipleImage}
                  />
                </div>
                <div className={styles.homePrincipleContent}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
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
        <h1 className={styles.heroTitle}>
          {translate({ message: "STUDIO.manifesto.title" })}
        </h1>
        <p className={styles.heroSubtitle}>
          {translate({ message: "STUDIO.manifesto.subtitle" })}
        </p>
      </header>

      <section className={styles.heroImageSection}>
        <div className={styles.heroImageWrapper}>
          <ThemedImage
            sources={{
              light: studioPreviewLight,
              dark: studioPreviewDark,
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
        {principles.map((principle, index) => (
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
                  sources={principleImageSources[index]}
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
