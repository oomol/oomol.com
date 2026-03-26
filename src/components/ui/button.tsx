import styles from "./button.module.scss";

import type { ButtonProps as ArcoButtonProps } from "@arco-design/web-react";

import { Button as ArcoButton } from "@arco-design/web-react";
import { cn } from "@site/src/lib/utils";
import * as React from "react";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const variantClassMap: Record<ButtonVariant, string> = {
  default: styles.variantDefault,
  destructive: styles.variantDestructive,
  outline: styles.variantOutline,
  secondary: styles.variantSecondary,
  ghost: styles.variantGhost,
  link: styles.variantLink,
};

const sizeClassMap: Record<ButtonSize, string> = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
  lg: styles.sizeLg,
  icon: styles.sizeIcon,
};

const variantMap: Record<
  ButtonVariant,
  Pick<ArcoButtonProps, "status" | "type">
> = {
  default: { type: "primary" },
  destructive: { status: "danger", type: "primary" },
  outline: { type: "outline" },
  secondary: { type: "secondary" },
  ghost: { type: "text" },
  link: { type: "text" },
};

export interface ButtonProps
  extends Omit<ArcoButtonProps, "children" | "size" | "status" | "type"> {
  asChild?: boolean;
  children?: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const buttonVariants = ({
  className,
  size = "default",
  variant = "default",
}: Pick<ButtonProps, "className" | "size" | "variant">) =>
  cn(styles.button, variantClassMap[variant], sizeClassMap[size], className);

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const child = asChild
      ? (React.Children.only(props.children) as React.ReactElement<{
          children?: React.ReactNode;
          className?: string;
          href?: string;
          rel?: string;
          target?: string;
        }>)
      : null;
    const childProps = child?.props;
    const mergedVariant = variant ?? "default";
    const mergedSize = size ?? "default";
    const mergedClassName = buttonVariants({
      className: cn(className, childProps?.className),
      size: mergedSize,
      variant: mergedVariant,
    });
    const { href, rel, target } = childProps ?? {};
    const anchorProps = href
      ? {
          ...(props.anchorProps ?? {}),
          ...(rel ? { rel } : {}),
        }
      : props.anchorProps;

    return (
      <ArcoButton
        {...variantMap[mergedVariant]}
        anchorProps={anchorProps}
        className={mergedClassName}
        href={href ?? props.href}
        ref={ref as never}
        size={
          mergedSize === "sm"
            ? "small"
            : mergedSize === "lg"
              ? "large"
              : "default"
        }
        target={target ?? props.target}
        {...props}
      >
        {childProps?.children ?? props.children}
      </ArcoButton>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
