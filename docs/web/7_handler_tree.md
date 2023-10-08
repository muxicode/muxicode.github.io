---
title: Handler路由树
autoGroup-1: web基础封装
---
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

我们之前的匹配机制，写在`findCurChild`函数中，如果继续往下写的话，逻辑会越来越多，经过对路由树业务的理解，我们发现不仅仅只有两种节点，节点之间时不一样的，匹配机制也是不一样的，此时我们可以将我们的逻辑抽象到节点当中，匹配机制的匹配函数也可以抽象出来。

### 节点抽象

于是我们可以抽象出如下节点：参数节点、通配符节点、固定路径节点

```go
package main

import "strings"

const (
	// 根节点，只有根用这个
	nodeTypeRoot = iota

	// *
	nodeTypeAny

	// 路径参数
	nodeTypeParam

	// 正则
	nodeTypeReg

	// 静态，即完全匹配
	nodeTypeStatic
)

const NodePathAny = "*"

type NodeType int

type MatchFunc  func(path string, ctx *Context) bool

type Node struct {
	path string

	next []*Node
	// 可以使用以下结构加速
	// next map[byte][]*Node  使用map以不用字母开头分组

	// next [26][]*Node       使用数组以不用字母开头分组
	// 		                  第一个字符 - 'a'，不同字母开头位置进行区分

	// next []*Node           采用有序的接口进行二分法查找

	handleFunc HandleFunc
	matchFunc  MatchFunc
	nodeType   NodeType
}

func NewNode(path string) *Node{
	if path == NodePathAny {
		return newAnyNode(path)
	}
	if strings.HasPrefix(path, ":") {
		return newParamNode(path)
	}
	return newStaticNode(path)
}

// 静态节点
func newStaticNode(path string) *Node {
	return &Node{
		next: make([]*Node, 0, 2),
		matchFunc: func(p string, c *Context) bool {
			return path == p && p != "*"
		},
		nodeType: nodeTypeStatic,
		path:  path,
	}
}

func newRootNode(method string) *Node {
	return &Node{
		next: make([]*Node, 0, 2),
		matchFunc: func( p string, c *Context) bool {
			panic(any("never call me"))
		},
		nodeType: nodeTypeRoot,
		path:  method,
	}
}

func newAnyNode(path string) *Node {
	return &Node{
		// 因为我们不允许 * 后面还有节点，所以这里可以不用初始化
		//children: make([]*node, 0, 2),
		next: make([]*Node, 0, 2),
		matchFunc: func(p string, c *Context) bool {
			if p != "*" {
				return true
			}
			return false
		},
		nodeType: nodeTypeAny,
		path:  path,
	}
}

func newParamNode(path string) *Node {
	param := path[1:]
	return &Node{
		// 因为我们不允许 * 后面还有节点，所以这里可以不用初始化
		//children: make([]*node, 0, 2),
		next: make([]*Node, 0, 2),
		matchFunc: func(p string, c *Context) bool {
			if c != nil && c.PathParams != nil {
				c.PathParams[param] = p
			}
			return p != NodePathAny
		},
		nodeType: nodeTypeParam,
		path:  path,
	}
}
```

### 路由树修改

```go
// 初始化支持各种方法
func NewHandlerBaseOnTree()	Handler {
	forest := make(map[string]*Node, len(supportMethods))
	for _, method := range supportMethods {
		forest[method] = newRootNode(method)
	}
	return &HandlerBaseOnTree{
		forest: forest,
	}
}

var supportMethods = [4]string {
	http.MethodGet,
	http.MethodPost,
	http.MethodPut,
	http.MethodDelete,
}

// 修改查找函数，添加方法，找对应的方法的节点
func (h *HandlerBaseOnTree) FindHandleFunc(method, path string) (HandleFunc, bool) {
	paths := strings.Split(path, "/")
	cur := h.forest[method]
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

// 路由函数也对应新增节点
func (h *HandlerBaseOnTree) Route(method string, pattern string, handleFunc func(*Context)) error {
	// 校验通配符的位置，只允许通配符出现在最后一个位置
	err := h.validatePattern(pattern)
	if err != nil {
		return err
	}

	pattern = strings.Trim(pattern, "/")
	paths := strings.Split(pattern, "/")
	cur := h.forest[method]
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


// 新建节点工厂函数
func NewNode(path string) *Node{
	if path == NodePathAny {
		return newAnyNode(path)
	}
	if strings.HasPrefix(path, ":") {
		return newParamNode(path)
	}
	return newStaticNode(path)
}

// 多中节点优先级不同可能会冲突，新增判断逻辑
func (h *HandlerBaseOnTree) Route(method string, pattern string, handleFunc func(*Context)) error {
	// 校验通配符的位置，只允许通配符出现在最后一个位置
	err := h.validatePattern(pattern)
	if err != nil {
		return err
	}

	pattern = strings.Trim(pattern, "/")
	paths := strings.Split(pattern, "/")
	cur := h.forest[method]
	for _, path := range paths {
		child, ok := h.findMatchChild(cur, path, nil)
		// != nodeTypeAny 是考虑到 /order/* 和 /order/:id 这种注册顺序
		if ok && child.nodeType != nodeTypeAny {
			cur = child
		} else {
			// 为当前节点根据
			newChild := NewNode(path)
			cur.next = append(cur.next, newChild)
			cur = newChild
		}
	}
	cur.handleFunc = handleFunc
	return nil
}

// 修改匹配函数，新增ctx参数，用于参数节点设置参数,并将匹配函数提到节点中
func (h *HandlerBaseOnTree) findMatchChild(cur *Node, path string, ctx *Context) (*Node, bool) {
	candidates := make([]*Node, 0, 2)
	for _, node := range cur.next {
		if node.matchFunc(path, ctx) {
			candidates = append(candidates, node)
		}
	}

	if len(candidates) == 0 {
		return nil, false
	}
	// type 也决定了它们的优先级
	sort.Slice(candidates, func(i, j int) bool {
		return candidates[i].nodeType < candidates[j].nodeType
	})
	return candidates[len(candidates) - 1], true
}
```

### Context修改

```go
type Context struct {
	W          http.ResponseWriter
	R          *http.Request
	PathParams map[string]string  // 新增路径参数map，用于记录参数节点的参数
}

func NewContext(w http.ResponseWriter, r *http.Request) *Context {
	return &Context{
		W: w,
		R: r,
		PathParams: map[string]string{}, // 初始化节点
	}
}
```

