import { translate } from "@docusaurus/Translate";
import { GetStartedPrompt } from "@site/src/components/GetStartedPrompt";
import StudioDetailContent from "@site/src/components/StudioDetailContent";
import Layout from "@theme/Layout";
import React from "react";

export default function StudioPage() {
  return (
    <Layout
      title={translate({ message: "STUDIO.page.title" })}
      description={translate({ message: "STUDIO.page.description" })}
    >
      <>
        <StudioDetailContent />
        <GetStartedPrompt />
      </>
    </Layout>
  );
}
