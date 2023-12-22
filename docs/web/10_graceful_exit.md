---
title: 服务优雅退出
autoGroup-1: web基础封装
---

# 服务优雅退出

![](/10_graceful_exit.assets/graceful_exist.drawio.png)

服务器难免要遇到重启、升级的问题，那么当我们的服务器关闭的时候，我们需要考虑：

0. 摘掉流量（告诉负载均衡，不要再打流量过来了）
1. 拒绝新的请求

1. 等待当前的所有请求处理完毕
2. 释放资源
3. 关闭服务器
4. 如果这中间超时了，我们要强制关闭了（再次收到关闭请求，就强制退出--方式多用户可能滥用）

[参考gitee仓储实践章节](https://gitee.com/add-ice-ice/web-server-go/tree/master/web/12_graceful_exit)

## 监听退出信号

我怎么知道要关闭了这件事?

- 监听退出信号，提供超时退出机制

```go
package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	waitForShutdown()
}

var (
	// ShutdownSignals receives shutdown signals to process
	ShutdownSignals = []os.Signal{
		os.Interrupt, os.Kill, syscall.SIGKILL,
		syscall.SIGHUP, syscall.SIGINT, syscall.SIGQUIT, syscall.SIGILL, syscall.SIGTRAP,
		syscall.SIGABRT, syscall.SIGTERM,
	}
)

func waitForShutdown() {
	signals := make(chan os.Signal, 1)
	signal.Notify(signals, ShutdownSignals...)
	select {
		case <-signals:
			fmt.Println("receive signal start shutdown!")
			go func() { // 超时被动强制退出
				time.After(60*time.Second)
				os.Exit(1)
			}()
			os.Exit(1) // 主动退出
	}
}
```

## HOOK接口

我们实现了退出的机制，但是并不完全满足我们的要求，因为我们希望等待关闭的时候它能够

- 拒绝新的请求
- 等待旧的请求
- 释放资源
- ...

最好服务退出的时候是可以注册钩子函数，这样可以根据我们自身的需要，添加hook函数即可。

代码实现：

- hook接口
- hook构造

```go
var ErrorHookTimeout = errors.New("the hook timeout")

// Hook 是一个钩子函数。 注意
// ctx 是一个有超时机制的 context.Context
// 所以你必须处理超时问题
type Hook func(ctx context.Context) error

// BuildCloseServeHook 这里其实可以考虑使用 errgroup，
// 但是我们这里希望每个 serve 单独关闭
// 互相不影响
func BuildCloseServeHook(servers ...web.Server) Hook {
	return func(ctx context.Context) error {
		wg := sync.WaitGroup{}
		doneCh := make(chan struct{})
		wg.Add(len(servers))


		for _, s := range servers {
			go func(srv web.Server) {
				err := srv.Shutdown(ctx)
				if err != nil {
					fmt.Printf("server shutdown err: %v", err)
				}
				time.Sleep(time.Second)
				wg.Done()
			}(s)
		}

		go func() {
			wg.Wait()
			doneCh <- struct{}{}
		}()

		for {
			select {
				case <- doneCh:
					fmt.Println("all server shutdown")
					return nil
				case <- ctx.Done():
					fmt.Println("close server timeout !!!")
					return ErrorHookTimeout
			}
		}
	}
}
```

## 优雅退出执行HOOK

```go
package main

import (
   "context"
   "fmt"
   "os"
   "os/signal"
   "syscall"
   "time"
)

var (
   // ShutdownSignals receives shutdown signals to process
   ShutdownSignals = []os.Signal{
      os.Interrupt, os.Kill, syscall.SIGKILL,
      syscall.SIGHUP, syscall.SIGINT, syscall.SIGQUIT, syscall.SIGILL, syscall.SIGTRAP,
      syscall.SIGABRT, syscall.SIGTERM,
   }
)

func waitForShutdown(hooks ...Hook) {
   signalChan := make(chan os.Signal, 1)
   signal.Notify(signalChan, ShutdownSignals...)

   select {
      case <- signalChan:
         fmt.Println("server start shutdown !")
         go func() { // 十分钟还未退出，强制退出
            time.Sleep(time.Minute * 10)
            os.Exit(1)
         }()
         for _, h := range hooks {
            ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
            err := h(ctx)
            if err != nil {
                fmt.Printf("failed to run hook err: %v /n", err)
            }
            cancel()
         }
         os.Exit(1) // 正常退出
   }

}
```



## 优雅退出控制

```go
package main

import (
	"context"
	"errors"
	"fmt"
	"sync/atomic"
	web "web-server-go/web/12_graceful_exit/12_0_web"
)

var ServerExistingError = errors.New("server is existing! ")

func NewGracefulShutdownController() GracefulShutdownController {
	return GracefulShutdownController {
		doneAllReq: make(chan struct{}, 1),
	}
}

type GracefulShutdownController struct {
	requestCount int64
	closed       int32
	doneAllReq   chan struct{}
}

func (g *GracefulShutdownController) GracefulShutdownBuilder(next web.Filter) web.Filter {
	return func(ctx *web.Context) {
		closed := atomic.LoadInt32(&g.closed)
		if closed > 0 {
			_ = ctx.WriteJSON(502, ServerExistingError)
			return
		}

		atomic.AddInt64(&g.requestCount, 1)       // 请求数量加 1
		next(ctx)                                 // 处理业务逻辑
		atomic.AddInt64(&g.requestCount, -1)      // 请求数量减 1
		if atomic.LoadInt32(&g.closed) > 0 && atomic.LoadInt64(&g.requestCount) == 0 {
			g.doneAllReq <- struct{}{}
		}
	}
}

func (g *GracefulShutdownController) GracefulShutdown(ctx context.Context) error {
	atomic.AddInt32(&g.closed, 1)
	fmt.Println("graceful shutdown: start wait all request exist")
	if atomic.LoadInt64(&g.requestCount) == 0 {
		fmt.Println("graceful shutdown: all request existed")
		return nil
	}

	select {
		case <- g.doneAllReq:
			fmt.Println("graceful shutdown: all request existed")
		case <- ctx.Done():
			fmt.Println("graceful shutdown: timeout")
	}
	return nil
}
```

## 使用示例

```go
func main() {
	gController := NewGracefulShutdownController()
	server := web.NewServer("graceExistServer",
		web.MetricFilterBuilder,             // 面向切面编程，时间统计
		gController.GracefulShutdownBuilder, // 面向切面编程，优雅退出，拒绝新请求
	)

	_ = server.Route("GET", "hello", func(ctx *web.Context) {
		fmt.Println("hello")
		time.Sleep(10*time.Second)
		ctx.WriteJSON(200, "hello world")
	})

	go func() { // 可以启动多个服务
		port := ":8888"
		fmt.Println("start server port: ", port)
		if err := server.Start(port); err != nil {
			// 快速失败，因为服务器都没启动成功，啥也做不了
			panic(any(err))
		}
	}()

	waitForShutdown( // 优雅退出，自定义钩子函数
		gController.GracefulShutdown,
		BuildCloseServeHook(server),
		ReleaseHook,
	)
}
```

