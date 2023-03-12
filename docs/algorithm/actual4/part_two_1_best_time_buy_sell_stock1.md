---
title: 1.购买一次股票
autoGroup-2: 股票三连
---

# 1.购买一次股票

## 题目

给定一个数组 arr, 从左到右表示昨天从早到晚股票的价格，作为一个事后诸葛亮，你想知道，如果只做一次交易，且每次交易只买卖一股，返回能挣到的最大钱数。

## 思路

   1. 遍历arr
   1. min 记录 到i之前的最小值
   2. ans 记录 i-min 记录结果
   3. 返回ans

## 题解

```go
package class02

import "traning/algorithm/utility/mymath"

/*
	给定一个数组 arr, 从左到右表示昨天从早到晚股票的价格，
	作为一个事后诸葛亮，你想知道，如果只做一次交易，且每次
	交易只买卖一股，返回能挣到的最大钱数。

	流程：
		1. 遍历arr
		1. min 记录 到i之前的最小值
		2. ans 记录 i-min 记录结果
		3. 返回ans
*/
func MaxProfit1(prices []int ) int {
	if len(prices) < 2 {
		return 0
	}
	var ans, min int
	for i:=0; i<len(prices); i++ {
		min = mymath.Min(min, prices[i])
		ans = mymath.Max(ans, prices[i]-min)
	}
	return ans
}

```

