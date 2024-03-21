(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{326:function(t,s,a){"use strict";a.r(s);var n=a(14),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"有序数组中查找小于等于num的最左位置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#有序数组中查找小于等于num的最左位置"}},[t._v("#")]),t._v(" 有序数组中查找小于等于num的最左位置")]),t._v(" "),s("p",[t._v("我们有如下一个数组：")]),t._v(" "),s("p",[s("img",{attrs:{src:"/g1_bisectiom_1_find_num.assets/image-20230907233145954.png",alt:""}})]),t._v(" "),s("p",[t._v("数组内的数字是有序的，我们假设不知道里面是小于等于数字"),s("code",[t._v("9")]),t._v("，设计一个函数，指定数组及数字，该函数返回小于等于"),s("code",[t._v("9")]),t._v("最左边的位置，不存在返回"),s("code",[t._v("-1")])]),t._v(" "),s("h2",{attrs:{id:"算法步骤"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#算法步骤"}},[t._v("#")]),t._v(" 算法步骤")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("，初始化赋值左右两边的位置"),s("code",[t._v("left")]),t._v("、"),s("code",[t._v("right")]),t._v("，并计算出中间位置"),s("code",[t._v("mid = (left + rignt) / 2")]),t._v("，并初始化答案为"),s("code",[t._v("index = -1")]),t._v("，因为我们起初不知道存不存在该位置。")]),t._v(" "),s("p",[s("img",{attrs:{src:"/g1_bisectiom_1_find_num.assets/image-20230907233809200.png",alt:"image-20230907233809200"}})]),t._v(" "),s("p",[s("code",[t._v("mid")]),t._v("位置为5，小于等于9，满足我们的要求，我们使"),s("code",[t._v("index = 1")]),t._v("，该位置比我们目标值"),s("code",[t._v("9")]),t._v("要小，还存在更左的答案，让"),s("code",[t._v("left = mid + 1")]),t._v("，继续判断")])]),t._v(" "),s("li",[s("p",[t._v("此时"),s("code",[t._v("left")]),t._v("和"),s("code",[t._v("right")]),t._v("相等，计算出来的mid也等于"),s("code",[t._v("left")]),t._v("和 "),s("code",[t._v("right")]),t._v("，此时数组的"),s("code",[t._v("mid")]),t._v("位置为"),s("code",[t._v("9")]),t._v("，小于等于我们要找的目标，我们使"),s("code",[t._v("index = 2")]),t._v("返回即可。")]),t._v(" "),s("p",[s("img",{attrs:{src:"/g1_bisectiom_1_find_num.assets/image-20230907234154239.png",alt:"image-20230907234154239"}})])])]),t._v(" "),s("h2",{attrs:{id:"代码实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#代码实现"}},[t._v("#")]),t._v(" 代码实现")]),t._v(" "),s("h3",{attrs:{id:"方式一"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#方式一"}},[t._v("#")]),t._v(" 方式一")]),t._v(" "),s("p",[t._v("采用边界为 left < right 的方式循环：")]),t._v(" "),s("div",{staticClass:"language-go line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("BSNearLeft")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" num "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" index "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" arr "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("nil")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("len")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\tleft"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" right"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" mid"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" index "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("len")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" left "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" right "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n\t\tmid "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" left "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("right "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" left"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" arr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("mid"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" num "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            index "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mid\n            left "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mid "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tright "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mid "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" index\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br")])]),s("h3",{attrs:{id:""}},[s("a",{staticClass:"header-anchor",attrs:{href:"#"}},[t._v("#")])])])}),[],!1,null,null,null);s.default=e.exports}}]);