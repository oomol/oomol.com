import styles from "./styles.module.css";

import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";

interface FooterLinkProps {
    href?: string
    label: string
    to?: string
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, href, label, ...props }) => {
    const footerLinkHref = useBaseUrl(href ?? "", { forcePrependBaseUrl: undefined });
    const footerLinkTo = useBaseUrl(to ?? "");
    return (
        <a
        className={styles.link}
        {...(href != null
          ? {
              href: footerLinkHref,
              rel: "noopener noreferrer",
              target: "_blank",
            }
          : { href: footerLinkTo })}
        {...props}
      >
        {label}
      </a>
    );
}

export const Footer: React.FC = () => {
    const { siteConfig } = useDocusaurusContext();
    const { copyright, links = [] } = siteConfig.themeConfig.footer;
    const hasFooter = !!siteConfig.themeConfig.footer;

    if (!hasFooter) {
        return null;
    }

    return (
        <footer className={styles.root}>
      <div className={clsx(styles.content, styles.center)}>
        <img
          alt="QuestDB logo"
          className={styles.logo}
          src="/img/footer/questdb.svg"
          title="QuestDB - Fastest open source database for time-series and analytics"
          width={108}
          height={27}
          loading="lazy"
        />

        <div className={styles.tagline}>
          <p className={styles.taglineText}>{siteConfig.tagline}</p>

          <div className={styles.subscribe}>
            <p className={styles.subscribeText}>
              Subscribe to our newsletter. Stay up to date with all things
              OOMOL.
            </p>
          </div>
        </div>

        <div className={styles.links}>
          {links.map((linkItem, i) => (
            <div key={i} className={styles.category}>
              {Boolean(linkItem.title) && (
                <span className={styles.title}>{linkItem.title}</span>
              )}

              {linkItem.items?.length > 0 && (
                <ul className={styles.items}>
                  {linkItem.items.map((item) => (
                    <li className={styles.item} key={item.href ?? item.to}>
                      <FooterLink {...item} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.border}>
        <div className={styles.bottom}>
          {copyright}
          <a className={styles.link} href="/privacy-notice/">
            Privacy
          </a>
          <a className={styles.link} href="/terms/">
            Terms
          </a>
        </div>
      </div>
    </footer>
    )
}