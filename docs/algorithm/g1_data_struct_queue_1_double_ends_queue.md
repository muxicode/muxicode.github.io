---
title: 队列-1-双端队列
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 双端队列

实现一个双端队列，结构如下所示：

![](/g1_data_struct_queue_double_ends_queue.assets/double_ends_queue.drawio.png)

该双端队列有如下五个方法

- `AddFromHead`               从头部添加元素
- `AddFromBottom`           从尾部添加元素
- `PopFromHead`               从头部弹出元素
- `PopFromBottom`           从尾部弹出元素
- `IsEmpty`                        队列是否为空

## 代码实现

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