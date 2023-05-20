# 概述

本教程旨在告诉你如何开发 C++ 插件。

# C++ 插件体开发

## 前置需求

C++插件开发需要有`Poco`作为前置依赖库，我们推荐通过`vcpkg`来管理你的依赖包。

### 安装Vcpkg作为包管理器

首先，你需要安装 Vcpkg 作为你的包管理器，你可以在[vcpkg](https://github.com/microsoft/vcpkg)的官方仓库中找到具体的安装说明。

### 安装前置依赖库

```bash
vcpkg install poco:x64-windows
```
此命令会安装 x64 版本的 poco 库，如果你是 32 位计算机，可以更改为 `x86-windows`。

### （可选）声明环境变量

在 Clion 等非 VS 的 ide 开发时，你可能需要声明你的包路径到 Path 环境变量中。

```bash
vcpkg integrate install
```

如果你发现你无法找到包，你可能还需要配置你的环境变量，在 Path 变量中添加你安装的 Poco 的 Bin 路径。这个目录通常在 Vcpkg 的 packages 的对应 Poco 目录中可以找到。

## 拉取 C++ 插件开发模板

使用 Git 拉取[C++插件模板)](https://github.com/Netife/NetifeCppPluginTemplateV1)：

```
git clone git@github.com:Netife/NetifeCppPluginTemplateV1.git
```

然后基于此目录创建你的工程文件。

::: tip
在C++模板中，远程库以 origin 的别名存储，如果你需要使用 Git 托管你的代码，你可能需要删除原有的 origin 远程库
:::

## 编写插件体代码

在插件模板中，`DemoClass`为示例的插件体代码，你可以看到它是一个`NetifePlugins`的子类，你可以在 API 文档中，或者根据模板的注释来开发你的插件。

## 导出类

在插件中，如果你想要你的插件被 Netife 框架识别，你需要导出类，在 `DemoClass`的 CPP 文件中给出了具体导出类的方法：

```c++
POCO_BEGIN_MANIFEST(NetifePlugins)
        POCO_EXPORT_CLASS(DemoClass)
POCO_END_MANIFEST
```

你只需要更改 `DemoClass` 为你的类名称即可

## 为插件加载做出额外操作

在导出类之后，可以添加函数，在加载前和卸载前进行一些操作。

```
void pocoInitializeLibrary()
{

}
void pocoUninitializeLibrary()
{

}
```

::: tip
这与 Netife 框架提供的加载事件不同，这些函数在 Netife 插件框架接触到插件体前或者后调用，Netife 框架无法感知他们的存在，因此不建议在这些函数中做过多的业务处理。一个好的实践是完全不使用他们，因为你甚至无法在这个阶段使用 Netife 提供的 AgentApi 来反调用框架的 Api，这意味着你的日志输出甚至都无法接入框架。
:::

## 编译插件

请以**SHARED**的方式编译插件，在插件模板中已经提供了对应的 CMAKELISTS 文化。

::: warning
如果你使用的是 Clion，你可能需要将 CMAKE 的解释器等换成 VS 的，并且将 Vcpkg 以工具链的形式添加到 CMake 执行参数。
:::

## 编写 Json 文件

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
  "relativeChains":[],
  "registerCommand":[],
  "registerHook":[]
}
```

这个为一个示例的插件模板，以下是基本的介绍：
你需要为插件提供一些基本的信息，其中：
- clsid：为UUID，你需要提供一个随机生成的 UUID 作为插件的标识符
- version：格式为 A.B.C
- exportWay：为 `cpp` ，因为你是在 `cpp` 中编写插件的
- coreRelative：`v1` ，这个依赖于你插件开发依赖的框架 API 版本，本教程使用的是 Netife Interface V1，这取决于具体的插件和 API 版本
- exportCommand：为固定值，不用更改，表示以 `Netife.CppExport()` 的抽象函数加载插件
- exportClassName：为需要被加载的插件的类名，以`;`的方式分割

## 依赖链

### 依赖链介绍

在 C++ 插件中，你可能会使用 AgentApi 去调用其他的插件暴露的命令，这引入了对于其他插件的依赖，因此你可能需要确保其他插件的版本在一个固定的范围，以保证插件调用其他命令的返回值稳定性。

```json
  "relativeChains":[
    {
      "name":"NetifePluginLib",
      "version":"^1.0.0"
    }
  ]
```

例如，在这个地方声明了对于 `NetifePluginLib` 的依赖，其版本需要大于等于 1.0.0

::: tip
依赖插件如果不存在，那么本插件也不会加载。注意的是，`NetifePluginLib`为 Netife 内置插件，不需要用户手动下载。但是我们也建议你添加这个依赖以防止出现用户删除了这个插件的意外情况。
:::

### 依赖链编写规则

其中，依赖链的表达式如下：

- `|`：和，表示取并
- `>`：大于，表示大于某个版本
- `<`：小于，表示小于某个版本
- `^`：大于等于，表示大于等于某个版本
- `~`：小于等于，表示小于等于某个版本

例如：`^1.0.0|<1.2.0`表示的是：大于等于1.0.0版本，并小于1.2.0版本

## 导出命令

```json
  "registerCommand":[
    {
      "class":"myHelloClass",
      "command":"sayHello [content] <prefix>",
      "description":"输出 Hello"
    }
  ]
```

导出命令的意思是导出某个类的某个命令，例如上述为描述 `myHelloClass`的`sayHello`命令。

其中，命令的调用会传入插件的`DispatchCommand`函数中，并由开发者自己处理或者分发到子函数。

对于命令参数的描述，有两种方式：

- `[variable]`：必选参数
- `<variable>`：可选参数

当必选参数不存在时，插件不会接受到命令调用。当可选参数为空是，插件会接收到可选参数的调用。

命令的传递是通过`map<string,optinal<string>>`进行传递，也就是可选参数不存在时，值为`optnull`。

::: warning
为避免歧义，可选参数只能出现在必选参数之后。
:::

# 插件 Hook 开发

