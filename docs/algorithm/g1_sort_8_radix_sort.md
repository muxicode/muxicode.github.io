---
title: 排序-8-基数排序
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 基数排序

**背景：**
基数排序，是一种专门为处理数字序列而设计的排序算法。它的灵感来源于人类对数字的处理方式，类似于将数字按照位数逐位进行排序，实现了对整数的高效排序。虽然在现代计算机领域，更常见的排序算法是快速排序和归并排序，但在某些场景下，基数排序依然闪耀着独特的光芒。

## 场景及优势

**场景：**
基数排序在处理数字序列上有着独特的优势，尤其适用于以下场景：

- **整数排序：** 针对整数进行排序，尤其是对于位数相同的整数序列。
- **字符串排序：** 可以将字符串看作是一系列字符的数字表示，适用于基数排序。
- **多关键字排序：** 当存在多个关键字需要同时排序时，基数排序能够逐个关键字进行排序，形成整体有序的结果。

**优势：**
基数排序具有一些独特的优势，使其在特定场景下表现出色：

- **稳定性：** 基数排序是一种稳定的排序算法，保持相等元素的相对顺序。
- **适应性：** 对于位数相同的数字序列，基数排序表现出良好的适应性，排序效率较高。
- **非比较性：** 基数排序不涉及元素之间的比较操作，减少了算法的复杂度，对于一些特定范围的数字排序更为高效。

**基本原理：**
基数排序的核心思想是将整数按照位数逐个进行排序，最终形成有序序列。具体步骤包括：

1. **按位分配：** 从低位到高位，依次按照每一位的数值进行分配，形成桶。
2. **按位收集：** 将桶中的元素按照顺序收集，形成新的序列。
3. **迭代重复：** 重复以上两步，直到整个数字序列有序。

## 案例展示

![](/g1_sort_8_radix_sort.assets/radix_sort.drawio.png)

使用计数排序将上述无序数组调整为有序：

![](/g1_sort_8_radix_sort.assets/radix_sort_1.drawio.png)

## 空间优化

![](/g1_sort_8_radix_sort.assets/radix_sort_2.drawio.png)

## 代码实现

```go
package sort

import (
	"math"
)

func RadixSort (arr []int) {
	if arr == nil || len(arr) < 2 {return}
	radixSort(arr, getDigit(arr))
}

func getDigit(arr []int ) int {
	max := arr[0]
	for i:=1; i<len(arr); i++ {
		if arr[i] > max {
			max = arr[i]
		}
	}
	digit := 0
	for max != 0 {
		max = max/10
		digit++
	}
	return digit
}

func radixSort(arr []int, digit int) {
	radix := 10
	help := make([]int, len(arr))
	count := make([]int, radix)
	for location:=1; location<=digit; location++ {
		for j:=0; j<len(arr); j++ {
			count[getNumByLocation(arr[j], location)]++
		}
		for i:=1; i<len(count); i++{
			count[i] += count[i-1]
		}
		for i:=len(arr)-1; i>=0; i-- {
			NumCount := count[getNumByLocation(arr[i], location)]
			help[NumCount-1] = arr[i]
			count[getNumByLocation(arr[i], location)]--
		}
		for i:=0; i<len(arr); i++ {
			arr[i] = help[i]
		}
		count = make([]int, radix)
	}
}

func getNumByLocation(num int, location int) int {
	return num/int(math.Pow10(location-1)) % 10
}
```

