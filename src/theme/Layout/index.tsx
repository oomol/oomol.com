import styles from "./styles.module.scss";

import React, { ReactNode } from "react";
import LayoutProvider from "@theme/Layout/Provider";
import clsx from "clsx";
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CustomAntdTheme from "@site/src/utils/customAntdTheme";

interface LayoutProps {
    // title: string;
    children: ReactNode;
    wrapperClassName?: string;
}

const Layout: React.FC<LayoutProps> = ({children, wrapperClassName}) => {
    return (
        CustomAntdTheme(
            <LayoutProvider>
                <Navbar />
                <div className={clsx(styles.wrapper, wrapperClassName)}>
                    {children}
                </div>
                <Footer />
            </LayoutProvider>
        )
    )
}

export default Layout;
