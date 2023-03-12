(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{303:function(n,s,t){"use strict";t.r(s);var l=t(10),a=Object(l.a)({},(function(){var n=this,s=n._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[s("h1",{attrs:{id:"如何实现-go-调用-c-代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何实现-go-调用-c-代码"}},[n._v("#")]),n._v(" 如何实现 GO 调用 C 代码？")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v('/*\nint sum(int a, int b) {\n\treturn a+b;\n}\n*/\nimport "C"\n\nfunc main() {\n\tprintln(C.sum(1,1))\n}\n\n')])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br"),s("span",{staticClass:"line-number"},[n._v("10")]),s("br"),s("span",{staticClass:"line-number"},[n._v("11")]),s("br")])]),s("blockquote",[s("p",[n._v("原理")])]),n._v(" "),s("ul",[s("li",[n._v("在内存中开辟一个结构体")]),n._v(" "),s("li",[n._v("结构体中包含参数和返回值")]),n._v(" "),s("li",[n._v("结构体地址传入C方法")]),n._v(" "),s("li",[n._v("C方法将结果写入返回值的位置")])]),n._v(" "),s("blockquote",[s("p",[n._v("调度器的配合")])]),n._v(" "),s("ul",[s("li",[n._v("协程需要抢占式调度")]),n._v(" "),s("li",[n._v("进入C程序之后，调度器无法抢占协程")]),n._v(" "),s("li",[n._v("调度器停止对此协程的调度")])]),n._v(" "),s("blockquote",[s("p",[n._v("协程栈的切换")])]),n._v(" "),s("ul",[s("li",[n._v("C的栈不受Runtime管理")]),n._v(" "),s("li",[n._v("进入C时，需要将当前栈切换到线程的系统栈上")])]),n._v(" "),s("blockquote",[s("p",[n._v("cgo 的优缺点")])]),n._v(" "),s("ul",[s("li",[n._v("cgo 可以让 go 调用现成的C实现")]),n._v(" "),s("li",[n._v("cgo 限制了 go 语言的跨平台特性")]),n._v(" "),s("li",[n._v("cgo 并不能提高Go语言的性能（切换栈等其他操作）")])]),n._v(" "),s("blockquote",[s("p",[n._v("总结")])]),n._v(" "),s("ul",[s("li",[n._v("cgo 是让 go 语言调用c方法的技术")]),n._v(" "),s("li",[n._v("cgo 需要 go 调度器和协程栈的配合")]),n._v(" "),s("li",[n._v("cgo一般用于找不到go实现的情况")]),n._v(" "),s("li",[n._v("cgo 不能提高性能，是一个临时解决方案")])])])}),[],!1,null,null,null);s.default=a.exports}}]);