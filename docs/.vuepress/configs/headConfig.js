/*
 * @Description:头部html中head需要引入的标签,当前文件通过module.exports导出,在config.js主入口文件中通过require导入
 */


const headConfig = [
  ['link', { rel: 'icon', href: '/waterbee.svg' }],
  [
    'meta',
    {
      rel: 'keywords',
      content:
        '慕溪随笔,muxiCode,muxiCode的技术博客,前端开发,IT技术,网络技术,斜杠青年',
    },
  ],
  [
    'meta', // 移动端禁止用户缩放
    {
      name: 'viewport',
      content:
        'width=device-width,width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
    },
  ],
  [
    'meta', // 添加谷歌站点搜素
    {
      async: 'async',
      name: 'google-site-verification',
      content: 'Lp5bo-dr1R5gCVE_3iUI6KXr8tNhN5pyUxPYYKCZkO4',
    },
  ]
]

module.exports = headConfig;