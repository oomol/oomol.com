import CliPageFirstScreen from "@site/src/components/CliPageFirstScreen";
import CliPageLinearFlow from "@site/src/components/CliPageLinearFlow";
import CliPagePainPoints from "@site/src/components/CliPagePainPoints";
import React from "react";

export default function CliPageIntro() {
  return (
    <>
      <CliPageFirstScreen />
      <CliPagePainPoints />
      <CliPageLinearFlow />
    </>
  );
}
