import styles from "./styles.module.scss";

import { MDXProvider } from "@mdx-js/react";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import React from "react";

import Privacy from "./_privacy.mdx";

const components = {
  em(properties: React.ComponentProps<"i">) {
    return <i {...properties} />;
  },
};
export default function Index() {
  return (
    <Layout>
      <Head>
        <title>隐私政策 - OOMOL</title>
        <meta
          name="description"
          content="查看 OOMOL 的隐私政策和数据处理说明。"
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
