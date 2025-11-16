import React, { useState, useRef } from "react";
import clsx from "clsx";
import {
  Popover as PopoverRoot,
  PopoverContent,
  PopoverTrigger,
} from "@site/src/components/ui/popover";

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
  const [open, setOpen] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <PopoverRoot open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={clsx(className)}
        >
          {trigger}
        </div>
      </PopoverTrigger>
      <PopoverContent
        side={position}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-auto p-0 border-0 bg-transparent shadow-none"
      >
        {content}
      </PopoverContent>
    </PopoverRoot>
  );
};
