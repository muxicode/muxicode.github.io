/*
 * @Description: 头部navs导航配置文件,入口文件原本在config.js文件中,但抽离到了themeConfig.js中,该文件通过module.exports导出,在themeConfig.js中通过require方式引入
 * 集中配置管理头部nav导航栏
 * @docs: https://vuepress.docschina.org/default-theme-config/#%E5%AF%BC%E8%88%AA%E6%A0%8F-navbar
 */

const navs = [
  { text: '首页', link: '/' },
  { text: '导航', link: '/navigation/' },
  {
    text: 'Golang',
    items: [
      {
        text: '基础及进阶',
        items: [
          { text: '目录导读', link: '/golang/1_0_nav' },
          { text: '基础入门', link: '/golang/1_2_struct' },
          { text: '高并发下的工具', link: '/golang/2_1_high_concurrency_sharps_coroutines' },
          { text: '其他高级特性', link: '/golang/3_1_go_c' },
        ]
      },
      {
        text: '测试相关',
        items: [
          { text: '构建测试', link: '/golang/4_1_golang_test' },
          { text: '基准测试', link: '/golang/4_2_golang_benchmark' },
        ]
      },
      {
        text: '实战',
        items: [
          { text: 'pprof实战', link: '/golang/actual_1_pprof' },
          { text: '问题定位', link: '/golang/actual_2_pro_problem' },
        ]
      }
    ],
  },
  {
    text: 'Web框架',
    items: [
      { text: '熟悉http包', link: '/web/1_http' },
      { text: 'server抽象', link: '/web/2_server' },
      { text: 'context抽象', link: '/web/3_context' },
      { text: '简单路树', link: '/web/4_simple_route' },
      { text: 'handler抽象', link: '/web/5_handler' },
      { text: 'filter实现AOP', link: '/web/6_filter' },
      { text: 'handler路由树', link: '/web/7_handler' },
      { text: '并发编程', link: '/waiting/' },
      { text: '文件操作', link: '/waiting/' },
      { text: '泛型', link: '/waiting/' },
    ],
  },
  {
    text: '数据结构与算法',
    items: [
      { text: '体系学习总览', link: '/algorithm/' },
      {
        text: '🌱阶段一：初出茅庐🌱',
        items: [
          { text: '初识算法', link: '/algorithm/base_0_about_algorithm' },
          { text: '位运算', link: '/algorithm/base_1_binary_0_binary' },
          { text: '排序', link: '/algorithm/base_5_line_code01_select_sort' },
          { text: '二分及其拓展', link: '/waiting/' },
          { text: '递归到动态规划', link: '/waiting/' },
          { text: '链表', link: '/waiting/' },
          { text: '队列', link: '/waiting/' },
          { text: '栈', link: '/waiting/' },
          { text: '哈希表的使用', link: '/waiting/' },
          { text: '堆', link: '/algorithm/base_9_heap' },
          { text: '加强堆', link: '/waiting/' },
          { text: '前缀树', link: '/waiting/' },
          { text: '二叉树', link: '/waiting/' },
          { text: '并查集', link: '/algorithm/base_8_union_set_1' },
          { text: '图', link: '/algorithm/advance_2_graph_1_base' },
          { text: '哈夫曼树', link: '/waiting/' },
          { text: '其他', link: '/algorithm/base_nonline_code01_sum_of_factorial' },
        ]
      },
      {
        text: '🚀阶段二：知识的升华🚀',
        items: [
          { text: '斐波那契数列', link: '/waiting/' },
          { text: 'KMP算法', link: '/algorithm/advance_1_kmp_1' },
          { text: 'Manacher算法', link: '/waiting/' },
          { text: '无序数组寻找第 K 小的值', link: '/waiting/' },
          { text: '蓄水池算法', link: '/waiting/' },
          { text: 'Morris遍历', link: '/waiting/' },
          { text: '资源限制类题目的算法设计', link: '/waiting/' },
          { text: '打表找规律', link: '/waiting/' },
          { text: '根据题目的数量猜解法技巧', link: '/waiting/' },
          { text: '卡特兰数', link: '/waiting/' },
          { text: '数组三连问题', link: '/waiting/' },
          { text: '状态压缩的动态规划', link: '/waiting/' },
          { text: '设计简化外部信息的动态规划', link: '/waiting/' },
          { text: '窗口内最大值和最小值的更新结构', link: '/waiting/' },
          { text: '单调栈', link: '/algorithm/advance_1_kmp_1' },
          { text: '线段树', link: '/waiting/' },
          { text: 'IndexTree', link: '/waiting/' },
          { text: 'AC自动机', link: '/waiting/' },
          { text: '和哈希函数有关的数据结构', link: '/waiting/' },
          { text: '二维数组调整', link: '/waiting/' },
        ]
      },
      {
        text: '🌟阶段三：高峰之巅🌟',
        items: [
          { text: '编辑距离', link: '/waiting/' },
          { text: 'Nimi博弈', link: '/waiting/' },
          { text: '括号嵌套求解的递归模型', link: '/waiting/' },
          { text: '最长递增子序列问题', link: '/waiting/' },
          { text: '约瑟夫环问题', link: '/waiting/' },
          { text: '完美洗牌问题', link: '/waiting/' },
          { text: 'A*算法', link: '/waiting/' },
          { text: 'Bellman Ford算法', link: '/waiting/' },
          { text: '强连通分量', link: '/waiting/' },
          { text: 'KM算法', link: '/waiting/' },
          { text: '扫描线算法', link: '/waiting/' },
        ]
      },
      {
        text: '🔝阶段四：登峰造极🔝',
        items: [
          { text: '有序表', link: '/waiting/' },
          { text: '四边形不等式', link: '/waiting/' },
          { text: '后缀数组DC3算法', link: '/waiting/' },
        ]
      },
    ],
  },
  {
    text: '开发',
    items: [
      {
        text: '方法论',
        items: [
          { text: '设计模式', link: '/develop/methodology/1_python_design_pattern' },
          { text: '重构', link: '/develop/methodology/2_reconstruction' },
        ]
      },
      {
        text: '部署',
        items: [
          { text: '项目容器化', link: '/develop/deployment/1_docker_built_project' },
        ]
      },
      {
        text: '一些示例',
        items: [
          { text: 'mongodb使用示例', link: '/develop/examples/1_mongo' },
          { text: 'python基础知识点', link: '/develop/examples/2_python' },
        ]
      }
    ]
  },
  {
    text: '架构',
    items: [
      {
        text: '方法论',
        items: [
          { text: 'DDD', link: '/architecture/ddd_1_introduce' },
          { text: '面向复杂度的架构设计', link: '/architecture/complexity_oriented_1_introduce' },
        ]
      },
      {
        text: '工具',
        items: [
          { text: 'UML', link: '/architecture/tools_1_introduce' },
        ]
      }
    ]
  },
  {
    text: '数据库',
    items: [
      {
        text: 'NoSQL 数据库',
        items: [
          { text: 'redis 部署方式', link: '/database/nosql_1_redis_deploy' },
        ]
      }
    ]
  },
  {
    text: '个人成长',
    items: [
      {
        text: '樊登读书',
        items: [
          { text: '简介', link: '/growth/fandeng/' },
          { text: '心灵', link: '/growth/fandeng/mind_1_the_gift' },
          { text: '个人成长', link: '/waiting/' },
          { text: '亲子家庭', link: '/waiting/' },
          { text: '人文历史', link: '/waiting/' },
          { text: '商业财经', link: '/waiting/' },
          { text: '社科新知', link: '/waiting/' },
          { text: '健康生活', link: '/waiting/' },
        ]
      },
      {
        text: '文章收藏',
        items: [
          { text: '说明', link: '/growth/article/' },
        ]
      }
    ]
  },
  {
    text: '前端',
    items: [
      { text: 'vue实战', link: '/fontend/1_vue_action' },
      { text: '请求封装', link: '/fontend/2_cross_request' },
    ],
  },
  // { text: '数据库', link: '/database/' },
  // { text: '方法论', link: '/methodology/' },
  { text: '关于', link: '/about/' },
  {
    text: 'Github', link: 'https://github.com/muxicode/muxicode.github.io'
    // 下拉框的配置
    // items: [
    //     { text: 'Github', link: 'https://github.com/muxicode' }
    // ]
  }
]

module.exports = navs;