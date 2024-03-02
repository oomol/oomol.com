import React from "react";
import Layout from "../../theme/Layout";
import styles from "./styles.module.scss";
import ComingSoon from "@site/src/components/ComingSoon";
import {MDXProvider} from "@mdx-js/react";
import Terms from "./terms.mdx"

const components = {
    em(properties: any) {
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
