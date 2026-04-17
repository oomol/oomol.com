import type { ComponentProps, CSSProperties } from "react";

import useBaseUrl from "@docusaurus/useBaseUrl";

export interface ResponsiveVideoProps
  extends Omit<ComponentProps<"video">, "poster" | "src"> {
  src: string;
  type?: string;
  poster?: string;
  style?: CSSProperties;
}

export default function ResponsiveVideo({
  src,
  type,
  poster,
  style,
  ...properties
}: ResponsiveVideoProps) {
  const resolvedSrc = useBaseUrl(src);
  const resolvedPoster = poster ? useBaseUrl(poster) : undefined;

  return (
    <video
      {...properties}
      poster={resolvedPoster}
      style={{
        width: "100%",
        maxWidth: "100%",
        borderRadius: "var(--ifm-global-radius)",
        border: "1px solid var(--oomol-border-default)",
        background: "var(--oomol-chrome-void)",
        boxShadow: "var(--oomol-shadow-sm)",
        ...style,
      }}
    >
      {type ? <source src={resolvedSrc} type={type} /> : null}
    </video>
  );
}
