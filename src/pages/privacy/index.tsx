import styles from "./styles.module.scss";

import { MDXProvider } from "@mdx-js/react";
import Head from "@docusaurus/Head";
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
        <title>Privacy - OOMOL</title>
        <meta
          name="description"
          content="Read OOMOL's privacy policy and data-handling terms."
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
