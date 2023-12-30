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

