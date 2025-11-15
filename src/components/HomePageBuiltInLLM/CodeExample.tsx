import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Highlight, themes } from 'prism-react-renderer';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.scss';

const pythonCode = `import oomol

# 使用单一 OOMOL Token 调用多种 LLM
client = oomol.Client(token="your-oomol-token")

# 调用 Claude
response = client.chat.completions.create(
    model="claude-3-5-sonnet",
    messages=[{"role": "user", "content": "Hello!"}]
)

# 切换到 GPT-4 只需改变 model 参数
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)`;

const javascriptCode = `import OOMOL from 'oomol-sdk';

// 使用单一 OOMOL Token 调用多种 LLM
const client = new OOMOL({ token: 'your-oomol-token' });

// 调用 Claude
const response = await client.chat.completions.create({
  model: 'claude-3-5-sonnet',
  messages: [{ role: 'user', content: 'Hello!' }]
});

// 切换到 GPT-4 只需改变 model 参数
const response2 = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello!' }]
});`;

const curlCode = `# 使用单一 OOMOL Token 调用 Claude
curl -X POST https://api.oomol.com/v1/chat/completions \\
  -H "Authorization: Bearer your-oomol-token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-3-5-sonnet",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

# 切换到 GPT-4 只需改变 model 参数
curl -X POST https://api.oomol.com/v1/chat/completions \\
  -H "Authorization: Bearer your-oomol-token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`;

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
