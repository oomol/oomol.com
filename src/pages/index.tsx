import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";
import HomepageLinearFlow from "@site/src/components/HomepageLinearFlow";
import HomepagePainPoints from "@site/src/components/HomepagePainPoints";
import HomepageToolStrip from "@site/src/components/HomepageToolStrip";
import HomepageWhyOomol from "@site/src/components/HomepageWhyOomol";
import { BlurFade } from "@site/src/components/ui/blur-fade";
import React from "react";

import Layout from "../theme/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>
          {translate({
            message: "HOME.page.title",
          })}
        </title>
        <meta
          name="description"
          content={translate({
            message: "HOME.page.description",
          })}
        />
      </Head>
      <main className="oomol-home-main">
        {/* Magic UI Blur Fade：inView=false 为挂载即播放入场；inView 为 true 时滚入视口再播 */}
        <BlurFade duration={0.48} offset={16} delay={0.06} blur="0px">
          <HomepageFirstScreen />
        </BlurFade>
        <BlurFade inView duration={0.44} offset={14} blur="0px">
          <HomepageToolStrip />
        </BlurFade>
        <BlurFade inView duration={0.44} offset={14} blur="0px">
          <HomepagePainPoints />
        </BlurFade>
        <BlurFade inView duration={0.44} offset={14} blur="0px">
          <HomepageWhyOomol />
        </BlurFade>
        <BlurFade inView duration={0.44} offset={14} blur="0px">
          <HomepageLinearFlow />
        </BlurFade>
      </main>
    </Layout>
  );
}
