---
title: 3.位图
autoGroup-1: 有趣的二进制
---

# 3.位图

## 题目

我想实现一个结构 bitMap，这个结构体有一个初始化方法，可以初始化该结构体的存储范围如：100，需要有三个方法：add(num int) 添加一个数到结构体中，delete(num int)删除一个数, isContain(num int) bool，是否包含某一个数，要求这个数为从 0-100 之间。

要求：使用的内存空间必须要小。

## 算法解读

### Map解

使用map，而且还不需要初始化上限，缺点也明显，map底层包的常数项时间及占用的空间都比较大。比如：
我存的数都是 int64，每次加一个数需要新增八个字节的空间。

如果采用位图，每一个数只需要一个 bit，所需要的内存是map的1/64

### bitMap实现

> add方法原理

![image-20230322204401085](/3_bit_map.assets/image-20230322204401085.png)

每次在将需要添加的数字的位置置为1

> delete方法原

![image-20230322204430597](/3_bit_map.assets/image-20230322204430597.png)

每次将对应的位置置为0

> isContain 原理

![image-20230322212740765](/3_bit_map.assets/image-20230322212740765.png)

判断一个位置是否已经添加过，需要判断该位置是否为1，则使用1去位移到对应的位置 并 与 bitMap 相与，如果结果不为0，则该位置为1，所以应该返回 true，表示包含。

## 代码

```go
type BitMap []int

func NewBitMap(max int) BitMap {
	bitmap := make(BitMap, (max + 64) >> 6)
	return bitmap
}

func (b BitMap) Add (val int) {
	b[val>>6] |= 1<<(val&63)
}

func (b BitMap) Delete (val int) {
	b[val>>6] &= ^(1<<(val&63))
}

func (b BitMap) IsContain (val int) bool {
	if b[val>>6] & (1<<(val&63)) == 0 {
		return false
	}
	return true
}
```

