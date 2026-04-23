import styles from "./styles.module.scss";

import type { Props } from "@theme/BlogPostItem";
import type { ReactNode } from "react";

import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useHydratedColorMode } from "@site/src/lib/useHydratedColorMode";
import BlogPostItemContainer from "@theme/BlogPostItem/Container";
import BlogPostItemContent from "@theme/BlogPostItem/Content";
import BlogPostItemFooter from "@theme/BlogPostItem/Footer";
import BlogPostItemHeader from "@theme/BlogPostItem/Header";
import { clsx } from "clsx";
import React from "react";

function useContainerClassName() {
  const { isBlogPostPage } = useBlogPost();
  return !isBlogPostPage ? "margin-bottom--xl" : undefined;
}

function BlogPostListPreview() {
  const { assets, metadata } = useBlogPost();
  const { colorMode } = useHydratedColorMode("light");
  const coverSource =
    assets.image ??
    (typeof metadata.frontMatter.image === "string"
      ? metadata.frontMatter.image
      : undefined);
  const cover = coverSource ? useBaseUrl(coverSource) : undefined;
  const isUpdate = metadata.permalink.includes("/updates/");
  const previewLabel = isUpdate ? "Updates" : "Blog";
  const previewTone =
    colorMode === "dark"
      ? styles.previewFallbackDark
      : styles.previewFallbackLight;

  return (
    <div className={styles.preview}>
      <Link
        to={metadata.permalink}
        aria-label={metadata.title}
        className={styles.previewMediaLink}
      >
        <div className={styles.previewMediaFrame}>
          {cover ? (
            <img
              alt=""
              className={styles.previewMediaImage}
              decoding="async"
              loading="lazy"
              src={cover}
            />
          ) : (
            <div className={clsx(styles.previewFallback, previewTone)}>
              <span className={styles.previewBadge}>{previewLabel}</span>
              <span className={styles.previewFallbackTitle}>
                {metadata.title}
              </span>
            </div>
          )}
          {cover ? (
            <span className={styles.previewBadgeOverlay}>{previewLabel}</span>
          ) : null}
        </div>
      </Link>
      <p className={styles.previewDescription}>{metadata.description}</p>
    </div>
  );
}

export default function BlogPostItem({
  children,
  className,
}: Props): ReactNode {
  const { isBlogPostPage } = useBlogPost();
  const containerClassName = useContainerClassName();

  return (
    <BlogPostItemContainer className={clsx(containerClassName, className)}>
      <BlogPostItemHeader />
      {isBlogPostPage ? (
        <BlogPostItemContent>{children}</BlogPostItemContent>
      ) : (
        <BlogPostListPreview />
      )}
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}
