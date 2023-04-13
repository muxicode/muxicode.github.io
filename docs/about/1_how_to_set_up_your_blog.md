---
title: 如何搭建你的博客?
---

# 知识体系数字化

程序员如何做副业💸？网上的各种答案琳琅满目，比如：八戒网接单、淘宝店、二手交易平台、抖音电商是热门，跨境电商更是赚钱利器！还有抖音快手的创作号，等等，但其实都和程序员不太相关，而且所做的事，看起来对你目前的工作没有什么帮助。

看过[精益副业](http://r.ftqq.com/lean-side-bussiness/index.html)后，这是一本关于程序员如何优雅的做副业的书，其中有介绍到一些优雅的副业，如下：

- 👉写作出书
- 👉个人独立开发
- 👉开发网课
- 👉建立付费社群
- ...

想要优雅的做副业，赚点外快，提升自己，你是不是也有这样的想法呢？😍

👉但是，做副业也不是那么容易的事情，你需要注意以下两个要点：

- 时间是你最宝贵的资源，你要合理安排好你的时间片，不要让副业影响了你的主业和生活。🕒
- 你要找到你的核心优势，做好你擅长和喜欢的事情，不要盲目跟风或者做自己不熟悉的领域。💪

👉如果你想了解更多关于做副业的干货和技巧，你可以点击下面的链接，看看大神们是怎么做的：

- [副业的核心资源](http://r.ftqq.com/lean-side-bussiness/020101.html)
- [副业的核心优势](http://r.ftqq.com/lean-side-bussiness/020102.html)

## 经典案例

### 相关博客

- 👉小林coding
- 👉代码随想录
- 👉冰河技术
- 👉Java 全栈知识体系
- 👉川川的博客

### 相关优势：

- 👉内容有核心竞争力
- 👉专注于细分领域
- 👉与工作息息相关，时间片利用率很高
- 👉可持续演进

### 核心价值

- 提供高质量的知识
- 知识的可理解性高，节省读者大量时间

是否有读者，取决于你为读者创造了什么价值，可以先开始积累，因为我们是可演进的，但是一定需要思考的问题是，我们的核心价值是什么？读者为什么会想读你写的博客。

有时我们认为价值与读者感受到的价值是不一致，我们需要得到反馈，即时调整。这也是敏捷思维在软件中的应用。

### 目标人群

- 学生
- it工作人员

由于博客的特殊性，一般以知识传递为主，我们的内容一般与it行业相关，受众也是计算机相关的专业，或者是准备转行的人员，以及相关的it工作者。

这些人群一般都是有知识付费的习惯的，所以我们需要保证知识的可理解，以及知识价值，那么我们只需要一个契机，就能留住读者。

## 打造你的知识库！

### 你知道vuepress吗？👀

vuepress是一个由Vue驱动的静态网站生成器，可以让你用Markdown写出漂亮的网站和文档。👏

#### 为什么要用vuepress？🤔

1. 简洁至上：你只需要专注于写作，vuepress会帮你生成高性能的静态网站，无需复杂的配置。👌
2. Vue 驱动：你可以在 Markdown 中使用 Vue 组件，也可以用 Vue 来开发自定义主题，享受 Vue 的开发体验。👍
3. 主题和插件：vuepress提供了一个开箱即用的默认主题，也有很多社区主题和插件可供选择，让你的网站更加个性化和功能化。👏
4. 打包工具：vuepress支持 Vite 和 Webpack 两种打包工具，你可以根据自己的喜好和需求来选择。👌

#### 怎么用vuepress？😊

使用vuepress非常简单，只需要三步：

1. 安装 vuepress：`yarn global add vuepress` 或者 `npm install -g vuepress`
2. 新建一个 markdown 文件：`echo '# Hello VuePress!' > README.md`
3. 开始写作：`vuepress dev .`

就这么简单，你就可以用 vuepress 来创建你的第一个网站了！🎉

如果你想了解更多关于 vuepress 的信息，可以访问[官方网站]()。

如果只想搭建静态网站生成器，仅需要一些基础功能及和插件，类似作者的博客一些基本功能，如侧边栏，以及导航。那么请直接上车，作者直接带你上高速！！！

### 坐稳了，上高速了

#### 快速下载代码

点击本站顶部导航栏的 github 连接快速下载代码~，冲冲冲

![](/1_how_to_set_up_your_blog.assets/get_code.drawio.png)

#### 安装npm及配置源

下载完代码后，如果想要启动，需要本地有npm，具体的安装参考[Node.js安装，配置npm源](https://www.cnblogs.com/xianshen/p/15695453.html)]

node版本: [v16.13.1](https://nodejs.org/dist/v16.13.1/)，windows下载 node-v16.13.1-x64.msi

npm 版本：8.1.2

> 注意
>
> node版本不能过高，有些包不兼容，尽量与当前项目的版本保持一致
>
> npm 初始的源默认是国外的，最好修改为国内镜像
>
> 如果版本不同，且启动失败，请先[卸载当前版本的node](https://blog.csdn.net/weixin_43933259/article/details/127575166)，重新安装

#### 直接启动

npm安装配置好后，可以在项目根目录，执行下面指令，安装项目的依赖包

```shell
npm install
```

> npm install 报错原因类似：124 vulnerabilities (1 low, 46 moderate, 74 high, 3 critical)
>
> 继续执行：npm audit fix --force，执行后，直接启动项目即可

执行以下命令，启动项目

```shell
npm run docs:dev
```

正常启动后，访问http://localhost:8080，查看项目是否正常启动，正常启动后，则可以看到本站主页。

> 注意
>
> vuepress 的默认服务启动端口是 8080，如果你想修改端口号，有以方法：
>
> 修改 .vuepress/config.js 配置文件，新增 port 属性，比如 port: ‘8099’

### 重要映射

#### 顶部导航栏配置

顶部的导航文字与文件的内容映射关系如下：

![](/1_how_to_set_up_your_blog.assets/nav_config.drawio.png)

其中link字段是指向要跳转的页面，注意以下几点即可。

- 如果需要导航至markdown文件，文件的.md后缀可以省略

- link路径，使用相对路径

  - 导航至关于页面

    ![](/1_how_to_set_up_your_blog.assets/show_path.drawio.png)

    配置link示例：link: "/about/"

    说明：当路径最后由 “/” 结束的时候，默认导航到该路径下的README.md文件

  - 导航算法的文章

    ![](/1_how_to_set_up_your_blog.assets/path_algorithm.drawio.png)

    配置link示例：link: "/algorithm/actual4_part_one_4_wordsearch"

    说明：当路径最后是以.md文件为结尾的时候.md可以省略

#### 左侧导航栏插件

由于我们只想要高效的编辑文档，我们不想关心左侧的内容展示，于是当前项目已安装插件，以下只对使用进行说明。

本站中，算法专栏的页面示例，左侧是侧边栏，可直接跳转：

![](/1_how_to_set_up_your_blog.assets/left_sidebar.drawio.png)

该侧边栏是自动生产的，如果想自动生成侧边栏，并且对其中一些内容进行归类，则需要满足以下条件：

- 将文件都放在一个目录下

- 归类需要在.md文件头部声明以下内容

  ![](/1_how_to_set_up_your_blog.assets/left_sidebar_title.drawio.png)

#### 右侧导航栏配置

右侧导航栏作为主题插件由，vue开发，如何进行小修改，或者新增栏目，可修改如下的配置文件：muxicode.github.io-main/docs/.vuepress/theme/components/PageSidebar.vue

以下仅以一个配置块说明：

![](/1_how_to_set_up_your_blog.assets/page_sidebar.drawio.png)



```html
<div class="option-box" v-on:mouseover="showToc($event)" v-on:mouseout="hideToc($event)">
    	<!-- src="/pagesidebar/phone.png" 指向手机的小图标 -->
        <img src="/pagesidebar/phone.png" class="nozoom" />
        <span class="show-txt">手机看</span>
        <div class="toc-container">
          <div class="pos-box">
            <div class="icon-arrow"></div>
            <div class="scroll-box" style="text-align:center">
              <span style="font-size:0.9rem">微信扫一扫</span>
              <!-- 以下是生产二维码的代码，需要修改为自己的域名 -->
              <img
                v-bind="{ src: 'https://api.qrserver.com/v1/create-qr-code/?data=https://muxicode.github.io' + this.$route.fullPath }"
                height="180px" style="margin:10px;" />
              <!-- 以下是一些描述 -->
              可以<b>手机看</b>或分享至<b>朋友圈</b>
            </div>
          </div>
        </div>
      </div>
```

### 静态文件

作为静态文件资源网站，我们还将需要引用一些静态文件，这些静态文件都应放在`muxicode.github.io-main/docs/.vuepress/public`目录下。

#### 引用图片

假设我们在已经将图片 `xxx.png` 放到路径：`muxicode.github.io-main/docs/.vuepress/public/images/xxx.png`中，此时我们在引用路径时，可以直接使用相对路径，当服务启动后，可以则可以正确展示图片。

以 `html`引用图片`xxx.png`做以为一个示例，其他类型的超链接引用同理

```html
<img src="/images/xxx.png`"/>
```

#### 引用css

处理方式同图片，引用css示例如下：

```html
<link rel="stylesheet" href="/css/yyy.css">
```

## 项目部署

### 使用github部署项目

#### 基本使用

👉你有没有想过，用GitHub来搭建自己的个人网站，展示自己的项目或者博客呢？😍

👉其实，这并不难，只要用到一个超级神器，就是GitHub Pages！它可以帮你把GitHub上的仓库直接变成一个静态网站，无需服务器或者数据库，简单又方便！👏

👉那么，怎么样才能用GitHub Pages搭建自己的网站呢？🤔

👉其实，只要按照以下几个步骤，就可以轻松实现了：

- 第一步：创建一个仓库。如果你想要创建一个用户或者组织的网站，就要把仓库命名为{username}.github.io，其中{username}是你的用户名或者组织名。如果你想要创建一个项目的网站，就要把仓库命名为你的项目名，并且在设置里开启GitHub Pages功能。
- 第二步：添加一个index.html文件。这个文件就是你网站的首页，你可以用HTML、CSS、JavaScript等语言来编写你想要的内容和样式。你也可以用一些静态网站生成器，比如Jekyll，来帮你生成网站的模板和内容。
- 第三步：推送你的改动。当你完成了你的index.html文件，或者其他文件，就可以把它们推送到GitHub上的仓库里。如果你用的是用户或者组织的网站，就推送到main分支；如果你用的是项目的网站，就推送到gh-pages分支或者其他你指定的分支。
- 第四步：访问你的网站。当你推送完毕后，就可以在浏览器里输入https://{username}.github.io或者https://{username}.github.io/{repository}来访问你的网站了。如果一切正常，你就可以看到你刚刚编写的网站内容了。

#### 拷贝并部署

当前项目已经装好了插件，你只需做以下三步即可快速部署你的个人博客

- 👉 拷贝当前项目的所有文件到你新建的仓储下

- 👉 将代码直接提交

- 👉 `npm install`安装项目依赖

- 👉 `npm run deploy:build` 该命令将项目构建，并使用插件将构建文件添加到 gh-pages 分支

- 👉  修改你想展示个人页面的分支到 gh-pages

  ![](/1_how_to_set_up_your_blog.assets/pages_setting.drawio.png)

执行完所有操作后，大约10分钟左右你就可以访问你自己的博客啦！😭

### 使用gitee部署项目

你也可以使用国内 gitee 来部署你的个人博客，速度及稳定性会比 github 高一些。

因为步骤差不多，这里就不作说明啦~👏

## 编辑技巧

### 插入表情包

👉写文章的时候，你是不是也会遇到这样的问题：要介绍一些基础概念，但是又怕读者觉得无聊或者跳过呢？😭

👉其实，现在有一个超级神器，就是Chatgpt！它可以帮你自动生成一些基础概念的介绍，省时省力又高效！👏

👉但是，怎么样才能让这些介绍看起来更有趣生动呢？🤔

👉其实，只要注意以下几点，就可以让你的文章更吸引人了：

- 用一些生活化的例子或者比喻来解释基础概念，让读者更容易理解和记住。
- 用一些有趣的语气或者词汇来表达你的观点或者感受，让读者感受到你的热情和幽默。
- 用一些图片或者表情符号来增加文章的视觉效果和情感表达，让读者更有代入感和互动感。

直接上秘诀：

1. 预热让 ChartGpt 进入状态

   ![](/1_how_to_set_up_your_blog.assets/gpt_预热.drawio.png)

2. 生产你需要的内容，以下仅简单示例，可根据提示词生成更精确的内容

   ![](/1_how_to_set_up_your_blog.assets/gen_content.drawio.png)

### 提效脚本

问题： markdown中的网络图片想引用，想直接将图片放到pulic文件夹中，防止网络中的图片丢失，如何提高生产力？

1. markdown 的偏好设置中，有一个选项，位置如下：文件 > 偏好设置 > 图像 > 对网络位置的图片应用以上规则
2. 设置规则将网路图片下载到本地指定路径，比如可以直接指定我们的项目的public文件夹
3. 最后使用脚本将绝对路径刷成相对路径，即可将网络图片转移至静态目录。

### 订阅号同步

使用微信订阅号文章工具直接将md文件转化为订阅号文章，直接发布订阅号

## 寻找趣味

稻盛和夫说：要想度过一个充实的人生，只有两种选择：一种是“从事自己喜欢的工作”，另一种是“让自己喜欢上工作”。

反思自己，你是否经常将工作和生活对立？或者干脆把工作和自己对立？提起工作，总是带着点“不得不”的意味？

把赚钱看作工作的唯一目的，未免有点太过短视。事实上，工作能够带给你的东西，远比赚钱更重要。

> 不同的观点有不一样的动作

工作对于你而言，意味着什么？是赚钱的工具？还是获得自己想要生活的手段？

很多人认为工作的意义无非是赚钱而已。

他们把工作视为人生中的“必要之恶”，将工作和生活对立起来，认为工作是工作，生活是生活；

抱着“拿多少钱干多少事”的态度，不是自己的工作绝不多干，加班的事情能避免就避免。

六点钟下班，他们五点五十就开始收拾东西。



而与之相反，有那么一小撮人，他们身上有很多常人无法理解的行为：

● 办公室里最后一个走的总是他；

● 常常喜欢去参加其他部门的营销会议，总喜欢“没事找事”；

● 周末的时候也不肯老老实实歇着，看到什么值得学习的文章就会甩到工作群里......

> 《干法》

你想要每天过得有意义吗？可以，热爱你的工作。

你想要成功吗？可以，热爱你的工作。

你想要获得幸福吗？可以，热爱你的工作。

[文章链接:人为什么要热爱工作，这是我听过最好的答案]([人为什么要热爱工作，这是我听过最好的答案|界面新闻 (jiemian.com)](https://www.jiemian.com/article/2470886.html))