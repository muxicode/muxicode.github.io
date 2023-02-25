/*
 * @Description: 头部navs导航配置文件,入口文件原本在config.js文件中,但抽离到了themeConfig.js中,该文件通过module.exports导出,在themeConfig.js中通过require方式引入
 * 集中配置管理头部nav导航栏
 * @docs: https://vuepress.docschina.org/default-theme-config/#%E5%AF%BC%E8%88%AA%E6%A0%8F-navbar
 */

const navs = [
  { text: '首页', link: '/' },
  { text: 'Golang',
    items: [
      { text: '数据结构', link: '/golang/struct' },
      { text: '协程', link: '/golang/routine' },
      { text: '并发锁', link: '/golang/lock' },
      { text: '管道', link: '/golang/channel' },
      { text: '网络编程', link: '/golang/network' },
      { text: '垃圾回收', link: '/golang/gc' },
      { text: '其他高级特性', link: '/golang/features' },
    ],
  },
  {
    text: '前端',
    items: [
      { text: 'CSS', link: '/fontend/css/' },
      { text: 'JavaScript', link: '/fontend/js/' },
      { text: '前端框架', link: '/fontend/framework/' },
      { text: '前端算法', link: '/fontend/rsa/' },
      { text: '开发工具', link: '/fontend/tools/' },
      { text: '网址收藏', link: '/fontend/websitecol/' },
    ],
  },
  { text: '算法', link: '/algorithm/' },
  { text: '数据库', link: '/database/' },
  { text: '架构', link: '/architecture/' },
  { text: '方法论', link: '/methodology/' },
  { text: '关于', link: '/about/' },
  { text: 'Github', link: 'https://github.com/muxicode'
      // 下拉框的配置
      // items: [
      //     { text: 'Github', link: 'https://github.com/muxicode' }
      // ]
  }
]

module.exports = navs;