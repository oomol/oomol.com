import { Popover as ArcoPopover } from "@arco-design/web-react";
import { clsx } from "clsx";
import React from "react";
import styles from "./styles.module.scss";

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  position = "bottom",
  className,
}) => {
  return (
    <ArcoPopover
      className={styles.popover}
      content={content}
      position={position}
      trigger="hover"
    >
      <div className={clsx(styles.trigger, className)}>{trigger}</div>
    </ArcoPopover>
  );
};
