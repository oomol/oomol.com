import styles from "./styles.module.scss";

import NavbarItem from "@theme/NavbarItem";
import React, { memo, useEffect, useMemo, useState } from "react";
import type { ComponentProps } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useLocation } from "@docusaurus/router";
import SearchBar from "@theme/SearchBar";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";

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

const Navbar: React.FC<NavbarProps> = memo(() => {
  const mobileSidebar = useNavbarMobileSidebar();

  const {
    siteConfig: {
      themeConfig: {
        navbar: { items },
      },
    },
    i18n,
  } = useDocusaurusContext() as any;
  const locale = i18n.currentLocale;
  const location = useLocation();

  const [hideNavbar, setHideNavbar] = useState(false);

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
        [styles.navbarHidden]: hideNavbar,
      })}
    >
      <div className={clsx("navbar__inner", styles.inner)}>
        <div className="navbar__items">
          <Link className={styles.brand} to="/">
            <img
              height={24}
              alt="logo"
              src={locale === "en" ? "/img/logo-en.svg" : "/img/logo-zh.svg"}
              loading="lazy"
            />
          </Link>

          {leftItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
        </div>
        <div className={styles.itemsRight}>
          {rightItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
          {/* 当路由与文档路径匹配时，显示文档搜索框 */}
          {isDocumentPath && (
            <>
              <div className={styles.searchBar}>
                <SearchBar />
              </div>
              <div className={styles.cutLine} />
            </>
          )}
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

export default Navbar;
