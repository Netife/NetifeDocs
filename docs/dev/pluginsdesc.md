# 概述

插件描述清单的定位是对插件的内部结构进行描述，如描述注册的插件实例、命令和插件的相关信息等等。

以下仅为示例，相关信息会在插件开发的过程中介绍。

# C++插件描述示例
```json
{
  "name":"Music163SongDownload",
  "clsid":"6966d3e8-c14b-4485-bd91-bd97d85002e1",
  "author":"EpicMo",
  "version":"1.0.0",
  "exportWay":"cpp",
  "description":"本插件提供网易云音乐服务。",
  "coreRelative":"v1",
  "exportCommand":"Netife.CppExport()",
  "exportClassName":"CloudMusic",
  "relativeChains":[
    {
      "name":"NetifePluginLib",
      "version":"^1.0.0"
    }
  ],
  "registerCommand":[
    {
      "class":"CloudMusic",
      "command":"getLastDownloadUrl",
      "description":"返回最近的歌曲下载链接"
    }
  ],
  "registerHook":[]
}
```

# Json插件描述示例

```json
{
    "name":"DemoScript",
    "clsid":"7d6d690f-9bc8-4556-84b6-de78cda25ca0",
    "author":"EpicMo",
    "version":"1.0.0",
    "description":"This is a demo js description",
    "coreRelative":"v1",
    "relativeChains":[
    ],
    "hookUrls":[
        {
            "regex":".*emg.epicmo.cn.*",
            "exportFunctionName":"emgEdit"
        }
    ],
    "exportCommand":[
        {
            "command":"calcMusic163Sign [s1] [s2] <s3>",
            "description":"Calc Music163 Request Sign",
            "exportFunctionName":"music163hook"
        }
    ]
}
```