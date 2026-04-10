import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";
import HomepageLinearFlow from "@site/src/components/HomepageLinearFlow";
import HomepagePainPoints from "@site/src/components/HomepagePainPoints";
import HomepageToolStrip from "@site/src/components/HomepageToolStrip";
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
        <HomepagePainPoints />
        <HomepageLinearFlow />
      </main>
    </Layout>
  );
}
