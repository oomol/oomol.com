import styles from "./styles.module.scss";

import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ColorModeToggle from "@theme/ColorModeToggle";
import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";

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
    src: "/img/twitter.svg",
    href: "https://twitter.com/OomolStudio",
    width: 20,
  },
  {
    name: "discord",
    src: "/img/discord.svg",
    href: "https://discord.com/channels/918759925805617163/1128586819185934436",
    width: 22,
  },
  {
    name: "youtube",
    src: "/img/youtube.svg",
    href: "https://www.youtube.com/@oomolstudio",
    width: 22,
  },
  {
    name: "github",
    src: "/img/github.svg",
    href: "https://github.com/oomol-lab",
    width: 20,
  },
];

const Footer: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { copyright, links = [] } = siteConfig.themeConfig.footer;
  const hasFooter = !!siteConfig.themeConfig.footer;
  const { colorMode, setColorMode } = useColorMode();
  console.log("colorMode", colorMode);
  if (!hasFooter) {
    return null;
  }

  const logoNodes = logoNodeData.map((data, index) => {
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

  console.log(links);

  // return (
  //   <footer className={styles.root}>
  //     <div>
  //       <div className={styles.iconOutBox}>{logoNodes}</div>
  //       <div></div>
  //     </div>
  //     <div>2</div>
  //   </footer>
  // );
  return (
    <footer className={styles.root}>
      <div className={clsx(styles.content, styles.center)}>
        <div className={styles.leftBox}>
          <div className={styles.leftBoxLogo}>
            <img
              alt="logo"
              src="/img/oomol_app.svg"
              width={42}
              style={{ marginRight: 16 }}
              loading="lazy"
            />
            <img alt="oomol" src="/img/oomol.svg" width={72} loading="lazy" />
          </div>
          <div className={styles.iconOutBox}>{logoNodes}</div>
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
            <a href="https://beian.miit.gov.cn/" target="_blank">
              浙ICP备2023018874号-1
            </a>
          </div>
          <div className={styles.bottomRight}>
            <ColorModeToggle value={colorMode} onChange={setColorMode} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
