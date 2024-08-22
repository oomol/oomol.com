---
sidebar_position: 2
---

# 📗 Nodejs API

```typescript
import type { Context } from "@oomol/types/oocana";

interface Context<TInputs = Record<string, any>, TOutputs = Record<string, any>> {
    readonly sessionId: string;
    readonly jobId: string;
    readonly block_path: string;

    /** Report Block done. */
    readonly done: (err?: any) => Promise<void>;
    /** Report logs */
    readonly logJSON: (jsonValue: unknown) => Promise<void>;
    /** Report error. */
    readonly error: (error: unknown) => Promise<void>;
    /** Report extra Block messages. */
    readonly sendMessage: (payload: unknown) => Promise<void>;
    /** Send to Preview */
    readonly preview: (payload: unknown) => Promise<void>;
    /** Report Block's stdio and stdout message. */
    readonly reportLog: (payload: string, stdio: "stdout" | "stderr") => Promise<void>;
    /** Report progress, progress 0.0 ~ 1.0 */
    readonly reportProgress: (progress: number) => Promise<void>;
}

```
