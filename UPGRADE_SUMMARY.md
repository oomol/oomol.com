# OOMOL 官网升级总结

## 📅 升级日期
2025-11-10

## 🎯 升级目标
将官网从"易用的 AI 工具平台"升级为"开发者算力共享和 AI 工作流平台",突出四大核心技术,吸引开发者和极客用户。

---

## ✅ 已完成的升级内容

### 1. 首屏重新定位
**文件:** `src/components/HomepageFirstScreen/index.tsx`

**修改内容:**
- 标题(中文): "将你的电脑变成 AI 服务器"
- 标题(英文): "Turn Your Computer into an AI Server"
- 副标题: 强调容器、FRP、GPU 算力、API 发布
- 按钮: "开始构建" (Start Building)
- 页面 Title: "OOMOL - Turn Your Computer into an AI Server"

**关键信息:**
- 基于容器和 FRP 技术
- 共享 GPU 算力
- 构建 AI 工作流
- 一键发布 API
- 本地算力,无限可能

---

### 2. 四大核心技术组件 (新增)
**文件:**
- `src/components/HomepageCoreTech/index.tsx`
- `src/components/HomepageCoreTech/styles.module.scss`

**展示内容:**

#### 🖥️ 本地容器 + FRP 共享算力 (高亮)
- **技术标签:** Docker 容器 | FRP 协议 | WSL2 | NVIDIA GPU
- **描述:** 将本地算力(尤其是 GPU)共享给他人使用,支持 WSL2 调用 NVIDIA GPU,P2P 分享算力

#### ⚙️ 可视化工作流 + 自动 API
- **技术标签:** 可视化编程 | 函数 Blocks | 自动 API
- **描述:** 编写函数 Block,可视化组合成工作流,自动生成 RESTful API

#### 🤖 原生 MCP 协议支持
- **技术标签:** MCP 协议 | AI Agent | Tool Calling
- **描述:** 生成的函数自动支持 MCP 接口,AI Agent 可直接调用

#### 💻 VSCode 集成开发
- **技术标签:** VSCode 扩展 | Vibe Coding | AI Copilot
- **描述:** 基于 VSCode 开发,AI 自动匹配和生成 Block,效率提升 10 倍

**设计特点:**
- 2x2 网格布局,响应式设计
- 第一个卡片(算力共享)使用渐变背景高亮
- 悬停效果:上移 + 边框高亮 + 阴影
- 每个卡片包含图标、标题、描述、技术标签

---

### 3. 开发者场景重构
**文件:** `src/components/HomepageScenes/index.tsx`

**场景更新:**

| 原场景 | 新场景 | 图标 | 描述 |
|--------|--------|------|------|
| 多媒体编辑 | 🎮 GPU 算力共享 | server-process | RTX 4090 远程共享,WSL2 + FRP |
| AI 图像编辑 | 🔌 构建 MCP Server | plug | Claude Desktop 自定义工具 |
| ZIP 处理 | 📊 数据分析 API | graph | Python 脚本一键变 API |
| TXT 转 EPUB | 🖼️ AI 图像服务 | file-media | Stable Diffusion 推理服务 |
| PDF 处理 | 📡 IoT 设备控制 | radio-tower | FRP 远程控制树莓派 |
| 数据分析 | 🤖 AI Agent 工具链 | robot | 组合 MCP Tool 构建 Agent |

**内容特点:**
- 每个场景都配有视频演示(保留原有视频 URL)
- 场景描述强调技术实现和开发者价值
- 标题改为"开发者使用场景"

---

### 4. 开发者流程展示
**文件:** i18n 文案更新

**流程标题:**
- 中文: "从创建到部署,一站式开发体验"
- 英文: "From Creation to Deployment, All-in-One Development Experience"

**流程步骤:**
```
1️⃣ 创建工作流
   VSCode 内可视化编辑,支持 AI 辅助生成

2️⃣ 生成 Package
   Blocks + Flows 自动打包,容器化封装

3️⃣ 发布社区
   oomol Hub 开放分享,生态协作

4️⃣ 灵活部署
   本地 FRP P2P / 云端 API 服务
```

**强调双模式部署:**
- 本地部署 (FRP P2P 分享)
- 云端部署 (oomol Cloud API)

---

### 5. 产品生态组件 (新增)
**文件:**
- `src/components/HomepageEcosystem/index.tsx`
- `src/components/HomepageEcosystem/styles.module.scss`

**产品矩阵:**

#### oomol Studio (紫色)
- **定位:** 本地开发
- **功能:** VSCode 集成 | 可视化编辑 | AI 辅助开发 | 本地容器
- **描述:** VSCode 集成的可视化编辑器,支持 AI 辅助开发和本地容器运行

#### oomol Hub (绿色)
- **定位:** 社区生态
- **功能:** 发布 Package | 浏览社区 | 一键安装 | 开发者协作
- **描述:** 开放的 Package 分享社区,发布、浏览和安装 Blocks

#### oomol Cloud (蓝色)
- **定位:** 云端部署
- **功能:** 一键部署 | RESTful API | MCP 协议 | 计量计费
- **描述:** 一键部署到云端,提供 RESTful 和 MCP 两种 API 协议

#### oomol Chat (橙色)
- **定位:** AI 助手
- **功能:** MCP Tool | Agent 专家 | 企业知识库 | 多模型支持
- **描述:** 基于 MCP Tool 的 AI 对话助手,组合 Tool 构建 Agent 专家

**设计特点:**
- 2x2 网格布局
- 每个产品独特配色和边框
- 包含图标、名称、定位、描述、4 个特性

---

### 6. 开发者社区入口
**文件:**
- `src/components/HomepageGuide/index.tsx`
- `src/components/HomepageGuide/styles.module.scss`

**社区链接:**

#### GitHub 开源 (黑色)
- **图标:** i-codicon-github
- **描述:** 参与开源项目,贡献代码,报告问题,与全球开发者协作
- **链接:** https://github.com/oomol-lab

#### Discord 社区 (蓝紫色)
- **图标:** i-codicon-comment-discussion
- **描述:** 实时交流,获取技术支持,分享使用经验,结识志同道合的开发者
- **链接:** https://discord.gg/oomol

#### 开发者文档 (绿色)
- **图标:** i-codicon-book
- **描述:** 完整的 API 文档、示例代码、最佳实践,快速上手 oomol 开发
- **链接:** https://oomol.com/docs (根据语言切换)

**设计改动:**
- 从视频展示改为 3 个社区链接卡片
- 每个卡片有独特颜色和图标
- 悬停时卡片上移,箭头右移
- 标题改为"加入开发者社区"

---

### 7. 主页布局优化
**文件:** `src/pages/index.tsx`

**新的组件顺序:**
```jsx
<HomepageFirstScreen />      // 首屏
<HomepageCoreTech />          // ⭐ 四大核心技术 (新增)
<HomepageScenes />            // 开发者场景
<HomepageCreateScenes />      // 开发者流程
<HomepageEcosystem />         // ⭐ 产品生态 (新增)
<HomePageBuiltInLLM />        // LLM 模块
<HomepageGuide />             // 开发者社区
<GetStartedPrompt />          // CTA 下载
```

**布局逻辑:**
1. **首屏** - 吸引注意,传达核心价值
2. **技术** - 展示 4 大核心技术能力
3. **场景** - 实际应用场景演示
4. **流程** - 完整开发流程
5. **生态** - 产品矩阵和生命周期
6. **集成** - LLM 模型支持
7. **社区** - 引导加入社区
8. **转化** - 下载引导

---

### 8. 国际化文案
**文件:**
- `i18n/zh-CN/code.json`
- `i18n/en/code.json`

**新增文案条目:**
- `HOME.CoreTech.*` - 四大核心技术 (标题、描述、标签)
- `HOME.Ecosystem.*` - 产品生态 (4 个产品的信息)
- `HOME.Scenes.gpu-sharing.*` - GPU 算力共享场景
- `HOME.Scenes.mcp-server.*` - MCP Server 场景
- `HOME.Scenes.data-api.*` - 数据分析 API 场景
- `HOME.Scenes.ai-image-service.*` - AI 图像服务场景
- `HOME.Scenes.iot-control.*` - IoT 控制场景
- `HOME.Scenes.agent-toolchain.*` - Agent 工具链场景
- `HOME.Guide.github.*` - GitHub 社区链接
- `HOME.Guide.discord.*` - Discord 社区链接
- `HOME.Guide.docs.*` - 开发者文档链接
- `HOME.Create.dev-flow.*` - 开发者流程步骤

**更新文案条目:**
- `HOME.FirstScreen.slogan` - 首屏标题
- `HOME.FirstScreen.script` - 首屏描述
- `HOME.Scenes.title` - 场景标题
- `HOME.Scenes.subtitle` - 场景副标题
- `HOME.Create.title` - 创建流程标题
- `HOME.Create.subtitle` - 创建流程副标题
- `HOME.Guide.title` - 社区入口标题
- `HOME.Guide.subtitle` - 社区入口副标题
- `Theme.Navbar.go-to-hub-flow` - 导航按钮

**共计:** 约 100+ 条新增/更新的中英文文案

---

## 📊 升级效果对比

### 定位转变
| 维度 | 升级前 | 升级后 |
|------|--------|--------|
| **目标用户** | 普通用户 | 开发者/极客 |
| **核心价值** | 易用的 AI 工具 | 算力共享 + AI 工作流 |
| **技术深度** | 低 (零配置) | 高 (技术细节) |
| **差异化** | 可视化创建 | GPU 共享 + FRP + MCP |

### 信息架构
**升级前:**
```
首屏 → 场景(普通) → 创建方式 → 视频 → LLM → 下载
```

**升级后:**
```
首屏 → 核心技术 → 场景(开发者) → 开发流程 → 产品生态 → LLM → 社区 → 下载
```

### 关键指标预期
- ✅ **开发者吸引力** ↑↑↑ (GPU 共享、FRP、MCP 等技术关键词)
- ✅ **技术可信度** ↑↑ (详细的技术栈和实现方式)
- ✅ **生态完整性** ↑↑ (Studio/Hub/Cloud/Chat 四位一体)
- ✅ **社区活跃度** ↑ (GitHub/Discord/Docs 引导)

---

## 🎨 设计特点

### 视觉风格
- **主色调:** 保持紫色 (#7d7fe9)
- **辅助色:** 增加绿色(Hub)、蓝色(Cloud)、橙色(Chat)
- **技术感:** 代码图标、技术标签、架构思维
- **一致性:** 所有新组件遵循相同的卡片样式和动画

### 交互效果
- **悬停动画:** 卡片上移 4px + 阴影增强
- **边框高亮:** 悬停时边框颜色变亮
- **箭头动画:** 社区卡片箭头右移 4px
- **渐变背景:** 核心技术第一个卡片使用渐变

### 响应式设计
- **桌面端 (>996px):** 2 列网格布局
- **平板端 (768-996px):** 2 列或 1 列
- **移动端 (<768px):** 单列布局
- **所有组件:** 完全响应式,自适应屏幕

---

## 📁 文件清单

### 新增文件
```
src/components/HomepageCoreTech/
├── index.tsx                 // 四大核心技术组件
└── styles.module.scss        // 样式文件

src/components/HomepageEcosystem/
├── index.tsx                 // 产品生态组件
└── styles.module.scss        // 样式文件
```

### 修改文件
```
src/pages/index.tsx                              // 主页布局
src/components/HomepageFirstScreen/index.tsx    // 首屏组件
src/components/HomepageScenes/index.tsx         // 场景组件
src/components/HomepageGuide/index.tsx          // 社区入口
src/components/HomepageGuide/styles.module.scss // 社区样式
i18n/zh-CN/code.json                            // 中文文案
i18n/en/code.json                               // 英文文案
```

---

## 🚀 下一步建议

### 内容准备
1. **视频素材**
   - 为 6 个新开发者场景录制演示视频
   - GPU 算力共享演示
   - MCP Server 构建过程
   - 本地 FRP 部署演示
   - 云端 API 调用演示

2. **图片素材**
   - 更新场景卡片缩略图
   - 准备产品截图(Studio/Hub/Cloud/Chat)
   - 技术架构图
   - 流程示意图

3. **文档完善**
   - GPU 共享配置文档
   - FRP 内网穿透教程
   - MCP 协议开发指南
   - 本地部署 vs 云端部署对比

### 技术优化
1. **性能优化**
   - 图片懒加载
   - 视频预加载优化
   - 组件代码分割

2. **SEO 优化**
   - 更新 meta 描述
   - 添加结构化数据(JSON-LD)
   - 优化页面标题和 H1-H6
   - 添加 keywords: "GPU 共享、FRP、MCP、AI 工作流"

3. **Analytics**
   - 跟踪新组件的互动率
   - 监控社区链接点击率
   - 分析场景视频观看完成率

### 营销推广
1. **技术博客**
   - "如何用 oomol 将闲置 GPU 变成算力服务器"
   - "从零开始构建 MCP Server"
   - "oomol vs 传统 Serverless 平台对比"

2. **社交媒体**
   - Twitter/X 发布技术特性
   - Reddit r/selfhosted 推广
   - Hacker News 提交
   - Product Hunt 发布

3. **开发者社区**
   - 在 GitHub 添加 "How to Contribute" 指南
   - Discord 建立技术支持频道
   - 定期举办线上技术分享会

---

## ✅ 验收清单

- [x] 首屏文案更新为开发者导向
- [x] 四大核心技术组件创建完成
- [x] 6 个开发者场景更新
- [x] 开发者流程文案优化
- [x] 产品生态 4 宫格组件
- [x] 社区入口 3 个链接卡片
- [x] 主页组件顺序调整
- [x] 中英文国际化完成
- [x] 响应式设计测试
- [x] 页面 Title 更新

---

## 📞 联系方式

如有问题或需要进一步调整,请联系开发团队。

**升级完成日期:** 2025-11-10
**升级版本:** v2.0 (开发者版)
