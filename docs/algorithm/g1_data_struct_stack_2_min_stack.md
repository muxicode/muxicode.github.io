---
title: 栈-2-栈的最小值
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 栈的最小值

栈结构如下所示，每次添加元素只能往顶部添加，取元素也只能从顶部先取元素。

![](/g1_data_struct_stack_2_min_stack.assets/stack.drawio.png)

实栈结构，且要求有以下四种方法：

- `push`           向顶部添加元素
- `pop`             弹出顶部元素
- `IsEmpty`    判断栈是否为空
- `GetMin`      获取栈内的最小值（要求时间复杂度O(1)）

## 思路

![](/g1_data_struct_stack_2_min_stack.assets/min_stack.drawio.png)

使用两个栈实现，一个栈存数据，另外一个栈存最小值

- 当栈需要插入数据时，判断插入的值是否小于`minStack`栈顶的值，如果小于，则插入当前值到`dataStack`和`minStack`，否则`dataStack`插入数据，`minStack`则重复插入当前最小值
- 优化：可以不重复插入最小值，弹出元素的时候判断是否是最小值出栈，如果是的话`minStack`才出栈

## 代码实现

```go
package stack


// 之前实现的stack没有peek方法，在之前的stack上封装出peek方法用于查看栈顶部的值
func NewStackWithPeek() *StackWithPeek {
	return &StackWithPeek{
		Stack: NewStack(),
	}
}

type StackWithPeek struct {
	Stack
}

func (s *StackWithPeek)Peek() int {
	if s.IsEmpty() {
		panic("stack: use peek in empty stack!!!")
	}
	value := s.Pop()
	s.Push(value)
	return value.(int)
}


// 最小栈的实现
func NewMinStack() MinStack {
	return MinStack{
		dataStack: NewStackWithPeek(),
		minStack:  NewStackWithPeek(),
	}
}

type MinStack struct {
	dataStack *StackWithPeek
	minStack  *StackWithPeek
}

func (m *MinStack) Push(newNum int) {
	if m.minStack.IsEmpty() {
		m.minStack.Push(newNum)
	} else if newNum <= m.GetMin() {
		m.minStack.Push(newNum)
	}
	m.dataStack.Push(newNum)
}

func (m *MinStack) GetMin() int {
	return m.minStack.Peek()
}

func  (m *MinStack) IsEmpty() bool {
	return m.dataStack.IsEmpty()
}

func (m *MinStack) Pop() int {
	if m.IsEmpty() {
		panic("stack: minstack can't pop!!!")
	}
	popValue := m.dataStack.Pop().(int)
	if popValue == m.GetMin() {
		m.minStack.Pop()
	}
	return popValue
}
```

示例代码：

```go
func TestMinStack(t *testing.T) {
	s := NewMinStack()
	s.Push(18)
	s.Push(4)
	s.Push(2)
	s.Push(19)
	for !s.IsEmpty() {
		fmt.Println(s.GetMin())
		fmt.Println(s.Pop())
	}
}
```