import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import HomepageCliEntry from "@site/src/components/HomepageCliEntry";
import HomepageCodexBlocks from "@site/src/components/HomepageCodexBlocks";
import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";
import HomepageProductComparison from "@site/src/components/HomepageProductComparison";
import StudioDetailContent from "@site/src/components/StudioDetailContent";
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
        <HomepageCliEntry />
        <StudioDetailContent variant="home" />
        <HomepageProductComparison />
        <HomepageCodexBlocks />
        <GetStartedPrompt />
      </main>
    </Layout>
  );
}
