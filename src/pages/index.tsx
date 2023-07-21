import React from "react";
import {Analytics} from "@vercel/analytics/react";
import Layout from "../theme/Layout";
import CustomAntdTheme from '../utils/customAntdTheme';
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HomepageDownloads from "@site/src/components/HomepageDownloads";
import HomepageScenes from "@site/src/components/HomepageScenes";
import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";

export default function Home() {
    return (
        <Layout>
            <main>
                <HomepageFirstScreen/>
                <HomepageScenes/>
                <HomepageFeatures/>
                <HomepageDownloads/>
                <Analytics/>
            </main>
        </Layout>
    );
}
