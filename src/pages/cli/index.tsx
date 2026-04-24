import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import CliPageIntro from "@site/src/components/CliPageIntro";
import React from "react";

import Layout from "../../theme/Layout";

export default function CliPage() {
  return (
    <Layout>
      <Head>
        <title>{translate({ message: "CLI.page.title" })}</title>
        <meta
          name="description"
          content={translate({ message: "CLI.page.description" })}
        />
      </Head>
      <main className="oomol-landing-main">
        <CliPageIntro />
      </main>
    </Layout>
  );
}
