import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  onClick?: () => void;
}

export const Button = ({ children, href, target, className }: ButtonProps) => {
  return (
    <button className={`${styles.btn} ${className}`}>
      <a target={target} href={href}>
        {children}
      </a>
    </button>
  );
};
