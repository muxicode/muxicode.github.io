---
title: 对数器使用
autoGroup-1: 🌱阶段一：初出茅庐🌱

---

# 对数器使用

为什么需要有对数器呢？

- 当我们写完一个复杂的算法，但是不知道正不正确，怎么验证？
- 如果算法不正确时，如何找到代码对应的逻辑错误？
- 测试用例想不全，无法覆盖算法的全部场景

如果你遇到了这些问题，那么我们对数器可以很好的解决我们的问题，接下来我们用对数器的方式，对我们之前的[选择排序](/algorithm/g1_base_5_line_code01_select_sort)进行验证，保证我们选择排序的正确性。

## 验证选择排序

我们为选择排序写了如下的测试代码：

```go
func TestSelectSort(t *testing.T) {
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
		SelectSort(arr1) // 我们自己实现的选择排序，对arr1进行排序
		sort.Ints(arr2)  // 系统严格正确的排序方法，对arr2进行排序
		a.True(utility.ArrEqual(arr1, arr2)) // 如果我们的排序的方式与严格正确的排序不一致，则我们的算法失败
	}
}
```

在随机的大量样本的情况下，我们使用对数器的方式将我们的算法与严格正确的算法执行后的结果进行比对，如果比对错误，则我们写的算法存在问题。

出现这种情况时，我们只需要调小我们的数据范围，找到一个合适的错误案例在测试用例中打印出来，拿到错误案例后，走查我们的算法代码即可。

没有测试用例，这样测试不会出现问题吗？其实测试用例也是由我们设计出来的，在绝对的随机且巨大的样本等下，其实覆盖的情况会比实际的用例多得多。

## 随机数组生成器

在`golang`中，我们直接使用很容易使用 `math/rand`包来随机生成我们需要数字，容易写出如下代码：

```go
import (
	"math/rand"
)

func GetRandomArr(maxNum, maxLen int) []int {
	arrLen := rand.Intn(maxLen)
	arr := make([]int, arrLen)
	for i:=0 ;i<arrLen; i++ {
		arr[i] = rand.Intn(maxNum)
	}
	return arr
}
```

这样的方式生成随机代码时，你会发现，如何生成都是一样的。因为`rand`生成随机数需要我们动态设置种子，我们可以这么写：

```go
func GetRandomArr(maxNum, maxLen int) []int {
	rand.Seed(time.Now().UnixNano()) // 加上纳秒值做我们的种子
	arrLen := rand.Intn(maxLen)
	arr := make([]int, arrLen)
	for i:=0 ;i<arrLen; i++ {
		arr[i] = rand.Intn(maxNum)
	}
	return arr
}
```

但是使用后，我们会发现，这种方式还不能满足我们的要求，在大量循环的时候我们的样本一大部分都是一样的，因为在同纳秒内我们执行了很多次这个方法，在同一纳秒内，我们的随机数组都是一样的。对于这个问题，我们又可以做如下改进：

```go
package utility

import (
	"math/rand"
	"time"
)


func GetRandomNumCreator() RandomNumCreator { // 工厂函数，获取我们的随机数生成器
	return RandomNumCreator{
		time.Now().UnixNano(),
	}
}

type RandomNumCreator struct {
	Seed int64
}

func (r *RandomNumCreator) GetRandom(maxNum int) int {
	rand.Seed(r.Seed)
	r.Seed++  // 每次生成随机数改变我们的种子
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

使用如下所示：

![](/g1_compare_for_ans.assets/image-20230904001808086.png)

## 数组工具方法

```go
func CopyArr(arr []int) []int {
	ans := make([]int, len(arr))
	for i:=0; i<len(arr); i++ {
		ans[i] = arr[i]
	}
	return ans
}

func ArrEqual(arr1, arr2 []int) bool {
	if arr1 == nil && arr2 == nil {
		return true
	}
	if (arr1 == nil && arr2 != nil) ||
		(arr1 != nil && arr2 == nil) {
		return false
	}
	if len(arr1) != len(arr2) {
		return false
	}
	for i, v := range arr1 {
		if arr2 != nil && arr2[i] != v {
			return false
		}
	}
	return true
}
```

