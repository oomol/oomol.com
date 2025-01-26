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

  return (
    <button
      onClick={onClick}
      className={clsx(disabled ? styles.btnDisable : styles.btn, className)}
    >
      <a target={target} href={href}>
        <div className={styles.btnContent}>{renderBtnContent()}</div>
      </a>
    </button>
  );
};
