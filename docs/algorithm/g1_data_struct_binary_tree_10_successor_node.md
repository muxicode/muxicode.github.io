---
title: 二叉树-8-后继节点
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 🌟二叉树的后继节点🌟

二叉树的后继节点指的是在中序遍历中，某个节点的后一个节点。在二叉树中，每个节点都有一个指向其父节点的指针。后继节点可以帮助我们在二叉搜索树中找到一个节点的下一个节点。

## 📈例子

考虑下面这棵二叉树：

```
        5
       / /
      3   8
     / / / /
    2  4 6  9
```

对于节点 3，它的后继节点是 4；节点 4 的后继节点是 5；节点 5 的后继节点是 6。

## 💼题目

给定一个二叉树的节点（包含父节点指针），请找出该节点的后继节点。

## 🌟应用

1. **文件系统**

   在文件系统的实现中，文件和目录可以被组织成树形结构。当我们需要在文件系统中查找某个文件的下一个文件时，后继节点的概念就非常有用。

2. **线程调度**

   在操作系统中，线程可以被组织成线程树。寻找线程的后继节点可以帮助操作系统进行线程调度，从而优化系统的性能。

3. **数据库索引**

   在数据库中，索引可以被组织成树形结构。当我们需要查找某个键的下一个键时，后继节点的概念可以帮助我们快速地进行数据库检索。

## 📝 算法图解

1. 如果该节点有右子节点，则后继节点是右子树中的最左节点。
2. 如果该节点没有右子节点，但它是其父节点的左子节点，则后继节点是其父节点。
3. 如果该节点既没有右子节点，且是其父节点的右子节点，则需要沿着父节点向上遍历，直到找到一个节点是其父节点的左子节点为止。那个父节点就是后继节点。

![](/g1_data_struct_binary_tree_10_successor_node.assets/binary_tree_sucessor_node.drawio.png)

## 🚀 Go语言实现

代码：

```go
package binary_tree

type TreeNodeWithParent struct {
	Val    int
	Left   *TreeNodeWithParent
	Right  *TreeNodeWithParent
	Parent *TreeNodeWithParent
}

func FindSuccessorNode(node *TreeNodeWithParent) *TreeNodeWithParent {
	if node == nil {
		return nil
	}
	if node.Right != nil { // 如果存在右子树，则右孩子最左节点为后继节点
		return findMostLeftNode(node.Right)
	}
	// 没有右孩子，此时需要向上找父亲节点，直到一个节点时期父亲的左节点为止
	cur := node
	parent := cur.Parent
	for parent != nil && parent.Left != cur { // 向上找父亲节点，直到一个节点时期父亲的左节点为止
		cur = parent
		parent = cur.Parent
	}
	return parent // 没有后继节点时，父节点为nil
}

func findMostLeftNode(node *TreeNodeWithParent) *TreeNodeWithParent {
	cur := node
	for cur.Left != nil {
		cur = cur.Left
	}
	return cur
}
```

调试：

```go
package binary_tree

import (
	"fmt"
	"testing"
)

func TestFindSuccessorNode(t *testing.T) {
	// Construct the binary tree
	root := &TreeNodeWithParent{Val: 5}
	root.Left = &TreeNodeWithParent{Val: 3, Parent: root}
	root.Right = &TreeNodeWithParent{Val: 8, Parent: root}
	root.Left.Left = &TreeNodeWithParent{Val: 2, Parent: root.Left}
	root.Left.Right = &TreeNodeWithParent{Val: 4, Parent: root.Left}
	root.Right.Left = &TreeNodeWithParent{Val: 6, Parent: root.Right}
	root.Right.Right = &TreeNodeWithParent{Val: 9, Parent: root.Right}

	// Example: Finding the successor of node 3
	successor := FindSuccessorNode(root.Left.Right)
	if successor != nil {
		fmt.Println("The successor of node 4 is:", successor.Val)
	} else {
		fmt.Println("Node 3 has no successor")
	}
}
```
