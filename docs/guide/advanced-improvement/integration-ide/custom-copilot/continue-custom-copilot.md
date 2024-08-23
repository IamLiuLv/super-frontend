# Continue --- 自定义 Copilot 神器

在说 Continue 之前，我们先来聊下 Github Copilot。

Github Copilot，The world’s most widely adopted AI developer tool.（世界上使用最广泛的 AI 开发工具）

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240328075147.png)

不是官方吹牛，毕竟很多程序员也都觉得这是一款“真正意义上”能提效的 AI 产品。

我作为 GitHub Copilot 的深度用户，也深有体会，有两点感受特别明显：

1、全程陪伴，安全感满满（见下图，这篇文章，也是在它的陪伴下写出来的～）

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240617214144.png)

2、从此成为了注释、回车、Tab 工程师（如下，简单示例）

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240617215039.png)

我承认，我已经离不开它了。

作为一个通用的 AI 辅助开发工具，Github Copilot 的确已经做得很好了。

但是，我的欲望远不止于此。

我想要一个更强大的 Copilot，一个能够结合业务、深入场景来**客制化自定义**的 Copilot。

比如能够调度任意 LLM Model、选择任意上下文代码、封装任意 prompt 命令、甚至自定义 Agent 工作流的 Copilot。

下面，开始介绍 Continue，玩转自定义 Copilot。

## Continue 介绍

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240617221659.png)

**项目地址：**<https://github.com/continuedev/continue>

**Slogan：** Open-source autopilot - build your own AI software development system（开源自动驾驶 - 构建您自己的 AI 软件开发系统）

**一句话介绍：** Continue enables you to create your own AI code assistant inside your IDE. Keep your developers in flow with open-source VS Code and JetBrains extensions that can be connected to any model, any context, and anything else you need.（Continue 使您能够在 IDE 中创建自己的 AI 代码助手。使用可以连接到任何模型、任何上下文和任何其他您需要的内容的开源 VS Code 和 JetBrains 扩展）

**安装：** 直接在 VS Code 插件市场搜索`Continue`，安装即可，后续步骤 Continue 插件会有使用引导。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240617222335.png)

## 基础功能

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

**小案例：**

**Coding 时，用最好的 LLM 沉浸式查阅资料**

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240607100544.png)

**基于 IDE 的任意上下文沉浸式生成代码**

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240607172510.png)

下面介绍一下 Continue 的**高级功能**，也是我认为最有价值的地方：

## 高级功能

**调度任意 LLM Model**

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618085630.png)

如上，几乎所有主流的 LLM 都支持，包括商业的以及开源的。

你可以随意更换其他 LLM Model，比如 gpt-4o、claude-3-opus、llama3 系列等。

比如很多公司对于信息安全有要求，不允许使用 Github Copilot，那么可以选择 Continue + Ollama 搭建私有化本地 Copilot。

**选择任意上下文**

可以选择任意上下文代码，比如选择任意文件、任意函数、任意类。

跟 GitHub Copilot 不同，Continue 能够直观地感受到你所选择的上下文。

比如，我要迭代某个 react 组件，加一个 title props：

组件的目录机构如下：

```
StorybookExample
├── index.ts
├── interface.ts
├── StorybookExample.stories.tsx
├── StorybookExample.tsx
└── styles.less
```

如下，直接把`StorybookExample.tsx`和`interface.ts`添加到上下文（ 选中代码，cmd+L (MacOS) / ctrl+L (Windows)），再输入需求：

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618092836.png)

上面只是一个简单的例子，在复杂场景下，你可以组装多个代码片段，文件、或者文件夹，来生成更复杂的代码。

**自定义任意命令**

通过自定义命令，可以将一些常用的操作，抽象封装为快捷的命令，方便使用。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618093331.png)

如上，你可以通过斜杠命令，来执行一些自定义的操作，比如：share、cmd、commit 等。如下图：

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618093552.png)

详见：<https://docs.continue.dev/customization/slash-commands>

如何自定义命令？

方式一：基于`~/.continue/config.json`配置文件自定义命令。

例子：比如我想新增一个`storybook`命令，用于生成 Storybook 文档的代码：

打开`~/.continue/config.json`文件，添加如下配置：

```json
{
  "customCommands": [
    {
      "name": "storybook",
      "prompt": "{{{ input }}}\n\n 请基于这份interface帮我生成一份业务组件的storybook文档。要求如下：\n\n- 组件的每一个props都需要提供数据\n\n- storybook中使用@storybook/react进行文档的生成\n\n- 绝对不能回答跟storybook文档生成不相关的内容\n\n- 不需要安装任何包，直接生成stories文件即可",
      "description": "基于interface生成storybook文档"
    }
  ]
}
```

使用：选择 interface.ts 文件，输入`/storybook`命令：

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618094606.png)

方式二：基于`~/.continue/config.ts`配置文件自定义命令。

例子：比如我想新增一个`commit`命令，用于生成 commit message：（此例子引用 Continue 官方）

打开`~/.continue/config.ts`文件，添加如下配置：

```ts
export function modifyConfig(config: Config): Config {
  config.slashCommands?.push({
    name: "commit",
    description: "Write a commit message",
    run: async function* (sdk) {
      const diff = await sdk.ide.getDiff();
      for await (const message of sdk.llm.streamComplete(
        `${diff}\n\nWrite a commit message for the above changes. Use no more than 20 tokens to give a brief description in the imperative mood (e.g. 'Add feature' not 'Added feature'):`,
        {
          maxTokens: 20,
        }
      )) {
        yield message;
      }
    },
  });
  return config;
}
```

如上，区别于方式一，方式二是通过`modifyConfig`函数来自定义命令。

好处是可以更加灵活的控制命令的逻辑，比如上面的例子，通过`getDiff`方法获取当前文件的 diff，然后通过`streamComplete`方法来生成 commit message。

还可以执行任意 Node.js 代码，比如调用外部接口、读取文件等。

使用方式一样：输入`/commit`命令：

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618100818.png)

**自定义任意 Context Providers**

Context Providers，故名思义，就是提供上下文的服务。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618101428.png)

如上，你可以通过 @ 操作符，来选择任意的 Context Providers 来提供不同的上下文。

比如，我可以通过`@file`来选择文件作为上下文：

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618101949.png)

比如，我可以通过`@Docs`来选择文档作为上下文：

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618102214.png)

如何自定义 Context Providers？

**示例：** 通过自定义 Context Providers，来实现一个 RAG 上下文提供程序。（此例子引用 Continue 官方）

1. **创建 RagContextProvider**:

定义一个自定义的上下文提供程序，该提供程序将查询发送到内部服务器，并从向量数据库中获取结果。

~/.continue/config.ts 文件：

```typescript
const RagContextProvider: CustomContextProvider = {
  title: "rag",
  displayTitle: "RAG",
  description:
    "Retrieve snippets from our vector database of internal documents",
  getContextItems: async (
    query: string,
    extras: ContextProviderExtras
  ): Promise<ContextItem[]> => {
    const response = await fetch("https://internal_rag_server.com/retrieve", {
      method: "POST",
      body: JSON.stringify({ query }),
    });
    const results = await response.json();
    return results.map((result) => ({
      name: result.title,
      description: result.title,
      content: result.contents,
    }));
  },
};
```

2. **修改配置文件**:

在 `config.ts` 中添加 `RagContextProvider` 以使其生效。

~/.continue/config.ts;

```typescript
export function modifyConfig(config: Config): Config {
  if (!config.contextProviders) {
    config.contextProviders = [];
  }
  config.contextProviders.push(RagContextProvider);
  return config;
}
```

思考一下 Context Providers 在前端研发的应用场景：

比如：通过 Context Providers，可以提供公司内部的文档、组件库、代码库等作为上下文，来生成符合公司规范的代码。

**基于 Model Provider 接入 Agent**

Model Provider：顾名思义，就是模型提供者。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618190412.png)

官方支持多种 Model Provider，包括 OpenAI、EleutherAI、Hugging Face 等。

详见：https://docs.continue.dev/reference/Model%20Providers/openai

在 Continue 中，我们可以在每次使用时选择 Model Provider，来调度不同的 LLM Model。（如下）

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240619074537.png)

Agent：代理、智能体。

广义上的简单理解：能够代替你处理某个场景下某个问题的智能 AI 应用。

在 Continue 中，我们可以通过 Model Provider 来接入你的 Agent。

比如：我想要一个能够结合公司私有组件库来生成业务组件的 Agent。

**1、开发 Agent**

如下图，生成业务组件的 Agent 所需要做的事情：

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618183150.png)

本篇假设私有组件库是：@mui/x-tree-view。

如下，现有的 LLM 不包含最新的@mui/x-tree-view 知识，所以生成的代码是错误的。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240619072444.png)

于是，我们开发一个 Agent 能够召回最新的 @mui/x-tree-view 组件知识来生成代码。

本篇我们不深入讲解 Agent 的开发，后续会有专门的文章，来介绍如何开发一个**基于私有组件生成业务组件的 Agent，并接入 Continue。**

**2、接入 Model Provider**

假设我们的 Agent 已经开发完成，能够通过对外的接口来调用。

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

使用 Agent：

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240618190053.png)

如上，我们选择了`Mui Business Component Agent`作为 Model Provider，输入需求，即可生成正确的业务组件代码。

后续篇章，我们继续探索 Copilot、Agent 的更多玩法～

[👬 交个朋友，一起探索 AI 时代下前端的转型（超级个体）之路](/me)
