---
title: 4.子串不同子序列
autoGroup-2: 股票三连
---

# 4. 子串不同子序列

## 题目

给定两个字符串S和T，返回S子序列等于T的不同子序列个数有多少个？如果得到的子序列A删除的位置与得到的序列B删除的位置不同，那么就认为A和B就是不同的

## 例子

```go
/*
S = “rabbbit” ， T = “rabbit”
返回 3

是以下三个S的不同子序列，没有1的位置表示删除的位置，因为删除的位置不同，所以三个子序列是不一样的
1.
    rabbbit
    111  11
2. 
    rabbbit
    11 1 11
3.
    rabbbit
    11  111
*/
```

## 题解

设计递归从头部定义递归含义，最后优化为动态规划

```go
package class02

// 从头部开始设计递归
func numDistinct1(s, t string) int {
	return process(s, t, 0, 0)
}

/*
	递归的含义：
	当s的字符为 sIndex 到 s 的结尾， 与t字符串为 tIndex 到 t 字符串结尾时，返回
	s 字符串删除字符称为 t 字符串的方法数
*/
func process(s, t string, sIndex, tIndex int) int {
	// 当子字符串已经到达尾部，则表示找到一种方式
	if tIndex == len(t) {
		return 1
	}
	// 当s字符串都已经用完，但是还没有匹配出子序列时，返回0
	if sIndex == len(s) {
		return 0
	}
	var ans int
	// 当前位置的方法数有两种可能性
	if s[sIndex] == t[tIndex] {
		// 仅在匹配位置相等时，才有可能使用当前位置去匹配
		// 1. 使用s字符当前位置匹配 t 字符串
		ans += process(s, t, sIndex+1, tIndex+1)
	}
	// 2. 不使用当前字符串匹配
	ans += process(s, t, sIndex+1, tIndex)
	return ans
}

func numDistinct1Dp(s, t string) int {
	// 初始化二维表
	dp := make([][]int, len(s)+1)
	for i:=0; i<len(dp); i++ {
		dp[i] = make([]int, len(t)+1)
	}

	// 初始化结束条件
	for  i:=0; i<len(dp); i++ {
		dp[i][len(t)] = 1
	}

	// 填写表格，通过公式可以发现每个位置依赖 右边的位置和下面的位置
	// 所以选择 从右到左，从下到上填写表格
	for col:=len(t)-1; col>=0; col-- {
		for row:=len(s)-1; row>=0; row-- {
			if s[row] == t[col] {
				dp[row][col] += dp[row+1][col+1]
			}
			dp[row][col] += dp[row+1][col]
		}
	}
	return dp[0][0]
}
```

