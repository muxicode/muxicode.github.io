---
title: KMP-2-旋转词
autoGroup-2: 🚀阶段二：知识的升华🚀
---

# 旋转词

## 题目：

给定两个字符串, `s` 和 `goal`。如果在若干次旋转操作之后，`s` 能变成 `goal` ，那么返回 `true` 。

`s` 的 **旋转操作** 就是将 `s` 最左边的字符移动到最右边。 

- 例如, 若 `s = 'abcde'`，在旋转一次之后结果就是`'bcdea'` 。

 

**示例 1:**

```
输入: s = "abcde", goal = "cdeab"
输出: true
```

**示例 2:**

```
输入: s = "abcde", goal = "abced"
输出: false
```

## 题解

### 暴力解

每个位置开始尝试与 `goal `字符串匹配，越界的时候返回开头继续匹配。

复杂为：O(N^2)

### KMP应用

1. 将`s`字符串复制一份，拼接到末尾，得到`s1`：`"abcdeabcde"`
2. `s` 的任何旋转词都是 `s1` 的子串
3. 使用`kmp`算法，判断 `goal` 是否是 `s1` 的子串，如果是，则证明 `s` 能变成 `goal` ，那么返回 `true` 

## 原题链接

[796. 旋转字符串](https://leetcode.cn/problems/rotate-string/)
