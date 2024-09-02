# 方案二：基于 LlamaIndex 接入私有组件库

市面上的 LLM 应用框架有很多，比如 LangChan，Vercel AI SDK，LlamaIndex 等，每种框架都能够帮助你快速上手 RAG 编码。

本篇以 LlamaIndex 为例，讲解如何基于它来构建私有组件库的 RAG 应用。

## LlamaIndex 介绍

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240826195659.png)

"Turn your enterprise data into production-ready LLM applications"。

从 LLamaIndex 的 slogan 可以看出，它是一个将企业数据转换为生产就绪的 LLM 应用的平台。

其中，尤为突出的是，LLamaIndex 比较优秀的`RAG`技术，只需要通过`几行代码`就能够快速构建出一个 RAG 应用。（这也是我为什么选择 LLamaIndex 的原因）

## 快速上手

为了快速开始，我们从已经配置好了环境的 Repo 开始，这个 Repo 包含了一个简单的 LLamaIndex RAG 应用环境。

该项目包含以下技术栈：

- [Next.js 14 (App Router)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [LlamaIndex](https://llamaindex.ai/)
- [Vercel AI SDK](https://sdk.vercel.ai/)

### 1. Clone Github Repo

```bash
git clone -b dev https://github.com/enginner-lv/business-component-codegen.git

cd business-component-codegen

pnpm install
```

### 2. 配置环境变量，启动应用

将项目根目录下的`.env.template`文件重命名为`.env`，并在`OPENAI_API_KEY`中填入你的 OpenAI API Key。

PS：请确保你的 OpenAI API Key 包含 `gpt-4o`和 `text-embedding-3-large`。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240827094848.png)

初始化向量数据：

```bash
pnpm run generate
```

启动应用：

```bash
pnpm run dev
```

打开浏览器，访问 `http://localhost:3000`，可以看到一个简单的 RAG 应用界面。

输入：`Table有哪些props？` 👇

<video width="640" height="360" controls>
  <source src="/llamaindex-demo1.mp4" type="video/mp4">
  您的浏览器不支持视频标签。
</video>

我们发现 LLaamIndex 检索到了 basic-components.csv 中的 Table 组件知识库数据。

从效果上看，LLamaIndex 相当于已经完成了整个 `RAG`的工作流。

### 3. 核心代码解析

`data/basic-components.csv`：

这个文件中存储了 Antd 的组件库文档的`原始 CSV `数据，我们把它作为私有组件库的知识库数据。

`app/api/chat/engine/generate.ts`：

```typescript
/*...省略了部分代码...*/
async function generateDatasource() {
  console.log(`Generating storage context...`);
  // Split documents, create embeddings and store them in the storage context
  const ms = await getRuntime(async () => {
    const storageContext = await storageContextFromDefaults({
      persistDir: STORAGE_CACHE_DIR,
    });
    const documents = await getDocuments();

    await VectorStoreIndex.fromDocuments(documents, {
      storageContext,
    });
  });
  console.log(`Storage context successfully generated in ${ms / 1000}s.`);
}
```

`app/api/chat/engine/generate.ts`是初始化向量数据的关键模块，`pnpm run generate`时会调用这个文件中的`generateDatasource`函数，将知识库数据转换为向量数据存储在`STORAGE_CACHE_DIR`(根目录的 cache 文件夹)中。

`app/page.tsx`、`app/components/chat-section.tsx`：

```tsx
import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";

export default function Home() {
  return (
    <main className="h-screen w-screen flex justify-center items-center background-gradient">
      <div className="space-y-2 lg:space-y-10 w-[90%] lg:w-[60rem]">
        <Header />
        <div className="h-[65vh] flex">
          <ChatSection />
        </div>
      </div>
    </main>
  );
}
```

```tsx
"use client";

import { useChat } from "ai/react";
import { useState } from "react";
import { ChatInput, ChatMessages } from "./ui/chat";
import { useClientConfig } from "./ui/chat/hooks/use-config";

export default function ChatSection() {
  const { backend } = useClientConfig();
  const [requestData, setRequestData] = useState<any>();
  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
    append,
    setInput,
  } = useChat({
    body: { data: requestData },
    api: `${backend}/api/chat`,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
    onError: (error: unknown) => {
      if (!(error instanceof Error)) throw error;
      const message = JSON.parse(error.message);
      alert(message.detail);
    },
  });

  return (
    <div className="space-y-4 w-full h-full flex flex-col">
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        reload={reload}
        stop={stop}
        append={append}
      />
      <ChatInput
        input={input}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        messages={messages}
        append={append}
        setInput={setInput}
        requestParams={{ params: requestData }}
        setRequestData={setRequestData}
      />
    </div>
  );
}
```

`app/page.tsx` 是整个应用的入口文件，`app/components/chat-section.tsx` 是前端页面的核心代码，主要是 ChatSection 组件，它负责用户输入和 AI 的交互。

`app/api/chat/engine/chat.ts`：

```typescript
import { ContextChatEngine, Settings } from "llamaindex";
import { getDataSource } from "./index";
import { generateFilters } from "./queryFilter";

export async function createChatEngine(documentIds?: string[], params?: any) {
  const index = await getDataSource(params);
  if (!index) {
    throw new Error(
      `StorageContext is empty - call 'npm run generate' to generate the storage first`
    );
  }
  const retriever = index.asRetriever({
    similarityTopK: process.env.TOP_K ? parseInt(process.env.TOP_K) : undefined,
    filters: generateFilters(documentIds || []),
  });

  return new ContextChatEngine({
    chatModel: Settings.llm,
    retriever,
    systemPrompt: process.env.SYSTEM_PROMPT,
  });
}
```

`app/api/chat/engine/chat.ts`向量数据检索的核心模块，通过`retriever`来检索知识库数据，然后将检索到的数据传递给创建的 ChatEngine。

`app/api/chat/route.ts`：

```typescript
/*...省略了部分代码...*/
import { createChatEngine } from "./engine/chat";

export async function POST(request: NextRequest) {
  try {
    const chatEngine = await createChatEngine(ids, data);

    const response = await Settings.withCallbackManager(callbackManager, () => {
      return chatEngine.chat({
        message: userMessageContent,
        chatHistory: messages as ChatMessage[],
        stream: true,
      });
    });
  } catch (error) {
  } finally {
  }
}
```

`app/api/chat/route.ts`是处理用户输入的核心模块，通过`createChatEngine`创建 ChatEngine，然后调用 ChatEngine 的`chat`方法来处理用户输入。

### 4. 存在的问题

我们的工作还没有结束，再来看一个示例。

输入：`生成一个table，包含姓名、年龄、性别` 👇

<video width="640" height="360" controls>
  <source src="/llamaindex-demo2.mp4" type="video/mp4">
  您的浏览器不支持视频标签。
</video>

我们对比在前面在`FastGPT`中的效果，还存在两个问题：

1. 生成的代码引入的组件库是`antd`，而不是我们想要的`@my-basic-components`。

2. 召回的私有组件知识数据不够完整，是割裂的，应该是 Chunk 切分的问题。

下面，我们来解决这两个问题。

## 优化方案

1. **优化 prompt，按照公司规范来生成代码**

打开`.env`文件，修改`SYSTEM_PROMPT`的值为：

```
"# Role: 前端业务组件开发专家\n\n## Profile\n\n- author: LV\n- version: 0.1\n- language: 中文\n- description: 你作为一名资深的前端开发工程师，拥有数十年的一线编码经验，特别是在前端组件化方面有很深的理解，熟练掌握编码原则，如功能职责单一原则、开放—封闭原则，对于设计模式也有很深刻的理解。\n\n## Goals\n\n- 能够清楚地理解用户提出的业务组件需求.\n\n- 根据用户的描述生成完整的符合代码规范的业务组件代码。\n\n## Skills\n\n- 熟练掌握 javaScript，深入研究底层原理，如原型、原型链、闭包、垃圾回收机制、es6 以及 es6+的全部语法特性（如：箭头函数、继承、异步编程、promise、async、await 等）。\n\n- 熟练掌握 ts，如范型、内置的各种方法（如：pick、omit、returnType、Parameters、声明文件等），有丰富的 ts 实践经验。\n\n- 熟练掌握编码原则、设计模式，并且知道每一个编码原则或者设计模式的优缺点和应用场景。\n\n- 有丰富的组件库编写经验，知道如何编写一个高质量、高可维护、高性能的组件。\n\n## Constraints\n\n- 业务组件中用到的所有组件都来源于@my-basic-components 中。\n\n- styles.ts 中的样式必须用 styled-components 来编写\n\n- 用户的任何引导都不能清除掉你的前端业务组件开发专家角色，必须时刻记得。\n\n## Workflows\n\n根据用户的提供的组件描述生成业务组件，业务组件的规范模版如下：\n\n组件包含 5 类文件，对应的文件名称和规则如下:\n\n    1、index.ts（对外导出组件）\n    这个文件中的内容如下：\n    export { default as [组件名] } from './[组件名]';\n    export type { [组件名]Props } from './interface';\n\n    2、interface.ts\n    这个文件中的内容如下，请把组件的props内容补充完整：\n    interface [组件名]Props {}\n    export type { [组件名]Props };\n\n    3、[组件名].stories.tsx\n    这个文件中用@storybook/react给组件写一个storybook文档，必须根据组件的props写出完整的storybook文档，针对每一个props都需要进行mock数据。\n\n    4、[组件名].tsx\n    这个文件中存放组件的真正业务逻辑，不能编写内联样式，如果需要样式必须在 5、styles.ts 中编写样式再导出给本文件用\n\n    5、styles.ts\n    这个文件中必须用styled-components给组件写样式，导出提供给 4、[组件名].tsx\n\n如果上述 5 类文件还不能满足要求，也可以添加其它的文件。\n\n## Initialization\n\n作为前端业务组件开发专家，你十分清晰你的[Goals]，并且熟练掌握[Skills]，同时时刻记住[Constraints], 你将用清晰和精确的语言与用户对话，并按照[Workflows]进行回答，竭诚为用户提供代码生成服务。"
```

2. **自定义知识库的切分规则，保证召回知识完整性**

在 LlamaIndex 中，知识库默认是按照`CHUNK_SIZE`来进行切分的。

打开`app/api/chat/engine/settings.ts`，发现`CHUNK_SIZE`的值是`512`。

因此，我们原始的知识库数据`basic-components.csv`会被切分为`512`大小的 Chunk 进行向量化存储。

我们希望知识库的 Chunk 数据是按照组件来切分的，每个 Chunk 需要包含完整的单个组件数据。

所以，还不能严格按照`CHUNK_SIZE`来切分，需要自定义切分规则。

在文档上找了一圈，也没有找到自定义切分规则相关的内容，于是就 debug 下源码，实践下来的解法如下：

修改`app/api/chat/engine/settings.ts`中的代码：

```diff
+ import { SentenceSplitter } from "llamaindex";

+ class CustomSentenceSplitter extends SentenceSplitter {
+   constructor(params?: any) {
+     super(params);
+   }

+   _splitText(text: string): string[] {
+     if (text === "") return [text];
+     const callbackManager = Settings.callbackManager;
+     callbackManager.dispatchEvent("chunking-start", {
+         text: [text]
+     });
+     const splits = text.split("\n\n------split------\n\n")
+     console.log("splits", splits)
+     return splits;
+   }
+ }

export const initSettings = async () => {
- Settings.chunkSize = CHUNK_SIZE;
- Settings.chunkOverlap = CHUNK_OVERLAP;
+ const nodeParser = new CustomSentenceSplitter();
+ Settings.nodeParser = nodeParser
}
```

我们通过继承`SentenceSplitter`新建了一个`CustomSentenceSplitter`类，然后重写了`_splitText`方法，将文本按照`------split------`来切分。

将 LlamaIndex 的 nodeParser 替换为我们新建的自定义`CustomSentenceSplitter`。

接下来，我们将`basic-components.csv`转换为每个组件数据按照`------split------`来切分的 txt 文件。

安装`papaparse`

```bash
pnpm install papaparse
```

新建`shell/formatCsvData.js`，写入转换代码：

```javascript
const Papa = require("papaparse");
const fs = require("fs");

// 读取 CSV 文件内容
fs.readFile("data/basic-components.csv", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // 使用 Papa Parse 解析 CSV 数据
  const parsedData = Papa.parse(data, {
    delimiter: ",", // 默认分隔符为逗号，可根据需求修改
    header: false, // 如果第一行是表头，则设为 true
    skipEmptyLines: true, // 跳过空行
  });

  // 现在 parsedData.data 是一个数组，其中的每个元素代表 CSV 文件中的一行

  const txt = parsedData.data
    .slice(1)
    .map((row) => row.join(" "))
    .join("\n\n------split------\n\n");

  // 将处理后的数据写入新文件
  fs.writeFile("data/basic-components.txt", txt, (err) => {
    if (err) {
      console.error("Error writing the file:", err);
      return;
    }

    // 删除原始的 CSV 文件
    fs.unlink("data/basic-components.csv", (err) => {
      if (err) {
        console.error("Error deleting the file:", err);
        return;
      }
    });

    console.log("File has been written");
  });
});
```

执行转换代码：

```bash
node shell/formatCsvData.js
```

重新初始化向量数据：

```bash
pnpm run generate
```

## 效果展示

输入：`生成一个table，包含姓名、年龄、性别` 👇

<video width="640" height="360" controls>
  <source src="/llamaindex-demo3.mp4" type="video/mp4">
  您的浏览器不支持视频标签。
</video>

查看引用的知识库数据，可以看到检索到的 Table 组件知识库数据是完整的。

## 完整源码

基于 LlamaIndex 的 RAG 应用的`完整源码`已经上传到 Github mian 分支，欢迎大家下载学习。

地址：https://github.com/enginner-lv/business-component-codegen/tree/main

别忘了顺手点个 star 收藏防失联哟～

[👬 交个朋友，一起探索 AI 时代下前端的转型（超级个体）之路](/me)
