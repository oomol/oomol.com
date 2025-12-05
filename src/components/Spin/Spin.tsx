import React, { useState, useEffect, useMemo, memo } from "react";

interface SpinProps {
  progress?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  duration?: number;
  className?: string;
}

const BackgroundCircle = memo(
  ({
    cx,
    cy,
    r,
    stroke,
    strokeWidth,
  }: {
    cx: number;
    cy: number;
    r: number;
    stroke: string;
    strokeWidth: number;
  }) => (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="transparent"
    />
  )
);

BackgroundCircle.displayName = "BackgroundCircle";

const ProgressCircle = memo(
  ({
    cx,
    cy,
    r,
    stroke,
    strokeWidth,
    circumference,
    offset,
    duration,
  }: {
    cx: number;
    cy: number;
    r: number;
    stroke: string;
    strokeWidth: number;
    circumference: number;
    offset: number;
    duration: number;
  }) => (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={circumference}
      strokeDashoffset={offset}
      fill="transparent"
      style={{
        transition: `stroke-dashoffset ${duration}ms ease`,
        transform: `rotate(-90deg)`,
        transformOrigin: "center",
        strokeLinecap: "round",
      }}
    />
  )
);

ProgressCircle.displayName = "ProgressCircle";

const SpinComponent: React.FC<SpinProps> = memo(
  ({
    progress,
    size = 40,
    strokeWidth = 6,
    color = "#3b82f6",
    bgColor = "#212830",
    duration = 1500,
    className = "",
  }) => {
    const [internalProgress, setInternalProgress] = useState(
      progress !== undefined ? progress : 0
    );

    const calculations = useMemo(() => {
      const validProgress = Math.min(100, Math.max(0, internalProgress));
      const radius = (size - strokeWidth) / 2;
      const circumference = radius * 2 * Math.PI;
      const offset = circumference - (validProgress / 100) * circumference;
      const center = size / 2;

      return { validProgress, radius, circumference, offset, center };
    }, [internalProgress, size, strokeWidth]);

    useEffect(() => {
      // 使用 requestAnimationFrame 避免同步 setState
      let rafId: number;
      let timer: NodeJS.Timeout;

      rafId = window.requestAnimationFrame(() => {
        if (progress !== undefined) {
          setInternalProgress(progress);
        } else {
          setInternalProgress(0);
          timer = setTimeout(() => {
            setInternalProgress(100);
          }, 50);
        }
      });

      return () => {
        window.cancelAnimationFrame(rafId);
        if (timer) clearTimeout(timer);
      };
    }, [progress]);

    const { radius, circumference, offset, center } = calculations;

    return (
      <div className={className} style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <BackgroundCircle
            cx={center}
            cy={center}
            r={radius}
            stroke={bgColor}
            strokeWidth={strokeWidth}
          />
          <ProgressCircle
            cx={center}
            cy={center}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            circumference={circumference}
            offset={offset}
            duration={duration}
          />
          <circle
            cx={center}
            cy={center}
            r={radius - strokeWidth / 2}
            fill="#010409"
          />
        </svg>
      </div>
    );
  }
);

SpinComponent.displayName = "Spin";

export const Spin = SpinComponent;
