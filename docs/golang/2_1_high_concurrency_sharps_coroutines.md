---
title: 高并发利器-协程
autoGroup-2: 高并发下的工具
---

# 高并发的核心工具：协程

- 协程的本质
- 协程的调度

## 为什么要有协程？

### 进程

- 操作系统”程序”的最小单位
- 进程用来占用内存空间
- 进程相当于厂房，占用工厂空间

### 线程

![](/high_concurrency_sharps_coroutines.assets/线程理解.drawio.png)

- 每个进程可以有多个线程
- 线程使用系统分配给进程的内存，线程之间共享内存
- 线程用来占用CPU时间
- 线程的调度需要由系统进行，开销较大
- 线程相当于工厂的生产线，占用工人的工时
- 线程里跑的程序就是生产流程

### 线程的问题

- 线程本身占用资源大（几M数据）
- 线程的操作开销大（状态转换）
- 线程切换开销大

### 协程

![](/high_concurrency_sharps_coroutines.assets/理解协程.drawio.png)

- 协程就是将一段程序的运行状态打包，可以在线程之间调度
- 将生产流程打包，使得流程不固定在生产线上
- 协程并不取代线程，协程也要在线程上运行
- 线程是协程的资源，协程使用线程这个资源

### 协程的优势

- 资源利用（利用任何线程）
- 快速调度（快速切换协程）
- 超高并发

### 总结

- 进程用分配内存空间
- 线程用来分配CPU时间
- 协程用来精细利用线程
- 协程的本质是一段包含了运行状态的程序

## 协程的本质

runtime2.go/g 结构体

![](/high_concurrency_sharps_coroutines.assets/go协程的底层结构.drawio.png)

- runtime中，协程的本质是一个g结构体
- stack：堆栈地址
- gobug：目前程序运行现场
- atomicstatus：协程状态

```go
type g struct {
	stack       stack   // 栈信息高低指针
	sched     gobuf // 调度信息sp 栈指针（指向调用到的地方，不是方法本身），pc程序计数器，运行到了哪一行代码
	atomicstatus  // 协程的状态
	goid                 //协程的id号
}
```

协程本质知道了，但是协程需要放到线程上执行，go里对于线程是怎么描述的呢？

runtime2.go/m 结构体 ------ 我们本身不能创建操作系统的线程，只能用一个结构体记录线程信息

## 线程的抽象

- runtime 中将操作系统线程抽象为m结构体

![](/high_concurrency_sharps_coroutines.assets/go中m结构体.drawio.png)

- g0：g0协程，操作调度器
- curg: current g, 目前线程运行的g
- mOS：操作系统线程信息

```go
type m struct {
	g0      *g            // g0协程，用来操作调度器
	curg    *g            // 当前运行的g 协程
    id      int64         // 线程的ID
	mOS                   // 不同操作系统，对线程而外的描述信息
}
```

## 协程是如何在线程上执行的？

![](/high_concurrency_sharps_coroutines.assets/go线程循环.drawio.png)

schedule方法 --- runtime/proc.go 下

execute方法 --- runtime/proc.go 下

gogo方法  --- 只看到函数声明，是用汇编实现的。asm_amd64.s

----gobuf_sp(BX), SP 插入goexist栈针

```go
func schedule (){
	gp, inheritTime, tryWakeP := findRunnable() //gp 即将要运行的协程
	execute(gp, inheritTime) //执行gp协程
}

func execute(gp *g, inheritTime bool) {
	gogo(&gp.sched)
}

// func gogo(buf *gobuf)
TEXT runtime·gogo(SB), NOSPLIT, $0-8
	JMP	gogo<>(SB)

TEXT gogo<>(SB), NOSPLIT, $0
	MOVQ	gobuf_sp(BX), SP	// restore SP  插入栈针 goexist
	MOVQ	gobuf_pc(BX), BX    // 跳到gobuf的程序计数器执行，业务
	JMP	BX				        // 使用协程自己的栈记录执行信息
```

栈执行完后，到回到栈底 func goexit(neverCallThisFunction) [runtime/stbs.go/goexit方法] 该方法为汇编实现，至汇编代码goexit：

```go
TEXT runtime·goexit(SB),NOSPLIT|TOPFRAME,$0-0
	CALL	runtime·goexit1(SB)	// does not return

// Finishes execution of the current goroutine.
func goexit1() {
	mcall(goexit0)
}

// mcall switches from the g to the g0 stack and invokes fn(g),
// 切换到 g0 的栈空间执行fn
func mcall(fn func(*g)){
}
 
func goexit0(gp *g) {
	gp.preemptStop = false  // 设置一下当前运行完毕的协程的状态
	schedule()                         // 从 g0 栈开始执行 schedule
}
```

单线程循（Go 0.X）：

![](/high_concurrency_sharps_coroutines.assets/go单循环抽象图.drawio.png)

多线程循环（Go 1.0）

![](/high_concurrency_sharps_coroutines.assets/go多线程循环加锁.drawio.png)

简略图：

![](/high_concurrency_sharps_coroutines.assets/多线程循环简略图加锁.drawio.png)

### 线程循环

- 操作系统并不知道Goroutine的存在
- 操作系统线程执行一个调度循环，顺序执行Goroutine
- 调度循环非常像线程池

### 问题

- 协程顺序执行，无法并发
- 多线程并发时，会抢夺协程队列的全局锁

### 总结

- 协程的本质是一个g结构体
- g 结构体记录了协程栈、PC信息
- 最简情况下，线程执行标准调度循环，执行协程

## 为什么要有 G-M-P 调度模型？

- 协程顺序执行，无法并发
- **多线程并发时，会抢夺协程队列的全局锁**

### 本地队列

![](/high_concurrency_sharps_coroutines.assets/本地队列.drawio.png)

### P结构体

![](/high_concurrency_sharps_coroutines.assets/P结构体.drawio.png)

```go
type p struct {
	m           muintptr   // m 的指针，指向线程
	// Queue of runnable goroutines. Accessed without lock.
	runqhead uint32	// 无锁访问 Accessed without lock
	runqtail    uint32
	runq     [256]guintptr
	runnext guintptr     // 下一个可执行的 g 协程
	...
}
```

G-M-P 模型

![](/high_concurrency_sharps_coroutines.assets/GMP模型.drawio.png)

### P 的作用

- M 与 G 之间的中介（送料器）
- P 持有一些G，使得每次获取G的时候不用从全局找 
- 大大减少了并发冲突的情况

### 任务窃取

![](/high_concurrency_sharps_coroutines.assets/任务窃取.drawio.png)

窃取式工作分配机制

- 如果本地或者全局队列中都找不到G
- 去别的P中“偷”
- 增加了线程的利用率

```go
func findRunnable() (gp *g, inheritTime, tryWakeP bool) {
	if gp, inheritTime := runqget(_p_); gp{} // 本地队列
	gp := globrunqget(_p_, 0)			     // 全局队列
	gp, inheritTime, tnow, w, newWork := stealWork(now) // 窃取任务
}

```

### 新建协程

runtime/proc.go/newproc

- 随机寻找一个P
- 将新的协程放入P的runnext（插队）
- 若本地队列满，放入全局队列

### 问题

- **协程顺序执行，无法并发**
- 多线程并发时，会抢夺协程队列的全局锁

## 如何实现协程的并发问题

### 协程饥饿问题

![](/high_concurrency_sharps_coroutines.assets/线程饥饿问题.drawio.png)

### 线程循环-触发切换

![](/high_concurrency_sharps_coroutines.assets/线程循环触发切换.drawio.png)

### 全局队列饥饿问题

![](/high_concurrency_sharps_coroutines.assets/全局队列饥饿问题.drawio.png)

### 切换时机

- 主动挂起
- 系统调用完成时

> 主动挂起: runtime.gopark() -- 切换栈，调回schedule()

![](/high_concurrency_sharps_coroutines.assets/gopark主动挂起.drawio.png)

```go
runtime/proc.go 

// Puts the current goroutine into a waiting state
// G cannot be externally readied.
func gopark(unlockf func(*g, unsafe.Pointer) bool, lock unsafe.Pointer, reason waitReason, traceEv byte, traceskip int) {
	mp.waitlock = lock  // 修改协程状态
	mcall(park_m)         // 切换栈
}

// park continuation on g0.
func park_m(gp *g) {
	...
	schedule()    // 线程的开始点
}
```



> 系统调用完成时

![](/high_concurrency_sharps_coroutines.assets/系统调用完成时.drawio.png)

```go
runtime/proc.go 

func exitsyscall() {
	Gosched()
}

func Gosched() {
	mcall(gosched_m)
}

func gosched_m(gp *g) {
	goschedImpl(gp)
}

func goschedImpl(gp *g) {
	schedule()
}
```

### 总结

- 如果协程顺序执行，会有饥饿问题
- 协程执行中间，将协程挂起，执行其他协程
- 完成系统调用时挂起（没特殊原因，主要时防止任务一直执行），也可以（runtime）主动挂起
- 防止全局队列饥饿，本地队列水机抽取全局队列（每执行61次）

问题

- 永远都不主动挂起
- 永远都不系统调用

## 抢占式调度

思路

- 有没有一个地方，经常会被调用？
- runtime.morestack()



runtime.morestack

- 本意是检查协程栈是否有足够空间
- 调用方法时，会被编译器插入morestack()

```go
go build -n 
//可以看到汇编调用方法的信息，每次函数跳转都会调用 runtime·morestack_noctxt
```

### 标记抢占

- 系统监控到Goroutine运行超过10ms
- 将g.stackguard0 置为 0xfffffade

抢占

- 执行morestack()判断是否被抢占 --- 系统监控器标记的抢占
- 如果被抢占，直接回到 schedule()

```go
TEXT runtime·morestack_noctxt(SB),NOSPLIT,$0
	JMP	runtime·morestack(SB)

TEXT runtime·morestack(SB),NOSPLIT,$0-0
	CALL runtime·newstack(SB)

func newstack() {
	if preempt { //  0xfffffade
		gopreempt_m(gp)
	}
}
```

### 基于协作的抢占式调度

问题：

```go
func do() {
	i := 0
	for {
		i++
	}
}
// 怎么办？
```

### 基于信号的抢占式调度

- 如果永远都不带用morestack()，抢占式调度
- 基于信号的抢占式调度

> 线程信号

- 操作系统中，有很多基于信号的底层通信方式
- 比如 SIGPIPE/ SIGURG / SIGHUP
- 线程可以注册对应信号的处理函数

> 注册信号

- 注册 SIGURG 信号（紧急信号其他地方很少用甚至不用）的处理函数
- GC工作时，向目标线程发送信号（GC时很多线程的业务都停了）
- 线程收到信号，触发调度（func doSigPreempt）

![](/high_concurrency_sharps_coroutines.assets/基于信号的抢占式调度.drawio.png)

```go
func doSigPreempt(gp *g, ctxt *sigctxt) {
	asyncPreempt
}

TEXT ·asyncPreempt(SB),NOSPLIT|NOFRAME,$0-0
	CALL ·asyncPreempt2(SB)

func asyncPreempt2() {
	if gp.preemptStop {
		mcall(preemptPark)
	} else {
		mcall(gopreempt_m)
	}
}
```

### 总结

- 基于系统调用和主动挂起，协程可能无法调度
- 基于协作的抢占式调度：业务主动调用morestaack()
- 基于信号的抢占式调度：强制小城调用doSigPreempt()

## 实战：协程太多了有什么问题？

- 文件打开数限制
- 内存限制
- 调度开销过大

### 处理协程太多的方案

- 优化业务逻辑
- 利用channel的缓冲区
- 协程池
- 调整增加系统的资源

> 利用channel的缓冲区

```go
func TestGoRoutine(t *testing.T){
	do := func (i int, ch chan struct{}) {
		fmt.Println(i)
		<- ch
	}
	ch := make(chan struct{}, 3000)
	for i:=0; i<math.MaxInt32; i++ {
		ch <- struct{}{}
		go do(i, ch)
	}
}
```

- 利用channel的缓存机制
- 启动协程前，向channel送入一个空结构体
- 协程结束，取出一个空结构体

> 协程池 （tunny）

- 预创建一定数量的协程
- 将任务送入协程池队列
- 协程池不断取出可用协程，执行任务

![](/high_concurrency_sharps_coroutines.assets/协程池机制.drawio.png)

慎用协程池

- Go语言的线程，已经相当于池化了
- 二级池化会增加系统复杂度
- Go语言的初衷式希望协程即用即毁，不要池化

### 总结

- 太多的协程会给程序运行带来性能和稳定性问题
- 牺牲并发特性，利用channel缓冲

## 总结

> 为什么用协程

- 协程用来精细利用线程（pc1000个线程暂用系统资源太大，但是如果是1000个协程是轻而易举的）
- 协程可以支撑超高并发

> 协程是什么

- 从runtime的角度看，协程是一个可以被调度的g结构体
- 从线程的角度看，协程是一段程序，自带执行现场

> G-M-P模型

- 通过P结构体，达成了缓存部分G的目的
- P本质上是一个G的本地队列，避免全局并发等待
- 窃取式工作分配机制能够更加充分利用线程资源

> 协程并发

- 如果协程顺序执行，会有饥饿问题
- 协程执行中间，将协程挂起，执行其他协程
- 完成系统调用时挂起，也可以主动挂起
- 防止全局队列饥饿，本地队列随机抽取全局队列

> 抢占式调度

- 基于系统调用和主动挂起，协程可能无法调度
- 基于协作的抢占式调度：业务主动调用morestack()
- 基于信号的抢占式调度：强制线程调用doSigPreempt()
