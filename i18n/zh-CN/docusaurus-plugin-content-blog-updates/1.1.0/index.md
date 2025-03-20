---
slug: OOMOL_Studio_1.1.0
title: OOMOL Studio 1.1.0
date: 2025-03-20
---

![banner](@site/static/img/release/1.1.0/cn/quick-add-block.gif)

<!-- truncate -->

# OOMOL Studio

## 通用

### AI 自动编辑

现在我们支持了 AI 自动编辑的功能！这将会进一步降低开发者编写的成本。

![AI 自动编辑功能](@site/static/img/release/1.1.0/cn/ai-auto-edit.gif)

### 内置 LLM 模块

我们收到了一些用户的反馈，如果我们可以内置一些可以直接调用模型的 Block，那么对 AI 相关的工作流将会帮助很大。经过一段时间的开发，现已经支持。

![内置 LLM 模块](@site/static/img/release/1.1.0/cn/built-in-llm.png)

### 优化 AI Chat

为了减低用户理解 Flow 的心智成本，我们对我们的 AI Chat 进行了优化，现在当你在和 AI Chat 沟通时，会自动分析当前的 Flow。

![优化 AI Chat](@site/static/img/release/1.1.0/cn/optimized-ai-chat.gif)

### 快速添加 Block

有一些用户反馈：每次想要增加一个新的 Block 时，总是要去找，非常不方便。于是我们参考了用户推荐的做法，现在可以通过右键、连线结束后自动弹出。

![快速添加 Block](@site/static/img/release/1.1.0/cn/quick-add-block.gif)

### 预览全屏

我们发现当 preview 的数据比较精细时，由于大小的限制，导致有些看不清楚，所以我们在这个版本中对一些常用的图标、视频、markdown 等预览窗口支持了全屏放大的功能。

![预览全屏](@site/static/img/release/1.1.0/cn/fullscreen-preview.gif)

### 支持中国镜像源

由于许多 Flow 需要通过 npm 和 pip 下载依赖，但因网络问题，许多用户都遇到下载失败的情况。针对这一问题，我们已经作了相关支持，现在下载依赖的成功率将提升很多。

![支持中国镜像源](@site/static/img/release/1.1.0/cn/china-mirror.png)

> 在此感谢 [清华大学开源软件镜像站] 提供的服务！

## MacOS

### 支持使用系统的 SSH Auth

当电脑中已经存在了 SSH 私钥或者启用了例如 [1Password SSH Agent] 时，现在可以直接在 OOMOL Studio 中使用这些认证，而不需要重新创建一个新的 SSH 密钥。

![支持系统 SSH Auth](@site/static/img/release/1.1.0/cn/system-ssh-auth.gif)

相关项目: [ovm-ssh-agent] [ssh-forward]

## Windows

### 支持移动 OVM 虚拟机数据目录

我们收到了很多用户的反馈，希望能够将 OVM 虚拟机的数据目录从默认的 C 盘（`%USERPROFILE%\.oomol-studio\ovm\target`）移动到其他盘符。现在，我们支持了这个功能。

> 注意:
> 我们不支持移动到远程共享的网络目录（UNC）中，因为这会导致 WSL2 出现意外问题。
> 同时，在迁移完成后，我们会重置 OVM 虚拟机中的数据，原因请查看：[ovm-win#97]

![移动 OVM 数据目录](@site/static/img/release/1.1.0/cn/move-ovm-data.png)

### 修复部分无法打开 Flow 项目的情况

- 当 WSL2 版本较低时，无法检测 Windows Features 开启情况 [ovm-win#82]
- 当安装部分安卓模拟器时，无法启动容器
  - 我们添加了不兼容情况的检测 [ovm-win#85]
- 当 WSL 为系统初始版本时，无法检测 Windows Features 开启情况 [ovm-win#87]

## 其他

### VSCode 从 1.97.2 升级到 v1.98.2

我们一直在关注 VSCode 的更新，这次我们将 VSCode 从 1.97.2 升级到了 v1.98.1。

对比: [v1.98.2...v1.97.2]

发版说明: [https://code.visualstudio.com/updates/v1_98](https://code.visualstudio.com/updates/v1_98)

### 开源

在这段时间内，我们除了对 OOMOL Studio 本身的更新迭代之外，还对开源社区做出了一些贡献:

#### 开源的新项目

- pdf-craft: [https://github.com/oomol-lab/pdf-craft](https://github.com/oomol-lab/pdf-craft)
  - 将 PDF 文件转换为各种其他格式。该项目将专注于处理扫描书籍的 PDF 文件
- oocana-node: [https://github.com/oomol/oocana-node](https://github.com/oomol/oocana-node)
  - 我们底层的 Node.js 执行器
- oocana-python: [https://github.com/oomol/oocana-python](https://github.com/oomol/oocana-python)
  - 我们底层的 Python 执行器
- oocana-rust: [https://github.com/oomol/oocana-rust](https://github.com/oomol/oocana-rust)
  - 我们底层的 Rust 调度器
- ssh-forward: [https://github.com/oomol-lab/ssh-forward](https://github.com/oomol-lab/ssh-forward)
  - 基于 SSH 转发 Unix Domain Socket File

### 感谢

自上个版本发布以来，许多人提出了建设性的建议，还有一些人协助我们排查和解决复杂问题。在此，我们向他们致以感谢：

阿叶、问仙、天光、🐙鹏、沉底的漂流瓶、陈胖子丶、七年、旧日的足迹、风走、二十二、ttc、ai来事、常鲜、白羊、苏联锦衣卫、风走、可以了、兰新、luck、牧、虎、KingXt、青蛙拉斯🐸

[ovm-win#82]: https://github.com/oomol-lab/ovm-win/pull/82
[ovm-win#85]: https://github.com/oomol-lab/ovm-win/pull/85
[ovm-win#87]: https://github.com/oomol-lab/ovm-win/pull/87
[ovm-win#97]: https://github.com/oomol-lab/ovm-win/issues/97
[1Password SSH Agent]: https://developer.1password.com/docs/ssh/agent/
[ovm-ssh-agent]: https://github.com/oomol-lab/ovm-ssh-agent
[ssh-forward]: https://github.com/oomol-lab/ssh-forward
[v1.98.2...v1.97.2]: https://github.com/microsoft/vscode/compare/1.98.2...1.97.2
[清华大学开源软件镜像站]: https://mirror.tuna.tsinghua.edu.cn/
