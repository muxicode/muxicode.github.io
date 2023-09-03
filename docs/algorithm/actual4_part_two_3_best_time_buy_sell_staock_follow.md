---
title: dp-3-指定次数购买股票
autoGroup-5: 📒练习集📒
---

# 3. 指定次数购买股票

## 题目

给定一个数组arr，从左到右表示昨天从早到晚股票的价格作为一个事后诸葛亮，你知道如果交易次数不超过k次，且每次交易只买卖一股，返回能挣到的最大钱数。

## 思路

```go
	/* 
	思路：
		1. k的值大于 N/2 的时候，与 N/2 的结果一样。此时等于无限次买卖。
			因为：N 个值，的上坡不可能大于 N/2
		2. k < N/2 的时候，采用动态规划，使用二维表
			dp[i][j] 表示 0-i 的范围内，做j次交易的最大收益
			2.1 第一行，只有当场买，当场买的方式，做零次无数次交易，最大收益都是0
		    2.2 第一列，第一列没有买的机会，最大收益也是0
			2.3 普遍位置dp[i][j] ：
				2.3.1  当前位置不参与买卖 则 dp[i][j] = dp[i-1][j]
				2.3.2  当前位置参与买卖 则默认贪心，只是参与最后一次的交易卖出时机
						max(
							dp[i-1][j-1] + [i] - [i-1],
							dp[i-2][j-1] + [i] - [i-2],
							dp[i-3][j-1] + [i] - [i-3],...
							)
						max(dp[k][j-1]  - prices[k]) + prices[i]

						此时查看规律如：
							dp[3][2]  =  1) 当前位置不参与买卖 dp[2][2]
										 2) 当前位置参与买卖
												dp[2][j-1] - prices[2] + prices[3]
												dp[1][j-1] - prices[1] + prices[3]
												dp[0][j-1] - prices[0] + prices[3]

							dp[4][2]  =  1) 当前位置不参与买卖 dp[3][2]
										 2) 当前位置参与买卖
												dp[3][j-1] - prices[3] + prices[4]
												dp[2][j-1] - prices[2] + prices[4]
												dp[1][j-1] - prices[1] + prices[4]
												dp[0][j-1] - prices[0] + prices[4]

										此时 以下部分，与dp[3][2] 中有重复，此时想办法保留下来，减去后续的遍历
												dp[2][j-1] - prices[2]
												dp[1][j-1] - prices[1]
												dp[0][j-1] - prices[0]

*/
```

## 题解

```go
package class02
import "traning/algorithm/utility/mymath"

func MaxProfit4(k int, prices []int) int {
	if len(prices) < 2 {
		return 0
	}
	// 次数特别大，相当于题目2
	if k > len(prices)/2 {
		return MaxProfit3(prices)
	}
	dp := make([][]int, len(prices))
	// 为了达到利用前者计算过的数据，从上倒下，从左到右填写dp表
	var ans int
	for j:=1; j<len(dp); j++ {
		t := dp[0][j-1] - prices[0]
		for i:=1; i<len(dp); i++ {
			t = mymath.Max(t, dp[i][j-1] - prices[i])
			dp[i][j] =  mymath.Max(dp[i-1][j], t + prices[i])
			ans = mymath.Max(dp[i][j], ans)
			//nestT := mymath.Max(t, dp[i][0] - prices[i])
			//dp[i][j] =  mymath.Max(dp[i-1][j], nestT + prices[i])
			//t = nestT
			/*
				dp[1][1] =  1)   dp[0][1] 最后一次交易不包含自己
							2)   dp[0][0] - prices[0] + prices[1]
							     dp[1][0] - prices[1] + prices[1]
			*/
		}
	}
	return ans
}
```

