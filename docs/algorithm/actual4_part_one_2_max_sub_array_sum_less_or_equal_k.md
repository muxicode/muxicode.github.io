---
title: 2.累加和小于等于k
autoGroup-4-4: 阶段4-part-one
---

# 累加和小于等于k

## 题目

  给定一个数组arr，再给定一个k值，返回累加和小于等于k，但是离 k 最近的子数组的累加和。

## 思路：

​	对于 arr:  [.... i ....]，每一个 i 位置，遍历每一个 以 i 结尾，的子数组的累加和是否小于等于k，如果小于则与当前收集的答案进行比较，如果大于则记录当前值为答案。

> 加速：	

采用有序表，记录每一个前缀和，将前缀和添加到有序表中，如果 有序表中存在大于等于k的前缀和，则以当前位置为结尾的子数组中，存在小于等于k的子数组和，将该值记录下来。

> 注意：依赖 github.com/emirpasic/gods 这个库，该库包含多种数据结构
> 由于 golang 并没有内置的有序表，所以使用第三放写好的数据结

```go
import (
	rbt "github.com/emirpasic/gods/trees/redblacktree"
	"traning/algorithm/utility/mymath"
)

/*
	给定一个数组arr，再给定一个k值，返回累加和小于等于k，但是离
	k 最近的子数组累加和。

	思路：
		[.... i ....]
		遍历每一个 i 位置，遍历每一个 以 i 结尾，的子数组的累加和
		是否小于等于k，如果小于则收集起来，与答案进行pk

		加速：
			采用有序表，记录每一个前缀和，将前缀和添加到有序表中，
			如果 有序表中存在大于等于k的前缀和，则以当前位置为结尾
			的子数组中，存在小于等于k的子数组和，将该值记录下来。

	注意：依赖 github.com/emirpasic/gods 这个库，该库包含多种数据结构
         由于 golang 并没有内置的有序表，所以使用第三放写好的数据结构
*/
func GetMaxLessOrEqualK(arr []int, k int) int {
	// 记录i之前那的前缀和按照有序表组织
	tree := rbt.NewWithIntComparator()
	// 表示没有元素的情况下，前缀和为0
	tree.Put(0, 0)

	/*	sum [0 ... i] 位置的累加和
		如果：当前总和为 100 ，K为 20
		[0 ................   i ] sum
		[0 ................   i ]
		[ (>=sum-k) x (<=K)   i ]
	*/
	var sum, ans int
	// 每一步的i，都求子数组必须以i结尾的情况下，求个子数组的累加和，是<=K的，并且是最大的
	for i:=0; i<len(arr); i++ {
		sum += arr[i]
		if n, ok := tree.Ceiling(sum-k); ok {
			ans = mymath.Max(ans, sum - n.Key.(int))
		}
		tree.Put(sum, sum)
	}
	return ans
}
```

