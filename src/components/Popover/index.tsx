import {
  Popover as ShadPopover,
  PopoverContent,
  PopoverTrigger,
} from "@site/src/components/ui/popover";
import { clsx } from "clsx";
import React, { useState } from "react";

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
}

/**
 * Backwards-compatible hover-triggered popover used by Footer / contact-us.
 * Built on the shadcn <Popover> (Radix) so we no longer depend on Arco.
 */
export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  position = "bottom",
  className,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <ShadPopover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          className={clsx("inline-flex", className)}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        >
          {trigger}
        </span>
      </PopoverTrigger>
      <PopoverContent
        side={position}
        sideOffset={8}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="w-auto p-0"
      >
        {content}
      </PopoverContent>
    </ShadPopover>
  );
};
