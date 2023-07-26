# Context抽象

## 复杂请求

```go
func Hello(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "read body err: %s", err.Error())
		return
	}
	var hVo HelloVo
	err = json.Unmarshal(body, &hVo)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Unmarshal body err: %s", err.Error())
		return
	}
	resp, err := json.Marshal(hVo)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Marshal resp err: %s", err.Error())
		return
	}
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, string(resp))
}
```

以上是body请求时，在处理函数中读取客户端的body以及返回所需要写的代码，有这些问题：

- 大部分代码都是一样的，存在冗余
- 业务代码还没有书写就已经写了快20行了
- ResponseWriter、Request 成对出现，每次处理都需要用到



## 抽象context

为了使代码更的逻辑更内聚，我们可以抽象出`context`来承载`http.ResponseWriter`, `*http.Request`

```go
type Context struct {
	W http.ResponseWriter
	R *http.Request
}
```

我们可以把`hello`中读取`body`的部分放在`context`，则`context`中有如下方法：

```go
func (c *Context) ReadJSON(obj interface{}) error {
	body, err := io.ReadAll(c.R.Body)
	if err != nil {
		return err
	}
	err = json.Unmarshal(body, obj)
	if err != nil {
		return err
	}
	return nil
}
```

同理，我们可以把`response`结构体，回写的逻辑放在 `context`中

```go
func (c *Context) WriteJSON(code int, resp interface{}) error {
	c.W.WriteHeader(code)
	respJson, err := json.Marshal(resp)
	if err != nil {
		return err
	}
	_, err = c.W.Write(respJson)
	return err
}
```

还可以基于此封装更便捷的方法：

```go
func (c *Context) OkJSON(resp interface{}) error {
	return c.WriteJSON(http.StatusOK, resp)
}

func (c *Context) SystemErrorJSON(resp interface{}) error {
	return c.WriteJSON(http.StatusInternalServerError, resp)
}
```

## 优化处理函数

当我们抽象出`context`后，我们可以优化我们的处理函数，使用`context`帮我们读写数据

```go
func Hello2(w http.ResponseWriter, r *http.Request) {
	cxt := NewContext(w, r)
	var hVo HelloVo
	err := cxt.ReadJSON(&hVo)
	if err != nil {
		_ = cxt.SystemErrorJSON(err.Error())
		return
	}
	err = cxt.OkJSON(hVo)
	if err != nil {
		// 填写日志
	}
}
```

但是如果让用户自己写这样的函数，自己初始化`context`会导致`context`不可控，不熟悉的用户甚至也都不会用`context`处理读写。所以为了简化用户对`context`的使用，我们需要修改`server`的接口，并且将入参改为`context`

```go
type Server interface {
	Route(pattern string, handlerFunc func(*Context))
	Start(port string) error
}

func (S SDKHttpServer) Route(pattern string, handlerFunc func(*Context)) { 
    // handleFunc 的 http.HandlerFunc类型改为 func(*Context)
	http.HandleFunc(pattern, func(w http.ResponseWriter, r *http.Request) {
		ctx := NewContext(w, r)
		handlerFunc(ctx)
	})
}

// 用户的处理函数，第三个版本，将入参改为 context，框架控制context的生成
func Hello3(ctx *Context){
	var hVo HelloVo
	err := ctx.ReadJSON(&hVo)
	if err != nil {
		_ = ctx.SystemErrorJSON(err.Error())
		return
	}
	err = ctx.OkJSON(hVo)
	if err != nil {
		// 填写日志
	}
}
```

到这里我们的`context`基本完成，通过`context`我们简化了用户读出数据的逻辑，并且读写数据的功能也更加内聚。
