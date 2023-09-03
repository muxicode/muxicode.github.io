---
title: 矩阵最长增长路径
autoGroup-5: 📒练习集📒
---

# 1. 矩阵最长增长路径



## 题目

给定一个二维数组 matrix，可以从任何位置出发，每一步可以向上，下，左，右四个方向。返回最大递增链的长度。

```go
例子：
   matrix =
   5 4 3
   3 1 2
   2 1 3
从最中心的位置1出发，是可以走出1 2 3 4 5的链的，而且这是最长的递增链。所以
返回长度5
```

## 思路：

> 方案

1. 设计一个递归 fn(matrix, i, j) 返回值为再矩阵中 i, j 的位置出发，返回最长的递增链
2. 遍历任意一个 i，j 的位置，调用 fn 函数，获取最大值即为答案

> 优化

1. 递归过程中采用 缓存 表缓存每一个位置的答案
2. 缓存表中等于 0 则，该位置没有计算过，调用递归进行计算
3. 缓存表中不等于 0，则直接返回答案。

```go
package class01

import "traning/algorithm/utility/mymath"

/*
	给定一个二维数组 matrix，可以从任何位置出发，每一步可以向上，下，
	左，右四个方向。返回最大递增链的长度。

	例子：
		matrix =
		5 4 3
		3 1 2
		2 1 3
	从最中心的位置1出发，是可以走出1 2 3 4 5的链的，而且这是最长的递增链。所以
	返回长度5
*/
func MaxPath(matrix [][]int) int {
	var ans int
	for i:=0; i<len(matrix); i++ {
		for j:=0; j<len(matrix[i]); j++ {
			ans = mymath.Max(ans, MaxPathProcess(matrix, i, j))
		}
	}
	return ans
}

func MaxPathProcess(matrix [][]int, i, j int) int {
	if i < 0 || i > len(matrix)-1 || j < 0 || j > len(matrix[0]) - 1 {
		// 越界直接返回-1
		return -1
	}
	var up, left, right, down int
	if i-1 >= 0 && matrix[i-1][j] > matrix[i][j] {
		up = MaxPathProcess(matrix, i-1, j)
	}
	if j-1 >= 0 && matrix[i][j-1] > matrix[i][j] {
		left = MaxPathProcess(matrix, i, j-1)
	}
	if j+1 <= len(matrix[0]) - 1 && matrix[i][j+1] > matrix[i][j] {
		right = MaxPathProcess(matrix, i, j+1)
	}
	if i+1 <= len(matrix) - 1  && matrix[i+1][j] > matrix[i][j] {
		down = MaxPathProcess(matrix, i+1, j)
	}
	return mymath.Max(mymath.Max(up, left), mymath.Max(right, down)) + 1
}

func MaxPath1(matrix [][]int) int {
	var ans int
	cache := make([][]int, len(matrix))
	for i:=0; i<len(cache); i++ {
		cache[i] = make([]int, len(matrix[i]))
	}

	for i:=0; i<len(matrix); i++ {
		for j:=0; j<len(matrix[i]); j++ {
			ans = mymath.Max(ans, MaxPathProcess1(matrix, i, j, cache))
		}
	}
	return ans
}

func MaxPathProcess1(matrix [][]int, i, j int, cache [][]int) int {
	if i < 0 || i > len(matrix)-1 || j < 0 || j > len(matrix[0]) - 1 {
		// 越界直接返回-1
		return -1
	}
	if cache[i][j] != 0 {
		return cache[i][j]
	}
	var up, left, right, down int
	if i-1 >= 0 && matrix[i-1][j] > matrix[i][j] {
		up = MaxPathProcess(matrix, i-1, j)
	}
	if j-1 >= 0 && matrix[i][j-1] > matrix[i][j] {
		left = MaxPathProcess(matrix, i, j-1)
	}
	if j+1 <= len(matrix[0]) - 1 && matrix[i][j+1] > matrix[i][j] {
		right = MaxPathProcess(matrix, i, j+1)
	}
	if i+1 <= len(matrix) - 1  && matrix[i+1][j] > matrix[i][j] {
		down = MaxPathProcess(matrix, i+1, j)
	}
	cache[i][j] = mymath.Max(mymath.Max(up, left), mymath.Max(right, down)) + 1
	return cache[i][j]
}
```

## 拓展问题：

- 增加缓存后，题目的时间复杂度为多少？
- 是否还需要将题目改写成dp表，采用位置推导？
- 什么时候最好将递归改写成dp表？

> 解答

1. 增加缓存后，题目的时间复杂度为 M*N，首先在两层for循环中，时间复杂度达到 M * N，循环中的缓存递归时间复杂度为常数项，因为每个位置被调用的次数，不随数据量的增大而增大，而是每个位置，只依赖上下左右，被调用的次数是有限的。
2. 该题目，由于位置依赖的关系比较混乱，所以改写到缓存即可，该方式也叫自顶向下的动态规划。
3. 当位置依赖有遍历现象的时候，可以将采用dp表的方式进行优化，优化的方式主要看位置依赖，找关系，将遍历行为优化为常数。

