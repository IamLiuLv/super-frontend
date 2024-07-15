import { defineConfig, type DefaultTheme } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AI赋能前端研发从0～1",
  description:
    "体系化整理自AI爆发以来，如何将AI从0～1融入前端研发工作流的探索历程。",
  head: [["link", { rel: "icon", href: "/logo.svg" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    sidebar: {
      "/guide/": { base: "/guide/", items: sidebarGuide() },
      "/me": { base: "/guide/", items: sidebarGuide() },
    },

    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
      text: "为该文档提供修改建议",
    },

    footer: {
      copyright: `版权所有 © 2024-${new Date().getFullYear()} lv`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",

    socialLinks: [
      // TODO:
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "指南",
      link: "/guide/preface/intro",
      activeMatch: "/guide/",
    },
    {
      text: "🙋交个朋友",
      link: "/me/",
      activeMatch: "/me",
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "前言",
      // link: "/preface",
      collapsed: false,
      base: "/guide/preface",
      items: [
        { text: "小册介绍", link: "/intro" },
        { text: "核心理论", link: "/core-theory" },
        { text: "章节说明", link: "/chapter-guide" },
      ],
    },
    {
      text: "探索与入门",
      // link: "/getting-started",
      base: "/guide/getting-started",
      collapsed: false,
      items: [
        {
          text: "市场调研与全流程分析",
          link: "/market-research",
        },
        {
          text: "整洁的业务组件架构",
          link: "/clean-architecture",
        },
        {
          text: "初步探索AI生成业务组件",
          link: "/ai-exploration",
        },
        {
          text: "做一个生成业务组件的AI助手",
          link: "/ai-assistant",
        },
      ],
    },
    {
      text: "进阶提升",
      // link: "/advanced-improvement",
      base: "/guide/advanced-improvement",
      collapsed: false,
      items: [
        {
          text: "开发一个专门生成业务组件的AI产品",
          // link: "/advanced-improvement/ai-product",
          base: "/guide/advanced-improvement/ai-product",
          // collapsed: false,
          items: [
            {
              text: "产品定位、五大功能、两大核心能力",
              link: "/product-features",
            },
            {
              text: "「循序渐进式」代码生成",
              link: "/step-by-step",
            },
            {
              text: "「聊天式」代码生成",
              link: "/chat-style",
            },
            {
              text: "集成公司私有组件库生成代码",
              link: "/private-integration",
            },
            {
              text: "集成到VsCode IDE生成代码",
              link: "/vscode-integration",
            },
          ],
        },
        {
          text: "如何基于公司私有组件库生成业务组件",
          // link: "/advanced-improvement/private-components",
          base: "/guide/advanced-improvement/private-components",
          // collapsed: false,
          items: [
            {
              text: "问题分析与解决方案",
              link: "/analysis-solutions",
            },
            {
              text: "认知 RAG：打造垂直领域的私有 AI 知识库",
              link: "/understand-rag",
            },
            {
              text: "三种接入私有组件库的方案",
              // link: "/advanced-improvement/private-components/integration-solutions",
              base: "/guide/advanced-improvement/private-components/integration-solutions",
              // collapsed: false,
              items: [
                {
                  text: "方案一：基于开源知识库平台接入私有组件库",
                  link: "/solution-1",
                },
                {
                  text: "方案二：基于 LlamaIndex 接入私有组件库",
                  link: "/solution-2",
                },
                {
                  text: "方案三：自定义 Agent 接入私有组件库",
                  link: "/solution-3",
                },
              ],
            },
          ],
        },
        {
          text: "集成 AI 到 IDE，打造沉浸式编码工作流",
          // link: "/advanced-improvement/integration-ide",
          base: "/guide/advanced-improvement/integration-ide",
          // collapsed: false,
          items: [
            {
              text: "Github Copilot",
              // link: "/advanced-improvement/integration-ide/github-copilot",
              base: "/guide/advanced-improvement/integration-ide/github-copilot",
              // collapsed: false,
              items: [
                {
                  text: "产品定位",
                  link: "/product-positioning",
                },
                {
                  text: "通用技能",
                  link: "/general-skills",
                },
                {
                  text: "组合神技",
                  link: "/combo-techniques",
                },
                {
                  text: "最佳实践案例",
                  link: "/best-practices",
                },
              ],
            },
            {
              text: "自定义 Copilot",
              // link: "/advanced-improvement/integration-ide/custom-copilot",
              base: "/guide/advanced-improvement/integration-ide/custom-copilot",
              // collapsed: false,
              items: [
                {
                  text: "Continue ---- 自定义 Copilot 神器",
                  link: "/continue-custom-copilot",
                },
                {
                  text: "自定义 Command",
                  link: "/custom-command",
                },
                {
                  text: "自定义 Context",
                  link: "/custom-context",
                },
                {
                  text: "自定义 Agent",
                  link: "/custom-agent",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      text: "案例剖析与实践",
      // link: "/case-analysis",
      base: "/guide/case-analysis",
      collapsed: false,
      items: [
        {
          text: "开发一个功能全流程案例",
          link: "/feature-development",
        },
        {
          text: "开发一个项目全流程案例",
          link: "/project-development",
        },
      ],
    },
  ];
}
