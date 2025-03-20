---
slug: OOMOL_Studio_1.1.0
title: OOMOL Studio 1.1.0
date: 2025-03-20
---

![banner](@site/static/img/release/1.1.0/cn/quick-add-block.gif)

<!-- truncate -->

# OOMOL Studio

## General

### AI Auto Editing

We now support AI auto-editing functionality! This will further reduce development costs for creators.

![Image](@site/static/img/release/1.1.0/cn/ai-auto-edit.gif)

### Built-in LLM Module

Based on user feedback requesting direct model integration, we've developed built-in LLM Blocks that can be directly invoked, significantly enhancing AI-related workflows.

![Image](@site/static/img/release/1.1.0/cn/built-in-llm.png)

### Enhanced AI Chat

To reduce the cognitive load of understanding Flow, we've optimized our AI Chat to automatically analyze the current Flow during conversations.

![Image](@site/static/img/release/1.1.0/cn/optimized-ai-chat.gif)

### Quick Block Addition

Users reported difficulties in finding new Blocks to add. Following user recommendations, we've implemented right-click functionality and automatic popups after connecting lines.

![Image](@site/static/img/release/1.1.0/cn/quick-add-block.gif)

### Fullscreen Preview

When previewing detailed data, size limitations sometimes made content difficult to see. This version adds fullscreen expansion capabilities for common preview windows including icons, videos, and markdown.

![Image](@site/static/img/release/1.1.0/cn/fullscreen-preview.gif)

### Support for Chinese Mirror Sources

Many Flows require npm and pip dependencies, but network issues often caused download failures for users. We've implemented support for Chinese mirrors, significantly improving download success rates.

![Image](@site/static/img/release/1.1.0/cn/china-mirror.png)

> Special thanks to [Tsinghua University Open Source Software Mirror](https://mirror.tuna.tsinghua.edu.cn/) for providing this service!

## MacOS

### System SSH Authentication Support

When SSH private keys already exist on your computer or when using services like [1Password SSH Agent], you can now use these authentications directly in OOMOL Studio without creating new SSH keys.

![Image](@site/static/img/release/1.1.0/cn/system-ssh-auth.gif)

Related projects: [ovm-ssh-agent] [ssh-forward]

## Windows

### OVM Virtual Machine Data Directory Relocation

Many users requested the ability to move the OVM virtual machine data directory from the default C drive location (`%USERPROFILE%\.oomol-studio\ovm\target`) to other drives. This functionality is now supported.

> Note:
> We do not support migration to remote shared network directories (UNC) as this can cause unexpected issues with WSL2.
> Additionally, after migration, we will reset the data in the OVM virtual machine. For more information, see: [ovm-win#97]

![Image](@site/static/img/release/1.1.0/move-ovm-data.png)

Related PRs: [ovm-win#89] [ovm-win#91] [ovm-win#94] [ovm-win#95] [ovm-win#96] [ovm-win#98] [ovm-win#99]

### Fixed Various Flow Project Opening Issues

- Inability to detect Windows Features status with older WSL2 versions [ovm-win#82]
- Container startup failures when certain Android emulators are installed
  - Added incompatibility detection [ovm-win#85]
- Inability to detect Windows Features status with initial WSL system versions [ovm-win#87]

## Other Improvements

### VSCode Upgraded from 1.97.2 to v1.98.2

We continuously monitor VSCode updates and have upgraded from version 1.97.2 to v1.98.2.

Comparison: [v1.98.2...v1.97.2]

Release notes: [https://code.visualstudio.com/updates/v1_98](https://code.visualstudio.com/updates/v1_98)

### Open Source Contributions

In addition to OOMOL Studio updates, we've made several contributions to the open source community:

#### New Open Source Projects

- pdf-craft: [https://github.com/oomol-lab/pdf-craft](https://github.com/oomol-lab/pdf-craft)
  - Converts PDF files to various other formats, focusing on scanned book PDFs
- oocana-node: [https://github.com/oomol/oocana-node](https://github.com/oomol/oocana-node)
  - Our underlying Node.js executor
- oocana-python: [https://github.com/oomol/oocana-python](https://github.com/oomol/oocana-python)
  - Our underlying Python executor
- oocana-rust: [https://github.com/oomol/oocana-rust](https://github.com/oomol/oocana-rust)
  - Our underlying Rust scheduler
- ssh-forward: [https://github.com/oomol-lab/ssh-forward](https://github.com/oomol-lab/ssh-forward)
  - Unix Domain Socket File forwarding based on SSH

### Acknowledgements

Since our last release, many people have provided constructive suggestions and helped us investigate and solve complex problems. We extend our gratitude to:

阿叶、问仙、天光、🐙鹏、沉底的漂流瓶、陈胖子丶、七年、旧日的足迹、风走、二十二、ttc、ai来事、常鲜、白羊、苏联锦衣卫、风走、可以了、兰新、luck、牧、虎、KingXt、青蛙拉斯🐸

[ovm-win#82]: https://github.com/oomol-lab/ovm-win/pull/82
[ovm-win#85]: https://github.com/oomol-lab/ovm-win/pull/85
[ovm-win#87]: https://github.com/oomol-lab/ovm-win/pull/87
[ovm-win#89]: https://github.com/oomol-lab/ovm-win/pull/89
[ovm-win#91]: https://github.com/oomol-lab/ovm-win/pull/91
[ovm-win#94]: https://github.com/oomol-lab/ovm-win/pull/94
[ovm-win#95]: https://github.com/oomol-lab/ovm-win/pull/95
[ovm-win#96]: https://github.com/oomol-lab/ovm-win/pull/96
[ovm-win#98]: https://github.com/oomol-lab/ovm-win/pull/98
[ovm-win#99]: https://github.com/oomol-lab/ovm-win/pull/99
[ovm-win#97]: https://github.com/oomol-lab/ovm-win/issues/97
[1Password SSH Agent]: https://developer.1password.com/docs/ssh/agent/
[ovm-ssh-agent]: https://github.com/oomol-lab/ovm-ssh-agent
[ssh-forward]: https://github.com/oomol-lab/ssh-forward
[v1.98.2...v1.97.2]: https://github.com/microsoft/vscode/compare/1.98.2...1.97.2
