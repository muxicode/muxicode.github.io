# Filter实现AOP

1.  责任链是很常见的用于解决AOP的一种方式。
2.  类似的也叫做middleware，interceptor... 本质是一样
3. Go 函数是一等公民，所以可以考虑使用闭包来实现责任链
4. filter 很常见，比如说鉴权，日志，tracing，以及跨域等都可以用filter来实现

```go
package main

import (
	"fmt"
	"time"
)

type Filter func(c *Context)

type FilterBuilder func(next Filter) Filter

// 确保MetricFilterBuilder是一个FilterBuilder
var _ FilterBuilder = MetricFilterBuilder

func MetricFilterBuilder(next Filter) Filter {
	return func (c *Context) {
		startTime := time.Now()
		next(c)
		endTime := time.Now()
		fmt.Printf("use time: %f \n", endTime.Sub(startTime).Seconds())
	}
}
```

## Server修改

初始化`Server`时，允许使用`builders`并将根节点保存，后续使用

```go
func NewServer(name string, builders... FilterBuilder) Server {
	handler := NewHandlerBaseOnMap()

	var root Filter = func(c *Context) {
		handler.ServeHTTP(c.W, c.R)
	}

	for i:=len(builders)-1; i>=0; i-- {
		b := builders[i]
		root = b(root)
	}

	return &SDKHTTPServer{
		Name: name,
		handler: handler,
		root: root,
	}
}
```

修改`Start`函数

```go
func (S *SDKHTTPServer) Start(port string) error {
    // 由 http.Handle() 改为 HandleFunc 则 handle可以不实现ServeHTTP接口
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
		S.root(NewContext(w, r))
	})
	return http.ListenAndServe(port, nil)
}
```

## 接口优化

我们看到我们使用`Start`函数中，在使用`root`，我们使用`NewContext`生成了新的`Context`，但是在`NewServer`中我又将 `Context` 拆开了。

```go
func (S *SDKHTTPServer) Start(port string) error {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
		S.root(NewContext(w, r)) // 生成了Context
	})
	return http.ListenAndServe(port, nil)
}
```

`NewServer`：

```go
func NewServer(name string, builders... FilterBuilder) Server {
	...
	var root Filter = func(c *Context) {
		handler.ServeHTTP(c.W, c.R) // 又将Context拆开了，
	}
	...
}
```

### 修改handler

接口修改：

```go
type Handler interface {
	ServeHTTP(ctx *Context) // 直接使用Context
	RouteAble
}
```

实现也修改：

```go
func (h *HandlerBaseOnMap) ServeHTTP(ctx *Context) {
	request := ctx.R
	key := h.key(request.Method, request.URL.Path)
	if handler, ok := h.handlers[key]; ok {
		handler(ctx)
	} else {
		_ = ctx.WriteJSON(http.StatusNotFound, "Not Found")
	}
}
```

### Server修改

```go
func NewServer(name string, builders... FilterBuilder) Server {
	handler := NewHandlerBaseOnMap()

	var root Filter = handler.ServeHTTP

	for i:=len(builders)-1; i>=0; i-- {
		b := builders[i]
		root = b(root)
	}

	return &SDKHTTPServer{
		Name: name,
		handler: handler,
		root: root,
	}
}
```

## 拓展拦截器(中间件)实现

在 Golang 中，拦截器模式（Interceptor Pattern）是一种常见的设计模式，用于在不修改现有代码的情况下增加或修改功能。它通过使用接口（interface）和包装器（wrapper）的方式来实现。

在拦截器模式中，我们通过实现一个接口，然后用一个包装器结构来封装原始对象，从而在调用原始对象的方法之前或之后执行特定的操作。

### 接口实现

```go
// 定义一个接口，包含原始对象的方法
type UserService interface {
    GetUserByID(id int) (User, error)
}

// 原始对象，实现 UserService 接口
type UserServiceImpl struct{}

func (s *UserServiceImpl) GetUserByID(id int) (User, error) {
    // 实际的业务逻辑在这里
    // ...
}

// 包装器结构，用于拦截原始对象的方法调用并执行附加操作
type LoggingInterceptor struct {
    userService UserService
}

func (li *LoggingInterceptor) GetUserByID(id int) (User, error) {
    // 在调用原始方法之前执行的操作
    fmt.Println("Calling GetUserByID with ID:", id)

    // 调用原始方法
    user, err := li.userService.GetUserByID(id)

    // 在调用原始方法之后执行的操作
    if err == nil {
        fmt.Println("GetUserByID succeeded")
    } else {
        fmt.Println("GetUserByID failed with error:", err)
    }

    return user, err
}

// 使用 LoggingInterceptor 封装 UserServiceImpl
func NewLoggingInterceptor(userService UserService) UserService {
    return &LoggingInterceptor{userService: userService}
}

```

### 闭包实现

```go
// 原始对象的函数定义
type GetUserByIDFunc func(id int) (User, error)

// 原始对象的实现
func (fn GetUserByIDFunc) GetUserByID(id int) (User, error) {
    return fn(id)
}

// 包装器函数，用于拦截原始函数调用并执行附加操作
func LoggingInterceptor(getUserByID GetUserByIDFunc) GetUserByIDFunc {
    return func(id int) (User, error) {
        // 在调用原始函数之前执行的操作
        fmt.Println("Calling GetUserByID with ID:", id)

        // 调用原始函数
        user, err := getUserByID(id)

        // 在调用原始函数之后执行的操作
        if err == nil {
            fmt.Println("GetUserByID succeeded")
        } else {
            fmt.Println("GetUserByID failed with error:", err)
        }

        return user, err
    }
}

// 使用 LoggingInterceptor 封装原始函数
userServiceImpl := &UserServiceImpl{}
getUserByIDWithLogging := LoggingInterceptor(userServiceImpl.GetUserByID)

```

### 闭包加接口实现

```go
package __extend_Interceptor

import (
	"fmt"
	"time"
)

type FilterService interface {
	Serve(name string)
}

type MyFilter struct {
}

type FilterServiceBuilder func(next FilterService) FilterService

func (f *MyFilter)Serve(name string) {
	fmt.Printf("MyFilter Serve: %s \n", name)
}

type InterceptorFilter struct {
	next FilterService
}

func (f *InterceptorFilter) Serve(name string) {
	fmt.Printf("InterceptorFilter Serve Start \n")
	f.next.Serve(name)
	fmt.Printf("InterceptorFilter Serve End \n")
}

func NewInterceptorFilter(next FilterService) FilterService {
	return &InterceptorFilter{
		next: next,
	}
}


type MetricFilter struct {
	next FilterService
}

func (f *MetricFilter) Serve(name string) {
	startTime := time.Now()
	f.next.Serve(name)
	endTime := time.Now()
	fmt.Printf("MetricFilter use time: %f \n", endTime.Sub(startTime).Seconds())
}

func NewMetricFilter(next FilterService) FilterService {
	return &MetricFilter{
		next: next,
	}
}
```

测试调试代码：

```go
package __extend_Interceptor

import "testing"


func TestInterceptor(t *testing.T) {
	r := NewFilterRoot(&MyFilter{}, NewMetricFilter, NewInterceptorFilter)
	r.Serve("hello")
}

//=== RUN   TestInterceptor
//InterceptorFilter Serve Start
//MyFilter Serve: hello
//InterceptorFilter Serve End
//MetricFilter use time: 0.000065
//--- PASS: TestInterceptor (0.00s)
//PASS


type FilterRoot struct {
	root FilterService
}

func (f *FilterRoot)Serve(name string) {
	f.root.Serve(name)
}

func NewFilterRoot(root FilterService, filterServiceBuilders... FilterServiceBuilder) FilterRoot {
	for i:=len(filterServiceBuilders)-1; i>=0; i-- {
		f := filterServiceBuilders[i]
		root = f(root)
	}

	return FilterRoot{
		root: root,
	}
}
```

### 接口加生命周期

```go
package __extend_Interceptor

import "fmt"

// 定义一个接口，包含原始对象的方法以及生命周期函数
type UserService interface {
	// 原始对象的方法
	GetUserByID(id int) string

	// 生命周期函数
	Setup()
	Teardown()
}

// 原始对象，实现 UserService 接口
type UserServiceImpl struct{}

func (s *UserServiceImpl) GetUserByID(id int) string {
	// 实际的业务逻辑在这里
	// ...
	return "李四"
}

func (s *UserServiceImpl) Setup() {
	// 在调用原始方法之前执行的操作
	fmt.Println("UserService setup")
}

func (s *UserServiceImpl) Teardown() {
	// 在调用原始方法之后执行的操作
	fmt.Println("UserService teardown")
}

// 包装器结构，用于拦截原始对象的方法调用并执行附加操作
type LoggingInterceptor struct {
	userService UserService
}

func (li *LoggingInterceptor) GetUserByID(id int) string {
	// 在调用原始方法之前执行的操作
	fmt.Println("Calling GetUserByID with ID:", id)

	// 在调用原始方法之前执行生命周期函数
	li.userService.Setup()

	// 调用原始方法
	name := li.userService.GetUserByID(id)
	fmt.Println(name)

	// 在调用原始方法之后执行生命周期函数
	li.userService.Teardown()

	return name
}

func (li *LoggingInterceptor) Teardown()  {
}

func (li *LoggingInterceptor) Setup()  {
}

// 使用 LoggingInterceptor 封装 UserServiceImpl
func NewLoggingInterceptor(userService UserService) UserService {
	return &LoggingInterceptor{userService: userService}
}
```

测试调试代码

```go
package __extend_Interceptor

import "testing"

func TestLifeHock(t *testing.T) {
	l := NewLoggingInterceptor(&UserServiceImpl{})
	l.GetUserByID(1)
}

//=== RUN   TestLifeHock
//Calling GetUserByID with ID: 1
//UserService setup
//李四
//UserService teardown
//--- PASS: TestLifeHock (0.00s)
//PASS
```

