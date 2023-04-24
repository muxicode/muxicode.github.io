(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{342:function(a,s,t){"use strict";t.r(s);var r=t(14),n=Object(r.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"为什么是go"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#为什么是go"}},[a._v("#")]),a._v(" 为什么是GO？")]),a._v(" "),s("h2",{attrs:{id:"自身优势"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自身优势"}},[a._v("#")]),a._v(" 自身优势？")]),a._v(" "),s("h3",{attrs:{id:"c-c"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#c-c"}},[a._v("#")]),a._v(" C/C++")]),a._v(" "),s("ul",[s("li",[a._v("C 语言不是面向对象")]),a._v(" "),s("li",[a._v("直接编译为机器码，不需要执行环境")]),a._v(" "),s("li",[a._v("一次编码只能适用一种平台")]),a._v(" "),s("li",[a._v("自己处理GC问题")])]),a._v(" "),s("h3",{attrs:{id:"java"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#java"}},[a._v("#")]),a._v(" Java")]),a._v(" "),s("ul",[s("li",[a._v("编译为中间码（字节码）")]),a._v(" "),s("li",[a._v("需要特定执行环境（JVM）")]),a._v(" "),s("li",[a._v("一次编译多处执行")]),a._v(" "),s("li",[a._v("有虚拟化损失")])]),a._v(" "),s("p",[a._v("JavaScript")]),a._v(" "),s("ul",[s("li",[a._v("不需要编译，直接解释执行")]),a._v(" "),s("li",[a._v("需要执行环境（浏览器）")]),a._v(" "),s("li",[a._v("有虚拟化损失")])]),a._v(" "),s("h3",{attrs:{id:"go"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#go"}},[a._v("#")]),a._v(" Go")]),a._v(" "),s("ul",[s("li",[a._v("直接编译为二进制，没有虚拟化损失")]),a._v(" "),s("li",[a._v("自带运行环境，无需处理GC问题")]),a._v(" "),s("li",[a._v("一次编码可以适用多种平台")]),a._v(" "),s("li",[a._v("超强的并发支持能力与并发易用性")])]),a._v(" "),s("p",[s("img",{attrs:{src:"/why_go.assets/go%E8%AF%AD%E8%A8%80%E9%A1%B9%E7%9B%AE.drawio.png",alt:""}})]),a._v(" "),s("h3",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[a._v("#")]),a._v(" 总结")]),a._v(" "),s("ul",[s("li",[a._v("Go综合了多种语言的优势")]),a._v(" "),s("li",[a._v("Go是一种天生支持高性能并发的场景")]),a._v(" "),s("li",[a._v("Go在工业界有广泛的应用")])]),a._v(" "),s("h2",{attrs:{id:"何为runtime"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#何为runtime"}},[a._v("#")]),a._v(" 何为RunTime？")]),a._v(" "),s("h3",{attrs:{id:"很多语言都有runtime"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#很多语言都有runtime"}},[a._v("#")]),a._v(" 很多语言都有Runtime")]),a._v(" "),s("ul",[s("li",[a._v("Runtime 就是程序的运行环境")]),a._v(" "),s("li",[a._v("Java：Java虚拟机")]),a._v(" "),s("li",[a._v("JavaScript：浏览器内核")])]),a._v(" "),s("h3",{attrs:{id:"go中runtime的特点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#go中runtime的特点"}},[a._v("#")]),a._v(" GO中Runtime的特点")]),a._v(" "),s("ul",[s("li",[a._v("没有虚拟机的概念")]),a._v(" "),s("li",[a._v("作为程序的一部分打包进二进制的产物")]),a._v(" "),s("li",[a._v("随用户程序一起运行")]),a._v(" "),s("li",[a._v("与用户程序没有明显界限，直接通过函数调用")])]),a._v(" "),s("h3",{attrs:{id:"go中runtime的能力"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#go中runtime的能力"}},[a._v("#")]),a._v(" Go中Runtime的能力")]),a._v(" "),s("ul",[s("li",[a._v("内存管理能力")]),a._v(" "),s("li",[a._v("垃圾回收机制")]),a._v(" "),s("li",[a._v("超强的并发机制（协程调度）")])]),a._v(" "),s("p",[a._v("其他：")]),a._v(" "),s("ul",[s("li",[a._v("有一定的屏蔽系统调用能力")]),a._v(" "),s("li",[a._v("一些go关键字其实是Runtime下的函数")])]),a._v(" "),s("p",[s("img",{attrs:{src:"/why_go.assets/go%E5%85%B3%E9%94%AE%E5%AD%97.drawio.png",alt:""}})]),a._v(" "),s("h3",{attrs:{id:"总结-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结-2"}},[a._v("#")]),a._v(" 总结")]),a._v(" "),s("ul",[s("li",[a._v("go的runtime负责内存管理，垃圾回收，协会调度")]),a._v(" "),s("li",[a._v("go的runtime被编译为用户程序的一部分，一起运行")])]),a._v(" "),s("h2",{attrs:{id:"go程序是如何编译的"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#go程序是如何编译的"}},[a._v("#")]),a._v(" Go程序是如何编译的？")]),a._v(" "),s("p",[s("img",{attrs:{src:"/why_go.assets/%E7%BC%96%E8%AF%91%E8%A7%A3%E6%9E%90.drawio.png",alt:""}})]),a._v(" "),s("p",[a._v("编译过程")]),a._v(" "),s("p",[s("img",{attrs:{src:"/why_go.assets/go%E7%BC%96%E8%AF%91%E8%BF%87%E7%A8%8B.drawio.png",alt:""}})]),a._v(" "),s("h3",{attrs:{id:"词法分析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#词法分析"}},[a._v("#")]),a._v(" 词法分析")]),a._v(" "),s("ul",[s("li",[a._v("将源代码翻译成Token")]),a._v(" "),s("li",[a._v("Token是代码中的最小语义结构")])]),a._v(" "),s("h3",{attrs:{id:"句法分析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#句法分析"}},[a._v("#")]),a._v(" 句法分析")]),a._v(" "),s("p",[s("img",{attrs:{src:"/why_go.assets/%E5%8F%A5%E6%B3%95%E5%88%86%E6%9E%90.drawio.png",alt:""}})]),a._v(" "),s("h3",{attrs:{id:"语义分析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#语义分析"}},[a._v("#")]),a._v(" 语义分析")]),a._v(" "),s("ul",[s("li",[a._v("类型检查")]),a._v(" "),s("li",[a._v("类型推断")]),a._v(" "),s("li",[a._v("查看类型是否匹配")]),a._v(" "),s("li",[a._v("函数调用内联")]),a._v(" "),s("li",[a._v("逃逸分析")])]),a._v(" "),s("h3",{attrs:{id:"中间码生成"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#中间码生成"}},[a._v("#")]),a._v(" 中间码生成")]),a._v(" "),s("ul",[s("li",[a._v("为了处理不同平台的差异，先生成中间码（SSA）【平台无关的汇编】")])]),a._v(" "),s("p",[s("img",{attrs:{src:"/why_go.assets/%E4%B8%AD%E9%97%B4%E7%A0%81.drawio.png",alt:""}})]),a._v(" "),s("ul",[s("li",[a._v("查看从代码到SSA中间码的整个过程")])]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("windows cmd： set GOSSAFUNC=main\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[s("img",{attrs:{src:"/why_go.assets/%E6%9F%A5%E7%9C%8B%E4%B8%AD%E9%97%B4%E7%A0%81%E7%94%9F%E6%88%90.drawio.png",alt:""}})]),a._v(" "),s("h3",{attrs:{id:"机器码生成"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#机器码生成"}},[a._v("#")]),a._v(" 机器码生成")]),a._v(" "),s("ul",[s("li",[a._v("先生成Plan9汇编代码")])]),a._v(" "),s("div",{staticClass:"language-go line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("go")]),a._v(" build "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("gcflags "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("S main"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("go")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("h3",{attrs:{id:"链接"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#链接"}},[a._v("#")]),a._v(" 链接")]),a._v(" "),s("ul",[s("li",[a._v("将各个包及逆行链接，包括runtime")])]),a._v(" "),s("h3",{attrs:{id:"总结-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结-3"}},[a._v("#")]),a._v(" 总结")]),a._v(" "),s("p",[s("img",{attrs:{src:"/why_go.assets/%E7%BC%96%E8%AF%91%E6%80%BB%E7%BB%93.drawio.png",alt:""}})]),a._v(" "),s("h2",{attrs:{id:"go程序是如何运行的"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#go程序是如何运行的"}},[a._v("#")]),a._v(" Go程序是如何运行的？")]),a._v(" "),s("h3",{attrs:{id:"go程序的入口"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#go程序的入口"}},[a._v("#")]),a._v(" go程序的入口？")]),a._v(" "),s("ul",[s("li",[a._v("main方法？")]),a._v(" "),s("li",[a._v("runtime/rt0_XXX.s（汇编语言）")])]),a._v(" "),s("div",{staticClass:"language-go line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[a._v("CALL\truntime·"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("args")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("SB"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 对命令中的args进行初处理")]),a._v("\n\t初始化runtime包中的参数\n\targc "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v(" 参数数量\n\targv "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v(" 参数值\n\t\nCALL\truntime·"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("osinit")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("SB"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 检查多核，给schedule初始化")]),a._v("\n\nCALL\truntime·"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("schedinit")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("SB"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 初始化调度器")]),a._v("\n全局栈空间内存分配\n加载命令行参数到 os"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("Args\n堆内存空间的初始化\n加载操作系统环境变量\n初始化当前系统线程\n垃圾回收机制的参数初始化\n算法初始化（"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("map")]),a._v("、hash）\n设置process数量\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 取主函数的地址，放入协程")]),a._v("\nMOVQ\t$runtime·"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("mainPC")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("SB"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" AX\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 指向runtime.main 函数")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 创建协程，放入调度器，等待调度")]),a._v("\nCALL\truntime·"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("newproc")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("SB"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 初始化m ，用来调度主协程")]),a._v("\nCALL\truntime·"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("mstart")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("SB"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br"),s("span",{staticClass:"line-number"},[a._v("12")]),s("br"),s("span",{staticClass:"line-number"},[a._v("13")]),s("br"),s("span",{staticClass:"line-number"},[a._v("14")]),s("br"),s("span",{staticClass:"line-number"},[a._v("15")]),s("br"),s("span",{staticClass:"line-number"},[a._v("16")]),s("br"),s("span",{staticClass:"line-number"},[a._v("17")]),s("br"),s("span",{staticClass:"line-number"},[a._v("18")]),s("br"),s("span",{staticClass:"line-number"},[a._v("19")]),s("br"),s("span",{staticClass:"line-number"},[a._v("20")]),s("br"),s("span",{staticClass:"line-number"},[a._v("21")]),s("br"),s("span",{staticClass:"line-number"},[a._v("22")]),s("br"),s("span",{staticClass:"line-number"},[a._v("23")]),s("br"),s("span",{staticClass:"line-number"},[a._v("24")]),s("br"),s("span",{staticClass:"line-number"},[a._v("25")]),s("br")])]),s("div",{staticClass:"language-go line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 进入runtime包 的 main方法")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("func")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("main")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("g "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("getg")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 初始化")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("doInit")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("&")]),a._v("runtime_inittask"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// Must be before defer.")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 打开了垃圾回收器")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("gcenable")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 执行go中的主函数")]),a._v("\nfn "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":=")]),a._v(" main_main \n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("fn")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br"),s("span",{staticClass:"line-number"},[a._v("12")]),s("br")])]),s("h3",{attrs:{id:"保存参数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#保存参数"}},[a._v("#")]),a._v(" 保存参数")]),a._v(" "),s("ul",[s("li",[a._v("保存 argc、argv到栈上")])]),a._v(" "),s("h3",{attrs:{id:"初始化g0執行栈"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#初始化g0執行栈"}},[a._v("#")]),a._v(" 初始化g0執行栈")]),a._v(" "),s("ul",[s("li",[a._v("g0是为了调度协程而产生的协程")]),a._v(" "),s("li",[a._v("g0是go程序的第一个协程")])]),a._v(" "),s("h3",{attrs:{id:"运行时检测"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#运行时检测"}},[a._v("#")]),a._v(" 运行时检测")]),a._v(" "),s("ul",[s("li",[a._v("检查各种类型的长度")]),a._v(" "),s("li",[a._v("检查指针操作")]),a._v(" "),s("li",[a._v("检查结构体字段偏移量")]),a._v(" "),s("li",[a._v("检查atomic原子操作")]),a._v(" "),s("li",[a._v("检查CAS操作")]),a._v(" "),s("li",[a._v("检查栈大小是否是2的幂次")])]),a._v(" "),s("h3",{attrs:{id:"初始化runtime-args"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#初始化runtime-args"}},[a._v("#")]),a._v(" 初始化runtime.args")]),a._v(" "),s("ul",[s("li",[a._v("对命令行中的参数进行处理")]),a._v(" "),s("li",[a._v("参数数量赋值给argc int32")]),a._v(" "),s("li",[a._v("参数值复制给给argv **byte")])]),a._v(" "),s("h3",{attrs:{id:"调度器的初始化-runtime-schedinit"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#调度器的初始化-runtime-schedinit"}},[a._v("#")]),a._v(" 调度器的初始化 runtime.schedinit")]),a._v(" "),s("ul",[s("li",[a._v("全局栈空间内存分配")]),a._v(" "),s("li",[a._v("加载命令行参数到 os.Args")]),a._v(" "),s("li",[a._v("堆内存空间的初始化")]),a._v(" "),s("li",[a._v("加载操作系统环境变量")]),a._v(" "),s("li",[a._v("初始化当前系统线程")]),a._v(" "),s("li",[a._v("垃圾回收机制的参数初始化")]),a._v(" "),s("li",[a._v("算法初始化（map、hash）")]),a._v(" "),s("li",[a._v("设置process数量")])]),a._v(" "),s("h3",{attrs:{id:"创建主协程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#创建主协程"}},[a._v("#")]),a._v(" 创建主协程")]),a._v(" "),s("ul",[s("li",[a._v("创建一个新的协程，执行runtime.main")]),a._v(" "),s("li",[a._v("放入调度器等待调度")])]),a._v(" "),s("h3",{attrs:{id:"初始化m"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#初始化m"}},[a._v("#")]),a._v(" 初始化M")]),a._v(" "),s("ul",[s("li",[a._v("初始化一个M，用来调度主协程")])]),a._v(" "),s("h3",{attrs:{id:"主协程用来执行主函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#主协程用来执行主函数"}},[a._v("#")]),a._v(" 主协程用来执行主函数")]),a._v(" "),s("ul",[s("li",[a._v("执行runtime包中的init方法")]),a._v(" "),s("li",[a._v("启动GC垃圾收集器")]),a._v(" "),s("li",[a._v("执行用户包依赖的init方法")]),a._v(" "),s("li",[a._v("执行用户的主函数，main_main(go:linkename main_main main.main)")])]),a._v(" "),s("h3",{attrs:{id:"总结-4"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结-4"}},[a._v("#")]),a._v(" 总结")]),a._v(" "),s("ul",[s("li",[a._v("Go启动时经理了检查、各种初始化，初始化协程调度的过程")]),a._v(" "),s("li",[a._v("main.main()也是在协程中运行的")])]),a._v(" "),s("h3",{attrs:{id:"问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#问题"}},[a._v("#")]),a._v(" 问题")]),a._v(" "),s("ul",[s("li",[a._v("调度器是什么？")]),a._v(" "),s("li",[a._v("为什么初始化M？")]),a._v(" "),s("li",[a._v("为什么不是执行main.main()，而是放到调度器执行。")])]),a._v(" "),s("h3",{attrs:{id:"体会"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#体会"}},[a._v("#")]),a._v(" 体会")]),a._v(" "),s("ul",[s("li",[a._v("Go程序的启动过程像不像一个虚拟机或者框架？")])]),a._v(" "),s("h2",{attrs:{id:"go程序是面向对象的吗"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#go程序是面向对象的吗"}},[a._v("#")]),a._v(" Go程序是面向对象的吗？")]),a._v(" "),s("h3",{attrs:{id:"yes-and-no"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yes-and-no"}},[a._v("#")]),a._v(" Yes and No")]),a._v(" "),s("ul",[s("li",[a._v("Go允许OO风格")]),a._v(" "),s("li",[a._v("Go的Struct可以看作其他语言的Class")]),a._v(" "),s("li",[a._v("Go缺乏其他语言的继承结构")]),a._v(" "),s("li",[a._v("Go的接口与其他语言有很大的差异")])]),a._v(" "),s("h3",{attrs:{id:"go的-类"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#go的-类"}},[a._v("#")]),a._v(" Go的“类“")]),a._v(" "),s("ul",[s("li",[a._v("其他语言中，往往用class表示一类数据")]),a._v(" "),s("li",[a._v("class的每个实例称作”对象“")]),a._v(" "),s("li",[a._v("Go中用strcut表示一类数据")]),a._v(" "),s("li",[a._v("strcut每个实例并不是”对象“，而是此类型的”值“")]),a._v(" "),s("li",[a._v("struct也可以定义方法")])]),a._v(" "),s("h3",{attrs:{id:"go的继承"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#go的继承"}},[a._v("#")]),a._v(" Go的继承")]),a._v(" "),s("ul",[s("li",[a._v("Go没有继承")]),a._v(" "),s("li",[a._v("Go的继承是组合")]),a._v(" "),s("li",[a._v("组合中的匿名字段，通过语法糖达成了类似的继承的效果")])]),a._v(" "),s("h3",{attrs:{id:"go的接口"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#go的接口"}},[a._v("#")]),a._v(" Go的接口")]),a._v(" "),s("ul",[s("li",[a._v("隐式实现接口（不想java需要指定实现的接口）")])]),a._v(" "),s("h3",{attrs:{id:"总结-5"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结-5"}},[a._v("#")]),a._v(" 总结")]),a._v(" "),s("ul",[s("li",[a._v("Go没有对象，没有类，没有继承")]),a._v(" "),s("li",[a._v("Go通过组合匿名字段达到类似的继承效果")]),a._v(" "),s("li",[a._v("通过以上手段去掉了面向对象中复杂而冗余的部分")]),a._v(" "),s("li",[a._v("保留了基本的面向对象的特性")])]),a._v(" "),s("h2",{attrs:{id:"实战-企业级go项目包管理方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实战-企业级go项目包管理方法"}},[a._v("#")]),a._v(" 实战：企业级Go项目包管理方法")]),a._v(" "),s("h3",{attrs:{id:"go包管理困境"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#go包管理困境"}},[a._v("#")]),a._v(" Go包管理困境")]),a._v(" "),s("ul",[s("li",[a._v("没有统一的包管理方式")]),a._v(" "),s("li",[a._v("包之间的依赖关系很难维护")]),a._v(" "),s("li",[a._v("如果同时需要一个包的不同版本，非常麻烦")])]),a._v(" "),s("h3",{attrs:{id:"尝试解决"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#尝试解决"}},[a._v("#")]),a._v(" 尝试解决")]),a._v(" "),s("ul",[s("li",[a._v("产生过hi使用godep、govendor、glide等解决")]),a._v(" "),s("li",[a._v("未测地解决GOPATH存在的问题")]),a._v(" "),s("li",[a._v("使用起来麻烦")])]),a._v(" "),s("h3",{attrs:{id:"go-moudles-1-11-之后"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#go-moudles-1-11-之后"}},[a._v("#")]),a._v(" Go Moudles（1.11 之后）")]),a._v(" "),s("ul",[s("li",[a._v("本质上，一个Go包就是一个项目的源码")]),a._v(" "),s("li",[a._v("gomod的作用：将Go包和Git项目关联起来")]),a._v(" "),s("li",[a._v("Go包的版本就是Git项目的Tag")]),a._v(" "),s("li",[a._v("gomod就是解决”需要哪个git项目的什么版本“")])]),a._v(" "),s("h3",{attrs:{id:"使用modules"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用modules"}},[a._v("#")]),a._v(" 使用Modules")]),a._v(" "),s("ul",[s("li",[s("p",[a._v("github.com/Jeffail/tunny")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("go get github.com/Jeffail/tunny\ngo get github.com/Jeffail/tunny@version\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])])])]),a._v(" "),s("h3",{attrs:{id:"github-无法访问怎么办"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#github-无法访问怎么办"}},[a._v("#")]),a._v(" Github 无法访问怎么办")]),a._v(" "),s("ul",[s("li",[s("p",[a._v("使用 goproxy.cn作为代理")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("go env -w GOPROXY=https://goproxy.cn,direct\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])])])]),a._v(" "),s("h3",{attrs:{id:"想用本地文件替代怎么办"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#想用本地文件替代怎么办"}},[a._v("#")]),a._v(" 想用本地文件替代怎么办")]),a._v(" "),s("ul",[s("li",[s("p",[a._v("go.mod 文件追加：")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("replace github.com/jeffail/tunny => xxx/xxx\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])])]),a._v(" "),s("li",[s("p",[a._v("go vender 缓存到本地")]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("go mod vendor // 不是之前的 go vendor, 将依赖包缓存到本地\ngo build -mod vendor // 不会去远程拉版本 \n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])])])]),a._v(" "),s("h3",{attrs:{id:"同步到github"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#同步到github"}},[a._v("#")]),a._v(" 同步到github")]),a._v(" "),s("ul",[s("li",[a._v("初始化mod文件")])]),a._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("go mod init github.com/jeffail/tunny\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("ul",[s("li",[a._v("提交到代码仓库")]),a._v(" "),s("li",[a._v("打上tag")])])])}),[],!1,null,null,null);s.default=n.exports}}]);