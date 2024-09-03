# 产品源起、定位、5 大功能、2 大核心能力

从本篇开始，我们开始进入`《AI 赋能前端研发从 0 ～ 1》`小册的`进阶提升`系列。

作为这个系列的开篇，我想先分享一款自研的 AI 产品 --- [LV0](http://lv0.chat)，因为这款产品也是我在探索 AI 赋能前端研发的过程中，一些想法的实践和落地。

:::tip PS
如果放在 [AI 赋能前端金字塔](/guide/preface/core-theory)体系中，LV0 目前阶段主要定位在`业务组件`的研发环节。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722151841.png)
:::

## 产品源起

### 遇到的问题

在[探索与入门/做一个生成业务组件的 AI 助手](/guide/getting-started/ai-assistant)中，我们在文末提出了`2个问题`:

1、无法实时预览代码生成的效果，需要在 `AI 助手 ==> 编辑器 ==> 运行效果 ==> AI 助手` 间来回交互验证 AI 生成的代码，比较繁琐。

2、无法基于公司私有组件库来生成代码，相当于无法生成满足公司定制规范的代码出来。

基于以上问题，我开始进行市场调研，看市面上是否有满足我诉求的产品。

### 市场调研

针对第 1 个问题：`实时预览代码效果`，倒是发现了有挺多类似的产品，比如：[v0.dev](https://v0.dev)、[ScreenshotToCode](https://github.com/abi/screenshot-to-code)

第一个问题看来可以解决了，于是我也参考市面上已有的项目，LV0 的第一版就这么出来了。

但是针对第二个问题，我在市面上没有找到满意的答案。

于是，我开始着手`自己来解决这个问题`（现在 LV0 支持了可以 `基于任意开源、闭源组件库生成代码`）。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240718071915.png)

### 面临的转型

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240121192558.png)

上面的这个话题在 AI 时代尤为突出，经常在各种帖子上刷到：`前端要无了`。

`如果站在整个 GUI 和前端岗位的视角来看`：前端岗`不可能`无了，除非 GUI 也无了。

::: tip 关于 AI 时代的 GUI
假设 AI 的能力足够强，所有的互联网的产品形态都已经 AI 化，没那么多复杂的 GUI，大家都适应了产品信息形态就是简单的语音文字音视频，那前端的概念和价值或许就真的淡化了。
:::

`如果站在前端人员技能的角度来看`：AI 时代，很多老技能很大可能性`已经过时了`，比如说：大家都在用 AI 、用 Copilot 生成代码，如果你还只会手撸代码，那你的竞争力就会大打折扣。

这一点也很容易理解，技术的世界更新迭代本就很迅速，AI 就是这新一波更新迭代的导火索（只是这一波覆盖的范围有点大），懂 AI 的前端势必会有更大的`职场竞争力`。

`如果站在职业规划的角度来看`：AI 带火了`超级个体`、`一人公司`，简单来说：在各种 AI 工具的助力下，各种岗位的门槛都在降低，一个人甚至可以完成一个公司很多岗位的工作。

---

::: tip 总结
综上 `遇到的问题、市场调研、面临的转型`这三个原因，我开始着手研发 LV0 这款产品，希望能够解决目前`遇到的问题`，同时还能够在`面临转型`的 AI 时代下，助力部分前端人员的转型（超级个体）之路。
:::

接下来简单介绍一下 LV0 产品。

## LV0 产品定位

`产品定位`：LV0 是一个 AI 驱动的前端代码生成平台，能够基于任意开源和私有组件库生成代码，帮助您快速生成和编辑前端 UI/代码。

`产品愿景`：助力部分前端转型，成为 AI 时代的超级个体，一个人可以搞定 UI 设计、前端研发。

## 5 大功能

LV0 的 5 大功能融合了现有市面上同类产品的各大优势，同时在这个基础上还做了一些升级。

### 功能 1：自然语言生成代码

通过一段大白话描述你的需求，即可产出符合你需求的前端代码出来，相当改变了我们现有的一个开发模式，我把这种方式叫做“聊天式编程”。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722090114.png)

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722090155.png)

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722090255.png)

LV0 中还提供了一个 Copilot，你可以直接和 Copilot 对话，Copilot 会实时给你提供建议，辅助你更好地描述自己的想法，最终汇总整个对话生成代码。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722090730.png)

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722090810.png)

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722090917.png)

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722090934.png)

Copilot 汇总整个的聊天记录，开始生成代码。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722091028.png)

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722091210.png)

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722092733.png)

### 功能 2：截图生成代码

得益于 LLM 的多模态识图能力，如果针对需求你有可以参考的设计图，那可以通过 LV0 将设计图转换为前端代码。 👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722094130.png)

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722094204.png)

### 功能 3：原型设计生成代码

同样得益于 LLM 的多模态识图能力，如果你比较擅长通过图形来表达自己的想法，那可以把你的需求画一个草图，LV0 可以将你的草图转换为前端代码。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722102029.png)

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722102048.png)

### 功能 4：代码持续迭代

在 LV0 中生成的所有代码都有版本记录，你可以回溯到任意一次 AI 生成的代码，基于当前版本的代码进行持续迭代生成。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722102403.png)

如上例子，持续迭代 4 次，最终符合期望的需求。

### 功能 5：在线微调

由于编程这件事情的容错率比较低，加上现阶段的大模型是具有迷惑性的，所以有些时候，仅仅通过自然语言，可能也无法达到预期的代码质量，因此 LV0 中提供了 IDE 代码在线微调，用来提升代码的可控性。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722102641.png)

## 2 大核心优势

### 优势 1：基于公司的私有组件库生成代码

不同的公司有不同业务需求和代码规范，就算没有自己来研发私有基础组件库，一般也会基于一些开源组件库来进行二次封装，然而大模型并不知道你所封装的基础组件，因此 LV0 的一个核心功能之一就是支持 AI 可以基于公司私有组件库生成代码。

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722102841.png)

### 优势 2：开放核心 api 能力

LV0 的核心能力是`基于任意开源或私有组件来生成代码`，我们也开放了整个核心 API 的能力，你可以将 LV0 开放的核心 API 接入自己的研发工作流中。

比如：接入到自己的 IDE 中，直接在 IDE 中沉浸式生成代码。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240722103211.png)

---

以上，简单介绍了一下 LV0 的一些功能特性，那如何来把它运用到实际研发中呢？

下一篇，我们通过一些具体的案例来了解一下：如何借助 LV0 循序渐进式生成前端代码，提效前端的业务组件研发。

[👬 交个朋友，一起探索 AI 时代下前端的转型（超级个体）之路](/me)
