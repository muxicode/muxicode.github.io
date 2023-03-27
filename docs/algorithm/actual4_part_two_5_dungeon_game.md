---
title: 5.通关最少血量
autoGroup-4-4: 阶段4-part-two
---

# 5. 通关最少血量



## 题目

给定一个二维数组 map，含义是一张地图，例如，如下矩阵

-2  -3    3
-5  -10  1
0   30    -5

游戏的给则如下：

骑士从左上角出发，每次只能向右或向下走，最后到达右下角见到公主。

地图中每一个位置的值代表起始要遭遇的事情。

如果是负数，说明此处有怪兽，要让起始损失血量。

如果是非负数，代表此处有雪萍，能让起始损失血量。

骑士从左上角到右下角的过程中，走到任何一个位置时，血量都不能少于1

为了保证骑士能见到公主，初始血量至少是多少？根据map，返回至少的初始血量。

## 思路

一般棋盘类型的题目经常是 动态规划类的题目，为什么呢？因为每到一个位置，起始都依赖于上一个位置，对于初始的位置，情况我们很容易分析出来，这些情况可以作为我们的 base case。

有了初步的想法后，我们可以设计递归函数，进行对可能性的分析，然后使用递归函数解决要求的问题。

通过递归函数，分析是否可以优化成动态规划，或者有必要优化成动态规划，还是知识需要做一些剪枝。

> 方案一：
>
> 1. 设计 fn(matrxi, i, j,) int ,函数的意思代表，从 （0，0）走到 （i， j）的位置上返回需要满足的最少血量
> 2. 对任意一个位置，对分析可能性进行分析。
> 3. 由于每个位置只能向右或者向左走，于是答案的来源可以由（i-1，j）或者 (i, j-1)
> 4. 当前位置等于两处位置取最小值后，与当前位置相加，如果小于0，则需要加上当前值的绝对值
>
> 发现方案一，如果不记录，（i-1，j）或者 (i, j-1) 位置的血量，则无法得出最优解

> 方案二：
>
> 1. 设计 fn(matrxi, i, j,) int 函数的意思代表，从 （i，j）走到右下角的位置上返回需要满足的最少血量
> 2. 经可能性分析，对任意一个位置，答案的来源可以由（i+1，j）或者 (i, j+1)
>    1.  （i+1，j）或者 (i, j+1) 取最小 ，并用该值减去当前位置的血量，如果小于1，取1

## 代码

```go
package class02

import (
	"math"
	"traning/algorithm/utility/mymath"
)

func needMin(matrix [][]int) int {
	return mymath.Max(1, needMinProcess(matrix, 0, 0))
}

func needMinProcess(matrix [][]int, i, j int) int {
	// 到了最后一个位置，需要返回当前位置需要的最少血量
	if i == len(matrix)-1 && j == len(matrix[0]) - 1  {
		if matrix[i][j] > 0 {
			return 1
		} else {
			return -matrix[i][j] + 1
		}
	}

	p1, p2 := math.MaxInt,  math.MaxInt
	if i+1 < len(matrix) {
		p1 = needMinProcess(matrix, i+1, j)
	}
	if j+1 < len(matrix[0]) {
		p2 = needMinProcess(matrix, i, j+1)
	}
	return mymath.Max(1, mymath.Min(p1, p2) - matrix[i][j])
}

func needMinDp(matrix [][]int) int {
	row := len(matrix)-1
	col := len(matrix[0])-1
	// 初始化 dp 表
	dp := make([][]int, row+1)
	for i:=0; i<len(dp); i++ {
		dp[i] = make([]int, col+1)
	}

	// 根据递归终止条件，填写 base case
	if matrix[row][col] > 0 {
		dp[row][col] = 1
	} else {
		dp[row][col] = -matrix[row][col] + 1
	}
	// 填写最右边那列
	for r:=row-1; r>=0; r-- {
		dp[r][col] = mymath.Max(1, dp[r+1][col]-matrix[r][col])
	}
	// 填写最底下的行
	for c:=col-1; c>=0; c-- {
		dp[row][c] = mymath.Max(1, dp[row][c+1]-matrix[row][c])
	}
	// 每个位置依赖右边和下边
	// 所以填dp表的顺序，从右往左，从下到上
	for r:=row-1; r>=0; r-- {
		for c:=col-1; c>=0; c-- {
			dp[r][c] = mymath.Max(1, mymath.Min(dp[r+1][c], dp[r][c+1]) - matrix[r][c])
		}
	}

	return dp[0][0]
}
```

