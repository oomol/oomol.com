import React from "react";
import Layout from "../theme/Layout";

import HomepageScenes from "@site/src/components/HomepageScenes";
import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";
import HomepageCoreTech from "@site/src/components/HomepageCoreTech";
import HomepageEcosystem from "@site/src/components/HomepageEcosystem";
import HomepageProductComparison from "@site/src/components/HomepageProductComparison";

import Head from "@docusaurus/Head";
import HomepageGuide from "../components/HomepageGuide";
import HomePageBuiltInLLM from "../components/HomePageBuiltInLLM";

import { GetStartedPrompt } from "../components/GetStartedPrompt";
import HomepageCreateScenes from "../components/HomepageCreateScenes";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>OOMOL - Turn Your Computer into an AI Server</title>
      </Head>
      <main>
        <HomepageFirstScreen />
        <HomepageCoreTech />
        <HomepageScenes />
        <HomepageProductComparison />
        <HomepageCreateScenes />
        <HomepageEcosystem />
        <HomePageBuiltInLLM />
        <HomepageGuide />
        {/* TODO: 等订阅业务上线后恢复 */}
        {/* <HomepagePricing /> */}
        {/* <HomepageDownloads /> */}
        <GetStartedPrompt />
        {/* <HomepageStarter /> */}
      </main>
    </Layout>
  );
}
