---
title: 二叉树-11-折纸问题
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 凹凸折痕问题

📘微软的面试过程中，有一个著名的逻辑思维题目，被称为“打印凹凸折痕问题”。考察的是应聘者对递归思想的理解及其在实际场景中的应用。

## 🔍 面试原题概述

原题的内容大致是这样的：

把一张长纸条对折一次（面朝自己，从上往下折），然后展开，会发现纸条在折痕处形成了“凹”形状的折痕。如果再将纸条对折（折痕朝内）并展开，会形成“凸凹凹”形状的折痕序列。那么请问，如果连续对折n次，展开后的纸条上的折痕序列是怎样的？并请使用编程语言实现这一逻辑。

## 💡 学习这道面试题的理由

1. **思维训练**：这道题能够锻炼你的递归思维能力，这是计算机科学的核心概念之一。
2. **解决问题能力**：学习如何将现实问题转化为可以编程解决的形式。
3. **编程技巧**：提高你的编程技巧，特别是对于递归函数的编写能力。
4. **算法应用**：提升你在算法和数据结构上的应用能力。

## 🌟 这道题目的应用

- **计算机科学**：理解递归在算法设计中的作用，比如文件系统的目录结构遍历。
- **工程问题**：传统工程问题或设计中，使用递归解决重复性问题，比如在机械零件设计中的重复性结构。
- **科学研究**：分形学等科学研究中，很多自然现象的模型都是递归的，如分布式计算中的tree-based algorithms。
- **教育工具**：在计算机科学教育中，递归是必学的概念，这道题目恰好可以作为教学案例。

## 📝 算法图解

![](/g1_data_struct_binary_tree_12_paper_floding.assets/binary_tree_paper_folding.drawio.png)

1. **递归基础**：确认递归的基础情形，通常是最简单或最小的问题规模。
2. **递归规则**：确定如何将问题分解，并递归地解决每个子问题。
3. **整合结果**：如何将子问题的解决方案合并以解决原问题。

对于凹凸折痕问题，可以构思一个递归模型。每次对折，实际上是在上一次基础上增加了新的折痕，凹折痕左边永远是凹，右边永远是凸。

## 🚀 Go语言实现

下面是用Go语言实现这个问题的示例代码：

```go
package binary_tree

import "fmt"

func PrintAllFolds(N int) {
	PrintAllFoldsProcess(1, N, true)
}

func PrintAllFoldsProcess(curLevel, maxLevel int, down bool) {
	if curLevel > maxLevel {
		return
	}
	PrintAllFoldsProcess(curLevel + 1, maxLevel, false)
	var direct string
	if down {
		direct = "凹"
	} else {
		direct = "凸"
	}
	fmt.Println(direct)
	PrintAllFoldsProcess(curLevel + 1, maxLevel, true)
}
```
