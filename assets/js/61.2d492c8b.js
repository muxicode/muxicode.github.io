(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{347:function(v,_,t){"use strict";t.r(_);var d=t(14),r=Object(d.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"排序总结-避坑指南"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#排序总结-避坑指南"}},[v._v("#")]),v._v(" 排序总结&避坑指南")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th"),v._v(" "),_("th",[v._v("时间复杂")]),v._v(" "),_("th",[v._v("额外空间复杂")]),v._v(" "),_("th",[v._v("稳定性")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("选择排序")]),v._v(" "),_("td",[v._v("O(N^2)")]),v._v(" "),_("td",[v._v("O(1)")]),v._v(" "),_("td",[v._v("无")])]),v._v(" "),_("tr",[_("td",[v._v("冒泡排序")]),v._v(" "),_("td",[v._v("O(N^2)")]),v._v(" "),_("td",[v._v("O(1)")]),v._v(" "),_("td",[v._v("有")])]),v._v(" "),_("tr",[_("td",[v._v("插入排序")]),v._v(" "),_("td",[v._v("O(N^2)")]),v._v(" "),_("td",[v._v("O(1)")]),v._v(" "),_("td",[v._v("有")])]),v._v(" "),_("tr",[_("td",[v._v("归并排序")]),v._v(" "),_("td",[v._v("O(N*logN)")]),v._v(" "),_("td",[v._v("O(N)")]),v._v(" "),_("td",[v._v("有")])]),v._v(" "),_("tr",[_("td",[v._v("随机快排")]),v._v(" "),_("td",[v._v("O(N*logN)")]),v._v(" "),_("td",[v._v("O(logN)")]),v._v(" "),_("td",[v._v("无")])]),v._v(" "),_("tr",[_("td",[v._v("堆排序")]),v._v(" "),_("td",[v._v("O(N*logN)")]),v._v(" "),_("td",[v._v("O(1)")]),v._v(" "),_("td",[v._v("无")])]),v._v(" "),_("tr",[_("td",[v._v("==========")]),v._v(" "),_("td",[v._v("==========")]),v._v(" "),_("td",[v._v("==========")]),v._v(" "),_("td",[v._v("==========")])]),v._v(" "),_("tr",[_("td",[v._v("计数排序")]),v._v(" "),_("td",[v._v("O(N)")]),v._v(" "),_("td",[v._v("O(M)")]),v._v(" "),_("td",[v._v("有")])]),v._v(" "),_("tr",[_("td",[v._v("基数排序")]),v._v(" "),_("td",[v._v("O(N)")]),v._v(" "),_("td",[v._v("O(N)")]),v._v(" "),_("td",[v._v("有")])])])]),v._v(" "),_("h2",{attrs:{id:"排序算法的稳定性"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#排序算法的稳定性"}},[v._v("#")]),v._v(" 排序算法的稳定性")]),v._v(" "),_("ul",[_("li",[_("strong",[v._v("稳定性")]),v._v("，是指在排序后，同样大小的样本之间的相对顺序不会发生变化。")]),v._v(" "),_("li",[v._v("对于基础类型而言，稳定性似乎毫无意义。")]),v._v(" "),_("li",[v._v("但是，对于那些非基础类型，稳定性却蕴含着深刻的含义和价值。")]),v._v(" "),_("li",[v._v("有一些排序算法被设计成可以保持相对顺序的稳定状态，然而，也有一些排序算法，无论如何都无法达到稳定。🎭")])]),v._v(" "),_("h3",{attrs:{id:"为什么需要排序的稳定性"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#为什么需要排序的稳定性"}},[v._v("#")]),v._v(" 为什么需要排序的稳定性")]),v._v(" "),_("p",[v._v("🌟 "),_("strong",[v._v("排序的稳定性：保持秩序的奥秘")]),v._v(" 🤔")]),v._v(" "),_("p",[v._v("在排序的大舞台上，稳定性是一种珍贵的品质，如同排序算法的黄金标志。让我们深入探索一下为什么在各种场景中都需要排序的稳定性。")]),v._v(" "),_("ol",[_("li",[_("p",[_("strong",[v._v("购物之旅：价格与好评度的完美组合")])]),v._v(" "),_("p",[v._v("想象一下购物时，你希望按照价格排序，但同时也希望在同一价格范围内按照好评度排序。如果排序不稳定，先按价格排序可能会打乱原本按好评度有序的商品顺序。排序的稳定性就像是购物清单的魔法符咒，确保了你的排序需求不会互相干扰。")])]),v._v(" "),_("li",[_("p",[_("strong",[v._v("班级秩序：年龄与班级的和谐共舞")])]),v._v(" "),_("p",[v._v("在学生大家庭中，我们可能需要按照年龄排序，然后再按照班级排序。如果排序不稳定，可能导致同年龄的学生在排序后位置发生变化，打破了原有的年龄序列。排序的稳定性就像是班级里的年龄秩序守护者，确保了排序的和谐进行。")])])]),v._v(" "),_("p",[_("strong",[v._v("为什么需要排序的稳定性？")])]),v._v(" "),_("ol",[_("li",[_("p",[_("strong",[v._v("维护相对顺序关系：")])]),v._v(" "),_("ul",[_("li",[v._v("稳定性确保了相等元素在排序后仍然保持原有的相对顺序。这对于多级排序场景非常关键，比如购物时的价格与好评度。")])])]),v._v(" "),_("li",[_("p",[_("strong",[v._v("不破坏先前排序：")])]),v._v(" "),_("ul",[_("li",[v._v("排序稳定性意味着如果两个元素相等，排序的结果不会改变它们之间的相对位置。这对于多次排序操作非常重要，比如先按年龄排序再按班级排序。")])])]),v._v(" "),_("li",[_("p",[_("strong",[v._v("提高排序的可控性：")])]),v._v(" "),_("ul",[_("li",[v._v("稳定性让我们能够更加精确地控制排序的结果，确保在不同排序阶段的需求都能得到满足。")])])])]),v._v(" "),_("p",[v._v("在排序的奇妙舞台上，稳定性是排序算法的灵魂，为我们创造了一个有序而和谐的秩序空间。无论是购物还是学校，排序的稳定性都是我们排序魔法的不可或缺的一环！🌈✨")])])}),[],!1,null,null,null);_.default=r.exports}}]);