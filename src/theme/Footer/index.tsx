import styles from "./styles.module.scss";

import React, { useState, useMemo } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import { LocalDropdown } from "../components/LocalDropdown";
import { ColorModeDropdown } from "../components/ColorModeDropdown";
import { Popover } from "@site/src/components/Popover";
import { useColorMode } from "@docusaurus/theme-common";

interface FooterLinkProps {
  href?: string;
  label: string;
  to?: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({
  to,
  href,
  label,
  ...props
}) => {
  const footerLinkHref = useBaseUrl(href ?? "", {
    forcePrependBaseUrl: undefined,
  });
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
};

type LogoNodeDataType = {
  name: string;
  iconClass: string;
  href: string;
  size: number;
};

const logoNodeData: LogoNodeDataType[] = [
  {
    name: "twitter",
    iconClass: "i-bi-twitter-x",
    href: "https://twitter.com/OomolStudio",
    size: 20,
  },
  {
    name: "discord",
    iconClass: "i-bi-discord",
    href: "https://discord.gg/W3evr2kJDa",
    size: 22,
  },
  {
    name: "youtube",
    iconClass: "i-bi-youtube",
    href: "https://www.youtube.com/@oomolstudio",
    size: 22,
  },
  {
    name: "github",
    iconClass: "i-bi-github",
    href: "https://github.com/oomol-lab",
    size: 20,
  },
];

const logoNodeDataCN: LogoNodeDataType[] = [
  {
    name: "twitter",
    iconClass: "i-bi-twitter-x",
    href: "https://twitter.com/OomolStudio",
    size: 20,
  },
  {
    name: "discord",
    iconClass: "i-bi-discord",
    href: "https://discord.gg/W3evr2kJDa",
    size: 22,
  },
  {
    name: "youtube",
    iconClass: "i-bi-youtube",
    href: "https://www.youtube.com/@oomolstudio",
    size: 22,
  },
  {
    name: "github",
    iconClass: "i-bi-github",
    href: "https://github.com/oomol-lab",
    size: 20,
  },
];

const Footer: React.FC = () => {
  const { siteConfig, i18n } = useDocusaurusContext() as any;
  const { copyright, links = [] } = siteConfig.themeConfig.footer;
  const hasFooter = !!siteConfig.themeConfig.footer;
  const currentLocale = i18n.currentLocale;
  const [isHovered, setIsHovered] = useState(false);
  const { colorMode } = useColorMode();

  const logoSrc = useMemo(() => {
    const langPrefix = currentLocale === "zh-CN" ? "zh" : "en";
    const themePrefix = colorMode === "dark" ? "dark" : "light";
    return `/img/logo-${langPrefix}-${themePrefix}.svg`;
  }, [currentLocale, colorMode]);

  if (!hasFooter) {
    return null;
  }

  const logoNodesArray =
    currentLocale === "zh-CN" ? logoNodeDataCN : logoNodeData;

  const logoNodes = logoNodesArray.map((data, index) => {
    return (
      <a target="_blank" rel="noreferrer" href={data.href} key={`${index}-${data.name}`}>
        <div className={styles.iconBox}>
          <i
            className={data.iconClass}
            style={{ fontSize: `${data.size}px` }}
          />
        </div>
      </a>
    );
  });

  return (
    <footer className={styles.root}>
      <div className={clsx(styles.content, styles.center)}>
        <div className={styles.leftBox}>
          <div className={styles.leftBoxLogo}>
            <img
              alt="oomol"
              src={logoSrc}
              height={24}
              loading="lazy"
            />
          </div>
          <div className={styles.iconOutBox}>
            {logoNodes}
            <Popover
              trigger={
                <div
                  className={styles.iconBox}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <i
                    className="i-simple-icons-wechat"
                    style={{
                      fontSize: "22px",
                      color: isHovered ? "var(--oomol-primary)" : "inherit",
                    }}
                  />
                </div>
              }
              position="top"
              content={
                <img
                  alt="qrcode"
                  className={styles.qrcode}
                  src={"/img/qrcode@3x.png"}
                />
              }
            />
          </div>
        </div>
        <div className={styles.links}>
          {links.map((linkItem, i) => (
            <div key={i} className={styles.category}>
              {linkItem.title && (
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
          <div className={styles.leftControls}>
            <ColorModeDropdown />
          </div>
          <div className={styles.bottomInfo}>
            {copyright}
            {currentLocale === "zh-CN" && (
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
                浙ICP备2023018874号-1
              </a>
            )}
          </div>
          <div className={styles.rightControls}>
            <LocalDropdown />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
