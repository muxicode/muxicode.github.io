# Python 设计模式

## 1.  引言

> **什么是设计模式**

一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。

面临的一般问题的解决方案

重用代码、让代码更容易被他人理解、保证代码可靠性。

每种模式都描述了一个在我们周围不断重复发生的问题，以及该问题的核心解决方案，这也是设计模式能被广泛应用的原因。

> **GOF**

在 1994 年，由 Erich Gamma、Richard Helm、Ralph Johnson 和 John Vlissides 四人合著出版了一本名为
 Design Patterns - Elements of Reusable Object-Oriented Software
（中文译名：设计模式 - 可复用的面向对象软件元素） 的书，
该书首次提到了软件开发中设计模式的概念。

四位作者合称 GOF（四人帮，全拼 Gang of Four）。他们所提出的设计模式主要是基于以下的面向对象设计原则。



-  对接口编程而不是对实现编程。

* 优先使用对象组合而不是继承。

## 2. 面向对象

> 面向对象三大特性

1. 封装
2. 继承
3. 多态

> java实现多态的三个步骤

1. 子类重写父类的方法
2. 编写方法时，参数使用父类对象，并调用父类定义的方法
3. 运行时，根据实际创建的对象类型动态决定使用哪个方法

```
public class Pepople {
	public void say(){
		System.out.println("我是一个人")
	}
}

public class Man extends People {
	@override
	public void say(){
		System.out.println("我是一个男人")
	}
}

public static void main(String[] args){
	// 不是多态
	Man man1 = new Man();
	man1.Say(); // "我是一个人"
	
	
	// 是多态
	People man = new Man();
	man.Say(); // "我是一个男人"
}
```

> 接口

接口：**若干抽象方法的集合**

作用：限制实现接口的类必须按照给定的调用方式实现这些方法；对高层模块隐藏了类的内部实现；

```
class payment(metaclass=ABCMate):  
       @abstractmethod
       def pay(money):
             pass

class alipay(metaclass=ABCMate):
	   @abstractmethod
       def pay(money):
             print(“阿里支付 %d 元” % money)

class weixinpay(metaclass=ABCMate):
	   @abstractmethod
       def pay(money):
             print(“微信支付 %d 元” % money)
```

## 3. 设计模式

1. 创建型模式(5种)
            **工厂方法模式**、**抽象工厂模式**、**建造者模式**、**单例模式**、原型模式

2. 结构型模型（7种）
            **适配器模式**、**桥模式**、**组合模式**、装饰模式、**外观模式**、享元模式、**代理模式**

3. 行为型模式（11种）
            解释器模式、**责任链模式**、命令模式、迭代器模式、中介者模式、备忘录模式、**观察者模式**、状态模式、**策略模式**、访问者模式、**模板方法模式**  

文档内容包含加粗字体的设计模式；

> **设计原则**

参考链接：https://www.cnblogs.com/dolphin0520/p/3919839.html

1. **单一职责原则**

   一个类只负责一个功能领域中的相应职责，或者可以定义为：就一个类而言，应该只有一个引起它变化的原因。

   原文链接：http://blog.csdn.net/lovelion/article/details/7536542

2. **开闭原则**

   一个软件实体应当对扩展开放，对修改关闭。即软件实体应尽量在不修改原有代码的情况下进行扩展。

   原文链接：http://blog.csdn.net/lovelion/article/details/7537584

3. **里氏代换原则**

   所有引用基类（父类）的地方必须能透明地使用其子类的对象。

   由于使用基类对象的地方都可以使用子类对象，因此**在程序中尽量使用基类类型来对对象进行定义，而在运行时再确定其子类类型，用子类对象来替换父类对象**。

   **里氏代换原则是实现开闭原则的重要方式之一。**

   ```
    (1)子类的所有方法必须在父类中声明，或子类必须实现父类中声明的所有方法。根据里氏代换原则，为了保证系统的扩展性，在程序中通常使用父类来进行定义，如果一个方法只存在子类中，在父类中不提供相应的声明，则无法在以父类定义的对象中使用该方法。
   (2) 我们在运用里氏代换原则时，尽量把父类设计为抽象类或者接口，让子类继承父类或实现父接口，并实现在父类中声明的方法，运行时，子类实例替换父类实例，我们可以很方便地扩展系统的功能，同时无须修改原有子类的代码，增加新的功能可以通过增加一个新的子类来实现。里氏代换原则是开闭原则的具体实现手段之一。
   (3) Java语言中，在编译阶段，Java编译器会检查一个程序是否符合里氏代换原则，这是一个与实现无关的、纯语法意义上的检查，但Java编译器的检查是有局限的。
   ```

   原文链接：http://blog.csdn.net/lovelion/article/details/7540445

4. **依赖倒转原则**

   抽象不应该依赖于细节，细节应当依赖于抽象。换言之，要针对接口编程，而不是针对实现编程。

   开闭原则是目标，里氏代换原则是基础，依赖倒转原则是手段

   原文链接：https://blog.csdn.net/lovelion/article/details/7562783

5. **接口隔离原则**

   **使用多个专门的接口，而不使用单一的总接口，即客户端不应该依赖那些它不需要的接口。**

   ```python
   # 接口隔离
   class Animal(metaclass=ABCMate):     
   	   @abstractmethod
          def walk():
               pass
   
          @abstractmethod
          def swim():
                pass
   
          @abstractmethod
          def fly():
                pass
   
   class dog(Animal):    
          @abstractmethod
          def walk():
                print(“ dog walk” )
   ```

   ```python
   class landAnimal(metaclass=ABCMate):   
   	   @abstractmethod
          def walk():
                pass
   
   class waterAnimal(metaclass=ABCMate):
          @abstractmethod
          def swim():
                pass
   
   class skyAnimal(metaclass=ABCMate):
          @abstractmethod
          def fly():
                pass
   
   class dog(landAnimal):      
   	   @abstractmethod
          def walk():
                print(“ dog walk” )
   
   ```

   原文链接：http://blog.csdn.net/lovelion/article/details/7562842

6. **迪米特法则**

   如果一个系统符合迪米特法则，那么当其中某一个模块发生修改时，就会尽量少地影响其他模块，扩展会相对容易，这是对软件实体之间通信的限制，迪米特法则要求限制软件实体之间通信的宽度和深度。**迪米特法则可降低系统的耦合度，使类与类之间保持松散的耦合关系。**

    迪米特法则还有几种定义形式，包括**：****不要和“陌生人”说话**、**只与你的直接朋友通信**等，在迪米特法则中，对于一个对象，其朋友包括以下几类：

   ​      (1) 当前对象本身(this)；

   ​      (2) 以参数形式传入到当前对象方法中的对象；

   ​      (3) 当前对象的成员对象；

   ​      (4) 如果当前对象的成员对象是一个集合，那么集合中的元素也都是朋友；

   ​      (5) 当前对象所创建的对象。

   ​      任何一个对象，如果满足上面的条件之一，就是当前对象的“朋友”，否则就是“陌生人”。在应用迪米特法则时，一个对象只能与直接朋友发生交互，不要与“陌生人”发生直接交互，这样做可以降低系统的耦合度，一个对象的改变不会给太多其他对象带来影响。

   ​      迪米特法则要求我们在设计系统时，**应该尽量减少对象之间的交互，如果两个对象之间不必彼此直接通信，那么这两个对象就不应当发生任何直接的相互作用，如果其中的一个对象需要调用另一个对象的某一个方法的话，可以通过第三者转发这个调用**。简言之，就是**通过引入一个合理的第三者来降低现有对象之间的耦合度**。

   ​      在将迪米特法则运用到系统设计中时，要注意下面的几点：**在类的划分上，应当尽量创建松耦合的类，类之间的耦合度越低，就越有利于复用，一个处在松耦合中的类一旦被修改，不会对关联的类造成太大波及**；**在类的结构设计上，每一个类都应当尽量降低其成员变量和成员函数的访问权限**；**在类的设计上，只要有可能，一个类型应当设计成不变类**；**在对其他类的引用上，一个对象对其他对象的引用应当降到最低**。

   原文链接：http://blog.csdn.net/lovelion/article/details/7563445

### 3.1 创建型

#### 3.1.1单例

Borg，每次生成实例使用不同空间，但是持有部分相同的变量空间；

```
class Borg:
    __shared_state = { "name": "Gof", "book" : "designPattern" }
    def __init__(self):
        self.x = 1
        self.__dict__ = self.__shared_state

    def sayHello(self):
        print("Hello!")

b = Borg()
b1= Borg()
b.x = 4
print("Borg Obeject 'b' : ", b)
print("Borg Obeject 'b1' : ", b1)
print("Object Obeject 'b' : ", b.__dict__)
print("Object Obeject 'b1' : ", b1.__dict__)
print(b1.x)

# 输出结果
Borg Obeject 'b' :  <__main__.Borg object at 0x0086E7F0>
Borg Obeject 'b1' :  <__main__.Borg object at 0x02B28478>
Object Obeject 'b' :  {'name': 'Gof', 'book': 'designPattern', 'x': 4}
Object Obeject 'b1' :  {'name': 'Gof', 'book': 'designPattern', 'x': 4}
```

装饰器实现

```
def Singleton(cls):
    instances = {}

    def _singleton(*args, **kw):
        if cls not in instances:
            instances[cls] = cls(*args, **kw)
        return instances[cls]

    return _singleton

@Singleton
class MongoHandler(object):
    
    def get(self):
        pass

m = MongoHandler()
m1 = MongoHandler()
print("Borg Obeject 'm' : ", m)
print("Borg Obeject 'm1' : ", m1)
print(type(MongoHandler))

# 输出
Borg Obeject 'm' :  <__main__.MongoHandler object at 0x02BEF598>
Borg Obeject 'm1' :  <__main__.MongoHandler object at 0x02BEF598>
<class 'function'>
```

懒汉实例化

```
class Singleton:
    __instance = None
    def __init__(self):
        if not Singleton.__instance:
            print("__init__method called ..")
        else:
            print("Instance already created:", self.getInstance())
    
    @classmethod
    def getInstance(cls):
        if not cls.__instance:
            cls.__instance = Singleton()
        return cls.__instance

s = Singleton()
s2 = Singleton()
s3 = Singleton()
Singleton.getInstance()
s1 = Singleton()


# 输出
__init__method called ..
__init__method called ..
__init__method called ..
__init__method called ..
Instance already created: <__main__.Singleton object at 0x02B7F3B8>
```

通过元类的方式实现

```
class MetaSingleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if not cls in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Logger(metaclass=MetaSingleton):

    def __init__(self):
        self.x = 1
        self.y = 2
        print("now __init__ !!")

logger1 = Logger()
print(logger1.x)
logger2 = Logger()
logger2.x = 3
logger3 = Logger()
print(logger3.x)
print(logger1, logger2, logger3)

# 输出
now __init__ !!
1
3
<__main__.Logger object at 0x02C1F3B8> <__main__.Logger object at 0x02C1F3B8> <__main__.Logger object at 0x02C1F3B8>
```

元类call可阻断实现类的init方法示例：

```
class MyInt(type):
    def __call__(cls, *args, **kwargs):
        print("*** Here's Myint ***",  args)
        print("*** do you want with objects ***")
        return type.__call__(cls, *args, **kwargs)

class int(metaclass=MyInt):
    def __init__(self):
        self.x = 1
        self.y = 2
        print("init ok !")

int()

# 输出
*** Here's Myint *** ()
*** do you want with objects ***
init ok !
```

mongodb仅连接一次

```
class MetaSingleton(type):
    _instance = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instance:
            cls._instance[cls] = super().__call__(*args, **kwargs)
        return cls._instance[cls]

class MongoService(metaclass=MetaSingleton):
    _connectDb = None
    def connect_mongo(self):
        if not self._connectDb:
            print("Isn't connected !!")
            self._connectDb = "Already Connect !"
        return self._connectDb

a = MongoService().connect_mongo()
a1 = MongoService().connect_mongo()
a2 = MongoService().connect_mongo()

# 输出
Isn't connected !!
```

new 配合 init方法实现

```
class Singleton(object):
    __isInit = None

    def __new__(cls):
        if not hasattr(cls, "instance"):
            cls.__isInit = True
            cls.instance = super().__new__(cls)
        return cls.instance

    def __init__(self):
        if not self.__isInit:
            self.name = "小张"
            self.age = "25"

s = Singleton()
s.name = "老王"
print(s.name)
s1 = Singleton()
print("Object created", s)
print("Object created", s1)
print(s1.name)


# 输出
老王
Object created <__main__.Singleton object at 0x02BDF3B8>
Object created <__main__.Singleton object at 0x02BDF3B8>
老王
```

#### 3.1.2 工厂模式

Factory 有三种变体：

- 简单工程模式 ： 允许接口创建对象，但不会暴露对象的创建逻辑
- 工厂方法模式：语序接口创建对象，但是使用哪个类来创建对象，则是交由子类决定
- 抽象工厂模式：抽象工厂是一个能够创建一系列相关的对象而无需指定/公开其具体类的接口。该模式能提供其他工厂的对象，再起内部创建其他对象。

> 简单工厂模式

**内容：**
不直接向客户端暴露对象创建的细节，而是通过一个简单工厂类来负责创建产品实例；

**角色**

- 工厂角色（Creator）
- 抽象产品角色（Product）
- 具体产品角色（Concrete Product）

**优点：**
隐藏了类的创建需要的参数，简化客户端的使用
增加需求时，客户端不需要修改代码。

**缺点：**
违背了单一职责，将几种工厂的创建都放在一个类里。
当增加新产品时需要修改工厂的代码，违法了开闭原则。

```python
from abc import abstractmethod, ABCMeta
# 抽象产品角色
class payment(metaclass=ABCMeta):
        @abstractmethod
        def pay(money):
             pass

# 具体产品角色
class aliPay(metaclass=ABCMeta):
       def pay(self, money):
             print("阿里支付 %d 元" % money)

class weChartPay(metaclass=ABCMeta):

       def pay(self, money):
             print("微信支付 %d 元" % money)

# 工厂角色
class paymentFactory:   
       def createPayment(self, payKind):
             if payKind == "alipay":
                   return aliPay()
             elif payKind == "weChart":
                   return weChartPay()
             else:
                   raise TypeError("No such payment name of %s” % payKind")

# 客户端
pf = paymentFactory()
p1 = pf.createPayment("alipay")
p2 = pf.createPayment("weChart")
p1.pay(100)
p2.pay(100)


# 输出
# 阿里支付 100 元
# 微信支付 100 元
```

> 3.1.3 工厂方法模式

内容：

定义一个用于创建对象的接口，由子类决定实例化哪一个产品

角色

- 抽象工厂角色（Creator）
- 具体工厂角色（Concrete Creator）
- 抽象产品角色（Product）
- 具体产品角色（Concrete Product）



优点：

- 隐藏了类的创建需要的参数，简化客户端的使用
- 增加需求时，不需要修改旧代码，增加具体产品以及具体工厂的代码即可；

缺点：

- 代码量多，每次增加需求都需要新增工厂以及对应的产品；

```python
from abc import abstractmethod, ABCMeta

# 抽象产品角色
class payment(metaclass=ABCMeta):
    @abstractmethod
    def pay(self, money):
             pass

# 具体产品角色
class aliPay(metaclass=ABCMeta):
    def pay(self, money):
        print("阿里支付 %d 元" % money)

class weChartPay(metaclass=ABCMeta):

    def pay(self, money):
        print("微信支付 %d 元" % money)

# 抽象工厂角色
class paymentFactory:

    @abstractmethod
    def create_payment(self):
        pass

# 具体工厂角色
class aliPayFactory:
    @abstractmethod
    def create_payment(self):
        return aliPay()

class weChartPayFactory:
    def create_payment(self):
        return weChartPay()

# 客户端
alipf = aliPayFactory()
p = alipf.create_payment()
p.pay(100)

wpf = weChartPayFactory()
p = wpf.create_payment()
p.pay(100)

# 输出
# 阿里支付 100 元
# 微信支付 100 元
```

> 抽象工厂模式

抽象工厂模式：创建一系列相关对象，而无需指定具体的类。工厂方法是将创建实例的任务委托给了子类。

内容：

- 定义一个工厂类的接口，让工厂子类创建一系列相关或者相互依赖的对象；


- 例如：生产一部手机，需要手机壳，CPU，操作系统三类对象进行组装，其中每类对象都有不同种类。对每个具体的工程，分别产生一部手机需要的三个对象；

相比工厂方法模式：

- 抽象工厂模式中每一个具体工厂都生产一套产品；

优点：

- 将客户端与类的具体实现相分离
- 每个工厂创建一个完整系列的产品，使得易于交换产品系列；
- 有利于产品的一致性；

缺点：

- 难已支持新种类（抽象）产品

```python
from abc import ABCMeta, abstractmethod

# 抽象产品角色
class CPU(metaclass=ABCMeta):  
    @abstractmethod
    def show_cpu_info():
             pass

class OS(metaclass=ABCMeta):
    @abstractmethod
    def show_OS_info():
             pass

class phoneBox(metaclass=ABCMeta):
    @abstractmethod
    def show_phone_box_info():
             pass

# 具体产品角色
class GaoTongCPU(CPU):
    def show_cpu_info(self):
             print("高通CPU")

class QiLinCPU(CPU):
    def show_cpu_info(self):
             print("麒麟CPU")

class AppleCpu(CPU):
    def show_cpu_info(self):
             print("苹果CPU")

# 具体产品角色
class AnZhuoOS(OS):
       def show_OS_info(self):
             print("安卓系统")

class IosOS(OS):
       def show_OS_info(self):
             print("苹果系统")

# 具体产品角色
class MiPhoneBox(phoneBox):
       def show_phone_box_info(self):
             print("小米手机壳")

class IPhoneBox(phoneBox):
       def show_phone_box_info(self):
             print("苹果手机壳")

class HuaWeiPhoneBox(phoneBox):
       def show_phone_box_info(self):
             print("华为手机壳")

# 抽象工厂角色
class PhoneFactory(metaclass=ABCMeta):
    @abstractmethod
    def create_cpu():
        pass

    @abstractmethod
    def create_os():
        pass

    @abstractmethod
    def create_phone_box():
        pass

# 具体工厂角色
class MiFactory(PhoneFactory):
    def create_cpu(self):
        return GaoTongCPU()

    def create_os(self):
        return AnZhuoOS()

    def create_phone_box(self):
        return MiPhoneBox()

# 具体工厂角色
class IPhoneFactory(PhoneFactory):
    def create_cpu(self):
        return AppleCpu()

    def create_os(self):
        return IosOS()

    def create_phone_box(self):
        return IPhoneBox()


# 客户端
class Phone():
    def __init__(self, cpu=None, os=None, box=None):
        self.cpu = cpu
        self.os= os
        self.box= box

    def show_phone_info(self):
        print("展示手机信息")
        self.cpu.show_cpu_info()
        self.os.show_OS_info()
        self.box.show_phone_box_info()

def create_phone(phoneFactory):
    phone = Phone()
    phone.cpu = phoneFactory.create_cpu()
    phone.os = phoneFactory.create_os()
    phone.box = phoneFactory.create_phone_box()
    return phone 


phone = create_phone(IPhoneFactory())
phone.show_phone_info()


phone = create_phone(MiFactory())
phone.show_phone_info()

# 输出
# 苹果CPU
# 苹果系统
# 苹果手机壳
# 展示手机信息
# 高通CPU
# 安卓系统
# 小米手机壳
```

#### 3.1.3 建造者模式

内容：

- 将一个复制对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。

角色：

- 抽象建造者（Builder）
- 具体建造者（Concrete Builder）
- 指挥者         （Director）
- 产品             （Product） 



建造者模式与抽象工厂模式类似，也用来创建复杂对象。主要区别是建造者模式着重一步步构造对象，而抽象工厂模式着重于 多个系列的产品对象。



优点：

- 隐藏了一个产品的内部结构和装配的过程；
- 将构造代码与表示代码分开；
- 可以对构造过程进行更精细的控制；

```python
from abc import ABCMeta, abstractmethod
# 角色
# 1. 产品
# 2. 建造者
# 3. 控制者


# 产品
class Player:

    def __init__(self, body=None, head=None, arm=None, leg=None):
        self.body = body
        self.head = head
        self.arm  = arm
        self.leg  = leg

    def __str__(self):
        return "人物信息： %s，%s, %s, %s" % (self.body, self.head, self.arm, self.leg)

# 抽象建造者
class PlayerBuilder(metaclass=ABCMeta):

    @abstractmethod
    def build_body(self):
        pass

    @abstractmethod
    def build_head(self):
        pass

    @abstractmethod
    def build_arm(self):
        pass

    @abstractmethod
    def build_leg(self):
        pass

# 具体建造者 SexGril
class SexGrilBuilder(PlayerBuilder):

    def __init__(self):
        self.player = Player()

    def build_body(self):
        self.player.body = "性感身材"

    def build_head(self):
        self.player.head = "漂亮脸蛋"

    def build_arm(self):
        self.player.arm  = "细长胳膊"

    def build_leg(self):
        self.player.leg  = "长腿"

# 具体建造者 SexGril
class MonstorBuilder(PlayerBuilder):

    def __init__(self):
        self.player = Player()

    def build_body(self):
        self.player.body = "肌肉饱满的身躯"

    def build_head(self):
        self.player.head = "狰狞脸蛋"

    def build_arm(self):
        self.player.arm  = "长毛胳膊"

    def build_leg(self):
        self.player.leg  = "长毛腿"

# 控制建造顺序
class PlyaerDirector:

    def build_player(self, builder):
        builder.build_body()
        builder.build_head()
        builder.build_arm()
        builder.build_leg()
        return builder.player

# 客户端代码
builder = SexGrilBuilder()
director = PlyaerDirector()
player = director.build_player(builder)
print(player)


# 输出
# 人物信息： 性感身材，漂亮脸蛋, 细长胳膊, 长腿
```

#### 3.1.4 总结

简单工厂模式和工厂方法模式相比抽象工厂模式和建造者模式来说更简单些，但是抽象工厂模式和建造者模式会更灵活也更复杂；

通常情况下、设计以简单工厂模式或者工厂方法模式开始，当你发现设计需要更大的灵活性时，则向更复杂的设计模式演化。

### 3.2 结构型设计模式

#### 3.2.1 适配器模式

内容：

- 将一个类的接口转换成客户希望的另一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。

两种实现方式：

- 类适配器：使用多继承；
- 对象适配器：使用组合；

角色：

- 目标接口（Target）
- 待适配的类（Adapteed）
- 适配器（Adapter）

适用场景：

- 想使用一个已经存在的类，而它的接口不符合你的要求；
- （对象适配器）想使用一些已经存在的子类，但不可能对每一个都进行子类化以匹配他们的接口。对象适配器可以适配他们父类的接口。

内容：

- 将一个类的接口转换成客户希望的另一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。

两种实现方式：

- 类适配器：使用多继承；
- 对象适配器：使用组合；



方式一：类适配器

```python
from abc import ABCMeta, abstractmethod

class Payment:

    @abstractmethod
    def pay(self, money):
        pass

class AliPay(Payment):

    def pay(self, money):
        print("阿里支付 %d  元" % money)

class WeChartPay(Payment):

    def pay(self, money):
        print("微信支付 %d  元" % money)

class BankPay:
    
    def coast(self, money):
        print("银联支付 %d  元" % money)

class NewBankPay(Payment, BankPay):

    def pay(self, money):
        self.coast(money)

p = NewBankPay()
p.pay(100)

# 输出
# 银联支付 100  元
```

方式二：对象适配器

```python
from abc import ABCMeta, abstractmethod

class Payment:

    @abstractmethod
    def pay(self, money):
        pass

class AliPay(Payment):

    def pay(self, money):
        print("阿里支付 %d  元" % money)

class WeChartPay(Payment):

    def pay(self, money):
        print("微信支付 %d  元" % money)

class BankPay:
    
    def coast(self, money):
        print("银联支付 %d  元" % money)

class ApplePay:
    
    def coast(self, money):
        print("苹果支付 %d  元" % money)

class PaymentAdaptor(Payment):

    def __init__(self, adaptClass):
        self.adaptClass = adaptClass()

    def pay(self, money):
        self.adaptClass.coast(money)

p1 = PaymentAdaptor(ApplePay)
p2 = PaymentAdaptor(BankPay)
p1.pay(100)
p2.pay(100)

# 输出
# 苹果支付 100  元
# 银联支付 100  元
```

#### 3.2.2 桥模式

内容：

- 将一个事物的两个维度分离，使其都可以独立变化；

应用场景：

- 当事物拥有两个维度上的表现，两个维度都可能拓展时。

优点：

- 抽象和实现相分离
- 优秀的拓展能力



角色：

- 抽象（Abstraction）
- 细化抽象（RefinedAbstraction）
- 实现者（Implementor）
- 具体实现者（ConcreteImplementor）

应用场景：

- 当事物拥有两个维度上的表现，两个维度都可能拓展时。

优点：

- 抽象和实现相分离
- 优秀的拓展能力

```python
from abc import ABCMeta, abstractmethod


# 抽象细节类
class Shape(metaclass=ABCMeta):

    def __init__(self, color):
        self.color = color

    @abstractmethod
    def draw(self):
        pass

# 抽象实现类
class Color(metaclass=ABCMeta):

    @abstractmethod
    def paint(self, shape):
        pass

# 具体细节类
class Rectangle(Shape):
    name = "正方形"
    def draw(self):
        self.color.paint(self)

class Cirl(Shape):
    name = "圆形"
    def draw(self):
        self.color.paint(self)

# 具体实现类
class Red(Color):
    
    def paint(self, shape):
        print("红色的 %s" % shape.name)


class Blue(Color):
    
    def paint(self, shape):
        print("蓝色的 %s" % shape.name)


# 客户端
picture = Cirl(Blue())
picture.draw()

# 输出
# 蓝色的 圆形
```

#### 3.2.3 组合模式

内容：

- 将对象组合成树形结构已表示“部分-整体”的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。

角色：

- 抽象节点（Component）
- 叶子节点（Leaf）
- 复合组件（Composite）
- 客户端（Client）

适用场景：

- 表示对象的“部分-整体”层次结构(特别是结构是递归的)
- 希望用户忽略组合对象的不同，用户统一地使用组合结构中的所有对象。

优点：

- 定义了包含基本对象和组合对象的类层次结构。
- 简化客户端代码，即客户端代码可以一致的使用组合对象和单个对象。
- 更容易增加新类型的组件。

```python
from abc import ABCMeta, abstractmethod

# 抽象组件
class Graphic(metaclass=ABCMeta):
    @abstractmethod
    def draw(self):
        pass

# 叶子组件
class Point(Graphic):
    def __init__(self, x, y):
        self.x = x
        self.y = y 

    def __str__(self):
        return "点[%s, %s]" % (self.x, self.y)

    def draw(self):
        print(str(self))

# 叶子组件
class Line(Graphic):
    def __init__(self, p1, p2):
        self.p1 = p1
        self.p2 = p2

    def __str__(self):
        return "线段[%s, %s]" % (self.p1, self.p2)

    def draw(self):
        print(str(self))

# 复合组件
class Picture(Graphic):
    def __init__(self, iterable):
        self. children = []
        for g in iterable:
            self.add(g)


    def add(self, graphic):
        self.children.append(graphic)

    def draw(self):
        print("-----------复合图形start---------------")
        for g in self.children:
            g.draw()
        print("-----------复合图形end---------------")


p1 = Point(1, 2)
p2 = Point(3, 4)
L1 = Line(p1, p2)
L1.draw()
pc1 = Picture([p1, p2, L1])
pc2 = Picture([p1, L1])
pc3 = Picture([pc1, pc2])
pc3.draw()

# 输出
# 线段[点[1, 2], 点[3, 4]]
# -----------复合图形start---------------
# -----------复合图形start---------------
# 点[1, 2]
# 点[3, 4]
# 线段[点[1, 2], 点[3, 4]]
# -----------复合图形end---------------
# -----------复合图形start---------------
# 点[1, 2]
# 线段[点[1, 2], 点[3, 4]]
# -----------复合图形end---------------
# -----------复合图形end---------------
```

#### 3.2.4 外观模式

内容：

- 为子系统中的一组接口提供一个一致的界面，外观模式定义了一个高层接口，这

  个接口使得这一子系统更加容易使用。

角色：

- 外观（facade）
- 子系统类（subsystem classes）

优点：

- 减少系统相互依赖
- 提高了灵活性
- 提高了安全性

```python

class CPU():
    def run(self):
        print("CPU 开始运行!")

    def stop(self):
        print("CPU 停止运行")

class Disk():
    def run(self):
        print("Disk 开始工作!")

    def stop(self):
        print("Disk 停止工作")

class Memory():
    def run(self):
        print("Memory 开始通电!")

    def stop(self):
        print("Memory 停止通电")

class Computer:

    def __init__(self):
        self.cpu = CPU()
        self.disk = Disk()
        self.memroy = Memory()

    def run(self):
        self.cpu.run()
        self.disk.run()
        self.memroy.run()


    def stop(self):
        self.cpu.stop()
        self.disk.stop()
        self.memroy.stop()

# client
computer = Computer()
computer.run()
computer.stop()

# 输出
# CPU 开始运行!
# Disk 开始工作!
# Memory 开始通电!
# CPU 停止运行
# Disk 停止工作
# Memory 停止通电
```

#### 3.2.5 代理模式

内容：

- 为其他对象提供一种代理以控制对这个对象的访问。

应用场景：

- 远程代理：为远程对象提供代理
- 虚代理：根据需要创建很大的对象
- 保护代理 ：控制原始对象的访问，用于对象有不同访问权限时。

优点：

- 远程代理：可以吟唱独享位于远程地址空间的事实。
- 虚代理：可以进行优化，例如根据要求创建对象。
- 保护代理：允许在方位一个对象时有一些附加的内务处理。

角色：

- 抽象实体（Subject）
- 实体（Real Subject）
- 代理（Proxy）

```
from abc import ABCMeta, abstractclassmethod

class Subject(metaclass=ABCMeta):
    @abstractclassmethod
    def get_content(self):
        pass

    @abstractclassmethod
    def set_content(self):
        pass

class RealSubject(Subject):

    def __init__(self, filename):
        self.filename = filename
        f = open(filename, "r", encoding="utf-8")
        self.content = f.read()
        f.close()

    def get_content(self):
        return self.content

    def set_content(self):
        f = open(self.filename, "w", encoding="utf-8")
        f.write(content)
        f.close()

# 此时的客户端
rs = RealSubject("test.txt")
content = rs.get_content()
print(content)


class VirtualProxy(Subject):

    def __init__(self, filename):
        self.filename = filename
        self.rs = None
        print("没有读文件")
    
    def get_content(self):
        if not self.rs:
            self.rs = RealSubject(self.filename)
        return self.rs.get_content()

    def set_content(self):
        if not self.rs:
            self.rs = RealSubject(self.filename)
        return self.rs.get_content()    

class ProtectedProxy(Subject):

    def __init__(self, filename):
        self.rs = RealSubject(filename)

    def get_content(self):
        return self.rs.get_content()

    def set_content(self):
        raise PermissionError("无写入权限")

rs = VirtualProxy("./test.txt")
print("开始读文件")
content = rs.get_content()
print(content)

# 输出
# hello!
# 没有读文件
# 开始读文件
# hello!
```

### 3.3 行为型设计模式

#### 3.3.1 责任链模式

内容：

- 使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递请求，直到有一个对象处理它为止。

角色：

- 抽象处理者（Handler）
- 具体处理者（Concrete Handler）
- 客户端（Client）

适用场景：

- 有多个对象可以处理一个请求，哪个对象处理由运行时决定
- 在不明确接收者的情况下，向多个对象中的一个提交一个请求

优点：

- 降低耦合度：一个对象无需知道是其他哪一个对象处理其请求。

```python
from abc import ABCMeta, abstractmethod

class Handler(metaclass=ABCMeta):

    @abstractmethod
    def handler_leave(self, day):
        pass

class GeneralManager(metaclass=ABCMeta):

    def handler_leave(self, day):
        if day <= 10:
            print("总经理准假 %d 天" % day)
        else:
            print("你还是辞职吧")


class DepartmentManager(metaclass=ABCMeta):
    
    def __init__(self):
        self.next = GeneralManager()

    def handler_leave(self, day):
        if day <= 5:
            print("部门经理准假 %d 天" % day)
        else:
            print("部门经理权限不足")
            self.next.handler_leave(day)

class ProjectManager(metaclass=ABCMeta):

    def __init__(self):
        self.next = DepartmentManager()

    def handler_leave(self, day):
        if day <= 2:
            print("项目经理准假 %d 天" % day)
        else:
            print("项目经理权限不足") 
            self.next.handler_leave(day)
            

# Clinet
day = 11
h = ProjectManager()
h.handler_leave(day)

# 输出
# 项目经理权限不足
# 部门经理权限不足
# 你还是辞职吧
```

#### 3.3.2 观察者模式

内容：

- 定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于他的对象都得到通知并被自动更新。观察者模式又称”发布-订阅“模式

角色：

- 抽象主题（Subject）
- 具体主题（Concrete Subject）---发布者
- 抽象观察者（Observer）
- 具体观察者（Concrete Observer）---订阅者

适用场景：

- 当一个抽象模型有两个方面，其中一个方面依赖于另外一个方面。将这两者封装

  在独立对象各种以使他们可以各自独立地改变和复用。

- 当一个对象的改变需要同时改变其他对象，而不知道具体有多少对象有待改变。

- 当一个对象必须通知其他对象，而它有不能假定其他对象是谁，换言之，你不希

  望这些对象是紧密耦合的。

优点：

- 目标和观察者的抽象耦合最小
- 支持广播通信

```python
# coding: utf-8

from abc import abstractmethod, ABCMeta

# 抽象订阅者
class Observer(metaclass=ABCMeta):

    @abstractmethod
    def update(self, notice):
        pass

# 抽象发布者
class Notice:

    def __init__(self):
        self.Observer = []

    def attach(self, obs):
        self.Observer.append(obs)

    def detach(self, obs):
        self.Observer.remove(obs)

    def notify(self):
        for obs in self.Observer:
            obs.update(self)

# 发布者
class StaffNotice(Notice):
    
    def __init__(self):
        super().__init__()
        self.__message = None

    @property
    def message(self):
        return self.__message

    @message.setter
    def message(self, message):
        self.__message = message
        self.notify()

# 订阅者
class Staff(Observer):

    def __init__(self):
        self.message = None

    def update(self, notice):
        self.message = notice.message

# 客户端
noticer = StaffNotice()
s1 = Staff()
s2 = Staff()
noticer.attach(s1)
noticer.attach(s2)
noticer.message = "通知中秋放假！"
print(s1.message)
print(s2.message)
noticer.detach(s2)
noticer.message = "回来上班！"
print(s1.message)
print(s2.message)

# 输出
通知中秋放假！
通知中秋放假！
回来上班！
通知中秋放假！
```

#### 3.3.3 策略模式

内容：

- 定义一些列算法，把它们一个个封装起来，并且使他们可以互相替换。本模式使得算法可以独立于使用它们的客户而变化；

角色：

- 抽象策略（Strategy）
- 具体策略（Concrete Strategy）
- 上下文（Context）

优点：

- 定义了一系列可重用的算法和行为
- 消除了一些条件语句

- 可以提供相同行为的不同实现

缺点：

- 用户必须了解不同策略

```python
# coding = utf-8

from abc import abstractmethod, ABCMeta


# 抽象策略
class Strategy(metaclass=ABCMeta):

    @abstractmethod
    def excute(self, data):
        pass

# 策略
class FastStrategy(Strategy):

    def excute(self, data):
        print("执行 较快的 算法策略")

class SlowStrategy(Strategy):

    def excute(self, data):
        print("执行 较慢的 算法策略")

# 上下文
class Context:

    def __init__(self, strategy, data):
        self.strategy = strategy
        self.data = data

    def set_strategy(self, Strategy):
        self.strategy = Strategy

    def do_strategy(self, data):
        self.strategy.excute(data)

# 客户端
f = FastStrategy()
s = SlowStrategy()
data = "[....]"
ctx = Context(f, data)
ctx.do_strategy(data)
ctx.set_strategy(s)
ctx.do_strategy(data)

# 输出
# 执行 较快的 算法策略
# 执行 较慢的 算法策略
```

#### 3.3.4 模板方法模式

内容：

- 定义一个操作中的算法骨架，而将一些步骤延迟到子类可以不改变一个算法的结构即可从定义该算法的某些特定的步骤

角色：

- 抽象类（Abstract Class）：定义抽象的原子操作（钩子操作）；实现一个模板方法作为算法的骨架；
- 具体类（Concrete Class）：实现原子操作

适用场景：

- 一次性实现一个算法的不变部分
- 各个子类的公共行为应该被提取出来并集中到一个公共的父类中以避免代码的重复
- 控制子类拓展

```python
#coding: utf-8

import time
from abc import ABCMeta, abstractmethod

class Window(metaclass=ABCMeta):

    @abstractmethod
    def start(self):
        pass

    @abstractmethod
    def repaint(self):
        pass

    @abstractmethod
    def stop(self):
        pass

    def run(self):
        self.start()
        while True:
            try:
                self.repaint()
                time.sleep(1)
            except KeyboardInterrupt:
                break
        self.stop()

class MyWindow(Window):

    def __init__(self, msg):
        self.msg = msg

    def start(self):
        print("窗口开始运行")
    
    def stop(self):
        print("窗口结束运行")

    def repaint(self):
        print(self.msg)      
        
# 客户端
MyWindow("hello...").run()

# 输出
# 窗口开始运行
# hello...
# hello...
# hello...
# hello...
# 窗口结束运行
```

