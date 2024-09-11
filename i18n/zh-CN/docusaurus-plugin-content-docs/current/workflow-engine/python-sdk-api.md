---
sidebar_position: 3
---

# 📙 Python API

```python

from oocana import Context

def main(inputs: dict, context: Context):
    # 报告块已完成。
    context.done()
    # 报告额外的块消息。
    context.send_message()
    # 发送到预览。
    context.preview()
    # 报告进度，进度范围 1 ~ 100。
    context.report_progress()
    # 报告块的标准输入输出消息。
    context.report_log()
    # 报告日志信息。
    context.log_json()
    # 报告错误信息。
    context.send_error()

    return { "out": inputs }
```
