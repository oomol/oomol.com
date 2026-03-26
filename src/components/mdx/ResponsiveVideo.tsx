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
        borderRadius: "16px",
        background: "#000",
        ...style,
      }}
    >
      {type ? <source src={resolvedSrc} type={type} /> : null}
    </video>
  );
}
