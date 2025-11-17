import React from "react";
import Layout from "../theme/Layout";

import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";
import HomepageValueProps from "@site/src/components/HomepageValueProps";
import HomepageCoreFeatures from "@site/src/components/HomepageCoreFeatures";
import HomepageLifecycle from "@site/src/components/HomepageLifecycle";
import HomepageProductComparison from "@site/src/components/HomepageProductComparison";
import HomepageChatAgent from "@site/src/components/HomepageChatAgent";
import HomepagePdfCraftShowcase from "@site/src/components/HomepagePdfCraftShowcase";
import HomepageWhyOomol from "@site/src/components/HomepageWhyOomol";

import Head from "@docusaurus/Head";
import HomePageBuiltInLLM from "../components/HomePageBuiltInLLM";

import { GetStartedPrompt } from "../components/GetStartedPrompt";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>OOMOL - Turn Your Computer into an AI Server</title>
      </Head>
      <main>
        <HomepageFirstScreen />
        <HomepageValueProps />
        <HomepageCoreFeatures />
        <HomepageLifecycle />
        <HomepageWhyOomol />
        <HomepagePdfCraftShowcase />
        <HomepageProductComparison />
        <HomepageChatAgent />
        <HomePageBuiltInLLM />
        {/* TODO: 等订阅业务上线后恢复 */}
        {/* <HomepagePricing /> */}
        {/* <HomepageDownloads /> */}
        <GetStartedPrompt />
        {/* <HomepageStarter /> */}
      </main>
    </Layout>
  );
}
