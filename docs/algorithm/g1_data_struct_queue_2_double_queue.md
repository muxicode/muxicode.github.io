---
title: 队列-2-队列
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 队列

队列结构及示例如下，先进先出，将加入队列的元素放在队列尾部，出队列时在头部的元素优先出队列

## 📚 什么是队列？

首先，让我们来揭开队列的神秘面纱。队列，就像它的名字一样，是一种数据结构，它遵循先进先出（FIFO）的原则。想象一下，你去面包店买面包，先到的人先得到服务，后来的人则需要排队等待。这就是队列的工作方式，最先进入队列的数据元素将是第一个被处理的。🍞

## 🤖 队列的使用场景

接下来，我们来看看队列在现实生活中的应用场景。🌟

**1. 打印任务排队**
 你有没有注意到，当你在学校的打印中心或者办公室的打印机旁边，打印任务是如何排队的？这就是队列的一个典型应用。第一个发送到打印机的任务会先被打印，然后是下一个，依此类推。🖨️

**2. 操作系统的进程调度**
 在计算机操作系统中，进程调度也是队列的一个使用场景。操作系统会根据进程的优先级和到达时间，将它们排成一个队列，然后依次分配CPU时间。💻

**3. 客户服务系统**
 无论是电话客服还是在线客服，队列都发挥着重要作用。客户的问题和请求会按照到达的顺序被处理，确保每个客户都能得到及时的服务。📞

**4. 银行排队系统**
 在银行，你会发现人们在柜台前排队等待服务。这个排队系统就是基于队列的原理，确保每个顾客都能按顺序被服务。🏦

**5. 交通管理**
 在交通信号灯的控制中，队列也扮演着重要角色。车辆会按照到达的顺序排队等待通过路口，这样可以有效地管理交通流量，减少拥堵。🚗

队列不仅仅是一个理论上的概念，它在我们的日常生活中无处不在，从简单的排队购物到复杂的计算机系统，队列都发挥着不可或缺的作用。了解队列的原理和应用，可以帮助我们更好地理解和设计高效的系统。🌐

## 🌐实现

![](/g1_data_struct_queue_2_double_queue.assets/queue.drawio.png)

### 双端队列实现队列

```go
package queue


func NewQueue() Queue {
	return Queue{
		doubuleQueue: &DoubuleQueue{},
	}
}

type Queue struct {
	doubuleQueue *DoubuleQueue
}

func (q *Queue) EnQueue(value interface{})  {
	q.doubuleQueue.AddFromHead(value)
}

func (q *Queue) DeQueue() interface{} {
	return q.doubuleQueue.PopFromBottom()
}

func (q *Queue) IsEmpty() bool {
	return q.doubuleQueue.IsEmpty()
}
```

使用示例：

```go
package queue

import (
	"fmt"
	"testing"
)


func TestQueue(t *testing.T) {
	s := NewQueue()
	s.EnQueue("1")
	s.EnQueue("4")
	s.EnQueue("18")
	s.EnQueue("19")
	for !s.IsEmpty() {
		fmt.Println(s.DeQueue())
	}
}
```

### 使用数组实现队列

```go
package queue


func NewQueueByArr(cap int) QueueByArr {
	return QueueByArr{
		cap: cap,
		values: make([]interface{}, cap),
	}
}

type QueueByArr struct {
	values []interface{}
	cap  int
	size int
	head int
	tail int
}


func (q *QueueByArr) EnQueue(value interface{})  {
	if q.IsFull() {
		panic("queue: queue is full !!!")
	}
	// 插入队尾，并且移动尾部
	q.values[q.tail] = value
	q.tail  = q.GetNextIndex(q.tail)
	q.size++
}

func (q *QueueByArr) GetNextIndex(index int) int {
	next := index+1
	if next < q.cap {
		return next
	}
	return 0
}

func (q *QueueByArr) IsFull() bool {
	return q.size == q.cap
}

func (q *QueueByArr) IsEmpty() bool {
	return q.size == 0
}

func (q *QueueByArr) DeQueue() interface{} {
	if q.IsEmpty() {
		panic("queue: queue is empty !!!")
	}
	cur := q.values[q.head]
	q.head = q.GetNextIndex(q.head)
	q.size--
	return cur
}
```

使用示例：

```go
package queue

import (
	"fmt"
	"testing"
)


func TestNewQueueByArr(t *testing.T) {
	s := NewQueueByArr(10)
	s.EnQueue("1")
	s.EnQueue("4")
	s.EnQueue("18")
	s.EnQueue("19")
	for !s.IsEmpty() {
		fmt.Println(s.DeQueue())
	}
}
```