---
title: 1.最大间距
autoGroup-5: 阶段4-part-three
---

# 1. 最大间距



## 题目：

给定一个无序数组arr，返回如果排序之后，相邻数之间的最大差值

{3,1,7,9}, 如果排序后 {1,3,7,9}，相邻数之间的最大差值来自3和7，返回4

要求：不能真的进行排序，并且要求在时间复杂度O(N)内解决

![](/actual4_part_three_1_max_group.assets/image-20230408124409030.png)

## 算法步骤

以下展示一个具体的例子的解题步骤：

![](/actual4_part_three_1_max_group.assets/image-20230408133516793.png)

继续进行分析：

![](/actual4_part_three_1_max_group.assets/image-20230408133542709.png)

## 代码

```go
import "math"

func MaxGroup(arr []int) int {
	if len(arr) < 2 {
		return 0
	}
	// 1. 获取数组的最大最小值
	min, max := math.MaxInt, math.MinInt
	for i:=0 ;i<len(arr); i++ {
		if arr[i] < min {
			min = arr[i]
		}
		if arr[i] > max {
			max = arr[i]
		}
	}
	if min == max {
		return 0
	}

	// 2. 初始化桶的基础数据，桶有三个属性，目前直接使用三个一维数组记录
	bucketNum := len(arr) + 1
	bucketMax := make([]int, bucketNum)
	bucketMin := make([]int, bucketNum)
	bucketNoEmpty := make([]bool, bucketNum)

	// 3. 遍历原数组统计出桶的数据
	for i:=0; i<len(arr); i++ {
		bucketIndex := GetBucketIndex(arr[i], min, max, bucketNum-1)
		if bucketNoEmpty[bucketIndex] { // 如果桶不空的话，直接更新值
			bucketMax[bucketIndex] = Max(arr[i], bucketMax[bucketIndex])
			bucketMin[bucketIndex] = Min(arr[i], bucketMin[bucketIndex])
		} else {
			// 桶是空的时候，初始化桶内的最大最小值
			bucketMax[bucketIndex] = arr[i]
			bucketMin[bucketIndex] = arr[i]
			bucketNoEmpty[bucketIndex] = true
		}
	}

	// 4. 遍历桶，统计结果，并返回
	preMax := bucketMax[0]
	ans := 0
	for i:=1 ;i<bucketNum; i++ {
		if bucketNoEmpty[i] {
			ans = Max(ans, bucketMin[i] - preMax)
			preMax = bucketMax[i]
		}
	}

	return ans
}

func GetBucketIndex(num, min, max, bucketNum int) int {
	return (num-min) * bucketNum / max-min
}

func Max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func Min(a, b int) int {
	if a > b {
		return b
	}
	return a
}
```

