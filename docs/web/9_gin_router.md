---
title: Gin路由树生成及匹配
autoGroup-1: web基础封装
---
# Gin路由树生成及匹配

路由是如何构建和匹配的？

Go 版本：1.14

Gin 版本：v1.5.0

## 目录

- 路由结构
- 路由的构建
- 路由的匹配
- 小结

## 路由结构

```go
router := gin.Default()
router := gin.New()
```

在使用 Gin 的时候，我们一般会使用以上两种方式中的其中一种来创建 Gin 的引擎 `gin.Engine`，那么，这个引擎，到底是个什么东西呢？我们一起来看一下 `gin.Engine` 结构体的定义以及 `gin.Default()` 和 `gin.New()` 函数：

```go
type Engine struct {
    RouterGroup
    trees methodTrees
    // 省略多数无相关属性
}

func Default() *Engine {
    debugPrintWARNINGDefault()
    engine := New()
    engine.Use(Logger(), Recovery())
    return engine
}

func New() *Engine {
    debugPrintWARNINGNew()
    engine := &Engine{
        RouterGroup: RouterGroup{
            Handlers: nil,
            basePath: "/",
            root:     true,
        },
        FuncMap:                template.FuncMap{},
        RedirectTrailingSlash:  true,
        RedirectFixedPath:      false,
        HandleMethodNotAllowed: false,
        ForwardedByClientIP:    true,
        AppEngine:              defaultAppEngine,
        UseRawPath:             false,
        UnescapePathValues:     true,
        MaxMultipartMemory:     defaultMultipartMemory,
        trees:                  make(methodTrees, 0, 9),
        delims:                 render.Delims{Left: "{{", Right: "}}"},
        secureJsonPrefix:       "while(1);",
    }
    engine.RouterGroup.engine = engine
    engine.pool.New = func() interface{} {
        return engine.allocateContext()
    }
    return engine
}
```

此处省略 `gin.Engine` 中的许多与我们主题无相关的属性，如：重定向配置 `RedirectTrailingSlash` 和 `RedirectFixedPath`，无路由处理函数切片 `noRoute` 和 `allNoRoute`，HTML templates 相关渲染配置 `delims` 和 `HTMLRender` 等。

从上面的 `gin.Engine` 结构体中，可以发现其嵌入了一个 `RouterGroup` 结构体，以及还有一个 `methodTrees` 类型的属性 `trees`。

在 `gin.Default()` 函数内部调用了 `gin.New()` 函数来创建 Gin 的路由引擎，然后为该引擎添加了 `Logger()` 和 `Recovery()` 两个中间件。

`gin.New()` 函数用于创建 Gin 路由引擎，其主要用于为该即将被创建的引擎做一些初始化配置。

接下来我们来看一下 `gin.Engine` 结构体中所引用到的 `RouterGroup` 和 `methodTree` 的结构定义：



```go
// RouterGroup is used internally to configure router, a RouterGroup is associated with
// a prefix and an array of handlers (middleware).
type RouterGroup struct {
    Handlers HandlersChain
    basePath string
    engine   *Engine
    root     bool
}

// HandlersChain defines a HandlerFunc array.
type HandlersChain []HandlerFunc

// HandlerFunc defines the handler used by gin middleware as return value.
type HandlerFunc func(*Context)

type methodTrees []methodTree

type methodTree struct {
    method string
    root   *node
}
```

从源代码中给的注释，我们可以知道 `RouterGroup` 在 Gin 内部用于配置路由器，其与**前缀**和**处理函数（中间件）数组**相关联。

`Handlers` 是一个类型为 `HandlersChain` 的属性，而 `HandlersChain` 类型定义的是一个 `HandlerFunc` 类型的切片，最后 `HandlerFunc` 类型则是 Gin 中间件使用的处理函数，即其为 Gin 的处理函数对象，所以 `RouterGroup.Handlers` 为 Gin 的处理函数（中间件）切片；

`basePath` 则表示该 `RouterGroup` 所对应的路由前缀；

`engine` 则是该 `RouterGroup` 对应 `gin.Engine` 的引用；

`root` 表示该 `RouterGroup` 是否为根，在路由的构建中说明。

接下来是 `methodTrees` 类型，是一种 `methodTree` 类型的切片，而 `methodTree` 含有两个属性 `method` 和 `root`，这是位于 Gin 路由结构顶端的方法树，其 `method` 属性表示请求的方法类型，如：`GET`，`POST`，`PUT` 等，而 `root` 属性则指向对应路由树的根节点。

下面我们来看一下这个 `node` 结构体的结构定义：



```go
type node struct {
    path      string
    indices   string
    children  []*node
    handlers  HandlersChain
    priority  uint32
    nType     nodeType
    maxParams uint8
    wildChild bool
    fullPath  string
}

const (
    static nodeType = iota // default
    root
    param
    catchAll
)
```

在 Gin 内部，使用查找树 `Trie` 存储路由结构，所以 `node` 也满足查找树 `Trie` 节点的表示结构。

假如创建了两个请求方法类型相同的路由 `/use` 和 `/uso`，以该方法树的根节点为例，`path` 表示当前节点的前缀路径，此处为 `/us`；`indices` 表示当前节点的孩子节点索引，此处为 `eo`；`children` 则用于保存当前节点的孩子节点切片，此处存储了 `path` 为 `e` 和 `o` 的两个节点；`handlers` 保存当前 `path` 的处理函数切片，此处由于没有创建针对 `/us` 的处理函数，因此为 `nil`；`priority` 表示当前节点的优先级，孩子节点数量越多，优先级越高，用于调整索引和孩子节点切片顺序，提高查找效率；`nType` 表示当前节点的类型，Gin 定义了四种类型，`static`，`root`，`param` 和 `catchAll`，`static` 表示普通节点，`root` 表示根节点，`param` 表示通配符节点，匹配以 `:` 开头的参数，`catchAll` 同为通配符节点，匹配以 `/*` 开头的参数，与 `param` 不同之处在于 `catchAll` 会匹配 `/*` 后的所有内容；`maxParams` 表示该路由可匹配到参数的最多数量；`wildChild` 用于判断当前节点的孩子节点是否为通配符节点；`fullPath` 表示当前节点对应的完整路径。

下面以一个具体例子结合图片来看一下这个路由树的结构：



```go
func main() {
    router := gin.Default()

    router.GET("/users", func(c *gin.Context) {})
    router.GET("/user/:id", func(c *gin.Context) {})
    router.GET("/user/:id/*action", func(c *gin.Context) {})

    router.POST("/create", func(c *gin.Context) {})
    router.POST("/deletes", func(c *gin.Context) {})
    router.POST("/deleted", func(c *gin.Context) {})

    router.DELETE("/use", func(c *gin.Context) {})
    router.DELETE("/uso", func(c *gin.Context) {})

    router.Run(":8000")
}
```

![img](/9_gin_router.assets/webp.webp)

比较有疑惑的地方，可能是 GET 方法的路由树的第4~6层，为什么会有两个 `path` 为 `""` 的节点以及两个 `nType` 为 `catchAll` 的节点呢？带着这个问题，我们来学习 Gin 是如何构建路由树的。

## 路由的构建

我们先来看一下上面源代码中的 `router.GET(relativePath, handlers)`，`router.POST(relativePath, handlers)` 和 `router.DELETE(relativePath, handlers)` 函数：



```go
func (group *RouterGroup) GET(relativePath string, handlers ...HandlerFunc) IRoutes {
    return group.handle("GET", relativePath, handlers)
}

func (group *RouterGroup) POST(relativePath string, handlers ...HandlerFunc) IRoutes {
    return group.handle("POST", relativePath, handlers)
}

func (group *RouterGroup) DELETE(relativePath string, handlers ...HandlerFunc) IRoutes {
    return group.handle("DELETE", relativePath, handlers)
}
```

从源代码中可以发现它们实际上都是对 `group.handle(httpMethod, relativePath, handlers)` 函数的调用，只不过传入的 `httpMethod` 不同，我们来看一下 `group.handle(httpMethod, relativePath, handlers)` 函数相关的源代码：



```go
func (group *RouterGroup) handle(httpMethod, relativePath string, handlers HandlersChain) IRoutes {
    absolutePath := group.calculateAbsolutePath(relativePath)
    handlers = group.combineHandlers(handlers)
    group.engine.addRoute(httpMethod, absolutePath, handlers)
    return group.returnObj()
}

func (group *RouterGroup) calculateAbsolutePath(relativePath string) string {
    return joinPaths(group.basePath, relativePath)
}

func (group *RouterGroup) combineHandlers(handlers HandlersChain) HandlersChain {
    finalSize := len(group.Handlers) + len(handlers)
    if finalSize >= int(abortIndex) {
        panic("too many handlers")
    }
    mergedHandlers := make(HandlersChain, finalSize)
    copy(mergedHandlers, group.Handlers)
    copy(mergedHandlers[len(group.Handlers):], handlers)
    return mergedHandlers
}
```

首先以传递进来的相对路径 `relativePath` 作为参数，调用 `group.calculateAbsolutePath(relativePath)` 函数计算并获取绝对路径 `absolutePath`，在 `group.calculateAbsolutePath(relativePath)` 函数中使用该 `RouterGroup` 的 `basePath` 结合传递进来的相对路径参数 `relativePath` 调用 `joinPaths(absolutePath, relativePath)` 函数进行路径合并操作。

然后以传递进来的处理函数切片 `handlers` 作为参数，调用 `group.combineHandlers(handlers)` 函数，合并处理函数，在 `group.combineHandlers(handlers)` 函数中使用该 `RouterGroup` 自身的 `Handlers` 的长度与传递进来的 `handlers` 的长度创建新的处理函数切片，并先将 `group.Handlers` 复制到新创建的处理函数切片中，再将 `handlers` 复制进去，最后将合并后的处理函数切片返回并重新赋值给 `handlers`。

对一个处理函数切片来说，一般除了最后一个处理函数之外的其他处理函数都为中间件，如果使用 `gin.Default()` 创建路由引擎，那么此处的 `Handlers` 正常情况下包括 `Logger()` 和 `Recovery()` 两个中间件。

接下来看一下核心的 `group.engine.addRoute(method, path, handlers)` 函数的源代码：



```go
func (engine *Engine) addRoute(method, path string, handlers HandlersChain) {
    assert1(path[0] == '/', "path must begin with '/'")
    assert1(method != "", "HTTP method can not be empty")
    assert1(len(handlers) > 0, "there must be at least one handler")

    debugPrintRoute(method, path, handlers)
    root := engine.trees.get(method)
    if root == nil {
        root = new(node)
        root.fullPath = "/"
        engine.trees = append(engine.trees, methodTree{method: method, root: root})
    }
    root.addRoute(path, handlers)
}
```

首先是对传进来的三个参数 `method`，`path` 和 `handlers` 进行断言，分别是 `path` 要以 `"/"` 为前缀，`method` 不能为空字符串，`handlers` 切片的长度必须大于 0；

然后是通过传进来的 `method` 参数，即 HTTP 方法类型，作为参数来获取对应方法树的根节点，如果获取到的根节点为 `nil`，则表示不存在该方法树，这时创建一个新的根节点作为新方法树的根节点，并将该新的方法树追加至该引擎的方法树切片中，最后使用传递进来的 `path` 和 `handlers` 作为参数，调用该根节点内置的 `addRoute(path, handlers)` 函数，下面，我们来看一下该函数的源代码：



```go
func (n *node) addRoute(path string, handlers HandlersChain) {
    fullPath := path
    n.priority++
    // 根据 path 中的 "/" 和 "*" 计算 param 数量
    numParams := countParams(path)

    parentFullPathIndex := 0

    // non-empty tree
    if len(n.path) > 0 || len(n.children) > 0 {
    walk:
        for {
            // Update maxParams of the current node
            if numParams > n.maxParams {
                n.maxParams = numParams
            }

            // Find the longest common prefix.
            // This also implies that the common prefix contains no ':' or '*'
            // since the existing key can't contain those chars.
            // 计算 path 与 n.path 的公共前缀长度
            // 假如 path="/user/:id", n.path="/users"
            // 则他们的公共前缀 i=5
            i := 0
            max := min(len(path), len(n.path))
            for i < max && path[i] == n.path[i] {
                i++
            }

            // Split edge
            // 如果 i < n.path，表示需要进行节点分裂
            // 假如 path="/user/:id", n.path="/users"
            // 由于 i=5 < len(n.path), 则对 n 进行分裂, 为其添加 path="s" 的孩子节点
            if i < len(n.path) {
                child := node{
                    path:      n.path[i:],
                    wildChild: n.wildChild,
                    indices:   n.indices,
                    children:  n.children,  // 将 n 节点中的所有 children 转移至 child.children 中
                    handlers:  n.handlers,
                    priority:  n.priority - 1,
                    fullPath:  n.fullPath,
                }

                // Update maxParams (max of all children)
                // 更新该 child 节点的 maxParams
                for i := range child.children {
                    if child.children[i].maxParams > child.maxParams {
                        child.maxParams = child.children[i].maxParams
                    }
                }

                // 修改 n 中的 children 仅为当前创建的 child 节点
                n.children = []*node{&child}
                // []byte for proper unicode char conversion, see #65
                // 修改 n 中的索引 indices 为分裂节点的首字符
                n.indices = string([]byte{n.path[i]})
                // 修改 n.path 为分裂位置之前的路径值
                n.path = path[:i]
                n.handlers = nil
                n.wildChild = false
                n.fullPath = fullPath[:parentFullPathIndex+i]
            }

            // Make new node a child of this node
            // 将新节点添加至 n 的子节点
            // 假设 n{path: "/", fullPath: "/user/:id", wildChild: true}, path="/:id/*action"
            // 则 i=1, i < path
            // 这时 n 不需要分裂子节点, 并且新节点将成为 n 的子孙节点
            if i < len(path) {
                // 同样以 n{path: "/", fullPath: "/user/:id", wildChild: true}, path="/:id/*action" 为例
                // path=":id/*action"
                path = path[i:]

                // 如果 n 为通配符节点, 即 nType 为 param 或 catchAll 的上一个节点
                if n.wildChild {
                    // 无需再对 n 进行匹配, 直接移动当前父节点完整路径游标
                    parentFullPathIndex += len(n.path)
                    // 将 n 设置为 n 的子节点 (通配符节点只会有一个子节点)
                    n = n.children[0]
                    // 增加新的 n 的优先级
                    n.priority++

                    // Update maxParams of the child node
                    // 更新新的 n 的最大可匹配参数值 maxParams
                    if numParams > n.maxParams {
                        n.maxParams = numParams
                    }
                    // 由于已遇到通配符节点, 因此当前要添加 path 的 numParams 减 1
                    numParams--

                    // Check if the wildcard matches
                    // 检查通配符是否匹配
                    // 如当前 n.path 已匹配至 ":id"
                    // 而 path 为 ":id/*action"
                    // 此时 n.path=":id" == path[:len(n.path)]=":id"
                    if len(path) >= len(n.path) && n.path == path[:len(n.path)] {
                        // check for longer wildcard, e.g. :name and :names
                        // 继续检查更长的通配符
                        if len(n.path) >= len(path) || path[len(n.path)] == '/' {
                            continue walk
                        }
                    }

                    pathSeg := path
                    if n.nType != catchAll {
                        pathSeg = strings.SplitN(path, "/", 2)[0]
                    }
                    prefix := fullPath[:strings.Index(fullPath, pathSeg)] + n.path
                    panic("'" + pathSeg +
                        "' in new path '" + fullPath +
                        "' conflicts with existing wildcard '" + n.path +
                        "' in existing prefix '" + prefix +
                        "'")
                }

                c := path[0]

                // slash after param
                // 假设 n={path: ":id", fullPath: "/user/:id", indices: "/", nType=param}, path="/:post/*action", fullPath="/user/:id/:post/*action"
                // 如果 n 还存在孩子节点, 则将 n 修改为其孩子节点, 从该孩子节点继续为 path 匹配合适位置
                if n.nType == param && c == '/' && len(n.children) == 1 {
                    parentFullPathIndex += len(n.path)
                    n = n.children[0]
                    n.priority++
                    continue walk
                }

                // Check if a child with the next path byte exists
                // 检查 n 中是否存在符合 path 的索引, 若存在则将该索引对应的节点赋值给 n, 从该节点继续为 path 匹配合适位置
                // 假设 n={path: "/user", fullPath: "/user", indices: "/s"}, path="/:id/*action", c="/"
                for i := 0; i < len(n.indices); i++ {
                    if c == n.indices[i] {
                        parentFullPathIndex += len(n.path)
                        i = n.incrementChildPrio(i)
                        n = n.children[i]
                        continue walk
                    }
                }

                // Otherwise insert it
                // 假设 n={path: "/user", fullPath: "/user"}, path="/:id", fullPath="/user/:id"
                // 那么直接将该 path 为 "/:id", fullPath 为 "/user/:id" 的新节点添加至 n 的子节点中
                if c != ':' && c != '*' {
                    // []byte for proper unicode char conversion, see #65
                    n.indices += string([]byte{c})
                    child := &node{
                        maxParams: numParams,
                        fullPath:  fullPath,
                    }
                    n.children = append(n.children, child)
                    // 增加 n 孩子节点的优先级
                    n.incrementChildPrio(len(n.indices) - 1)
                    n = child
                }
                // 将该 path 添加至 n 的孩子节点中
                n.insertChild(numParams, path, fullPath, handlers)
                return

            } else if i == len(path) { // Make node a (in-path) leaf
                if n.handlers != nil {
                    panic("handlers are already registered for path '" + fullPath + "'")
                }
                n.handlers = handlers
            }
            return
        }
    } else { // Empty tree
        // 当前树为空, 直接将该 path 添加至 n 的孩子节点中
        n.insertChild(numParams, path, fullPath, handlers)
        // 设置该节点为 root 节点
        n.nType = root
    }
}
```

该部分的源代码内容有点多，而且有点绕，建议配合第一部分末尾给出的路由树图观看，其中 `n.incrementChildPrio(post)` 函数用于为新组合的子节点添加优先级，并且在必要时，对索引以及子节点切片进行重新排序，`n.insertChild(numParams, path, fullPath, handlers)` 函数用于创建新节点，同时设置其节点类型，处理函数等，并将其插入至 n 的子节点中。

以上是 Gin 路由树的构建过程，该部分稍微比较复杂，且需要对查找树 `Trie` 有一定了解。

## 路由的匹配

讲完路由的构建，我们来看看 Gin 是如何实现路由匹配的，看一下下面的这段代码：



```go
func main() {
    router := gin.Default()

    router.GET("/users", func(c *gin.Context) {})
    router.GET("/user/:id", func(c *gin.Context) {})
    router.GET("/user/:id/*action", func(c *gin.Context) {})

    router.POST("/create", func(c *gin.Context) {})
    router.POST("/deletes", func(c *gin.Context) {})
    router.POST("/deleted", func(c *gin.Context) {})

    router.DELETE("/use", func(c *gin.Context) {})
    router.DELETE("/uso", func(c *gin.Context) {})

    router.Run(":8000")
}

func (engine *Engine) Run(addr ...string) (err error) {
    defer func() { debugPrintError(err) }()

    address := resolveAddress(addr)
    debugPrint("Listening and serving HTTP on %s\n", address)
    err = http.ListenAndServe(address, engine)
    return
}
```

从源代码中可以发现，Gin 内部实际上调用了 Go 自带函数库 `net/http` 库中的 `http.ListenAndServe(addr, handler)` 函数，并且该函数的 `handler` 为 `Handler` 接口类型，其源代码如下：



```go
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
```

由此，我们可以知道，在 Gin 的 `Engine` 结构中，实现了该接口，所以，我们只需把关注点放到 Gin 实现 `Handler` 接口的 `ServeHTTP(ResponseWriter, *Request)` 函数中即可，下面我们来看一下 Gin 对该接口的实现源代码：



```go
func (engine *Engine) ServeHTTP(w http.ResponseWriter, req *http.Request) {
    c := engine.pool.Get().(*Context)
    c.writermem.reset(w)
    c.Request = req
    c.reset()

    engine.handleHTTPRequest(c)

    engine.pool.Put(c)
}
```

首先是从引擎的对象池中获取一个 Gin 的上下文对象，并对其属性进行重置操作，至于 Gin 上下文的内容这里不做展开讨论，在本系列的后续文章中，会与 Go 自带函数库中的 `context` 库结合讨论。

然后以该 `Context` 对象作为参数调用 `engine.handleHTTPRequest(c)` 函数对请求进行处理，最后再将该 `Context` 重新放入该 Gin 引擎的对象池中。下面来看一下该函数的源代码，在本系列的第一篇文章 [Gin 源码学习（一）丨请求中 URL 的参数是如何解析的？](https://www.jianshu.com/p/87df4a810ae5) 中有对其稍微介绍过，所以我们这里同样，只针对路由匹配的内容来对其进行讲解：



```go
func (engine *Engine) handleHTTPRequest(c *Context) {
    httpMethod := c.Request.Method
    rPath := c.Request.URL.Path
        // 省略部分代码

    // Find root of the tree for the given HTTP method
    t := engine.trees
    for i, tl := 0, len(t); i < tl; i++ {
        // 遍历方法树切片, 获取与请求方法相同的方法树的根节点
        if t[i].method != httpMethod {
            continue
        }
        root := t[i].root
        // Find route in tree
        // 根据请求 URI 从该方法树中进行路由匹配并获取请求参数
        value := root.getValue(rPath, c.Params, unescape)
        // 如果获取到的 value.handlers 不为 nil, 表示路由树中存在处理该 URI 的路由
        if value.handlers != nil {
            c.handlers = value.handlers
            c.Params = value.params
            c.fullPath = value.fullPath
            c.Next()
            c.writermem.WriteHeaderNow()
            return
        }
        // 如果无匹配路由, 并且请求方法不为 "CONNECT", 请求的 URI 不为 "/"
        // 则判断是否开启重定向配置, 若开启, 则进行重定向操作
        if httpMethod != "CONNECT" && rPath != "/" {
            if value.tsr && engine.RedirectTrailingSlash {
                redirectTrailingSlash(c)
                return
            }
            if engine.RedirectFixedPath && redirectFixedPath(c, root, engine.RedirectFixedPath) {
                return
            }
        }
        break
    }

    // 如果开启 HandleMethodNotAllowed, 则在其他请求类型的方法树中进行匹配
    if engine.HandleMethodNotAllowed {
        for _, tree := range engine.trees {
            if tree.method == httpMethod {
                continue
            }
            // 如果在其他请求类型的方法树中能够匹配到该请求 URI, 并且处理函数切片不为空, 则返回 405 错误
            if value := tree.root.getValue(rPath, nil, unescape); value.handlers != nil {
                c.handlers = engine.allNoMethod
                serveError(c, http.StatusMethodNotAllowed, default405Body)
                return
            }
        }
    }
    // 返回 404 错误
    c.handlers = engine.allNoRoute
    serveError(c, http.StatusNotFound, default404Body)
}
```

从上面源代码中，我们可以发现，路由的匹配操作，是在 `root.getValue(rPath, po, unescape)` 函数中进行的，下面我们来看一下该函数的源代码并结合具体实例来对其进行分析，该函数同样在本系列的第一篇文章中出现过，此处仅对路由匹配的内容进行讲解：



```go
func (n *node) getValue(path string, po Params, unescape bool) (value nodeValue) {
    value.params = po
walk: // Outer loop for walking the tree
    // 使用 for 循环进行节点访问匹配操作
    for {
        // 判断当前请求的 path 长度是否比当前节点的 n.path 长
        // 如果是, 则使用当前节点的 n.path 与 path 进行匹配
        if len(path) > len(n.path) {
            // 判断当前路由节点的 path 与请求的 path 前缀是否完全一致
            if path[:len(n.path)] == n.path {
                // 对请求的 path 进行重新截取, 去除与当前节点完全匹配的前缀部分
                path = path[len(n.path):]
                // If this node does not have a wildcard (param or catchAll)
                // child,  we can just look up the next child node and continue
                // to walk down the tree
                // 如果当前节点不为通配符节点
                if !n.wildChild {
                    // 获取请求 path 的第一个字符
                    c := path[0]
                    // 遍历当前路由节点的 indices, 判断是否存在与请求 path 匹配的索引
                    for i := 0; i < len(n.indices); i++ {
                        if c == n.indices[i] {
                            // 如果存在, 将当前路由节点修改为该子节点
                            n = n.children[i]
                            // 跳转至 walk, 开始下一轮匹配
                            continue walk
                        }
                    }

                    // Nothing found.
                    // We can recommend to redirect to the same URL without a
                    // trailing slash if a leaf exists for that path.
                    value.tsr = path == "/" && n.handlers != nil
                    return
                }

                // handle wildcard child
                // 当前节点为通配符节点
                // 表示其仅有一个子节点, 且节点类型为 param 或者 catchAll
                n = n.children[0]
                switch n.nType {
                case param: // 如果当前路由节点类型为 param
                    // find param end (either '/' or path end)
                    end := 0
                    for end < len(path) && path[end] != '/' {
                        end++
                    }

                    // save param value
                    if cap(value.params) < int(n.maxParams) {
                        value.params = make(Params, 0, n.maxParams)
                    }
                    i := len(value.params)
                    value.params = value.params[:i+1] // expand slice within preallocated capacity
                    value.params[i].Key = n.path[1:]
                    val := path[:end]
                    if unescape {
                        var err error
                        if value.params[i].Value, err = url.QueryUnescape(val); err != nil {
                            value.params[i].Value = val // fallback, in case of error
                        }
                    } else {
                        value.params[i].Value = val
                    }

                    // we need to go deeper!
                    // 如果用于匹配参数的 end 下标小于当前请求 path 的长度
                    if end < len(path) {
                        // 如果当前路由节点存在孩子节点
                        if len(n.children) > 0 {
                            // 对当前请求 path 进行重新截取
                            path = path[end:]
                            // 获取当前路由节点的孩子节点
                            n = n.children[0]
                            // 跳转至 walk, 开始下一轮匹配
                            continue walk
                        }

                        // ... but we can't
                        value.tsr = len(path) == end+1
                        return
                    }

                    // 如果当前的 handlers 不为空, 则返回
                    if value.handlers = n.handlers; value.handlers != nil {
                        value.fullPath = n.fullPath
                        return
                    }
                    // 如果当前路由节点有一个子节点
                    if len(n.children) == 1 {
                        // No handle found. Check if a handle for this path + a
                        // trailing slash exists for TSR recommendation
                        // 没有找到处理该请求 path 的处理函数
                        // 如果当前路由节点的子节点的 path 为 "/" 且存在处理函数
                        // 则设置 value.tsr 为true
                        n = n.children[0]
                        value.tsr = n.path == "/" && n.handlers != nil
                    }

                    return

                case catchAll:  // 如果当前路由节点的类型为 catchAll
                    // 直接将当前的请求 path 存储至 value.params 中
                    // save param value
                    if cap(value.params) < int(n.maxParams) {
                        value.params = make(Params, 0, n.maxParams)
                    }
                    i := len(value.params)
                    value.params = value.params[:i+1] // expand slice within preallocated capacity
                    value.params[i].Key = n.path[2:]
                    if unescape {
                        var err error
                        if value.params[i].Value, err = url.QueryUnescape(path); err != nil {
                            value.params[i].Value = path // fallback, in case of error
                        }
                    } else {
                        value.params[i].Value = path
                    }

                    value.handlers = n.handlers
                    value.fullPath = n.fullPath
                    return

                default:
                    panic("invalid node type")
                }
            }
        } else if path == n.path {  // 如果当前请求的 path 与当前节点的 path 相同
            // We should have reached the node containing the handle.
            // Check if this node has a handle registered.
            // 由于路由已匹配完成, 因此只需检查当前已创建的路由节点中是否存在处理函数
            // 如果存在处理函数, 则直接返回
            if value.handlers = n.handlers; value.handlers != nil {
                value.fullPath = n.fullPath
                return
            }

            // 如果当前匹配的路由节点中不存在处理函数
            // 且当前请求的 path 为 "/", 并且当前节点的子节点为 param 节点或 catchAll 节点, 且当前节点不为 root 节点
            // 则设置 tsr(trailing slash redirect, 尾部斜线重定向) 为 true, 并返回
            if path == "/" && n.wildChild && n.nType != root {
                value.tsr = true
                return
            }

            // No handle found. Check if a handle for this path + a
            // trailing slash exists for trailing slash recommendation
            // 没有找到匹配路由的处理函数
            // 检查该路由节点是否存在 path 仅为 "/" 且处理函数不为空的子节点, 或者节点类型为 catchAll 且处理函数不为空的子节点, 若存在, 则设置 tsr 为 true, 并返回
            for i := 0; i < len(n.indices); i++ {
                if n.indices[i] == '/' {
                    n = n.children[i]
                    value.tsr = (len(n.path) == 1 && n.handlers != nil) ||
                        (n.nType == catchAll && n.children[0].handlers != nil)
                    return
                }
            }

            return
        }

        // Nothing found. We can recommend to redirect to the same URL with an
        // extra trailing slash if a leaf exists for that path
        // 当前请求的 path 的长度比当前路由节点的 path 的长度短
        // 尝试在请求的 path 尾部添加 "/", 如果添加后的请求 path 与当前路由节点的 path 相同, 且当前路由节点存在处理函数, 则设置 tsr 为 true, 并返回
        value.tsr = (path == "/") ||
            (len(n.path) == len(path)+1 && n.path[len(path)] == '/' &&
                path == n.path[:len(n.path)-1] && n.handlers != nil)
        return
    }
}
```

例如，一个 URI 为 `/user/1/send` 的 GET 请求的匹配过程，如下图所示：

![img](/9_gin_router.assets/webp-16939313732303.webp)

## 小结

这篇文章讲解了 Gin 路由的结构、构建以及匹配过程，Gin 内部使用查找树 `Trie` 来存储路由节点。[原文链接](https://www.jianshu.com/p/ffc7bae654e5)



## 拓展

在相同长度为26的`map[string]string`、`string`、`arr []string`中，找同一个字符"z"，哪个性能好？

> 查找函数

```go
package find


func MapFind(s string, m map[string]struct{}) bool {
	if _, ok := m[s]; ok {
		return true
	}
	return false
}

func StringFind(s string, longS string) bool {
	i := 0
	for i<len(longS) {
		if longS[i] == s[0] {
			return true
		}
		i++
	}
	return false
}

func ArrFind(s string, arrs []string) bool {
	i := 0
	for i<len(arrs) {
		if arrs[i] == s {
			return true
		}
		i++
	}
	return false
}
```

> 基准测试

```go
package find

import (
	"fmt"
	"testing"
)

func TestIsFind(t *testing.T) {
	// 可以放初始化代码，时间过长，需要使用 b.ResetTimer()
	m := make(map[string]struct{})
	for _, b := range "abcdefghijklmnopqrstuvwxyz" {
		m[string(b)] = struct{}{}
	}
	arrs := make([]string, 0)
	for _, b := range "abcdefghijklmnopqrstuvwxyz" {
		arrs = append(arrs, string(b))
	}
	// 将计时器归零, 避免循环之前的初始化代码的干扰
	fmt.Println(MapFind("z", m))
	fmt.Println(StringFind("z", "abcdefghijklmnopqrstuvwxyz"))
	fmt.Println(ArrFind("z", arrs))
}

func BenchmarkMapFind(b *testing.B) {
	// 可以放初始化代码，时间过长，需要使用 b.ResetTimer()
	m := make(map[string]struct{})
	for _, b := range "abcdefghijklmnopqrstuvwxyz" {
		m[string(b)] = struct{}{}
	}
	// 将计时器归零, 避免循环之前的初始化代码的干扰
	// 排除初始化代码的影响，只测试循环内部的代码性能。
	b.ResetTimer()

	// loop b.N times
	for i := 0; i < b.N; i++ {
		// 待测试性能的函数
		MapFind("z", m)
	}
}

func BenchmarkStringFind(b *testing.B) {
	// 可以放初始化代码，时间过长，需要使用 b.ResetTimer()
	longS := "abcdefghijklmnopqrstuvwxyz"
	// 将计时器归零, 避免循环之前的初始化代码的干扰
	// 排除初始化代码的影响，只测试循环内部的代码性能。
	b.ResetTimer()
	// loop b.N times
	for i := 0; i < b.N; i++ {
		// 待测试性能的函数
		StringFind("z", longS)
	}
}

func BenchmarkArrsFind(b *testing.B) {
	// 可以放初始化代码，时间过长，需要使用 b.ResetTimer()
	// 可以放初始化代码，时间过长，需要使用 b.ResetTimer()
	arrs := make([]string, 0)
	for _, b := range "abcdefghijklmnopqrstuvwxyz" {
		arrs = append(arrs, string(b))
	}
	// 将计时器归零, 避免循环之前的初始化代码的干扰
	// 排除初始化代码的影响，只测试循环内部的代码性能。
	b.ResetTimer()

	// loop b.N times
	for i := 0; i < b.N; i++ {
		// 待测试性能的函数
		ArrFind("z", arrs)
	}
}

```

测试结果：

![image-20230906013334315](D:\个人项目\github\muxicode.github.io\docs\.vuepress\public\9_gin_router.assets\image-20230906013334315.png)

我们发现在字符串中找的速度最快，比`map`还快！