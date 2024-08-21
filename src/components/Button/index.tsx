import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  href,
  target,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <a target={target} href={href}>
      <button
        className={`${disabled ? styles.btnDisable : styles.btn} ${className}`}
      >
        {children}
      </button>
    </a>
  );
};
