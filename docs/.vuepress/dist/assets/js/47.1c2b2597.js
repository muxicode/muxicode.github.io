(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{333:function(e,v,_){"use strict";_.r(v);var l=_(14),r=Object(l.a)({},(function(){var e=this,v=e._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[v("h1",{attrs:{id:"defer-的底层原理是怎样的"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#defer-的底层原理是怎样的"}},[e._v("#")]),e._v(" defer 的底层原理是怎样的？")]),e._v(" "),v("blockquote",[v("p",[e._v("思路")])]),e._v(" "),v("ul",[v("li",[e._v("协程记录defer信息，函数退出时调用")]),e._v(" "),v("li",[e._v("将 defer 代码直接编译进函数尾")])]),e._v(" "),v("blockquote",[v("p",[e._v("思路1 堆上分配")])]),e._v(" "),v("ul",[v("li",[e._v("1.12 之前使用(需要处理垃圾回收的问题)")]),e._v(" "),v("li",[e._v("在堆上开辟一个sched.deferpool")]),e._v(" "),v("li",[e._v("遇到defer语句，将信息放入deferpool")]),e._v(" "),v("li",[e._v("函数返回时，从 deferpool 取出执行")])]),e._v(" "),v("blockquote",[v("p",[e._v("思路2 栈上分配")])]),e._v(" "),v("ul",[v("li",[e._v("1.13 之后出现")]),e._v(" "),v("li",[e._v("遇到 defer 语句，将信息放入栈上")]),e._v(" "),v("li",[e._v("函数返回时，从栈中取出执行")]),e._v(" "),v("li",[e._v("只能保存一个defer信息（防止栈空间太大）")])]),e._v(" "),v("blockquote",[v("p",[e._v("思路3 开放编码")])]),e._v(" "),v("ul",[v("li",[e._v("1.14 之后出现的")]),e._v(" "),v("li",[e._v("如果 defer 语句在编译时就可以固定")]),e._v(" "),v("li",[e._v("直接改写用户代码，defer语句放入函数末尾")]),e._v(" "),v("li",[e._v("效率最高，代码改动最小")]),e._v(" "),v("li",[e._v("需要在编译时触发，触发条件比较难")])]),e._v(" "),v("blockquote",[v("p",[e._v("总结")])]),e._v(" "),v("ul",[v("li",[e._v("defer 可以方便业务的编写")]),e._v(" "),v("li",[e._v("defer 有两种思路，三种实现")]),e._v(" "),v("li",[e._v("性能最高的是开放编码")])])])}),[],!1,null,null,null);v.default=r.exports}}]);