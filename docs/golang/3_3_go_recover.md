---
title: recover 如何在panic 中拯救程序？
autoGroup-3: 其他高级特性
---

# recover 如何在panic 中拯救程序？

> panic 的基本使用

- panic 会抛出错误
- 终止协程运行
- 带崩整个Go程序

> panic + defer

- panic 在退出协程之前会执行所有已注册的defer
- 不会执行其他协程的defer

> 源码

C:\Program Files\Go\src\runtime\panic.go

```go
// The implementation of the predeclared function panic.
func gopanic(e any) {
	for { // 一直循环本地的defer去执行
		d := gp._defer 
		if d == nil {
			break
        }
        ...
        if p.recovered { 
            // 如果有 recover 执行recover的逻辑
            // 不带崩程序
			gp._panic = p.link
        }
     }
```

> panic + defer + recover

- 在 defer 中执行 recover， 可以拯救 panic 的协程

> 原理

- 如果涉及 recover， defer 会使用堆上分配（deferpool）
- 遇到 panic， panic 会从 deferpool 取出的 defer 语句，执行
- defer 中调用 recover，可以终止panic的过程

```go
go func() {
    defer func(){
        recover()
    }
    panic("")
    fmt.Println("end g")
}

```

> 总结

- panic 终止当前协程的运行
- panic 在退出协程之前会执行所有已注册的defer
- 在defer中执行recover，可以拯救panic的协程