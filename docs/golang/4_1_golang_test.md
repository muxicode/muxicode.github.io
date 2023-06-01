---
title: 构建测试
autoGroup-4: 测试相关
---
# Go测试相关

👉你是不是也遇到过这样的问题：你想要给`golang`的代码写测试用例，但是你的代码里面有一个对象依赖了另外一个对象，而那个对象的行为又太复杂，你只想测试其中的一部分逻辑，怎么办呢？😭

👉别担心，今天我就来教你三种简单有效的方法，让你轻松写出高质量的测试用例，让你的代码更健壮、更可靠！😊

- 👉方法一：使用接口和模拟。如果被依赖的对象实现了某个接口，那么你可以在测试用例中创建一个模拟的对象，实现同样的接口，并且只定义你需要触发的逻辑。然后把模拟的对象作为参数或者字段传递给依赖的对象，替换掉原来的对象。这样你就可以控制被依赖对象的行为，只测试你关心的部分。👍

- 👉方法二：使用函数类型和闭包。如果被依赖的对象是一个函数类型，那么你可以在测试用例中定义一个闭包函数，只包含你需要触发的逻辑。然后把闭包函数作为参数或者字段传递给依赖的对象，替换掉原来的函数。这样你也可以控制被依赖对象的行为，只测试你关心的部分。👍

- 👉方法三：使用第三方库和反射。如果被依赖的对象是一个私有的变量或者方法，那么你可以使用一些第三方库，例如monkey或testify/mock，来修改或者覆盖它们的值或者行为。这种方法需要使用反射技术，可能会影响性能和安全性，所以要谨慎使用。👍

## 函数类型和闭包

👉`golang`中使用函数类型和闭包的一个例子是：

👉首先，我们要知道什么是函数类型和闭包。函数类型就是把函数当作一种类型，可以赋值给变量，也可以作为参数或者返回值。闭包就是一个函数，它可以引用它外部作用域的变量，这样就可以实现一些特殊的功能。👍

👉下面我们来看看这个例子：

- 假设我们有一个函数类型`Adder`，它表示一个可以接受一个整数并返回一个整数的函数。
- 假设我们有一个函数`MakeAdder`，它接受一个整数x，并返回一个`Adder`类型的函数，这个函数可以将输入的整数加上`x`。这个函数就是一个闭包，因为它引用了外部的变量x。
- 假设我们有一个函数`Sum`，它接受一个`Adder`类型的函数和一个整数切片，然后对切片中的每个元素调用该函数，并返回结果的总和。

👉代码如下：

```go
// 定义一个函数类型
type Adder func(int) int

// 定义一个返回闭包的函数
func MakeAdder(x int) Adder {
  return func(y int) int {
    return x + y
  }
}

// 定义一个接受闭包作为参数的函数
func Sum(f Adder, nums []int) int {
  sum := 0
  for _, n := range nums {
    sum += f(n)
  }
  return sum
}

// 在测试用例中使用闭包
func TestSum(t *testing.T) {
  // 创建一个闭包，将输入加上10
  add10 := MakeAdder(10)
  // 创建一个测试数据
  nums := []int{1, 2, 3, 4, 5}
  // 调用Sum函数，并传入闭包和测试数据
  result := Sum(add10, nums)
  // 验证结果是否正确
  if result != 65 {
    t.Errorf("Expected 65, got %d", result)
  }
}
```

## 接口和模拟

👉`golang`中使用接口和模拟的一个例子是：

👉首先，我们要知道什么是接口和模拟。接口就是一种抽象的类型，它定义了一组方法，但是不指定具体的实现。模拟就是一种实现了接口的类型，它可以模仿真实的对象的行为，但是可以自定义一些逻辑，方便测试。👍

👉下面我们来看看这个例子：

- 假设我们有一个接口`Downloader`，它表示一个可以下载文件的对象，它有一个`Download`方法，接受一个文件名，并返回文件的大小。
- 假设我们有一个函数`DownloadFile`，它接受一个`Downloader`类型的对象和一个文件名，然后调用该对象的`Download`方法来下载文件，并返回文件的大小。
- 假设我们有一个结构体`HTTPDownloader`，它实现了`Downloader`接口，并且使用`http.Get`方法来下载文件。
- 假设我们有一个结构体`MockDownloader`，它也实现了`Downloader`接口，并且只返回一个固定的文件大小。

👉代码如下：

```go
// 定义一个接口
type Downloader interface {
  Download(string) (int, error)
}

// 定义一个函数，接受一个接口类型的参数
func DownloadFile(d Downloader, filename string) (int, error) {
  return d.Download(filename)
}

// 定义一个结构体，实现接口
type HTTPDownloader struct{}

func (h *HTTPDownloader) Download(filename string) (int, error) {
  resp, err := http.Get(filename)
  if err != nil {
    return 0, err
  }
  defer resp.Body.Close()
  data, err := ioutil.ReadAll(resp.Body)
  if err != nil {
    return 0, err
  }
  return len(data), nil
}

// 定义另一个结构体，模拟接口
type MockDownloader struct{}

func (m *MockDownloader) Download(filename string) (int, error) {
  return 1000, nil // 模拟返回1000字节
}

// 在测试用例中使用模拟
func TestDownloadFile(t *testing.T) {
  // 创建一个模拟对象
  mock := &MockDownloader{}
  // 调用DownloadFile函数，并传入模拟对象和测试数据
  size, err := DownloadFile(mock, "test.txt")
  // 验证结果是否正确
  if err != nil {
    t.Errorf("Unexpected error: %v", err)
  }
  if size != 1000 {
    t.Errorf("Expected size: %d, got: %d", 1000, size)
  }
}
```

## 第三方库和反射

👉`golang`中使用第三方库和反射的一个例子是：

👉首先，我们要知道什么是第三方库和反射。第三方库就是一些其他开发者编写的代码包，可以提供一些额外的功能，让我们的开发更方便。反射就是一种在运行时动态获取或修改对象的类型、值、方法等信息的技术。👍

👉下面我们来看看这个例子：

- 假设我们有一个结构体`Foo`，它有一个私有的方法bar，表示打印一些信息。
- 假设我们有一个函数`TestFooBar`，它想要测试`Foo`的`bar`方法，但是无法直接调用它，因为它是私有的。
- 使用第三方库`bouk/monkey`，可以在运行时修改或者覆盖私有方法的行为，使得可以调用它或者检查它的输出。

👉代码如下：

```go
// 定义一个结构体
type Foo struct{}

// 定义一个私有的方法
func (f *Foo) bar() {
  fmt.Println("Hello from bar")
}

// 定义一个测试用例
func TestFooBar(t *testing.T) {
  // 创建一个Foo对象
  f := &Foo{}
  // 使用monkey库来覆盖bar方法
  var output string
  monkey.PatchInstanceMethod(reflect.TypeOf(f), "bar", func(_ *Foo) {
    output = "Hello from mock"
  })
  // 调用bar方法
  f.bar()
  // 验证输出是否正确
  if output != "Hello from mock" {
    t.Errorf("Expected: %s, got: %s", "Hello from mock", output)
  }
}
```

