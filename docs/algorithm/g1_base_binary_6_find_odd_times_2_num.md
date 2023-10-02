---
title: 位运算-7-找到出现次数奇数次的两个数
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 找到出现次数奇数次的两个数

一个数组中有两个数出现了奇数次，其余数字出现了偶数次，要求找出出现奇数次的数，如下数组：

![](/g1_base_binary_6_find_odd_times_2_num.assets/odd_times_num_1.drawio.png)

其中`6`和`7`，出现了奇数次，其余数字出现了偶数次，找到`6`和`7`即可。

## 取出最低位的1

假设我们有一个数字`a`，我们使`a`异或上`a`取反加`1`后可以得到`a`的二进制上最右边的`1`，即：` rightOne = a ^ (~a + 1)`

![](/g1_base_binary_6_find_odd_times_2_num.assets/right_one.drawio.png)

## 算法流程

1.  遍历数组，将整个数组异或，可以得到 `6 ^ 7`
2.  取到`6 ^ 7` 二进制最右边的那个`1`，我们叫它`rightOne `，我们可以知道`6 `和`7`在该位置肯定不相等
3.  利用`6 `和`7`在该位置肯定不相等，我们遍历数组，用`rightOne `，去异或数组的数，如果结果不为`0`，我们将这些数，异或起来，最后的结果是`6`和`7`的其中一个，因为我们用`rightOne `将我们的数分成了两组，一组包含`6`，一组包含`7`
4. 将上述结果异或`6 ^ 7` 可以得到另外一个数

## 代码示例

```go
func FindTwoOddTimesNum(arr []int) (int, int) {
	eor := 0
	for _, v := range arr {
		eor ^= v
	}
	rightOne := eor&(-eor)
	eor2 := 0
	for _, v := range arr {
		if rightOne & v != 0 {
			eor2 ^= v
		}
	}
	return eor2, eor^eor2
}
```