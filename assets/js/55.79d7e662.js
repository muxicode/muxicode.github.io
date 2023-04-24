(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{345:function(s,t,n){"use strict";n.r(t);var a=n(14),e=Object(a.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"recover-如何在panic-中拯救程序"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#recover-如何在panic-中拯救程序"}},[s._v("#")]),s._v(" recover 如何在panic 中拯救程序？")]),s._v(" "),t("blockquote",[t("p",[s._v("panic 的基本使用")])]),s._v(" "),t("ul",[t("li",[s._v("panic 会抛出错误")]),s._v(" "),t("li",[s._v("终止协程运行")]),s._v(" "),t("li",[s._v("带崩整个Go程序")])]),s._v(" "),t("blockquote",[t("p",[s._v("panic + defer")])]),s._v(" "),t("ul",[t("li",[s._v("panic 在退出协程之前会执行所有已注册的defer")]),s._v(" "),t("li",[s._v("不会执行其他协程的defer")])]),s._v(" "),t("blockquote",[t("p",[s._v("源码")])]),s._v(" "),t("p",[s._v("C:\\Program Files\\Go\\src\\runtime\\panic.go")]),s._v(" "),t("div",{staticClass:"language-go line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-go"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// The implementation of the predeclared function panic.")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("func")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("gopanic")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("e any"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\t"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 一直循环本地的defer去执行")]),s._v("\n\t\td "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":=")]),s._v(" gp"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("_defer \n\t\t"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" d "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("nil")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\t\t\t"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("break")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" p"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("recovered "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" \n            "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 如果有 recover 执行recover的逻辑")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 不带崩程序")]),s._v("\n\t\t\tgp"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("_panic "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" p"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("link\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n     "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br")])]),t("blockquote",[t("p",[s._v("panic + defer + recover")])]),s._v(" "),t("ul",[t("li",[s._v("在 defer 中执行 recover， 可以拯救 panic 的协程")])]),s._v(" "),t("blockquote",[t("p",[s._v("原理")])]),s._v(" "),t("ul",[t("li",[s._v("如果涉及 recover， defer 会使用堆上分配（deferpool）")]),s._v(" "),t("li",[s._v("遇到 panic， panic 会从 deferpool 取出的 defer 语句，执行")]),s._v(" "),t("li",[s._v("defer 中调用 recover，可以终止panic的过程")])]),s._v(" "),t("div",{staticClass:"language-go line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-go"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("go")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("func")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("defer")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("func")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("recover")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("panic")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    fmt"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Println")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"end g"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("blockquote",[t("p",[s._v("总结")])]),s._v(" "),t("ul",[t("li",[s._v("panic 终止当前协程的运行")]),s._v(" "),t("li",[s._v("panic 在退出协程之前会执行所有已注册的defer")]),s._v(" "),t("li",[s._v("在defer中执行recover，可以拯救panic的协程")])])])}),[],!1,null,null,null);t.default=e.exports}}]);