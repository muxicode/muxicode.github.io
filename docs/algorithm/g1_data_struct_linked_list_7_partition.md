---
title: 链表-7-三分链表
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 三分链表

![](/g1_data_struct_linked_list_7_partition.assets/linked_list_three_part.drawio.png)

将单向链表按某值划分成左边小、中间相等、右边大的形式，可以使用下面 两种方式：

1. 把链表放入数组里， 在数组上做[partition](/algorithm/g1_sort_5_quick_sort)
2. 分成小、中、大三部分，再把各个部分之间串起来

## 算法流程

![](/g1_data_struct_linked_list_7_partition.assets/linked_list_three_part1.drawio.png)

## 代码实现

```go
type ListNode struct {
	Val  int
	Next *ListNode
}

func threePart(head *ListNode, x int) *ListNode {
	if head == nil || head.Next == nil {
		return head
	}
	var lessHead, lessTail *ListNode       // 小于区域
	var equalHead, equalTail *ListNode     // 等于区域
	var biggerHead, biggerTail *ListNode   // 大于区域
	var nextTmp *ListNode                  // 记录每次下一个节点
	cur := head
	for cur != nil {
		nextTmp = cur.Next
		// 将当前节点与后续的节点断开连接
		cur.Next = nil
		// 小于区域
		if cur.Val < x && lessHead == nil && lessTail == nil {
			lessHead, lessTail = cur, cur
		} else if cur.Val < x && lessHead != nil && lessTail != nil {
			lessTail.Next = cur
			lessTail = cur
		}
		// 等于区
		if cur.Val == x && equalHead == nil && equalTail == nil {
			equalHead, equalTail = cur, cur
		} else if cur.Val == x && equalHead != nil && equalTail != nil {
			equalTail.Next = cur
			equalTail = cur
		}
		// 大于区
		if cur.Val > x && biggerHead == nil && biggerTail == nil {
			biggerHead, biggerTail = cur, cur
		} else if cur.Val > x && biggerHead != nil && biggerTail != nil {
			biggerTail.Next = cur
			biggerTail = cur
		}
		// 到下一个节点
		cur = nextTmp
	}

	if lessHead != nil && lessTail != nil {
		lessTail.Next = equalHead
		lessTail = equalTail
	}
	if lessTail != nil {
		lessTail.Next = biggerHead
	}
	if lessHead != nil {
		return lessHead
	} else if equalHead != nil {
		return equalHead
	} else {
		return biggerHead
	}
}
```

## 拓展题目

```go
// 类似力扣题目：86. 分隔链表
// 题目连接：https://leetcode.cn/problems/partition-list/description/
func partition(head *ListNode, x int) *ListNode {
	if head == nil || head.Next == nil {
		return head
	}
	var lessHead, lessTail *ListNode                // 小于区域
	var equalBiggerHead, equalBiggerTail *ListNode  // 大于等于区域
	var nextTmp *ListNode                  // 记录每次下一个节点
	cur := head
	for cur != nil {
		nextTmp = cur.Next
		// 将当前节点与后续的节点断开连接
		cur.Next = nil
		// 小于区域
		if cur.Val < x && lessHead == nil && lessTail == nil {
			lessHead, lessTail = cur, cur
		} else if cur.Val < x && lessHead != nil && lessTail != nil {
			lessTail.Next = cur
			lessTail = cur
		}
		// 等于区
		if cur.Val >= x && equalBiggerHead == nil && equalBiggerTail == nil {
			equalBiggerHead, equalBiggerTail = cur, cur
		} else if cur.Val >= x && equalBiggerHead != nil && equalBiggerTail != nil {
			equalBiggerTail.Next = cur
			equalBiggerTail = cur
		}
		// 到下一个节点
		cur = nextTmp
	}

	if lessHead != nil && lessTail != nil {
		lessTail.Next = equalBiggerHead
	}
	if lessHead != nil {
		return lessHead
	}
	return equalBiggerHead
}
```

