import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";

import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Popover } from "@site/src/components/Popover";
import { Button } from "@site/src/components/ui/button";
import ThemedImage from "@theme/ThemedImage";
import { clsx } from "clsx";
import React, { useMemo } from "react";

import { ColorModeDropdown } from "../components/ColorModeDropdown";
import { LocalDropdown } from "../components/LocalDropdown";

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
  /** Slightly larger glyph (22px) for icons that read small at xl */
  iconWide?: boolean;
};

const logoNodeData: LogoNodeDataType[] = [
  {
    name: "twitter",
    iconClass: "i-bi-twitter-x",
    href: "https://twitter.com/OomolStudio",
  },
  {
    name: "discord",
    iconClass: "i-bi-discord",
    href: "https://discord.gg/W3evr2kJDa",
    iconWide: true,
  },
  {
    name: "youtube",
    iconClass: "i-bi-youtube",
    href: "https://www.youtube.com/@oomolstudio",
    iconWide: true,
  },
  {
    name: "github",
    iconClass: "i-bi-github",
    href: "https://github.com/oomol-lab",
  },
];

const logoNodeDataCN: LogoNodeDataType[] = [
  {
    name: "twitter",
    iconClass: "i-bi-twitter-x",
    href: "https://twitter.com/OomolStudio",
  },
  {
    name: "discord",
    iconClass: "i-bi-discord",
    href: "https://discord.gg/W3evr2kJDa",
    iconWide: true,
  },
  {
    name: "youtube",
    iconClass: "i-bi-youtube",
    href: "https://www.youtube.com/@oomolstudio",
    iconWide: true,
  },
  {
    name: "github",
    iconClass: "i-bi-github",
    href: "https://github.com/oomol-lab",
  },
];

function showCookieConsent() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent("show-cookie-consent"));
}

const Footer: React.FC = () => {
  const { siteConfig, i18n } =
    useDocusaurusContext() as unknown as DocusaurusContext & {
      siteConfig: {
        themeConfig: {
          footer: {
            copyright: string;
            links: Array<{ title: string; items: FooterLinkProps[] }>;
          };
        };
      };
      i18n: { currentLocale: string };
    };
  const { copyright, links = [] } = siteConfig.themeConfig.footer;
  const hasFooter = !!siteConfig.themeConfig.footer;
  const currentLocale = i18n.currentLocale;

  // Keep the zh-CN logo files: static cleanup will not detect them from this
  // dynamic path. Runtime uses logo-zh-light.svg and logo-zh-dark.svg.
  const logoLight = useBaseUrl(
    `/img/logo-${currentLocale === "zh-CN" ? "zh" : "en"}-light.svg`
  );
  const logoDark = useBaseUrl(
    `/img/logo-${currentLocale === "zh-CN" ? "zh" : "en"}-dark.svg`
  );
  const qrCodeSrc = useBaseUrl("/img/qrcode.png");

  const logoSources = useMemo(
    () => ({
      light: logoLight,
      dark: logoDark,
    }),
    [logoDark, logoLight]
  );

  if (!hasFooter) {
    return null;
  }

  const logoNodesArray =
    currentLocale === "zh-CN" ? logoNodeDataCN : logoNodeData;

  const logoNodes = logoNodesArray.map((data, index) => {
    return (
      <a
        target="_blank"
        rel="noreferrer"
        href={data.href}
        key={`${index}-${data.name}`}
      >
        <div className={styles.iconBox}>
          <i
            className={clsx(
              data.iconClass,
              styles.socialIcon,
              data.iconWide && styles.socialIconWide
            )}
            aria-hidden="true"
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
            <ThemedImage
              sources={logoSources}
              alt={translate({ message: "Theme.logo.alt" })}
              height={24}
            />
          </div>
          <div className={styles.iconOutBox}>
            {logoNodes}
            <Popover
              trigger={
                <div
                  className={styles.iconBox}
                  role="button"
                  tabIndex={0}
                  aria-label={translate({
                    message: "HOME.Community.qrcodeAlt",
                  })}
                >
                  <i
                    className={clsx("i-simple-icons-wechat", styles.socialIcon)}
                    aria-hidden="true"
                  />
                </div>
              }
              position="top"
              content={
                <img
                  alt={translate({ message: "HOME.Community.qrcodeAlt" })}
                  className={styles.qrcode}
                  src={qrCodeSrc}
                  loading="lazy"
                  decoding="async"
                />
              }
            />
          </div>
        </div>
        <div className={styles.links}>
          {links.map((linkItem, i) => (
            <div key={i} className={styles.category}>
              {linkItem.title && (
                <div className={styles.categoryTitle}>{linkItem.title}</div>
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
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noreferrer"
              >
                浙ICP备2023018874号-1
              </a>
            )}
          </div>
          <div className={styles.rightControls}>
            <ColorModeDropdown
              buttonVariant="outline"
              triggerClassName={styles.footerControlSurface}
            />
            <Button
              className={`${styles.cookieControlButton} ${styles.footerControlSurface}`}
              size="sm"
              variant="outline"
              onClick={showCookieConsent}
            >
              <i className={`i-lucide-cookie ${styles.cookieControlIcon}`} />
              {translate({ message: "FOOTER.cookieSettings" })}
            </Button>
            <LocalDropdown
              buttonVariant="outline"
              triggerClassName={styles.footerControlSurface}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
