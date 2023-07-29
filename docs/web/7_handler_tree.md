# Handler路由树

此前我们使用`map`实现了我们的路由，这种形式下，路由匹配并不能满足我们一些路由需求，如：`/user/:id` 、`/user/*` 等一些特殊的路由匹配



## 版本一[基础版本]

### 路由树

我们使用前缀树（字典树）的原理去实现我们的路由树，我们只需要实现我们之前定好的`handler`接口即可。

```go
package main

import (
	"net/http"
	"strings"
)

func NewHandlerBaseOnTree()	Handler {
	return &HandlerBaseOnTree{
		root: NewNode(), // 初始化树的根节点
	}
}

type HandlerBaseOnTree struct {
	root *Node
}

func NewNode() *Node {
	return &Node{
		next: make([]*Node, 0, 2),
	}
}

func NewNodeByPath(path string) *Node {
	return &Node{
		path: path,
		next: make([]*Node, 0, 2),
	}
}

type Node struct {
	path string
	next []*Node

	// 可以使用以下结构加速
	// next map[byte][]*Node  使用map以不用字母开头分组
	// next [byte][]*Node     使用数组以不用字母开头分组
	// next []*Node           采用有序的接口进行二分法查找

	handleFunc HandleFunc
}

func (h *HandlerBaseOnTree) ServeHTTP(ctx *Context) {
	path := strings.Trim(ctx.R.URL.Path, "/")
	handleFunc, ok := h.FindHandleFunc(path)
	if !ok {
		_ = ctx.WriteJSON(http.StatusNotFound, handleFunc)
		return
	}
	handleFunc(ctx)
}

func (h *HandlerBaseOnTree) FindHandleFunc(path string) (HandleFunc, bool) {
	paths := strings.Split(path, "/")
	cur := h.root
	for _, p := range paths {
		child, ok := h.findCurChild(cur, p)
		if ok {
			cur = child
		} else {
			return nil, false
		}
	}
	return cur.handleFunc, cur.handleFunc != nil
}

// method 当前版本为无用参数，仅仅走路由匹配
func (h *HandlerBaseOnTree) Route(method string, pattern string, handleFunc func(*Context)) {
	pattern = strings.Trim(pattern, "/")
	paths := strings.Split(pattern, "/")
	cur := h.root
	for _, path := range paths {
		child, ok := h.findCurChild(cur, path)
		if ok {
			cur = child
		} else {
			newChild := NewNodeByPath(path)
			cur.next = append(cur.next, newChild)
			cur = newChild
		}
	}
	cur.handleFunc = handleFunc
}

// 寻找节点子节点
func (h *HandlerBaseOnTree) findCurChild(cur *Node, path string) (*Node, bool) {
	for _, node := range cur.next {
		if node.path == path {
			return node, true
		}
	}
	return nil, false
}
```

### 创建Server

```go
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
	}
}
```

## 版本二[支持通配符]

### 路由树

修改查找时的匹配规则，任何数据遇到通配符将节点返回

```go
func (h *HandlerBaseOnTree) findCurChild(cur *Node, path string) (*Node, bool) {
	for _, node := range cur.next {
		// 并不是 * 的节点命中了，直接返回
		// != * 是为了防止用户乱输入
		if node.path == path && node.path != "*" {
			return node, true
		}
		if node.path == "*" { // 通配符节点
			return node, true
		}
	}
	return nil, false
}
```

增加校验逻辑，不允许配置了通配符的路由，通配符不在最后一个位置：

```go
func (h *HandlerBaseOnTree) validatePattern(pattern string) error {
	// 校验 *，如果存在，必须在最后一个，并且它前面必须是/
	// 即我们只接受 /* 的存在，abc*这种是非法

	pos := strings.Index(pattern, "*")
	// 找到了 *
	if pos > 0 {
		// 必须是最后一个
		if pos != len(pattern) - 1 {
			return ErrorInvalidRouterPattern
		}
		if pattern[pos-1] != '/' {
			return ErrorInvalidRouterPattern
		}
	}
	return nil
}
```

修改Route函数，并修改接口，将错误返回：

```go
func (h *HandlerBaseOnTree) Route(method string, pattern string, handleFunc func(*Context)) error {
	// 校验通配符的位置，只允许通配符出现在最后一个位置
	err := h.validatePattern(pattern)
	if err != nil {
		return err
	}

	pattern = strings.Trim(pattern, "/")
	paths := strings.Split(pattern, "/")
	cur := h.root
	for _, path := range paths {
		child, ok := h.findCurChild(cur, path)
		if ok {
			cur = child
		} else {
			newChild := NewNodeByPath(path)
			cur.next = append(cur.next, newChild)
			cur = newChild
		}
	}
	cur.handleFunc = handleFunc
	return nil
}
```

## 版本三[支持参数]

### 路由树
