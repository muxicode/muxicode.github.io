---
title: 重复的子字符串
autoGroup-2: KMP
---

# 重复的子字符串

## 题目

给定一个非空的字符串 `s` ，检查是否可以通过由它的一个子串重复多次构成。

 

**示例 1:**

```
输入: s = "abab"
输出: true
解释: 可由子串 "ab" 重复两次构成。
```

**示例 2:**

```
输入: s = "aba"
输出: false
```

**示例 3:**

```
输入: s = "abcabcabcabc"
输出: true
解释: 可由子串 "abc" 重复四次构成。 (或子串 "abcabc" 重复两次构成。)
```

## 思路

1.  将字符串复制一份与原字符串拼接
2.  将拼接好的字符串掐头去尾
3.  将处理好的字符串使用`kmp`匹配原字符串
4.  如果匹配上，返回 `true`，否则返回 `false`

> 示例

![](/advance_1_kmp_4_repeated_substring.assets/kmp_repeat_substring.drawio.png)

> 证明

![](/advance_1_kmp_4_repeated_substring.assets/kmp_repeat_substring_2.drawio.png)



1.   我们假设复制并拼接好字符串后，与`s`匹配的最小位置为`i`
2.   我们可以知道 `1`等于`2`等于`3`, 因为这些位置都是 s 的开头前 i 个字符串
3.   我们可以知道一个性质，`s`字符串前 `i`个字符串等于后`i`个字符串
4.   并且将`s`字符串的前`i`个字符串移动到末尾后的字符串还是于`s`字符串相等
5.   如果我们一直将`s`前面`i`个字符串移动到末尾，则可以知道 `s`的前 `k*i`个字符串等于`s`的后 `k*i`个字符串
6.   上述条件满足 `k*i >= n`的时候为止，这说明s可以被分成长度为`i`的若干段，每段都相同

## 原题链接

[459. 重复的子字符串](https://leetcode.cn/problems/repeated-substring-pattern/description/)
