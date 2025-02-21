---
title: Cursor开发实践
autoGroup-1: 大模型应用
---

# Cursor开发实践

## 引言

- 本次分享的目标：如何利用Cursor提升开发效率
- 分享内容概览：相关功能演示，以及一些经验和实战案例
- 适用人群：希望通过AI辅助工具提升编程效率的开发者

## 大纲导图

<Mindmap :data="[
['root', {
 text: 'Cursor开发实践指南',
 children: ['overview', 'development-phases', 'project-practices', 'techniques', 'resources', 'challenges']
}],
['overview', {
 text: '概述',
 children: ['intro', 'benefits', 'use-cases'] 
}],
['intro', {
 text: '引言与目标',
 children: []
}],
['benefits', {
 text: '主要优势',
 children: []
}],
['use-cases', {
 text: '适用场景',
 children: []
}],
['development-phases', {
 text: '大型项目开发策略',
 children: ['planning', 'architecture', 'modular-dev', 'iteration']
}],
['planning', {
 text: '第一阶段：项目规划',
 children: ['project-intro', 'tech-stack', 'ai-evaluation']
}],
['project-intro', {
 text: '详细项目介绍',
 children: []
}],
['tech-stack', {
 text: '技术栈选择',
 children: []
}],
['ai-evaluation', {
 text: 'AI方案评估',
 children: []
}],
['architecture', {
 text: '第二阶段：架构设计',
 children: ['ddd', 'clean-architecture']
}],
['ddd', {
 text: '领域驱动设计',
 children: ['domain-entities', 'interfaces', 'business-processes', 'structure-docs']
}],
['domain-entities', {
 text: '领域实体划分',
 children: []
}],
['interfaces', {
 text: '接口定义',
 children: []
}],
['business-processes', {
 text: '业务流程梳理',
 children: []
}],
['structure-docs', {
 text: '项目结构文档',
 children: []
}],
['clean-architecture', {
 text: 'Clean Architecture',
 children: []
}],
['modular-dev', {
 text: '第三阶段：模块化开发',
 children: ['module-dev', 'tdd', 'doc-updates']
}],
['module-dev', {
 text: '按模块开发',
 children: []
}],
['tdd', {
 text: '测试驱动开发',
 children: []
}],
['doc-updates', {
 text: '文档同步更新',
 children: []
}],
['iteration', {
 text: '第四阶段：迭代优化',
 children: ['repeat-iteration', 'feature-completion']
}],
['repeat-iteration', {
 text: '重复迭代',
 children: []
}],
['feature-completion', {
 text: '功能模块完善',
 children: []
}],
['project-practices', {
 text: '项目开发实践',
 children: ['tech-architecture', 'mvp-design', 'module-docs', 'test-driven']
}],
['tech-architecture', {
 text: '技术架构',
 children: []
}],
['mvp-design', {
 text: 'MVP方案设计',
 children: []
}],
['module-docs', {
 text: '分模块详细文档',
 children: []
}],
['test-driven', {
 text: '测试驱动开发',
 children: []
}],
['techniques', {
 text: '使用技巧',
 children: ['templates', 'cursor-tips', 'code-reading', 'refactoring']
}],
['templates', {
 text: '模板开发',
 children: ['github-references', 'tech-templates']
}],
['github-references', {
 text: 'GitHub参考项目',
 children: []
}],
['tech-templates', {
 text: '技术框架模板',
 children: []
}],
['cursor-tips', {
 text: '实用小技巧',
 children: ['code-reading-assist', 'requirement-specs', 'problem-solving']
}],
['code-reading-assist', {
 text: 'AI辅助代码阅读',
 children: []
}],
['requirement-specs', {
 text: '需求详细化',
 children: []
}],
['problem-solving', {
 text: '问题定位与修复',
 children: []
}],
['refactoring', {
 text: '代码重构',
 children: []
}],
['resources', {
 text: '资源推荐',
 children: ['learning-resources', 'tools', 'learning-path']
}],
['learning-resources', {
 text: '学习资源',
 children: []
}],
['tools', {
 text: '工具与插件',
 children: []
}],
['learning-path', {
 text: '后续学习路径',
 children: []
}],
['challenges', {
 text: '常见问题',
 children: ['context-limits', 'cursor-rules', 'advanced-usage']
}],
['context-limits', {
 text: '上下文长度限制',
 children: []
}],
['cursor-rules', {
 text: '自定义规则空间占用',
 children: []
}],
['advanced-usage', {
 text: '高级应用场景',
 children: ['code-migration', 'architecture-refactoring', 'test-generation']
}],
['code-migration', {
 text: '代码转换与迁移',
 children: []
}],
['architecture-refactoring', {
 text: '架构重构与优化',
 children: []
}],
['test-generation', {
 text: '自动化测试生成',
 children: []
}]
]" />

## 简单初体验

[硅基流动](https://siliconflow.cn/zh-cn/) DeepSeek API Key 代码调用示例。

```
@SiliconFlow 我需要你帮我用python3 实现 deepseek r1的api调用，需要支持多轮对话，我会把我的多轮提示词放到一个数组，你需要写一个类接受我的提示词，完成多轮对话后把最终结果给我。并添加一些打印方便我看执行到哪里了。
```

## 大型项目开发策略

![](/cursor_pratice.assets/four.png)

### 第一阶段：项目规划

- **详细项目介绍**：
  - 目的：明确项目要解决的核心问题和目标用户
  - 背景：行业现状和相关技术发展趋势
  - 技术栈选择：根据项目需求和团队熟悉度选择合适的技术栈
- **提供给AI做技术选项和方案**
  - 列出可能的技术方案供AI评估
  - 针对不同方案，让AI分析优缺点
  - 让AI协助生成初步的技术文档

### 第二阶段：架构设计

**领域驱动设计（DDD）**

- 划分领域实体：识别核心业务概念和实体
- 定义接口：明确各模块间的交互方式
- 梳理业务流程：用图表展示主要业务流程
- 确认代码架构和功能划分：决定代码组织方式
- 建立项目结构文档，便于统计和更新
  - 使用树状图展示文件结构
  - 维护模块依赖关系图

**或者 Clean Architecture**

- 将业务逻辑与技术实现分离
- 定义清晰的层级：实体层、用例层、接口适配层、框架与驱动层
- 确保依赖关系向内指向核心业务逻辑

### 第三阶段：模块化开发

- 按模块进行开发：将大项目拆分为可独立开发的模块
- 同步编写测试代码和功能代码：采用TDD或BDD方法
- 持续更新项目结构文档：记录变更和演进
- 使用Cursor协助生成测试用例和边界条件处理

### 第四阶段：迭代优化

- 重复迭代：基于反馈持续优化
- 逐步完善功能模块：优先级排序，逐步实现
- 利用Cursor进行代码审查和优化
- 自动化测试与持续集成

## 项目开发实践

![](/cursor_pratice.assets/prompt_flow.png)

### 技术架构

示例提示词：

```
我希望做一个浏览器录制自动化工具单记小型软件，我希望有一个好看的前端界面，现代化，科技感，最好使用python3实现，最后可以打包程一个exe文件的项目。双击打开exe文件后，我希望有录制和执行按钮，以及之前录制好的自动化的列表。可以选择一条录制好的脚本直接执行，开始自动化流程。也可以点击录制，弹出一个浏览器开始录制操作，实时记录自动化脚本步骤，当然需要考虑浏览器有延时。执行完毕动作之后，在exe页面点击完成，此时需要用户给这次自动化流程命名，方便下次执行。然后保存到自动化列表中。

根据我的需求先写好技术架构文档--放在根目录下TechnicalArchitecture.txt（记录项目的功能业务目录结构,不要使用markdown格式，使用普通文本）【回复使用中文】
```

### MVP方案设计

示例提示词：

```
我需要快速实现我项目的核心功能，请你写出MVP方案的详细设计以及实现步骤的文档--放在根目录下MVP.txt（不要使用markdown格式，使用普通文本）。

需要有：
方案设计
模块划分
模块优先级

我后续会根据文档进行开发。
```

### 分模块详细文档

示例提示词：

```
现在开始阶段一，请你写出阶段一详细的方案设计--放在根目录下MVP_1.txt（不要使用markdown格式，使用普通文本）。 

需要有：
文件划分
类的接口
类的测试文件

功能如何验证。
```

### 测试驱动开发

![](/cursor_pratice.assets/tdd.png)

使用生成的文档进行开发设计。示例：

```
core/
│   ├── browser.py     # 浏览器操作封装
现在完成这个功能，以及对应的测试用例文件。
```

## 使用模板开发

### 借鉴优秀开源项目

- **在GitHub寻找相似项目作为参考**：
  - 通过关键词搜索类似功能的开源项目
  - 分析其架构设计和实现方案
  - 借鉴代码组织和最佳实践
  - 将发现的解决方案与AI讨论，寻求改进
  - 总结项目实现中的关键设计决策和难点

### 利用成熟框架加速开发

- **使用成熟的技术框架模板**：
  - 分层架构模板（如Clean Architecture、DDD模板）
  - 前端模板项目（如Next.js app模板、Vue脚手架）
  - 推荐模板：unibest（集成了现代前端最佳实践）
  - 行业特定解决方案模板（如电商、CMS系统模板）
  - 微服务架构模板（适用于大型分布式系统）

### 模板项目推荐

- [unibest](https://github.com/codercup/unibest) - 现代前端最佳实践集成
- [DDD Starter Kit](https://github.com/Sairyss/domain-driven-hexagon) - 领域驱动设计模板
- [FastAPI Full Stack](https://github.com/tiangolo/full-stack-fastapi-postgresql) - Python全栈应用模板

通过这种方式，您可以避免从零构建结构，而是专注于业务逻辑实现，大大缩短开发周期。模板提供了经过验证的架构基础，保证了代码质量和可维护性。

简单提示词即可开发功能，因为项目模块划分清晰，比如接口：

- ```
  接口url：<>
  body：<>
  
  respone返回：<>
  
  组件内调用示例：<>
  
  参考<foo.ts接口文件>帮我写出接口调用代码。以及使用示例。【思考过程使用中文】
  ```
  
- ```
  参考 xxx.vue 页面的样式，风格，帮我实现新的xxx.vue页面。
  
  页面需要实现XX的功能。XX按钮，点击后调用什么接口。
  
  我的接口信息：<>
  
  1. 我需要你在foo.ts文件里新增接口。
  2. 使用foo.ts新增的接口，在xxx.vue页面完成我的需求，
  ```

## 实际项目可用小技巧

### 代码阅读与理解

**AI辅助代码阅读**：

- 使用AI总结代码功能：让AI提炼复杂代码的核心逻辑
- 让AI生成代码注释：对遗留代码添加清晰注释
- 格式化代码：使用AI优化代码格式，提高可读性
- 生成代码导航图：让AI绘制模块间的调用关系图

### 需求转代码技巧

**把需求写清晰，具体到字段，AI是可以帮你完成需求的。**

- 指定修改范围，如新增文件以xxx前缀开头
- 指定风格版本：vue2并且风格使用vue-property-decorator的方式，技术栈使用typescript（注意：容易出现兼容错误）
- 提供明确的数据结构和接口定义
- 参考已有代码片段，要求保持风格一致
- 分步骤清晰描述需求，避免一次性要求实现过多功能

### 问题排查与修复

**加速问题定位，提供异常现象以及字段，让大模型读取代码，看看大模型如何回复。搜索关键信息，稍微判断问题所在，让大模型直接修复。**

具体步骤：
1. 提供完整的错误信息和堆栈跟踪
2. 上传相关代码文件供AI分析
3. 描述预期行为与实际行为的差异
4. 让AI生成修复方案并解释原因

### 代码重构

**重构代码**：

- 让AI添加打印关键节点数据类型的日志代码
- 将日志提供给AI，让其还原代码功能
- 让AI分析代码冗余和可优化点
- 请求AI提供重构建议，改善代码结构
- 最后还是需要深入了解业务（了解的不够全面，还是会出问题）

## 常见问题

### 上下文长度限制

![](/cursor_pratice.assets/length.png)

- 200K上下文能处理的内容量，DeepSeek模型的64K限制，我是程序员，请你举例实际的代码文件数量的例子，让我知道上下文多大?

  ```
  这样一个完整的组件文件,包含注释、空行等,通常在200-300行,大约占用8-12KB的空间。
  那么对于不同的上下文长度:
  DeepSeek的64K上下文:
  
  可以同时加载约5-6个中等复杂度的React组件文件
  或者一个较大的Node.js后端服务文件(约1500行)
  或者一个完整的小型项目的所有主要代码文件
  
  Claude的200K上下文:
  
  可以同时处理一个中型React项目的所有前端组件(约15-20个组件文件)
  或者一个完整的全栈应用后端代码(约4000-5000行Node.js代码)
  或者一个包含前端组件、后端服务、数据库模型、测试等全部代码的小型全栈项目
  
  让我举一个具体的项目结构例子:
  Copymy-fullstack-app/
  ├── frontend/
  │   ├── src/
  │   │   ├── components/ (10个组件,每个约250行)
  │   │   ├── pages/ (5个页面组件,每个约300行)
  │   │   ├── utils/ (工具函数,约500行)
  │   │   └── App.js (200行)
  ├── backend/
  │   ├── routes/ (API路由,约1000行)
  │   ├── models/ (数据模型,约800行)
  │   ├── controllers/ (业务逻辑,约1200行)
  │   └── server.js (200行)
  └── tests/ (单元测试,约1000行)
  这个项目总计约7000行代码:
  
  DeepSeek 64K可以加载其中约1/3的代码
  Claude 200K可以一次性加载整个项目的所有代码文件
  
  这样的上下文容量意味着:
  
  DeepSeek适合单文件或少量文件的代码分析和优化
  Claude适合对整个项目进行全局分析、重构建议、架构优化等需要理解完整代码库的任务
  
  当然这只是一个参考,实际代码的复杂度、注释量、空行等都会影响具体能处理的代码量。你觉得这个解释对理解上下文长度的实际意义有帮助吗？
  ```

### 自定义规则空间占用

- cursor rules 回占用上下文的空间吗？

  ```
  啊，我现在明白了你说的是 Cursor 编辑器中的 AI Rules 设置。让我详细解释一下这个问题：
  
  Cursor 中的 AI Rules 确实会占用上下文空间，因为这些规则实际上是作为提示（prompt）的一部分被发送给 AI 模型的。这些规则告诉 AI 如何思考和回应，所以它们需要被包含在上下文中。
  
  让我们通过一个具体的例子来理解：
  
  假设你在 Cursor 中设置了这样的规则：
  ```
  - Always add thorough documentation
  - Follow Python PEP 8 style guide
  - Include type hints
  - Add error handling
  ```
  
  当你有一个 1000 行的 Python 文件时，实际占用的上下文空间会是：
  1. Rules 的文本内容：约 200-300 字符
  2. 代码文件内容：约 40-50KB
  3. 你的提问和 AI 的回答
  
  所以虽然 Rules 确实占用空间，但相比于实际的代码文件，它们占用的空间相对较小。举个例子，如果你设置了 10 条详细的规则，可能会占用约 1-2KB 的上下文空间，这在 64K 或 200K 的上下文窗口中是很小的一部分。
  
  为了优化上下文使用，你可以：
  1. 保持 Rules 简洁明确，避免冗长的描述
  2. 只包含当前任务真正需要的规则
  3. 如果处理大型代码库，考虑分批处理，这样可以留出更多空间给实际的代码内容
  
  这样解释是否帮助你更好地理解了 Cursor Rules 是如何影响上下文空间的使用的？
  ```

### 资源获取

- 次数太少了！怎么白嫖？[无限注册](https://github.com/yeongpin/cursor-free-vip)

## 高级应用场景

### 代码转换与迁移

- 框架迁移：如Vue2到Vue3、AngularJS到Angular
- 语言转换：如JavaScript到TypeScript、Python2到Python3

### 架构重构与优化

- 单体应用拆分为微服务
- 前后端分离改造
- 性能瓶颈分析与优化

### 自动化测试生成

- 单元测试自动生成
- 集成测试场景设计
- 边界条件和异常场景测试

## 最佳实践总结

1. **明确需求，具体到字段**：提供详细需求说明，包括数据结构、业务规则和技术约束
2. **分模块开发**：将大项目拆分为可独立开发的模块，降低复杂度
3. **利用模板加速**：基于成熟架构模板和行业最佳实践，避免重复造轮子
4. **循序渐进**：先搭建MVP，再逐步迭代完善功能
5. **结合人工审核**：AI生成的代码需要人工审核，确保质量和安全性
6. **保持学习**：持续关注AI编程工具的新特性和最佳实践

## 资源推荐

### 学习资源
- [Cursor官方文档](https://cursor.sh/docs)
- [AI编程最佳实践](https://www.deeplearning.ai/short-courses/)
- [大模型应用开发指南](https://github.com/openai/openai-cookbook)

### 工具与插件
- [GitHub Copilot](https://github.com/features/copilot)
- [Tabnine](https://www.tabnine.com/)
- [Cursor](https://cursor.sh/)
- [Continue](https://continue.dev/)
- Cline 有完全免费的模型

## 后续学习路径

1. 大模型prompt工程进阶
2. AI辅助测试自动化
3. LLM应用开发实践
4. AI代码审查与安全分析

## 相关文章



### AI编程的新起点

> **编程的本质，不是在试卷上解算法题，而是在混沌中创造秩序。**
>
> DeepSeek R1

如果你和我一样，在尝试使用AI编程创造产品的话，应该也受够了最近各个大模型层次不穷的发布报告中的屁话。

因为从OpenAI o1开始，包括最近的DeepSeek R1、OpenAI o3，以及昨天马斯克xAI发布的Grok 3等模型，按Codeforces的评估标准，都是可以在国际编程竞赛拿金牌的水平，远超人类平均水平了。

![图片](/cursor_pratice.assets/640.jpeg)

但是在现实的软件工程中却不是那么回事。

真正用过Cursor AI编程的人都会能感觉到Claude 3.5 Sonnet才是最能打，写实际的软件代码最好的模型。没必要赶着去尝试最新的跑分厉害的模型，同时也不要选择任何更低价的“平替”模型，你选择AI编程工具时，首先需要决策和判断的因素就是他们有没有接入Claude 3.5 sonnet模型，这个模型是让AI编程能力跨过可用性临界点的本质。

但，虽然模型能力算是跨过了某个让普通人能够开始编程做小产品的临界点了，你在用的过程中还是会发生不少问题，有一些学习的障碍和门槛还是需要你跨过。

写代码5分钟，改bug两小时也是AI编程的常态了。

OpenAI最近也算是看到了这个问题，这个真正重要的问题，他们引入了一个新的评估LLMs在实际软件工程中的编程能力的评估标准——SWE-Lancer。

**新的起点**

这个评估集是他们从自由职业者的接单平台Upwork上选出来的。总共包括1488个价值100万美元的任务。

这些任务分为独立开发者任务（IC SWE）和技术管理任务（SWE Manager）。前者是去做代码修复与功能实现，后者是对于不同的任务进行方案决策。

- 独立开发者任务：从15分钟可修复的漏洞到耗时数周的新功能需求。与依赖单元测试的传统基准不同，SWE-Lancer使用专业工程师设计的端到端测试（通过浏览器自动化验证应用行为），并经过三重质量验证。
- 技术管理任务：模型需评审自由职业者提交的竞争性提案并选择最佳方案，最终评估标准与原始工程管理者的决策一致。此类任务需深入理解问题及提案的技术细节，常需结合整个代码库的上下文进行判断。

从开发类型来说有分为客户端应用（前端）逻辑、用户界面/用户体验、服务端逻辑三类，还有个所谓的系统级质量与可靠性任务，但是这个样本量太少了，参考价值不大。

![图片](/cursor_pratice.assets/640-174009833272837.png)

这次评估对OpenAI来说可以说是自揭底裤，赶把这样的真实数据在论文中放出来还是挺值得钦佩的。

> 当问题复杂到需要权衡商业、人性与技术时，AI依然是幼儿园级别的选手。
>
> 就像自动驾驶至今无法处理中国式过马路，AI编程也看不懂老板那句：「这个需求很简单，怎么实现我不管」。
>
> DeepSeek R1

OpenAI这次评估是选择了GPT-4o、o1、Claude 3.5 Sonnet三个模型做测试对比（很奇怪他们为什么不把o3加上），得到的核心结论还挺有趣的，而且可能有些反常识：

1、Claude 3.5 Sonnet依然是最佳的现实世界软件工程的编程模型选择，能完成大约40%的任务；

2、大模型在技术管理任务（SWE Manager）的成功率明显优于独立开发者任务（IC SWE），所以这是说技术管理者更容易被AI替代？

3、AI在服务端逻辑类任务上的成功率优于前端任何和UI/UX任务（尽管一般人现在会判断AI编程更适合用来写前端代码）。

| **任务类型**      | **技术焦点**       | **典型问题**                 | **模型难点**                 | **通过率对比**    |
| :---------------- | :----------------- | :--------------------------- | :--------------------------- | :---------------- |
| 客户端应用逻辑    | 前端状态与事件处理 | API重复调用、权限显示不同步  | 跨组件状态同步               | 独立任务：23.9% ✅ |
| 用户界面/用户体验 | 视觉与交互设计     | 布局错位、动效卡顿           | 多设备适配、视觉一致性       | 独立任务：31.7% 🟡 |
| 服务端逻辑        | 后端业务与数据处理 | 数据库性能瓶颈、接口并发错误 | 技术债务权衡、系统级影响评估 | 管理任务：61.5% 🔄 |

下面有个更细致的表格，Diamond代表OpenAI精选的500多个任务，full表示的是全部1488个任务的表现，其实看full就可以了。Claude 3.5 sonnet基本上都在全面碾压性领先。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**所以呢？**

所以，这篇论文的发布对我们普通人来说有什么价值。

第一点，我其实是期望帮你认识到，现在AI编程的最佳模型选择依然是Claude 3.5 sonnet，所以如果你希望现在开始构建自己的产品的话，前往不要选歪了。而如果你关注的AI博主里有一些看见任何模型出来都要疯狂推荐，以及对着他们的benchmark打分就下判断的，我建议你可以慎重考虑下是不是值得关注。你应该尝试去选择值得你信任的信息降噪器。现在AI媒体和AI自媒体都太多，你需要更少，而不是更多的信息。

第二点，在论文中，OpenAI提到了几项细节其实值得我们关注。比如同样的o1，如果它用了更多的reasoning时间，或者多次尝试的话，任务成功率是可以显著提高的。所以你可以在一些复杂任务上让AI为你多尝试几次，有时候用不同的模型尝试解bug也会是比较好的选择。

以及我们看到LLM在做技术管理者，在评估和选择方案上是更擅长的，所以在一些困难时刻，你可以让LLM变身技术管理者去选择方案，我在一个bug多次无法解决时会尝试的prompt是：

> 现在我们遇到了{描述遇到问题的功能}问题，我在界面上看到的情况是{描述你看到的界面信息}，终端遇到的问题是{复制代码报错}，和这个功能相关的代码是{@代码文件}。现在，请一步步思考和理解我描述的问题，并提出三个最solid的解决方案，不要急着改代码。

这个prompt的特点是为模型提供了充分的上下文信息，引导模型进入了系统二的深思熟虑模式，同时，他也从一个执行者变成了选择不同技术方案的管理者，会拥有更全局性的视角帮助你解决问题。

第三点的话，我觉得我们现在可以等一等，并期待两个月内更好的编程模型产生。因为coding问题确实是经济价值极高（想想程序员工资有多贵吧）且一定程度上可解的问题。尤其是我们可以期待DeepSeek和Anthropic的新模型。

下面是我昨天看到DeepSeek发布了NSA新论文时做的判断：

*预测下，DeepSeek下一波可能会发个Coding模型，两个月内。*

*推测逻辑：*

*1、DeepSeek今天新发出的论文主要在谈降低长文本索引的成本的，可以大致判断下个模型可能会去优化上下文的长度，现在DeepSeek R1和V3的128K或64K实在不够看，而目前长上下文最有价值的场景便是Coding；*

*2、DeepSeek去年发过专门的Coding模型，在这上是有野心和积累的，在发布当时的表现应该仅次于Claude；*

*3、在发布R1的论文里，DeepSeek特意提到了现在R1在Coding的benchmark上分数很高，很擅长做竞赛题，但在解决现实中的coding问题时表现比较一般，所以这也算个线索；*

*4、V3对标GPT-4o，R1对标o1，而Claude 3.5 Sonnet至今还是实际编程表现最好的模型，这不合理，该挑战一下了。*

*所以预计短期内就会有Claude 4和更好的DeepSeek V3 coder出来，AI编程赛道还能出现更有趣的事。*

[原文链接](https://mp.weixin.qq.com/s/dmSY3QKZDn3EawFpsUPRjQ)
