---
title: 高并发下的保安-锁机制
autoGroup-2: 高并发下的工具
---

# 高并发下的锁

- sync.Mutex：互斥锁
- sync.RWMutex:读写锁
- sync.WaitGroup: 等待锁
- sync.Once：初始化

## 锁的基础是什么？

- atomic 操作（原子操作）
- 信号锁（sema ）

```go
func TestGoRoutine(t *testing.T){
	add := func (i *int) {
		*i++  // 
	}
	x := 0
	for i:=0; i<1000; i++ {
		go add(&x)
	}
	time.Sleep(2*time.Second)
	fmt.Println(x)
}
// 不能累加到1000
// 可以使用 atomic
func TestGoRoutine(t *testing.T){
	add := func (i *int32) {
		atomic.AddInt32(i, 1)
	}
	var	x  int32 = 0
	for i:=0; i<1000; i++ {
		go add(&x)
	}
	time.Sleep(2*time.Second)
	fmt.Println(x)
}
```

![](/high_concurrency_security_ock_mechanism.assets/多协程并发冲突.drawio.png)

### atomic 操作

- 原子操作是一种硬件层面加锁的机制
- 保证操作一个变量的时候，其他协程、线程无法访问
- 只能用于简单变量的简单操作

```go
atomic.CompareAndSwapInt32(i, 10, 100)  //相等交换
atomic.LoadInt64()					  //如：读超过64位的数字，多次加锁防止操作高位时低位被篡改
```

### sema 锁

- 也叫信号量锁/信号锁
- 核心是一个uint32值，含义是同时可并发的数量
- 每一个sema锁都对应一个SemaRoot结构体
- SemaRoot中有一个平衡二叉树用于协程排队

```go
// A Mutex must not be copied after first use.
type Mutex struct {
	state int32
	sema  uint32  // sema 直接晕了
}

type RWMutex struct {
	w           Mutex  // held if there are pending writers
	writerSem   uint32 // semaphore for writers to wait for completing readers
	readerSem   uint32 // semaphore for readers to wait for completing writers
	readerCount int32  // number of pending readers
	readerWait  int32  // number of departing readers
}
```

runtime.go/sema.go

```go
type semaRoot struct {
	lock  mutex
	treap *sudog // root of balanced tree of unique waiters.
	nwait uint32 // Number of waiters. Read w/o the lock.
}
```

![](/high_concurrency_security_ock_mechanism.assets/sema锁.drawio.png)

> sema操作（uint32>0）

- 获取锁：uint32减一，获取成功
- 释放锁：uint32加一，释放成功

runtime/sema.go

```go
// Called from runtime.
func semacquire(addr *uint32) {
	semacquire1(addr, false, 0, 0)
}

func semacquire1(addr *uint32, lifo bool, profile semaProfileFlags, skipframes int) {
	if cansemacquire(addr) {
		return
	}
    ...
}

func cansemacquire(addr *uint32) bool {
	for {
		v := atomic.Load(addr)
		if v == 0 {
			return false
		}
		if atomic.Cas(addr, v, v-1) { // CAS 减一
			return true
		}
	}
}
```

```go
func semrelease(addr *uint32) {
	semrelease1(addr, false, 0)
}

func semrelease1(addr *uint32, handoff bool, skipframes int) {
	root := semroot(addr)
	atomic.Xadd(addr, 1)  // 加1
    if atomic.Load(&root.nwait) == 0 { // 没有协程再等待直接返回
		return
	}
}
```

> sema 操作 （uint32 == 0）

- 获取锁：协程休眠，进入堆树等待
- 释放锁：从堆树中取出一个协程，唤醒
- sema锁退化成一个专用的休眠队列

```go
func semacquire(addr *uint32) {
	semacquire1(addr, false, 0, 0)
}

func semacquire1(addr *uint32, lifo bool, profile semaProfileFlags, skipframes int) {
    	// 等于 0 时进，协程进队列
		root.queue(addr, s, lifo)
		// 休眠等待
		goparkunlock(&root.lock, waitReasonSemacquire, traceEvGoBlockSync, 4+skipframes) 
}
```

```go
func semrelease(addr *uint32) {
	semrelease1(addr, false, 0)
}

func semrelease1(addr *uint32, handoff bool, skipframes int) {
	s, t0 := root.dequeue(addr) // 出队列
}
```

### 总结

- 原子操作时一种硬件层面的加锁机制
- 数据类型和操作类型有限制
- sema锁时runtime的常用工具
- sema经常被用作休眠队列

## 互斥锁解决了什么问题？

### sync.Mutex

- Go 的互斥锁
- Go 中用于并发保护最常见的方案

```go
type Person struct {
	mu sync.Mutex
	friends int
}

func (p *Person) MakeFriend(){
	p.mu.Lock()
	p.friends++
	fmt.Println(p.friends)
	p.mu.Unlock()
}

func TestGoRoutine(t *testing.T){
	p := Person{}
	go p.MakeFriend()
	go p.MakeFriend()
	go p.MakeFriend()
	time.Sleep(time.Second)
	fmt.Println(p.friends)
}
```

方式二：

```go
type Person struct {
	int int32
	friends int
}

func (p *Person) MakeFriend() {
	for !atomic.CompareAndSwapInt32(&p.int, 0, 1) {} // 一直去获取锁
	p.friends++
	atomic.CompareAndSwapInt32(&p.int, 1, 0)
}

func TestGoRoutine(t *testing.T){
	p := Person{}
	for i:=0; i<2000;i ++ {
		go p.MakeFriend()
	}
	time.Sleep(time.Second)
	fmt.Println(p.friends)
}
// 无 gopark() 主动挂起
// 无 morestack() 协作式调度
// 无 抢占式调度
```

![](/high_concurrency_security_ock_mechanism.assets/syncMutex.drawio.png)

- Locked 是否锁住状态位
- Woken 醒来的意思
- Starving 饥饿模式
- WaiterShift （29位）记录等待的协程的数量

> 正常模式 加锁

- 尝试CAS直接加锁
- 若无法直接获取，进行多次自旋尝试
- 多次尝试失败，进入sema队列休眠

 ![](/high_concurrency_security_ock_mechanism.assets/mutex正常模式下加锁.drawio.png)

> 正常模式 解锁

- 尝试CAS直接解锁
- 若发现有协程再sema休眠等待，需要唤醒一个协程

![](/high_concurrency_security_ock_mechanism.assets/mutex正常模式下解锁.drawio.png)

> 总结

- mutex正常模式：自旋加锁 + sema休眠等待
- mutex正常模式下，可能有锁饥饿的问题

![](/high_concurrency_security_ock_mechanism.assets/锁饥饿.drawio.png)

> Mutex 饥饿模式

- 当前协程等待时间超过了1ms，切换到饥饿模式
- 饥饿模式中，不自旋，新来的协程直接sema休眠
- 饥饿模式中，被唤醒的协程直接获取锁
- 没有协程在队列中继续等待时，回到正常模式

![](/high_concurrency_security_ock_mechanism.assets/锁饥饿.drawio-1677168464838115.png)

### sync.RWMutex

```go
type Person struct {
	mu sync.Mutex
	int int32
	friends int
}

func (p *Person) MakeFriend() {
	for !atomic.CompareAndSwapInt32(&p.int, 0, 1) {}
	p.friends++
	atomic.CompareAndSwapInt32(&p.int, 1, 0)
}

func (p *Person) PrintFriends() {
    // 造成没有必要的锁的竞争，但是打印的同时需要防止被修改，还是需要上锁
	p.mu.Lock()
	fmt.Println(p.friends)
	p.mu.Unlock()
}
```

改进：

```go
type Person struct {
	mu sync.RWMutex
	int int32
	friends int
}

func (p *Person) MakeFriend() {
	p.mu.Lock()
	p.friends++
	p.mu.Unlock()
}

func (p *Person) PrintFriends() {
	p.mu.RLock() // 之上读锁，将写锁挡在外面
	fmt.Println(p.friends)
	p.mu.RUnlock()
}
```

> 多个协程同时只读

- 只读时，其他人不能修改即可
- 只读时，多协程可以共享读
- 只读时，不需要互斥锁

一般的读写锁：

![](/high_concurrency_security_ock_mechanism.assets/读写锁.drawio.png)

读写优先可以有不同实现

![](/high_concurrency_security_ock_mechanism.assets/读写优先不同实现.drawio.png)

写释放锁，时看具体实现唤醒读协程还是写协程，一般实现是给写协程上锁，后给读协程。

> 读写锁需求

- 每个锁分为读锁和写锁
- 没有加写锁时，多个协程都可以加读锁
- 加了写锁，无法加读锁，读协程排队等待
- 加了读锁，写锁排队等待

```go
type RWMutex struct {
	w           Mutex  // held if there are pending writers 互斥锁给写协程的候选者，要写的协程
	writerSem   uint32 // semaphore for writers to wait for completing readers
	readerSem   uint32 // semaphore for readers to wait for completing writers
	readerCount int32  // number of pending readers  要加读锁或者加上读锁的数量
	readerWait  int32  // number of departing readers 写锁生效之前需要等待多少个读锁释放
}
```

- w：互斥锁作为写锁
- writerSem：作为写协程队列
- readerSem：作为读协程队列
- readerCount：正值：正在读的协程 |  负值： 加了写锁
- readerWait：写锁应该等待读协程个数

![](/high_concurrency_security_ock_mechanism.assets/读写锁的结构.drawio.png)

#### RW加/解写锁

> RW加写锁：没有读协程

![](/high_concurrency_security_ock_mechanism.assets/读写锁没有读协程下上写锁.drawio.png)

```go
const rwmutexMaxReaders = 1 << 30
```

> 加写锁，有读协程

-  竞争写锁
-  将readerCount变成负数
-  readerCount负数后，来读写成，放入读队列等待
-  将写协程放入队列，等待三个读锁释放

![](/high_concurrency_security_ock_mechanism.assets/读写锁有读协程加写锁.drawio.png)

> 源码分析

```go
func (rw *RWMutex) Lock() {
	rw.w.Lock() // 竞争写锁
    // readerCount 减去 rwmutexMaxReaders
    r := atomic.AddInt32(&rw.readerCount, -rwmutexMaxReaders) + rwmutexMaxReaders
	// Wait for active readers.
	if r != 0 && atomic.AddInt32(&rw.readerWait, r) != 0 {
        // 有读协程的情况下，直接放入写协程队列
		runtime_SemacquireMutex(&rw.writerSem, false, 0)
	}
}
```

> 解写锁

- 将readerCount变为正值，允许读锁的获取
- 释放在readerSem中等待的读协程
- 解锁mutex

源码分析：

```go
func (rw *RWMutex) Unlock() {
    r := atomic.AddInt32(&rw.readerCount, rwmutexMaxReaders) // 将readerCount 变成正数
    for i := 0; i < int(r); i++ { // 释放读协程
		runtime_Semrelease(&rw.readerSem, false, 0)
	}
    rw.w.Unlock() // 解锁mutex
}
```

#### RW加/解读锁

> 加读锁：readCount>0

![](/high_concurrency_security_ock_mechanism.assets/RW加读锁且readerCount大于0.drawio.png)

> 加读锁：readCount<0

- 给readerCount无脑加一
- 如果readerCount是整数，加锁成功
- 如果readerCount是负数，说明被加了写锁，陷入readerSem

![](/high_concurrency_security_ock_mechanism.assets/RW加读锁且ReaderCount小于0.drawio.png)

源码分析：

```go
func (rw *RWMutex) RLock() {
	if atomic.AddInt32(&rw.readerCount, 1) < 0 {
		// A writer is pending, wait for it.
		runtime_SemacquireMutex(&rw.readerSem, false, 0)
	}
}
```

> 解读锁：readerCount>0

![](/high_concurrency_security_ock_mechanism.assets/RW解读锁且readerCount大于0.drawio.png)

> 解读锁：readerCount<0

- 给readerCount无脑减一
- 如果readerCount是正数，解锁成功
- 如果readerCount是负数，有写锁在排队
  - 如果自己是readerWati的最后一个，唤醒写协程

![](/high_concurrency_security_ock_mechanism.assets/RW读锁解锁且readcount小于0.drawio.png)

源码分析：

```go
func (rw *RWMutex) RUnlock() {
	if r := atomic.AddInt32(&rw.readerCount, -1); r < 0 {
		// Outlined slow-path to allow the fast-path to be inlined
		rw.rUnlockSlow(r)
	}
}

func (rw *RWMutex) rUnlockSlow(r int32) {
	if atomic.AddInt32(&rw.readerWait, -1) == 0 {
		// The last reader unblocks the writer.
		runtime_Semrelease(&rw.writerSem, false, 1)
	}
}
```

> 使用经验

- RW锁适合读多写少的场景，减少锁冲突

> 总结

- Mutex 用来写协程之间互斥等待
- 读协程使用readerSem等待写锁的释放
- 写协程使用writerSem等待读锁的释放
- readerCount记录读协程的个数
- readerWati记录写协程之前的读协程个数

## 如何通过WaitGroup互相等待

使用演示：

```go
type Person struct {
	mu sync.RWMutex
	int int32
	friends int
}

func (p *Person) MakeFriend(s *sync.WaitGroup) {
	p.mu.Lock()
	defer p.mu.Unlock()
	p.friends++
	s.Done()
}

func (p *Person) PrintFriends() {
	p.mu.RLock()
	fmt.Println(p.friends)
	p.mu.RUnlock()
}

func TestGoRoutine(t *testing.T){
	g := sync.WaitGroup{}
	p := Person{}
	g.Add(2000)
	for i:=0; i<2000; i++ {
		go p.MakeFriend(&g)
	}
	g.Wait()
	p.PrintFriends()
}
```

> 需求

- 实际业务中，一个（组）协程需要等待另一组协程完成

![](/high_concurrency_security_ock_mechanism.assets/组同步的要素.drawio.png)

代码：

```go
type WaitGroup struct {
	noCopy noCopy  // 内置用于编译器检查 这个结构体不能被拷贝，否则锁可能会出问题
	state1 uint64
	state2 uint32
}

func (wg *WaitGroup) state() (statep *uint64, semap *uint32) {
		state := (*[3]uint32)(unsafe.Pointer(&wg.state1))
    	// 数组内的三个成员 waiter counter sema
		return (*uint64)(unsafe.Pointer(&state[1])), &state[0]
	}
}
```

![](/high_concurrency_security_ock_mechanism.assets/waitgroup底层结构.drawio.png)

> Wait()

- 如果counter被等待的协程没有了，直接返回
- 否则，waiter加一，陷入sema

```go
func (wg *WaitGroup) Wait() {
	statep, semap := wg.state() //拿到waiter、counter、sema
    for {
        state := atomic.LoadUint64(statep)
        v := int32(state >> 32) // counter
        w := uint32(state)
        if v == 0 {
            return
        }
        if atomic.CompareAndSwapUint64(statep, state, state+1) {
			runtime_Semacquire(semap) // 陷入sema队列
        }
     }
}
```

> Done()

- 被等待协程做完，给counter减一
- 通过Add(-1)实现

> Add()

- add counter
- 被等待协程没做完，或者没人在等待，返回
- 被等待协程都做完了，且有人在等待，唤醒所有sema中的协程

> 总结

- WaitGroup实现了一组协程等待另一组协程
- 等待的协程陷入sema并记录个数
- 被等待的协程计数归零时，唤醒所有sema中的协程

## 一段代码只执行一次

> 需求

- 整个程序运行过程中，代码只执行一次
- 用来进行一些初始化的操作

```go
once := sync.Once{}
go once.Do(p.MakeFriend)
go once.Do(p.MakeFriend)
go once.Do(p.MakeFriend)
// 最后只会运行一次
```

> 思路

- 找一个变量记录一下，从0变成1就不再做了（造成阻塞或者效率低）

思路一：

- 做法：CAS改值，成功就做
- 优点：算法简单
- 问题：多个协程竞争CAS改值会造成性能问题

思路二：Mutex

- 争抢一个mutex，抢不到陷入sema休眠
- 抢到的代码，改值，释放锁
- 其他协程唤醒后判断值已经修改，直接返回

> sync.Once

- 先判断是否已经改值
- 没改尝试获取锁
- 获取到锁的协程执行业务，改值，解锁
- 冲突协程唤醒后直接返回

```go
type Once struct {
	done uint32 // 值记录，记录到修改之后，就不再修改了
	m    Mutex  // 抢锁，没抢到的进sema队列
}

func (o *Once) Do(f func()) {
    	if atomic.LoadUint32(&o.done) == 0 { // 等于0就没做
		// Outlined slow-path to allow inlining of the fast-path.
		o.doSlow(f)
	}
}

func (o *Once) doSlow(f func()) {
	o.m.Lock()
	defer o.m.Unlock()
	if o.done == 0 {
		defer atomic.StoreUint32(&o.done, 1) // 将状态改为做了
		f()								  // 执行函数
	}
}
```

> 总结

- sync.Once 实现了一段代码只执行了一次
- 使用标志+mutex实现了并发冲突的优化

## 实战：如何排查锁异常的问题

> 锁拷贝问题

```go
m := sync.Mutex{}
m.Lock()
n := m
m.Ulock()

n.Lock() // ?? 能成功吗？

// 小心直接拷贝strcut，struct中带有锁，这种比较难以发现
```

可以用命令检查

```go
go vet main.go
```

- 锁拷贝可能导致锁的死锁问题
- 使用vet工具可以检测锁拷贝问题
- vet还能检测可能的bug或者可疑的构造

> reace 竞争检测

- 发现隐含的数据竞争问题
- 可能时加锁的减一
- 可能时bug的提醒

```go
go build -race main.go

// 执行可执行的二进制文件
WARNIGN: DATA RACE
...
```

> go-deadlock 检测

```go
go get github.com/sasha-s/go-deadlock/...
```

- 检测可能的死锁
- 实际是检测获取锁的等待时间
- 用来排查bug和性能问题

> 总结

- go vet 检测 bug 或者可疑的构造
- race 发现隐含的数据竞争的问题
- go-deadlock 检测可能的死锁
