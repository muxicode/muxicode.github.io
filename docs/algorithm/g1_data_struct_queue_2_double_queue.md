---
title: 队列-2-队列
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 队列

队列结构及示例如下，先进先出，将加入队列的元素放在队列尾部，出队列时在头部的元素优先出队列

![](/g1_data_struct_queue_2_double_queue.assets/queue.drawio.png)

## 代码实现

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