import React from "react";
import styles from "./styles.module.scss";
import Layout from "../../theme/Layout";
import ComingSoon from "@site/src/components/ComingSoon";
import HomepageStarter from "@site/src/components/HomepageStarter";

export default function Index() {
  // const a = () => {
  //   for ()
  // }
  // const b = () => {
  //   for (let i = 0; i < 10; i++) {
  //     console.log(i);
  //   }
  //   return (
  //     <div>
  //       <div></div>
  //       <div></div>
  //     </div>
  //   );

  return (
    <Layout>
      <ComingSoon name={"Download"} />
      <HomepageStarter />
    </Layout>
  );
}
