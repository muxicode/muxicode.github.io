---
title: 链表-8-拷贝含有随机指针的链表
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 拷贝含有随机指针的链表

请实现 `copyRandomList` 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 `next` 指针指向下一个节点，还有一个 `random` 指针指向链表中的任意节点或者 `null`。

![](/g1_data_struct_linked_list_8_copy_random_list.assets/linked_list_copy_random_list.drawio.png)

1. 使用map容器方法特别简单，映射新老节点并拷贝指针。

2. 改原链表的方法拷贝

## 算法流程

### 容器法

1. 先遍历原始链表，将原始链表的节点添加到map的key中，并创建对应的新节点
2. 再次遍历原始链表的节点，分别执行步骤二的表达式，拷贝老节点的引用到新节点上

![](/g1_data_struct_linked_list_8_copy_random_list.assets/linked_list_copy_random_list1.drawio.png)

### 修改原链表法

1. 在原链表中老节点后新建拷贝节点，并放在新节点后面
2. 新节点拷贝老节点的random指针
3. 拆开新老节点得到拷贝的链表

![](/g1_data_struct_linked_list_8_copy_random_list.assets/linked_list_copy_random_list2.drawio.png)

## 代码实现

> 修改链表的解法

```go
func copyRandomList(head *Node) *Node {
	if head == nil {
		return nil
	}
	cur := head
	var nextTmp *Node
	// 插入新节点
	for cur != nil {
		nextTmp = cur.Next
		cur.Next = &Node{Val: cur.Val}
		cur.Next.Next = nextTmp
		cur = nextTmp
	}
	// 拷贝random指针
	cur = head
	var curCopy *Node
	for cur != nil {
		nextTmp = cur.Next.Next
		curCopy = cur.Next
		if cur.Random != nil {
			curCopy.Random = cur.Random.Next
		}
		cur = nextTmp
	}
	// 拆分链表
	copyHead := head.Next
	cur = head
	for cur != nil {
		nextTmp = cur.Next.Next
		curCopy = cur.Next
		cur.Next = curCopy.Next
		if nextTmp != nil {
			curCopy.Next = nextTmp.Next
		}
		cur = nextTmp
	}
	return copyHead
}
```
