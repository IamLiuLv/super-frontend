# 集成公司私有组件库生成代码

现代化前端的开发体系下，组件化是大家公认的的开发模式，随着前端项目的不断迭代，沉淀的公共私有组件也会越来越多。

因此，基于私有组件来生成代码，是一个非常重要的需求。

本篇，我们分享一些使用 [LV0](http://lv0.chat) 来基于公司私有组件库来生成代码的案例。

## 案例

**案例 1**：`生成一个 button 组件，展示不同 props 组合的 demo`

Copilot 根据用户的输入，分析并从私有组件库中提取所需要的 Button 组件。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729112829.png)

汇总需求，点击开始生成代码。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729112954.png)

生成代码如下，Button 组件来源于私有组件库，通过预览可以看到不同 props 组合的 demo。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729113131.png)

**案例 2**：`生成一个 TodoList 组件`

Copilot 分析出生成一个 TodoList 所需要的私有组件，同时还给出一些提示建议。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729114024.png)

提出把 List 换成 Table。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729114102.png)

汇总需求，点击开始生成代码。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729114124.png)

生成的代码全部来源于公司的私有组件，预览效果也正常。 👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729114249.png)

**案例 3**：`生成图片中的组件`

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729144733.png)

Copilot 根据图片，分析出所需要的私有组件。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729144716.png)

汇总需求，点击开始生成代码。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729144758.png)

生成的代码和预览效果如下 👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729150832.png)

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729150756.png)

::: warning 注意
整体的还原度 80%左右，主要原因：受限于 LLM 的多模态识图能力，因此需要用户针对代码进行一些迭代调整。
:::

**案例 4**：`生成一个贪吃蛇游戏`

Copilot 根据用户的输入，分析并从私有组件库中提取所需要的组件。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729142430.png)

根据 Copilot 的建议，添加了一个`Typography`组件来展示分数。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729142531.png)

汇总需求，点击开始生成代码。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729142635.png)

生成的代码和预览效果如下 👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729143318.png)

---

如上案例仅提供演示价值，实际使用中，可以根据具体的业务需求来生成代码。

了解 LV0 的更多使用方式，可以查看[循序渐进式代码生成](/guide/advanced-improvement/ai-product/step-by-step)、[聊天式代码生成](/guide/advanced-improvement/ai-product/chat-style)

## 总结

如上，我们在 LV0 中使用了公司私有组件库来生成代码，现阶段在 LV0 中是通过配置文件来实现的。👇

![](https://lvjishupai.oss-cn-beijing.aliyuncs.com/20240729100009.png)

后续 LV0 中会开放可视化的配置方式，让所有用户更方便的使用公司私有组件库来生成代码。

::: tip 学习更多
关于基于公司私有组件生成代码的实现原理，可以点击[这里](/guide/advanced-improvement/private-components/analysis-solutions)查看。
:::

下一篇，我们分享将 LV0 集成到 Vscode 中，让开发者更方便的沉浸式使用 LV0 来生成代码。

[👬 交个朋友，一起探索 AI 时代下前端的转型（超级个体）之路](/me)
