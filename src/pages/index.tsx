import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import HomepageBrandBreak from "@site/src/components/HomepageBrandBreak";
import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";
import HomepageLinearFlow from "@site/src/components/HomepageLinearFlow";
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
        <HomepageBrandBreak />
        <HomepageLinearFlow />
      </main>
    </Layout>
  );
}
