---
title: 栈-3-两个队列实现栈
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 两个队列实现栈

栈结构如下所示，每次添加元素只能往顶部添加，取元素也只能从顶部先取元素。

![](/g1_data_struct_stack_3_stack_by_2_queue.assets/stack.drawio.png)

实现该结构，要求有三种方法：

- `push`           向顶部添加元素
- `pop`             弹出顶部元素
- `IsEmpty`    判断栈是否为空

要求使用两个队列实现上述的栈结构，使用场景如：用**队列实现深度优先遍历**



## 代码实现

```go
package stack


func NewStackBy2Queue() StackBy2Queue {
	pushq, popq := NewQueue(), NewQueue()
	return StackBy2Queue{
		pushQueue: &pushq,
		popQueue:  &popq,
	}
}

type StackBy2Queue struct {
	pushQueue *Queue
	popQueue  *Queue
}

func (s *StackBy2Queue) Push(value interface{}) {
	s.pushQueue.EnQueue(value)
}

func (s *StackBy2Queue) Pop() interface{} {
	if s.pushQueue.IsEmpty() {
		return "stack: can't pop in a empty stack!!!"
	}
	cur := s.pushQueue.DeQueue()
	for !s.pushQueue.IsEmpty() {
		s.popQueue.EnQueue(cur)
		cur = s.pushQueue.DeQueue()
	}
	s.pushQueue, s.popQueue = s.popQueue, s.pushQueue
	return cur
}

func (s *StackBy2Queue) IsEmpty() bool {
	return s.pushQueue.IsEmpty()
}
```

使用示例：

```go
func TestStackBy2Queue(t *testing.T) {
	s := NewStackBy2Queue()
	s.Push(18)
	s.Push(4)
	s.Push(2)
	s.Push(19)
	s.Push(2)
	for !s.IsEmpty() {
		fmt.Println(s.Pop())
	}
}
```