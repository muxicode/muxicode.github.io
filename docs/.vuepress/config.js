module.exports = {
  title: 'muxicode',
  description: 'muxicode 知识库',
  themeConfig: {
    // 导航栏
    nav: [
        { text: '首页', link: '/' },
        { 
            text: 'muxicode 博客', 
            items: [
                { text: 'Github', link: 'https://github.com/muxicode' },
                { text: 'CSDN', link: 'https://blog.csdn.net/weixin_44155115' }
            ]
        }
    ],
    // 侧边栏配置
    sidebar: [
      {
          title: '导航栏',
          path: '/',
          collapsable: false, // 不折叠
          children: [
              { title: "学前必读", path: "/" }
          ]
      },
      {
          title: "文章导航",
          path: '/note/Python 设计模式', // 默认激活的选项
          collapsable: false, // 不折叠
          children: [
              { title: "python设计模式", path: "/note/Python 设计模式" },
              { title: "mogodb实践文档", path: "/note/MongoDb 示例代码" }
          ],
      }
  ]
  }
}