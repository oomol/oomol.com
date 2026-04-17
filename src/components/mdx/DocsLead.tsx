import type { ReactNode } from "react";

/** Docs-only hero line (e.g. overview) — `div` avoids MDX injecting `<p>` and breaking HTML nesting. */
export default function DocsLead({ children }: { children: ReactNode }) {
  return <div className="docs-lead">{children}</div>;
}
