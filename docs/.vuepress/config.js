
const path = require('path')
const themeConfig = require('./configs/themeConfig');
const head = require('./configs/headConfig');
const markdown = require('./configs/markdownConfig');
const plugins = require('./configs/plugin'); // 导入插件配置,如:包括返回顶部,图片缩放,pwa等插件


module.exports = {
  name: "慕溪code",
  theme: '@vuepress/default',
  title: '慕溪code',
  description: '打造你的知识体系，深入原理真正掌握，让知识为你所用！',
  // web图片标
  head,
  themeConfig,
  // 目录导航的最大层级
  markdown,
  plugins,
}