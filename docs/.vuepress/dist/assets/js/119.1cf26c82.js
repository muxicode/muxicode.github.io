(window.webpackJsonp=window.webpackJsonp||[]).push([[119],{405:function(_,t,v){"use strict";v.r(t);var a=v(14),r=Object(a.a)({},(function(){var _=this,t=_._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("h1",{attrs:{id:"服务异常重启分析及定位"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#服务异常重启分析及定位"}},[_._v("#")]),_._v(" 服务异常重启分析及定位")]),_._v(" "),t("p",[_._v("在一个平平无奇的一天，收到通知，你们的后端服务总是重启，具体是什么原因呢？")]),_._v(" "),t("p",[_._v("我。。。 怎么知道。。。")]),_._v(" "),t("h2",{attrs:{id:"异常退出有哪些原因"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#异常退出有哪些原因"}},[_._v("#")]),_._v(" 异常退出有哪些原因？")]),_._v(" "),t("ul",[t("li",[t("p",[_._v("平台问题（我不管，都是平台的锅，和我没关系）")])]),_._v(" "),t("li",[t("p",[_._v("人为误操作（我不管，肯定是运维瞎操作，乱重启）")])]),_._v(" "),t("li",[t("p",[_._v("程序有bug，导致异常退出，容器重启")])]),_._v(" "),t("li",[t("p",[_._v("内存占用过大，被系统杀死，容器重启")])])]),_._v(" "),t("h2",{attrs:{id:"容器监控的数据"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#容器监控的数据"}},[_._v("#")]),_._v(" 容器监控的数据")]),_._v(" "),t("p",[t("img",{attrs:{src:"/actual_3_restart.assets/pprof_prod_1.drawio.png",alt:""}})]),_._v(" "),t("p",[_._v("我们可以看到这些指标")]),_._v(" "),t("ul",[t("li",[_._v("30天容器重启的次数")]),_._v(" "),t("li",[_._v("十分钟内容器重启的次数")]),_._v(" "),t("li",[_._v("内存使用")]),_._v(" "),t("li",[_._v("内存使用率")])]),_._v(" "),t("p",[_._v("通过上图的一些趋势，我们可以大致知道，应该是内存泄漏，因为我们可以看到每次容器重启数据变化的时刻都对应这内存使用率达到百分之百后。")]),_._v(" "),t("h2",{attrs:{id:"如何定位以及预防"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#如何定位以及预防"}},[_._v("#")]),_._v(" 如何定位以及预防？")]),_._v(" "),t("p",[_._v("该问题出现在产线环境，在产线环境上，有着诸多的不便，比如：")]),_._v(" "),t("ul",[t("li",[_._v("急于获取异常信息，但是很多权限需要打开，流程麻烦")]),_._v(" "),t("li",[_._v("运维侧没有配置日志的持久化盘")]),_._v(" "),t("li",[_._v("相关数据库并不能直接访问")])]),_._v(" "),t("p",[_._v("针对这些问题可以用以下一些方式：")]),_._v(" "),t("ul",[t("li",[_._v("使用日志中心，将日志上报，方便直接查看日志定位")]),_._v(" "),t("li",[_._v("做panic日志持久化，有一些程序bug直接导致程序崩溃，日志中捕捉不到")]),_._v(" "),t("li",[_._v("涉及相关数据操作出现问题的，将尽量将整个数据记录日志")]),_._v(" "),t("li",[_._v("使用实时的监控工具，与程序一同部署（注意安全及性能问题）")])]),_._v(" "),t("h2",{attrs:{id:"使用pprof定位"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用pprof定位"}},[_._v("#")]),_._v(" 使用"),t("code",[_._v("pprof")]),_._v("定位")]),_._v(" "),t("p",[_._v("在我们的应用中我们直接开启监控工具，并部署到环境中，参考"),t("a",{attrs:{href:""}},[_._v("gin开启pprof")])]),_._v(" "),t("h3",{attrs:{id:"初步定位"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#初步定位"}},[_._v("#")]),_._v(" 初步定位")]),_._v(" "),t("p",[_._v("访问我们部署了监控工具的路由"),t("code",[_._v("https://www.xxx.com/debug/pprof/")]),_._v("，我们可以得到如下视图：")]),_._v(" "),t("p",[t("img",{attrs:{src:"/actual_3_restart.assets/pprof_prod_2.drawio.png",alt:""}})]),_._v(" "),t("p",[_._v("我们可以发现，协程的数量特别多，随着时间的加长，一直在上升，可以怀疑，有可能是协程泄漏，导致的问题。")]),_._v(" "),t("p",[_._v("点击后面的链接，可以看到涉及协程阻塞的位置，数量还有堆栈信息，如下：")]),_._v(" "),t("p",[t("img",{attrs:{src:"/actual_3_restart.assets/pprof_prod_3.drawio.png",alt:""}})]),_._v(" "),t("p",[_._v("我们可以看到阻塞在了"),t("code",[_._v("redis")]),_._v("包下的"),t("code",[_._v("reaper")]),_._v("这个方法中，具体我们的代码位置，我们可以到包中搜索，也可以使用命令行查看。由于命令行查看的一些环境配置并不统一，以下不做展示，直接到我们的包中查看，我们搜索的时候需要指定对应的包。")]),_._v(" "),t("p",[_._v("我们可以找到启动协程位置如下：")]),_._v(" "),t("p",[t("img",{attrs:{src:"/actual_3_restart.assets/pprof_prod_4.drawio.png",alt:""}})]),_._v(" "),t("p",[_._v("代码阻塞的位置如下：")]),_._v(" "),t("p",[t("img",{attrs:{src:"/actual_3_restart.assets/pprof_prod_5.drawio.png",alt:""}})]),_._v(" "),t("p",[_._v("我们可以大概猜到，问题应该出现连接池中定时检测的代码上，此时已经定位到了代码位置。对于如何解决，需要继续的进行定位，查看为何回启动这么多的协程不释放呢？")]),_._v(" "),t("p",[_._v("需要确定是")]),_._v(" "),t("ul",[t("li",[_._v("我们业务代码的问题")]),_._v(" "),t("li",[_._v("还是第三方工具包的问题")])]),_._v(" "),t("p",[_._v("对于这个问题我们可以直接使用web页面查看下，协程监控的图。")]),_._v(" "),t("h3",{attrs:{id:"web页面"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#web页面"}},[_._v("#")]),_._v(" web页面")]),_._v(" "),t("ol",[t("li",[t("p",[_._v("执行命令"),t("code",[_._v("go tool pprof -http=localhost:8080 https://www.xxx.com/debug/pprof/goroutine")]),_._v("可以看到协程的调用信息，数量和占比")])]),_._v(" "),t("li",[t("p",[_._v("访问本地"),t("code",[_._v("localhost:8080")]),_._v("，可以看到如下界面：")]),_._v(" "),t("p",[t("img",{attrs:{src:"/actual_3_restart.assets/pprof_prod_6.drawio.png",alt:""}})])]),_._v(" "),t("li",[t("p",[_._v("还可以配合堆的监控视图，查看堆栈有没有相关函数的调用信息，从而确认问题代码的入口。执行启动web相关堆栈的视图命令："),t("code",[_._v("go tool pprof -http=localhost:8080 https://www.xxx.com/debug/pprof/heap")])])]),_._v(" "),t("li",[t("p",[_._v("访问本地"),t("code",[_._v("localhost:8080")]),_._v("，可以看到如下界面："),t("img",{attrs:{src:"/actual_3_restart.assets/pprof_prod_7.drawio.png",alt:""}})])])]),_._v(" "),t("p",[_._v("经过两个视图的确认，可以更方便的我们查看业务代码，查看具体的原因。")]),_._v(" "),t("h2",{attrs:{id:"解决问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#解决问题"}},[_._v("#")]),_._v(" 解决问题")]),_._v(" "),t("ul",[t("li",[_._v("经过对代码的确认可以知道，是底层"),t("code",[_._v("redis")]),_._v("库出现了问题。此时我们需要去查看以下使用文档，发现与文档一致，并非使用问题。")]),_._v(" "),t("li",[_._v("由于是第三方工具包的问题，可以尝试升级版本，看看问题是否得到解决")]),_._v(" "),t("li",[_._v("查看工具包社区中是否有人也遇到同样的问题")])]),_._v(" "),t("p",[_._v("经过以上步骤，果断选择升级第三方驱动，并在环境上验证。")]),_._v(" "),t("blockquote",[t("p",[_._v("环境验证")]),_._v(" "),t("ul",[t("li",[_._v("保证与产线配置一样")]),_._v(" "),t("li",[_._v("模拟产线调用，使用中间件，模拟高频的接口访问")])])]),_._v(" "),t("p",[_._v("升级第三方包后，使用工具继续监控一段时间，经过监控我们发现，问题得到解决。")]),_._v(" "),t("p",[t("img",{attrs:{src:"/actual_3_restart.assets/pprof_prod_8.drawio.png",alt:""}})])])}),[],!1,null,null,null);t.default=r.exports}}]);