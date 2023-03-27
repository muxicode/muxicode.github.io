---
title: 2.购买任意次股票
autoGroup-4-4: 阶段4-part-two
---

# 2. 购买任意次股票

## 题目

给定一个数组arr，从左到右表示昨天从早到晚股票的价格作为一个事后诸葛亮，你知道如果随便交易，且每次交易只买卖一股，返回能挣到的最大钱数。

## 思路

   抓住每一次上涨即可。

## 题解

```go
package class02

import "traning/algorithm/utility/mymath"

/*
	给定一个数组arr，从左到右表示昨天从早到晚股票的价格
	作为一个事后诸葛亮，你知道如果随便交易，且每次交易
	只买卖一股，返回能挣到的最大钱数。

	思路：
		抓住每一次上涨即可。
*/
func MaxProfit2(prices []int ) int {
	if len(prices) < 2 {
		return 0
	}
	var ans int
	for i:=1; i<len(prices); i++ {
		if prices[i] > prices[i-1] {
			ans += prices[i] - prices[i-1]
		}
	}
	return ans
}

// 暴力递归的解法。
func MaxProfit3(arr []int) int {
	return BuyMaxProfit(arr, 0, 0)
}

func BuyMaxProfit(arr []int, start, profit int) int {
	if start == len(arr) {
		return profit
	}
	p1 := BuyMaxProfit(arr, start+1, profit)
	p2 := SellMaxProfit(arr, start+1, profit-arr[start])
	return mymath.Max(p1, p2)
}

func SellMaxProfit(arr []int, start, profit int) int {
	if start == len(arr) {
		return profit
	}
	p1 := BuyMaxProfit(arr, start+1, profit+arr[start])
	p2 := SellMaxProfit(arr, start+1, profit)
	return mymath.Max(p1, p2)
}
```

