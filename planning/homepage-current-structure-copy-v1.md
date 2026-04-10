# OOMOL 首页文案 V1（按当前组件结构）

这份文档不是新的首页规划，而是按照当前首页现有模块结构整理的一版正式中文内容。

适用范围：

- [src/components/HomepageFirstScreen/index.tsx](/Users/wushuang/code/oomol.com/src/components/HomepageFirstScreen/index.tsx)
- [src/components/HomepagePainPoints/index.tsx](/Users/wushuang/code/oomol.com/src/components/HomepagePainPoints/index.tsx)
- [src/components/HomepageBrandBreak/index.tsx](/Users/wushuang/code/oomol.com/src/components/HomepageBrandBreak/index.tsx)
- [src/components/HomepageLinearFlow/index.tsx](/Users/wushuang/code/oomol.com/src/components/HomepageLinearFlow/index.tsx)
- [src/components/HomepageDeveloperBenefits/index.tsx](/Users/wushuang/code/oomol.com/src/components/HomepageDeveloperBenefits/index.tsx)

目标是尽量复用你们当前首页结构，只替换叙事和文案重点。

---

## 1. 首页整体基调

首页主叙事建议改成：

`为 Codex 和 AI Agent 接入、构建并交付可用能力`

首页第一阶段先建立赛道认知，不先强调：

- 代码不暴露
- 开源还是闭源
- 与 Composio 的差异

这些内容继续保留，但下沉到 Cloud 相关区块讲。

---

## 2. HomepageFirstScreen

### 推荐表达目标

这一屏只做三件事：

1. 说清楚 OOMOL 是做什么的
2. 说清楚支持什么能力类型
3. 给出继续了解和开始体验的入口

### 推荐文案

#### 顶部短句

连接现成工具，
也支持自定义能力。

#### 主标题

为 Codex 和 AI Agent 接入可用能力

#### 说明文案

连接 SaaS 授权、API Key 和自定义逻辑，把能力封装成可被 CLI、API、MCP 和 Agent 使用的运行入口。

#### 次级说明

先用已有能力，也可以在 OOMOL Studio 里生成、组合和扩展你自己的能力，再通过 Cloud 持续运行与交付。

#### 主按钮建议

当前代码里是下载按钮。

如果短期不改结构，可以先保留。
如果允许调整，建议主按钮改成：

`Start with oo-cli`

#### 次按钮建议

`See how it works`

### 推荐备注

当前首屏里“代码仍由你掌控”这类表达建议下沉，不再作为第一认知句。

---

## 3. HomepagePainPoints

### 推荐表达目标

当前这个模块建议不再主打“代码泄露”。
建议改成讲用户为什么需要 OOMOL 这条路径。

### 推荐区块标题

为什么不只是接一个工具就够了

### 推荐 badge

Why OOMOL

### 卡片 1

#### 标题

现成连接不够时，还要能继续扩展

#### 描述

很多真实场景不只是连接单个 SaaS，而是还要接入自定义 API、内部系统和业务逻辑，把多种能力组合成一条可执行路径。

#### solution

OOMOL 让你既能连接现成能力，也能继续封装、扩展和组合自己的实现。

### 卡片 2

#### 标题

同一份能力，不该重复做成多种入口

#### 描述

很多团队先写脚本，再补 API，再包 MCP，最后还要做图形界面。真正耗时间的不是能力本身，而是重复包装和重复交付。

#### solution

在 OOMOL 里，同一份能力可以服务 CLI、API、MCP 和图形界面，减少重复建设。

---

## 4. HomepageBrandBreak

### 推荐表达目标

这个区块继续保留，但建议从“Build once Deliver continuously”收紧到更符合首页主叙事的版本。

### 推荐 headline

连接、构建、持续交付

### 推荐 subline

从 oo-cli 到 Studio，再到 Cloud，一条连续路径。

### 三个节点文案建议

#### 卡片 1

Use via oo-cli

中文：

先在终端里直接使用

#### 卡片 2

Build in Studio

中文：

在 Studio 中生成和组合

#### 卡片 3

Run on Cloud

中文：

通过 Cloud 持续运行与交付

### 推荐备注

如果后续允许调整顺序，更建议改成：

- oo-cli 使用
- Studio 构建
- Cloud 交付

这会更符合用户的认知顺序。

---

## 5. HomepageLinearFlow

这是当前首页最重要的区块。

建议保留四段结构，但每段的作用更明确：

- 第 1 段：告诉用户怎么开始
- 第 2 段：告诉用户怎么做自己的能力
- 第 3 段：告诉用户怎么交付
- 第 4 段：告诉用户除了终端还可以去哪里使用

### 5.1 第一段：oo-cli

#### eyebrow

01 / oo-cli

#### 标题

先在 Codex 里装 oo-cli，直接开始用能力

#### 描述

oo-cli 是最适合在 Codex、Claude Code 和终端环境里开始使用能力的入口。先搜索、查看和运行已发布能力，把使用路径先跑通。

#### 主按钮

查看安装文档

#### 次按钮

查看 GitHub

#### 视频说明标题

Codex 演示视频

#### 视频说明描述

展示在 Codex 中安装、搜索、查看并运行能力的过程。

### 5.2 第二段：Studio

#### eyebrow

02 / OOMOL Studio

#### 标题

当现成能力不够，就用 OOMOL Studio 做你自己的

#### 描述

直接告诉 Agent 你要生成什么能力，再继续补代码、接依赖、改参数和做组合。Studio 的角色不是替代开发流程，而是把能力生成和本地验证带回真实编码环境。

#### 主按钮

安装 OOMOL Studio

#### 次按钮

了解 Studio

#### 视频说明标题

Studio 演示视频

#### 视频说明描述

展示从描述需求、生成能力到本地验证跑通的过程。

### 5.3 第三段：Cloud

#### eyebrow

03 / Cloud

#### 标题

当能力需要持续运行和交付时，Cloud 来承接

#### 描述

能力完成本地验证后，Cloud 负责承接运行时、配置、Secrets、交付关系和使用数据。你不用围着同一份实现重复做一层又一层产品外壳。

#### 卡片 1

##### 标题

统一承接运行与交付

##### 描述

把能力交付给自己、团队或客户时，继续沿用同一套实现和同一条路径。

#### 卡片 2

##### 标题

把配置和使用关系放进同一个后台

##### 描述

Secrets、权限、版本、运行配置和使用数据集中管理，减少分散维护。

#### 主按钮

了解 Cloud

#### 次按钮

打开 Cloud 控制台

#### 预览标题

Cloud 控制台预览

#### 预览说明

把运行配置、交付关系和使用数据放到同一个后台里管理。

#### pills 建议

- 运行配置
- Secrets 管理
- 使用数据

### 5.4 第四段：App / GUI Surface

当前这个区块建议弱化“单独产品”心智，强化“另一种使用入口”心智。

#### eyebrow

04 / App Surface

#### 标题

不在终端里工作时，同一份能力也能继续承载到图形界面

#### 描述

CLI 适合开发者工作流，图形界面适合更直观的使用方式。重点不是再做一套新能力，而是让同一份能力进入不同使用入口。

#### 主按钮

查看图形界面示例

#### 次按钮

了解 App Surface

#### 视频说明标题

图形界面示例

#### 视频说明描述

展示同一份能力如何从终端入口延伸到更直接的图形界面使用体验。

---

## 6. HomepageDeveloperBenefits

### 推荐表达目标

当前这个区块如果继续保留“免费方案”思路，容易显得像促销信息。
更建议改造成“推荐起步方式”，用来承接首页转化。

### 推荐 badge

Recommended Path

### 推荐标题

先把使用路径跑通，再决定要不要做自己的

### 推荐副标题

对大多数用户来说，最自然的路径不是一上来先建能力，而是先在 oo-cli 中用起来；需要自己的实现时，再进入 Studio 和 Cloud。

### 卡片 1

#### eyebrow

最快开始

#### tag

推荐

#### value

oo-cli

#### value caption

先把使用路径跑通

#### 标题

先在 Codex 和终端里直接使用已发布能力

#### 描述

安装 oo-cli 后，先搜索、查看并运行已发布能力。先得到真实使用体验，再决定是否需要自己构建。

#### note

这是最短的开始方式，也最适合第一次接触 OOMOL 的用户。

#### cta

查看 CLI 文档

### 卡片 2

#### eyebrow

需要扩展时

#### tag

下一步

#### value

Studio + Cloud

#### value caption

构建并交付自己的能力

#### 标题

当现成能力不够，再进入 Studio 和 Cloud

#### 描述

在 Studio 中生成、组合和验证能力，再通过 Cloud 持续运行与交付，让同一份实现服务更多入口和更多用户。

#### note

从使用到构建保持同一条路径，不必切换成另一套平台模式。

#### cta

了解构建路径

---

## 7. 结尾 CTA

当前 `HomepageLinearFlow` 末尾已有 CTA，可以继续保留，但建议改成更明确的首页收尾表达。

### 标题

先把一个能力跑起来，再决定要不要做自己的

### 描述

先通过 oo-cli 让使用路径跑通。需要自己的能力时，再进入 Studio 生成、组合、验证，并通过 Cloud 持续交付。

### 主按钮

Start with oo-cli

### 次按钮

Build your first capability

---

## 8. 当前版本的首页主文案组合

如果现在只改最核心的三处文案，推荐先改下面这三条。

### 首页主标题

为 Codex 和 AI Agent 接入可用能力

### 首页主说明

连接 SaaS 授权、API Key 和自定义逻辑，把能力封装成可被 CLI、API、MCP 和 Agent 使用的运行入口。

### 首页路径说明

先通过 oo-cli 开始使用；需要自己的实现时，再进入 Studio 构建，并通过 Cloud 持续运行与交付。

---

## 9. 当前版本最值得优先修改的模块

如果只做最小修改，建议优先改下面三个模块：

1. HomepageFirstScreen
   先把首页第一认知从“代码控制”切换成“能力接入与交付”

2. HomepagePainPoints
   先把“代码泄露”改成“现成连接不够时，如何继续扩展和复用”

3. HomepageLinearFlow
   保留结构，但把四段文案统一成一条连续路径

这三个模块改完，首页的整体理解会立刻比现在更顺。
