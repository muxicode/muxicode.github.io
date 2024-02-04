---
title: 链表-10-链表删除节点
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 链表删除节点

![](/g1_data_struct_linked_list_10_delete_node.assets/g1_data_struct_linked_list_10_delete_node1.drawio.png)

存在一个链表，填表的结构为：

```go
type ListNode struct {
	Val  int
	Next *ListNode
}
```

需要删除链表中的某个节点，提供头节点与需要删除的节点。

## 函数返回值

```go
func deleteNode(head, deleteNode *ListNode)  {
   // do delete ...
}
```

- 删除函数接收链表头节点与删除节点，那么这个函数需要有返回值吗？为什么？
  - 需要，因为如果删除了头节点，那么需要将新的头节点返回



## 不提供头节点删除

不提供头节点可以删除链表中的某个值吗？

- 可以采用值拷贝的方式删除

  ![](/g1_data_struct_linked_list_10_delete_node.assets/g1_data_struct_linked_list_10_delete_node2.drawio.png)

- 无法删除最后一个节点，因为删除最后一个节点需要将上一个节点的引用指向空

  ![](/g1_data_struct_linked_list_10_delete_node.assets/g1_data_struct_linked_list_10_delete_node3.drawio.png)

- 一些工程场景无法使用值拷贝，如一个节点的值与服务器相绑定，且服务器与被其他服务依赖

  ![](/g1_data_struct_linked_list_10_delete_node.assets/g1_data_struct_linked_list_10_delete_node4.drawio.png)

> 值拷贝代码删除节点示例

```go
import (
	"fmt"
	"testing"
)

func TestDeleteNode(t *testing.T) {
	// 初始化一个链表
	head := &ListNode{Val: 5}
	head.Next = &ListNode{Val: 20}
	head.Next.Next = &ListNode{Val: 1}
	head.Next.Next.Next = &ListNode{Val: 20}
	head.Next.Next.Next.Next = &ListNode{Val: 5}


	oneNode := head.Next.Next  // 仅删除1节点
	cur, next := oneNode, oneNode.Next
	for next.Next != nil {
		cur.Val = next.Val     // 拷贝next值到删除节点
		cur = cur.Next
		next = next.Next
	}
	cur.Val = next.Val
	cur.Next = nil             // 最后节点需要设置为nil

	for head != nil {
		fmt.Println(head.Val)
		head = head.Next
	}
	// 采用值拷贝的方式成功删除
	//=== RUN   TestDeleteNode
	//5
	//20
	//20
	//5
	//--- PASS: TestDeleteNode (0.00s)
}
```

