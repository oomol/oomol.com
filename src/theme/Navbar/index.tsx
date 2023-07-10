import styles from './styles.module.css';

import React, {useCallback, useState} from 'react';
import type {ComponentProps} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useColorMode} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';
import NavbarItem from '@theme/NavbarItem';
import SearchBar from '@theme/SearchBar';
import clsx from 'clsx';
import Link from "@docusaurus/Link";
import {Button} from "antd";

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
        <header className={clsx("navbar", styles.navbar)}>
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
                <div className="">
                    {rightItems.map((item, i) => (
                        <NavbarItem {...item} key={i}/>
                    ))}
                    {/*<div className={styles.searchBar}>*/}
                    {/*    <SearchBar/>*/}
                    {/*</div>*/}
                    {location.pathname === '/' &&
                      <div>
                        <Button style={{marginRight: 12}}>Login</Button>
                        <Button type="primary">
                            Get Started
                        </Button>
                      </div>
                      }
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
    )
}

export default Navbar;
