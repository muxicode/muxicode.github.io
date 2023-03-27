---
title: 6.最大路径和
autoGroup-4-4: 阶段4-part-two
---

# 6. 最大路径和

## 题目

给定一个矩阵matrix，先从左上角开始，每一步只能往右或者往下走，走到右下角。然后从右下角出发，每一步只能往上或者往左走，再回到左上角。任何一个位置的数字，只能获得一遍。返回最大路径和。

## 示例

<center>
	<img src="/part_two_6_cherry_pickup.assets/image-20230312223214648.png" alt="drawing" width="50%"/>
</center>

格子如图上分布，此时可以拿到的最多的1，为图中红色的路径表示，走的过程中，可以将所有的1收集到，得到最大路径和。

## 思路

有一个巧妙的设计思路：

<center>
	<img src="/part_two_6_cherry_pickup.assets/image-20230312224035615.png" alt="drawing" width="50%"/>
</center>

- 假设一开始有两个小人，都同时往右下角走
- 共同路过的地方数值只获取一次
- 同时到达右下角

如果符合以上条件，则这种走的方式与题目的最终结果是一致的。

这样的话有一个**隐藏的条件！**，就是A在一个位置时，如果B在别处，那么B就不可能再到A的位置的。

> 我们可以这样猜测
>
> 假设一个函数 process(matrix， Ar, Ac, Br, Bc)
>
> 函数代表着 小人A从位置（Ar，Ac）开始，小人B从（Br, Bc)位置开始，返回走到终点的最大路径和
>
> 答案可以调用 process(matrix, 0,0,0,0) 得到。
>
> 但是思考一个问题：四个变量如果想要做成动态规划，那可是四维表
>
> 我们尝试的原则：
>
> 1. 需要知道是哪几种模型。 
> 2. 每个参数的复杂度不要突破整形的复杂度以上
> 3. 可变参数能省则省
>
> 我们能不能省掉一个参数，完全可以，由于走的步数一样多，我们可以通过三个参数，算出第四个参数
>
> 优化完参数后，我们可以先写出递归可能性，然后优化为三位的动态规划表，如果觉得动态规划表不好改，可以直接加一个缓存，进行加速即可。

## 代码

```go
package class02

import "traning/algorithm/utility/mymath"

func ComeGoMaxPathSum(matrix [][]int) int {
	// 两个小人都从 0，0 出发走向 右下角落
	return ComeGoMaxPathSumProcess(matrix, 0, 0, 0)
}

// (Ar, Ac) 小人A的位置
// (Br, Bc) 小人B的位置 【根据小人走的步数是一样的，可以推出 Bc = Ac + Ar - Br
func ComeGoMaxPathSumProcess(matrix [][]int, Ar, Ac, Br int) int {
	N := len(matrix)-1
	M := len(matrix[0])-1
	if Ar == N && Ac == M {
		// 小人A走到最后一个位置的时候，小人B也走到最后一个位置，只返回该数一次即可
		return matrix[Ar][Ac]
	}

	// 讨论可能性
	// A右 B下
	// A右 B右
	// A下 B下
	// A下 B右
	Bc := Ar + Ac - Br
	ARightBDown := -1
	if Ac < M && Br < N {
		ARightBDown = ComeGoMaxPathSumProcess(matrix, Ar, Ac+1, Br+1)
	}
	ARightBRight := -1
	if  Ac < M && Bc < M {
		ARightBRight = ComeGoMaxPathSumProcess(matrix, Ar, Ac+1, Br)
	}
	ADownBDown := -1
	if Ar < N && Br < N {
		ADownBDown = ComeGoMaxPathSumProcess(matrix, Ar+1, Ac, Br+1)
	}
	ADownBRight := -1
	if Ar < N && Bc < M {
		ADownBRight = ComeGoMaxPathSumProcess(matrix, Ar+1, Ac, Br)
	}
	maxNext := mymath.Max(mymath.Max(ARightBDown, ARightBRight), mymath.Max(ADownBDown, ADownBRight))
	// 小人A与小人B位置相同，返回一个值
	if Ac == Bc {
		return matrix[Ar][Ac] + maxNext
	}
	//  小人A与小人B位置不相同，返回两个值
	return matrix[Ar][Ac] + matrix[Br][Bc] + maxNext
}
```

