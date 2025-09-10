import React from "react";
import Layout from "../theme/Layout";

import HomepageDownloads from "@site/src/components/HomepageDownloads";
import HomepageScenes from "@site/src/components/HomepageScenes";
import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";

import HomepageStarter from "@site/src/components/HomepageStarter";
import HomepagePricing from "../components/HomePagePricing";
import Head from "@docusaurus/Head";
import HomepageGuide from "../components/HomepageGuide";
import HomePageBuiltInLLM from "../components/HomePageBuiltInLLM";
import HomepageProducts from "../components/HomepageProducts";
import { GetStartedPrompt } from "../components/GetStartedPrompt";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>OOMOL - Create, Share and Use AI Tools</title>
      </Head>
      <main>
        <HomepageFirstScreen />
        <HomepageScenes />
        <HomepageProducts />
        <HomepageGuide />
        {/* TODO: 等订阅业务上线后恢复 */}
        {/* <HomepagePricing /> */}
        <HomePageBuiltInLLM />
        {/* <HomepageDownloads /> */}
        <GetStartedPrompt />
        {/* <HomepageStarter /> */}
      </main>
    </Layout>
  );
}
