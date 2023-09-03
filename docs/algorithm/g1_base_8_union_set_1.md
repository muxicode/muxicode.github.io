---
title: 并查集-1-并查集
autoGroup-1: 🌱阶段一：初出茅庐🌱
---

# 并查集

它提供了一种有效的方式来管理一组不相交的集合，并支持合并集合和🔍查找元素所属集合的操作。
并差集的主要操作有两个🔀： 

- 合并（Union）：将两个不相交的集合合并为一个集合。
- 查找（IsSameSet）：判断两个元素✨✨是否为同一集合。

## 场景说明

我们有五个同学，这几个同学一开始互相都不认识，各自属于不同的集合。

![](/base_union_set_1.assets/union_set.drawio.png)

当`A`与`B`两个同学认识后，则这两个同学合并到同一个`集合1`

![](/base_union_set_1.assets/union_set_1.drawio.png)

当`C`与`D`两个同学认识后，则这两个同学合并到同一个`集合2`

![](/base_union_set_1.assets/union_set2.drawio.png)

一个`集合1`下的`A同学`认识`集合2`下的`D同学`后，这两个集合内的同学可以互相认识，这两个集合需要合并为新集合`集合3`。

![](/base_union_set_1.assets/union_set3.drawio.png)

此时，`A同学`、`B同学`、`C同学`、`D同学`同属于一个集合。

需要实现一个数据结构，该数据结构初始化可以获取到所有元素，该结构需要有两个方法，

- 一个是`Union(A,B)`，可以将两个元素及背后的集合进行合并。
- 一个是`IsSameSet(A,B)`，可以判断两个元素是否属于同一个集合。

要求：时间复杂度尽可能低。

## 算法流程

我们还是以上述场景作为例子，来说明我们的算法流程。

1. 起初所有的同学都是各自为一个集合，每个同学都持有指向自身集合的跟节点。

   ![](/base_union_set_1.assets/union_set_example1.drawio.png)

2. 此时当`A同学`与`B同学`两个同学认识后，则这两个同学合并到同一个集合，合并前判断两个集合的的大小，由小的集合向大的集合合并，此时`A同学`与`B同学`集合大小相同，怎样合并都可以。以下让`B同学`向`A同学`的集合合并。合并的时候，只需要将`B同学`所指向的集合的根节点指向`A同学`所指向的集合的根节点。此时两个同学属于同一个集合，且集合大小由`1`变为`2`。

   ![](/base_union_set_1.assets/union_set_example2.drawio.png)

3. 如何判断`A同学`与`B同学`是否属于同一个集合？判断两个同学是否属于同一个集合，需要沿着每个同学所持有的指向找到自身结合的根节点，判断两个根节点是否为同一个节点，如果相同，则两个同学属于同一个集合。注意：根节点持有的指向指向自身，根据这个条件可以识别根节点。

## 代码实现

```go
package union_set_common

import "container/list"

func NewCommonUnionSet(values []interface{}) UnionSet {
	elementMap := make(map[interface{}]Element)
	parentMap := make(map[Element]Element)
	setSizeMap := make(map[Element]int)
	for _, value := range values {
		elementMap[value] = Element{value: value}
		parentMap[elementMap[value]] = elementMap[value]
		setSizeMap[elementMap[value]] = 1
	}
	return UnionSet{
		ElementMap: elementMap,
		ParentMap: parentMap,
		SetSizeMap: setSizeMap,
	}
}

type UnionSet struct {
	ElementMap map[interface{}]Element
	ParentMap  map[Element]Element
	SetSizeMap map[Element]int
}

type Element struct {
	value interface{}
}

func (u *UnionSet)IsSameSet(value1, value2 interface{}) bool {
	if u.Contain(value1) && u.Contain(value2) {
		return  u.FindHead(value1)== u.FindHead(value2)
	}
	return false
}

func (u *UnionSet)Contain(value interface{}) bool {
	_, ok := u.ElementMap[value]
	return ok
}

func (u *UnionSet)FindHead(value interface{}) Element {
	e := u.ElementMap[value] // 找到对应的元素
	pathStack := list.New()
	// 查找节点
	for u.ParentMap[e] != e {
		pathStack.PushBack(e)
		e = u.ParentMap[e]
	}
	// 路径扁平化，将路径上的元素都直接指向集合根节点，提升查找速度
	for pathStack.Len() != 0 {
		p := pathStack.Remove(pathStack.Back()).(Element)
		u.ParentMap[p] = e
	}
	return e
}

func (u *UnionSet) Union(value1, value2 interface{}) {
	if u.Contain(value1) && u.Contain(value2) {
		value1Head, value2Head := u.FindHead(value1), u.FindHead(value2)
		if value1Head == value2Head {
			return
		}
		// 找到大的集合，将小集合向大集合合并
		big, small := value1Head, value2Head
		if u.GetSetSize(big) < u.GetSetSize(small) {
			big, small = small, big
		}
		// 合并集合
		u.ParentMap[small] = big
		u.SetSizeMap[big] = u.GetSetSize(big) + u.GetSetSize(small)
		delete(u.SetSizeMap, small)
	}
}

func (u UnionSet)GetSetSize(root Element) int {
	return u.SetSizeMap[root]
}
```

调试代码

```go
package union_set_common


import (
	"fmt"
	"testing"
)

func TestUnionSet(t *testing.T) {
	values := []interface{}{1,2,3,4,5,6,7}
	u := NewCommonUnionSet(values)

	fmt.Println(u.IsSameSet(1, 2))
	u.Union(1, 2)
	fmt.Println(u.IsSameSet(1, 2))
	u.Union(1, 3)
	fmt.Println(u.IsSameSet(1, 3))
	u.Union(4, 3)
	//u.Union(4, 5)
	u.Union(5, 6)
	u.Union(7, 6)
	fmt.Println(u.IsSameSet(1, 7))
}
```



## 复杂度分析

在并差集中，路径压缩和加大小集合优化可以显著提高 find 和 union 操作的效率。它们对于单次操作来说，并不能使时间复杂度达到常数级别的 O(1)，但可以将时间复杂度降低到近似于常数级别的水平。

具体来说：

- 路径压缩是通过在执行 find 操作时将节点直接连接到根节点上，减少了树的高度。这样可以使得后续的 find 操作更加高效，因为树的高度被大大减小了。路径压缩的时间复杂度是接近于 O(1)。
- 加大小集合优化是为了减少合并操作时树的深度增加的问题。通过记录每个根节点下的子节点数量，将节点较少的树合并到节点较多的树上，以保持树的平衡。这样可以进一步减小树的高度，提高了 union 操作的效率。

综合考虑路径压缩和加大小集合优化，对于一系列的 find 和 union 操作，平均时间复杂度可以近似为 O(α(n))，其中 α(n) 是 Ackermann 函数的反函数，增长极其缓慢，可以视为常数级别。

因此，尽管并差集的单次操作的时间复杂度并非严格的 O(1)，但在实际应用中，它的效率通常被认为是非常高的，可以满足大多数场景的要求。