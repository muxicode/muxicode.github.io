---
title: 二分及其拓展-3-数组中大于等于num的最右位置
autoGroup-1: 🌱阶段一：初出茅庐🌱 
---

# 有序数组中查找大于等于num的最右位置

我们有如下一个数组：

![](/g1_bisectiom_1_find_num.assets/image-20230907233145954.png)

数组内的数字是有序的，我们假设不知道里面是数字情况，设计一个函数，指定数组及数字，该函数返回大于等于`3`最左边的位置，不存在返回`-1`

## 算法步骤

参考[有序数组中查找小于等于num的最左位置](/algorithm/g1_bisection_2_bs_left)，修改下边界条件即可

## 代码实现

### 方式一

采用边界为 left < right 的方式循环：

```go
func BSNearRight(arr []int, num int) int {
	if arr == nil || len(arr) == 0 {
		return -1
	}
	left, right, mid, index := 0, len(arr)-1, 0, -1
	for left <= right { 
		mid = left + ((right - left) >> 1)
		if arr[mid] >= num {
            index = mid
            right = mid - 1
		} else {
			left = mid + 1
		}
	}
	return index
}
```

### 