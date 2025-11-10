import React from "react";
import Layout from "../../theme/Layout";
import styles from "./styles.module.scss";
import {MDXProvider} from "@mdx-js/react";

import Terms from "./privacy.mdx"

const components = {
    em(properties: React.ComponentProps<'i'>) {
      return <i {...properties} />
    }
  }
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
