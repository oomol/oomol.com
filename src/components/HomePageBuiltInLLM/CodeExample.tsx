import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Highlight, themes } from 'prism-react-renderer';
import { useColorMode } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.scss';

const getPythonCode = () => translate({
  id: 'HOME.Built-in.code.python',
  message: `import oomol

# Use a single OOMOL Token to call multiple LLMs
client = oomol.Client(token="your-oomol-token")

# Call Claude
response = client.chat.completions.create(
    model="claude-3-5-sonnet",
    messages=[{"role": "user", "content": "Hello!"}]
)

# Switch to GPT-4 by simply changing the model parameter
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)`
});

const getJavaScriptCode = () => translate({
  id: 'HOME.Built-in.code.javascript',
  message: `import OOMOL from 'oomol-sdk';

// Use a single OOMOL Token to call multiple LLMs
const client = new OOMOL({ token: 'your-oomol-token' });

// Call Claude
const response = await client.chat.completions.create({
  model: 'claude-3-5-sonnet',
  messages: [{ role: 'user', content: 'Hello!' }]
});

// Switch to GPT-4 by simply changing the model parameter
const response2 = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello!' }]
});`
});

const getCurlCode = () => translate({
  id: 'HOME.Built-in.code.curl',
  message: `# Use a single OOMOL Token to call Claude
curl -X POST https://api.oomol.com/v1/chat/completions \\
  -H "Authorization: Bearer your-oomol-token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-3-5-sonnet",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

# Switch to GPT-4 by simply changing the model parameter
curl -X POST https://api.oomol.com/v1/chat/completions \\
  -H "Authorization: Bearer your-oomol-token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`
});

interface CodeBlockProps {
  code: string;
  language: string;
}

function CodeBlock({ code, language }: CodeBlockProps) {
  const { colorMode } = useColorMode();

  return (
    <Highlight
      theme={colorMode === 'dark' ? themes.vsDark : themes.vsLight}
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
  const javascriptCode = getJavaScriptCode();
  const curlCode = getCurlCode();

  return (
    <div className={styles.codeExample}>
      <Tabs>
        <TabItem value="python" label="Python" default>
          <CodeBlock code={pythonCode} language="python" />
        </TabItem>
        <TabItem value="javascript" label="JavaScript">
          <CodeBlock code={javascriptCode} language="javascript" />
        </TabItem>
        <TabItem value="curl" label="cURL">
          <CodeBlock code={curlCode} language="bash" />
        </TabItem>
      </Tabs>
    </div>
  );
}
