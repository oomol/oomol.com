---
sidebar_position: 2
---

# 📗 Nodejs API

```typescript
import type { Context } from "@oomol/types/oocana";

type Inputs = Readonly<{ in: unknown }>;
type Outputs = Readonly<{ out: unknown }>;

export default async function (
  inputs: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  /** 报告块已完成。 */
  context.done();
  /** 报告日志信息。 */
  context.logJSON();
  /** 报告错误信息。 */
  context.error();
  /** 报告额外的块消息。 */
  context.sendMessage();
  /** 发送到预览。 */
  context.preview();
  /** 报告块的标准输入输出消息。 */
  context.reportLog();
  /** 报告进度，进度范围 1 ~ 100 */
  context.reportProgress();

  return { out: inputs };
}
```
