---
title: 二分及其拓展-4-局部最小问题
autoGroup-1: 🌱阶段一：初出茅庐🌱 
---

# 局部最小问题

在一个数组中相邻两个位置的数一定不相等，在这样的数组中找到一个局部最小并返回。

- 例一：

  ![image-20230909180656266](/g1_bisection_4_local_min.assets/image-20230909180656266.png)

- 例二：

  ![image-20230909180708306](/g1_bisection_4_local_min.assets/image-20230909180708306.png)

- 例三：

  ![image-20230909180846459](/g1_bisection_4_local_min.assets/image-20230909180846459.png)

## 算法步骤

1. 对于例一、例二所在的边界做特殊处理，如果边界处直接为局部最小，直接返回即可
2. 排除边界后，数组的数据状况一定是左边下降，右边上升的趋势，此时使用二分法，取到中间的位置`mid`的数
3. 如果`mid-1`大于`mid`，且`mid+1`也大于`mid`的值，则`mid`为局部最小，直接返回。
4. 如果`mid-1`小于`mid`的位置，则左边呈下降趋势，左边界往mid扩，否则有边界往`mid`阔。

## 代码



```go
func FindLocalMinIndex(arr []int) int {
   if arr == nil || len(arr) < 2 {
      return -1
   }
   if arr[0] < arr[1] {
      return 0
   }
   if arr[len(arr)-2] > arr[len(arr)-1] {
      return len(arr) - 1
   }
   left, right, mid := 0, len(arr)-1, 0
   for left < right {
      mid = left + ((right - left) >> 1)
      if arr[mid-1] > arr[mid] && arr[mid+1] > arr[mid] {
         return mid
      } else if  arr[mid-1] < arr[mid] {
         right = mid - 1
      } else {
         left = mid + 1
      }
   }
   return left
}
```

