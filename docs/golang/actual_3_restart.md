---
title: 异常重启分析及定位
autoGroup-5: 实战
---

# 服务异常重启分析及定位

在一个平平无奇的一天，收到通知，你们的后端服务总是重启，具体是什么原因呢？

我。。。 怎么知道。。。

## 异常退出有哪些原因？

- 平台问题（我不管，都是平台的锅，和我没关系）
- 人为误操作（我不管，肯定是运维瞎操作，乱重启）

- 程序有bug，导致异常退出，容器重启
- 内存占用过大，被系统杀死，容器重启

## 容器监控的数据

![](/actual_3_restart.assets/pprof_prod_1.drawio.png)

我们可以看到这些指标

- 30天容器重启的次数
- 十分钟内容器重启的次数
- 内存使用
- 内存使用率

通过上图的一些趋势，我们可以大致知道，应该是内存泄漏，因为我们可以看到每次容器重启数据变化的时刻都对应这内存使用率达到百分之百后。

## 如何定位以及预防？

该问题出现在产线环境，在产线环境上，有着诸多的不便，比如：

- 急于获取异常信息，但是很多权限需要打开，流程麻烦
- 运维侧没有配置日志的持久化盘
- 相关数据库并不能直接访问

针对这些问题可以用以下一些方式：

- 使用日志中心，将日志上报，方便直接查看日志定位
- 做panic日志持久化，有一些程序bug直接导致程序崩溃，日志中捕捉不到
- 涉及相关数据操作出现问题的，将尽量将整个数据记录日志
- 使用实时的监控工具，与程序一同部署（注意安全及性能问题）

## 使用`pprof`定位

在我们的应用中我们直接开启监控工具，并部署到环境中，参考[gin开启pprof]()

### 初步定位

访问我们部署了监控工具的路由`https://www.xxx.com/debug/pprof/`，我们可以得到如下视图：

![](/actual_3_restart.assets/pprof_prod_2.drawio.png)

我们可以发现，协程的数量特别多，随着时间的加长，一直在上升，可以怀疑，有可能是协程泄漏，导致的问题。

点击后面的链接，可以看到涉及协程阻塞的位置，数量还有堆栈信息，如下：

![](/actual_3_restart.assets/pprof_prod_3.drawio.png)

我们可以看到阻塞在了`redis`包下的`reaper`这个方法中，具体我们的代码位置，我们可以到包中搜索，也可以使用命令行查看。由于命令行查看的一些环境配置并不统一，以下不做展示，直接到我们的包中查看，我们搜索的时候需要指定对应的包。

我们可以找到启动协程位置如下：

![](/actual_3_restart.assets/pprof_prod_4.drawio.png)

代码阻塞的位置如下：

![](/actual_3_restart.assets/pprof_prod_5.drawio.png)

我们可以大概猜到，问题应该出现连接池中定时检测的代码上，此时已经定位到了代码位置。对于如何解决，需要继续的进行定位，查看为何回启动这么多的协程不释放呢？

需要确定是

- 我们业务代码的问题
- 还是第三方工具包的问题

对于这个问题我们可以直接使用web页面查看下，协程监控的图。

### web页面

1. 执行命令`go tool pprof -http=localhost:8080 https://www.xxx.com/debug/pprof/goroutine`可以看到协程的调用信息，数量和占比

2. 访问本地`localhost:8080`，可以看到如下界面：

   ![](/actual_3_restart.assets/pprof_prod_6.drawio.png)

3. 还可以配合堆的监控视图，查看堆栈有没有相关函数的调用信息，从而确认问题代码的入口。执行启动web相关堆栈的视图命令：`go tool pprof -http=localhost:8080 https://www.xxx.com/debug/pprof/heap`

4. 访问本地`localhost:8080`，可以看到如下界面：![](/actual_3_restart.assets/pprof_prod_7.drawio.png)

   

经过两个视图的确认，可以更方便的我们查看业务代码，查看具体的原因。

## 解决问题

- 经过对代码的确认可以知道，是底层`redis`库出现了问题。此时我们需要去查看以下使用文档，发现与文档一致，并非使用问题。
- 由于是第三方工具包的问题，可以尝试升级版本，看看问题是否得到解决
- 查看工具包社区中是否有人也遇到同样的问题

经过以上步骤，果断选择升级第三方驱动，并在环境上验证。

> 环境验证
>
> - 保证与产线配置一样
> - 模拟产线调用，使用中间件，模拟高频的接口访问

升级第三方包后，使用工具继续监控一段时间，经过监控我们发现，问题得到解决。

![](/actual_3_restart.assets/pprof_prod_8.drawio.png)