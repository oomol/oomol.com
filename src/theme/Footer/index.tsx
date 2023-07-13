import styles from "./styles.module.scss";

import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import ColorModeToggle from "@theme/ColorModeToggle";
import {useColorMode} from "@docusaurus/theme-common";

interface FooterLinkProps {
    href?: string
    label: string
    to?: string
}

const FooterLink: React.FC<FooterLinkProps> = ({to, href, label, ...props}) => {
    const footerLinkHref = useBaseUrl(href ?? "", {forcePrependBaseUrl: undefined});
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
                : {href: footerLinkTo})}
            {...props}
        >
            {label}
        </a>
    );
}

const Footer: React.FC = () => {
    const {siteConfig} = useDocusaurusContext();
    const {copyright, links = []} = siteConfig.themeConfig.footer;
    const hasFooter = !!siteConfig.themeConfig.footer;
    const {colorMode, setColorMode} = useColorMode();
    if (!hasFooter) {
        return null;
    }

    return (
        <footer className={styles.root}>
            <div className={styles.content}>
                <div className={styles.leftBox}>
                    <div className={styles.leftBoxLogo}>
                        <img
                            alt="logo"
                            src="/img/oomol_app.svg"
                            width={42}
                            style={{marginRight: 16}}
                            loading="lazy"
                        />
                        <img
                            alt="oomol"
                            src="/img/oomol.svg"
                            width={72}
                            loading="lazy"
                        />
                    </div>
                    <div className={styles.iconOutBox}>
                        <a target="_blank" href="https://twitter.com/OomolStudio">
                            <div className={styles.iconBox}>
                                <img
                                    alt="twitter"
                                    src="/img/twitter.svg"
                                    width={20}
                                    loading="lazy"
                                />
                            </div>
                        </a>
                        <a target="_blank" href="https://discord.com/channels/918759925805617163/1128586819185934436">
                            <div className={styles.iconBox}>
                                <img
                                    alt="discord"
                                    src="/img/discord.svg"
                                    width={22}
                                    loading="lazy"
                                />
                            </div>
                        </a>
                        <a target="_blank" href="https://www.youtube.com/@oomolstudio">
                            <div className={styles.iconBox}>
                                <img
                                    alt="youtube"
                                    src="/img/youtube.svg"
                                    width={22}
                                    loading="lazy"
                                />
                            </div>
                        </a>
                        <a target="_blank" href="https://github.com/oomol">
                            <div className={styles.iconBox}>
                                <img
                                    alt="github"
                                    src="/img/github.svg"
                                    width={20}
                                    loading="lazy"
                                />
                            </div>
                        </a>
                    </div>

                </div>
                <div className={styles.links}>
                    {links.map((linkItem, i) => (
                        <div key={i} className={styles.category}>
                            {Boolean(linkItem.title) && (
                                <div className={styles.title}>{linkItem.title}</div>
                            )}
                            {linkItem.items?.length > 0 && (
                                <div className={styles.items}>
                                    {linkItem.items.map((item, i) => (
                                        <div className={styles.item} key={i}>
                                            <FooterLink {...item} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.border}>
                <div className={styles.bottom}>
                    <div className={styles.bottomLeft}>
                        <div className={styles.iconBox}>
                            <img
                                alt="logo"
                                src="/img/logo_black.svg"
                                width={20}
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className={styles.bottomInfo}>
                        {copyright}
                    </div>
                    <div className={styles.bottomRight}>
                        <ColorModeToggle
                            value={colorMode}
                            onChange={setColorMode}
                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
