import React from "react";
import Layout from "../../theme/Layout";
import styles from "./styles.module.scss";
import HomepageStarter from "@site/src/components/HomepageStarter";
import ComingSoon from "@site/src/components/ComingSoon";

export default function Index() {
  return (
    <Layout>
      <ComingSoon name={"OOMOL API"} />
      <HomepageStarter />
    </Layout>
  );
}
