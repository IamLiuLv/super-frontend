# 集成到 VSCode IDE 生成代码

上一篇，我们聊到了一些将公司私有组件库继承到 LV0 中生成代码的案例。

到这为止，我们从 0 ～ 1 生成业务组件的环节基本上可以用 LV0 来实现了。

回顾一下，本小册的核心理念：AI 赋能金字塔模型。👇

::: tip 前端 AI 赋能金字塔模型
![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240718095554.png)
:::

前面的篇章，我们重点放在`从 0 ～ 1 开发业务组件`的这个步骤，那业务组件`1~ 100`的迭代，以及后续的对接联调步骤，如何用 AI 来赋能呢？

我现阶段的答案是：`集成 AI 到 IDE 中`，程序员主导，AI 智能化辅助编码。

本篇，我们探讨将 LV0 集成到 Vscode 中，让开发者更方便的沉浸式使用 AI 来生成代码。

## 配置

### LV0 配置

LV0 现阶段默认已经开放了核心的 API 能力，可以通过 API 来调用 LV0 的代码生成能力。

API 调用方式如下 👇

1. Open API 路径：`https://lv0.chat/api/plugin/codegen/[your_codegen_type]/chat/completions`

2. 将`[your_codegen_type]`替换为你的代码生成类型，比如`antd`。

如何找 your_codegen_type？

- 打开 LV0 网站，选择你想要生成代码的 codegen 类型，比如`antd`。

- 然后查看 URL，URL 中的`codegen`后面的就是你的 codegen 类型。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240802101805.png)

3. 通过 API 调用 LV0 的代码生成能力。

curl 示例：

```bash
curl --location --request POST 'https://lv0.chat/api/plugin/codegen/antd/chat/completions' \
--header 'apiKey: sk-xxxx' \
# --header 'baseURL: https://api.openai.com/v1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "messages": [
        {
            "content": "hi",
            "role": "user"
        }
    ]
}'
```

如上，在 api 调用中，需要在 `header` 传入`apiKey`（必填）、`baseURL`（非必填）参数。

其中，`apiKey`是 OpenAI 的 API Key，`baseURL`默认是 OpenAI 的 API 地址（也可以自定义第三方中转服务）。

最终在终端执行 curl，反馈如下即成功 👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240802141405.png)

::: tip 后续会把 OpenAPI 的功能直接集成到 LV0 平台中，方便开发者使用。
:::

### Vscode Continue 配置

1. 打开 VSCode，安装`Continue`插件。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240802141616.png)

2. 打开`Continue`插件的配置文件`~/.continue/config.json`。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240802143002.png)

3. 在`config.json`中添加如下配置。

```json
{
  "models": [
    {
      "title": "LV0-Antd",
      "provider": "openai", // 这里选择 OpenAI 的原因是，我们的 Agent 接口返回的流数据格式与 OpenAI 的格式一致
      "model": "gpt-4o", // 可以任意选择一个 OpenAI系列 Model 均可，仅为了适配 Continue 的数据格式
      "contextLength": 128000,
      "apiBase": "https://lv0.chat/api/plugin/codegen/antd", // 重点：这里填写 LV0 开放的 OpenAPI 地址（不需要包含后面的/chat/completions）
      "completionOptions": {
        "maxTokens": 4096
      },
      "requestOptions": {
        "headers": {
          "apiKey": "sk-xxxx" // 这里填写 OpenAI 的 API Key
          // "apiBase": "https://api.openai.com/v1" // 这里填写 OpenAI 的 API 代理地址（非必填）
        }
      }
    }
  ]
}
```

4. 选择`LV0-Antd`模型，开始使用 AI 生成代码。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240802142755.png)

以上，我们配置已经把 LV0 集成到了 VSCode 中，可以通过 Continue 插件来调用 LV0 的代码生成能力。

下面，我们来看一些案例。

所有能在 LV0 网站上生成的代码，都可以在 VSCode 中生成（包括基于`私有组件库`生成代码）。

## 案例

**案例 1：**：`生成业务组件`

需求：`生成一个table组件，包含 name、age、address 三列`。

- LV0 插件会根据需求分析出来所需要的 Antd 基础组件 `Table`。

- LV0 插件根据分析出来的基础组件获取对应的知识 api 文档。

- 结合需求和知识开始调度代码生成工具来生成代码。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240802143452.png)

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240802144213.png)

**案例 2：**：`迭代业务组件`

需求：`Table组件帮我加上几列：性别、身高、体重`

- 将 Table 组件的代码快捷键直接引用到 Continue Chat 中，基于`LV0-Antd`模型，提供新的需求。

- LV0 插件会根据需求分析出来所需要的 Antd 基础组件 `Table`，继续使用 Table 组件的知识 api 文档。

- 根据新的需求，调度代码生成工具来生成代码。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240802144236.png)

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240802144301.png)

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240802144317.png)

---

如上，分享了一些集成 LV0 到 VSCode 的实践小案例。

其中`迭代业务组件`的案例，简单展示了`前端 AI 赋能金字塔模型`中`1~100`的迭代环节，如何用 AI 来赋能。

更多的 AI + IDE 案例，可关注这部分的专题分享。

::: tip 专题分享
关于如何集成 AI 到 IDE 中，打造沉浸式编码工作流，更多的内容[点击这里](/guide/advanced-improvement/integration-ide/custom-copilot/continue-custom-copilot)查看。
:::

[👬 交个朋友，一起探索 AI 时代下前端的转型（超级个体）之路](/me)
