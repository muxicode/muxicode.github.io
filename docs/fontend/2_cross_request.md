# Axios 解决跨域问题

## 1. 配置跨域代理

> 修改根目录下 vue.config.js

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      // 配置解析的路径别名，方便引用文件
      alias: {
        // 配置别名 默认配置中有 src: @ , 以下的配置可以直接使用
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'store': '@/store',
        'utility': '@/utility'
      }
    }
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: { //配置跨域
      '/devapi': {
        target: 'https://xxxx.xxx.xxx.com.cn', //填写请求的目标地址
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/devapi': '' //请求的时候使用这个devapi就可以
        },
      },
      '/testapi': {
        target: 'https://ccccc.cccc.cc.com.cn', //填写请求的目标地址
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/testapi': '' //请求的时候使用这个testapi就可以
        },
      },
      '/prodapi': {
        target: 'https://dddddd.ddd.com.cn', //填写请求的目标地址
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/prodapi': '' //请求的时候使用这个prodapi就可以
        },
      }
    }
  }
})
```

## 2. 封装axios请求

> 2.1 src/network/network.js

```js
import axios from 'axios'


export function request(options, baseUrl) {
  return new Promise((resolve, reject) => {
    // 根据环境配置代理
    switch (baseUrl) {
      // 根据环境选代理，这里建议抽到constv文件
      case 'https://devtyy.rdc.zte.com.cn':
        baseUrl = '/devapi'
        break
      case 'https://testty.rdc.zte.com.cn':
        baseUrl = '/testapi'
        break
      case 'https://rdcloud.zte.com.cn':
        baseUrl = '/prodapi'
        break
      default:
        baseUrl = baseUrl
    }
    // 1. 创建axios实例
    const instance = axios.create({
      baseURL: baseUrl,
      timeout: 5000
    })

  // request 拦截器
  // 可以自请求发送前对请求做一些处理
  // 比如统一加token，对请求参数统一加密
  instance.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // config.headers['token'] = user.token;  // 设置请求头
      return config
    }, error => {
      return Promise.reject(error)
    });


    // 2. 过滤器拦截
    instance.interceptors.response.use(res => {
      return res.data
    })


    // 3. 通过实例发送网络请求
    instance(options)
        .then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
    })
  })
}
```

> 2.2 src/network/home.js

```js
import {request} from './network'

export function getNodeData(gerritUrl, branch, env){
  return request({
    url: '/sourse/api/v1/dir1/dir2',
    method: 'POST',
    data: {
        'gerritUrl': gerritUrl,
        'branch': branch
    }
  }, env)
}
```

## 3. 调用接口

> 调用示例

```js
import { getNodeData } from 'network/home.js'


getNodeData(this.gerritUrl, this.branch, this.env).then(res => {
    this.$emit("GetInitData", res)
})
```