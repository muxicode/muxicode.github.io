/*
 * @Description:本文件为markdown的相关配置,该文件通过module.exports方式导出,在config.js主入口中通过require方式引入
 */

const markdownConfig = {
  lineNumbers: true, // 显示代码块行号
  extractHeaders: ["h1", "h2", "h3"] // VuePress默认只会提取h2和h3标题,你可以通过这个选项来修改提取出的标题级别,分别支持h1~h6
};

module.exports = markdownConfig;