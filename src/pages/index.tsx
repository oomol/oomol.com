import React from "react";
import { Analytics } from "@vercel/analytics/react";
import Layout from "../theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HomepageDownloads from "@site/src/components/HomepageDownloads";
import HomepageScenes from "@site/src/components/HomepageScenes";
import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";
import HomepageStarter from "@site/src/components/HomepageStarter";
import HomepagePricing from "../components/HomePagePricing";
import Head from "@docusaurus/Head";
import HomepageGuide from "../components/HomepageGuide";
import HomePageBuiltInLLM from "../components/HomePageBuiltInLLM";
import { GetStartedPrompt } from "../components/GetStartedPrompt";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>OOMOL - AI Programmable Workflow Platform</title>
      </Head>
      <main>
        <HomepageFirstScreen />
        <HomepageScenes />
        <HomepageFeatures />
        <HomepageGuide />
        {/* TODO: 等订阅业务上线后恢复 */}
        {/* <HomepagePricing /> */}
        <HomePageBuiltInLLM />
        {/* <HomepageDownloads /> */}
        <GetStartedPrompt />
        {/* <HomepageStarter /> */}
        <Analytics />
      </main>
    </Layout>
  );
}
