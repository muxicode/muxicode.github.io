# Handler抽象

在上一章节中，我们新增了`handler`并且基于`map`实现了我们的简单路由。我们看看以`Server`中的`Route`函数：

```go
func (S *SDKHTTPServer) Route(
	method string, //
	pattern string,
	handleFunc func(*Context)) {
	S.handler.handlers[S.key(method, pattern)] = handleFunc
}
```

我们可以看到我们直接访问了 `handler`的属性，并设置了值，实际上这样写是不太好的，我们可以尝试将这部分依赖接口，而不是依赖具体的细节。

## 组合实现接口

我们的`handler`中已经实现了`http.Handler`的接口，在这个基础上我们还想要有一个自己的接口，但是这个接口需要实现`http.Handler`这个接口。在`go`中，我们通常使用组合的方式实现。

```go
type Handler interface {
	http.Handler
	Route(method string, pattern string, handleFunc func(*Context))
}
```

`HandlerBaseOnMap`需要实现`Route`以实现`Handler`接口

```go
func (h *HandlerBaseOnMap) Route(
	method string,
	pattern string,
	handleFunc func(*Context)) {
	h.handlers[h.key(method, pattern)] = handleFunc
}
```

## Server端

为了不让`Server`依赖细节，可以在让`Handler`接口实现`Route`方法，让`Server`直接委托即可，此时`Server`的代码：

```go
func (S *SDKHTTPServer) Route(
	method string,
	pattern string,
	handleFunc func(*Context)) {
	S.handler.Route(method, pattern, handleFunc)
}
```

这也是我们常用的重构的移动的方式，将方法或类移动到其逻辑上更合适的位置。

其他修改：

```go
func NewServer(name string) Server {
	return &SDKHTTPServer{
		Name: name,
		handler: NewHandlerBaseOnMap(), // 使用简单创建函数即可，不依赖细节
	}
}

type SDKHTTPServer struct {
	Name string
	handler Handler  // handler 依赖接口即可
}
```

## Route接口

通过上面修改，我们发现`Route`即存在在`Handler`中，也存在在`Server`中，这两个是委托关系，参数都是一致的，其实也可以抽象成接口。于是我们把`Route`也抽象出来：

```go
type RouteAble interface{
	Route(method string, pattern string, handleFunc func(*Context))
}
```

`Handler`接口：

```go
type Handler interface {
	http.Handler
	RouteAble
}
```

`Server`接口:

```go
type Server interface {
	RouteAble
	Start(port string) error
}
```

