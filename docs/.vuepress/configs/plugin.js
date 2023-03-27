/**
 * @Description: 所有外部插件配置,入口在当前目录下config.js,本文件通过module.exports暴露,而在config.js中通过require方式引入
 * 集中管理外部插件配置
 *
 * 插件配置链接：
 * 1. 返回顶部插件:https://www.vuepress.cn/plugin/official/plugin-active-header-links.html#%E5%AE%89%E8%A3%85
 * [
    'music-bar', // vuepress-plugin-music-bar,音乐插件
    {
      playList: [],
      platform: [
        {
          name: 'music.163.com',
          songIDs: [
            // 歌曲ID,具体歌曲数值,可以前往网易音乐获取
            '1363948882',
            '1454730043',
            '1385646451',
            '1456270729',
            '1378945187',
            '1344897943',
            '1413585838',
          ],
          playListIDs: ['19723756', '3779629', '3778678'],
        },
      ],
      timeOut: 2000,
      firstClickPlay: true, // 首次点击自动播放
    },
  ],
 */
// const emojiMaps = require("./emojiMaps"); // 引入表情包
// const moment = require('moment'); // 引入moment.js  // 不要忘了安装 moment
// vuepress-plugin-table-of-contents 为你的 VuePress 站点增加目录组件,支持在md和vue中写<TOC />,生成目录树
// 引入密钥信息
// const secret = require('./secretKey'); 

const plugins = [
  [
    { globalUIComponents: ['LockArticle', 'PayArticle'] }
  ],
  ['@vuepress/medium-zoom', {
    selector: 'img:not(.nozoom)',
    // See: https://github.com/francoischalifour/medium-zoom#options
    options: {
      margin: 16
    }
  }],
  // '@vuepress/back-to-top', // 返回到到顶部插件
  // '@vuepress/nprogress', // 进度条插件
  // 'reading-progress', // 阅读进度插件
  // 'img-lazy', // 图片的懒加载
  'vuepress-plugin-baidu-autopush', // 注入百度url-auto-push脚本，以优化您的百度SEO网站
  'vuepress-plugin-smooth-scroll', // 你的 VuePress 站点中使用平滑滚动
  // 'vuepress-plugin-table-of-contents', 
  // 'element-ui', // 添加element-ui组件
  // 'flowchart', // 流程图表
  // 'demo-code', // 在线写demo
  // 'demo-block', // 在md中支持写vue,react,原生,以及j
  // 'vuepress-plugin-element-tabs', // tab切换
  // [
  //   '@vuepress/active-header-links',
  //   {
  //     // 页面滚动时自动激活侧边栏链接的插件配置
  //     sidebarLinkSelector: '.sidebar-link',
  //     headerAnchorSelector: '.header-anchor',
  //   },
  // ],

  // [
  //   {
  //     transformer: (timestamp) => {
  //       moment.locale('zh-cn');
  //       // return moment(timestamp).fromat('LLLL');
  //     },
  //   },
  // ],

  // [
  //   '@vuepress/medium-zoom',
  //   {
  //     selector: '.medium-zoom', // 指定含有medium-zoom的类缩放,后面这个类名可自定义,markdown中的img的class类保持一致就可以了的,没有指明的图片类将不支持缩放
  //     delay: 1000, // 延迟1秒
  //     options: {
  //       margin: 24,
  //       scrollOffset: 0,
  //     },
  //   },
  // ],

  // [
  //   '@vuepress/pwa', // 以@开头的都是官方维护的插件, pwa配置
  //   {
  //     serviceWorker: true, // 如果设置为 true，VuePress 将自动生成并注册一个 Service Worker，用于缓存页面的内容以供离线使用（仅会在生产环境中启用）
  //     updatePopup: {
  //       '/zh/': {
  //         message: '发现有新的内容更新,马上更新',
  //         buttonText: '刷新',
  //       },
  //     },
  //   },
  // ],

  // [
  //   'vuepress-plugin-comment', // valine留言插件
  //   {
  //     choosen: 'valine',
  //     // options选项中的所有参数，会传给Valine的配置,配置选项见文档:https://valine.js.org/configuration.html#appId
  //     options: {
  //       el: '#valine-vuepress-comment',
  //       appId: secret.appId, // 引入密钥appId
  //       appKey: secret.appKey, // 引入密钥appKey
  //       placeholder: '据说评论几句,结果会一鸣惊人~互相学习哈',
  //       path: `window.location.href`,
  //       avatar: 'robohash', // 非自定义头像
  //       meta: ['nick', 'mail'],
  //       requiredFields: ['nick', 'email'],
  //       pageSize: 10,
  //       visitor: true, // 对访问量进行统计
  //       // emojiCDN:
  //       //   "https://www.jsdelivr.com/package/gh/GamerNoTitle/ValineCDN?path=bilibilitv",
  //       // emojiMaps
  //     },
  //   },
  // ],
  // default、lowercase、uppercase、capitalize、camelcase、kebabcase、titlecase 自动生成侧边栏管理插件,如果使用这个插件后,就不必手动的去维护侧边栏了的,可以前往themeConfig.js中将slidebar去掉,交给这个插件去管理
  // 文档地址: https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/features/plugin-options.html#%E6%A6%82%E8%A7%88
  [
    'vuepress-plugin-auto-sidebar',
    {
      titleMode: 'titlecase', // 标题模式
      collapsable: {
        open: false
      }, // 设置为true,开启折叠
      sidebarDepth: 2, // 标题的深度
      collapseList: [
        // 折叠的路由列表
        "/golang/"
      ],
      uncollapseList: [
        // 不折叠的路由列表
      ],
    },
  ],
  // [
  //   {
  //     // 右边固定栏
  //     name: 'page-plugin',
  //     globalUIComponents: [
  //       'global-AttionFixed',
  //       'global-ToBottom',
  //       'global-RightBar',
  //       // 'global-Cat',
  //       'global-Copy',
  //       // 'global-AdvertiSpace',
  //     ],
  //   },
  // ],

  // [
  //   // 使VuePress站点支持简洁链接,而不是/xx.html
  //   'vuepress-plugin-clean-urls',
  //   {
  //     normalSuffix: '/',
  //     indexSuffix: '/',
  //     notFoundPath: '/404.html',
  //   },
  // ],

  // [
  //   'meting',
  //   {
  //     metingApi: 'https://api.injahow.cn/meting/',
  //     // metingApi: 'https://meting.sigure.xyz/api/music',
  //     meting: {
  //       //auto: 'https://music.163.com/#/playlist?id=784399723'
  //       // 网易
  //       server: 'netease',
  //       // 读取歌单
  //       type: 'playlist',
  //       mid: '784399723'
  //       // mid: '1300310,31654455,4022088,29717271,2061739,3934523,28263314,29577767,28949412,34749433,32102855,41630476,5042951,31010566,41630480,2061724,34690640,3935176,32526653,28283167',
  //     },
  //     // 不配置该项的话不会出现全局播放器
  //     aplayer: {
  //       // 是否开启吸底模式
  //       fixed: true,
  //       // 是否开启迷你模式
  //       mini: true,
  //       // 自动播放
  //       autoplay: false,
  //       // 设置播放器的初始循环模式
  //       loop: 'All',
  //       // 歌曲栏折叠
  //       listFolded: true,
  //       // 设置播放器默认主题颜色
  //       theme: '#42b983',
  //       // 播放顺序为随机
  //       order: 'list',
  //       // 初始音量
  //       volume: 0.1,
  //       // 关闭歌词显示
  //       lrcType: 0,
  //     },
  //     mobile: {
  //       // 手机端去掉cover图
  //       cover: false,
  //     },
  //   },
  // ],
  // ["vuepress-plugin-toolbar",
  //   {
  //     'pageNav': {
  //       name: '导航'
  //     },
  //     "opts": [
  //       {
  //         "icon": "svg-wechart",
  //         "name": "技术圈",
  //         popover: {
  //           title: '回复 “加入技术群” 加入技术交流群，找到更多小伙伴',
  //           type: 'image',
  //           imageUrl: '/README.assets/image-20230301215153246.png',
  //         }
  //       },
  //       {
  //         "icon": "svg-support",
  //         "name": "支持我",
  //         popover: {
  //           title: '您的鼓励是我前进的动力,能得到您的支持是我最开心的事情',
  //           type: 'image',
  //           imageUrl: '/README.assets/image-20230301215153246.png',
  //         }
  //       },
  //       {
  //         "icon": "svg-course",
  //         "name": "视频课程",
  //         popover: {
  //           title: '回复 “视频课程” 免费提供技术视频资源',
  //           type: 'image',
  //           imageUrl: '/README.assets/image-20230301215153246.png',
  //         }
  //       }
  //     ]
  //   }
  // ]
];

module.exports = plugins; // 导出