import styles from "./styles.module.scss";

import { useColorMode } from "@docusaurus/theme-common";
import { translate } from "@docusaurus/Translate";
import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";
import { Highlight, themes } from "prism-react-renderer";
import React from "react";

const getPythonCode = () =>
  translate({
    id: "HOME.Built-in.code.python",
    message: `from oocana import Context

#region generated meta
import typing
Inputs = typing.Dict[str, typing.Any]
Outputs = typing.Dict[str, typing.Any]
#endregion

async def main(params: Inputs, context: Context) -> Outputs | None:

    # Fusion API Base URL
    api_url = "https://fusion-api.oomol.com/v1/fal-nano-banana-edit/submit"

    # LLM Base URL, can use openai sdk
    llm_base_url = "https://llm.oomol.com/v1"

    # Get OOMOL token from context (no need for manual API key input)
    api_token = await context.oomol_token()

    return {
      # "output": "output_value"
    }`,
  });

const getTypeScriptCode = () =>
  translate({
    id: "HOME.Built-in.code.typescript",
    message: `//#region generated meta
type Inputs = {
};
type Outputs = {
};
//#endregion

import type { Context } from "@oomol/types/oocana";

export default async function(
    params: Inputs,
    context: Context<Inputs, Outputs>
): Promise<Partial<Outputs> | undefined | void> {
    // Fusion API Base URL
    const api_url = "https://fusion-api.oomol.com/v1/fal-nano-banana-edit/submit"

    // LLM Base URL, can use openai sdk
    const llm_base_url = "https://llm.oomol.com/v1"

    // Get OOMOL token from context (no need for manual API key input)
    const api_token = await context.getOomolToken()
    // return { output: "output_value" };
};`,
  });

interface CodeBlockProps {
  code: string;
  language: string;
}

function CodeBlock({ code, language }: CodeBlockProps) {
  const { colorMode } = useColorMode();

  return (
    <Highlight
      theme={colorMode === "dark" ? themes.vsDark : themes.vsLight}
      code={code}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export default function CodeExample() {
  const pythonCode = getPythonCode();
  const typescriptCode = getTypeScriptCode();

  return (
    <div className={styles.codeExample}>
      <Tabs>
        <TabItem value="python" label="Python" default>
          <CodeBlock code={pythonCode} language="python" />
        </TabItem>
        <TabItem value="typescript" label="TypeScript">
          <CodeBlock code={typescriptCode} language="typescript" />
        </TabItem>
      </Tabs>
    </div>
  );
}
