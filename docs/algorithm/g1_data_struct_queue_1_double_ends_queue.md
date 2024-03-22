---
title: 队列-1-双端队列
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 双端队列

在编程世界中，数据结构扮演着至关重要的角色，就像《金字塔原理》中的基石一样。今天，我们要深入探讨的是一种特殊的数据结构——双端队列。🔍

## 🧠 什么是双端队列？

双端队列，顾名思义，是一种允许从两端添加和移除元素的数据结构。它具有队列（先进先出）和栈（后进先出）的特性，使得它成为一种极具灵活性的数据结构。🤹‍♂️

## 📈 双端队列有哪些使用场景？

1. **调度系统优化**：在调度任务时，双端队列可以让我们灵活地在任务队列的两端添加或移除任务，以便根据不同的优先级或条件进行调度。

2. **缓存管理**：双端队列可用于实现缓存，允许我们在缓存中轻松添加新数据或淘汰旧数据。例如，最近访问的数据可能位于队列的一端，而最不常访问的数据则位于另一端。

3. **窗口滑动**：在窗口滑动算法中，双端队列可以帮助我们高效地找到滑动窗口中的最大或最小元素，因为我们可以从队列的一端添加新元素，同时从另一端移除超出窗口范围的旧元素。

过渡：如你所见，双端队列在各种场景下都展现出了强大的灵活性和实用性。无论是作为调度系统的一部分，还是用于数据缓存和窗口滑动算法，它都能发挥重要作用。

## 🌐 实现

双端队列，这个看似简单的数据结构，却蕴含着无穷的可能性。它的灵活性和实用性使得它成为了众多领域中不可或缺的一部分。希望通过本文的探索，你对双端队列有了更深入的了解，并能在实际应用中充分发挥它的作用。让我们一起探索编程世界的奥秘吧！💻🚀

实现一个双端队列，结构如下所示：

![](/g1_data_struct_queue_double_ends_queue.assets/double_ends_queue.drawio.png)

该双端队列有如下五个方法

- `AddFromHead`               从头部添加元素
- `AddFromBottom`           从尾部添加元素
- `PopFromHead`               从头部弹出元素
- `PopFromBottom`           从尾部弹出元素
- `IsEmpty`                        队列是否为空

代码：

```go
package queue

type Node struct {
	value interface{}
	last  *Node
	next  *Node
}

func NewNode(value interface{}) *Node {
	return &Node{
		value: value,
	}
}

type DoubuleQueue struct {
	head *Node
	tail *Node
}

func(d *DoubuleQueue) AddFromHead(value interface{}) {
	cur := NewNode(value)
	if d.head == nil && d.tail == nil{
		d.head = cur
		d.tail = cur
	} else {
		// 先整理关系
		cur.next = d.head
		d.head.last = cur
		// 重新赋值头节点
		d.head = cur
	}
}


func (d *DoubuleQueue) AddFromBottom(value interface{}) {
	cur := NewNode(value)
	if d.head == nil {
		d.head = cur
		d.tail = cur
		return
	} else {
		// 先整理关系
		cur.last = d.tail
		d.tail.next = cur
		// 重新赋值头节点
		d.tail = cur
	}
}

func(d *DoubuleQueue) PopFromHead() interface{} {
	if d.head == nil {
		return nil
	}
	cur := d.head
	if d.head == d.tail {
		d.head, d.tail = nil, nil
	} else {
		// 头结点向后移动
		d.head = d.head.next
		// 断开连接关系
		cur.next = nil
		d.head.last = nil
	}
	return cur.value
}

func (d *DoubuleQueue) PopFromBottom() interface{} {
	if d.tail == nil {
		return nil
	}
	cur := d.tail
	if d.head == d.tail {
		d.head = nil
		d.tail = nil
	} else {
		// 尾结点向前移动
		d.tail = d.tail.last
		// 清除节点多余关系
		d.tail.next = nil
		cur.last = nil
	}
	return cur.value
}

func (d *DoubuleQueue) IsEmpty() bool {
	return d.head == nil
}
```