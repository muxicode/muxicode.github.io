---
title: 最小生成树Kruskal
autoGroup-2-2: 图
---

# 最小生成树Kruskal

![](/advance_2_graph_3_kruskal.assets/graph_kruskal.drawio.png)

> 有向图与无向图，都可以使用最小生成树的算法，以下使用无向图做示例

最小生成树问题就是：

- 以最小的代价将图中的节点都联通，求出此时的权重，或者联通节点的边的集合。
- 或者说是再不破坏联通性的条件下，可以删除一些多余的边，保证删除多余的边后，权重最小。

## 算法流程

1. 将边按权重从小到大排序

   ![](/advance_2_graph_3_kruskal.assets/graph_kruskal_step1.drawio.png)

2. 从小到大遍历每条边，并判断边的两边的点是否已经连通，如果未连通则选择该边加入结果集，如果已经连通则放弃该边。

   ![](/advance_2_graph_3_kruskal.assets/graph_kruskal_step2.drawio.png)

   遍历最小权值边1时，两边的 `A点`与`B点`此时并未连通，所以选择该边，此时 `A点`与`B点`连通，加入连通区，`边1`加入结果集，如下：

   ![](/advance_2_graph_3_kruskal.assets/graph_kruskal-step3.drawio.png)

3. 继续遍历下一小的边，并判断，边两头的点是否连通，如果未连通则选择该边加入结果集，如果已经连通则放弃该边。

   ![](/advance_2_graph_3_kruskal.assets/graph_kruskal_step4.drawio.png)

   此时遍历到边2时，两边的 `B点`与`D点`此时并未连通，所以选择该边，此时 `B点`与`D点`连通，加入连通区，`边2`加入结果集如下：

   ![](/advance_2_graph_3_kruskal.assets/graph_kruskal_step5.drawio.png)

4.  `边3`与`边4`遍历过程重复以上操作，可以得到如下图所示：

   ![](/advance_2_graph_3_kruskal.assets/graph_kruskal_step6.drawio.png)

5. 继续遍历，遍历到`边50`，此时，`C点`与`F点`，已经有由`边3`，`边1`，`边2`，`边4`连通在一起，所以**放弃**`边50`，结果集不变。

   ![](/advance_2_graph_3_kruskal.assets/graph_kruskal_step7.drawio.png)

6. 继续遍历，遍历到`边100`，此时，`C点`与`B点`，已经有由`边3`，`边1`连通在一起，所以**放弃**`边100`，结果集不变。自此，我们遍历完所有的边，收集到结果集，最小权重即为结果集的边的权重相加。

   ![](/advance_2_graph_3_kruskal.assets/graph_kruskal_step8.drawio.png)

## 代码实现

- 该代码中使用基础章节中的[并查集](/algorithm/base_union_set_1)，若不了解该内容，需要先阅读该章节。

```go
/*
	并查集与堆的实现，需要参考对应章节。
*/
func KruskalMinSum(graph Graph) int {
	// 初始化结果权重
	var ans int

	// 获取所有的点，使用点创建并查集
	nodeArr := []interface{}{}
	for _, node := range graph.Nodes {
		nodeArr = append(nodeArr, node)
	}
	// 初始化并查集，用于判断两点是否连通
	nodeUnionSet := union_set.NewUnionSet(nodeArr)
	// 创建小根堆，使遍历的边有序
	smallHeap := heap.NewSmallHeap(len(graph.Edges))
	for edge, _ := range graph.Edges {
		smallHeap.Push(edge)
	}
	// 从小到大遍历所有的边
	for smallHeap.Size() > 0 {
		edge := smallHeap.Pop().(*Edge)
		if !nodeUnionSet.IsSameSet(edge.From, edge.To) {
			// 如果边两头的点不在同一个集合，选择该边，加上该边的权重
			ans += edge.Weight
			// 选择边后，需要将两个点连通
			nodeUnionSet.Union(edge.From, edge.To)
		}
	}
	return ans
}
```

