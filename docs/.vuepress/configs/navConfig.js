/*
 * @Description: 头部navs导航配置文件,入口文件原本在config.js文件中,但抽离到了themeConfig.js中,该文件通过module.exports导出,在themeConfig.js中通过require方式引入
 * 集中配置管理头部nav导航栏
 * @docs: https://vuepress.docschina.org/default-theme-config/#%E5%AF%BC%E8%88%AA%E6%A0%8F-navbar
 */

const navs = [
  { text: '首页', link: '/' },
  { text: '导航', link: '/navigation/' },
  {
    text: '深入理解Golang', link: '/golang/',
    // items: [
    //   { text: '数据结构', link: '/golang/struct' },
    //   { text: '协程', link: '/golang/routine' },
    //   { text: '并发锁', link: '/golang/lock' },
    //   { text: '管道', link: '/golang/channel' },
    //   { text: '网络编程', link: '/golang/network' },
    //   { text: '垃圾回收', link: '/golang/gc' },
    //   { text: '其他高级特性', link: '/golang/features' },
    // ],
  },
  {
    text: '数据结构与算法',
    items: [
      {
        text: '基础',
        items: [
          { text: '二进制', link: '/algorithm/base/binary' },
          { text: '线性结构', link: '/algorithm/base/linearstructure' },
          { text: '非线性结构', link: '/algorithm/nonlinearstructure' },
        ]
      },
      {
        text: '进阶',
        items: [
          { text: '图', link: '/algorithm/forward/graph' },
          { text: '线段树', link: '/algorithm/forward/sagement' },
          { text: '并查集', link: '/algorithm/forward/uionset' },
          { text: '有序表', link: '/algorithm/forward/ordertable' },
          { text: '字典树', link: '/algorithm/forward/tiretree' },
          { text: 'bfprt', link: '/algorithm/forward/bfprt' },
          { text: 'kmp', link: '/algorithm/forward/kmp' },
          { text: 'manacher', link: '/algorithm/forward/manacher' },
        ]
      },
      {
        text: '动态规划',
        items: [
          { text: '暴力递归', link: '/algorithm/recursion/' },
          { text: '记忆化搜索', link: '/algorithm/remenber/' },
          { text: '动态规划', link: '/algorithm/dp/' },
        ]
      },
      {
        text: '实战篇',
        link: '/algorithm/actual/',
        items: [
          { text: '阶段一', link: '/algorithm/actual1/' },
          { text: '阶段二', link: '/algorithm/actual2/' },
          { text: '阶段三', link: '/algorithm/actual3/' },
          { text: '阶段四', link: '/algorithm/actual4/' },
        ]
      },
    ],
  },
  { text: '架构', link: '/architecture/' },
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
    text: 'Github', link: 'https://github.com/muxicode'
    // 下拉框的配置
    // items: [
    //     { text: 'Github', link: 'https://github.com/muxicode' }
    // ]
  }
]

module.exports = navs;