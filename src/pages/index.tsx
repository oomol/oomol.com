import React from "react";
import Layout from "../theme/Layout";

import HomepageScenes from "@site/src/components/HomepageScenes";
import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";

import Head from "@docusaurus/Head";
import HomepageGuide from "../components/HomepageGuide";
import HomePageBuiltInLLM from "../components/HomePageBuiltInLLM";

import { GetStartedPrompt } from "../components/GetStartedPrompt";
import HomepageCreateScenes from "../components/HomepageCreateScenes";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>OOMOL - Create, Share and Use AI Tools</title>
      </Head>
      <main>
        <HomepageFirstScreen />
        <HomepageScenes />
        <HomepageCreateScenes />
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
