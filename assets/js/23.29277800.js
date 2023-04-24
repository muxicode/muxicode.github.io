(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{309:function(t,s,a){"use strict";a.r(s);var n=a(14),r=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"_6-最大路径和"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-最大路径和"}},[t._v("#")]),t._v(" 6. 最大路径和")]),t._v(" "),s("h2",{attrs:{id:"题目"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#题目"}},[t._v("#")]),t._v(" 题目")]),t._v(" "),s("p",[t._v("给定一个矩阵matrix，先从左上角开始，每一步只能往右或者往下走，走到右下角。然后从右下角出发，每一步只能往上或者往左走，再回到左上角。任何一个位置的数字，只能获得一遍。返回最大路径和。")]),t._v(" "),s("h2",{attrs:{id:"示例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#示例"}},[t._v("#")]),t._v(" 示例")]),t._v(" "),s("center",[s("img",{attrs:{src:"/part_two_6_cherry_pickup.assets/image-20230312223214648.png",alt:"drawing",width:"50%"}})]),t._v(" "),s("p",[t._v("格子如图上分布，此时可以拿到的最多的1，为图中红色的路径表示，走的过程中，可以将所有的1收集到，得到最大路径和。")]),t._v(" "),s("h2",{attrs:{id:"思路"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#思路"}},[t._v("#")]),t._v(" 思路")]),t._v(" "),s("p",[t._v("有一个巧妙的设计思路：")]),t._v(" "),s("center",[s("img",{attrs:{src:"/part_two_6_cherry_pickup.assets/image-20230312224035615.png",alt:"drawing",width:"50%"}})]),t._v(" "),s("ul",[s("li",[t._v("假设一开始有两个小人，都同时往右下角走")]),t._v(" "),s("li",[t._v("共同路过的地方数值只获取一次")]),t._v(" "),s("li",[t._v("同时到达右下角")])]),t._v(" "),s("p",[t._v("如果符合以上条件，则这种走的方式与题目的最终结果是一致的。")]),t._v(" "),s("p",[t._v("这样的话有一个"),s("strong",[t._v("隐藏的条件！")]),t._v("，就是A在一个位置时，如果B在别处，那么B就不可能再到A的位置的。")]),t._v(" "),s("blockquote",[s("p",[t._v("我们可以这样猜测")]),t._v(" "),s("p",[t._v("假设一个函数 process(matrix， Ar, Ac, Br, Bc)")]),t._v(" "),s("p",[t._v("函数代表着 小人A从位置（Ar，Ac）开始，小人B从（Br, Bc)位置开始，返回走到终点的最大路径和")]),t._v(" "),s("p",[t._v("答案可以调用 process(matrix, 0,0,0,0) 得到。")]),t._v(" "),s("p",[t._v("但是思考一个问题：四个变量如果想要做成动态规划，那可是四维表")]),t._v(" "),s("p",[t._v("我们尝试的原则：")]),t._v(" "),s("ol",[s("li",[t._v("需要知道是哪几种模型。")]),t._v(" "),s("li",[t._v("每个参数的复杂度不要突破整形的复杂度以上")]),t._v(" "),s("li",[t._v("可变参数能省则省")])]),t._v(" "),s("p",[t._v("我们能不能省掉一个参数，完全可以，由于走的步数一样多，我们可以通过三个参数，算出第四个参数")]),t._v(" "),s("p",[t._v("优化完参数后，我们可以先写出递归可能性，然后优化为三位的动态规划表，如果觉得动态规划表不好改，可以直接加一个缓存，进行加速即可。")])]),t._v(" "),s("h2",{attrs:{id:"代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#代码"}},[t._v("#")]),t._v(" 代码")]),t._v(" "),s("div",{staticClass:"language-go line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" class02\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"traning/algorithm/utility/mymath"')]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ComeGoMaxPathSum")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("matrix "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 两个小人都从 0，0 出发走向 右下角落")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ComeGoMaxPathSumProcess")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("matrix"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// (Ar, Ac) 小人A的位置")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// (Br, Bc) 小人B的位置 【根据小人走的步数是一样的，可以推出 Bc = Ac + Ar - Br")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ComeGoMaxPathSumProcess")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("matrix "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Ar"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Ac"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Br "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tN "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("len")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("matrix"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n\tM "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("len")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("matrix"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" Ar "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" N "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" Ac "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" M "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 小人A走到最后一个位置的时候，小人B也走到最后一个位置，只返回该数一次即可")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" matrix"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Ar"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Ac"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 讨论可能性")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// A右 B下")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// A右 B右")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// A下 B下")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// A下 B右")]),t._v("\n\tBc "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" Ar "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" Ac "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" Br\n\tARightBDown "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" Ac "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" M "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" Br "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" N "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tARightBDown "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ComeGoMaxPathSumProcess")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("matrix"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Ar"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Ac"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Br"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\tARightBRight "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v("  Ac "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" M "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" Bc "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" M "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tARightBRight "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ComeGoMaxPathSumProcess")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("matrix"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Ar"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Ac"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Br"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\tADownBDown "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" Ar "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" N "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" Br "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" N "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tADownBDown "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ComeGoMaxPathSumProcess")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("matrix"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Ar"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Ac"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Br"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\tADownBRight "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" Ar "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" N "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" Bc "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" M "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tADownBRight "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ComeGoMaxPathSumProcess")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("matrix"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Ar"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Ac"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Br"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\tmaxNext "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" mymath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Max")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mymath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Max")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ARightBDown"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ARightBRight"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" mymath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Max")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ADownBDown"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ADownBRight"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 小人A与小人B位置相同，返回一个值")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" Ac "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" Bc "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" matrix"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Ar"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Ac"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" maxNext\n\t"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  小人A与小人B位置不相同，返回两个值")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" matrix"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Ar"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Ac"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" matrix"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Br"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Bc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" maxNext\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br"),s("span",{staticClass:"line-number"},[t._v("22")]),s("br"),s("span",{staticClass:"line-number"},[t._v("23")]),s("br"),s("span",{staticClass:"line-number"},[t._v("24")]),s("br"),s("span",{staticClass:"line-number"},[t._v("25")]),s("br"),s("span",{staticClass:"line-number"},[t._v("26")]),s("br"),s("span",{staticClass:"line-number"},[t._v("27")]),s("br"),s("span",{staticClass:"line-number"},[t._v("28")]),s("br"),s("span",{staticClass:"line-number"},[t._v("29")]),s("br"),s("span",{staticClass:"line-number"},[t._v("30")]),s("br"),s("span",{staticClass:"line-number"},[t._v("31")]),s("br"),s("span",{staticClass:"line-number"},[t._v("32")]),s("br"),s("span",{staticClass:"line-number"},[t._v("33")]),s("br"),s("span",{staticClass:"line-number"},[t._v("34")]),s("br"),s("span",{staticClass:"line-number"},[t._v("35")]),s("br"),s("span",{staticClass:"line-number"},[t._v("36")]),s("br"),s("span",{staticClass:"line-number"},[t._v("37")]),s("br"),s("span",{staticClass:"line-number"},[t._v("38")]),s("br"),s("span",{staticClass:"line-number"},[t._v("39")]),s("br"),s("span",{staticClass:"line-number"},[t._v("40")]),s("br"),s("span",{staticClass:"line-number"},[t._v("41")]),s("br"),s("span",{staticClass:"line-number"},[t._v("42")]),s("br"),s("span",{staticClass:"line-number"},[t._v("43")]),s("br"),s("span",{staticClass:"line-number"},[t._v("44")]),s("br"),s("span",{staticClass:"line-number"},[t._v("45")]),s("br"),s("span",{staticClass:"line-number"},[t._v("46")]),s("br"),s("span",{staticClass:"line-number"},[t._v("47")]),s("br"),s("span",{staticClass:"line-number"},[t._v("48")]),s("br"),s("span",{staticClass:"line-number"},[t._v("49")]),s("br")])])],1)}),[],!1,null,null,null);s.default=r.exports}}]);