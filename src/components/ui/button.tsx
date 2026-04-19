import styles from "./button.module.scss";

import type {VariantProps} from "class-variance-authority";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@site/src/lib/utils";
import { cva  } from "class-variance-authority";
import * as React from "react";


/**
 * shadcn/ui Button — tuned to Vercel's marketing-site button system.
 *
 * Sizes / radii match vercel.com; type sizes use OOMOL tokens (mono/base/sm).
 *
 * All variants: font-weight 500, letter-spacing -0.01em,
 * never uppercase, never min-width, never box-shadow on idle.
 *
 * Surface colors live in button.module.scss so Link/anchor globals cannot
 * override label contrast on filled buttons.
 */

const buttonVariants = cva(
  [
    styles.buttonRoot,
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium tracking-[-0.005em]",
    "border border-solid transition-colors",
    "no-underline hover:no-underline",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--oomol-bg-base)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        // Vercel primary "Deploy" style — dark filled (light mode = near-black, dark mode = near-white)
        default: styles.variantDefault,
        // Brand-color button (opt-in, rarely used)
        primary: styles.variantPrimary,
        destructive: styles.variantDestructive,
        // Vercel "Get a demo" hairline style
        outline: styles.variantOutline,
        // Subtle filled (used inside CTA panels, nav)
        secondary: styles.variantSecondary,
        // Alias kept for homepage CTA-block secondary action (inverted surface)
        contrast: styles.variantContrast,
        // Ghost (no border, appears only on hover)
        ghost: styles.variantGhost,
        // Pure underline text link（无线框占位）
        link: [styles.variantLink, "underline-offset-[3px] h-auto min-h-0 p-0"].join(
          " "
        ),
      },
      size: {
        sm: "h-8 px-3 text-oomol-mono rounded-md",
        default: "h-10 px-4 text-oomol-sm rounded-lg",
        lg: "h-12 px-5 text-oomol-body rounded-lg",
        icon: "h-10 w-10 p-0 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
