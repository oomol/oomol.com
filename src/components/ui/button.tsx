import { Slot } from "@radix-ui/react-slot";
import { cn } from "@site/src/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

/**
 * shadcn/ui Button, adapted for OOMOL.
 *
 * 外部 API 保持与旧版兼容（variant / size / asChild），
 * 让已有的 <Button variant="outline" size="lg" asChild> 调用无需修改。
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-medium tracking-[-0.005em]",
    "rounded-[10px] border transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
    "no-underline hover:no-underline",
  ].join(" "),
  {
    variants: {
      variant: {
        // 主 CTA：近黑底白字（浅色模式）/ 近白底黑字（深色模式）
        default: [
          "bg-[var(--oomol-foreground)] border-[var(--oomol-foreground)] text-[var(--oomol-foreground-contrast)]",
          "hover:bg-[var(--oomol-foreground-hover)] hover:border-[var(--oomol-foreground-hover)] hover:text-[var(--oomol-foreground-contrast)]",
        ].join(" "),
        // 品牌主色按钮（保留给需要的场景）
        primary: [
          "bg-[var(--oomol-primary)] border-[var(--oomol-primary)] text-[var(--oomol-white)]",
          "hover:bg-[var(--oomol-primary-hover)] hover:border-[var(--oomol-primary-hover)]",
          "active:bg-[var(--oomol-primary-active)] active:border-[var(--oomol-primary-active)]",
        ].join(" "),
        // 危险
        destructive: [
          "bg-[var(--oomol-error)] border-[var(--oomol-error)] text-white",
          "hover:opacity-90",
        ].join(" "),
        // Hairline outline（Vercel 副 CTA）
        outline: [
          "bg-transparent border-[var(--oomol-border-strong)] text-[var(--oomol-text-primary)]",
          "hover:bg-[var(--oomol-bg-spotlight)] hover:text-[var(--oomol-text-primary)]",
        ].join(" "),
        // 深色对比（CTA 块里的副按钮）
        contrast: [
          "bg-[var(--oomol-bg-elevated)] border-[var(--oomol-border-default)] text-[var(--oomol-text-primary)]",
          "hover:bg-[var(--oomol-bg-spotlight)]",
        ].join(" "),
        // 次要（浅紫 pill）
        secondary: [
          "bg-[var(--oomol-bg-container)] border-[var(--oomol-divider)] text-[var(--oomol-text-primary)]",
          "hover:bg-[var(--oomol-bg-spotlight)]",
        ].join(" "),
        // 幽灵
        ghost: [
          "bg-transparent border-transparent text-[var(--oomol-text-secondary)]",
          "hover:bg-[var(--oomol-hover-bg)] hover:text-[var(--oomol-text-primary)]",
        ].join(" "),
        // 纯链接
        link: [
          "bg-transparent border-transparent text-[var(--oomol-primary)] underline underline-offset-2 p-0 h-auto min-h-0",
          "hover:text-[var(--oomol-primary-hover)] hover:underline",
        ].join(" "),
      },
      size: {
        default: "h-[46px] min-h-[46px] px-[1.3rem] text-[0.96rem] min-w-[10rem]",
        sm: "h-9 min-h-9 px-3 text-[0.88rem] rounded-lg",
        lg: "h-[46px] min-h-[46px] px-[1.3rem] text-[0.96rem] min-w-[10rem]",
        icon: "h-10 w-10 min-w-0 p-0",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
