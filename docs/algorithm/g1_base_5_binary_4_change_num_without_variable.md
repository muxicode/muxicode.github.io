---
title: 位运算-5-不用中间变量交换两个数
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 不用中间变量交换两个数

![](/g1_base_5_binary_4_change_num_without_variable.assets/image-20230906233041401.png)

我们有长度为`2`的一个数组，我们想要交换这两个数的位置，如何使用中间变量，交换数组中的`6`和`3`呢？

根据二进制基础与位运算，我们可以知道`6`的二进制，`3`的二进制，并可以算出`6^3`的二进制。

![image-20230906234055348](/g1_base_5_binary_4_change_num_without_variable.assets/image-20230906234055348.png)

## 算法步骤

基于以上我们开始使用位运算，交换数组两个位置的值。

1. 我们重新赋值 **数组的`0`位置 = 数组的`0`位置 ^  数组的`1`位置**，即数组的`0`变为 `6^3`，对应的十进制为 `5`

![image-20230906234438952](/g1_base_5_binary_4_change_num_without_variable.assets/image-20230906234438952.png)

2. 我们重新赋值 **数组的`1`位置 = 数组的`0`位置 ^  数组的`1`位置**，即数组的`1`变为 `5^3`，对应的十进制为 `6`。此时我们最初的`0`位置的`6`来到了`1`位置。

   ![image-20230906235750339](/g1_base_5_binary_4_change_num_without_variable.assets/image-20230906235750339.png)

   ![image-20230907000224041](/g1_base_5_binary_4_change_num_without_variable.assets/image-20230907000224041.png)

3. 我们重新赋值 **数组的`0`位置 = 数组的`0`位置 ^  数组的`1`位置**，即数组的`0`变为 `5^6`，对应的十进制为 `3`。此时我们最初的`1`位置的`3`来到了`0`位置。我们完成了数组两个位置值的交换，且没有使用中间变量。

   ![image-20230907000514626](/g1_base_5_binary_4_change_num_without_variable.assets/image-20230907000514626.png)



## 代码实现

根据我们以上的不走不难写出，我们下面的算法代码：

```go
func BinSwap(arr []int, i, j int) {
	arr[i] = arr[i] ^ arr[j]
	arr[j] = arr[i] ^ arr[j]
	arr[i] = arr[i] ^ arr[j]
}
```

但是在`go`语言中，我们还可以直接使用以下的语法糖来交换数组内容的位置：

```go
func GoSwap(arr []int, i, j int) {
	arr[i], arr[j] = arr[j], arr[i]
}
```

这两种方式哪种速度快？于是我们写出如下的基准测试：

```go
import "testing"

func BenchmarkBinSwap(b *testing.B) {
	// 可以放初始化代码，时间过长，需要使用 b.ResetTimer()
	// 可以放初始化代码，时间过长，需要使用 b.ResetTimer()
	arr := []int{3, 6}
	// 将计时器归零, 避免循环之前的初始化代码的干扰
	// 排除初始化代码的影响，只测试循环内部的代码性能。
	b.ResetTimer()

	// loop b.N times
	for i := 0; i < b.N; i++ {
		// 待测试性能的函数
		BinSwap(arr, 0, 1)
	}
}

func BenchmarkGoSwap(b *testing.B) {
	// 可以放初始化代码，时间过长，需要使用 b.ResetTimer()
	// 可以放初始化代码，时间过长，需要使用 b.ResetTimer()
	arr := []int{3, 6}
	// 将计时器归零, 避免循环之前的初始化代码的干扰
	// 排除初始化代码的影响，只测试循环内部的代码性能。
	b.ResetTimer()

	// loop b.N times
	for i := 0; i < b.N; i++ {
		// 待测试性能的函数
		GoSwap(arr, 0, 1)
	}
}
```

结果如下：

![image-20230907001427486](/g1_base_5_binary_4_change_num_without_variable.assets/image-20230907001427486.png)

我们的算法交换数组位置的速度，并没有`go`语法糖的速度快，所以在`go`中我们可以直接使用语法糖交换位置，以上的算法就当做我们熟悉二进制的练习~