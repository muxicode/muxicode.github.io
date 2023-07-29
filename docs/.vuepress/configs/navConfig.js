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
      { text: 'handler路由树', link: '/web/6_filter' },
      { text: '并发编程', link: '/waiting/' },
      { text: '文件操作', link: '/waiting/' },
      { text: '泛型', link: '/waiting/' },
    ],
  },
  {
    text: '数据结构与算法',
    items: [
      {
        text: '基础',
        items: [
          { text: '初识算法', link: '/algorithm/' },
          { text: '二进制', link: '/algorithm/base_1_binary_0_binary' },
          { text: '排序', link: '/algorithm/base_5_line_code01_select_sort' },
          { text: '并查集', link: '/algorithm/base_8_union_set_1' },
          { text: '堆', link: '/algorithm/base_9_heap' },
          { text: '其他', link: '/algorithm/base_nonline_code01_sum_of_factorial' },
        ]
      },
      {
        text: '进阶',
        items: [
          { text: 'kmp', link: '/algorithm/advance_1_kmp_1' },
          { text: '堆', link: '/waiting/' },
          { text: '并查集', link: '/waiting/' },
          { text: '图', link: '/algorithm/advance_2_graph_1_base' },
          { text: '线段树', link: '/waiting/' },
          { text: '有序表', link: '/waiting/' },
          { text: '字典树', link: '/waiting/' },
          { text: 'bfprt', link: '/waiting/' },
          { text: 'manacher', link: '/waiting/' },
          // { text: '图', link: '/algorithm/forward/graph' },
          // { text: '线段树', link: '/algorithm/forward/sagement' },
          // { text: '并查集', link: '/algorithm/forward/uionset' },
          // { text: '有序表', link: '/algorithm/forward/ordertable' },
          // { text: '字典树', link: '/algorithm/forward/tiretree' },
          // { text: 'bfprt', link: '/algorithm/forward/bfprt' },
          // { text: 'kmp', link: '/algorithm/forward/kmp' },
          // { text: 'manacher', link: '/algorithm/forward/manacher' },
        ]
      },
      {
        text: '动态规划',
        items: [
          { text: '暴力递归', link: '/waiting/' },
          { text: '记忆化搜索', link: '/waiting/' },
          { text: '动态规划', link: '/waiting/' },
        ]
      },
      {
        text: '实战篇',
        items: [
          { text: '阶段一', link: '/waiting/' },
          { text: '阶段二', link: '/waiting/' },
          { text: '阶段三', link: '/waiting/' },
          { text: '阶段四', link: '/algorithm/actual4_part_one_1_longest_increasing_path' },
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
  // {
  //   text: '前端',
  //   items: [
  //     { text: 'CSS', link: '/fontend/css/' },
  //     { text: 'JavaScript', link: '/fontend/js/' },
  //     { text: '前端框架', link: '/fontend/framework/' },
  //     { text: '前端算法', link: '/fontend/rsa/' },
  //     { text: '开发工具', link: '/fontend/tools/' },
  //     { text: '网址收藏', link: '/fontend/websitecol/' },
  //   ],
  // },
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