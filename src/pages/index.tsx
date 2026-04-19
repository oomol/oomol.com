import homeStyles from "./home.module.scss";

import BrowserOnly from "@docusaurus/BrowserOnly";
import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import HomepageFirstScreen from "@site/src/components/HomepageFirstScreen";
import HomepageLinearFlow from "@site/src/components/HomepageLinearFlow";
import HomepagePainPoints from "@site/src/components/HomepagePainPoints";
import HomepageToolStrip from "@site/src/components/HomepageToolStrip";
import HomepageWhyOomol from "@site/src/components/HomepageWhyOomol";
import React from "react";

import Layout from "../theme/Layout";

type PerfSection =
  | "hero"
  | "toolstrip"
  | "painpoints"
  | "why"
  | "flow";

const PERF_SECTION_KEYS: PerfSection[] = [
  "hero",
  "toolstrip",
  "painpoints",
  "why",
  "flow",
];

function parseHomepagePerfSections(): Set<PerfSection> {
  if (typeof window === "undefined") {
    return new Set();
  }

  const params = new URLSearchParams(window.location.search);
  const raw = params.get("perf-hide");
  if (!raw) {
    return new Set();
  }

  return new Set(
    raw
      .split(",")
      .map(value => value.trim().toLowerCase())
      .filter((value): value is PerfSection =>
        PERF_SECTION_KEYS.includes(value as PerfSection)
      )
  );
}

function HomepageSections({ hidden }: { hidden: Set<PerfSection> }) {
  return (
    <main className="oomol-home-main">
      {!hidden.has("hero") && (
        <div className={homeStyles.homeHeroEnter}>
          <HomepageFirstScreen />
        </div>
      )}
      {!hidden.has("toolstrip") && <HomepageToolStrip />}
      {!hidden.has("painpoints") && <HomepagePainPoints />}
      {!hidden.has("why") && <HomepageWhyOomol />}
      {!hidden.has("flow") && <HomepageLinearFlow />}
    </main>
  );
}

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
      <BrowserOnly fallback={<HomepageSections hidden={new Set()} />}>
        {() => <HomepageSections hidden={parseHomepagePerfSections()} />}
      </BrowserOnly>
    </Layout>
  );
}
