---
title: 二分及其拓展-2-数组中小于等于num的最左位置
autoGroup-1: 🌱阶段一：初出茅庐🌱 
---

# 有序数组中查找小于等于num的最左位置

我们有如下一个数组：

![](/g1_bisectiom_1_find_num.assets/image-20230907233145954.png)

数组内的数字是有序的，我们假设不知道里面是小于等于数字`9`，设计一个函数，指定数组及数字，该函数返回小于等于`9`最左边的位置，不存在返回`-1`

## 算法步骤

1. ，初始化赋值左右两边的位置`left`、`right`，并计算出中间位置`mid = (left + rignt) / 2`，并初始化答案为`index = -1`，因为我们起初不知道存不存在该位置。

   ![image-20230907233809200](/g1_bisectiom_1_find_num.assets/image-20230907233809200.png)

   `mid`位置为5，小于等于9，满足我们的要求，我们使`index = 1`，该位置比我们目标值`9`要小，还存在更左的答案，让`left = mid + 1`，继续判断

2. 此时`left`和`right`相等，计算出来的mid也等于`left`和 `right`，此时数组的`mid`位置为`9`，小于等于我们要找的目标，我们使`index = 2`返回即可。

   ![image-20230907234154239](/g1_bisectiom_1_find_num.assets/image-20230907234154239.png)



## 代码实现

### 方式一

采用边界为 left < right 的方式循环：

```go
func BSNearLeft(arr []int, num int) index {
	if arr == nil || len(arr) == 0 {
		return -1
	}
	left, right, mid, index := 0, len(arr)-1, 0, -1
	for left <= right { 
		mid = left + ((right - left) >> 1)
		if arr[mid] <= num {
            index = mid
            left = mid + 1
		} else {
			right = mid - 1
		}
	}
	return index
}
```

### 