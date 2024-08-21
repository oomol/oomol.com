import styles from "./styles.module.scss";

import React, { memo, useCallback, useMemo, useState } from "react";
import type { ComponentProps } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useLocation } from "@docusaurus/router";
import NavbarItem from "@theme/NavbarItem";
import SearchBar from "@theme/SearchBar";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import { Button } from "@site/src/components/Button";

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
            <img width={32} alt="logo" src="/img/logo.svg" loading="lazy" />
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
          <div className={styles.navbarBtnBox}>
            <Button
              className={styles.btn}
              target="_blank"
              href="https://hub.oomol.com/"
            >
              Go flow hub
            </Button>
          </div>
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
            <img width={32} alt="logo" src="/img/logo.svg" loading="lazy" />
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
            {/* TODO: 重构组件后删除此注释 */}
            {/* <Button
              target="_blank"
              href={"https://console.oomol.com/"}
              className={styles.btn}
              style={{ marginRight: 12 }}
            >
              Login
            </Button> */}
            {/* <button className={styles.btn} style={{ marginRight: 12 }}>
              Login
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
});

export default Navbar;
