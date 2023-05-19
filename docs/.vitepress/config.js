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
          text:'插件构成',
          items: [
            { text: "插件实现", link: "/dev/pluginsimpl.md" },
          ],
        },
      ],
    },
  },
}