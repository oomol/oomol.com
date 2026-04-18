import { cn } from "@site/src/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const alertVariants = cva(
  [
    "relative w-full rounded-[12px] border px-4 py-3 text-oomol-sm",
    "[&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-[var(--oomol-text-primary)]",
    "[&>svg~*]:pl-7",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-[var(--oomol-bg-container)] border-[var(--oomol-divider)] text-[var(--oomol-text-primary)]",
        info: "bg-[var(--oomol-bg-container)] border-[var(--oomol-divider)] text-[var(--oomol-text-primary)]",
        success:
          "bg-[var(--oomol-success-bg)] border-[var(--oomol-success-border)] text-[var(--oomol-text-primary)]",
        warning:
          "bg-[var(--oomol-warning-bg)] border-[var(--oomol-warning-border)] text-[var(--oomol-text-primary)]",
        destructive:
          "bg-[var(--oomol-error-bg)] border-[var(--oomol-error-border)] text-[var(--oomol-text-primary)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-oomol-sm leading-[1.55] [&_p]:leading-[1.55]", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
