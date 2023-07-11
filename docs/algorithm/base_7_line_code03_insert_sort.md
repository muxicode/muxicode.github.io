---
title: 7. 插入排序
autoGroup-1: 基础
---

# 3. 插入排序

## 步骤

选择排序，具体步骤如下：

- 0~0 位置由于只有一个数直接是有序的
- 0~1 对比0与1位置的两个数的大小，如果0位置的数大于1位置则，交换，保证0-1之间是有序的
- 0~3 对比3位置的数与2位置的数，小的放在前面，相邻位置做交换，直到0-3位置变有序
- 0~N-1 重复如上步骤，直到整个数组变有序

## 步骤示例

![](/base_line_code03_insert_sort.assets/image-20230405150450180.png)


## 代码

```go
func InsertSort(arr []int) {
	N := len(arr)
	for i:=0; i<=N-1; i++ { // 指定范围 0-0 0-1 0-2 0-i 慢慢增大区间
		for j:=i; j>=0 ; j-- { // 在0-i区间内，从最后一个数开始与建一个数比较
			if j-1 >= 0 && arr[j] < arr[j-1] { // 如果前一个数比当前数大，交换位置，继续向前比较
				Swap(arr, j, j-1)
			} else { // 如果当前位置比之前的数大，则已经有序，退出循环
				break
			}
		}
	}
}

func InsertSort2(arr []int) {
	N := len(arr)
	for end:=0; end<=N-1; end++ { // 指定范围 0-0 0-1 0-2 0-i 慢慢增大区间
		newNumIndex := end
		for newNumIndex-1>=0 && arr[newNumIndex-1] > arr[newNumIndex] { // 在0-end区间内，从最后一个数开始与建一个数比较
			Swap(arr, newNumIndex, newNumIndex-1)
			newNumIndex--
		}
	}
}

func Swap(arr []int, i, j int) {
	arr[i], arr[j] = arr[j], arr[i]
}
```

