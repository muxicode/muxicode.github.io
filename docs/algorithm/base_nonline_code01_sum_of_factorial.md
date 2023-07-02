---
title: 1.阶乘累加
autoGroup-1-2: 基础习题
---

# 1. 阶乘累加

## 题目

给定一个参数 N, 返回： 1! + 2! + 3! + ... + N! 的结果。

## 题解

> 同学 A(N)
>
> 1. 计算 1！= 1
> 2. 计算 2！= 1*2
> 3. 计算 3！= 1*2 *3
> 4. ...
>
> 算出所有的阶乘，进行累加，不加任何优化。

> 同学 B(N)
>
> 1. 计算 1！= 1
> 2. 计算 2！= 1!*2
> 3. 计算 3！= 2! *3
> 4. ...
>
> 每次阶乘借用上一次的结果，每次阶乘只乘一遍

## 代码

```go
// 同学A
func f1(N int) int {
	ans := 0
	for i:=1; i<=N; i++ {
		ans += factorial(i)
	}
	return ans
}

func factorial(num int) int {
	ans := 1
	for i:=1; i<=num; i++ {
		ans *= i
	}
	return ans
}

// 同学B
func f2(N int) int {
	cur := 1
	ans := 0
	for i:=1; i<=N; i++ {
		cur = cur*i
		ans += cur
	}
	return ans
}
```

