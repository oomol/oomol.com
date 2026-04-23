import type { RefObject } from "react";

/* Animated beam pattern adapted from Magic UI (MIT) — https://magicui.design/docs/components/animated-beam */

import { cn } from "@site/src/lib/utils";
import { motion } from "motion/react";
import { useId, useLayoutEffect, useState } from "react";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  repeat?: number;
  repeatDelay?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = "var(--oomol-divider)",
  pathWidth = 2,
  pathOpacity = 0.25,
  gradientStartColor = "var(--oomol-primary)",
  gradientStopColor = "var(--oomol-studio)",
  repeat = Infinity,
  repeatDelay = 0,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      };

  useLayoutEffect(() => {
    let raf = 0;
    let cancelled = false;

    const updatePath = () => {
      const container = containerRef.current;
      const fromEl = fromRef.current;
      const toEl = toRef.current;
      if (!container || !fromEl || !toEl) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const rectA = fromEl.getBoundingClientRect();
      const rectB = toEl.getBoundingClientRect();

      const svgWidth = Math.max(1, containerRect.width);
      const svgHeight = Math.max(1, containerRect.height);
      setSvgDimensions({ width: svgWidth, height: svgHeight });

      const startX =
        rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
      const startY =
        rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
      const endX =
        rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
      const endY =
        rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

      const controlY = startY - curvature;
      const d = `M ${startX},${startY} Q ${
        (startX + endX) / 2
      },${controlY} ${endX},${endY}`;
      setPathD(d);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (cancelled) {
          return;
        }

        updatePath();
        // Second frame: refs and responsive flex layout can settle after paint.
        raf = requestAnimationFrame(() => {
          if (!cancelled) {
            updatePath();
          }
        });
      });
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);

    const container = containerRef.current;
    const fromEl = fromRef.current;
    const toEl = toRef.current;
    if (container) {
      resizeObserver.observe(container);
    }
    if (fromEl) {
      resizeObserver.observe(fromEl);
    }
    if (toEl) {
      resizeObserver.observe(toEl);
    }

    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("orientationchange", scheduleUpdate);
    void document.fonts?.ready.then(() => {
      if (!cancelled) {
        scheduleUpdate();
      }
    });

    scheduleUpdate();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  const w = Math.max(1, svgDimensions.width);
  const h = Math.max(1, svgDimensions.height);

  return (
    <svg
      fill="none"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-0 left-0 z-0 transform-gpu stroke-2",
        className
      )}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat,
            repeatDelay,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
