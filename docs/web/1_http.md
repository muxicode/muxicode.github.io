# http包基础

## 基础使用

`net/http`是Go语言标准库中提供的用于处理HTTP请求和响应的包。它提供了一个简单而强大的API，可用于构建Web服务器和编写HTTP客户端。下面是`net/http`包的基本使用介绍：

1. 导入包：
   在代码文件的开头，使用`import`语句导入`net/http`包：

   ```go
   import "net/http"
   ```

2. 创建处理HTTP请求的处理器函数：
   处理器函数用于处理特定HTTP请求，并生成相应的响应。通常，处理器函数具有以下形式的签名：

   ```go
   func handlerFunc(w http.ResponseWriter, r *http.Request) {
       // 处理请求并生成响应
   }
   ```

3. 注册处理器函数和路由：
   使用`http.HandleFunc()`函数将处理器函数注册到指定的路径上：

   ```go
   http.HandleFunc("/path", handlerFunc)
   ```

4. 启动HTTP服务器：
   使用`http.ListenAndServe()`函数指定服务器的监听地址，并开始监听和处理HTTP请求：

   ```go
   http.ListenAndServe(":8080", nil)
   ```

   上述代码将启动一个监听本地8080端口的HTTP服务器。第二个参数是处理请求的处理器，如果为`nil`，则使用默认的`http.DefaultServeMux`。

5. 处理请求和生成响应：
   在处理器函数中，可以通过`http.ResponseWriter`对象向客户端发送响应，以及使用`http.Request`对象访问请求的信息。例如：

   ```go
   func handlerFunc(w http.ResponseWriter, r *http.Request) {
       // 设置响应的Content-Type头
       w.Header().Set("Content-Type", "text/plain")
       
       // 向客户端发送响应的内容
       fmt.Fprintln(w, "Hello, World!")
   }
   ```

   上述代码将设置响应的Content-Type为"text/plain"，然后使用`fmt.Fprintln()`将字符串"Hello, World!"发送给客户端。

这是`net/http`包的基本用法示例。通过使用更多的函数和类型，例如`http.ServeFile()`、`http.Redirect()`、`http.Cookie`等，你可以实现更丰富和复杂的HTTP服务器和客户端功能。你可以参考官方文档（https://golang.org/pkg/net/http/）了解更多详细信息和示例代码。



## 代码示例

```go
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func home(w http.ResponseWriter, r *http.Request)  {
	fmt.Fprint(w, "Hi, this is home page")
}

func readBodyOnce(w http.ResponseWriter, r *http.Request)  {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "read body failed: %v", err)
		// 记住要返回，不然就还会执行后面的代码
		return
	}
	// 类型转换，将 []byte 转换为 string
	fmt.Fprintf(w, "read the data: %s \n", string(body))

	// 尝试再次读取，啥也读不到，但是也不会报错
	body, err = io.ReadAll(r.Body)
	if err != nil {
		// 不会进来这里
		fmt.Fprintf(w, "read the data one more time got error: %v", err)
		return
	}
	fmt.Fprintf(w, "read the data one more time: [%s] and read data length %d \n", string(body), len(body))
}


func getBodyIsNil(w http.ResponseWriter, r *http.Request) {
	if r.GetBody == nil {
		fmt.Fprint(w, "GetBody is nil \n")
	} else {
		fmt.Fprintf(w, "GetBody not nil \n")
	}
}

func queryParams(w http.ResponseWriter, r *http.Request) {
	values := r.URL.Query()
	fmt.Fprintf(w, "query is %v\n", values)
}

func wholeUrl(w http.ResponseWriter, r *http.Request)  {
	data, _ := json.Marshal(r.URL)
	fmt.Fprintf(w, string(data))
}

func header(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "header is %v\n", r.Header)
}

func form(w http.ResponseWriter, r *http.Request)  {
	fmt.Fprintf(w, "before parse form %v\n", r.Form)
	err := r.ParseForm()
	if err != nil {
		fmt.Fprintf(w, "parse form error %v\n", r.Form)
	}
	fmt.Fprintf(w, "before parse form %v\n", r.Form)
}

func main() {
	http.HandleFunc("/", home)
	http.HandleFunc("/body/once", readBodyOnce)
	http.HandleFunc("/body/multi", getBodyIsNil)
	http.HandleFunc("/url/query", queryParams)
	http.HandleFunc("/header", header)
	http.HandleFunc("/wholeUrl", wholeUrl)
	http.HandleFunc("/form", form)
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
```

## http链接的维护？

```go
func home(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK) // 发送响应头部信息

	// 将数据写入http.ResponseWriter并立即发送到客户端
	fmt.Fprint(w, "Hi, this is home page\n")
	w.(http.Flusher).Flush() // 立即发送数据到客户端

	fmt.Fprint(w, "xixi\n") // 继续写入数据，将在处理器函数返回时发送到客户端
}
```

以上代码，我们往`w http.ResponseWriter`多次写入数据，客户端是怎么接受到数据的呢？是每次写每次收到吗？

- 并不是每次写客户端都直接收到，而是调用 `w.(http.Flusher).Flush() `的时候发送数据
- `fmt.Fprint(w, "Hi, this is home page\n") `这个代码是往缓冲区写数据，并发包括发送。

> 链接断开由包维护

整个HTTP响应的结束是由Golang的`net/http`包内部维护的。具体来说，在处理器函数返回时，`net/http`包会自动执行以下步骤完成HTTP响应的结束过程：

1. 刷新缓冲区的数据：
   `net/http`包会自动将缓冲区中的数据发送到客户端。这包括之前通过`http.ResponseWriter`写入的所有数据，以及在处理器函数返回之前写入的任何数据。
2. 发送响应尾部（Trailer）：
   如果你使用`http.ResponseWriter`的`Header()`方法设置了响应尾部的字段，例如`w.Header().Set("Trailer", "X-Foo")`，那么`net/http`包会在结束时自动发送响应尾部到客户端。
3. 关闭连接：
   在所有数据都发送完成后，`net/http`包会关闭与客户端的连接，结束整个HTTP响应过程。

以下是`net/http`包中相关代码的简化版本，展示了HTTP响应结束的大致流程：

```go
// 在 net/http/server.go 中的 Server 结构体的 ServeHTTP 方法中
func (server *Server) ServeHTTP(w ResponseWriter, req *Request) {
    // ...

    // 处理器函数逻辑

    // 处理器函数返回后，执行响应结束过程
    w.(http.CloseNotifier).CloseNotify() // 触发关闭通知
    w.Header().Set("Content-Length", strconv.Itoa(w.ContentLength())) // 设置 Content-Length 头部字段
    w.(http.Flusher).Flush() // 刷新缓冲区的数据
    server.sendResponse(w, req) // 发送响应尾部和关闭连接

    // ...
}

// 在 net/http/server.go 中的 sendResponse 方法中
func (server *Server) sendResponse(w ResponseWriter, req *Request) {
    // ...

    // 发送响应尾部（Trailer）
    if trailer := w.Header().get("Trailer"); trailer != "" {
        w.Write([]byte("\r\nTrailer: " + trailer + "\r\n\r\n"))
    }

    // 关闭连接
    w.(http.CloseNotifier).CloseNotify()
    conn.Close()

    // ...
}
```

以上代码仅展示了`net/http`包中关于HTTP响应结束的部分逻辑，实际代码更加复杂，还涉及到错误处理、超时处理等方面。这段简化的代码可以帮助你理解HTTP响应结束的大致过程，但并不完整，具体实现细节可能因版本和特定实现而有所不同。



