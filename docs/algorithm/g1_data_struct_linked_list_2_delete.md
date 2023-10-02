---
title: 链表-2-删除链表指定数字
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 链表中删除指定数字

删除链表中指定的数字，并返回新头部

![](/g1_data_struct_linked_list_2_delete.assets/delete_targe_num.drawio.png)

假设，上述链表指定删除`4`，则返回：

![](/g1_data_struct_linked_list_2_delete.assets/delete_targe_num_1.drawio.png)

## 实现

```go
type Node struct {
	Value int
	Next *Node
}

func DeleteTargetNum(head *Node, target int) *Node {
	// 来到第一个不需要删除的位置
	for head != nil {
		if head.Value != target {
			break
		}
		head = head.Next
	}
	cur, pre := head, head
	for cur != nil {
		if cur.Value == target {
			pre.Next = cur.Next
		} else {
			pre = cur
		}
		cur = cur.Next
	}
	// 返回第一个不需要删除的位置
	return head
}
```
