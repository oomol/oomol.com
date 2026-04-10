import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import HomepageDeveloperBenefits from "@site/src/components/HomepageDeveloperBenefits";
import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";
import HomepageLinearFlow from "@site/src/components/HomepageLinearFlow";
import HomepagePainPoints from "@site/src/components/HomepagePainPoints";
import HomepageToolStrip from "@site/src/components/HomepageToolStrip";
import HomepageWhyOomol from "@site/src/components/HomepageWhyOomol";
import React from "react";

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
        <meta
          name="description"
          content={translate({
            message: "HOME.page.description",
          })}
        />
      </Head>
      <main>
        <HomepageFirstScreen />
        <HomepageToolStrip />
        <HomepageWhyOomol />
        <HomepagePainPoints />
        <HomepageDeveloperBenefits />
        <HomepageLinearFlow />
      </main>
    </Layout>
  );
}
