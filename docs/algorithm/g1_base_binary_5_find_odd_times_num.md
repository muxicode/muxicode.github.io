---
title: 位运算-6-找到出现次数奇数次的数
autoGroup-1: 🌱阶段一：初出茅庐🌱
---
# 找到出现次数奇数次的数

## 题目

在一个数组中，只有一个数出现了奇数次，其余数都出现过偶数次，要求找到出现奇数次的数，如以下数组：

![](/g1_base_6_binary_find_odd_times_num.assets/odd_times_num_1.drawio.png)

其中，只有`6`出现了一次，其余数出现了两次，根据题目出现奇数次的数为`6`

## 异或

异或的一些性质：

1. `a ^ a = 0`
2. `a ^ (b ^c) = (a ^ b) ^ c`      异或满足结合律
3. `a ^ 0 = a`                                      异或其实可以理解为异或数在二进制上的无进位相加

## 题解

从上面的性质2，可以知道我们的数组整体的异或如：

![](/g1_base_6_binary_find_odd_times_num.assets/odd_times_num_2.drawio.png)

是可以调整位置的如：

![](/g1_base_6_binary_find_odd_times_num.assets/odd_times_3.drawio.png)

在根据性质1，我们可以知道，数组整体异或完后即可得到只出现奇数次的数，因为出现偶数次的数异或后都变为了`0`

## 代码

```go
func FindOddTimesNum(arr []int) int {
	if arr == nil || len(arr) == 0 {
		return -1
	}
	ans := 0
	for _, v := range arr {
		ans ^= v
	}
	return ans
}
```