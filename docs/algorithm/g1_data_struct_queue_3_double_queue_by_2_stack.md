---
title: 队列-3-两个栈实现队列
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 两个栈实现队列

栈结构如下所示，每次添加元素只能往顶部添加，取元素也只能从顶部先取元素。

![](/g1_data_struct_queue_3_double_queue_by_2_stack.assets/stack.drawio.png)

实现该结构，要求有三种方法：

- `push`           向顶部添加元素
- `pop`             弹出顶部元素
- `IsEmpty`    判断栈是否为空



**现在要求使用两个栈实现队列，应用场景如：**

- **要求使用栈实现宽度优先遍历**

## 代码实现

```go
package queue

func NewQueueBy2Stack() QueueBy2Stack {
	eq, dq := stack.NewStack(), stack.NewStack()
	return QueueBy2Stack{
		enQueueStack: &eq,
		deQueueStack: &dq,
	}
}

type QueueBy2Stack struct {
	enQueueStack *stack.Stack
	deQueueStack *stack.Stack
}

func (q *QueueBy2Stack) EnQueue(value interface{}) {
	q.enQueueStack.Push(value)
	q.EnQueueStack2DeQueueStack()
}

func (q *QueueBy2Stack) DeQueue() interface{} {
	if q.IsEmpty() {
		panic("stack:can't dequeue in a empty QueueBy2Stack!!!")
	}
	q.EnQueueStack2DeQueueStack()
	return q.deQueueStack.Pop()
}

func  (q *QueueBy2Stack) IsEmpty() bool {
	return q.enQueueStack.IsEmpty() && q.deQueueStack.IsEmpty()
}

func (q *QueueBy2Stack) EnQueueStack2DeQueueStack() {
	if q.deQueueStack.IsEmpty() {
		for !q.enQueueStack.IsEmpty() {
			q.deQueueStack.Push(q.enQueueStack.Pop())
		}
	}
}

```

使用示例：

```go
func TestNewQueueBy2Stack(t *testing.T) {
	q := NewQueueBy2Stack()
	q.EnQueue("1")
	q.EnQueue("4")
	q.EnQueue("18")
	q.EnQueue("19")
	q.EnQueue("28")
	for !q.IsEmpty() {
		fmt.Println(q.DeQueue())
	}
}
```