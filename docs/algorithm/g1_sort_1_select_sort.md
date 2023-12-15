---
title: 排序-1-选择排序
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 1. 选择排序

## 步骤

选择排序，具体步骤如下：

- 0~N-1 上选出最小值放到0位置
- 1~N-1 上选出最小值放到1位置 
- 2~N-1 上选出最小值放到2位置
- ...

直到将数组排好序

## 步骤示例

![](/base_line_code01_select_sort.assets/image-20230329203744415.png)


## 代码

```go
func SelectSort(arr []int) {
	N := len(arr)
	if N == 0 {
		return
	}
	var minIndex int
	for i:=0; i<N; i++ {
		// 0 ~ N-1
		// 1 ~ N-1
		// 2 ~ N-1
		// i ~ N-1
		minIndex = i // 当前只看过i位置的值
		for j:=i+1; j<N; j++ {
			// 寻找剩下的数中最小值的位置
			if arr[j] < arr[minIndex] {
				minIndex = j
			}
		}
		// 交换到目标位置
		Swap(arr, i, minIndex)
	}
}

func Swap(arr []int, i, j int) {
	arr[i], arr[j] = arr[j], arr[i]
}
```

