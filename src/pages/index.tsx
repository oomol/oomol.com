import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
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
      </Head>
      <main>
        <HomepageFirstScreen />
        <HomepageLinearFlow />
      </main>
    </Layout>
  );
}
