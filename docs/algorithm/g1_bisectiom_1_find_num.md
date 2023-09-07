---
title: 二分及其拓展-1-有序数组中查找数字
autoGroup-1: 🌱阶段一：初出茅庐🌱 
---

# 有序数组中查找数字

我们有如下一个数组：

![](/g1_bisectiom_1_find_num.assets/image-20230907233145954.png)

数组内的数字是有序的，我们假设不知道里面是否有数字`9`，设计一个函数，指定数组及数字，该函数返回布尔值，为`true`表示数组存在该数字，否则不存在。

## 算法步骤

1. 初始化赋值左右两边的位置`left`、`right`，并计算出中间位置`mid = (left + rignt) / 2`

   ![image-20230907233809200](/g1_bisectiom_1_find_num.assets/image-20230907233809200.png)

   `mid`位置为5，比我们目标值`9`要小，让`left = mid + 1`

2. 此时`left`和`right`相等，计算出来的mid也等于`left`和 `right`，此时数组的`mid`位置为`9`，等于我们要找的目标，返回`true`即可。

   ![image-20230907234154239](/g1_bisectiom_1_find_num.assets/image-20230907234154239.png)



## 代码实现

### 方式一

采用边界为 left < right 的方式循环：

```go
func Exist1(arr []int, num int) bool {
	if arr == nil || len(arr) == 0 {
		return false
	}
	left, right, mid := 0, len(arr)-1, 0
	for left < right { 
		mid = left + ((right - left) >> 1) // 实际就是 (left + right) / 2 的防溢出写法
		if arr[mid] == num {
			return true
		} else if arr[mid] > num {
			right = mid - 1
		} else {
			left = mid + 1
		}
	}
	return arr[left] == num // 最后left 等于 right ，但是该位置并未在循环中验证，可以参考算法步骤
}
```

### 方式二：

采用边界为 left <= right 的方式循环：

```go
func Exist2(arr []int, num int) bool {
	if arr == nil || len(arr) == 0 {
		return false
	}
	left, right, mid := 0, len(arr)-1, 0
	for left <= right {
		mid = left + ((right - left) >> 1) // 实际就是 (left + right) / 2 的防溢出写法
		if arr[mid] == num {
			return true
		} else if arr[mid] > num {
			right = mid - 1
		} else {
			left = mid + 1
		}
	}
	return false // 在循环中，我们已经将所有位置验证过了
}
```

### 对数器验证

```go
func TestExist1EqualExist2(t *testing.T) {
	testTime := 50000
	maxArrLen := 20
	maxNum    := 25
	r := utility.GetRandomNumCreator()
	for i:=0; i<testTime; i++ {
		arr := r.GetRandomArr(maxNum, maxArrLen)
		sort.Ints(arr)
		target := r.GetRandom(maxNum)
		fmt.Println(arr, target,  Exist1(arr, target)) // 打印数组，目标，及结果 观察，正常测试去掉
		if Exist1(arr, target) != Exist2(arr, target) {
			fmt.Println("method no equal !!!")
            return
		}
	}
}
```

![](/g1_bisectiom_1_find_num.assets/image-20230907235950938.png)

以上只展示了一点样本，长度不一内容随机的情况下，两种方式都一致，所以边界的处理可根据个人习惯或者场景，灵活写出循环的条件。