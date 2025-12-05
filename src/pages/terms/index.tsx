import styles from "./styles.module.scss";

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
