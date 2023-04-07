---
title: UML
autoGroup-3: 常用工具
---

# UML-时序图

当我查看一些项目文档时，经常看到有些大佬做的时序图，如👇：

如此大作，真是思路清晰，让人叹为观止😱，让我对整体的调用都明朗了的图，这到底是怎么做出来的呢？要是我自己用画图软件，估计得画20分钟！

![](/uml.assets/uml时序图展示.drawio.png)

基于此，抱着学习的心态让我们一窥究竟，让我们也可以用该种技能提升我们的工作效率~

本文以具体的列子，作为导向，让你看起来不枯燥，看其中的例子，即可入手，如果需要深入学习，可以查看文章末尾的链接。

## 简介

先了解一下UML吧😊~ UML，Unified Modeling Language，统一建模语言，是一种开放的方法，用于说明、可视化、构建和编写一个正在开发的、面向对象的、软件密集系统的制品的开放方法。

## 初步探索

经过一番资料的搜索，这是基于 plant UML 画出的时序图。

Plant UML是一门类似于HTML的标记性语言，采用graphviz来渲染PlantUML，可集成在markdown。故而可以像维护代码一样维护 UML 图的历史版本，编写脚本就会自动生成UML图。用于会议讨论、流程设计、需求编写等环节。支持的工具集[tools](https://plantuml.com/zh/running)不要太多！同时提供在线版工具：[online-plantuml](http://www.plantuml.com/plantuml/uml/SyfFKj2rKt3CoKnELR1Io4ZDoSa70000)。

本文演示较常用的时序图的演示，如果达不到需求，可以参考[时序图](https://plantuml.com/zh/sequence-diagram)：

## 基础示例

![](/uml.assets/uml时序图展示.drawio.png)

UML 图所对应的 plant UML 的标记性语言，如👇：

```plant UML
@startuml
actor user
user -> web: 勾选数据并删除
web-> dataService: 批量删除
dataService -> dataService : 创建批量删除任务启动协程删除，返回任务号
dataService --> web: 收到任务号
web -> fileService: 查询进度
fileService-->web: 返回进度详情
web -> web:  展示进度
web --> user: 实时展示进度
@enduml
```

于是可以简单理解，画出该图，需要如下关键字

- actor    扮演
- user     小人
- ->          实线
- -->         虚线
- x -> y: 行为的解释

还有统一的 @startuml: 开始， @enduml 截至。其余的关键字多为系统实际的组件，或者模块。

## 循环

![](/uml.assets/plantUML循环.drawio.png)

对应plant UML，如👇：

```plant UML
@startuml
loop 总进度未完成
    bantchDeleteService -> fileService: 查询删除子进度详情
    bantchDeleteService -> bantchDeleteService: 根据子任务进度详情，更新任务进度
    bantchDeleteService --> fileService: 更新总进度
end
@enduml
```

## 标注

![](/uml.assets/标注.drawio.png)

对应plant UML，如👇：

```plant UML
@startuml
zhangsan -> lisi: 说了一句悄悄话
note right: 你真帅
zhangsan -> zhangsan: 小声嘀咕：差不多有我一半帅吧
lisi --> zhangsan: 谢谢你，真有你的~
@enduml
```

## 分割线

![](/uml.assets/分割线.drawio.png)

对应plant UML，如👇：

```
@startuml
muxi -> muxi: 填饱肚子
== 以下为具体填饱肚子的步骤 ==
muxi -> 厨具架: 请求水果刀
厨具架 -->muxi:返回水果刀
muxi -> 冰箱: 需要苹果
冰箱 --> muxi: 提供苹果
muxi -> muxi: 把苹果吃掉
@enduml
```

## 分支

![](/uml.assets/条件分支.drawio.png)

对应plant UML，如👇：

```
@startuml
muxi -> 户外细胞: 周末要去哪里玩？
alt 户外细胞活跃:
 户外细胞 --> muxi:去一个公园野餐
 else 户外细胞不活跃:
  户外细胞 --> muxi:躺在床上吧
end
muxi --> muxi: 还是躺床上香
@enduml
```

## 相关推荐

[程序员绘图工具-Plantuml](https://blog.csdn.net/AlbenXie/article/details/122048583)

