---
title: 二叉树-2-二叉树迭代遍历
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 二叉树迭代遍历



## 先序遍历

算法图解流程如下：

![](/g1_data_struct_binary_tree_2_iterative_traversal.assets/g1_data_struct_binary_tree_2_iterative_traversal1.drawio.png)

> 代码实现

```go
package binary_tree

import (
	"container/list"
	"fmt"
)

func PreTravelIterative(root *TreeNode) {
	if root == nil { // 没有直接返回
		return
	}
	stack := list.New()    // 初始化一个栈
	stack.PushBack(root)   // 将根节点放入栈中
	for stack.Len() != 0 { // 循环遍历节点，直到栈为空
		node := stack.Remove(stack.Back()).(*TreeNode) // 取出栈中的节点，直接打印
		fmt.Printf("%s ", node.Value)
		if node.Right != nil {  // 节点的右节点不为空，则将右节点加入栈中（由于栈是先进后出，所以先入右节点）
			stack.PushBack(node.Right)
		}
		if node.Left != nil {   // 节点的左节点不为空，则将左节点加入栈中
			stack.PushBack(node.Left)
		}
	}
}
```

测试

```go
package binary_tree

import "testing"

func TestPreTravelIterative(t *testing.T) {
	root := &TreeNode{Value:"a"}
	root.Left = &TreeNode{Value:"b"}
	root.Right = &TreeNode{Value:"c"}
	root.Left.Left= &TreeNode{Value:"e"}
	root.Left.Right= &TreeNode{Value:"f"}
	root.Right.Left= &TreeNode{Value:"g"}
	root.Right.Right= &TreeNode{Value:"h"}
	PreTravelIterative(root)
}
```



## 后序遍历

算法图解流程如下：

![](/g1_data_struct_binary_tree_2_iterative_traversal.assets/g1_data_struct_binary_tree_2_iterative_traversal2.drawio.png)

> 代码实现

```go

func PostTravelIterative(root *TreeNode) {
	if root == nil { // 没有直接返回
		return
	}
	stack := list.New()    // 初始化一个栈
	stack.PushBack(root)   // 将根节点放入栈中
	postStack := list.New()
	for stack.Len() != 0 { // 循环遍历节点，直到栈为空
		node := stack.Remove(stack.Back()).(*TreeNode) // 取出栈中的节点，直接打印
		postStack.PushBack(node)  // 后序时，头节点最后打印
		if node.Left != nil {     // 节点的左节点不为空，则将左节点加入栈中，后出左进入后序的栈中，最后为先左
			stack.PushBack(node.Left)
		}
		if node.Right != nil {    // 节点的右节点不为空，则将右节点加入栈中，先出右进入后序的栈中，最后为后右
			stack.PushBack(node.Right)
		}
	}
	for postStack.Len() != 0 { // 从后序的栈中向外打印
		node := postStack.Remove(postStack.Back()).(*TreeNode) // 取出栈中的节点，直接打印
		fmt.Printf("%s ", node.Value)
	}
}
```

测试

```go
func TestPostTravelIterative(t *testing.T) {
	root := &TreeNode{Value:"a"}
	root.Left = &TreeNode{Value:"b"}
	root.Right = &TreeNode{Value:"c"}
	root.Left.Left= &TreeNode{Value:"e"}
	root.Left.Right= &TreeNode{Value:"f"}
	root.Right.Left= &TreeNode{Value:"g"}
	root.Right.Right= &TreeNode{Value:"h"}
	PostTravelIterative(root)
}
```

## 中序遍历

算法图解流程如下：

![](/g1_data_struct_binary_tree_2_iterative_traversal.assets/g1_data_struct_binary_tree_2_iterative_traversal3.drawio.png)

> 代码实现

```go
func InTravelIterative(root *TreeNode) {
	if root == nil { // 没有直接返回
		return
	}
	cur := root
	stack := list.New()
	for stack.Len() != 0  || cur != nil { // 只要栈不为空，或者当前节点不为nil则一直循环
		if cur != nil {   // 当前节点不为空时，将当前点放入栈中，且节点左移
			stack.PushBack(cur)
			cur = cur.Left
		} else {          // 当前节点为空时，则此时栈中最后一个元素时最左侧节点，弹出打印，并让节点向右
			cur = stack.Remove(stack.Back()).(*TreeNode)
			fmt.Printf("%s ", cur.Value)
			cur = cur.Right
		}
	}
}
```

测试

```go
func TestInTravelIterative(t *testing.T) {
	root := &TreeNode{Value:"a"}
	root.Left = &TreeNode{Value:"b"}
	root.Right = &TreeNode{Value:"c"}
	root.Left.Left= &TreeNode{Value:"e"}
	root.Left.Right= &TreeNode{Value:"f"}
	root.Right.Left= &TreeNode{Value:"g"}
	root.Right.Right= &TreeNode{Value:"h"}
	InTravelIterative(root)
}
```

