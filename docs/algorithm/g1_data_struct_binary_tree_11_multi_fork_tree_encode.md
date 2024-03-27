---
title: 二叉树-11-多叉树转二叉树的编解码
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 多叉树转二叉树的编解码

多叉树转二叉树的编解码是一种将多叉树表示的数据结构转换为等价的二叉树表示的过程。在这个过程中，我们通过一定的编码和解码规则，将多叉树的节点及其关系映射到二叉树中，以实现对多叉树的有效操作和存储。

### 📈 例子

考虑一个简单的多叉树结构：

```
     A
   / | /
  B  C  D
 /|/    |
E F G   H
```

通过编解码，我们可以将其转换为等价的二叉树：

```
      A
     /
    B
   / /
  E   C
     / /
    F   D
       /
      G
     /
    H
```

### 🌐 应用

- XML文档存储：将XML文档中的树形结构转换为二叉树，以便于处理和存储。
- 数据库索引：某些数据库引擎将索引存储为二叉树，可以通过多叉树到二叉树的转换来优化索引结构。
- 语法分析：编译器和解释器中，将语法树转换为二叉树以进行更高效的语法分析。

### 🧩 算法流程

![](/g1_data_struct_binary_tree_11_multi_fork_tree_encode.assets/binary_tree_encode_2tree.drawio.png)

1. **多叉树到二叉树的转换**：将父节点的第一个孩子作为右节点，其他孩子以右指针连载一起，连在第一个孩子的右指针上。

   所有节点都重复这个规则，即可将多叉树转为二叉树

2. **二叉树到多叉树的转换**：每个节点通过左指针找到头一个孩子，在通过孩子的右指针找到所有的孩子，将所有的孩子找到后，重新解码为多叉树即可。

### 🚀 Go实现

代码：

```go

type MultiForkTreeNode struct {
	Value string
	Children []*MultiForkTreeNode
}

type TreeNode struct {
	Value string
	Left  *TreeNode
	Right *TreeNode
}

func NewMultiForkTreeNode(value string, children []*MultiForkTreeNode) *MultiForkTreeNode {
	return &MultiForkTreeNode{
		Value: value,
		Children: children,
	}
}

// MultiForkTreeEncode: 多叉树编码为二叉树  ------------------------------------
func MultiForkTreeEncode(mRoot *MultiForkTreeNode) *TreeNode {
	if mRoot == nil {
		return nil
	}
	binaryTreeRoot := NewTreeNode(mRoot.Value)
	binaryTreeRoot.Left = En2TreeNode(mRoot.Children)
	return binaryTreeRoot
}

func NewTreeNode(value string) *TreeNode {
	return &TreeNode{
		Value: value,
	}
}

func En2TreeNode(children []*MultiForkTreeNode) *TreeNode {
	var head, cur *TreeNode
	for _, c := range children {
		treeNode := NewTreeNode(c.Value)
		if head == nil {
			head = treeNode
		} else if cur != nil {
			cur.Right = treeNode
		}
		cur = treeNode
		cur.Left = En2TreeNode(c.Children)
	}
	return head
}

// BinaryTreeDecode2MultiForkTree: 二叉树解码为多叉树  ------------------------------------
func BinaryTreeDecode2MultiForkTree(root *TreeNode) *MultiForkTreeNode {
	return NewMultiForkTreeNode(root.Value, DeBinaryTree(root.Left))
}

func DeBinaryTree(treeNode *TreeNode) []*MultiForkTreeNode {
	ans := make([]*MultiForkTreeNode, 0)
	if treeNode == nil {
		return ans
	}
	cur := treeNode
	for cur != nil {
		mN := NewMultiForkTreeNode(cur.Value, DeBinaryTree(cur.Left))
		ans = append(ans, mN)
		cur = cur.Right
	}
	return ans
}
```

测试代码：

```go
package binary_tree

import "testing"

func TestMultiForkTreeEncode(t *testing.T) {
	mRoot := &MultiForkTreeNode{Value: "root"}
	mRoot.Children = []*MultiForkTreeNode{
		&MultiForkTreeNode{Value: "c1"},
		&MultiForkTreeNode{Value: "c2"},
		&MultiForkTreeNode{
			Value: "c3",
			Children: []*MultiForkTreeNode{
				&MultiForkTreeNode{Value: "d1"},
				&MultiForkTreeNode{Value: "d2"},
			},
		},
	}
	PrintMultiForkTree(mRoot)
	tNode := MultiForkTreeEncode(mRoot)
	PrintTree(tNode)
	nMNode := BinaryTreeDecode2MultiForkTree(tNode)
	PrintMultiForkTree(nMNode)
}

/*  测试结果
	=== RUN   TestMultiForkTreeEncode
	------------------------------------    打印多叉树    ------------------------------------
		⬇c1
		⬇c2
			⬇d1
			⬇d2
		⬇c3
	⬇root
	------------------------------------    打印二叉树    ------------------------------------
	 <root>
				 ⬇c3⬇
						 ⬇d2⬇
					 ⬆d1⬆
			 ⬇c2⬇
		 ⬆c1⬆
	------------------------------------    打印多叉树    ------------------------------------
		⬇c1
		⬇c2
			⬇d1
			⬇d2
		⬇c3
	⬇root
	--- PASS: TestMultiForkTreeEncode (0.00s)
	PASS

	Process finished with exit code 0
*/
```

辅助打印函数：

```go
package binary_tree

import (
	"fmt"
	"strings"
)


// PrintTree: 打印二叉树   ------------------------------------
func  PrintTree(node *TreeNode) {
	if node == nil {
		return
	}
	fmt.Println("------------------------------------    打印二叉树    ------------------------------------")
	InProcess(node, 0, 0)
}

// nodeType: 0: 根节点  1:左节点 2:右节点
func InProcess(node *TreeNode, level int, nodeType int) {
	if node == nil {
		return
	}
	InProcess(node.Right, level+1, 2)
	nodeStr := FormatterFactory.CreateFormatter(FormatterFactory{}, node, nodeType).Format()
	fmt.Println(strings.Repeat("    ", level), nodeStr)
	InProcess(node.Left, level+1, 1)
}

type Formatter interface {
	Format() string
}

type FormatterFactory struct {}

func (f FormatterFactory) CreateFormatter(node *TreeNode, nodeType int) Formatter {
	switch nodeType {
	case 0:
		return &RootNodeFormatter{Node: node}
	case 1:
		return &LeftNodeFormatter{Node: node}
	case 2:
		return &RightNodeFormatter{Node: node}
	}
	return nil
}

type RootNodeFormatter struct {
	Node *TreeNode
}

func (R *RootNodeFormatter) Format() string {
	return "<" + R.Node.Value + ">"
}

type LeftNodeFormatter struct {
	Node *TreeNode
}

func (l *LeftNodeFormatter) Format() string {
	return "⬆" + l.Node.Value + "⬆"
}

type RightNodeFormatter struct {
	Node *TreeNode
}

func (r *RightNodeFormatter) Format() string {
	return "⬇" + r.Node.Value + "⬇"
}

// PrintTree: 打印多叉树   ------------------------------------
func  PrintMultiForkTree(node *MultiForkTreeNode) {
	if node == nil {
		return
	}
	fmt.Println("------------------------------------    打印多叉树    ------------------------------------")
	PrintMultiForkTreePosProcess(node, 0)
}

func PrintMultiForkTreePosProcess(node *MultiForkTreeNode, nodeLevel int) {
	if node == nil {
		return
	}
	for _, child := range node.Children {
		PrintMultiForkTreePosProcess(child, nodeLevel+1)
	}
	fmt.Println(formatNodeValueStr(node, nodeLevel))
}

func formatNodeValueStr(node *MultiForkTreeNode, nodeLevel int) string {
	return  strings.Repeat("    ", nodeLevel) + "⬇" +node.Value
}
```

