module.exports = {
  title: 'Netife官方文档',
  description: 'Netife官方文档，提供Netife使用、开发等教程',
  base: "/NetifeDocs/",
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: "首页", link: "/" }, 
      { text: "开发", link: "/dev/" }, 
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/Netife" }],
    footer: {
      message: "Released under the GPLV3 License.",
      copyright: "Copyright © 2023",
    },
    sidebar: {
      "/dev/": [
        {
          text:'概述',
          link: "/dev/index.md"
        },
        {
          text:'插件构成',
          items: [
            { text: "插件实现", link: "/dev/pluginsimpl.md" },
            { text: "插件描述清单", link: "/dev/pluginsdesc.md" },
          ],
        },       
        {
          text:'插件开发',
          items: [
            { text: "c++插件开发  ", link: "/dev/cppplugindev.md" },
            { text: "js脚本开发", link: "/dev/jsscriptdev.md" },
          ],
        },
      ],
    },
  },
}