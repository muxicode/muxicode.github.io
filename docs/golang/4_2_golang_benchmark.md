---
title: 基准测试
autoGroup-4: 测试相关
---

# Benchmark 基准测试

- golang中Benchmark测试用例的作用是**评估一段代码的性能**，包括**执行时间和内存分配情况**。Benchmark测试用例可以帮助开发者找出代码的瓶颈，优化算法，比较不同实现的效率等。
- golang中Benchmark测试用例的使用方法是在测试文件（**以_test.go结尾**）中定义一个以**Benchmark开头的函数**，接收一个*testing.B类型的参数，然后在函数体中使用b.N循环调用要测试的代码。

## 示例

```go
func BenchmarkSprint(b *testing.B) {
    
    // 可以放初始化代码，时间过长，需要使用 b.ResetTimer()
    
	// 将计时器归零, 避免循环之前的初始化代码的干扰
    // 排除初始化代码的影响，只测试循环内部的代码性能。
	b.ResetTimer()

	// loop b.N times
	for i := 0; i < b.N; i++ {
		// 待测试性能的函数
		fmt.Sprint(i)
	}
}
```

## 用例执行

在你写的测试文件的目录下，执行以下命令，即可执行测试，并打印相关性能数据：

```
 go test -bench . -benchmem
```

> 在一些代码编辑器中，可以直接点击按钮执行，比如：goland编辑器，goland编辑器中运行，因为一些参数的原因有可能不准确，需要自行设置一些环境参数，这里不做说明。

## 报告解读

golang中Benchmark测试用例的报告的解读方法是根据输出结果中的四个部分来分析性能。输出结果的格式如下：

| BenchmarkName-CPUs                | NsPerOp                                                    | AllocsPerOp                        | BytesPerOp                           |
| --------------------------------- | ---------------------------------------------------------- | ---------------------------------- | ------------------------------------ |
| 是Benchmark函数的名称 - CPU核心数 | 每次操作（即每次调用被测试的代码）所花费的纳秒数，越小越好 | 每次操作所分配内存的次数，越小越好 | 每次操作所分配内存的字节数，越小越好 |

例如：

```bash
BenchmarkSprint-8    1230048      112.9 ns/op       2 allocs/op      16 B/op
```

表示在8个CPU核心下运行BenchmarkSprint函数，每次调用fmt.Sprint函数花费112.9纳秒，分配了2次内存，共16字节。