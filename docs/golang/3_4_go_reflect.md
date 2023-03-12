---
title: recover 如何在panic 中拯救程序？
autoGroup-3: 其他高级特性
---

# Go 是怎么实现反射的？

>  需求

- 获取对象的类型
- 对任意类型的变量赋值
- 调用任意方法

> 元数据

- 元数据就是”数据的数据“
- 把对象的类型表示成一个数据类型
- 把对象的值表示成一个数据类型

> 对象的类型

- 接口 reflect.Type
- 把对象的类型表示成一个接口
- 就能对类型做各种操作

源码：

```go
type Type interface {
	...
	Name() string
    ...
}

// channl类型的底层表示
type chanType struct {
	rtype
	elem *rtype  // channel element type
	dir  uintptr // channel direction (chanDir)
}
```



> 对象的值

- 结构体 reflect.Value
- 把对象的值表示成一个结构体
- 就能对值做各种操作

> 示例

```go
func main() {
	name := "coco"
	// 获取类型数据
	sT := reflect.TypeOf(name)
	fmt.Println(sT)
	// 获取值数据
	sV := reflect.ValueOf(name)
	fmt.Println(sV)
	// 把值数据还原为原来的数据
	fmt.Println(sV.Interface().(string))
}
```

