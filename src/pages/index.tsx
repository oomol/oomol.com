import React from "react";
import { Analytics } from "@vercel/analytics/react";
import Layout from "../theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HomepageDownloads from "@site/src/components/HomepageDownloads";
import HomepageScenes from "@site/src/components/HomepageScenes";
import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";
import HomepageStarter from "@site/src/components/HomepageStarter";
import HomepagePricing from "../components/HomePagePricing";

export default function Home() {
  return (
    <Layout>
      <main>
        <HomepageFirstScreen />
        <HomepageScenes />
        <HomepageFeatures />
        {/* TODO: 等订阅业务上线后恢复 */}
        {/* <HomepagePricing /> */}
        <HomepageDownloads />
        {/* <HomepageStarter /> */}
        <Analytics />
      </main>
    </Layout>
  );
}
