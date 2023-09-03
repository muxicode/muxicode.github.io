---
title: 组成单词
autoGroup-5: 📒练习集📒
---

# 4. 组成单词



## 题目：

给定一个字符类型的二维数组board，和一个字符串组成的列表words。

可以从board任何位置出发，每一步可以走向上、下、左、右，四个方向，但是一条路径已经走过的位置，不能重复走。返回words哪些单词可以被走出来。

> 例子
>
> board = [
>
> ​	["o", "a", "a", "n"],
>
> ​	["e", "t", "a", "e"],
>
> ​	["i", "h", "k", "r"],
>
> ​	["i", "f", "l", "v"],
>
> ]
>
> words = ["oath", "pea", "eat", "rain"]
>
> 输出：["eat", "oath"]

## 题解

- 对于每一个位置 i, j 的位置，都做为一次起点，并探究从当前位置出发，并将可以组装成的单词收集起来。
- 对每一个位置进行递归，并且通过字典树的方式进行加速加剪枝。

## 代码

```go
package class01

import "strings"

/*
对应：leetcode 212. 单词搜索 II
给定一个字符类型的二维数组board，和一个字符串组成的列表words。
可以从board任何位置出发，每一步可以走向上、下、左、右，四个方向，但是一条路径已经走过的位置，不能重复走。返回words哪些单词可以被走出来。
例子
board = [
	["o", "a", "a", "n"],
	["e", "t", "a", "e"],
	["i", "h", "k", "r"],
	["i", "f", "l", "v"],
]
words = ["oath", "pea", "eat", "rain"]
 输出：["eat", "oath"]
*/

func NewTreeNode() *MyTreeNode {
	return &MyTreeNode{
		next: [26]*MyTreeNode{},
	}
}

type MyTreeNode struct {
	next [26]*MyTreeNode
	pass int
	end  int
}

func (t *MyTreeNode) FillWord(word string){
	head := t
	for i:=0; i<len(word); i++ {
		if head.next[word[i] - 'a'] == nil {
			head.next[word[i] - 'a'] = NewTreeNode()
		}
		head.next[word[i] - 'a'].pass++
		head = head.next[word[i] - 'a']
	}
	head.end++
}

// 解法主入口
func findWords(board [][]byte, words []string) []string {
	// 组装字典树，加速整个过程
	tire := NewTreeNode()
	wordSet := make(map[string]struct{})
	for i:=0; i<len(words); i++ {
		if _, ok := wordSet[words[i]]; !ok {
			tire.FillWord(words[i])
		}
	}

	// 初始化答案，用于收集
	
	ans := make([]string, 0)
	collect := func (s string) {
		ans = append(ans, s)
	}
	// 沿途走过的路径，使用切片记录
	path := make([]string, 0)
	// 遍历每一个可能的起始位置，将答案收集
	for row:=0; row<len(board); row++ {
		for col:=0; col<len(board[0]); col++ {
			process(board, row, col, tire, path, collect)
		}
	}
	return ans
}

// 从board[row][col]位置的字符出发，
// 之前的路径上，走过的字符，记录在path里
// cur还没有登上，有待检查能不能登上去的前缀树的节点
// 如果找到words中的某个str，就记录在 res里
// 返回值，从row,col 出发，一共找到了多少个str
func process(board [][]byte, row, col int, cur *MyTreeNode, path []string, collect func (s string)) int {
	if board[row][col] == 0 {
		// 不能走回头路，该方向不存在找到的str，返回0
		return 0
	}
	s := board[row][col]
	index := s - 'a'
	if cur.next[index] == nil || cur.next[index].pass == 0 {
		// 如果当前位置的字符串，不属于目标字符串中的任何一个，直接返回0
		return 0
	}

	// 存在该路径，走上去
	cur = cur.next[index]
	// 记录路径，需要还原路径，但是在go中，可以不用还原，因为每一次都新生成path
	path = append(path, string(s))
	// 记录搞定的字符串数量
	fix := 0
	// 当我来到row col位置，如果决定不往后走了。是不是已经搞定了某个答案
	if cur.end != 0 {
		collect(strings.Join(path, ""))
		cur.end--
		fix++
	}
	// 往上下左右，四个方向尝试
	// 将走过的位置改成空，用于下次判断是否已经走过
	board[row][col] = 0
	if row > 0 {
		fix += process(board, row-1, col, cur, path, collect)
	}
	if row+1 < len(board) {
		fix += process(board, row+1, col, cur, path, collect)
	}
	if col > 0 {
		fix += process(board, row, col-1, cur, path, collect)
	}
	if col+1 < len(board[0]) {
		fix += process(board, row, col+1, cur, path, collect)
	}
	board[row][col] = s
	// 路径回溯
	path = path[:len(path)-1]
	cur.pass -= fix
	return fix
}

```

