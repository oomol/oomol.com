import type { ComponentProps, CSSProperties } from "react";

const defaultAllow =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

export interface ResponsiveVideoEmbedProps
  extends Omit<ComponentProps<"iframe">, "src" | "style" | "title"> {
  src: string;
  title: string;
  maxWidth?: CSSProperties["maxWidth"];
  aspectRatio?: CSSProperties["aspectRatio"];
  containerStyle?: CSSProperties;
  iframeStyle?: CSSProperties;
}

export default function ResponsiveVideoEmbed({
  src,
  title,
  maxWidth = 720,
  aspectRatio = "16 / 9",
  containerStyle,
  iframeStyle,
  allow = defaultAllow,
  allowFullScreen = true,
  frameBorder = "0",
  ...properties
}: ResponsiveVideoEmbedProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth,
        aspectRatio,
        marginTop: "12px",
        marginBottom: "72px",
        overflow: "hidden",
        marginLeft: "auto",
        marginRight: "auto",
        ...containerStyle,
      }}
    >
      <iframe
        {...properties}
        src={src}
        title={title}
        allow={allow}
        allowFullScreen={allowFullScreen}
        frameBorder={frameBorder}
        style={{
          width: "100%",
          height: "100%",
          ...iframeStyle,
        }}
      />
    </div>
  );
}
