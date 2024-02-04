(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{340:function(t,s,a){"use strict";a.r(s);var n=a(14),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"master公式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#master公式"}},[t._v("#")]),t._v(" Master公式")]),t._v(" "),s("h2",{attrs:{id:"认识递归"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#认识递归"}},[t._v("#")]),t._v(" 认识递归")]),t._v(" "),s("p",[t._v("我们有一个数组，想要获取数组中的最大值，我们使用递归来求数组中的最大值。 🌌")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("🔄 "),s("strong",[t._v("二分之旅：将问题分为两半")])]),t._v(" "),s("p",[t._v("我们每一次都将求最大值的问题拆分成两个子问题，将数组范围一分为二。然后，比较前半部分的最大值与后半部分的最大值，返回两者中较大的那个值。这就如同在探险的路上，将未知的领域分为两个区域，寻找更大的可能。")])]),t._v(" "),s("li",[s("p",[t._v("🌐 "),s("strong",[t._v("较量之巅：比较两部分的最大值")])]),t._v(" "),s("p",[t._v("在每一步，我们在前半部分和后半部分中找到了各自的最大值，然后进行一场较量之巅，决出两者的胜负。无论是在山巅还是深谷，我们总是希望找到更高更大的存在。")])]),t._v(" "),s("li",[s("p",[t._v("🎯 "),s("strong",[t._v("最终之数：返回当前数字")])]),t._v(" "),s("p",[t._v("如此往复，直到最后范围只有一个数字，我们不再分割，而是毫不犹豫地返回当前数字。这个数字就像是我们探险的最终目标，而它便是整个数组的最大值。")])])]),t._v(" "),s("p",[s("img",{attrs:{src:"/g1_dp_recursion_1_master.assets/find_max.drawio-17057673947524.png",alt:""}})]),t._v(" "),s("h3",{attrs:{id:"代码示例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#代码示例"}},[t._v("#")]),t._v(" 代码示例")]),t._v(" "),s("div",{staticClass:"language-go line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("FindMax")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" L"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" R "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" L "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" R "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("                "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 只有一个数字的时候直接返回")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" arr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("L"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\tmid "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" L "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("R"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("L"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 求出中点，后面使用了位运算可以参考位运算章节")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Max")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("                "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 求最大值")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("FindMax")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" L"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" mid"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 前半段为 [L, mid]")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("FindMax")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arr"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" mid"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("R"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 前半段为 [mid+1, R]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Max")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" a "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" b "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" a\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" b\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br")])]),s("h2",{attrs:{id:"master公式-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#master公式-2"}},[t._v("#")]),t._v(" master公式")]),t._v(" "),s("p",[t._v("这个公式的神奇之处在于能够帮助我们预测递归算法的时间复杂度。")]),t._v(" "),s("div",{staticClass:"language-plaintext line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-plaintext"}},[s("code",[t._v("T(N) = a * T(N/b) + O(N^d)\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("ul",[s("li",[t._v("如果 "),s("code",[t._v("log(b, a) > d")]),t._v("，那么递归的复杂度为 O(N^log(b,a))")]),t._v(" "),s("li",[t._v("如果 "),s("code",[t._v("log(b, a) < d")]),t._v("，那么递归的复杂度为 O(N^d)")]),t._v(" "),s("li",[t._v("如果 "),s("code",[t._v("log(b, a) = d")]),t._v("，那么递归的复杂度为 O(N^d*log(2,N))")])]),t._v(" "),s("h3",{attrs:{id:"数组最大值的时间复杂度"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数组最大值的时间复杂度"}},[t._v("#")]),t._v(" 数组最大值的时间复杂度")]),t._v(" "),s("p",[t._v("对于我们之前找数组最大值递归的例子，我们可以根据master公式的定义，得到我们算法对应master公式中a,b,d的值。")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("在每层递归中，我们将问题规模减半，即 "),s("code",[t._v("T(N) = 2 * T(N/2)")]),t._v("，并额外执行一次 O(1) 的操作。这使得我们得到：")]),t._v(" "),s("ul",[s("li",[t._v("a = 2")]),t._v(" "),s("li",[t._v("b = 2")]),t._v(" "),s("li",[t._v("d = 0")])]),t._v(" "),s("p",[t._v("因此：")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("log(b, a)(1) > d(0)")]),t._v("，因此递归的复杂度为 O(N)")])])])]),t._v(" "),s("blockquote",[s("p",[t._v("如果我们在之前的基础上在每一次递归对数组做一次遍历呢？")])]),t._v(" "),s("ol",[s("li",[s("p",[t._v("根据公式：")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("T(N) = 2 * T(1/2*N) + O(N)\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("ul",[s("li",[t._v("a = 2")]),t._v(" "),s("li",[t._v("b = 2")]),t._v(" "),s("li",[t._v("d = 1")])])]),t._v(" "),s("li",[s("p",[s("code",[t._v("log(b, a) = 1 = d")])])]),t._v(" "),s("li",[s("p",[t._v("时间复杂度为：O(N*log(2,N))")])])]),t._v(" "),s("blockquote",[s("p",[t._v("如果我们硬是写代码把问题规模设置为2/3有重复部分，且在每一次递归对数组做一次遍历呢？")])]),t._v(" "),s("ol",[s("li",[s("p",[t._v("写出公式：")]),t._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("T(N) = 2 * T(2/3*N) + O(N)\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br")])]),s("ul",[s("li",[t._v("a = 2")]),t._v(" "),s("li",[t._v("b = 1.5")]),t._v(" "),s("li",[t._v("d = 1")])])]),t._v(" "),s("li",[s("p",[s("code",[t._v("log(b, a) > 1 = d")])])]),t._v(" "),s("li",[s("p",[t._v("时间复杂度为：O(N^log(b, a))")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);