import styles from "./styles.module.scss";

type MediaRequirementPlaceholderProps = {
  badge: string;
  titleLines: string[];
  summary: string;
  chips: string[];
  steps: Array<{
    index: string;
    title: string;
    detail: string;
  }>;
  footnote: string;
  tone?: "light" | "dark";
  className?: string;
};

export default function MediaRequirementPlaceholder({
  badge,
  titleLines,
  summary,
  chips,
  steps,
  footnote,
  tone = "light",
  className,
}: MediaRequirementPlaceholderProps) {
  return (
    <div
      className={`${styles.placeholder} ${styles[tone]} ${className ?? ""}`.trim()}
    >
      <svg
        className={styles.svg}
        viewBox="0 0 1600 980"
        role="img"
        aria-label={titleLines.join(" ")}
      >
        <rect
          x="12"
          y="12"
          width="1576"
          height="956"
          rx="48"
          className={`${styles.frame} ${styles.outerFill}`}
        />
        <rect
          x="80"
          y="78"
          width="1440"
          height="824"
          rx="34"
          className={styles.innerFrame}
        />
        <circle cx="128" cy="118" r="8" className={styles.chromeDotMuted} />
        <circle cx="154" cy="118" r="8" className={styles.chromeDotMid} />
        <circle cx="180" cy="118" r="8" className={styles.chromeDotStrong} />
        <rect
          x="222"
          y="105"
          width="360"
          height="26"
          rx="13"
          className={styles.toolbar}
        />

        <text x="118" y="194" className={styles.badge}>
          {badge}
        </text>

        {titleLines.map((line, index) => (
          <text
            key={line}
            x="118"
            y={290 + index * 96}
            className={styles.title}
          >
            {line}
          </text>
        ))}

        <text x="118" y="546" className={styles.summary}>
          {summary}
        </text>

        {chips.map((chip, index) => {
          const chipX = 118 + index * 196;
          return (
            <g key={chip}>
              <rect
                x={chipX}
                y="608"
                width="172"
                height="54"
                rx="27"
                className={styles.chip}
              />
              <text
                x={chipX + 86}
                y="643"
                textAnchor="middle"
                className={styles.chipLabel}
              >
                {chip}
              </text>
            </g>
          );
        })}

        <rect
          x="930"
          y="198"
          width="500"
          height="560"
          rx="28"
          className={`${styles.sidePanel} ${styles.panelFill}`}
        />

        {steps.map((step, index) => {
          const top = 274 + index * 152;
          return (
            <g key={step.index}>
              <circle
                cx="982"
                cy={top - 8}
                r="26"
                className={styles.stepCircle}
              />
              <text
                x="982"
                y={top + 3}
                textAnchor="middle"
                className={styles.stepIndex}
              >
                {step.index}
              </text>
              <text x="1030" y={top - 2} className={styles.stepTitle}>
                {step.title}
              </text>
              <text x="1030" y={top + 42} className={styles.stepDetail}>
                {step.detail}
              </text>
            </g>
          );
        })}

        <line
          x1="930"
          y1="790"
          x2="1430"
          y2="790"
          className={styles.footnoteRule}
        />
        <text x="930" y="846" className={styles.footnote}>
          {footnote}
        </text>
      </svg>
    </div>
  );
}
