import React from "react";
import Layout from "../../theme/Layout";
import styles from "./styles.module.scss";
import HomepageStarter from "@site/src/components/HomepageStarter";
import ComingSoon from "@site/src/components/ComingSoon";

export default function Index() {
  return (
    <Layout>
      <div>
        <div>About OOMOL Studio</div>
        <div>
          OOMOL Studio is a robust workflow automation platform that
          effortlessly connects code and services through intuitive visual
          interactions, while also allowing seamless code integration.
        </div>
      </div>
      <div>
        <div>安全的容器环境</div>
      </div>
      <div></div>
      <HomepageStarter />
    </Layout>
  );
}
