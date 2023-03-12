---
title: 实战：使用反射调用方法
autoGroup-3: 其他高级特性
---

# 实战：使用反射调用方法

- 通过调用方法，可以将框架和用户方法解耦
- 往往需要用户注册方法，框架调用
- 很多框架的HTTP调用此处使用思路

```go
func MyCall(f func(a, b int)int) {
	fV := reflect.TypeOf(f)
	if fV.Kind() != reflect.Func {
		return
	}
	args := make([]reflect.Value, 2)
	args[0] = reflect.ValueOf(1)
	args[1] = reflect.ValueOf(2)
	res := reflect.ValueOf(f).Call(args)
	fmt.Println(res[0].Interface().(int))
}

func Add1(a, b int) int {
	return a + b
}

func Add2(a, b int) int {
	return a - b
}

func main() {
	MyCall(Add1)
	MyCall(Add2)
}
```

# 
