---
sidebar_position: 3
---

# 📙 Python API

```python

from oocana import Context

def main(inputs: dict, context: Context):
    # Report Block done.
    context.done()
    # Report extra Block messages.
    context.send_message()
    # Send to Preview.
    context.preview()
    # Report progress, progress 1 ~ 100.
    context.report_progress()
    # Report Block's stdio and stdout message.
    context.report_log()
    # Report logs.
    context.log_json()
    # Report error.
    context.send_error()

    return { "out": inputs }
```
