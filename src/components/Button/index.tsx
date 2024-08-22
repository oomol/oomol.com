import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}

export const Button = ({
  children,
  href,
  target,
  className,
  disabled,
  icon,
  iconPosition = "start",
}: ButtonProps) => {
  const renderBtnContent = () => {
    switch (iconPosition) {
      case "start": {
        return (
          <div className={styles["content"]}>
            {icon}
            {children}
          </div>
        );
      }
      case "end": {
        return (
          <div className={styles["content"]}>
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
    <a target={target} href={href}>
      <button
        className={`${disabled ? styles.btnDisable : styles.btn} ${className}`}
      >
        {renderBtnContent()}
      </button>
    </a>
  );
};
