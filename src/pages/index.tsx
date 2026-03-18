import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import HomepageCommunityShare from "@site/src/components/HomepageCommunityShare";
import HomepageCoreFeatures from "@site/src/components/HomepageCoreFeatures";
import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";
import HomepageProofLayer from "@site/src/components/HomepageProofLayer";
import React from "react";

import { GetStartedPrompt } from "../components/GetStartedPrompt";
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
        <HomepageProofLayer />
        <HomepageCoreFeatures />
        {/* <HomepageLifecycle /> */}
        <HomepageCommunityShare />
        <GetStartedPrompt />
      </main>
    </Layout>
  );
}
