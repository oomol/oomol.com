import React from "react";
import styles from "./styles.module.scss";
import Layout from "../../theme/Layout";
import ComingSoon from "@site/src/components/ComingSoon";
import HomepageStarter from "@site/src/components/HomepageStarter";

export default function Index() {
  return (
    <Layout>
      <ComingSoon name={"System status"} />
      <HomepageStarter />
    </Layout>
  );
}
