import styles from "./styles.module.scss";

import React, { useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import { LocalDropdown } from "../components/LocalDropdown";
import { Popover } from "@site/src/components/Popover";

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
  src: string;
  href: string;
  width: number;
};

const logoNodeData: LogoNodeDataType[] = [
  {
    name: "twitter",
    src: "/img/pages/footer/x.svg",
    href: "https://twitter.com/OomolStudio",
    width: 20,
  },
  {
    name: "discord",
    src: "/img/pages/footer/discord.svg",
    href: "https://discord.gg/W3evr2kJDa",
    width: 22,
  },
  {
    name: "youtube",
    src: "/img/pages/footer/youtube.svg",
    href: "https://www.youtube.com/@oomolstudio",
    width: 22,
  },
  {
    name: "github",
    src: "/img/pages/footer/github.svg",
    href: "https://github.com/oomol-lab",
    width: 20,
  },
];

const logoNodeDataCN: LogoNodeDataType[] = [
  {
    name: "twitter",
    src: "/img/pages/footer/x.svg",
    href: "https://twitter.com/OomolStudio",
    width: 20,
  },
  {
    name: "discord",
    src: "/img/pages/footer/discord.svg",
    href: "https://discord.gg/W3evr2kJDa",
    width: 22,
  },
  {
    name: "youtube",
    src: "/img/pages/footer/youtube.svg",
    href: "https://www.youtube.com/@oomolstudio",
    width: 22,
  },
  {
    name: "github",
    src: "/img/pages/footer/github.svg",
    href: "https://github.com/oomol-lab",
    width: 20,
  },
];

const Footer: React.FC = () => {
  const { siteConfig, i18n } = useDocusaurusContext() as any;
  const { copyright, links = [] } = siteConfig.themeConfig.footer;
  const hasFooter = !!siteConfig.themeConfig.footer;
  const currentLocale = i18n.currentLocale;
  const [isHovered, setIsHovered] = useState(false);

  if (!hasFooter) {
    return null;
  }

  const logoNodesArray =
    currentLocale === "zh-CN" ? logoNodeDataCN : logoNodeData;

  const logoNodes = logoNodesArray.map((data, index) => {
    return (
      <a target="_blank" href={data.href} key={`${index}-${data.name}`}>
        <div className={styles.iconBox}>
          <img
            alt={data.name}
            src={data.src}
            width={data.width}
            loading="lazy"
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
              src={
                currentLocale === "en" ? "/img/logo-en.svg" : "/img/logo-zh.svg"
              }
              height={24}
              loading="lazy"
            />
          </div>
          <div className={styles.iconOutBox}>
            {logoNodes}
            <Popover
              trigger={
                <img
                  className={styles["work-weixin"]}
                  src={
                    isHovered
                      ? "/img/pages/footer/wecom-active.svg"
                      : "/img/pages/footer/wecom.svg"
                  }
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
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
          <div className={styles.bottomInfo}>
            {copyright}
            {currentLocale === "zh-CN" && (
              <a href="https://beian.miit.gov.cn/" target="_blank">
                浙ICP备2023018874号-1
              </a>
            )}
          </div>
          <LocalDropdown />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
