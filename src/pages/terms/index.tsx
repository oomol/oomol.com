import styles from "./styles.module.scss";

import Head from "@docusaurus/Head";
import { MDXProvider } from "@mdx-js/react";
import React from "react";

import Terms from "./_terms.mdx";
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
        <title>Terms - OOMOL</title>
        <meta
          name="description"
          content="Read OOMOL's terms of service and usage conditions."
        />
      </Head>
      <MDXProvider components={components}>
        <div className={styles.container}>
          <div className={styles.box}>
            <Terms />
          </div>
        </div>
      </MDXProvider>
    </Layout>
  );
}
