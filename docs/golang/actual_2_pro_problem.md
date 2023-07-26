---
title: 问题定位
autoGroup-5: 实战
---

# 问题定位

在生产环境下，因为一些权限限制，我们定位起来会比较麻烦，因为获取不到

- panic日志
- 内存泄漏
- 捕获类型错误



## panic日志

### 重定向日志到文件

当Go程序发生panic时，相关的信息将被重定向到指定的文件。

关于是否追加写入，取决于你使用的重定向方式。在上述例子中，我们使用的是`2>`来重定向标准错误流（stderr），这种方式会将panic信息写入文件，并且每次运行程序时会覆盖之前的内容。也就是说，每次执行程序时，如果文件`panic.log`已经存在，那么它的内容会被新的panic信息所替代。

如果你希望将panic信息追加到文件末尾而不是覆盖之前的内容，你可以使用`2>>`重定向方式。例如：

```bash
./my_go_program 2>> panic.log
```

使用`2>>`会将panic信息追加到`panic.log`文件的末尾，这样多次运行程序时，日志信息会持续累积在文件中。

总结：

- `2>`：覆盖写入文件，每次运行程序时日志会被替代。
- `2>>`：追加写入文件，每次运行程序时日志会被累积。

### 容器卷映射

如果是在容器中，如果未配置容器卷的映射，则程序发生崩溃时，文件也会丢失，所以需要配置容器卷，实现错误日志的持久化。

该种方式还需要使用追加写入的方式，否则服务崩溃后重新启动会清空日志文件内容。

> 注意目录映射

目录映射有两种方式

- 以容器内的数据为准
- 以持久化的位置为准

由于需要保存异常日志，在容器初始状态下，没有异常日志，所以应该选择 `以持久化的位置为准` 的方式。

```bash
docker run -d -v /host_data:/container_data my_image
# -v  主机路径放在前面则以主机的持久化位置为准，反过来放则为容器内数据为准
```

> 映射路径

如果我们直接将日志与执行文件做映射，这种方式会将我们的持久化盘将我们的服务执行文件覆盖，所以需要将日志与可执行文件路径上进行区分

在`dockerfile`中创建存放目录的文件，可以使用如下方式：

```dockerfile
FROM 10.7.213.183:5000/python2.7-mte-basic
WORKDIR /app
copy . /app
RUN mkdir panicLog
RUN echo "Asia/Shanghai" > /etc/timezone
CMD /bin/sh

CMD ["bash", "start.sh"]
```

启动文件`start.sh`如下所示:

```bash
#!/bin/bash

./app 2>>./panicLog/panic.log
```

`app`为我们打包好的`go`的二进制文件，`2>>./panicLog/panic.log`为追加写入异常日志的参数，会将异常日志写入到当前文件夹下`panicLog`文件夹内的`panic.log`文件内。

## 内存泄漏

### gin开启pprof

以下代码示例了在`gin`中如何启用`pprof`的功能，可以根据自身需要进行修改应用于项目当中。

```go
package main

import (
	"github.com/gin-contrib/pprof"
	"github.com/gin-gonic/gin"
)

func main(){
    // 初始化gin
	router := gin.New()
    
    // gin开启pprof功能
    pprof.Register(router, "{app name}/debug/pprof") // 后面为可选参数，可自定义可用于使用了nignix转发的场景
    
    // 省略注册路由
    
    // 启动服务
    if err := router.Run(":8080"); err != nil {
		logger.Panicf("start server fail:", err.Error())
	}
}
```

### 使用命令行查看

开启之后，我们可以使用浏览器访问`http://localhsot:8080/{app name}/debug/pprof`，可以看到如下界面（以下图片未修改路由配置）：

![image](/actual_2_pro_problem.assets/ppof_2.drawio.png)

当我们可以访问该界面的时候，证明我们已经开启成功了。接下来可以打开我们的命令行定位内存泄漏的问题。以下给出一个定位问题的例子，在我们的程序中可以参照以下步骤找到问题代码，将其修改即可。

我们在终端使用 `pprof` 命令，注意这次使用的 `URL` 的结尾是 `heap`：

```bash
go tool pprof http://localhost:8080/{app name}/debug/pprof/heap
```

使用 `top`、`list` 来定问问题代码：

![](/actual_2_pro_problem.assets/pprof_9.drawio.png)

可以看到这次出问题的地方在 `github.com/wolfogre/go-pprof-practice/animal/muridae/mouse.(*Mouse).Steal`，函数内容如下：

```go
func (m *Mouse) Steal() {
	log.Println(m.Name(), "steal")
	max := constant.Gi
	for len(m.buffer) * constant.Mi < max {
		m.buffer = append(m.buffer, [constant.Mi]byte{})
	}
}
```

可以看到，这里有个循环会一直向 m.buffer 里追加长度为 1 MiB 的数组，直到总容量到达 1 GiB 为止，且一直不释放这些内存，这就难怪会有这么高的内存占用了。

使用 `web` 来查看图形化展示，可以再次确认问题确实出在这里：

![image](/actual_2_pro_problem.assets/pprof_10.drawio.png)



## 捕获类型错误

对于未引发程序异常的日志，我们通常做法时使用日志文件记录，但是产线环境的一般情况下我们不能直接远程拿到日志。

此时引入日志中心，日志中心是一个日志平台，方便我们实时查看日志。我们可以将我们的日志模块做一层封装，在记录异常日志的同时，将我们的日志上报到日志中心。

将我们的日志模块进行封装，在记录异常日志的同时，需要上报日志中心，这样我们定位的时候就可以先看看日志中心是否存在相关的异常日志，从而加快问题的定位。