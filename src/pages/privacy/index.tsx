import styles from "./styles.module.scss";

import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import { MDXProvider } from "@mdx-js/react";
import React from "react";

import Privacy from "./_privacy.mdx";
import Layout from "../../theme/Layout";

const components = {
  em(properties: React.ComponentProps<"i">) {
    return <i {...properties} />;
  },
};
export default function Index() {
  return (
    <Layout>
      <Head>
        <title>{translate({ message: "PRIVACY.page.title" })}</title>
        <meta
          name="description"
          content={translate({ message: "PRIVACY.page.description" })}
        />
      </Head>
      <MDXProvider components={components}>
        <div className={styles.container}>
          <div className={styles.box}>
            <Privacy />
          </div>
        </div>
      </MDXProvider>
    </Layout>
  );
}
