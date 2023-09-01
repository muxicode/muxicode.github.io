# Context 池化

此前的服务中的代码，在我们每次接收请求的同时我们会新建一个`Context`，然后使用我们的路由树找到我们设置的路由函数并执行。

此时我们总是在频繁的创建Context，并销毁。在高并发的场景下，我们可以使用`sync.Pool`将我们的`Context`池化。

## Context修改

```go
// 实现 sync.Pool 中的 New 属性的接口
func NewContextWithPool() any {
	fmt.Println("create new context")
	return &Context{}
}

// 使用前重新设置我们的ResponseWriter、Request
func (c *Context) Reset(W http.ResponseWriter, R *http.Request) {
	c.W = W
	c.R = R
	c.PathParams = make(map[string]string, 1)
}
```

## Server端修改

```go
type SDKHTTPServer struct {
	Name    string
	handler Handler
	root    Filter
	ctxPool sync.Pool  // context池化，防止每次请求都创建context并回收
}

// 新建Server时需要设置好Pool
func NewServer(name string, builders... FilterBuilder) Server {
	handler := NewHandlerBaseOnTree()

	var root Filter = handler.ServeHTTP

	for i:=len(builders)-1; i>=0; i-- {
		b := builders[i]
		root = b(root)
	}

	return &SDKHTTPServer{
		Name: name,
		handler: handler,
		root: root,
		// 使用sync.Pool，传入Context的创建函数即可
		ctxPool: sync.Pool{
			New: NewContextWithPool,
		},
	}
}

// 使用ServeHTTP实现handler的接口的方式启动
func (S *SDKHTTPServer) Start(port string) error {
	return http.ListenAndServe(port, S)
}

// 实现 ServeHTTP 接口，每次接收到请求的时候，到池子中拿到Context，并设置当前的Context
func (S *SDKHTTPServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := S.ctxPool.Get().(*Context)
	defer S.ctxPool.Put(ctx)
	ctx.Reset(w, r)
	S.root(ctx)
}
```

