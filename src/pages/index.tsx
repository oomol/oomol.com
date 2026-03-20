import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import HomepageCommunityShare from "@site/src/components/HomepageCommunityShare";
import HomepageCoreFeatures from "@site/src/components/HomepageCoreFeatures";
import HomepageDeliveryGap from "@site/src/components/HomepageDeliveryGap";
import HomepageDeveloperBenefits from "@site/src/components/HomepageDeveloperBenefits";
import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";
import HomepageProductComparison from "@site/src/components/HomepageProductComparison";
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
        <HomepageDeveloperBenefits />
        <HomepageDeliveryGap />
        <HomepageCoreFeatures />
        <HomepageProductComparison />
        <HomepageCommunityShare />
        <HomepageProofLayer />
        <GetStartedPrompt />
      </main>
    </Layout>
  );
}
