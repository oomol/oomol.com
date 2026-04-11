import styles from "./styles.module.scss";

import type { DocusaurusContext } from "@docusaurus/types";
import type { ComponentProps } from "react";

import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";
import NavbarItem from "@theme/NavbarItem";
import SearchBar from "@theme/SearchBar";
import ThemedImage from "@theme/ThemedImage";
import { Button } from "@site/src/components/ui/button";
import { clsx } from "clsx";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";

interface NavbarProps {}

type ProductMenuEntry = {
  description: string;
  href: string;
  iconClassName: string;
  key: string;
  label: string;
};

function isProductEntryActive(pathname: string, locale: string, href: string) {
  return (
    pathname === href ||
    pathname.startsWith(`${href}/`) ||
    pathname === `/${locale}${href}` ||
    pathname.startsWith(`/${locale}${href}/`)
  );
}

const DefaultNavItemPosition = "right";

function splitNavItemsByPosition(
  items: Array<ComponentProps<typeof NavbarItem>>
): {
  leftItems: Array<ComponentProps<typeof NavbarItem>>;
  rightItems: Array<ComponentProps<typeof NavbarItem>>;
} {
  const leftItems = items.filter(
    item => (item.position ?? DefaultNavItemPosition) === "left"
  );
  const rightItems = items.filter(
    item => (item.position ?? DefaultNavItemPosition) === "right"
  );

  return { leftItems, rightItems };
}

const NavbarComponent: React.FC<NavbarProps> = memo(() => {
  const mobileSidebar = useNavbarMobileSidebar();
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const productMenuRef = useRef<HTMLDivElement>(null);
  const productMenuCloseTimeoutRef = useRef<number | null>(null);

  const {
    siteConfig: {
      themeConfig: {
        navbar: { items },
      },
    },
    i18n,
  } = useDocusaurusContext() as unknown as DocusaurusContext & {
    siteConfig: {
      themeConfig: {
        navbar: { items: Array<ComponentProps<typeof NavbarItem>> };
      };
    };
    i18n: { currentLocale: string };
  };
  const locale = i18n.currentLocale;
  const location = useLocation();

  const logoLight = useBaseUrl(
    `/img/logo-${locale === "zh-CN" ? "zh" : "en"}-light.svg`
  );
  const logoDark = useBaseUrl(
    `/img/logo-${locale === "zh-CN" ? "zh" : "en"}-dark.svg`
  );

  const logoSources = useMemo(
    () => ({
      light: logoLight,
      dark: logoDark,
    }),
    [logoDark, logoLight]
  );

  const isDocumentPath = useMemo(() => {
    return (
      location.pathname.startsWith("/docs") ||
      location.pathname.startsWith(`/${locale}/docs`)
    );
  }, [location.pathname, locale]);

  const { leftItems, rightItems } = useMemo(
    () => splitNavItemsByPosition(items),
    [items]
  );

  const productMenuItem = useMemo(
    () =>
      leftItems.find(item =>
        String(item.className ?? "").includes("productDropdown")
      ),
    [leftItems]
  );

  const productMenuEntries = useMemo<ProductMenuEntry[]>(
    () => [
      {
        key: "oo-cli",
        href: "/docs/cloud-services/cli",
        label: translate({
          id: "item.label.navbar.oo-cli",
          message: "oo-cli",
        }),
        description: translate({
          message: "Theme.Navbar.product.cli.description",
        }),
        iconClassName: "i-lucide-terminal-square",
      },
      {
        key: "studio",
        href: "/studio",
        label: translate({
          id: "item.label.navbar.oomol-studio",
          message: "OOMOL Studio",
        }),
        description: translate({
          message: "Theme.Navbar.product.studio.description",
        }),
        iconClassName: "i-lucide-square-terminal",
      },
      {
        key: "cloud",
        href: "/cloud",
        label: translate({
          id: "item.label.navbar.oomol-cloud",
          message: "OOMOL Cloud",
        }),
        description: translate({
          message: "Theme.Navbar.product.cloud.description",
        }),
        iconClassName: "i-lucide-cloud-upload",
      },
      {
        key: "oomol-ai",
        href: "/app",
        label: translate({
          id: "item.label.navbar.oomol-ai",
          message: "OOMOL AI",
        }),
        description: translate({
          message: "Theme.Navbar.product.ai.description",
        }),
        iconClassName: "i-lucide-bot",
      },
    ],
    []
  );

  useEffect(() => {
    setProductMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        productMenuRef.current &&
        !productMenuRef.current.contains(event.target as Node)
      ) {
        setProductMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (productMenuCloseTimeoutRef.current !== null) {
        window.clearTimeout(productMenuCloseTimeoutRef.current);
      }
    };
  }, []);

  const openProductMenu = () => {
    if (productMenuCloseTimeoutRef.current !== null) {
      window.clearTimeout(productMenuCloseTimeoutRef.current);
      productMenuCloseTimeoutRef.current = null;
    }
    setProductMenuOpen(true);
  };

  const closeProductMenu = () => {
    if (productMenuCloseTimeoutRef.current !== null) {
      window.clearTimeout(productMenuCloseTimeoutRef.current);
    }

    productMenuCloseTimeoutRef.current = window.setTimeout(() => {
      setProductMenuOpen(false);
      productMenuCloseTimeoutRef.current = null;
    }, 120);
  };

  const isSignedIn = () => {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    return cookies.some(cookie => cookie.includes("oomol-signed-in"));
  };

  const CALLBACK_URL = "https://oomol.com/";
  const CONSOLE_URL = "https://console.oomol.com/";

  const handleSignin = () => {
    if (isSignedIn()) {
      return window.open(CONSOLE_URL, "_self");
    }

    const redirectURL = `https://api.oomol.com/v1/auth/redirect?redirect=${encodeURIComponent(CALLBACK_URL)}`;
    window.open(redirectURL, "_self");
  };

  // const prevScrollPosRef = React.useRef(0);

  // useEffect(() => {
  //   let ticking = false;

  //   const handleEvents = () => {
  //     const currentScrollPos = window.pageYOffset;
  //     const viewportWidth = window.innerWidth;

  //     if (viewportWidth < 996) {
  //       setHideNavbar(false);
  //       prevScrollPosRef.current = currentScrollPos;
  //       return;
  //     }

  //     const isScrollingDown = prevScrollPosRef.current < currentScrollPos;
  //     setHideNavbar(isScrollingDown && currentScrollPos > 50);
  //     prevScrollPosRef.current = currentScrollPos;
  //     ticking = false;
  //   };

  //   const throttledHandler = () => {
  //     if (!ticking) {
  //       window.requestAnimationFrame(() => {
  //         handleEvents();
  //         ticking = false;
  //       });
  //       ticking = true;
  //     }
  //   };

  //   prevScrollPosRef.current = window.pageYOffset;

  //   handleEvents();

  //   window.addEventListener("scroll", throttledHandler, { passive: true });
  //   window.addEventListener("resize", throttledHandler, { passive: true });

  //   return () => {
  //     window.removeEventListener("scroll", throttledHandler);
  //     window.removeEventListener("resize", throttledHandler);
  //   };
  // }, []);

  return (
    <header
      className={clsx("navbar", styles.navbar, {
        "navbar-sidebar--show": mobileSidebar.shown,
      })}
    >
      <div className={clsx("navbar__inner", styles.inner)}>
        <div className="navbar__items">
          <Link className={styles.brand} to="/">
            <ThemedImage sources={logoSources} alt="logo" height={32} />
          </Link>
          {leftItems.map((item, i) => {
            if (item === productMenuItem) {
              const isProductActive =
                location.pathname.startsWith("/docs/cloud-services/cli") ||
                location.pathname.startsWith(
                  `/${locale}/docs/cloud-services/cli`
                ) ||
                location.pathname.startsWith("/studio") ||
                location.pathname.startsWith(`/${locale}/studio`) ||
                location.pathname.startsWith("/cloud") ||
                location.pathname.startsWith(`/${locale}/cloud`) ||
                location.pathname.startsWith("/app") ||
                location.pathname.startsWith(`/${locale}/app`);

              return (
                <div
                  key={`product-menu-${i}`}
                  ref={productMenuRef}
                  className={styles.productMenuWrapper}
                  onMouseEnter={openProductMenu}
                  onMouseLeave={closeProductMenu}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={clsx(styles.productMenuTrigger, {
                      [styles.productMenuTriggerActive]: isProductActive,
                    })}
                    aria-expanded={productMenuOpen}
                    aria-haspopup="true"
                    onClick={() => setProductMenuOpen(current => !current)}
                  >
                    {translate({
                      message: "Theme.Navbar.product.label",
                    })}
                    <span
                      className={styles.productMenuCaret}
                      aria-hidden="true"
                    />
                  </Button>

                  <div
                    className={clsx(styles.productMenuPanel, {
                      [styles.productMenuPanelOpen]: productMenuOpen,
                    })}
                  >
                    {productMenuEntries.map(entry => (
                      <Link
                        key={entry.key}
                        to={entry.href}
                        className={clsx(styles.productMenuEntry, {
                          [styles.productMenuEntryActive]: isProductEntryActive(
                            location.pathname,
                            locale,
                            entry.href
                          ),
                        })}
                      >
                        <span className={styles.productMenuEntryIcon}>
                          <i className={entry.iconClassName} />
                        </span>
                        <span className={styles.productMenuEntryText}>
                          <span className={styles.productMenuEntryLabel}>
                            {entry.label}
                          </span>
                          <span className={styles.productMenuEntryDescription}>
                            {entry.description}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return <NavbarItem {...item} key={i} />;
          })}
        </div>
        <div className={styles.itemsRight}>
          {/* 当路由与文档路径匹配时，显示文档搜索框 */}
          {isDocumentPath && (
            <div className={styles.searchBar}>
              <SearchBar />
            </div>
          )}
          {rightItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
          <div className={styles.actions}>
            <Button asChild variant="outline" className={styles.downloadButton}>
              <a href="https://hub.oomol.com" target="_blank" rel="noreferrer">
                <i className="i-lucide-users" />
                {translate({ message: "Theme.Navbar.community" })}
              </a>
            </Button>
            <BrowserOnly
              fallback={
                <Button className={styles.loginButton}>
                  <i className="i-lucide-log-in" />
                  {translate({ message: "Theme.Navbar.login" })}
                </Button>
              }
            >
              {() => {
                const signedIn = isSignedIn();
                return (
                  <Button
                    className={styles.loginButton}
                    onClick={() => handleSignin()}
                  >
                    <i
                      className={
                        signedIn
                          ? "i-lucide-layout-dashboard"
                          : "i-lucide-log-in"
                      }
                    />
                    {translate({
                      message: signedIn
                        ? "Theme.Navbar.console"
                        : "Theme.Navbar.login",
                    })}
                  </Button>
                );
              }}
            </BrowserOnly>
          </div>
        </div>
        <div
          aria-label="Navigation bar toggle"
          className="navbar__toggle"
          role="button"
          tabIndex={0}
          onClick={mobileSidebar.toggle}
          onKeyDown={mobileSidebar.toggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            role="img"
            focusable="false"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M4 7h22M4 15h22M4 23h22"
            />
          </svg>
        </div>
      </div>
      <div
        role="presentation"
        className="navbar-sidebar__backdrop"
        onClick={mobileSidebar.toggle}
      />
      <NavbarMobileSidebar />
    </header>
  );
});

NavbarComponent.displayName = "Navbar";

const Navbar = NavbarComponent;

export default Navbar;
