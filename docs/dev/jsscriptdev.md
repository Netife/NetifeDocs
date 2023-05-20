# 概述

JS 脚本可以用于自定义请求，常用于修改请求和回复。

## 注册清单

和插件类似，脚本也有相同的依赖规则，如果不清楚可以去查看插件前面的章节。

其中，hookUrls 为自定义的拦截器，`regex`为正则表达式，匹配 API 终结点，exportFunctionName 为对应的函数名

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

## 编写脚本

脚本也被称为 HookUrl 的执行器，用于处理请求。脚本的函数签名是确定的，如下：

```js
(callback, request) => { //参数需要保持一致
        //request是序列化之后的对象
        var response = {
            "UUID":"uuid", //需要和request的UUID保持一致
            "DstIpAddr":"22", //重定向Ip
            "DstIpPort":"80", //重定向端口
            "ResponseText":"editedAny" //修改Raw Text
        }
        callback(null, response); //前面是错误的执行结果，后面是修改后给出的response
}
```

函数的传入参数，和结束语句是确定的，也就是你必须具有`(callback, request)`的签名和`callback(null, response)`的回调。

在一个JS脚本中，以导出的方式对应声明：

```js
module.exports = {
    "emgEdit":(callback, request) => { //参数需要保持一致
        //request是序列化之后的对象
        var response = {
            "UUID":"uuid", //需要和request的UUID保持一致
            "DstIpAddr":"22", //重定向Ip
            "DstIpPort":"80", //重定向端口
            "ResponseText":"editedAny" //修改Raw Text
        }
        callback(null, response); //前面是错误的执行结果，后面是修改后给出的response
    }
}
```

因此，`emgEdit`这个 HookUrl 便和函数绑定了。

## 导出命令

同样的，JS 脚本也可以提供命令，这个命令会被注册进入 Netife 的函数库，供其他插件调用，其中也可以包含C++等跨语言插件。

其函数原型和拦截器一样，只不过`request`为命令参数组成的 JSON 文本。