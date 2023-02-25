

const themeConfig = require('./configs/themeConfig');
const headConfig = require('./configs/headConfig');
const markdownConfig = require('./configs/markdownConfig');


module.exports = {
  name: "慕溪code",
  title: '慕溪 x go全栈知识体系',
  description: '包含: go 基础, go 部分源码, python, 数据库原理, MySQL, ElasticSearch, MongoDB,  Docker,  Linux, 分布式, 中间件, 开发工具,读书笔记, 开源项目...',
  // web图片标
  headConfig,
  themeConfig,
  // 目录导航的最大层级
  markdownConfig
}