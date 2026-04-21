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
  ...imgProps
}: ThemedImageProps) {
  const { colorMode, colorModeChoice, isHydrated } = useHydratedColorMode();

  if (!isHydrated || colorModeChoice === null) {
    return (
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet={sources.dark} />
        <img {...imgProps} alt={alt} src={sources.light} />
      </picture>
    );
  }

  return (
    <img
      {...imgProps}
      alt={alt}
      src={colorMode === "dark" ? sources.dark : sources.light}
    />
  );
}
