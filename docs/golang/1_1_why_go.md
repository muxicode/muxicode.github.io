---
title: 为什么是Go？
autoGroup-1: 基础及入门
---

# 为什么是GO？

## 自身优势？

### C/C++

- C 语言不是面向对象
- 直接编译为机器码，不需要执行环境
- 一次编码只能适用一种平台
- 自己处理GC问题

### Java

- 编译为中间码（字节码）
- 需要特定执行环境（JVM）
- 一次编译多处执行
- 有虚拟化损失

 JavaScript

- 不需要编译，直接解释执行
- 需要执行环境（浏览器）
- 有虚拟化损失

### Go

- 直接编译为二进制，没有虚拟化损失
- 自带运行环境，无需处理GC问题
- 一次编码可以适用多种平台
- 超强的并发支持能力与并发易用性 

![](/why_go.assets/go语言项目.drawio.png)

### 总结

- Go综合了多种语言的优势
- Go是一种天生支持高性能并发的场景
- Go在工业界有广泛的应用

## 何为RunTime？

### 很多语言都有Runtime

- Runtime 就是程序的运行环境
- Java：Java虚拟机
- JavaScript：浏览器内核

### GO中Runtime的特点

- 没有虚拟机的概念
- 作为程序的一部分打包进二进制的产物
- 随用户程序一起运行
- 与用户程序没有明显界限，直接通过函数调用

### Go中Runtime的能力

- 内存管理能力
- 垃圾回收机制 
- 超强的并发机制（协程调度）

其他：

- 有一定的屏蔽系统调用能力
- 一些go关键字其实是Runtime下的函数

![](/why_go.assets/go关键字.drawio.png)

### 总结

- go的runtime负责内存管理，垃圾回收，协会调度
- go的runtime被编译为用户程序的一部分，一起运行

## Go程序是如何编译的？

![](/why_go.assets/编译解析.drawio.png)

编译过程

![](/why_go.assets/go编译过程.drawio.png)

### 词法分析

- 将源代码翻译成Token
- Token是代码中的最小语义结构

### 句法分析

![](/why_go.assets/句法分析.drawio.png)

### 语义分析

- 类型检查
- 类型推断
- 查看类型是否匹配
- 函数调用内联
- 逃逸分析

### 中间码生成

- 为了处理不同平台的差异，先生成中间码（SSA）【平台无关的汇编】

![](/why_go.assets/中间码.drawio.png)

- 查看从代码到SSA中间码的整个过程

```
windows cmd： set GOSSAFUNC=main
```

![](/why_go.assets/查看中间码生成.drawio.png)

### 机器码生成

- 先生成Plan9汇编代码

```go
go build -gcflags -S main.go
```

### 链接 

- 将各个包及逆行链接，包括runtime

### 总结

![](/why_go.assets/编译总结.drawio.png)

## Go程序是如何运行的？

### go程序的入口？

- main方法？
- runtime/rt0_XXX.s（汇编语言）

```go
CALL	runtime·args(SB) // 对命令中的args进行初处理
	初始化runtime包中的参数
	argc --- 参数数量
	argv --- 参数值
	
CALL	runtime·osinit(SB) // 检查多核，给schedule初始化

CALL	runtime·schedinit(SB) // 初始化调度器
全局栈空间内存分配
加载命令行参数到 os.Args
堆内存空间的初始化
加载操作系统环境变量
初始化当前系统线程
垃圾回收机制的参数初始化
算法初始化（map、hash）
设置process数量

// 取主函数的地址，放入协程
MOVQ	$runtime·mainPC(SB), AX		// 指向runtime.main 函数

// 创建协程，放入调度器，等待调度
CALL	runtime·newproc(SB)

// 初始化m ，用来调度主协程
CALL	runtime·mstart(SB)
```

```go
// 进入runtime包 的 main方法
func main() {g := getg()..}

// 初始化
doInit(&runtime_inittask) // Must be before defer.

// 打开了垃圾回收器
gcenable()

// 执行go中的主函数
fn := main_main 
fn()
```



### 保存参数

- 保存 argc、argv到栈上

### 初始化g0執行栈

- g0是为了调度协程而产生的协程
- g0是go程序的第一个协程

### 运行时检测

- 检查各种类型的长度
- 检查指针操作
- 检查结构体字段偏移量
- 检查atomic原子操作
- 检查CAS操作
- 检查栈大小是否是2的幂次

### 初始化runtime.args

- 对命令行中的参数进行处理
- 参数数量赋值给argc int32
- 参数值复制给给argv **byte

### 调度器的初始化 runtime.schedinit

- 全局栈空间内存分配
- 加载命令行参数到 os.Args
- 堆内存空间的初始化
- 加载操作系统环境变量
- 初始化当前系统线程
- 垃圾回收机制的参数初始化
- 算法初始化（map、hash）
- 设置process数量

### 创建主协程

- 创建一个新的协程，执行runtime.main
- 放入调度器等待调度

### 初始化M

- 初始化一个M，用来调度主协程

### 主协程用来执行主函数

- 执行runtime包中的init方法
- 启动GC垃圾收集器
- 执行用户包依赖的init方法
- 执行用户的主函数，main_main(go:linkename main_main main.main)

### 总结

- Go启动时经理了检查、各种初始化，初始化协程调度的过程
- main.main()也是在协程中运行的

### 问题

- 调度器是什么？
- 为什么初始化M？
- 为什么不是执行main.main()，而是放到调度器执行。

### 体会

- Go程序的启动过程像不像一个虚拟机或者框架？

## Go程序是面向对象的吗？

### Yes and No

- Go允许OO风格
- Go的Struct可以看作其他语言的Class
- Go缺乏其他语言的继承结构
- Go的接口与其他语言有很大的差异

### Go的“类“

- 其他语言中，往往用class表示一类数据
- class的每个实例称作”对象“
- Go中用strcut表示一类数据
- strcut每个实例并不是”对象“，而是此类型的”值“
- struct也可以定义方法

### Go的继承

- Go没有继承
- Go的继承是组合
- 组合中的匿名字段，通过语法糖达成了类似的继承的效果

### Go的接口

- 隐式实现接口（不想java需要指定实现的接口）

### 总结

- Go没有对象，没有类，没有继承
- Go通过组合匿名字段达到类似的继承效果
- 通过以上手段去掉了面向对象中复杂而冗余的部分
- 保留了基本的面向对象的特性

## 实战：企业级Go项目包管理方法

### Go包管理困境

- 没有统一的包管理方式
- 包之间的依赖关系很难维护
- 如果同时需要一个包的不同版本，非常麻烦

### 尝试解决

- 产生过hi使用godep、govendor、glide等解决
- 未测地解决GOPATH存在的问题
- 使用起来麻烦

### Go Moudles（1.11 之后）

- 本质上，一个Go包就是一个项目的源码
- gomod的作用：将Go包和Git项目关联起来
- Go包的版本就是Git项目的Tag
- gomod就是解决”需要哪个git项目的什么版本“

### 使用Modules

- github.com/Jeffail/tunny

  ```
  go get github.com/Jeffail/tunny
  go get github.com/Jeffail/tunny@version
  ```

### Github 无法访问怎么办

- 使用 goproxy.cn作为代理

  ```
  go env -w GOPROXY=https://goproxy.cn,direct
  ```

### 想用本地文件替代怎么办

- go.mod 文件追加：

  ```
  replace github.com/jeffail/tunny => xxx/xxx
  ```

- go vender 缓存到本地

  ```
  go mod vendor // 不是之前的 go vendor, 将依赖包缓存到本地
  go build -mod vendor // 不会去远程拉版本 
  ```

### 同步到github

- 初始化mod文件

```
go mod init github.com/jeffail/tunny
```

- 提交到代码仓库
- 打上tag