---
title: 链表-6-判断链表的回文结构
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 判断链表的回文结构

![](/g1_data_struct_linked_list_0_palindromic.assets/link_list_palindromic.drawio.png)

给定一个单链表的头节点head， 请判断该链表是否为回文结构。

1. 使用容器方法特别简单（可是使用数组或者栈）
2. 改原链表的方法就需要注意边界了

![](/g1_data_struct_linked_list_0_palindromic.assets/link_list_palindromic1.drawio.png)

## 代码实现

```go
package link_list


/*
	力扣原题：LCR 027. 回文链表
	链接：   https://leetcode.cn/problems/aMhZSa/
*/

type ListNode struct {
	Val  int
	Next *ListNode
}

func isPalindrome(head *ListNode) bool {
	if head == nil {
		return true
	}
	// 找到前中点
	slow, fast :=  head, head
	for fast.Next != nil && fast.Next.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}
	preMid := slow
	// 对中点后续的节点反转链表
	var pre, next *ListNode = nil, preMid
	for next != nil {
		tem := next.Next
		next.Next = pre
		pre = next
		next = tem
	}
	// 校验是否是回文链表
	p1, p2 := head, pre
	ans := true
	for p1 != nil && p2 != nil {
		if p1.Val != p2.Val {
			ans = false
			break
		}
		p1 = p1.Next
		p2 = p2.Next
	}
	// 还原链表
	pre, next = nil, pre
	for next != nil {
		tem := next.Next
		next.Next = pre
		pre = next
		next = tem
	}
	return ans
}
```

## 其他拓展

### 方法论

- 对于写题，不用太在乎空间复杂度，一切为了时间复杂度
- 对于口述，时间复杂度依然放在第一位，但是一定要找到空间最省的方法

### 常用数据结构与技巧

1. 使用容器(哈希表、数组等)
2. 快慢指针

### 快慢指针练习

1. 输入链表头节点，奇数长度返回中点，偶数长度返回上中点
2. 输入链表头节点，奇数长度返回中点，偶数长度返回下中点
3. 输入链表头节点，奇数长度返回中点前一个，偶数长度返回上中点前一个
4. 输入链表头节点，奇数长度返回中点前一个，偶数长度返回下中点前一个
