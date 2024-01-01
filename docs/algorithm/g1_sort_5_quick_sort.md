---
title: 排序-5-快速排序
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 快速排序

🤔 **快速排序的基本原理**

快速排序的核心思想是分治法，将一个大问题拆解成小问题来解决。整个排序过程分为两个主要步骤：**划分** 和 **递归排序**。

1. **划分（Partition）：** 选择一个基准元素，将数组分为两个子数组，小于基准的放左边，大于基准的放右边。这样，基准元素就找到了它在排序后的最终位置。
2. **递归排序：** 对左右两个子数组分别进行快速排序，递归地重复这个过程，直到整个数组有序。

💡 **为什么快速排序快速？**

快速排序之所以快速，关键在于它的**划分过程相对高效**。在划分时，**不需要额外的存储空间**，只需要在原地进行元素交换，大大**减少了空间复杂度**。

## 荷兰国旗问题

![](/g1_sort_5_quick_sort.assets/quick_sort.drawio.png)


🌐 **荷兰国旗问题：数组三部曲** 🚩

在一片无序的数组中，我们该如何巧妙地将它划分成小于区、等于区、大于区这三个部分呢？这可是一个非常有趣的挑战，也被称为荷兰国旗问题。

### 算法流程

![](/g1_sort_5_quick_sort.assets/quick_sort_1.drawio.png)

🌈 **用数组绘制荷兰国旗** 🎨

🧩 这次我们要用上述数组来玩转荷兰国旗划分。咱们的技巧是使用数组的最后一个数字，作为等于区域的标志数字。准备好了吗？这里要引入三个小助手：

- 🚦 **小于区域的位置 (less)**：一开始它在-1的位置，随着遍历的进行，它会向右不断扩张。

- 🚀 **大于区域的位置 (more)**：它的起始点是数组最右边8的位置，因为8现在是我们的分界线，要先排除。

- 🔍 **当前遍历的位置 (index)**：我们从左向右遍历，根据数值的大小将数字划入不同的区间。

![](/g1_sort_5_quick_sort.assets/quick_sort_2.drawio.png)

当前位置`index`从左向右遍历数组，并划分区域：

![](/g1_sort_5_quick_sort.assets/quick_sort_3.drawio.png)

## 快速排序


通过不断地划分区间，我们可以实现荷兰国旗的神奇分割，最终让数组变得有序起来。

### 递归版本

🧩 **玩转递归：荷兰国旗版区间划分** 🌐

递归，这就是我们炫酷的利器！

```go
// 快排入口
func QuickSort(arr []int){
	quickProcess(arr, 0, len(arr)-1)
}

// 快排递归，意思是给定 arr， l - r 区间排序，并使数组有序
func quickProcess(arr []int, l, r int){
	if l >= r {return}
	mL, mR := partition(arr, l, r)
	quickProcess(arr, l, mL-1)
	quickProcess(arr, mR+1, r)
}

// 荷兰国旗问题
func partition(arr []int, l, r int) (int, int) {
	if len(arr) < 2{return 0 , 0} // base case 只有一个数的时候不用划分区间了
	lessArea := l-1
	biggerArea := r
	index := l
	rand.Seed(time.Now().UnixNano())
	ranIndex := l + rand.Intn(r-l+1)
	utility.Swap(arr, ranIndex, r)
	for index < biggerArea {
		if arr[index] < arr[r] {
			utility.Swap(arr, index, lessArea+1)
			index++
			lessArea++
		} else if arr[index] > arr[r] {
			utility.Swap(arr, index, biggerArea-1)
			biggerArea--
		} else {
			index++
		}
	}
	utility.Swap(arr, biggerArea, r)
	// 返回等于区左右边界
	return lessArea+1, biggerArea
}
```

工具方法：

```go
package utility

func Swap(arr []int, i, j int) {
	arr[i], arr[j] = arr[j], arr[i]
}
```

### 迭代版本

🧩 **玩转迭代：荷兰国旗版区间划分** 🌐

栈是我们修改递归的利器！

```go
func QuickSort2(arr []int){
	job := Job{left:0, right:len(arr)-1}
	stack := list.New() // 使用栈模拟递归的堆栈信息
	stack.PushBack(job)
	for stack.Len() > 0 {
		job := stack.Remove(stack.Back()).(Job)
		mL, mR := partition(arr, job.left, job.right)
		if mL-1 > job.left {
			stack.PushBack(Job{left:job.left, right: mL-1})
		}
		if mR+1 < job.right {
			stack.PushBack(Job{left:mR+1, right: job.right})
		}
	}
}

type Job struct { // 保存递归时对应的参数
	left int
	right int
}
```

### 测试代码

```go
package sort

import (
	"github.com/stretchr/testify/assert"
	"sort"
	"testing"
	"traning/algorithm/utility"
)

func TestQuickSort(t *testing.T) {
	a := assert.New(t)
	testTime := 50000       // 测试次数
	testArrMaxLen := 100    // 随机数组的最大长度[0, testArrMaxLen)
	testArrMaxNum := 1000   // 随机数组中最大的数字[0, testArrMaxNum)
	randomCreator := utility.GetRandomNumCreator()  // 初始化随机数组生成器
	for i:=0; i<testTime; i++ { // 开始测试，总共测试50万次
		// 生成一个 长度为 [0, testArrMaxLen) 数字大小为 [0, testArrMaxNum) 的随机数组
		ranArr := randomCreator.GetRandomArr(testArrMaxNum, testArrMaxLen)
		// 拷贝数组用于进行校验
		arr1 := utility.CopyArr(ranArr)
		arr2 := utility.CopyArr(ranArr)
		arr3 := utility.CopyArr(ranArr)
		QuickSort(arr1) // 我们自己实现的选择排序，对arr1进行排序
		QuickSort2(arr3)
		sort.Ints(arr2)  // 系统严格正确的排序方法，对arr2进行排序
		a.True(utility.ArrEqual(arr1, arr2)) // 如果我们的排序的方式与严格正确的排序不一致，则我们的算法失败
		a.True(utility.ArrEqual(arr3, arr2)) // 如果我们的排序的方式与严格正确的排序不一致，则我们的算法失败
	}
}
```

随机数组生成器：

```go
package utility

import (
	"math/rand"
	"time"
)


func GetRandomNumCreator() RandomNumCreator {
	return RandomNumCreator{
		time.Now().UnixNano(),
	}
}

type RandomNumCreator struct {
	Seed int64
}

func (r *RandomNumCreator) GetRandom(maxNum int) int {
	rand.Seed(r.Seed)
	r.Seed++
	return rand.Intn(maxNum)
}

func (r *RandomNumCreator)GetRandomArr(maxNum, maxLen int) []int {
	arrLen := r.GetRandom(maxLen)
	arr := make([]int, arrLen)
	for i:=0 ;i<arrLen; i++ {
		arr[i] = r.GetRandom(maxNum)
	}
	return arr
}
```

### 基准测试

```go
func BenchmarkQuickSort(b *testing.B) {
	// 可以放初始化代码，时间过长，需要使用 b.ResetTimer()
	// 将计时器归零, 避免循环之前的初始化代码的干扰
	// 排除初始化代码的影响，只测试循环内部的代码性能。
	b.ResetTimer()
	// loop b.N times
	ranArr := []int{448,398,548,617,723,64,790,948,683,601,414,672,293,891,377,907,676,37,987,437,391,728,454,619,785,674,900,565,971,572,806,264,270,108}
	for i := 0; i < b.N; i++ {
		ranArr = []int{448,398,548,617,723,64,790,948,683,601,414,672,293,891,377,907,676,37,987,437,391,728,454,619,785,674,900,565,971,572,806,264,270,108}
		QuickSort(ranArr)
	}
}

func BenchmarkQuickSort2(b *testing.B) {
	// 可以放初始化代码，时间过长，需要使用 b.ResetTimer()
	// 将计时器归零, 避免循环之前的初始化代码的干扰
	// 排除初始化代码的影响，只测试循环内部的代码性能。
	b.ResetTimer()
	// loop b.N times
	ranArr := []int{448,398,548,617,723,64,790,948,683,601,414,672,293,891,377,907,676,37,987,437,391,728,454,619,785,674,900,565,971,572,806,264,270,108}
	for i := 0; i < b.N; i++ {
		ranArr = []int{448,398,548,617,723,64,790,948,683,601,414,672,293,891,377,907,676,37,987,437,391,728,454,619,785,674,900,565,971,572,806,264,270,108}
		QuickSort2(ranArr)
	}
}

// partition有随机过程
//C:\Users\C\Desktop\gitCode\training\algorithm\sort> go test -bench . -benchmem
//1
//goos: windows
//goarch: amd64
//pkg: traning/algorithm/sort
//cpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
//BenchmarkQuickSort-12               4352            272832 ns/op             288 B/op          1 allocs/op
//BenchmarkQuickSort2-12              4377            275158 ns/op            1761 B/op         46 allocs/op
//PASS
//ok      traning/algorithm/sort  104.090s

// partition无随机过程
//C:\Users\C\Desktop\gitCode\training\algorithm\sort> go test -bench . -benchmem
//1
//goos: windows
//goarch: amd64
//pkg: traning/algorithm/sort
//cpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
//BenchmarkQuickSort-12            1961750               624.9 ns/op           288 B/op          1 allocs/op
//BenchmarkQuickSort2-12            340016              3281 ns/op            1808 B/op         48 allocs/op
//PASS
//ok      traning/algorithm/sort  65.645s
```

### 测试分析

📊 **性能大比拼：BenchmarkQuickSort vs. BenchmarkQuickSort2** 🚀

在这个性能基准测试中，我们为你呈现了两位排序函数的实力对决：`BenchmarkQuickSort` 和 `BenchmarkQuickSort2`。让我们逐一揭秘每个参数的细节：

1. **BenchmarkQuickSort-12 和 BenchmarkQuickSort2-12**：
   - `BenchmarkQuickSort-12` 和 `BenchmarkQuickSort2-12`，这两位是我们性能大拼场的明星。数字12则是运行时GOMAXPROCS（Go程序的最大并发数）的精髓所在。

2. **4352 和 4377**：
   - 这两数字是每个基准测试函数所经历的操作次数。在这场较量中，BenchmarkQuickSort 分别进行了4352次操作，而 BenchmarkQuickSort2 做了更多的4377次操作。

3. **272832 ns/op 和 275158 ns/op**：
   - 这两数字是每次操作的平均纳秒数。BenchmarkQuickSort 平均每次操作约272832纳秒，而 BenchmarkQuickSort2 略高，平均每次操作花费了约275158纳秒。

4. **288 B/op 和 1761 B/op**：
   - 这两数字则代表每次操作分配的内存字节数。BenchmarkQuickSort 分配约288字节内存，而 BenchmarkQuickSort2 则要多多达1761字节。

5. **1 allocs/op 和 46 allocs/op**：
   - 最后，这两位数字表示每次操作进行的内存分配次数。BenchmarkQuickSort 仅分配了1次内存，而 BenchmarkQuickSort2 操劳了整整46次。

🔍 **综合分析**：

- **BenchmarkQuickSort vs. BenchmarkQuickSort2**：
  - BenchmarkQuickSort 展现出更佳的性能，因为它的平均纳秒数更低，分配的内存和内存分配次数也相对较少。这可能得益于 QuickSort 算法的优化或者实现方式的不同。

- **内存分配次数和分配的内存**：
  - BenchmarkQuickSort 每次操作只需1次内存分配，而 BenchmarkQuickSort2 辛辛苦苦地分了46次。此外，BenchmarkQuickSort 分配的内存更为节俭（288字节），而 BenchmarkQuickSort2 则颇费功夫分了较多（1761字节）。内存分配越少通常意味着更高效，能够降低垃圾回收的负担，提高整体性能。

总体而言，BenchmarkQuickSort 在这场性能对决中表现更为出色。然而，具体的性能优劣也可能受到数据集大小、硬件环境等多方面因素的影响，在实际应用中需权衡选择。👩‍💻💡

### 递归更强

#### 🚀 **快速排序探秘：递归vs迭代** 🤔

咱们聊聊`QuickSort`函数和`QuickSort2`函数的事情吧。`QuickSort`采用的是快速排序的递归方式，而`QuickSort2`则是采用迭代方式。在理论上，迭代的快排应该更胜一筹，可为啥测试数据偏偏显示递归方式更牛呢？

🧠 **理论与实际的碰撞**：

在理论上，迭代的快速排序通常会赢过递归。迭代避免了递归调用的烦恼，减少了栈的深度，从而有望更快一些。但实际上，你的测试结果告诉我们递归的`QuickSort`更给力。为啥呢？我们来想一下可能的原因：

1. 数据大小问题
   - 数据集大小如果不大，递归的额外开销可能微不足道，而递归版本可能更简洁易读。
2. 编译器小九九
   - 编译器可能给递归版本做了些小优化，让它在实际运行中更有效。不同版本的编译器优化力度也不一样哦。
3. 随机化的精彩
   - 你的代码用了随机化的快排选择主元，这可以平衡快排的分区。但实际运行中，数据集和分区策略变化可能导致性能变化。
4. 硬件和环境变量
   - 不同硬件环境下，不同代码可能有不同性能。比如某些硬件，递归和迭代性能差距可能不大。

为了彻底解开递归`QuickSort`的谜团，你可以尝试用更大的数据集测试，看看结果是否有所变化。同时，检查编译器的优化选项，确保两种实现都得到了相似的对待。还可以试试去掉随机化的主元选择，看看会不会有不同的效果哦。一切为了更了解我们亲爱的快速排序！💪✨

#### 🚀 **不随机 vs. 随机** 🔄

在抛弃了随机主元选择后，递归版快速排序（`QuickSort`）比迭代版（`QuickSort2`）更胜一筹。咱们来看看可能的原因吧！

1. **栈管理开销✨**：
   - 递归版在调用栈上飘逸，而迭代版却倚赖一个显式的栈（嗯，`list.New()`来一发）。在某些场景下，递归调用栈的管理开销可能更低，助力更快的执行速度。这里的小差异可能和Go语言运行时系统有关。
2. **编译器优化🛠️**：
   - 编译器或许对递归版施展了更为高超的优化法术，让其在实际运行中更为得心应手。编译器的优化套路或许会因版本和配置而异。
3. **分区算法优化🧠**：
   - 虽然两个版本都舞动着相同的分区算法，但递归版或许因其递归特性更易被编译器优化，又或者更善于利用缓存来大展身手。
4. **数据集大小📏**：
   - 在小巧的数据集上，递归版因其递归调用的优势可能更为引人注目。但随着数据集的膨胀，或许会看到递归版的优势逐渐缩小，甚至发生颠倒。
5. **硬件和环境🌐**：
   - 不同的硬件和运行环境或许对这两种实现的性能有着千差万别的影响。某些硬件架构或Go运行时的版本可能更适合处理那些递归调用的花招。

#### 🚀 **十万数据量对比** 🔄

```go
var once sync.Once
var globalRandomArr []int
func setup() {
	once.Do(func() {
		r := utility.GetRandomNumCreator()
		for i := 0; i< 100000; i++  {
			globalRandomArr = append(globalRandomArr, r.GetRandom(100000))
		}
	})
}

func BenchmarkQuickSort(b *testing.B) {
	// 可以放初始化代码，时间过长，需要使用 b.ResetTimer()
	// 将计时器归零, 避免循环之前的初始化代码的干扰
	// 排除初始化代码的影响，只测试循环内部的代码性能。
	setup()
	b.ResetTimer()
	// loop b.N times
	ranArr := globalRandomArr
	for i := 0; i < b.N; i++ {
		ranArr = globalRandomArr
		QuickSort(ranArr)
	}
}

func BenchmarkQuickSort2(b *testing.B) {
	// 可以放初始化代码，时间过长，需要使用 b.ResetTimer()
	// 将计时器归零, 避免循环之前的初始化代码的干扰
	// 排除初始化代码的影响，只测试循环内部的代码性能。
	setup()
	b.ResetTimer()
	// loop b.N times
	ranArr := globalRandomArr
	for i := 0; i < b.N; i++ {
		ranArr = globalRandomArr
		QuickSort2(ranArr)
	}
}

// 十万数据量
//C:\Users\C\Desktop\gitCode\training\algorithm\sort> go test -bench . -benchmem
//1
//goos: windows
//goarch: amd64
//pkg: traning/algorithm/sort
//cpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
//BenchmarkQuickSort-12                  2         582827600 ns/op               0 B/op          0 allocs/op
//BenchmarkQuickSort2-12                 2         588712750 ns/op         3054384 B/op      95449 allocs/op
//PASS
//ok      traning/algorithm/sort  106.351s

// 百万数据量
//C:\Users\C\Desktop\gitCode\training\algorithm\sort> go test -bench . -benchmem
//1
//goos: windows
//goarch: amd64
//pkg: traning/algorithm/sort
//cpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
//BenchmarkQuickSort-12                  1        1320516700 ns/op               0 B/op          0 allocs/op
//BenchmarkQuickSort2-12                 1        1274146600 ns/op         6397296 B/op     199915 allocs/op
//PASS
//ok      traning/algorithm/sort  116.190s

// 千万数据量
//C:\Users\C\Desktop\gitCode\training\algorithm\sort> go test -bench . -benchmem
//1
//goos: windows
//goarch: amd64
//pkg: traning/algorithm/sort
//cpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
//BenchmarkQuickSort-12                  1        2185236700 ns/op               0 B/op          0 allocs/op
//BenchmarkQuickSort2-12                 1        1709540600 ns/op         6400048 B/op     200001 allocs/op
//PASS
//ok      traning/algorithm/sort  226.066s
```

