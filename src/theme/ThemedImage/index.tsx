import type { ImgHTMLAttributes } from "react";

import { useHydratedColorMode } from "@site/src/lib/useHydratedColorMode";
import React from "react";

type ThemedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  sources: {
    dark: string;
    light: string;
  };
};

export default function ThemedImage({
  alt,
  sources,
  decoding,
  fetchPriority,
  loading,
  ...imgProps
}: ThemedImageProps) {
  const { colorMode, colorModeChoice, isHydrated } = useHydratedColorMode();
  const resolvedDecoding = decoding ?? "async";
  const resolvedLoading =
    loading ?? (fetchPriority === "high" ? "eager" : "lazy");
  const fetchPriorityProps = fetchPriority
    ? ({ fetchpriority: fetchPriority } as Record<string, string>)
    : undefined;

  if (!isHydrated || colorModeChoice === null) {
    return (
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet={sources.dark} />
        <img
          {...imgProps}
          {...fetchPriorityProps}
          alt={alt}
          decoding={resolvedDecoding}
          loading={resolvedLoading}
          src={sources.light}
        />
      </picture>
    );
  }

  return (
    <img
      {...imgProps}
      {...fetchPriorityProps}
      alt={alt}
      decoding={resolvedDecoding}
      loading={resolvedLoading}
      src={colorMode === "dark" ? sources.dark : sources.light}
    />
  );
}
