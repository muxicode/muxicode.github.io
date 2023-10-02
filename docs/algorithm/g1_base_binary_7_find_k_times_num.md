---
title: 位运算-8-找到出现次数为K次的数
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 找到出现次数为K次的数

假设有一个数组中出现了一堆数，其中一个数出现了 `K`次，其余的数出现了`M`次，其中`K<M 且 M>1 `，要求找到数组中出现`K`次的数。

## 算法思想

![](/g1_base_binary_7_find_k_times_num.assets/k_num.drawio.png)

我们将数组中的数的二进制每个位置的`1`使用等长的数组进行统计，统计完毕后让每个位置的总数模`M`如果不等于`0`则出现`K`次的数在该位置为`1`，使用该方式还原出现`K`次的数即可。

## 代码实现

```go
func FindKTimesNum(arr []int, K, M int) int {
	if arr == nil || len(arr) == 0 { // 不存在出现K次数字的情况返回-1
		return -1
	}
	bitArr := make([]int, 64)
	for _, num := range arr {
		CountOneInBitArr(bitArr, num) // 统计每一个num对应位置的1
	}
	ans := GetAnsNumByKM(bitArr, K, M) // 还原出现K次数的数字，0时需要校验真是出现次数
	if ans !=0 {
		return ans
	}
	count := 0
	for _, num := range arr {
		if num == 0 {
			count++
		}
	}
	if count == K {
		return 0
	}
	return -1
}

func CountOneInBitArr(bitArr []int, num int) {
	var index uint = 0
	for index < 64 { // 遍历num的每一位，将为1的位置统计下来
		if (num>>index) & 1 != 0 {
			bitArr[index]++
		}
		index++
	}
}

func GetAnsNumByKM(bitArr []int, K, M int) int {
	ans := 0
	for i, v := range bitArr { // 遍历二进制数组，找到目标数字每一位二进制为1的位置
		if v%M != 0 {
			ans |= 1<<uint(i)
		}
	}
	return ans
}
```