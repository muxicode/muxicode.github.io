---
title: 内存模型与垃圾回收
autoGroup-2: 高并发下的工具
---

# 高并发下的内存模型与垃圾回收

- 栈内存(协程栈，调用栈)
- 堆内存
- 垃圾回收

## 为什么说Go的栈在堆上？

> GO协程栈的作用

- 协程的执行路径
- 局部变量
- 函数传参
- 函数返回值

![](/2_5_memory_model_and_garbage_collection.assets/协程栈的结构.drawio.png)

执行完 sum 函数后，sum函数的栈帧就会回收

> Go 协程栈的位置

- Go 协程栈位于 Go 堆内存上
  - c语言，栈与堆分开，栈由程序管理，堆由用户自己管理
  - go 自己的栈内存也是在堆上的，栈的内存也是由GC释放的
- Go 堆内存位于操作系统虚拟内存（由操作系统分配）上

> 参数传递

- Go 使用参数拷贝传递（值传递）
- 传递结构体时：会拷贝结构体中的全部内容
- 传递结构体指针是，会拷贝结构体指针

> 总结

- 协程栈记录了协程的执行现场
- 协程栈还负责记录局部变量，传递参数和返回值
- Go 使用参数拷贝传递

> 思考

![](/2_5_memory_model_and_garbage_collection.assets/协程栈.drawio.png)

协程栈在空间上连续方，遇到不够大的情况怎么办？

- 本地变量太大（初始2K到4K）
- 栈帧太多

##  协程栈不够用了怎么办？

> 局部变量太大

- 不是所有变量都能放在协程栈上
- 栈帧回收后，需要继续使用的变量
- 太大的变量

局部变量太大的情况可以通过逃逸分析解决。

> 逃逸分析

- 指针逃逸
- 空接口逃逸
- 大变量逃逸

> 逃逸分析 -> 指针逃逸

- 函数返回了对象的指针

> 逃逸分析 -> 空接逃逸

- 如果函数的参数为interfacel{}
- 函数的实参很可能会逃逸
- 因为 interface{} 类型的函数往往会使用反射

> 逃逸分析 -> 大变量逃逸

- 过大的变量会导致栈空间不足
- 64 位机器中，一般超过 64 KB 的变量会逃逸

> 栈帧太多

解决方式为：栈扩容



> 栈扩容

- Go 栈的初始空间为 2KB
- 在函数调用前判断栈空间(morestack)
- 必要时对栈进行扩容
- 早期使用分段栈，后期使用连续栈

> 分段栈

![](/2_5_memory_model_and_garbage_collection.assets/分段栈.drawio.png)

- 1.13 之前使用
- 优点：没有空间浪费
- 缺点：栈指针会在不连续的空间跳转

> 连续栈

找一个放的下两倍栈空间的空闲空间进行扩容

- 优点：空间一直连续
- 缺点：伸缩时的开销大
- 当空间不足时扩容，变为原来的2倍
- 当空间使用率不足1/4时缩容，变为原来的1/2

>  总结

- 三种特殊情况下，变量可能分配到堆上
- 1.13之前，Go使用可伸缩的分段栈
- 1.14以后，Go使用连续栈，伸缩时直接使用新栈

## Go的堆内存结构是怎样的？

> 操作系统虚拟内存

- 不是Win的”虚拟内存“（类似linux的swap空间）
- 操作系统给应用提供的虚拟内存空间
- 背后是物理内存，也由可能由磁盘
- Linux 获取虚拟内存：mmap、madvice

![](/2_5_memory_model_and_garbage_collection.assets/操作系统虚拟内存.drawio.png)

> heapArena

arena 竞技场；斗兽场

- Go每次申请的虚拟内存单元为64MB
- 最多由 4 194 304 个虚拟内存单元（2^20）
- 内存单元也叫 heapArena
- 所有的heapArena组成了mheap（Go 堆内存）

![](/2_5_memory_model_and_garbage_collection.assets/heapArena.drawio.png)

一个heapArena暂用虚拟内存64MB，heapArena在虚拟内存的空间不一定连续，虚拟内存连续的空间对应的物理内存空间也不一定连续。

Go/src/runtime/mheap.go

```go
type mheap struct {
    ...
    allspans []*mspan // all spans out there
	arenas [1 << arenaL1Bits]*[1 << arenaL2Bits]*heapArena
    ...
}

type heapArena struct {
	// bitmap stores the pointer/scalar bitmap for the words in
	// this arena. See mbitmap.go for a description. Use the
	// heapBits type to access this.
	bitmap [heapArenaBitmapBytes]byte
}
```

> 如何使用heapArena（线性分配）

采用线性分配，每次需要的空间都往后放，有些用不到的空间被释放时，还是继续往后放，直到放完，再看看之前又没有空间被释放，有的话继续分配。

![](/2_5_memory_model_and_garbage_collection.assets/线性分配.drawio.png)

> 链表分配

将释放的的空间采用链表连接起来，用于下次分配，但是遇到装不下的大空间，需要采用线性分配，往后放。容易产生碎片化的空间。

![](/2_5_memory_model_and_garbage_collection.assets/链表分配.drawio.png)

- 线性分配或者链表分配容易出现空间碎片

> 分级分配

不是go中具体实现。体现思想

- 如果最小的对象大小小于最小单元，直接分配最小单元。

![](/2_5_memory_model_and_garbage_collection.assets/分级思想.drawio.png)

> 内存管理单元 mspan

- 根据隔离适应策略，使用内存时的最小单位为mspan
- 每个mspan为N个相同大小的”格子“
- Go 中一共有67中mspan

1级的 mspan 最小分配空间时 8 个字节（bytes），每个格子最小可以存一个字节的东西，那么最大浪费可以达到百分之87.5%

![](/2_5_memory_model_and_garbage_collection.assets/mspan.drawio.png)

分级内存示意：

![](/2_5_memory_model_and_garbage_collection.assets/heapArena_分级.drawio.png)

heapArena 并不是一开始就有所有的span，而是按需开辟

> 源码解析

Go/src/runtime/sizeclasses.go

```go
// class  bytes/obj  bytes/span  objects  tail waste  max waste  min align
//     1          8        8192     1024           0     87.50%          8
//     2         16        8192      512           0     43.75%         16
//     3         24        8192      341           8     29.24%          8
```

>  内存管理单元 mspan

- 每个heapArena中的mspan都不确定
- 如何快速找到所需的mspan级别？

> 中心索引 mcentral

- 136 个 mcentral 结构体，其中
- 68 个组需要GC扫描的 mspan
- 68 个组不需要GC扫描的 mspan

![](/2_5_memory_model_and_garbage_collection.assets/mcentral.drawio.png)



源码：Go/src/runtime/mcentral.go

```
type mcentral struct {
	spanclass spanClass
	partial [2]spanSet // 部分满的span
	full    [2]spanSet // 全满的span   
}
```

> mcentral 的性能问题

- mcentral 实际是中心索引，引用互斥锁保护
- 再高并发场景下，锁冲突问题严总
- 参考协程GMP模型，增加线程本地缓存   

> 线程缓存mcache

- 每个P拥有一个mcache
- 一个mcache拥有136个mspan，其中
- 68个需要GC扫描的mspan
- 68个不需要GC扫描的mspan

由于中央索引有并发问题，引入mcache，给每个P分配一个mcache，里头有136的mcetral里的各一个span，当需要存数据，直接再P的mcache里拿，满了 P 需要到mcentral里换。

![](/2_5_memory_model_and_garbage_collection.assets/mcache.drawio.png)

 源码：C:/Program Files/Go/src/runtime/mcache.go

```go
type mcache struct {
    	alloc [numSpanClasses]*mspan // numSpanClasses = 128
}
```

源码：C:/Program Files/Go/src/runtime/runtime2.go

```go
type p struct {
	mcache      *mcache
}
```

> 总结

- Go 模仿了TCmalloc（c++用的，也是由谷歌开发的），建立了自己的堆内存架构
- 使用 heapArena 向操作系统申请内存
- 使用 heapArena时，以mspan为单位，防止碎片化
- mcentral 是 mspan 们的中心索引
- mcache 记录了分配给各个P的本地 mspan

## Go 是如何分配堆内存的？

>    对象分级

- Tiny 微对象（0， 16B） 无指针
- Small 小对象 [16B, 32KB]
- Large 大对象  （32KB， +∞）

分配

- 微小对象分配至普通 mspan
- 大对象 量身定做 mspan （0 级 span）

> 微对象分配

- 从 mcache 拿到2级 mspan
- 将多个为对象合并成一个 16 Byte 存入



源码：C:/Program Files/Go/src/runtime/malloc.go

```go
func mallocgc(size uintptr, typ *_type, needzero bool) unsafe.Pointer {
	...
    if size <= maxSmallSize { // 是不是小于small对象的级别 
        if noscan && size < maxTinySize { // 是不是微对象
			// 注释中有说明将多个为对象合并成一个 16 Byte 存入
            span = c.alloc[tinySpanClass] // 那一个二级span
            // 找到空闲的二级span，返回地址 v 
            v, span, shouldhelpgc = c.nextFree(tinySpanClass) 
        } else { // 小对象
            // 查表该对象应该用几级的span
			if size <= smallSizeMax-8 {
				sizeclass = size_to_class8[divRoundUp(size, smallSizeDiv)]
			} else {
				sizeclass = size_to_class128[divRoundUp(size-smallSizeMax, largeSizeDiv)]
			}
            spc := makeSpanClass(sizeclass, noscan) // 找到对应等级的spanClass
            span = c.alloc[spc]	// c 是 mcache，找该级别span
		   v := nextFreeFast(span) // 找到span的下一个空闲的位置，并返回地址
        }
    } else {
        // 大对象 逻辑， 开启 0 级 的span
        span = c.allocLarge(size, noscan)
    }
}

func (c *mcache) allocLarge(size uintptr, noscan bool) *mspan {
    ...
    spc := makeSpanClass(0, noscan) // 开辟0级 span
    ...
}

func (c *mcache) nextFree(spc spanClass) (v gclinkptr, s *mspan, shouldhelpgc bool) {
    ...
    c.refill(spc) // span满了，需要到mcentral里找到空闲的span进行交换 
    ...
}

func (c *mcache) refill(spc spanClass) {
    // 从中央索引找新的span
    s = mheap_.central[spc].mcentral.cacheSpan() 
}

func (c *mcentral) cacheSpan() *mspan {
    
    // We failed to get a span from the mcentral so get one from mheap.
    // 中央的 mcentral 也没有 mspan 了
	s = c.grow()
	if s == nil {
		return nil
	}
}

func (c *mcentral) grow() *mspan {
    s := mheap_.alloc(npages, c.spanclass)
}

func (h *mheap) alloc(npages uintptr, spanclass spanClass) *mspan {
	s = h.allocSpan(npages, spanAllocHeap, spanclass)
	return s
}

func (h *mheap) allocSpan(npages uintptr, typ spanAllocType, spanclass spanClass) (s *mspan) {
   ...
   growth, ok = h.grow(npages + extraPages)
   ...
}

func (h *mheap) grow(npage uintptr) (uintptr, bool) {
    // 增加 heapArena 一个 heapArena 大小为64M
}
```

一级的span当前版本是用不到的

> mecache 的替换

- mcache 中，每个级别的mspan中只有一个
- 当mspan满了之后，会从 mcentral 中换一个新的

> mcentral 的扩容

- mcentral中，只有有限数量的mspan
- 当mspan缺少时，会从heapArena开辟新的mspan

> 大对象的分配

- 直接从 heapArena 开辟 0 级的 mspan
- 0 级的 mspan 为大对象定制

> heapArena 的扩充

- 当 heapArena 空间不足时
- 向操作系统申请新的heapArena

> 总结

- Go 将对象按照大小分为3种
- 微小对象使用mcache
- mcache中的mspan填满后，与mcentral交换新的
- mcentral 不足时，再heapArena开辟新的mspan
- 大对象直接再heapArena开辟新的mspan

## 什么对象需要垃圾回收？

> 垃圾回收（Garbage Collecting）思路

- 标记-清除
- 标记-整理
- 复制

> 标记-清除

标记没有引用的数据，进行清除

缺点：如果是其他语言可能会产生碎片的问题

![](/2_5_memory_model_and_garbage_collection.assets/标记清除.drawio.png)

> 标记-整理

标记清除后，再对空间再次进行整理

缺点：开销大（java老年代使用的标记整理，因为GC的次数少）

![](/2_5_memory_model_and_garbage_collection.assets/标记整理.drawio-1677169154980199.png)

> 复制

标记删除的数据，将需要的数据复制到新空间，并进行了整理（JAVA新生代在用，但是并不是成倍拷贝）

缺点：空间浪费

![](/2_5_memory_model_and_garbage_collection.assets/标记复制.drawio.png)

> Go 中的垃圾回收机制

- Go因为堆内存结构的独特优势，选择最简单的标记-清除
- 找到有引用的对象。剩下的就是没有引用的。

> 从哪开始找

- 被栈上的指针引用
- 被全局变量指针引用
- 被寄存器中的指针引用
- 上述变量被称为 Root Set （GC Root）

> 怎么找

![](/2_5_memory_model_and_garbage_collection.assets/GC_root.drawio.png)

- Root 节点进行广度优先搜索 BFS
- 这种方法也叫可达性分析标记法

> 串行GC 步骤

- Stop The World， 暂停所有其他协程
- 通过可达性分析，找到无用的堆内存
- 释放堆内存
- 恢复所有其他协程

问题：

- STW 对性影响大（Go 每隔几十毫秒或者几百毫秒就要停下来进行GC的话）

> 总结

- 从GC Root 出发，寻找被引用对象
- 没有被引用的就是无用对象
- 串行GC需要STW，对性能影响大

## 如何减小GC对性能的影响？

> 并发垃圾回收

- 并发的难点在于标记阶段

> 三色标记法

- 黑色：有用，已经分析扫描
- 灰色：有用，还未分析扫描
- 展示无用

起初所有的对象都是白色的

![](/2_5_memory_model_and_garbage_collection.assets/起初都是白色的.drawio.png)

从根对象出发扫描可达对象，标记为灰色

![](/2_5_memory_model_and_garbage_collection.assets/根节点出发标记为灰色.drawio.png)

扫描灰色对象，将其引用的对象标记为灰色，自身标记为黑色

![](/2_5_memory_model_and_garbage_collection.assets/扫描灰色并标记自身为黑色.drawio.png)

继续扫描

![](/2_5_memory_model_and_garbage_collection.assets/继续扫描灰色对象.drawio.png)

清除白色对象

![](/2_5_memory_model_and_garbage_collection.assets/清除白色对象.drawio.png)

再次标记时，，所有对象恢复为白色



> 并发标记问题（删除）

并发标记进行中

![](/2_5_memory_model_and_garbage_collection.assets/并发标记进行中.drawio.png)

业务：B指向C的指针释放

![](/2_5_memory_model_and_garbage_collection.assets/业务释放指针.drawio.png)

业务：E的一个指针成员指向了C

![](/2_5_memory_model_and_garbage_collection.assets/业务新增指针.drawio.png)

继续扫描

![](/2_5_memory_model_and_garbage_collection.assets/继续扫描.drawio.png)

由于E已经扫描过了，C还是白色，C被错误删除

> Yuase 删除屏障

- 并发标记时
- 对指针释放的白色对象置灰

c被删除时，删除屏障会把C标记为灰

![](/2_5_memory_model_and_garbage_collection.assets/删除屏障标记为灰色.drawio.png)

> 并发标记问题（插入）

在烧苗完E对象后，有业务对E新增了指向C的指针

![](/2_5_memory_model_and_garbage_collection.assets/并发插入标记问题.drawio.png)

此事 C 也会因此被误删除

> Dijkstra 插入屏障

- 并发标记时
- 对指针新指向的白色对象置灰
- 插入屏障可以杜绝在GC标记中被插入的指针，被清理

> 混合屏障

- 被删除的对对象标记为灰色
- 被添加的堆对象标记为灰色

> 总结

- 并发垃圾会搜的关键在于标记安全
- 混合屏障机制兼顾了安全与效率

## 实战：如何优化GC效率？

> GC触发的时机

- 系统定时触发
- 用户显示触发
- 申请内存时触发

> 系统定时触发

- sysmon定时检查（runtime背后的循环，g0协程执行）
- 如果两分钟内没有过GC，触发
- 谨慎调整

源码：C:/Program Files/Go/src/runtime/proc.go

```go
// This is a variable for testing purposes. It normally doesn't change.
var forcegcperiod int64 = 2 * 60 * 1e9 // 两分钟
```

> 用户显示触发

- 用户调用runtime.GC方法
- 并不推荐调用

> 申请内存时触发



源码：C:/Program Files/Go/src/runtime/malloc.go

分配内存用的函数后缀还跟了gc，是因为分配内存时如果空间不够了，那么会申请内存并进行一次gc

```go
func mallocgc(size uintptr, typ *_type, needzero bool) unsafe.Pointer {}
```

> GC 优化的原则

尽量少在对上生产垃圾

- 内存池化
- 减少逃逸
- 使用空结构体

> 内存池化

- 缓存性质的对象（chanl的缓存区，环形缓存）
- 频繁创建和删除
- 使用内存池，不GC

> 减少逃逸

- 逃逸会使原来在栈上的ui想进入堆中
- fmt包（需要慎用，尽量用log组件）
- 返回了指针而不是拷贝

> 使用空结构体

- 空结构体指向一个固定地址
- 不占用堆空间
- 比如channel传递空结构体

> GC 分析工具

- go tool pprof
- go tool trace
- go build -gcflags="-m"
- GODEBUG="gctrace=1"  --- 简单粗暴好用

> 实列

代码：

```go
func main() {
	wg := sync.WaitGroup{}
	wg.Add(10)
	for i:=0; i<10; i++ {
		go func(wg *sync.WaitGroup) {
			var count int
			for i:=0; i<1e10; i++ {
				count++
			}
			wg.Done()
		}(&wg)
	}
}
```

设置环境：

```go
set GODEBUG=gctrace=1
go run mian.go
```

查看信息

```go
gc 2 @0.020s 1%: 0+2.5+0 ms clock, 0+0/0/2.5+0 ms cpu, 14->14->14 MB, 7 MB goal, 0 MB stacks, 0 MB globals, 12 P
 
0.020s   // 启动到现在的时间
14->14->14 //检测前-检测中-完成gc 内存占用的空间
12 P       // 当前有几个线程
1%:        // GC 占用的时间
```

> 总结

- GC主要由系统定时触发或者申请内存触发
- GC优化的原则是减少在对上产生垃圾
- 使用GC分析工具可以帮助分析GC问题

## 本章小结

> 协程栈

- 协程栈记录协程的执行现场
- Go 协程栈位于 Go 堆内存上
- Go 使用参数拷贝传递
- 3中特殊情况下，变量可能会逃逸到堆上
- 1.14 以后， Go 使用连续栈，伸缩时直接使用新栈

> 堆内存结构

- Go 模仿了TCmalloc，建立了自己的堆内存架构
- 使用 heapArena 向操作系统申请内存
- 使用 heapArena 时，以mspan 为单位，防止碎片化
- mcentral 时 mspan 们的中心索引
- mcache 记录了分配给各个 P 的本地 mspan

> 堆内存分配

- Go 将对象按照大小分为3种
- 微小对象使用 mcache
- mcache 种的 mspan 填满后，与mcentral交换新的
- mcentral 不足时，在heapArena 开辟新的 mspan
- 大对象直接在 heapArena 开辟新的 mspan

> 堆内存回收（GC）

- 标记-清除法
  - 标记有用对象，清除无用对象
- 可达性分析标记法
  - 从 GC Root 出发，寻找被引用对象

> 并发GC

- 并发垃圾回收的关键在于标记安全
- 回合兵长机制兼顾了安全与效率

> GC 优化

- GC 主要由系统定时触发或者申请内存触发
- GC 优化的原则时减少在堆上产生的垃圾
- 使用 GC 分析工具可以帮助分析GC问题