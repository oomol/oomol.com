import styles from "./styles.module.scss";

import NavbarItem from "@theme/NavbarItem";
import React, { memo, useMemo } from "react";
import type { ComponentProps } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { DocusaurusContext } from "@docusaurus/types";
import { useLocation } from "@docusaurus/router";
import SearchBar from "@theme/SearchBar";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";
import { translate } from "@docusaurus/Translate";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useColorMode } from "@docusaurus/theme-common";

const handleSignin = (locale: string) => {

  // const redirectURL = `https://api.oomol.com/v1/auth/redirect?redirect=${encodeURIComponent(CALLBACK_URL)}`;
  // window.open(redirectURL, "_self");
  const downloadUrl =
    locale === "zh-CN"
      ? "https://oomol.com/zh-CN/downloads/"
      : "https://oomol.com/downloads/";
  window.open(downloadUrl, "_self");
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NavbarProps {}

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
  const { colorMode } = useColorMode();

  const {
    siteConfig: {
      themeConfig: {
        navbar: { items },
      },
    },
    i18n,
  } = useDocusaurusContext() as unknown as DocusaurusContext & {
    siteConfig: { themeConfig: { navbar: { items: Array<ComponentProps<typeof NavbarItem>> } } };
    i18n: { currentLocale: string };
  };
  const locale = i18n.currentLocale;
  const location = useLocation();

  const logoSrc = useMemo(() => {
    const langPrefix = locale === "zh-CN" ? "zh" : "en";
    const themePrefix = colorMode === "dark" ? "dark" : "light";
    return `/img/logo-${langPrefix}-${themePrefix}.svg`;
  }, [locale, colorMode]);

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
            <img
              height={24}
              alt="logo"
              src={logoSrc}
              loading="lazy"
            />
          </Link>
          {/* 当路由与文档路径匹配时，显示文档搜索框 */}
          {isDocumentPath && (
            <div className={styles.searchBar}>
              <SearchBar />
            </div>
          )}
          {leftItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
          <div className={styles.actions}>
            <a
              href="https://hub.oomol.com/"
              className={styles.gotoHubButton}
            >
              <i className="i-lucide-arrow-right" />
              {translate({ message: "Theme.Navbar.go-to-hub-flow" })}
            </a>
            <BrowserOnly
              // TODO: This is a temporary fallback element used to prevent layout issues.
              fallback={
                <NavbarItem
                  label={translate({ message: "Theme.Navbar.sign-in" })}
                  className={styles.signInButton}
                />
              }
            >
              {() => {
                return (
                  <NavbarItem
                    style={{ cursor: "pointer" }}
                    className={styles.signInButton}
                    // label={
                    //   isSignedIn()
                    //      ? translate({ message: "Theme.Navbar.use-in-chat" })
                    //     : translate({ message: "Theme.Navbar.sign-in" })
                    // }
                    // TODO: Temporarily change to "Download Now" button
                    label={translate({ message: "Theme.Navbar.download-now" })}
                    onClick={() => handleSignin(locale)}
                  />
                );
              }}
            </BrowserOnly>
          </div>
        </div>
        <div className={styles.itemsRight}>
          {rightItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
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
