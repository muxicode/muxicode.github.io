# 数据结构

## 字符串

- runtime.stringStrcut 

  ```go
  // runtime/string.go
  type stringStruct struct {
  	str unsafe.Pointer
  	len int
  }
  // reflect/value.go
  type StringHeader struct {
  	Data uintptr
  	Len  int
  }
  ```

- 字符串本质是一个结构体

- Data指针指向底层Byte数组

- Len表示的是Byte数组的长度

  ```
  s := "你好"
  
  sh := (*reflect.StringHeader)(unsafe.Pointer(&s))
  
  fmt.Println(sh.Len) // 6
  ```

### 字符串的编码问题

- 所有的字符串均使用Unicode字符集
- 使用utf-8编码

### Unicode

- 一种统一的字符集
- 囊括了159种文字的144679个字符
- 14万个字符至少需要3个字节表示
- 英文字母均排在前128个 

### UTF-8 

- Unicode 的一种变长格式
- 128 个 US-ASCII字符只需要一个字节编码
- 西方常用字符需要两个字节比如：希腊字母
- 其他字符需要三个字节，如：中、日，韩文

### 字符串的访问

- 对字符串使用len方法得到的是字节数，不是字符数
- 对字符串直接使用下标访问，得到的是字节
- 字符串被range遍历时，被解码程rune类型的字符串
- UTF-8编码解码的算法位于 runtime/utf8.go

### 字符串的切分

- 需要切分时
  - 转为rune数组
  - 切片
  - 转为string

```
s = string([]rune(s)[:3])
```

## 