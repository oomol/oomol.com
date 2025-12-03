import React from "react";
import Layout from "../theme/Layout";
import { translate } from "@docusaurus/Translate";

import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";
import HomepageCoreFeatures from "@site/src/components/HomepageCoreFeatures";
import HomepageLifecycle from "@site/src/components/HomepageLifecycle";
import HomepageProductComparison from "@site/src/components/HomepageProductComparison";
import HomepagePdfCraftShowcase from "@site/src/components/HomepagePdfCraftShowcase";
import HomepageCommunityShare from "@site/src/components/HomepageCommunityShare";

import Head from "@docusaurus/Head";
import HomePageBuiltInLLM from "../components/HomePageBuiltInLLM";

import { GetStartedPrompt } from "../components/GetStartedPrompt";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>
          {translate({
            message: "HOME.page.title",
          })}
        </title>
      </Head>
      <main>
        <HomepageFirstScreen />
        <HomepageCoreFeatures />
        {/* <HomepageLifecycle /> */}
        <HomepageCommunityShare />
        <HomepageProductComparison />
        <HomePageBuiltInLLM />
        <HomepagePdfCraftShowcase />
        <GetStartedPrompt />
      </main>
    </Layout>
  );
}
