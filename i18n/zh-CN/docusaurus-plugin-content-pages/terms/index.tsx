import styles from "./styles.module.scss";

import { MDXProvider } from "@mdx-js/react";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import React from "react";

import Terms from "./_terms.mdx";

const components = {
  em(properties: React.ComponentProps<"i">) {
    return <i {...properties} />;
  },
};
export default function Index() {
  return (
    <Layout>
      <Head>
        <title>使用条款 - OOMOL</title>
        <meta
          name="description"
          content="查看 OOMOL 的使用条款和服务条件。"
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
