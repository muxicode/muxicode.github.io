---
title: 通信宝藏-channel
autoGroup-2: 高并发下的工具
---

# 高并发下的通信方式：Channel管道

- Channel 理念
- Channel 结构
- Channel 底层原理

## 为什么要用Channel， 共享内存不好用吗？

> 管道的声明方法

- make(chan int)          // 无缓冲
- make(chan bool, 0)   // 无缓冲
- make(chan string, 2) // 有缓冲 

> Channel 基本用法

- ch <- x      // 发送数据x
- x = <- ch   // 接收数据，赋给x
- <- ch         // 接收数据，并丢弃

```go
// 无缓冲区不能直接往里送
func main() {
	ch := make(chan int)
	ch <- 0
	<-ch
}
// fatal error: all goroutines are asleep - deadlock!

// 可以先启动协程接收
func main() {
	ch := make(chan int)
	go func() {
		fmt.Println(<-ch)
	}()
	ch <- 2
	time.Sleep(time.Second)
}
```

> 内存与通信

- 不要通过共享内存的方式进行通信
- 而是应该通过通信的方式共享内存

共享内存的方案：

```go
func Watch(i *int) {
	for true {
		if *i == 1 {
			fmt.Println("hello")
			break
		}
	}

}

func main() {
	i := 0
	go Watch(&i)

	time.Sleep(time.Second)
	i = 1
	time.Sleep(time.Second)
}
```

管道的方式：

```go
func Watch(ch chan int) {
	for true {
		if <-ch == 1 {
			fmt.Println("hello")
			break
		}
	}

}

func main() {
	ch := make(chan int)
	go Watch(ch)

	time.Sleep(time.Second)
	ch <- 1
	time.Sleep(time.Second)
}
```

> 为什么要使用通信来共享内存？

- 避免协程竞争和数据冲突的问题
- 更高级的抽象，降低开发难度，增加程序的可读性
- 模块之间更容易解耦，增强拓展性和可维护性

## 如何设计高性能的 Channel



> 如何设计 Channel

![](/2_3_channel.assets/channel的设计.drawio.png)

源码结构体：

```go
type hchan struct {
    // 环形缓冲区，环形缓存可以大幅降低GC开销
	qcount   uint           // total data in the queue
	dataqsiz uint           // size of the circular queue
	buf      unsafe.Pointer // points to an array of dataqsiz elements
	elemsize uint16
	elemtype *_type // element type
    // 发送链表 与 发送到的位置
	sendx    uint   // send index
    sendq    waitq  // list of send waiters
    // 接收链表 与 接收到的位置
	recvx    uint   // receive index
	recvq    waitq  // list of recv waiters
	// 锁
	lock mutex
    // 状态
    closed   uint32
}
```

![](/2_3_channel.assets/环形缓存.drawio.png)

两个队列：

![](/2_3_channel.assets/channel.drawio.png)

> 互斥锁

- 互斥锁并不是排队发送/接收数据
- 互斥锁保护的chan结构体本身
- Channel并不是无锁的

> 状态值

- 0 开启
- 1 关闭

> 总结

- “Channel 是 go 的一等公民”

![](/2_3_channel.assets/管道结构.drawio.png)

## Channel 发送数据的底层原理是什么？

> c <- 关键字

- c <- 关键字 是一个语法糖
- 编译阶段，会把 c <- 转化为 runtime.chansend1()
- chansend1()会调用chansend()方法

```go
// entry point for c <- x from compiled code
//go:nosplit
func chansend1(c *hchan, elem unsafe.Pointer) {
	chansend(c, elem, true, getcallerpc())
}
```

> 管道发送：直接发送

- 发送数据前，已经有G在休眠等待接收
- 此时缓存肯定是空的，不用考虑缓存
- 将数据直接拷贝给G的接收变量，唤醒G

![](/2_3_channel.assets/直接发送原理.drawio.png)

代码实现：

```go
func chansend(c *hchan, ep unsafe.Pointer, block bool, callerpc uintptr) bool {
    lock(&c.lock) // 上锁
    if sg := c.recvq.dequeue(); sg != nil { // 接收队列不等于空，取出 sudog 
		send(c, sg, ep, func() { unlock(&c.lock) }, 3)
		return true
	}
}

func send(c *hchan, sg *sudog, ep unsafe.Pointer, unlockf func(), skip int) {
    if sg.elem != nil {
		sendDirect(c.elemtype, sg, ep) // 传送值
		sg.elem = nil
	}
    goready(gp, skip+1) // 唤醒g
}
```

> 管道发送：放入缓存

- 没有G在休眠等待，但是有缓存空间
- 将数据放入缓存

实现：

- 获取可存入的缓存地址
- 存入数据
- 维护索引

```go
func chansend(c *hchan, ep unsafe.Pointer, block bool, callerpc uintptr) bool {
    lock(&c.lock) // 上锁
    if c.qcount < c.dataqsiz {
        // Space is available in the channel buffer. Enqueue the element to send.
		qp := chanbuf(c, c.sendx) // 获取可存入的缓存地址
		typedmemmove(c.elemtype, qp, ep) // 存入数据
		c.sendx++ // 维护索引
		if c.sendx == c.dataqsiz {
			c.sendx = 0
		}
		c.qcount++ // 维护索引
		unlock(&c.lock) // 解锁
		return true
    }
}
```

> 管道发送：休眠等待

- 把自己包装成 sudog
- sudog 放入 sendq 队列
- 休眠并解锁
- 被唤醒后，数据已经被取走，维护其他数据

```go
func chansend(c *hchan, ep unsafe.Pointer, block bool, callerpc uintptr) bool {
	// 获取当前协程，并包装成sudog
    gp := getg()
    mysg := acquireSudog()
    mysg.elem = ep
    mysg.g = gp
    // 放入 sendq 队列
    c.sendq.enqueue(mysg)
    // 休眠
    gopark(chanparkcommit, unsafe.Pointer(&c.lock), waitReasonChanSend, traceEvGoBlockSend, 2)
}

// 解锁
func chanparkcommit(gp *g, chanLock unsafe.Pointer) bool {
	unlock((*mutex)(chanLock))
	return true
}

```



```go
type sudog struct {
	elem unsafe.Pointer // 指向管道赋值的变量
}
```

> 总结

- 编译阶段，会把 <-  转化未 runtime.chansend1()
- 直接发送时，将数据直接拷贝到目标变量
- 放入缓存，将数据放入环形缓存，成功返回
- 休眠等待时，将自己包装后放入sendq，休眠

## Channel 接收数据的底层原理是什么？

> <- 关键字

- <- 关键字 是一个语法糖
- 编译阶段， i <- c 转化为 runtime.chanrecv1()
- 编译阶段， i, ok <- 转化为 runtime.chanrecv2()
- 最后会调用 chanrecv() 方法

> Channel 接收情况

- 有等待的G，从G接收
- 有等待的G，从缓存接收
- 接收缓存
- 阻塞接收

> 有等待的G， 从G接收

原理：

- 接收数据前，已经有G在休眠等待发送
- 而且这个Channel没有缓存
- 将数据直接从G拷贝过来，唤醒G

实现：

- 判断是否有 G 在发送队列等待，进入recv()
- 判断此 Channel 无缓存
- 直接从等待的G中取走数据，唤醒G

```go
func chanrecv(c *hchan, ep unsafe.Pointer, block bool) (selected, received bool) {
	lock(&c.lock) // 上锁
    if c.closed != 0 { // 关闭则退出
		return true, false
	} else {
		if sg := c.sendq.dequeue(); sg != nil { // 从发送队列取一个协程
			recv(c, sg, ep, func() { unlock(&c.lock) }, 3) // 接收数据
			return true, true
		}
	}
} 

func recv(c *hchan, sg *sudog, ep unsafe.Pointer, unlockf func(), skip int) {
    if c.dataqsiz == 0 { // 判断缓存区是否是空的
        recvDirect(c.elemtype, sg, ep) // 直接接收
    }
    // 修改状态
    sg.elem = nil
	gp := sg.g
	unlockf()
	gp.param = unsafe.Pointer(sg)
	sg.success = true
	goready(gp, skip+1)  // 唤醒
}

func recvDirect(t *_type, sg *sudog, dst unsafe.Pointer) {
	src := sg.elem
	typeBitsBulkBarrier(t, uintptr(dst), uintptr(src), t.size)
	memmove(dst, src, t.size)
}
```

> 有等待的G，从缓存接收

- 接收数据前，已经有G在休眠等待发送
- 而且这个Channel有缓存
- 从缓存取走一个数据
- 将休眠G的数据放进护缓存，唤醒G

实现：

- 判断有G在发送队列等待，进入recv()
- 判断此Channel有缓存
- 从缓存中取走一个数据
- 将G的数据放入缓存，唤醒G

```go
func recv(c *hchan, sg *sudog, ep unsafe.Pointer, unlockf func(), skip int) {
	qp := chanbuf(c, c.recvx) // 冲channel里取出一个单元数据
    typedmemmove(c.elemtype, ep, qp) // 将队列数据考给接收者
    // copy data from sender to queue
    typedmemmove(c.elemtype, qp, sg.elem) // 将数据从发送者拷贝到队列
    c.recvx++ // 维护索引
    goready(gp, skip+1) // 唤醒G
}
```

> 接收缓存

- 没有G在休眠等待发送，但是缓存有内容
- 从缓存取走数据

实现：

- 判断没有G在发送队列等待
- 判断此Channel有缓存
- 从缓存中取走一个数据

> 阻塞接收

- 没有G在休眠等待，而且没有缓存或缓存空
- 自己进入接收队列，休眠等待

实现：

- 判断没有G在发送队列等待
- 判断此Channel无缓存
- 将自己包装成sudog
- sudog放入接收等待队列，休眠
- 唤醒时，发送的G已经把数据拷贝到位

> 总结

- 编译阶段， <- c 会转化为 chanrecv()
- 有等待的G，且无缓存时，从G接收
- 有等待的G，且有缓存时，从缓存接收
- 无等待的G，且缓存有数据，从缓存接收
- 无等待的G，且缓存无数据，等待喂数据

## 实战：非阻塞的Channel怎么做？

```go
func main() {
	ch := make(chan int)
	ch1 := make(chan int)
	select {
	case <- ch:
		fmt.Println("ch recv")
	case <- ch1:
		fmt.Println("ch1 recv")
	default:
		fmt.Println("nothing !!")
	}
}
```

> select 原理

- 同时存在接收，发送，默认路径
- 首先查看是否有可以立即执行的case
- 没有的话，有default，走default
- 没有default，把自己注册在所有的channel中，休眠等待

> timer

- timer 可以提供一个 channel，定时塞入数据

## 小结

> 为什么使用Channel

- 相对于无锁

  - 避免协程竞争和数据冲突的问题

- 相对于加锁

  - 更高级的抽象，降低开发难度，增加程序可读性
  - 模块之间更容易解耦，增加扩展和可维护性

  > Channel基本结构

  - 一个环形缓存
  - 两个链表（发送协程/接收协程）
  - 一个互斥锁（保护hchan）
  - 一个状态值

  > Channel 数据发送原理

  - 直接发送时，将数据直接拷贝到目标变量
  - 放入缓存时，将数据放入环形缓存，成功返回
  - 休眠等待时，将自己包装后放入sendq，休眠

  > Channel 数据接收原理

  - 有等待的G，且无缓存时，从G接收
  - 有等待的G，且有缓存时，从缓存接收
  - 无等待的G，且缓存有数据，从缓存接收
  - 无等待的G，且缓存无数据，等待喂数据

  > 非阻塞 Channel

  - 使用select可以使用Channel的非阻塞特性
  - 使用 timer 配合Slect 可实现超时特性

  