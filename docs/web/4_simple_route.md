# 路由的简单实现

## Server改动

使用`map`进行路由的映射，则`Server`端需要加上`mapHandler`的实现

```go
// SDKHTTPServer 必须实现Server接口才能不报错
var _ Server = &SDKHTTPServer{}

type SDKHTTPServer struct {
	Name string
	handler *HandlerBaseOnMap
}
```

路由的方法也需要修改，在注册函数的时候先不调用`http`的`HandleFunc`的方法，而是使用`map`记录handler，在启动的时候，再真正的注册

```go
func (S *SDKHTTPServer) Route(
	method string,
	pattern string,
	handleFunc func(*Context)) {
	S.handler.handlers[S.handler.key(method, pattern)] = handleFunc
}
```

启动函数也需要对应需改

```go
func (S *SDKHTTPServer) Start(port string) error {
	http.Handle("/", S.handler) // 真正的注册路由
	return http.ListenAndServe(port, nil)
}
```

## 新增Handler

`handler.go`中使用`map`实现路由的简单映射，使用单独的模块实现，使用`http.Handle()`方式注册路由，所以需要实现`http.Handler`接口

```go
type Handler interface {
	ServeHTTP(ResponseWriter, *Request)
}
```

`handler.go`的具体实现：

```go
package main

import (
	"fmt"
	"net/http"
)

type HandlerBaseOnMap struct {
	handlers map[string]func(*Context)
}

func (h *HandlerBaseOnMap) ServeHTTP(
	writer http.ResponseWriter,
	request *http.Request) {
	key := h.key(request.Method, request.URL.Path)
	if handler, ok := h.handlers[key]; ok {
		handler(NewContext(writer, request))
	} else {
		writer.WriteHeader(http.StatusNotFound)
		_, _ = writer.Write([]byte("Not Found"))
	}
}

func(h *HandlerBaseOnMap) key(method, pattern string) string {
	return fmt.Sprintf("%s#%s", method, pattern)
}
```

