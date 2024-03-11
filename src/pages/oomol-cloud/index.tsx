import React from "react";
import Layout from "../../theme/Layout";
import styles from "./styles.module.scss";
import ComingSoon from "@site/src/components/ComingSoon";
import HomepageStarter from "@site/src/components/HomepageStarter";

export default function Index() {
  return (
    <Layout>
      <ComingSoon name={"Oomol Cloud"} />
      <HomepageStarter />
    </Layout>
  );
}
