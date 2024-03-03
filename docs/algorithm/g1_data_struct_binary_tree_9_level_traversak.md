---
title: 二叉树-9-按层遍历
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 二叉树按层遍历

## 🌳 什么是二叉树的层序遍历呢？

![](/g1_data_struct_binary_tree_9_level_traversak.assets/binary_tree_9_level_traversak1.drawio.png)

层序遍历是一种二叉树的遍历方法，它按照树的层级顺序，从上往下、从左到右地访问每个节点。具体来说，就是从根节点开始，依次访问每一层的节点，直到最后一层。

## 🔍 怎么实现层序遍历呢？

我们可以借助队列来实现层序遍历。具体步骤如下：

![](/g1_data_struct_binary_tree_9_level_traversak.assets/binary_tree_9_level_traversak2.drawio.png)

1. 首先将根节点入队。
2. 当队列不为空时，循环执行以下操作：
   - 弹出队首节点，并访问该节点。
   - 如果该节点有左子节点，将左子节点入队。
   - 如果该节点有右子节点，将右子节点入队。
3. 直到队列为空，遍历结束。

## 💡 二叉树层序遍历的应用有哪些呢？

层序遍历在实际应用中有着广泛的应用，其中一些主要的应用包括：

1. **寻找二叉树的最大宽度：** 通过层序遍历，我们可以轻松地找到二叉树每一层的节点数量，进而计算出二叉树的最大宽度。
2. **建立二叉树的索引：** 层序遍历可以按照顺序将二叉树的节点编号，这样就可以为二叉树建立起索引，方便后续的查询和操作。
3. **分层打印二叉树：** 层序遍历可以将二叉树按照层级打印出来，使得二叉树的结构更加清晰可见。

## 👨‍💻 代码实现

```go
package binary_tree

import (
	"container/list"
	"fmt"
)

func LevelTraversal(node *TreeNode) {
	if node == nil {
		return
	}
	queue := list.New()
	// 头节点进入队列
	queue.PushFront(node)
	for queue.Len() != 0 {  // 队列为空时遍历完毕退出
		n := queue.Remove(queue.Back()).(*TreeNode)
		fmt.Println(n.Value)
		if n.Left != nil {  // 左节点不为空，则左节点进入队列
			queue.PushFront(n.Left)
		}
		if n.Right != nil { // 右节点不为空，则右节点进入队列
			queue.PushFront(n.Right)
		}
	}
}
```

