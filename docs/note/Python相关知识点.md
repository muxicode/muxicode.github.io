# Python 相关知识点

## 1. 装饰器

### 1.1 原理

函数式编程中，函数为一等公民。而以函数为返回值也成为高阶函数，而装饰器的实现，就实现的方式是高阶函数。当然还用到了闭包；

示例代码：

```python
import time

"""
    1. 无其他参数：
        函数面添加 @PrintRunTime 为语法糖，实际相当于执行：
        func = PrintRunTime(func)
    2. 需要添加参数：
        函数面添加 @Repeate(10) 为语法糖，实际相当于执行：
        func = Repeate(10)(func)
    3. python自带装饰器：
        如person类中所示，可将方法设为属性@property、@age.setter、@age.deleter，或者静态方法@staticmethod等；
"""

def PrintRunTime(func):
    def run_func_record_time(*args, **kwargs):
        print("start time: %s" % time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())))
        func(*args, **kwargs)
        time.sleep(1)
        print("start time: %s" % time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())))
    return run_func_record_time

def Repeate(times):
    def repeateFunc(func):
        def doSomething(*arg, **kwargs):
            for x in range(times):
                print("run time: %d" % x)
                func(*arg, **kwargs)
                print("run end: %d" % x)
        return doSomething
    return repeateFunc


class Person:
    def __init__(self,name,age):
        self.name = name
        if type(age) is int:
            self.__age = age
        else:
            print( '你输入的年龄的类型有误,请输入数字')

    @property
    def age(self):
        return self.__age

    @age.setter
    def age(self,a):
        '''判断,你修改的年龄必须是数字'''
        if type(a) is int:
            self.__age = a
        else:
            print('你输入的年龄的类型有误,请输入数字')

    @age.deleter
    def age(self):
        del self.__age

    @PrintRunTime
    def sayhello(self):
        print("hello!")

    @Repeate(3)
    def sayHi(self):
        print("Hi!")


p1 = Person('帅哥',20)
print(p1.age)
p1.age = "30"
p1.age = 30
print(p1.age)
del p1.age
p1.sayhello()
p1.sayHi()

# 输出
20
你输入的年龄的类型有误,请输入数字
30
start time: 2021-09-16 14:10:13
hello!
start time: 2021-09-16 14:10:14
run time: 0
Hi!
run end: 0
run time: 1
Hi!
run end: 1
run time: 2
Hi!
run end: 2
```

### 1.2 应用

> 失败重试

调用示例

```python
@retries_on_exception(maxTries=2, intervalTime=2)
def abc1:

@retries_on_exception(2, self._reconnection, collection)
def abc2:
```

模块代码

```python
import logging
import time


def retries_on_exception(maxTries, hook=None, hookArg=None, hookGrainSize=1,
                         exceptions=(Exception,), intervalTime=0):
    def dec(func):
        def innner(*args, **kwargs):
            hookGrainSizeInit = hookGrainSize
            tries = list(range(maxTries))
            tries.reverse()
            for triesRemaining in tries:
                hookGrainSizeInit = hookGrainSizeInit - 1
                try:
                    return func(*args, **kwargs)
                except exceptions:
                    _deal_retry_exception(maxTries, hook, hookArg, func, triesRemaining, hookGrainSizeInit, hookGrainSize)
                    if intervalTime != 0:
                        time.sleep(intervalTime)
                else:
                    break
        return innner
    return dec


def _deal_retry_exception(maxTries, hook, hookArg, func, triesRemaining, hookGrainSizeInit, hookGrainSize):
    if triesRemaining > 0:
        if hookGrainSizeInit == 0:
            hookGrainSizeInit = hookGrainSize
            if hook is not None:
                if hookArg is not None:
                    hook(hookArg)
                else:
                    hook()
    else:
        logging.error('try ' + str(maxTries) + ' times, but excute ' + func.__name__ + ' is still fail')
        raise
```



## 2. 理解RESTful

> Representational State Transfer  表现层状态转移

**首先为什么要用RESTful结构呢？**

REST描述的是在网络中client和server的一种交互形式；REST本身不实用，实用的是如何设计

大家都知道"古代"网页是前端后端融在一起的，比如之前的PHP，JSP等。在之前的桌面时代问题不大，但是近年来移动互联网的发展，**各种类型的Client层出不穷，RESTful可以通过一套统一的接口为 Web，iOS和Android提供服务。**另外对于广大平台来说，比如Facebook platform，微博开放平台，微信公共平台等，它们不需要有显式的前端，只需要一套提供服务的接口，于是RESTful更是它们最好的选择。

> 在RESTful架构

1. Server提供的RESTful API中，URL中只使用名词来指定资源，原则上不使用动词。

2. 用HTTP协议里的动词来实现资源的添加，修改，删除等操作。即通过HTTP动词来实现资源的状态扭转：
   GET 用来获取资源，
   POST 用来新建资源（也可以用于更新资源），
   PUT 用来更新资源，

   比如：
   DELETE [http://api.qc.com/v1/](https://link.zhihu.com/?target=http%3A//api.qc.com/v1/friends)friends: 删除某人的好友 （在http parameter指定好友id）
   POST [http://api.qc.com/v1/](https://link.zhihu.com/?target=http%3A//api.qc.com/v1/friends)friends: 添加好友
   UPDATE [http://api.qc.com/v1/profile](https://link.zhihu.com/?target=http%3A//api.qc.com/v1/profile): 更新个人资料

   禁止使用： GET [http://api.qc.com/v1/deleteFriend](https://link.zhihu.com/?target=http%3A//api.qc.com/v1/deleteFriend)

3. Server和Client之间传递某资源的一个表现形式，比如用JSON，XML传输文本，或者用JPG，WebP传输图片等。当然还可以压缩HTTP传输时的数据（on-wire data compression）。

4. 用 HTTP Status Code传递Server的状态信息。比如最常用的 200 表示成功，500 表示Server内部错误等。

Web端不再用之前典型的PHP或JSP架构，而是改为前段渲染和附带处理简单的商务逻辑（比如AngularJS或者BackBone的一些样例）。Web端和Server只使用上述定义的API来传递数据和改变数据状态。格式一般是JSON。iOS和Android同理可得。由此可见，Web，iOS，Android和第三方开发者变为平等的角色通过一套API来共同消费Server提供的服务。

## 3. time模块

### 2.1 当前时间搓格式化

```python
time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
注意：
time.strftime 的第二个参数需要类型是 time struct 类型
time.localtime() 接收时间搓，生成time struct
```

### 2.2 格式化时间成时间搓

```python
t = time.strptime('2020-11-13 15:13:59', '%Y-%m-%d %H:%M:%S') 
生成time struct，需要转化成时间搓
可调用，time.mktime(t), 生成时间搓
```

