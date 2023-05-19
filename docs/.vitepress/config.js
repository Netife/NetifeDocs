module.exports = {
  title: 'Netife官方文档',
  description: 'Netife官方文档，提供Netife使用、开发等教程',
  base: "/NetifeDocs/",
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: "首页", link: "/" }, 
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/Netife/NetifeDocs" }],
    footer: {
      message: "Released under the GPLV3 License.",
      copyright: "Copyright © 2023",
    },
    // 配置从导航栏进去后的侧边栏
    sidebar: {
      "/dev/": [
        {
          text:'开发',
          items: [
            { text: "插件开发", link: "/dev/plugins/" },
          ],
        },
      ],
    },
  },
}