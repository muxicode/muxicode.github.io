/*
 * @Description: 侧边栏主配置文件 主入口文件原本在config.js中,但从config.js中抽离到了themConfig.js中,该文件通过module.exports导出,在themeConfig.js中通过require的方式引入
 *
 * 将侧边栏放置在该文件中,集中进行管理
 */

const slidebar = {
  "/fontend/": require("../../fontend/sidebar"), // 头部/顶部前端的侧边栏
  "/wechat/": require("../../wechat/sidebar"), // 头部/顶部小程序
  "/interview/": require("../../interview/sidebar")
};

module.exports = slidebar;
