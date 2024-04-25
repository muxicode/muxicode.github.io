# 玩转递归实及AI实践篇

![](/1_recursion_ai.assets/1714053829201.png)

## 递归的执行过程

有一颗二叉树：

![](/1_recursion_ai.assets/325cfuf7s9fk12utres.png)

下面代码的执行过程是怎么样的？

```go
func TestF(t *testing.T) {
    // 建立二叉树
	root := &TreeNode{Value:"a"}
	root.Left = &TreeNode{Value:"b"}
	root.Right = &TreeNode{Value:"c"}
	root.Left.Left= &TreeNode{Value:"e"}
	root.Left.Right= &TreeNode{Value:"f"}
	root.Right.Left= &TreeNode{Value:"g"}
	root.Right.Right= &TreeNode{Value:"h"}
    // 传入根节点
	F(root)
}
```

```go
type TreeNode struct {
	Value string
	Left  *TreeNode
	Right *TreeNode
}

func F(root *TreeNode) {
	if root == nil {
		return
	}
	// 1. 第一次来到当前节点 root
	F(root.Left)
	// 2. 第二次来到当前节点 root
	F(root.Right)
	// 3. 第三次来到当前节点 root
}
```

可视化：

![img](/1_recursion_ai.assets/323vclg3mps1u1zkrtw.png)



## 递归在二叉树上的应用

二叉树是一种常见的数据结构，其节点最多有两个子节点：左子节点和右子节点。在对二叉树进行遍历时，我们有三种常见的方式：

1. **前序遍历（Pre-order Traversal）：** 任何子树的处理顺序都是，先头节点、再左子树、然后右子树
2. **中序遍历（In-order Traversal）：** 任何子树的处理顺序都是，先左子树、再头节点、然后右子树
3. **后序遍历（Post-order Traversal）：** 任何子树的处理顺序都是，先左子树、再右子树、然后头节点

[参考文章链接](https://muxicode.github.io/algorithm/g1_data_struct_binary_tree_1_recursive_traversal.html#%E5%85%88%E5%BA%8F%E9%81%8D%E5%8E%86)

## 递归套路模板

### 文件夹目录上的使用

文件目录树：

```go
// 主函数
func (p *Parser) Parse(localDirPath string) { 
    pathList := dir.ToPathList(localDirPath)
    p.PreProcess(pathList, []string{}, utility.GetUuidByString(pathList[len(pathList)-1]), 0)
}

func (p *Parser) PreProcess(
    path []string, // 建议添加，根据需要
    ids []string,  // 业务参数
    myId string,   // 业务参数
    endLayer int   // 业务参数
) bool {
	if !dir.IsDir(dir.ToPathStr(path)) {
		// 递归终止条件，子节点处理
		return 返回值
	}
	// 文件夹路径
	pathStr := dir.ToPathStr(path)
	files := dir.GetFiles(pathStr)
	for _, v := range files {
        // 记录路径  ---- 非常有用，方便定位问题
		path = append(path, v)
		ids = append(ids, myId)
		isHasCase = p.PreProcess(path, ids, utility.GetUuidByString(myId+v), endLayer) || isHasCase
        // 路径回退
		path = path[:len(path)-1]
		ids = ids[:len(ids)-1]
	}
	return isHasCase
}
```

### 字典格式上的使用

#### 需求简介

![](/1_recursion_ai.assets/配置文件递归.drawio.png)

#### GPT代码

提示词：

~~~markdown
我有一个VUE2+TS的项目，现在有一个需求：

需要识别字符串中@{xxx}的数量，举个例子：

```
"asdfsadf@{xxx}adfasdf@{yyy}df@{xxx}"
```

我需要得到的结果是一个对象：

```
{
	@{xxx}: 2
	@{yyy}: 1
}
```

请你根据需求帮我完善代码

```
public getTextVariables(locationNodeInput: string): Record<string, number> {
    // 再这里完善代码，可以拆分为多个函数
    return {};
}
```
~~~

获取设备所有类型的选择项示例：

```typescript
    public static getEnvConfigDeviceTypeKeyKeys(envId: string, targetType: string, targeteKey: string) {
        const curConfig = this.envConfigs[envId]
        const uniqueKeys: Set<string> = new Set();
        // 遍历数据对象
        for (const key in curConfig) {
            if (curConfig.hasOwnProperty(key)) { // 遍历属性
                const device = curConfig[key];   // 找到所有设备
                if (device.type === targetType) { // 找到符合条件的设备
                    for (const deviceKey in device) { // 遍历符合条件的设备的属性
                        if (device.hasOwnProperty(deviceKey) && deviceKey==targeteKey) { // 找到目标属性
                            const targeteKeyMap = device[targeteKey] // 获取到目标属性的map
                            for (const deviceKey in targeteKeyMap) { // 遍历目标属性的map将key获取到
                                uniqueKeys.add(deviceKey);
                            }
                        }
                    }
                }
            }
        }
        // 将 Set 转换为数组并返回
        return Array.from(uniqueKeys);
    }
```

如果是属性呢？即使是同一类设备因为有自定义属性，所以可能同一类设备的属性字段有些有有些没有，有的话还能继续嵌套属性，代码如果这么写，如何维护？

#### 模板代码

```typescript
    // 主函数合并有值的属性
	public static mergeDevicesFeildsConfig(envId: string) {
        let devicesFeildsMap = {} 
        const curConfig = this.envConfigs[envId]
        const path: string[] = [] // 记录路径信息
        for (let deviceId of Object.keys(curConfig)) { // 遍历所有设备
            let device = curConfig[deviceId]
            path.push(device[TYPE]) // 路径信息为设备类型
            this.mergeFeildProcess(device["attr"], devicesFeildsMap, path) // 递归处理
            path.pop()
        }
        this.devicesMergeEnvConfigs[envId] = devicesFeildsMap // 设置缓存，便于值查询
        return devicesFeildsMap
    }

    private static mergeFeildProcess(deviceAttrs: any, devicesFeildsMap: any, path: string[]) {
        if (deviceAttrs == undefined) {// 异常防护，有些设备没有attr 或为null的字段，如：BizCode
            // 代码异常的时候直接打印path可以定位问题字段，而不是抓瞎
            return
        }
        for (let attr of Object.keys(deviceAttrs)) { // 循环遍历所有的属性
            if (typeof deviceAttrs[attr] !== 'object' || Array.isArray(deviceAttrs[attr])) { // 如果不是对象或是列表类型，收集value并终止
                path.push(attr)
                this.setDevicesFeildsMapByPath(path, deviceAttrs[attr], devicesFeildsMap)
                path.pop()
            } else { // 还是属性，不需要处理，继续深入
                path.push(attr)
                this.mergeFeildProcess(deviceAttrs[attr], devicesFeildsMap, path)
                path.pop()
            }
        }
    }

    private static setDevicesFeildsMapByPath(path: string[], value: any, devicesFeildsMap: any) { // 根据path信息，将我们收集的值设置到设备字段映射中
        let strValue = this.stringifyOrReturn(value)
        let curMap = devicesFeildsMap // 从根map开始根据path，深入，填充value值
        for (let i=0; i<path.length; i++) {
            let key = path[i]
            if (i === path.length - 1) { // 最后一级的时候，填充值
                if (!curMap[key]) { // 不存在的时候
                    curMap[key] = [strValue]
                } else {
                    if (!curMap[key].includes(strValue)) {
                        curMap[key].push(strValue)
                    }
                }
            } else {  //非最后一级的时候，补充路径
                if (!curMap[key]) {
                    curMap[key] = {} 
                }
                curMap = curMap[key]
            }
        }
    }
```

#### 没有设计怎么办？

设定角色：

```markdown
# 角色
你是一名VUE2+TS项目开发的专家。你阅读过所有软件开发的相关书籍，如《clean code》、《领域驱动设计》、《代码重构》、《设计模式》等。你熟练掌握面向对象编程，并能根据需求场景选择使用合适的设计模式。

## 技能
### 技能1：项目开发
- 根据用户的需求，进行VUE2+TS项目的开发。

### 技能2：代码优化
- 使用《clean code》中的原则，让你的代码整洁，易读。

### 技能3：领域驱动设计
- 运用《领域驱动设计》的理念，明确业务模型，以产生更具有价值的软件。

### 技能4：代码重构
- 根据《代码重构》的方法，不析构软件的外在行为的前提下，改变其内部结构。

### 技能5：设计模式的运用
- 阅读过《设计模式》，根据需求场景选择使用合适的设计模式。

## 限制
- 只讨论与Vue2+TS项目开发相关的问题。
- 始终遵守《clean code》、《领域驱动设计》、《代码重构》、《设计模式》等书中的原则和准则。
- 无法面对面与用户进行交流，所有的交流必须通过文字进行。
```

再给提示词：

~~~markdown
我有一个VUE2+TS的项目，现在有一个需求：

需要识别字符串中@{xxx}的数量，举个例子：

```
"asdfsadf@{xxx}adfasdf@{yyy}df@{xxx}"
```

我需要得到的结果是一个对象：

```
{
	@{xxx}: 2
	@{yyy}: 1
}
```

请你根据需求帮我完善代码

```
public getTextVariables(locationNodeInput: string): Record<string, number> {
    // 再这里完善代码，可以拆分为多个函数
    return {};
}
```
~~~

结果：

> 先返回：

```
明白了！如果你有任何关于Vue2+TS项目开发的问题或者需要帮助，随时告诉我！
```

> 再返回：

好的，我可以帮你完成这个需求。根据你的描述，我们可以编写一个函数来实现字符串中"@{name}"的替换。你希望代码整洁易读，我们可以遵循《clean code》的原则，尽量拆分为多个函数，每个函数负责一个明确的任务。我们也可以考虑使用正则表达式来匹配"@{name}"这样的模式。以下是一个可能的实现：

```typescript
public deleteCodeTextVariable(locationNodeInput: string): string {
    return this.replaceVariablesWithEmptyString(locationNodeInput, "@{name}");
}

private replaceVariablesWithEmptyString(input: string, variablePattern: string): string {
    const regex = new RegExp(variablePattern, 'g');
    return input.replace(regex, '');
}
```

## 两份config找不同

题目：网管配置文件，有两个版本，想找出两份配置不同的参数，以及对应的路径。

## 开发小妙招

- 平时使用`GPT`时记录`promt`提示词，做好分类，遇到同样的问题，快速解决
  - [ 前端Prompt助手](https://gitee.com/add-ice-ice/knowledge-accumulation/blob/master/%E5%89%AF%E4%B8%9A/%E5%89%8D%E7%AB%AFPrompt%E5%8A%A9%E6%89%8B.md)
- 如果可以打造一条机器人的**自动化流水线**
  - [AI提效创意释放](https://www.bilibili.com/video/BV1kr42137bb/?spm_id_from=333.880.my_history.page.click)
  - [工作流示意图](https://www.bilibili.com/video/BV1u64y1J7CX/?spm_id_from=333.880.my_history.page.click&vd_source=7b691a60937c49cb5bf1441dc26e6ade)
  - [工作流创建教程](https://www.bilibili.com/video/BV1qq421c7rH/?spm_id_from=333.337.search-card.all.click&vd_source=7b691a60937c49cb5bf1441dc26e6ade)