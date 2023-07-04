import styles from "./styles.module.css";

import React, { ReactNode } from "react";
import LayoutProvider from "@theme/Layout/Provider";
import clsx from "clsx";
import { Footer } from "../Footer";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

interface LayoutProps {
    // title: string;
    children: ReactNode;
    wrapperClassName?: string;
}

export const Layout: React.FC<LayoutProps> = ({children, wrapperClassName}) => {
    // const { siteConfig } = useDocusaurusContext()
    // const {
    //   title: siteTitle,
    //   themeConfig: { image: defaultImage },
    //   url: siteUrl,
    // } = siteConfig
    
    return (
        <LayoutProvider>
            <div className={clsx(styles.wrapper, wrapperClassName)}>
                {children}
            </div>
            <Footer />
        </LayoutProvider>
    )
}