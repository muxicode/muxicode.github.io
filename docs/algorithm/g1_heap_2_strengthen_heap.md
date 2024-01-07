---
title: 堆-2-加强堆
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 加强堆



## 最大线段重合问题

题目：

给定很多线段， 每个线段都有两个数[start， end] ，表示线段开始位置和结束位置，左右都是闭区间

规定：

1. 线段的开始和结束位置一定都是整数值
2. 线段重合区域的长度必须 >=1 

返回线段最多重合区域（点重合不算）中，包含了几条线段？

### 简单方法： 

![](D:\个人项目\github\muxicode.github.io\docs\.vuepress\public\g1_heap_2_strengthen_heap.assets\heap_strengthen_heap.drawio.png)

1.  通过遍历所有的线段得到所有的线段所在的区间
2.  线段开始与结束都为整数，所以在小数的位置如果重合，则线段一定重合，整数区间可能只是点重合
3.  在每一个非整数区间遍历所有线段，统计经过该区间的所有线段
4.  取区间上的最大值，即可得出结果

### 堆解决：

![](D:\个人项目\github\muxicode.github.io\docs\.vuepress\public\g1_heap_2_strengthen_heap.assets\heap_strengthen_heap2.drawio.png)

### 代码实现

```go
package heap_trianning

import (
	"traning/algorithm/utility"
	"traning/algorithm/utility/heap02"
)

// 1. 暴力解法
func GetMaxRepeatLineNum(lines [][]int) int {
	min, max := 0, 0
	for _, line := range lines {
		min = utility.Min(line[0], min)
		max = utility.Max(line[0], max)
	}
	var ans int
	for i:=min; i<max; i++ {
		sag := float64(i) + 0.5
		curRepeat := 0
		for _, line := range lines {
			if float64(line[0]) < sag && sag < float64(line[1]) {
				curRepeat++
			}
		}
		ans = utility.Max(ans, curRepeat)
	}
	return ans
}



// 2. 使用堆
func GetMaxRepeatLineNum2(lines [][]int) int {
	myLines := SortableLines(lines)
	hp := heap02.NewHeap(len(lines), func (a interface{}, b interface{}) bool { // 小根堆，自定义比较器
		return a.(int) < b.(int)
	})
	var ans int
	for _, line := range myLines {
		for hp.Peek() != nil &&  hp.Peek().(int) < line[0] {
			hp.Poll()
		}
		hp.Add(line[1])
		ans = utility.Max(ans, hp.Size())
	}
	return ans
}

type SortableLines [][]int

func (s SortableLines) Len() int {
	return len(s)
}

func (s SortableLines) Less(i, j int) bool {
	return s[i][0] < s[j][0]
}

func (s SortableLines) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}
```

自定义堆实现

```go
package heap02

func NewHeap(cap int, compare func(interface{}, interface{}) bool) MyHeap {
	return MyHeap{
		cap: cap,
		compare: compare,
		nodes: make([]interface{}, cap),
		size: 0,
	}
}

type MyHeap struct {
	cap     int
	size    int
	nodes   []interface{}
	compare func(interface{}, interface{}) bool
}

func (mH *MyHeap) Size() int {
	return mH.size
}

func (mH *MyHeap)Add(node interface{}) {
	if mH.size == mH.cap {
		panic(any("heap is full"))
	}
	mH.nodes[mH.size] = node
	mH.Insert(mH.size)
	mH.size++
}

func (mH *MyHeap)Insert(index int) {
	cur := index
	parent := (cur-1) >> 1
	for cur > 0 {
		if mH.compare(mH.nodes[cur], mH.nodes[parent]) {
			mH.Swap(cur, parent)
		} else {
			break
		}
		cur = parent
		parent = (cur-1) >> 1
	}
}

func (mH *MyHeap) Poll() interface{} {
	if mH.size == 0 {
		panic(any("heap is empty"))
	}
	ans := mH.nodes[0]
	mH.size--
	mH.Swap(0, mH.size)
	mH.heapify(0)
	return ans
}

func (mH *MyHeap) heapify(index int) {
	cur := index
	next := (cur<<1) | 1
	for next < mH.size {
		if next+1 < mH.size && !mH.compare(mH.nodes[next], mH.nodes[next+1]) {
			next = next +1
		}
		if !mH.compare(mH.nodes[cur], mH.nodes[next]) {
			mH.Swap(cur, next)
		} else {
			break
		}
		cur = next
		next = (cur<<1) | 1
	}
}

func (mH *MyHeap)Peek() interface{} {
	if mH.size == 0 {
		return nil
	}
	return mH.nodes[0]
}

func (mH *MyHeap)Swap(index1, index2 int) {
	mH.nodes[index1], mH.nodes[index2] = mH.nodes[index2], mH.nodes[index1]
}
```

## 加强堆

加强堆是一种特殊而强大的数据结构，它在普通堆的基础上进行了进一步的增强，为某些特殊场景提供了更高效的解决方案。

这种加强常常涉及到对普通堆的扩展，可能引入一些额外的数据结构或算法来达到更优的性能。加强堆的设计灵感往往来自于实际应用中对于特定操作的需求，力求在保持堆的基本特性的同时，提供更多功能和更高的效率。🚀✨

下面讲解一种堆，其中仅有一个元素不对的情况下，可以调整该元素并恢复的堆结构：

![](D:\个人项目\github\muxicode.github.io\docs\.vuepress\public\g1_heap_2_strengthen_heap.assets\heap_strengthen_heap3.drawio.png)



对于在一个正常堆结构中，仅有一个元素位置不对的时候，我们只需要执行：

- `heapify`
- `insert`

两个操作不分先后，因为只会走其中的一种，且复杂度只有`O(logN)`

### 加强堆实现

```go
package heap02

func NewHeapGreater(cap int, compare func(interface{}, interface{}) bool) HeapGreater {
	return HeapGreater{
		cap: cap,
		compare: compare,
		nodes: make([]interface{}, cap),
		nodesIndexMap: make(map[interface{}]int),
		size: 0,
	}
}

type HeapGreater struct {
	cap            int
	size           int
	nodes          []interface{}
	compare        func(interface{}, interface{}) bool
	nodesIndexMap  map[interface{}]int
}


func (hg *HeapGreater)Add(node interface{}) {
	if hg.size == hg.cap {
		panic(any("heap is full"))
	}
	hg.nodes[hg.size] = node
	hg.nodesIndexMap[node] = hg.size
	hg.insert(hg.size)
	hg.size++
}

func (hg *HeapGreater) Poll() interface{} {
	if hg.size == 0 {
		panic(any("heap is empty"))
	}
	ans := hg.nodes[0]
	hg.size--
	hg.Swap(0, hg.size)
	hg.heapify(0)
	delete(hg.nodesIndexMap, ans)
	return ans
}

func (hg *HeapGreater) Resign(node interface{}) {
	hg.heapify(hg.nodesIndexMap[node])
	hg.insert(hg.nodesIndexMap[node])
}

func  (hg *HeapGreater) Remove(node interface{}) {
	replace := hg.nodes[hg.size-1]
	index := hg.nodesIndexMap[node]
	delete(hg.nodesIndexMap, node)
	hg.size--
	if replace != node { // swap不能用，因为resign 依赖size与mapindex
		hg.nodes[index]  = replace
		hg.nodesIndexMap[replace] = index
		hg.Resign(replace)
	}
}

func (hg *HeapGreater) GetAllElements() []interface{} {
	ans := make([]interface{}, hg.size)
	copy(ans, hg.nodes)
	return ans
}

func (hg *HeapGreater)Peek() interface{} {
	if hg.size == 0 {
		return nil
	}
	return hg.nodes[0]
}

func (hg *HeapGreater) Size() int {
	return hg.size
}

func (hg *HeapGreater) Empty() bool {
	return hg.size == 0
}

func (hg *HeapGreater) Contain(node interface{}) bool {
	_, ok := hg.nodesIndexMap[node]
	return ok
}

func (hg *HeapGreater) insert(index int) {
	for hg.compare(hg.nodes[index], hg.nodes[(index-1) / 2]) {
		hg.Swap(index, (index-1) / 2)
		index = (index-1) / 2
	}
}

func (hg *HeapGreater) heapify(index int) {
	cur := index
	next := (cur<<1) | 1
	for next < hg.size {
		if next+1 < hg.size && !hg.compare(hg.nodes[next], hg.nodes[next+1]) {
			next = next +1
		}
		if !hg.compare(hg.nodes[cur], hg.nodes[next]) {
			hg.Swap(cur, next)
		} else {
			break
		}
		cur = next
		next = (cur<<1) | 1
	}
}

func (hg *HeapGreater)Swap(index1, index2 int) {
	node1, node2 :=  hg.nodes[index1], hg.nodes[index2]
	hg.nodesIndexMap[node1], hg.nodesIndexMap[node2] = hg.nodesIndexMap[node2], hg.nodesIndexMap[node1]
	hg.nodes[index1], hg.nodes[index2] = hg.nodes[index2], hg.nodes[index1]
}
package heap02

func NewHeapGreater(cap int, compare func(interface{}, interface{}) bool) HeapGreater {
	return HeapGreater{
		cap: cap,
		compare: compare,
		nodes: make([]interface{}, cap),
		nodesIndexMap: make(map[interface{}]int), // 记录加入堆node的在nodes中的位置index
		size: 0,
	}
}

type HeapGreater struct {
	cap            int
	size           int
	nodes          []interface{}
	compare        func(interface{}, interface{}) bool
	nodesIndexMap  map[interface{}]int
}


func (hg *HeapGreater)Add(node interface{}) {
	if hg.size == hg.cap {
		panic(any("heap is full"))
	}
	hg.nodes[hg.size] = node
	hg.nodesIndexMap[node] = hg.size // 添加节点的时候记录位置
	hg.insert(hg.size)
	hg.size++
}

func (hg *HeapGreater) Poll() interface{} {
	if hg.size == 0 {
		panic(any("heap is empty"))
	}
	ans := hg.nodes[0]
	hg.size--
	hg.Swap(0, hg.size)
	hg.heapify(0)
	delete(hg.nodesIndexMap, ans) // 取出节点的时候删除位置信息
	return ans
}

func (hg *HeapGreater) Resign(node interface{}) { // 重新调整节点位置，做一次heapify和insert即可
	hg.heapify(hg.nodesIndexMap[node])
	hg.insert(hg.nodesIndexMap[node])
}

func  (hg *HeapGreater) Remove(node interface{}) { // 移除指定节点
	replace := hg.nodes[hg.size-1]         // 获取堆最后一个元素用来取代当前要移除的节点
	index := hg.nodesIndexMap[node]        // 获取需要移除的节点的 index 索引信息
	delete(hg.nodesIndexMap, node)         // 删除需要移除的节点的 index 索引信息
	hg.size--                              // 删除需要替换的元素
	if replace != node {                   // 如果替换的节点就是需要删除的节点直接结束
		hg.nodes[index]  = replace         // 用于替换的节点放入删除节点的位置
		hg.nodesIndexMap[replace] = index  // 更新替换节点的位置信息
		hg.Resign(replace)                 // 调整替换节点的位置
	}
}

func (hg *HeapGreater) GetAllElements() []interface{} { // 方便获取所有的堆元素
	ans := make([]interface{}, hg.size)
	copy(ans, hg.nodes)
	return ans
}

func (hg *HeapGreater)Peek() interface{} {             // 查看堆顶的元素
	if hg.size == 0 {
		return nil
	}
	return hg.nodes[0]
}

func (hg *HeapGreater) Size() int {
	return hg.size
}

func (hg *HeapGreater) Empty() bool {
	return hg.size == 0
}

func (hg *HeapGreater) Contain(node interface{}) bool {
	_, ok := hg.nodesIndexMap[node]
	return ok
}

func (hg *HeapGreater) insert(index int) {
	for hg.compare(hg.nodes[index], hg.nodes[(index-1) / 2]) {
		hg.Swap(index, (index-1) / 2)
		index = (index-1) / 2
	}
}

func (hg *HeapGreater) heapify(index int) {
	cur := index
	next := (cur<<1) | 1
	for next < hg.size {
		if next+1 < hg.size && !hg.compare(hg.nodes[next], hg.nodes[next+1]) {
			next = next +1
		}
		if !hg.compare(hg.nodes[cur], hg.nodes[next]) {
			hg.Swap(cur, next)
		} else {
			break
		}
		cur = next
		next = (cur<<1) | 1
	}
}

func (hg *HeapGreater)Swap(index1, index2 int) {
	node1, node2 :=  hg.nodes[index1], hg.nodes[index2]
	hg.nodesIndexMap[node1], hg.nodesIndexMap[node2] = hg.nodesIndexMap[node2], hg.nodesIndexMap[node1]
	hg.nodes[index1], hg.nodes[index2] = hg.nodes[index2], hg.nodes[index1]
}
```

> 简单验证

```go
package heap02

import (
	"fmt"
	"testing"
)

func TestNewHeapGreater(t *testing.T) {
	type Customer struct {
		Id         int
		buy        int
		changeTime int
	}
    // 初始化小根堆
	mgh := NewHeapGreater(10, func(c1 interface{}, c2 interface{}) bool {
		cus1, cus2 := c1.(*Customer), c2.(*Customer) // 需要传入结构体指针，配合使用
		if cus1.buy !=  cus2.buy {
			return cus1.buy <  cus2.buy
		}
		return cus1.changeTime < cus1.changeTime
	})
	cusNum := 10
	cuses := make([]*Customer, cusNum)
	for i:=cusNum; i>0; i-- { // 倒序加入元素
		cuses[i-1] = &Customer{
			Id: i,
			buy: i,
			changeTime: i,
		}
		mgh.Add(cuses[i-1])
	}
	for _, addr := range mgh.GetAllElements() {
		fmt.Printf("%+v ", addr.(*Customer).buy)
		//                    1
		//          2                 5(将变->20)
		//    4          3      9          6
		// 10    7     8
	}
	fmt.Println("\n---------")
	cuses[4].buy = 20
	mgh.Resign(cuses[4])
	// 打印结构体列表的内容
	for _, addr := range mgh.GetAllElements() {
		fmt.Printf("%+v ", addr.(*Customer).buy)
		// 1 2 6 4 3 9 20 10 7 8
		//                    1
		//          2                 6
		//    4          3      9          20(5->20并调整对了位置)
		// 10    7     8
	}
	fmt.Println("\n---------")
	mgh.Remove(cuses[3])
	for _, addr := range mgh.GetAllElements() {
		fmt.Printf("%+v ", addr.(*Customer).buy)
	}
	fmt.Println("\n---------")
	// &buy:1,buy:2,buy:6,buy:4,buy:3,buy:9,buy:20,buy:10,buy:7,buy:8
	for mgh.size > 0 {
		fmt.Println(mgh.Poll())
	}
}
```

### 买卖商品

![](D:\个人项目\github\muxicode.github.io\docs\.vuepress\public\g1_heap_2_strengthen_heap.assets\heap_strengthen_heap4.drawio.png)

给定一个整型数组， []int arr； 和一个布尔类型数组， []boolean op
两个数组一定等长， 假设长度为N， arr门表示客户编号， op门表示客户操作
arr=[3， 3， 1， 2，1，2，5…
op=[T， T，  T,    T,   F,  T,    F…
依次表示：3用户购买了一件商品，3用户购买了一件商品，1用户购买了一件
商品，2用户购买了一件商品，1用户退货了一件商品，2用户购买了一件商品，
5用户退货了一件商品…

得奖系统的规则：

1. 如果某个用户购买商品数为0.但是又发生了退货事件，则认为该事件无效，得奖名单和之前事件时一致，比如例子中的5用户

2. 某用户发生购买商品事件，购买商品数+1.发生退货事件，购买商品数-1

3. 每次都是最多K个用户得奖，K也为传入的参数，如果根据全部规则，得奖人数确实不够K个，那就以不够的情况输出结果

4. 得奖系统分为得奖区和候选区，任何用户只要购买数>0，一定在这两个区域中的一个

5. **购买数最大的前K名用户进入得奖区，在最初时如果得奖区没有到达K个用户，那么新来的用户直接进入得奖区**

6. 如果购买数不足以进入得奖区的用户，进入候选区

7. 如果候选区购买数最多的用户，已经足以进入得奖区，

   该用户就会替换得奖区中购买数最少的用户(大于才能替换)，

   如果得奖区中购买数最少的用户有多个，就替换最早进入得奖区的用户

   如果候选区中购买数最多的用户有多个，机会会给最早进入候选区的用户

8. 候选区和得奖区是两套时间，

   因用户只会在其中一个区域，所以只会有一个区域的时间，另一个没有

   从得奖区出来进入候选区的用户，得奖区时间删除，

   进入候选区的时间就是当前事件的时间(可以理解为arr[和op门中的i)

   从候选区出来进入得奖区的用户，候选区时间删除，

   进入得奖区的时间就是当前事件的时间(可以理解为arr[和op[] 中的i)

9. 如果某用户购买数==0，不管在哪个区域都离开，区域时间删除，

   离开是指彻底离开，哪个区域也不会找到该用户

   如果下次该用户又发生购买行为，产生>0的购买数，

   会再次根据之前规则回到某个区域中，进入区域的时间重记

要求得到任何下标时，得奖区的客户，格式为：

```go
[
    [3],  // 0 时刻
    [3],  // 1 时刻
    ...
]
```

#### 题解

```go

```



