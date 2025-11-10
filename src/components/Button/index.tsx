import clsx from "clsx";
import styles from "./styles.module.scss";

// TODO: 添加默认的 size ，large middle small
export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  layout?: "left" | "center" | "right";
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  href,
  target,
  className,
  disabled,
  icon,
  iconPosition = "start",
  layout = "center",
  onClick,
  ariaLabel,
  type = "button",
}: ButtonProps) => {
  const getLayout = (layout: string) => {
    switch (layout) {
      case "left": {
        return styles.left;
      }
      case "right": {
        return styles.right;
      }
      default: {
        return styles.content;
      }
    }
  };

  const renderBtnContent = () => {
    switch (iconPosition) {
      case "start": {
        return (
          <div className={`${getLayout(layout)}`}>
            {icon}
            {children}
          </div>
        );
      }
      case "end": {
        return (
          <div className={`${getLayout(layout)}`}>
            {children}
            {icon}
          </div>
        );
      }
      default: {
        return <>{children}</>;
      }
    }
  };

  const buttonClass = clsx(
    disabled ? styles.btnDisable : styles["oo-btn"],
    className
  );

  // 如果是链接，渲染 <a> 标签
  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={buttonClass}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
      >
        {renderBtnContent()}
      </a>
    );
  }

  // 如果是按钮，渲染 <button> 标签
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      aria-label={ariaLabel}
    >
      {renderBtnContent()}
    </button>
  );
};
