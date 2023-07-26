# Server 的抽象

了解了golang中http包的基础使用后，我们是否可以直接使用它http来构建我们的web服务器？答案是可以的，但是会有一些问题：

- 面对复杂业务的时候，我们的代码的意图将会比较混乱，可能就像是面向过程编写的代码。
- 存在大量重复代码，比如，在读取body并解析到结构体的代码err的重复处理，大量的判断代码
- 缺少生命周期的管理，比如服务注册、拦截器等功能

## 最简单的web服务

```go
package main

import (
	"fmt"
	"net/http"
)

// 处理函数
func Hello(w http.ResponseWriter,r *http.Request) {
	fmt.Fprintf(w, "hello")
}

func main(){
	http.HandleFunc("/hello", Hello)
	http.ListenAndServe(":8080", nil)
}
```

启动`main`函数，访问`localhost:8080/hello`如下所示：

![](/2_server.assets/image-20230712232707206.png)

## Server接口抽象

从基础的web服务器代码来看，我们所需要的web服务，也需要有两种功能，一种是注册路由，一种是监听端口并启动服务。

由于我们想直接使用底层的`http`来搭建我们的`server`，那么我们注册的路由，需要与`http`包中的一致，我们可以定义出如下接口：

```go
type Server interface {
	Route(pattern string, f http.HandlerFunc)
	Start(port string) error
}
```

采用底层的`http`包实现我们的接口

```go
type sdkHttpServer struct {

}

func (s sdkHttpServer) Route(pattern string, handleFunc http.HandlerFunc) {
	http.HandleFunc(pattern, handleFunc)
}

func (s sdkHttpServer) Start(port string) error {
	return http.ListenAndServe(port, nil)
}
```

可以采用如下获取Server实例的方式，来获取不同实现的Server

```go
func NewSdkHttpServer() Server {
	return &sdkHttpServer{}
}

type Factory func() Server

var factory Factory

func RegisterFactory(f Factory) {
	factory = f
}

func NewServer() Server {
	return factory()
}
```

启动服务

```go
func main() {
	RegisterFactory(NewSdkHttpServer)
	server := NewServer()
	hello := func(w http.ResponseWriter,r *http.Request) { // http.HandlerFunc 的类型
		fmt.Fprintf(w, "hello")
	}
	server.Route("/hello", hello)
	server.Start(":8080")
}
```

