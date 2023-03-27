---
title: 3.矩阵累加和小于等于k
autoGroup-4-4: 阶段4-part-one
---

# 矩阵累加和小于等于k



## 题目

给定一个二维数组matrix，再给定一个k值

返回累加和小于等于k，但是离k最近的子矩阵累加和

## 算法流程

```
当矩阵只有一行的时候：	[4, 5,7,6,8]   直接调用 code2 的方法得出答案k
当矩阵有两行行的时候：	[2,-6,3,4,7]   能否将问题与一行的时候合并？
					将第一行与第二行相加得到新行：[6,-1,10,10,15]
					此时套用code2的方法将得到，再两行的矩阵里累加和小于等于k，但是离k最近的子矩阵累加和

将该思路运用到整个矩阵，分别试:
			0-0，0-1，...， 0-N
			     1-1，...， 1-N
					  ...
最后可以得到答案
```

## 题解

```go
func MaxSumSubMatrix(matrix [][]int ,k int ) int {
	if len(matrix) < 1 {
		return 0
	}

	sumCol := make([]int, len(matrix[0]))
	var ans int
	for i:=0; i<len(matrix); i++ {
		sumCol = make([]int, len(matrix[0]))
		for j:=i; j<len(matrix);j++ {
			// 累加矩阵的上下界限
			for n:=0; n<len(matrix[0]); n++ {
				sumCol[n] += matrix[j][n]
			}
			ans = mymath.Max(GetMaxLessOrEqualK(sumCol, k), ans)
		}
	}
	return ans
}
```

