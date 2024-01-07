---
title: 指针
autoGroup-1: 基础及入门
---

# 指针图解

简单了解指针：

![](/1_3_go_ptr.assets/go_ptr.drawio.png)

- 变量 **b** 存储的值是 88，存储的地址是：**0xc00000e0b8**
- 变量 **a** 存储了变量 **b** 的地址，现在可以说 **a 指向 b**

## 代码分析

分析以下代码输出的是什么？

```go
package main

import "fmt"

func swap(a, b *int) (*int , *int) {
	b, a = a, b
	return a, b
}

func main() {
	x, y := 1, 2
	fmt.Println("x的初始地址：", &x, "y的初始地址：", &y)
	a, b := swap(&x, &y)
	fmt.Println("swap 后x的值：", x, "swap 后y的值：：", y)
	fmt.Println("swap 后x的地址：", &x, "swap 后y的地址：", &y)
	fmt.Println("swap 后a的值：", a, "swap 后b的值：", b)
	fmt.Println("swap 后a指向的值：", *a, "swap 后b指向的值：", *b)
}
```

结果：

```go
// x的初始地址： 0xc00000e0b8 y的初始地址： 0xc00000e0d0
// swap 后x的值： 1 swap 后y的值：： 2
// swap 后x的地址： 0xc00000e0b8 swap 后y的地址： 0xc00000e0d0
// swap 后a的值： 0xc00000e0d0 swap 后b的值： 0xc00000e0b8
// swap 后a指向的值： 2 swap 后b指向的值： 1
```

> 原因分析

![](/1_3_go_ptr.assets/go_ptr1.drawio.png)

需要交换值得正确代码：

```go
package main
import "fmt"
// 交换函数
func swap(a, b *int) {
    // 取a指针的值, 赋给临时变量t
    t := *a
    // 取b指针的值, 赋给a指针指向的变量
    *a = *b
    // 将a指针的值赋给b指针指向的变量
    *b = t
}
func main() {
// 准备两个变量, 赋值1和2
    x, y := 1, 2
    // 交换变量值
    swap(&x, &y)
    // 输出变量值
    fmt.Println(x, y)
}
```

## 相关连接

- [Go语言指针详解](https://zhuanlan.zhihu.com/p/362812580)
- [Golang教程：（十五）指针](https://blog.csdn.net/u011304970/article/details/75008411?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522170464159616800188576978%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=170464159616800188576978&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-75008411-null-null.142^v99^pc_search_result_base6&utm_term=golang%20%E6%8C%87%E9%92%88%E5%9B%BE%E8%A7%A3&spm=1018.2226.3001.4187)