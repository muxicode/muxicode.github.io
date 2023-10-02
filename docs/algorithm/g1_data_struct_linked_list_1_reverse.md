---
title: 链表-1-反转链表
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 反转链表

反转链表并返回新头部，如下链表：

![](/g1_data_struct_linked_list_reverse.assets/delete_targe_num.drawio.png)

反转后：

![](/g1_data_struct_linked_list_reverse.assets/reverse_linked_list.drawio.png)

## 实现

> 单向链表

```go
type Node struct {
	Value int
	Next *Node
}

func ReverseLinkedList(head *Node) *Node {
	var pre *Node
	var next *Node
	for head != nil {
		next = head.Next
		head.Next = pre
		pre = head
		head = next
	}
	return pre
}
```

> 双向链表

![](/g1_data_struct_linked_list_reverse.assets/reverse_double_link_list.drawio.png)

上图展示了反转前与反转后的结构体，方便带入码实现

```go
type DoubleNode struct {
	Value int
	Next *DoubleNode
	Last *DoubleNode
}

func ReverseDoubleLinkedList(head *DoubleNode) *DoubleNode {
	var pre *DoubleNode
	var next *DoubleNode
	for head != nil {
		next = head.Next
		head.Next = pre
		head.Last = next
		pre = head
		head = next
	}
	return pre
}
```