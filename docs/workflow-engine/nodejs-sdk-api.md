---
sidebar_position: 2
---

# 📗 Nodejs API

```typescript

import type { Context } from "@oomol/types/oocana";

type Inputs = Readonly<{ in: unknown }>;
type Outputs = Readonly<{ out: unknown }>;

export default async function(inputs: Inputs, context: Context<Inputs, Outputs>): Promise<Outputs> {
    /** Report Block done. */
    context.done();
    /** Report logs */
    context.logJSON();
    /** Report error. */
    context.error();
    /** Report extra Block messages. */
    context.sendMessage();
    /** Send to Preview */
    context.preview();
    /** Report Block's stdio and stdout message. */
    context.reportLog();
    /** Report progress, progress 1 ~ 100 */
    context.reportProgress();

    return { out: inputs };
};

```
