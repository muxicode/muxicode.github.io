---
title: 栈-1-栈
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 栈

栈结构如下所示，每次添加元素只能往顶部添加，取元素也只能从顶部先取元素。

![](/g1_data_struct_stack_1_stack.assets/stack.drawio.png)

实现该结构，要求有三种方法：

- `push`           向顶部添加元素
- `pop`             弹出顶部元素
- `IsEmpty`    判断栈是否为空

## 代码实现

> [双端队列]()实现栈

```go
package stack

func NewStack() Stack {
	return Stack{
		doubleQueue: &queue.DoubuleQueue{},
	}
}

type Stack struct {
	doubleQueue *queue.DoubuleQueue
}

func (s *Stack) Push(value interface{}) {
	s.doubleQueue.AddFromHead(value)
}

func (s *Stack) Pop() interface{} {
	return s.doubleQueue.PopFromHead()
}

func (s *Stack) IsEmpty() bool {
	return s.doubleQueue.IsEmpty()
}
```

使用示例：

```go
package stack

import (
	"fmt"
	"testing"
)

func TestStack(t *testing.T) {
	s := NewStack()
	s.Push("1")
	s.Push("4")
	s.Push("18")
	s.Push("19")
	for !s.IsEmpty() {
		fmt.Println(s.Pop())
	}
}
```