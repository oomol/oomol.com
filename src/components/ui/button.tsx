import { Slot } from "@radix-ui/react-slot";
import { cn } from "@site/src/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

/**
 * shadcn/ui Button — tuned to Vercel's marketing-site button system.
 *
 * Sizes / radii match vercel.com; type sizes use OOMOL tokens (mono/base/sm).
 *
 * All variants: font-weight 500, letter-spacing -0.01em,
 * never uppercase, never min-width, never box-shadow on idle.
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium tracking-[-0.005em]",
    "border border-solid transition-colors",
    "no-underline hover:no-underline",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        // Vercel primary "Deploy" style — dark filled (light mode = near-black, dark mode = near-white)
        default: [
          "bg-[var(--oomol-foreground)] border-[var(--oomol-foreground)] text-[var(--oomol-foreground-contrast)]",
          "hover:bg-[var(--oomol-foreground-hover)] hover:border-[var(--oomol-foreground-hover)] hover:text-[var(--oomol-foreground-contrast)]",
          "active:opacity-90",
        ].join(" "),
        // Brand-color button (opt-in, rarely used)
        primary: [
          "bg-[var(--oomol-primary)] border-[var(--oomol-primary)] text-white",
          "hover:bg-[var(--oomol-primary-hover)] hover:border-[var(--oomol-primary-hover)]",
          "active:bg-[var(--oomol-primary-active)] active:border-[var(--oomol-primary-active)]",
        ].join(" "),
        destructive: [
          "bg-[var(--oomol-error)] border-[var(--oomol-error)] text-white",
          "hover:opacity-90",
        ].join(" "),
        // Vercel "Get a demo" hairline style
        outline: [
          "bg-transparent border-[var(--oomol-border-strong)] text-[var(--oomol-text-primary)]",
          "hover:bg-[var(--oomol-bg-spotlight)] hover:text-[var(--oomol-text-primary)] hover:border-[var(--oomol-border-strong)]",
        ].join(" "),
        // Subtle filled (used inside CTA panels, nav)
        secondary: [
          "bg-[var(--oomol-bg-container)] border-[var(--oomol-divider)] text-[var(--oomol-text-primary)]",
          "hover:bg-[var(--oomol-bg-spotlight)]",
        ].join(" "),
        // Alias kept for homepage CTA-block secondary action (inverted surface)
        contrast: [
          "bg-[var(--oomol-bg-elevated)] border-[var(--oomol-border-default)] text-[var(--oomol-text-primary)]",
          "hover:bg-[var(--oomol-bg-spotlight)]",
        ].join(" "),
        // Ghost (no border, appears only on hover)
        ghost: [
          "bg-transparent border-transparent text-[var(--oomol-text-secondary)]",
          "hover:bg-[var(--oomol-hover-bg)] hover:text-[var(--oomol-text-primary)]",
        ].join(" "),
        // Pure underline text link（无线框占位）
        link: [
          "bg-transparent border-0 text-[var(--oomol-primary)]",
          "underline-offset-[3px] hover:underline hover:text-[var(--oomol-primary-hover)]",
          "h-auto min-h-0 p-0",
        ].join(" "),
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
