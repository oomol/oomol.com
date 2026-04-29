import type { ImgHTMLAttributes } from "react";

import { ThemedComponent } from "@docusaurus/theme-common";
import React from "react";

type ThemedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  sources: {
    dark: string;
    light: string;
  };
};

export default function ThemedImage({
  alt,
  className: imageClassName,
  sources,
  decoding,
  fetchPriority,
  loading,
  ...imgProps
}: ThemedImageProps) {
  const resolvedDecoding = decoding ?? "async";
  const resolvedLoading =
    loading ?? (fetchPriority === "high" ? "eager" : "lazy");
  const fetchPriorityProps = fetchPriority
    ? ({ fetchpriority: fetchPriority } as Record<string, string>)
    : undefined;

  return (
    <ThemedComponent className={imageClassName}>
      {({ theme, className }) => (
        <img
          {...imgProps}
          {...fetchPriorityProps}
          alt={alt}
          className={className}
          decoding={resolvedDecoding}
          loading={resolvedLoading}
          src={sources[theme]}
        />
      )}
    </ThemedComponent>
  );
}
