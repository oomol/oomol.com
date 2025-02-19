import React, { useState, useRef } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom";
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  position = "bottom",
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 200);
  };

  return (
    <div
      className={clsx(styles.popoverContainer, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {trigger}
      {isVisible && (
        <div
          className={`${styles.popoverContent} ${
            position === "top"
              ? styles.popoverContentTop
              : styles.popoverContentBottom
          }`}
        >
          {content}
        </div>
      )}
    </div>
  );
};
