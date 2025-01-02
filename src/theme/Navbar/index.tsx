import styles from "./styles.module.scss";
import LogoENSvg from "@site/static/img/logo-en.svg";
import LogoZHSvg from "@site/static/img/logo-zh.svg";

import React, { memo, useCallback, useMemo, useState } from "react";
import type { ComponentProps } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useLocation } from "@docusaurus/router";
import NavbarItem from "@theme/NavbarItem";
import SearchBar from "@theme/SearchBar";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { Button } from "@site/src/components/Button";
import { translate } from "@docusaurus/Translate";

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

  const [sidebarShown, setSidebarShown] = useState(false);

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

  const showSidebar = useCallback(() => {
    setSidebarShown(true);
  }, []);
  const hideSidebar = useCallback(() => {
    setSidebarShown(false);
  }, []);

  return (
    <header
      className={clsx("navbar", styles.navbar, {
        "navbar-sidebar--show": sidebarShown,
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
          {/* {isDocumentPath && (
            <>
              <div className={styles.searchBar}>
                <SearchBar />
              </div>
              <div className={styles.cutLine} />
            </>
          )} */}
          {/* <div className={styles.navbarBtnBox}> */}
          <Button
            className={styles["btn-nav"]}
            target="_blank"
            iconPosition="end"
            icon={
              <div className="i-codicon:arrow-right" style={{ fontSize: 18 }} />
            }
            href="https://hub.oomol.com/"
          >
            <div className={styles["btn-nav-text"]}>
              {translate({ message: "Theme.Navbar.go-to-hub-flow" })}
            </div>
          </Button>
          {/* </div> */}
        </div>
        <div
          aria-label="Navigation bar toggle"
          className="navbar__toggle"
          role="button"
          tabIndex={0}
          onClick={showSidebar}
          onKeyDown={showSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            role="img"
            focusable="false"
          >
            <title>An icon showing a hamburger menu</title>
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
        onClick={hideSidebar}
      />
      <div className="navbar-sidebar">
        <div className="navbar-sidebar__brand">
          <Link className={styles.brand} to="/" onClick={hideSidebar}>
            <img
              width={24}
              alt="logo"
              src={locale === "en" ? "/img/logo-en.svg" : "/img/logo-zh.svg"}
              loading="lazy"
            />
          </Link>
        </div>
        <div className="navbar-sidebar__items">
          <div className="navbar-sidebar__item menu">
            <ul className="menu__list">
              {items.map((item, i) => (
                <NavbarItem
                  mobile
                  {...item}
                  {...(item.type !== "search" && { onClick: hideSidebar })} // Search type def does not accept onClick
                  key={i}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Navbar;
