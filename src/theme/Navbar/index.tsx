import styles from './styles.module.css';

import React, {useCallback, useState} from 'react';
import type {ComponentProps} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';
import NavbarItem from '@theme/NavbarItem';
import SearchBar from '@theme/SearchBar';
import clsx from 'clsx';
import Link from "@docusaurus/Link";
import {Button, ConfigProvider} from "antd";
import Translate from '@docusaurus/Translate';


interface NavbarProps {

}

const DefaultNavItemPosition = "right"

function splitNavItemsByPosition(items: Array<ComponentProps<typeof NavbarItem>>): {
    leftItems: Array<ComponentProps<typeof NavbarItem>>
    rightItems: Array<ComponentProps<typeof NavbarItem>>
} {
    const leftItems = items.filter(item => (item.position ?? DefaultNavItemPosition) === "left");
    const rightItems = items.filter(item => (item.position ?? DefaultNavItemPosition) === "right");

    return {leftItems, rightItems};
}

const Navbar: React.FC<NavbarProps> = ({}) => {
    const {
        siteConfig: {
            themeConfig: {
                navbar: {items},
            },
        },
    } = useDocusaurusContext();
    const location = useLocation();
    const [sidebarShown, setSidebarShown] = useState(false);
    const {colorMode, setColorMode} = useColorMode();

    const {leftItems, rightItems} = splitNavItemsByPosition(items);

    const showSidebar = useCallback(() => {
        setSidebarShown(true)
    }, [])
    const hideSidebar = useCallback(() => {
        setSidebarShown(false)
    }, [])

    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: "#7d7fe9",
            }
        }}>
            <header className={clsx("navbar", styles.navbar, {
                "navbar-sidebar--show": sidebarShown,
            })}>
                <div className={clsx("navbar__inner", styles.inner)}>
                    <div className="navbar__items">
                        <Link className={styles.brand} to="/">
                            <img
                                width={32}
                                alt="logo"
                                src="/img/logo.svg"
                                loading="lazy"
                            />
                        </Link>
                        {leftItems.map((item, i) => (
                            <NavbarItem {...item} key={i}/>
                        ))}
                    </div>
                    <div className={styles.itemsRight}>
                        {rightItems.map((item, i) => (
                            <NavbarItem {...item} key={i}/>
                        ))}
                        {location.pathname.startsWith("/docs") &&
                            <>
                                <div className={styles.searchBar}>
                                    <SearchBar/>
                                </div>
                                <div className={styles.cutLine}/>
                            </>
                        }
                        <Button style={{marginRight: 12}}>Login</Button>
                        <Button type="primary">
                            Get Started
                        </Button>
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
                        <Link
                            className={styles.brand}
                            to="/"
                            onClick={hideSidebar}
                        >
                            <img
                                width={32}
                                alt="logo"
                                src="/img/logo.svg"
                                loading="lazy"
                            />
                        </Link>
                    </div>
                    <div className="navbar-sidebar__items">
                        <div className="menu">
                            <ul className="menu__list">
                                {items.map((item, i) => (
                                    <NavbarItem
                                        mobile
                                        {...item}
                                        {...(item.type !== "search" && {onClick: hideSidebar})} // Search type def does not accept onClick
                                        key={i}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </ConfigProvider>
    )
}

export default Navbar;
