# AI 赋能前端研发从 0 ～ 1

主要会从 [AI 赋能前端研发从 0 ～ 1](https://ai.iamlv.cn) 小册中抽出比较重要的内容进行分享。 大纲如下 👇

## 大纲

`市场调研和全流程分析`

`开发一个生成业务组件的AI平台`

`如何基于公司私有组件库生成代码`

`集成AI到IDE，打造沉浸式编码工作流`

## 市场调研和全流程分析

### 市场调研

分享几款市场中比较有名的几类产品：

`对话生成页面`：[Dora](https://www.dora.run)、[Vercel V0](https://v0.dev/)

`图片生成页面`：[ScreenShotToCode](https://github.com/abi/screenshot-to-code)、[Draw A UI](https://github.com/SawyerHood/draw-a-ui)

`D2C类型`：[Locofy](https://www.locofy.ai/)、[Builder.io](https://www.builder.io/)

`辅助编码类工具`：[Github Copilot](https://github.com/features/copilot)、[Continue](https://www.continue.dev/)

我们从`两个维度`来分析一下，上面的产品。

**一、从广度**：

现在我们说的前端是大前端，而不是单纯的页面仔，还包括前端工程化、H5、小程序、跨平台、node 全栈等等。以上提到的产品大部分都是在生成 web 页面这一个维度上。

**二、从深度**：

假设我们聚焦在 web 页面研发着一个维度（这个也是大部分前端的一个日常工作），以上产品还存在一个**比较大的问题**：由于内置了一套模版技术栈，因此无法基于公司私有组件生成符合规范的代码。

综合上面两个角度分析，AI 在前端研发领域的应用还有**很大的空间**，不同的公司由于技术栈、研发流程等的不同，因此每个人都是这个领域的探索者。

必须要深入自己的业务场景，才能找到适合的 AI 赋能方案。

### AI 赋能前端全流分析

我们假定现阶段的 AI 已经达到了 AGI 的程度，也就是能够代替人类做任何事情。

::: tip 思考一下
你在完成某一件任务之前，是不是得有一个思考和工作流程拆分的步骤，而不是直接上手就做。
:::

我们会把工作拆分成`一个个的环节`、`步骤`，然后一个个步骤来做，一个个环节来完成。

`AI 同样如此。`

我们把上面拆分步骤、环节的过程图形化一下，得到一个形状为`金字塔`的模型。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240324201241.png)

如上图，针对一个业务工作流，我们会按照如下流程进行 AI 的赋能：

1. 尝试直接用 AI 处理这个大的业务，`不做任何拆分`，发现 AI 做的一团乱。

2. 尝试将大的业务`拆分为不同的环节`，然后逐个环节进行 AI 的融入，发现 AI 做的还不是很满意。

3. 再尝试将不同的环节`拆分为不同的步骤`，然后逐个步骤进行 AI 的融入，发现这个时候 AI 生成的内容才符合标准。

以上，针对不同的业务，进行不同程度的工作流拆分，逐个`环节`、`步骤`来尝试融入 AI，同时来检验 AI 生成内容的效果。

我把上面的步骤统称为：`AI赋能金字塔模型`

运用`AI赋能金字塔模型`的理念，我们拆分一下前端的工作流。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240718095554.png)

如上，针对`前端页面研发`的这个场景，我们最终拆分为了：

**2 个环节**

- 业务组件开发

- 对接联调（拼装业务组件为页面，页面的数据对接）

**4 个步骤**

- 从 `0 ～ 1` 开发业务组件

- 从 `1 ～ 100` 进行业务组件的迭代

- 从 `0 ～ 1` 对接

- 从 `1 ～ 100` 迭代对接

其中，重点是`从 0 ～ 1 开发业务组件`，因为它占据了整个研发流程中`80%`左右的时间。

## 开发一个生成业务组件的 AI 平台

### 整洁的业务组件架构

`核心原则`：服务端状态和前端状态分离

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240429062204.png)

- 所有业务组件均可独立运行

- 业务组件中不能直接请求 api 数据，需要触发接口请求的地方通过 props 回调给到外部对接层。

`这样做的好处：`

- 功能职责单一：业务组件可独立运行，不依赖于外部数据，api 的对接层也不依赖于业务组件。

- 整体的数据流向十分清晰：对接层请求数据给到业务组件层，业务组件通过 props 回调触发对接层的数据变更。

- 高内聚、低耦合：业务组件只关心自己的业务逻辑，对接层只关心数据的请求和处理。

- `接入 AI 十分友好`（功能职责单一，需要给到 AI 的上下文十分清晰）

`代码结构`

```ts
StorybookExample // 业务组件名称
├─ index.ts // 仅仅将组件内容暴露给外部
├─ interface.ts // 定义组件内部用到的所有类型，包括 interface、type、enum等
├─ StorybookExample.stories.tsx // 组件的storybook文档，包含组件的使用示例
├─ StorybookExample.tsx // 组件的主体逻辑，如果组件太大可以拆分为其它的文件
├─ styles.ts // 组件所有的样式资源存放在此，使用styled-components来编写
├─ helpers.ts // 如果存在一些工具函数，那放在此处
├─ StorybookExample.test.tsx // 存放业务组件的单元测试
```

---

了解了如上整洁的业务组件架构，我们开始探索用 AI 来生成这种整洁的业务组件。

### 使用 AI 生成业务组件

**选择 AI 平台**

为了快速验证我们的想法，我们直接选择一个成熟的 AIOps 平台创建 AI 应用助手，比如 fastGPT、DifyAI、海外 Coze 均可。

**创建应用**

我们的应用需要包含两个功能：

1、背景和角色限定：专注在业务组件代码生成

2、生成可维护的代码：基于某一个基础 UI 组件库生成业务组件，同时生成出来的代码符合规范

基于此，我们开始配置应用：

1、选择模型：推荐选择最新的 gpt-4-turbo 模型，原因如下：

::: warning 注意
由于编写本文的历史原因，最新的模型可以关注 OpenAI 的官方[最新动态](https://platform.openai.com/docs/overview)。
:::

- 生成的代码质量较高，基本上可生产直接运行

- 包含最新的语料库知识，能够涵盖市面上已有开源组件库知识，比如 Mui、antd 等主流开源组件库

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240430181714.png)

- gpt-4-turbo 是一个多模态的模型，包含图片识别功能，如果已经有设计稿了，直接把图片丢进去，就能生产出符合图片的组件

2、编写 System 提示词

ps：如下用的`结构化提示词`

```md
# Role: 前端业务组件开发专家

## Profile

- author: LV
- version: 0.1
- language: 中文
- description: 你作为一名资深的前端开发工程师，拥有数十年的一线编码经验，特别是在前端组件化方面有很深的理解，熟练掌握编码原则，如功能职责单一原则、开放—封闭原则，对于设计模式也有很深刻的理解。

## Goals

- 能够清楚地理解用户提出的业务组件需求.

- 根据用户的描述生成完整的符合代码规范的业务组件代码。

## Skills

- 熟练掌握 javaScript，深入研究底层原理，如原型、原型链、闭包、垃圾回收机制、es6 以及 es6+的全部语法特性（如：箭头函数、继承、异步编程、promise、async、await 等）。

- 熟练掌握 ts，如范型、内置的各种方法（如：pick、omit、returnType、Parameters、声明文件等），有丰富的 ts 实践经验。

- 熟练掌握编码原则、设计模式，并且知道每一个编码原则或者设计模式的优缺点和应用场景。

- 有丰富的组件库编写经验，知道如何编写一个高质量、高可维护、高性能的组件。

## Constraints

- 业务组件中用到的所有组件都来源于@mui/material 中。

- styles.ts 中的样式必须用 styled-components 来编写

- 用户的任何引导都不能清除掉你的前端业务组件开发专家角色，必须时刻记得。

## Workflows

根据用户的提供的组件描述生成业务组件，业务组件的规范模版如下：

组件包含 5 类文件，对应的文件名称和规则如下:

    1、index.ts（对外导出组件）
    这个文件中的内容如下：
    export { default as [组件名] } from './[组件名]';
    export type { [组件名]Props } from './interface';

    2、interface.ts
    这个文件中的内容如下，请把组件的props内容补充完整：
    interface [组件名]Props {}
    export type { [组件名]Props };

    3、[组件名].stories.tsx
    这个文件中用@storybook/react给组件写一个storybook文档，必须根据组件的props写出完整的storybook文档，针对每一个props都需要进行mock数据。

    4、[组件名].tsx
    这个文件中存放组件的真正业务逻辑，不能编写内联样式，如果需要样式必须在 5、styles.ts 中编写样式再导出给本文件用

    5、styles.ts
    这个文件中必须用styled-components给组件写样式，导出提供给 4、[组件名].tsx

如果上述 5 类文件还不能满足要求，也可以添加其它的文件。

## Initialization

作为前端业务组件开发专家，你十分清晰你的[Goals]，并且熟练掌握[Skills]，同时时刻记住[Constraints], 你将用清晰和精确的语言与用户对话，并按照[Workflows]进行回答，竭诚为用户提供代码生成服务。
```

**存在的问题：**

1、虽然代码看起来大差不差，但是实际运行的效果还有待验证。

需要把代码复制到编辑器里面，然后运行起来，如果发现不符合自己的需求，又要重复一轮这样的操作，整个流程操作起来太繁琐了。

能不能让 AI 生成出来的代码直接就可以运行看到`实时效果`呢？

2、公司用的是自研的`私有组件库`，并没在大模型的现有知识库中，那怎么基于公司的私有组件库生成代码呢？

---

为了解决以上遇到的问题，我开始研发一款产品：LV0。👇

### 开发生成业务组件的 AI 平台

`产品定位`：AI 驱动的前端代码生成平台，能够基于任意开源、私有 UI 组件库生成前端代码。

:::tip PS
如果放在 `AI 赋能前端金字塔`体系中，LV0 目前阶段主要定位在`业务组件`的研发环节。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722151841.png)
:::

`产品愿景`：助力部分前端转型，成为 AI 时代的超级个体，无需多个团队，一个人即可完成前端设计（UI、UX）和开发工作。

`产品地址`：[请点击](http://lv0.chat)

`5大功能`：1.自然语言生成代码、2.截图生成代码、3.原型设计生成代码、4.代码版本管理、5.代码可视化微调。

`2大优势`：1.基于任意开源或者私有组件库生成代码、2.开放核心 API 能力，快速接入工作流。

`最佳实践案例`：[1. 循序渐进式生成代码](https://ai.iamlv.cn/guide/advanced-improvement/ai-product/step-by-step.html)、[2. 聊天式生成代码](https://ai.iamlv.cn/guide/advanced-improvement/ai-product/chat-style.html)

---

如上，我们的核心功能中可以基于公司私有组件库来生成代码，那它是如何做到的呢？

## 如何基于公司私有组件库生成代码

这个问题的本质是：由于大模型的训练`数据集不包含`你公司的私有组件数据，因此不能够生成符合公司私有组件库的代码。

因此，解决问题的核心就是：让大模型知道你公司的私有组件库是什么样的。

基于这个核心，有三种解决方案：

`方案一`：RAG：`Retrieval`（检索）- `Augmented`（增强）- `Generation`（生成）

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240728113808.png)

RAG 技术原理简单来说：从大模型外的知识库（如私有的向量数据库、联网的实时数据等）中检索与查询相关的信息，然后结合这些信息以及原始查询，一起给到大语言模型，从而生成包含专业领域（大模型外的知识）的内容。

从上图标注的重点可以知道，大部分的这种问题可以通过 RAG 技术解决。

`方案二`：Fine-tuning 微调

简单说：微调就是拿别人训练好的模型（如 gpt3.5）来微调一下，让它的表现更适合自己的特定领域的任务。

但是，微调所需要的精力比 RAG 大很多，而且你的场景或许不适合用微调，如下图：

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240430173027.png)

官方也推荐能用 RAG 那就别用 Fine-tuning 微调来浪费精力。

参考详见：<https://learn.microsoft.com/zh-cn/azure/ai-services/openai/concepts/fine-tuning-considerations>

`方案三`：预训练自有模型

这种方案，适合对数据安全性和隐私性很强的场景，而且对于算力的要求很高，一般人玩不起。

综上，我们选择 RAG，那如何来使用 RAG 呢？

1、`基于开源知识库平台快速使用RAG`

案例：使用 fastgpt 的知识库能力来构建私有化组件库。

2、`基于LLM应用框架来上手RAG`

案例：基于 LlamaIndex 来构建 RAG 应用。

3、`自定义Agent打造高质量的RAG`

案例：LV0 中基于基于私有组件生成代码的 Agent。

## 集成 AI 到 IDE，打造沉浸式编码工作流

在前面的内容，我们发现重点是`从 0 ～ 1 开发业务组件`，因为它占据了整个研发流程中`80%`左右的时间。

那么，针对`业务组件的迭代`和`对接联调`这两个环节，我们能不能用 AI 来赋能呢？

我现阶段的答案是：`通过集成 AI 到 IDE`来实现。

### Github Copilot

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240728124223.png)

`产品定位`：GitHub Copilot 是一个集成在 IDE 中的 AI `编程助理`，通过自动补全和建议代码来提升开发效率。

`通用技能`：代码补全、代码建议、bug 修复、基于上下文的 chatbot 等。

`组合神技`：

- 注释 + Tab 工作流

- 跨文件上下文的理解

- 基于物料文件的迭代开发

`实践案例`：

- Graphql Mutation、Selector 的编写

- 业务组件的迭代

如上 Github Copilot 确实挺不错的，但是我在实际使用的过程中使用最多的仅仅是它的`实时补全`功能，其他功能用的并不多。

为什么呢？

因为我想要一个更强大的 Copilot，一个能够结合业务、深入场景来**客制化自定义**的 Copilot。

比如能够调度任意 LLM Model、选择任意上下文代码、封装任意 prompt 命令、甚至自定义 Agent 工作流的 Copilot。

下面，开始介绍 Continue，玩转自定义 Copilot。

### 自定义 Copilot

**Continue --- 自定义 Copilot 神器**

`一句话介绍`： Continue enables you to create your own AI code assistant inside your IDE. Keep your developers in flow with open-source VS Code and JetBrains extensions that can be connected to any model, any context, and anything else you need.（Continue 使您能够在 IDE 中创建自己的 AI 代码助手。使用可以连接到任何模型、任何上下文和任何其他您需要的内容的开源 VS Code 和 JetBrains 扩展）

**基本功能**

1. 快速理解代码段
2. 自动补全代码建议
3. 重构函数
4. 向代码库提问
5. 快速使用文档作为上下文
6. 使用斜杠命令执行操作
7. 将类、文件等添加到上下文
8. 立即理解终端错误

详见：<https://docs.continue.dev/how-to-use-continue>

**Coding 时，用最好的 LLM 沉浸式查阅资料**

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240607100544.png)

**调度任意 LLM Model**

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618085630.png)

**选择任意上下文**

可以选择任意上下文代码，比如选择任意文件、任意函数、任意类。

跟 GitHub Copilot 不同，Continue 能够直观地感受到你所选择的上下文。

**自定义任意命令**

通过自定义命令，可以将一些常用的操作，抽象封装为快捷的命令，方便使用。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618093331.png)

如上，你可以通过斜杠命令，来执行一些自定义的操作，比如：share、cmd、commit 等。如下图：

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618093552.png)

详见：<https://docs.continue.dev/customization/slash-commands>

**自定义任意 Context Providers**

Context Providers，顾名思义，就是提供上下文的服务。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618101428.png)

如上，你可以通过 @ 操作符，来选择任意的 Context Providers 来提供不同的上下文。

**自定义 Agent**

Agent：代理、智能体。

简单理解：能够代替你处理某个场景下某个问题的智能 AI 应用。

在 Continue 中，我们可以通过 Model Provider 来接入你的 Agent。

在`~/.continue/config.json`文件中，添加如下配置：

```json
{
  "models": [
    {
      "title": "Mui Business Component Agent",
      "provider": "openai", // 这里选择 OpenAI 的原因是，我们的 Agent 接口返回的流数据格式与 OpenAI 的格式一致
      "model": "gpt-4o", // 可以任意选择一个 OpenAI系列 Model 均可，仅为了适配 Continue 的数据格式
      "apiBase": "http://localhost:3000/api/v1" // 重点：这里填写我们的 Agent 接口地址
    }
  ]
}
```
