import React, { memo } from "react";

export interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  /** @deprecated Flat text styling; ignored. */
  colors?: string[];
  /** @deprecated Flat text styling; ignored. */
  lightColors?: string[];
  /** @deprecated No animation; ignored. */
  speed?: number;
}

/** Renders children as plain text (no gradient). Kept for API compatibility. */
export const AuroraText = memo(function AuroraText({
  children,
  className = "",
}: AuroraTextProps) {
  return <span className={className}>{children}</span>;
});

AuroraText.displayName = "AuroraText";
