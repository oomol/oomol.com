import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import CloudPageIntro from "@site/src/components/CloudPageIntro";
import React from "react";

import Layout from "../../theme/Layout";

export default function CloudPage() {
  return (
    <Layout>
      <Head>
        <title>{translate({ message: "CLOUD.hero.title" })}</title>
        <meta
          name="description"
          content={translate({ message: "CLOUD.hero.description" })}
        />
      </Head>
      <main>
        <CloudPageIntro />
      </main>
    </Layout>
  );
}
