---
title: 6.最大路径和
autoGroup-2: 股票三连
---

# 6. 最大路径和

## 题目

给定一个矩阵matrix，先从左上角开始，每一步只能往右或者往下走，走到右下角。然后从右下角出发，每一步只能往上或者往左走，再回到左上角。任何一个位置的数字，只能获得一遍。返回最大路径和。

## 示例

![image-20230312223214648](D:\个人项目\github\muxicode.github.io\docs\.vuepress\public\part_two_6_cherry_pickup.assets\image-20230312223214648.png)

格子如图上分布，此时可以拿到的最多的1，为图中红色的路径表示，走的过程中，可以将所有的1收集到，得到最大路径和。

## 思路

有一个巧妙的设计思路：

<center><img src="D:\个人项目\github\muxicode.github.io\docs\.vuepress\public\part_two_6_cherry_pickup.assets\image-20230312224035615.png" alt="drawing" width="60%"/></center>

- 假设一开始有两个小人，都同时往右下角走
- 共同路过的地方数值只获取一次
- 同时到达右下角

如果符合以上条件，则这种走的方式与题目的最终结果是一致的。

## 代码

