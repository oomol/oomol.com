import type { ResponsiveVideoProps } from "./ResponsiveVideo";

import { ThemedComponent } from "@docusaurus/theme-common";

import ResponsiveVideo from "./ResponsiveVideo";

export interface ThemedResponsiveVideoProps
  extends Omit<ResponsiveVideoProps, "src"> {
  lightSrc: string;
  darkSrc: string;
}

export default function ThemedResponsiveVideo({
  lightSrc,
  darkSrc,
  ...properties
}: ThemedResponsiveVideoProps) {
  return (
    <ThemedComponent>
      {({ theme }) => (
        <ResponsiveVideo
          {...properties}
          src={theme === "dark" ? darkSrc : lightSrc}
        />
      )}
    </ThemedComponent>
  );
}
