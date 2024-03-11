import React from "react";
import styles from "./styles.module.scss";
import Layout from "../../theme/Layout";
import HomepageStarter from "@site/src/components/HomepageStarter";
import ComingSoon from "@site/src/components/ComingSoon";

export default function Index() {
  return (
    <Layout>
      <ComingSoon name={"About us"} />
      <HomepageStarter />
    </Layout>
  );
}
