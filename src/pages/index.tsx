import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import HomepageCommunityShare from "@site/src/components/HomepageCommunityShare";
import HomepageCoreFeatures from "@site/src/components/HomepageCoreFeatures";
import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";
import HomepagePdfCraftShowcase from "@site/src/components/HomepagePdfCraftShowcase";
import HomepageProductComparison from "@site/src/components/HomepageProductComparison";
import React from "react";

import { GetStartedPrompt } from "../components/GetStartedPrompt";
import HomePageBuiltInLLM from "../components/HomePageBuiltInLLM";
import Layout from "../theme/Layout";

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
