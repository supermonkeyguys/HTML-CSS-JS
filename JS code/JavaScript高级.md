# ***细枝末节***

***JavaScript高级:***

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-07_22-41-05.png)

## JavaScript函数this指向

### 1.this绑定规则



***普通函数的 `this` 在执行时绑定，而箭头函数的 `this` 在定义时绑定。***



***函数在调用时，JavaScript会默认给this绑定一个值***

***this的绑定 和 定义位置(编写的位置)没有关系***

***this的绑定 和 调用方式以及调用的位置有关系***

***this是在运行时被绑定***



#### 1.1默认绑定

```javascript
//定义函数
function foo(){ 
    console.log("foo:",this);
}
//1.直接调用
foo();//默认绑定 
//2.函数定义在对象中，但是独立调用
var obj = {
    name："why",
    bar:function(){
        console.log("bar:",this)
    }
}

var baz = obj.bar;
baz();//默认绑定

//3.高阶函数(通过传入一个参数内部再调用)
function test(fn){
    fn();
}
test(obj.bar);

//4.在严格模式下,独立调用的函数中的this指向都是undefined(开头加上“use strict”)
//独立函数调用指向windows

//2.通过对象(不指向windows)
var obj = {name:"why"};
obj.aaa = foo;
```



#### 1.2隐式绑定

```javascript
function foo(){
    console.log("foo:",this);
}

var obj = {
    bar : foo
}
//由obj发起,this与obj绑定(隐式--JS引擎内部隐式把obj与this绑定)
obj.bar();
```



#### 1.3new绑定

```javascript
//1.创建新的空对象
//2.将this指向这个空对象
//3.执行函数体中的代码
//4.没有显示返回空对象时,默认返回这个对象
function foo(){
    console.log("foo:",this)
    this.name = "Code"
}
new foo();
```



#### 1.4显式绑定(apply/call/bind)

```javascript
function foo(){
    console.log("foo:",this)
}

var obj = {
    name:"Cookie"
}

foo.call(obj)
foo.call(123)
foo.call("Code")
foo.call(undefined)
```



![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-09_20-32-24.png)



### 2.apply/call/bind

```javascript
//------(apply/call/bind补充)------

function fo(name,age,height){
    console.log("foo：",this)
    console.log("参数：",name,age,height)
}

//apply(数组)
//第一个参数：绑定this
//第二个参数：传入额外的实参，以数组的形式
fo.apply("apply",["Cookie",99,180])

//call(参数列表)
//第一个参数：绑定this
//参数列表：后续参数以多参数的形式传递，会作为实参
fo.call("call","GG-bond",99,160)
//JavaScript中的所有函数都可以使用call和apply方法
//如果第一个参数未指向声明默认——指向windows

//bind(了解)
// 可以将fo函数中的this绑定在obj身上 并且不将函数添加在obj上
function fk(name,age,height,address){
    console.log("fk:",this)
    console.log("Element:",name,age,height,address)
}

var obj = {
    name:"Cookie"
}
//也可以绑参数
var bar = fk.bind(obj,"Code",99,180);
bar("CN") // this -> obj
```



### 3.this绑定优先级

```javascript
		// function foo(){
        //     console.log("foo:",this)
        // }

        //显式绑定 > 隐式绑定
        // var obj = {
        //     fn:foo
        // }
        // obj.fn.apply("Cookie")

        // bind > 默认绑定
        // var bar = foo.bind("Cookie")
        // var obj = {
        //     name:"GG-bond",
        //     baz:bar
        // }
        // obj.baz()

        //new绑定 > 隐式绑定
        // var obj = {
        //     name:"Cookie",
        //     fn:function() {
        //         console.log("foo:",this)
        //         console.log("foo:",this === obj)
        //     }
        // }
        // new obj.fn()

        //new不可以和apply/call一起使用

        // new绑定 > bind绑定
        function foo() {
            console.log("foo:",this)
        }

        var bindFn = foo.bind("Cookie")
        new bindFn()

		function foo(){
            console.log("foo:",this)
        }

        var bindFn = foo.bind("GG-bond") 

        bindFn.call("Cooike")

//1.new
//2.bind
//3.apply/cal
//4.隐式绑定
//5.默认绑定
```



### 4.绑定之外的情况

```javascript
		// "use strict"
        
        // function foo(){
        //     console.log("foo:",this)
        // }

        // //在传入null或者undefined时 会使用默认绑定
        // //在严格模式下 会原封输出null和undefined
        // foo.call("Cookie")
        // foo.call(null)
        // foo.call(undefined)

        // 间接函数引用(垃圾代码)
        // var obj1 = {
        //     name:"Cookie",
        //     foo: function(){
        //         console.log("foo:",this)
        //     }
        // }
        // var obj2 = {
        //     name:"obj2"
        // }

        // obj2.foo = obj1.foo
        // obj2.foo()
```



### 5.箭头函数的使用

***箭头函数中不绑定this(箭头函数中没有this,arguments)***

***不能使用 new 构造函数***

***如果在箭头函数中调用this时，则会跳出箭头函数作用域，到全局作用域中找(默认windows)***

```javascript
        // () => {}
        setTimeout(() => {
            console.log("setTimeOut")
        },3000)

        var names = ["Cookie","GG-bond","LOL"]
        // 1.只有一个参数可以去除小括号
        names.forEach(item => {
            console.log(item)
        })
        // 2.如果函数体中只有一条执行代码{}可以省去(return除外)
        names.forEach(item => console.log(item))

        // 3.return 也可以省掉 但在箭头后的内容将全部自动return
        var numbers = [78,90,21,213]
        var filterNumbers = numbers.filter(item => item % 2 === 0)
        console.log(filterNumbers)
        //只有一行代码时,这行代码的表达式结果会作为函数的返回值默认返回
        var arrFn = () => 123
        console.log(arrFn())

        // 4.如果默认返回值是一个对象, 那么这个对象必须加()
        // ！！react 中多用 redux
        var objFn = ({name:"Cookie"})
        console.log(objFn)

        var nums = [4,5,6,7,8,9]
        var result = nums.filter(item => item % 2 === 0)
        .map(item => item * item)
        .reduce((prevValue,item) => prevValue + item) 

        console.log(result)

		//指向obj
		var obj = {
            name:"popguys",

            fo: function() {
                
                var bar = () => {
                    console.log("bar:",this)
                }
                return bar
            }
        }

        var fn = obj.fo()
        fn.apply("aaa")

		//指向windows
```



***箭头函数中没有this，apply调用无效，this会向上层作用域寻找，所以最后会绑定全局作用域中的windows***

<img src="C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-10_16-35-57.png" style="zoom:67%;" />

### 6.this面试题分析

```javascript
		var name = "window"

        var person1 = {
            name:"person1",
            foo1: function(){
                console.log(this.name)
            },
            foo2: () => console.log(this.name),
            foo3: function(){
                return function(){
                    console.log(this.name)
                }
            },
            foo4: function(){
                // console.log(this)
                return () => {
                    console.log(this.name)
                }
            }
        }

        var person2 = {name:"person2"}

        person1.foo1()
        person1.foo1.call(person2)
        console.log("-----------")
        person1.foo2()
        person1.foo2.call(person2)
        console.log("-----------")
        person1.foo3()()
        person1.foo3.call(person2)()
        person1.foo3().call(person2)
        console.log("-----------")
        person1.foo4()()
        person1.foo4.call(person2)()
        person1.foo4().call(person2)
```



```javascript
		var name = "window"
		function fn(name){
            this.name = name
            this.foo1 = function(){
                console.log(this.name)
            }
            this.foo2 = () => console.log(this.name)
            this.foo3 = function(){
                return function() {
                    console.log(this.name)
                }
            }
            this.foo4 = function(){
                return () => {
                    console.log(this.name)
                }
            }
        }

        var person1 = new fn("person1")
        var person2 = new fn("person2")

        

        person1.foo1()
        person1.foo1.call(person2)
        console.log("-----------")
        person1.foo2()
        person1.foo2.call(person2)
        console.log("-----------")
        person1.foo3()()
        person1.foo3.call(person2)()
        person1.foo3().call(person2)
        console.log("-----------")
        person1.foo4()()
        person1.foo4.call(person2)()
        person1.foo4().call(person2)
```



```javascript
function person(name){
            this.name = name
            this.obj = {
                name:"obj",
                foo1: function () {
                    return function () {
                        console.log(this.name)
                    }
                },
                foo2: function() {
                    return () => {
                        console.log(this.name)
                    }
                }
            }
        }

        var person1 = new person("person1")
        var person2 = new person("person2")

        person1.obj.foo1()()
        person1.obj.foo1.call(person2)()
        person1.obj.foo1().call(person2)

        person1.obj.foo2()()
        person1.obj.foo2.call(person2)()
        person1.obj.foo2().call(person2)
```



## 浏览器渲染原理

输入 URL 后网页的请求显示过程如下：

1. **DNS 解析**：浏览器先检查本地 DNS 缓存，若没有找到对应记录，就向本地 DNS 服务器发起查询请求，将域名转换为 IP 地址。
2. **建立 TCP 连接**：浏览器与目标服务器通过三次握手建立 TCP 连接，为数据传输创建可靠通道。
3. **发送 HTTP 请求**：浏览器向服务器发送 HTTP（S）请求报文，包含请求方法、URL、协议版本等信息。
4. **服务器处理请求**：服务器接收请求后，根据请求内容进行处理，如查询数据库、调用脚本等，生成响应数据。
5. **返回 HTTP 响应**：服务器将处理结果封装成 HTTP 响应报文，包含状态码、响应头和响应体，返回给浏览器。
6. **接收并解析响应**：浏览器接收响应，先根据状态码判断请求是否成功，然后解析响应头获取相关信息，再解析响应体中的 HTML、CSS、JavaScript 等资源。
7. **渲染页面**：浏览器根据解析的 HTML 构建 DOM 树，结合 CSS 构建渲染树，计算元素的布局和样式，最后绘制出页面。
8. **关闭连接**：数据传输完成，浏览器和服务器根据情况关闭 TCP 连接 。

### 1.网页解析过程

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-10_20-26-02.png)



### 2.浏览器渲染流程

在了解合成层如何提升性能之前，先简单了解下浏览器渲染页面的基本流程：

1. **构建 DOM 树和 CSSOM 树**：浏览器解析 HTML 和 CSS 代码，分别构建 DOM（文档对象模型）树和 CSSOM（CSS 对象模型）树。
2. **布局（Layout）**：结合 DOM 树和 CSSOM 树，计算每个元素在页面上的位置和大小。
3. **绘制（Paint）**：将元素的视觉样式（如颜色、边框、背景等）绘制到一个或多个位图中。
4. **合成（Compositing）**：将各个绘制好的位图按照正确的层级和位置组合成最终的页面图像显示在屏幕上。



![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-10_20-31-09.png)

***link元素不会阻塞DOM Tree的构建过程，但是会阻塞Render Tree的构建过程（因为Render Tree在构建时，需要对应的CSSOM Tree）***

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-10_20-32-54.png)



### 3.回流和重绘解析

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-10_20-55-30.png)

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-10_21-11-46.png)

在 CSS 中，以下属性会形成新的合成层：

1. **3D 变换属性**：如`translate3d`、`translateZ`等。
2. **视频、画布和内联框架元素**：如`video`、`canvas`、`iframe`等。
3. **具有`will-change`属性的元素**：该属性可以提示浏览器哪些属性将要改变，从而提前进行优化。
4. **对`opacity`、`transform`、`filter`、`backdropfilter`应用了`animation`或者`transition`的元素**。
5. **具有`position: fixed`的元素**。
6. **`opacity`小于 1 的元素**。
7. **具有 CSS 滤镜属性的元素**。
8. **具有 CSS 遮罩属性的元素**。
9. **具有 CSS 混合模式属性且值不为`normal`的元素**。
10. **具有 CSS 反射属性的元素**。
11. **具有 CSS 列数属性且值不为`auto`或者具有 CSS 列宽属性且值不为`auto`的元素**。

 

### 4.合成和性能优化



#### ***合成层工作原理***

浏览器会将页面中的元素划分到不同的层中，每个层都可以独立进行绘制和处理。合成层就是这些独立的层，它们可以在 GPU（图形处理单元）上进行渲染，而不是依赖 CPU。GPU 具有强大的并行计算能力，非常适合处理图形渲染任务。

***合成层提高页面渲染性能的具体方式***

##### 1. 减少重绘和回流的影响

- **重绘（Repaint）**：当一个元素的外观发生改变，但没有影响到布局信息（如颜色、透明度变化）时，浏览器会将该元素的外观重新绘制到对应的位图上。
- **回流（Reflow）**：当 DOM 的变化影响了元素的布局信息（元素的的宽度、高度、边距等几何信息），浏览器需要重新计算元素在视口内的位置和大小，将其安放到界面中的正确位置，这个过程叫做回流。
- **合成层的作用**：如果一个元素位于单独的合成层中，当它发生重绘或回流时，只会影响该合成层本身，而不会影响到其他层。这样就避免了对整个页面进行重绘和回流，大大减少了渲染的工作量。例如，一个使用 `transform` 进行动画的元素，如果它在单独的合成层中，`transform` 变换不会触发重排和重绘，只需要在合成阶段进行处理。

##### 2. 利用 GPU 加速渲染

- CPU 在处理图形渲染任务时，往往会受到多线程调度、内存带宽等因素的限制，处理效率相对较低。而 GPU 专门设计用于处理大规模的并行计算任务，在图形渲染方面具有天然的优势。
- 合成层可以将渲染任务交给 GPU 处理。GPU 能够高效地处理纹理、变换等操作，快速完成合成层的绘制和组合。例如，在进行 3D 变换（如 `translate3d`、`rotate3d` 等）时，GPU 可以直接对合成层进行硬件加速，实现流畅的动画效果。

##### 3. 独立的层更新和组合

- 不同的合成层可以独立进行更新。当页面中的某个元素发生变化时，只需要更新对应的合成层，而不需要重新绘制整个页面。然后，浏览器可以快速地将各个更新后的合成层组合在一起，形成最终的页面图像。
- 这种独立更新和组合的方式使得浏览器能够更高效地处理页面变化，特别是在处理复杂页面和动画效果时，能够显著提升页面的响应速度和流畅度。例如，在一个包含多个动画元素的页面中，每个动画元素都可以位于独立的合成层，它们的动画可以独立运行和更新，互不干扰。



![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-10_22-20-12.png)



### 5.defer和async属性

#### defer:

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-10_22-46-01.png)

#### async:

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-11_20-49-00.png)



***AI：***

`defer`和`async`是 HTML 中`<script>`标签的两个属性，用于控制脚本的加载和执行行为。

#### 相同点

- 都是用于优化 JavaScript 文件的加载，防止阻塞 HTML 解析。
- 脚本文件都会在 HTML 解析的同时并行加载，不阻塞 HTML 的解析。

#### 不同点

- 执行顺序：
  - `defer`：脚本会在 HTML 解析完成后（即 DOM 完全构建后，但在`DOMContentLoaded`事件触发之前）执行。如果页面中有多个带有`defer`属性的脚本，它们会按照在 HTML 中出现的顺序依次执行。
  - `async`：脚本会在加载完成后立即执行，不受 HTML 解析的影响。脚本的执行时机取决于加载完成的时间，而非 HTML 解析完成的时间。多个带有`async`属性的脚本之间没有固定的执行顺序。
- 适用场景：
  - `defer`：适用于需要依赖 DOM 或其他脚本的场景，例如统计代码、广告脚本等。这些脚本必须在 DOM 完全构建后才能正确运行。
  - `async`：适用于独立运行的脚本，例如第三方统计工具、广告代码、行为分析等。这些脚本不需要依赖 DOM 或其他脚本，可以加快页面加载速度。
- 脚本依赖性：
  - `defer`：支持脚本依赖关系，保证执行顺序。
  - `async`：不支持脚本依赖关系，可能导致执行顺序错误。

#### 总结

如果脚本需要在 HTML 解析完成后运行，并且多个脚本之间存在依赖关系，建议使用`defer`；如果脚本是独立的，不依赖其他脚本或 DOM，可以使用`async`来优化加载速度。



# Javascript运行原理

### ***ES***

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-11_21-30-10.png)



## 1.V8引擎

***JS引擎在执行代码之前，会在堆内存内创建一个全局对象：Global Object(GO)***

​	该对象 **所有的作用域（scope）** 都可以访问

​	内部包含 **Data，Array，String，Number，setTimeout，setInterva**l 等

​	还有一个 **window属性** 指向自己

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-11_21-04-51.png)



![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-11_21-22-35.png)



## 2.JS执行上下文

### 组成部分

每个执行上下文主要由三部分组成：

1. **变量对象（Variable Object）**：用于存储变量和函数的定义。在全局执行上下文中，变量对象就是全局对象（在浏览器环境中是 `window` 对象）；在函数执行上下文中，变量对象是活动对象（Activation Object），它包含了函数的参数、局部变量和内部函数。
2. **作用域链（Scope Chain）**：由多个变量对象组成，用于查找变量和函数的定义。作用域链保证了变量和函数的作用域规则，当访问一个变量时，JavaScript 引擎会先在当前执行上下文的变量对象中查找，如果找不到，就会沿着作用域链向上查找，直到找到该变量或到达全局执行上下文。
3. **`this` 指针**：`this` 指针指向当前执行上下文的对象。`this` 的值在不同的执行上下文中可能不同，它取决于函数的调用方式。



### 创建阶段：

**1.创建变量对象**：初始化变量和函数的定义。变量会被初始化为 `undefined`，函数会被完整地定义。

**2.建立作用域链**：将当前执行上下文的变量对象与外层执行上下文的变量对象链接起来，形成作用域链。

**3.确定 `this` 指针的值**：根据函数的调用方式确定 `this` 指针的指向。



### 上下文类型：

**全局执行上下文**：这是最外层的执行上下文，在浏览器环境中，全局执行上下文就是 `window` 对象。全局执行上下文在程序开始时创建，直到程序结束才销毁。

**函数执行上下文**：每当调用一个函数时，就会创建一个新的函数执行上下文。函数执行上下文在函数调用结束后销毁。

**`eval` 执行上下文**：`eval` 函数可以动态执行 JavaScript 代码，每次调用 `eval` 函数时，会创建一个新的 `eval` 执行上下文。不过，由于 `eval` 存在安全风险，一般不建议使用。



## 3. 

#### 认识VO对象

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-11_22-36-51.png)



## 4.函数代码执行过程

**在先前全局代码会先将函数代码解析好，在函数被调用时会创建一个新的VO对象（也叫做AO(Active Object)，会被推入执行上下文栈（堆内存）的栈顶）和函数关联，之后会执行函数中的代码先解析（函数内部中的 所创建的东西开始为undefined 还会携带arguments（有参数argument就有值，反之）），之后开始给值一一赋值，之后代码正常顺序执行**

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-12_19-49-44.png)



## 5.作用域和作用域链

***函数作用域与 函数的定义位置 有关，还会受到 块级作用域 、 闭包 、`with` 语句和 `eval` 函数等因素的影响。***

### ***作用域链：***

***在函数内部，如果要访问一个变量，会首先在函数的局部作用域中查找，如果没有找到，就会向上一级作用域查找，直到全局作用域。***

```javascript
var x = 10;  // 全局变量

function outer() {
    var x = 20;  // 局部变量
    function inner() {
        console.log(x);  // 输出20，因为在局部作用域中找到了x
    }
    inner();
}

outer();
console.log(x);  // 输出10，因为在全局作用域中找到了x
```



```javascript
var message = "Global Message"

function foo(){
    var name = "foo"
    function bar(){
        console.log(name)
        function text(){
            console.log(message)
        }
        return text
    }
    return bar
}

var bar = foo()
var text = bar()
text()
```

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-12_21-06-25.png)

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-12_21-16-42.png)

 



# Javascript内存管理和闭包

### ***认识内存管理：***

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-12_22-29-32.png)



## 1.Javascript内存管理

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-12_22-30-51.png)



### V8内存管理：

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-13_20-05-28.png)



## 2.*垃圾回收机制算法（面试）

***垃圾回收器会定期检查内存中的对象，找出那些不再被引用的对象，并释放它们占用的内存。***

***V8本身的优化：1.标记整理	2.分带处理	3.增量收集	4.闲时收集***

**标记清除：**

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-13_20-21-40.png)

**常见的：**

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-13_20-11-07.png)



## 3.闭包的概念理解

***闭包：通过作用域链***

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-13_20-44-27.png)



## 4.闭包的形成过程

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\闭包的形成.png)



## 5.闭包的内存泄露

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\闭包内存泄露释放.png)

***被遗弃的内容不再使用，不进行内存释放删除被遗弃内容，导致内存堆积***

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <button class="create">创建</button>
    <button class="destroy">清除</button>

    <script>

        function createArray(){
            var array = new Array(1024* 1024).fill(1024)
            function generateNew() {
                console.log(array)
            }
            return generateNew
        }

        var totalArray = []

        var createBtnEl = document.querySelector(".create")
        var destroyBtnEl = document.querySelector(".destroy")

        createBtnEl.onclick = function() {
            for(var i = 0 ; i < 100 ; i ++ ){
                totalArray.push(createArray())
            }
        }
        destroyBtnEl.onclick = function() {
            totalArray = []
        }


    </script>
</body>
</html>l
```

**在浏览器中会有对应的内存优化，当AO有对象未被访问时，会将其释放**

```javascript
function foo(){
	var name = "GG"
	var age = "18"
	var height = 1.8
	return function foo1(){
        //debugger
		console.log(name,height)
	}
}

var foo1 = foo()
foo1()
```



# JavaScript增强知识

## 函数

### 1.函数属性 + arguments

***可以把函数当作一个特殊的对象（默认函数对象中已经有自己的属性了）***

***arguments不是数组(伪数组)***

***箭头函数不绑定arguments*** 

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\剩余参数.png)



### ***2.纯函数的理解与应用（掌握）***

***理解：***

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\纯函数.png)

***作用与优势：***

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\纯函数作用与优势.png)



### ***3.柯里化的理解和应用 + 剩余参数（rest）（掌握）***

***概念：***

柯里化（Currying）是一种将多参数函数转换为一系列单参数函数的技术。也就是说，一个原本接受多个参数的函数，经过柯里化后，**会变成每次只接受一个参数，并返回一个新的函数**，这个新函数继续等待接收下一个参数，直到所有参数都被接收完毕，才会执行最终的逻辑并返回结果

```javascript
		var foo = (x,y,z) => console.log(x + y + z)

        var sum = (x1,x2) => {
            return x1 + x2
        }

        //自动柯里化封装
        //递归拆解
        function hyCurrying(fn){
            function curryFn(...args){
                if(args.length >= fn.length){
                    return fn(...args)
                }
                else {
                    return function(...newArgs){
                        //递归
                         return curryFn(...args.concat(newArgs))
                    }
                }
            }
            return curryFn
        }

        var fooCurry = hyCurrying(foo)
        fooCurry(10)(20)(30)
        var sumCurry = hyCurrying(sum)
        var sum5 = sumCurry(5)
        console.log(sum5)
        console.log(sum5(10))
```

### 4.组合函数理解和应用

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-04-14_20-14-41.png)

```javascript
function composeFn(...fns){
            var length = fns.length
            if(length <= 0)return
            //检测是否合法传入函数
            for(var i = 0 ; i < length ; i ++ ){
                var fn = fns[i];
                if(typeof fn !== "function"){
                    throw new Error(`Index position ${i} must be a function`)
                }
            }
            
            return function(...args){
                var res = fns[0].apply(this,args)
                for(var i = 1 ; i < length ; i ++ ){
                    var fn = fns[i]
                    res = fn.apply(this,[res])
                }
                return res
            }
        }
        //console.log默认会返回undefined
        var newFn = composeFn(double,pow2,console.log)
        // console.log(newFn(10))
        newFn(10)
```

### 5.with，eval的使用

**with语句：扩展一个语句的作用链（不建议使用）**

**eval语句：是一个全局函数，它可以将传入的字符串作为 JavaScript 代码进行解析和执行（不建议使用，可读性差，性能差，容易被篡改，不安全）**

```JavaScript
 var obj = {
            message:"Hello world"
        }

        //限定作用域查找
        with(obj){
            console.log(message)
        }

        var message = "Hello Javascript"
        var codeString = `var name = "JavaScript"; console.log(name); console.log(message)`
        eval(codeString)
```

### ***6.严格模式的使用(掌握)***

**认识：**严格模式（Strict Mode）是一种可以让代码以更严谨风格运行的模式。它对代码提出了更多的约束条件，有助于写出更规范、更安全的代码。以下将从开启方式、特点、优势以及局限性等方面详细介绍严格模式。



**严格模式对Javascript的语义限制：**

1.会通过 抛出错误 来消除一些原有的 静默（silent）错误

2.会让JS引擎在执行代码时得到跟多优化

3.禁用在ECMAScript未来版本可能会定义的一些语法



**开启：**

可以在js文件中开启（全局）

可以在某一个函数中开启



**严格模式限制:**

1.无法意外创建全局变量

2.静默错误(有错误但不报错)，删除不可删除属性

3.函数参 数不能有相同命名

4.不允许0的8进制语法

5.严格模式下，不允许随便用with

6.eval不再为上层创建变量

7.this绑定不会默认转成对象



## 对象

### 1.Object.defineProperty

***可以控制对象属性***

```javascript
Object.defineProperty(obj,prop,descriptor)
//obj 对象
//prop 要定义或者修改的属性的名称 或 Symbol
//descriptor要定义或者修改的属性描述符
```

### 2.数据属性描述符

**Configurable：**表示属性是否可以通过delete删除属性，是否可以修改它的特性，或者是否可以将它修改为存取属性描述符

***特性：***

**1.在初始定义对象时configurable属性默认为true**

**2.当通过属性描述符(例：defineProperty)方法定义属性时,该属性的configurable默认为false**

**Enurmerable：**表示属性是否可以通过 **for-in** 或者 **Object.key()** 返回该属性

***特性：***同上

**Writable:**表示是否可以修改属性的值

***特性：***同上

```javascript
var obj = {
            name: "Cookie",
            age:19
        }

        Object.defineProperty(obj,"name",{
            configurable:false,
        })

        delete obj.name
        console.log(obj)
        //当通过defineProperty方法定义属性时,该属性的configurable默认为false
        Object.defineProperty(obj,"address",{})
        delete obj.address
        console.log(obj)

        console.log(Object.keys(obj))

        Object.defineProperty(obj,"name",{
            writable:false,
            value:"Popguys"
        })

        obj.name = "Man"
        console.log(obj.name)
```



### ***3.存取属性描述符（掌握）***

**Configurable：**与数据属性描述符一致
**Enumerable：**同上

**Get:**获取属性时会执行的函数,默认为undefined

**Set:**设置属性时会执行的函数,默认为undefined

```javascript
var obj = {
            name: "Cookie"
        }

        var _name = ""
        Object.defineProperty(obj,"name",{
            configurable:true,
            enumerable:false,
            set:function(value){
                console.log("Set方法被调用",value)
                _name = value
            },
            get:function(){
                console.log("Get方法被调用",_name)
                return _name
            }
        })

        obj.name = "Popguys"
        obj.name = "Supermonkeyguys"
        obj.name = "Whatup2021"

        console.log(obj.name)
```



### 4.Object.defineProperties

原本每次修改一个属性就得使用一次Object.defineProperty比较麻烦，后续版本中推出了  ***Object.defineProperties***  可以同时对多个属性操作

```javascript
var obj = {
            name:"Cookie",
            age:19,
            home:"HN"
        }

        Object.defineProperties(obj,{
            name:{
                writable:true,
                value:"Popguys"
            },
            age:{
                get:function(){
                    return this.age
                }
            }
        })
```

**注意：**如果一个属性配置了 `getter` 和 `setter` （访问器属性），就不能再同时指定 `value` 和 `writable` 。因为访问器属性是通过函数来控制属性的获取和设置，和直接指定值以及可写性的常规属性是不同的定义方式。

```javascript
var obj = {
            name:"Cookie",
            age:19,
            home:"HN"
        }

        var _age = 19
        Object.defineProperties(obj,{
            name:{
                writable:true,
                value:"Popguys"
            },
            age:{
                // writable:true,
                set:function(value){
                    _age = value;
                },
                get:function(){
                    console.log(_age)
                    return _age;
                }
            }
        })

        obj.age = 21
        console.log(obj.age)
```



### 5.对象的其他方法补充

**获取对象属性描述符：**

getOwnPropertyDescriptor

getOwnPropertyDescriptors

```javascript
console.log(Object.getOwnPropertyDescriptor(obj,"name"))
console.log(Object.getOwnPropertyDescriptors(obj))
```

**禁止对象扩展新属性:** ***preventExtensions***

给一个对象添加新的属性会失败

```javascript
Object.preventExtensions(obj)
```

**密封对象，不允许配置和删除属性：*seal***

实际上是调用preventExtensions

并且将现有属性configurable：false

```javascript
Object.seal(obj)
```

**冻结对象，不允许修改现有属性：*freeze***

实际上是调用seal

并且将现有属性的writable：false



# ES5 + ES6

## Javascript ES5中实现继承

***任何对象都有自己的原型（隐式原型）***

### *1.对象和函数的原型（掌握）*

Javascript当中每个对象都有一个特殊的内置属性[[prototype]]，这个特殊的对象可以指向另外一个对象

**获取方式：**

```javascript
var pt = Object.getPrototypeOf(obj)
var pt1 = obj.__proto__//早期浏览器添加，存在一定兼容问题，虽然是非标准，但广泛支持
```

**有什么用？**

当通过引用对象的***属性key来获取一个value***时，会***触发[[Get]]***操作

操作时会***首先检查对象是否有有对应属性***，如果有的话就直接使用

如果没有，***那则会访问对象[[prototype]]内置属性指向的对象上的属性***



**所有函数都有一个prototype的属性**

```javascript
//将函数看成是一个普通对象时，他是具备__proto__(隐式原型)
console.log(foo.__proto__)//输出：ƒ () { [native code] }
console.log(Object.getPrototypeOf(foo))//输出：ƒ () { [native code] }

//将函数看成一个函数时,其时具备prototype的(显式原型)
//作用：用来构建对象时,给对象设置隐式原型
console.log(foo.prototype)
```



#### ***共享机制（掌握）：***

- **好处**：方便统一管理和维护方法，一处修改，所有实例都能体现变化；也减少代码冗余，让代码结构更清晰，节省空间。

一种设计模式

当多个对象  ***有多个共同的方法（函数）或值***  时，我们可以将它放到构造函数对象的显示原型(prototype)

由**构造函数创建出来的所有对象**，都会共享这些**属性**（方法或者值）

```javascript
		function Student(name,age,dot){
            this.name = name,
            this.age = age,
            this.dot = dot
        }

        Student.prototype.playing = function() {
            console.log(this.name + " is playing");
        }
        Student.prototype.eating = function() {
            console.log(this.name + " is eating");
        }
        
        var stu1 = new Student("Cookie",19,100)
        var stu2 = new Student("Popguys",20,100)

        stu1.playing();
        stu2.eating();
```



***疑问：***

**1.什么是函数的显式原型**

**2.函数原型与对象原型的区别**

**3.函数原型的作用**

通过new操作创建对象时，将这个显式原型赋值给创建出来对象的隐式原型



### ***2.new，constructor（构造器）（掌握）***

**new操作：**

1.在内存中创建一个新的空对象

2.这个对象内部的[[prototype]]属性会被赋值为该构造函数的prototype属性

```javascript
function foo(){
	return 1
}
var newFoo = new foo()
//相当以上操作
var f = {}
p.__proto__ = foo.prototype
```

2.将空对象赋值给this

3.将函数的显示原型赋值给这个对象作为它的隐式原型

4.执行函数中代码

5.将这个对象默认返回



**Constructor:**

事实上原型对象上面是有一个属性的：consrutor

默认情况下原型上都会添加一个属性叫做constructor，这个constrcutor指向当前函数对象，如下图：

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\constructor.png)

**构造函数创建对象的内存表现：**

![构造函数创建对象的内存表现](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\构造函数创建对象的内存表现.png)

```Javascript
	function Person(name,age){
            this.name = name,
            this.age = age
        }

        Person.prototype.message = "Hello World"
        Person.prototype.online = function(){
            console.log(this.name + " is online")
        }

        var p1 = new Person("Cookie",19)
        var p2 = new Person("Popguys",20)

        // p1.address = "China"
        Person.prototype.address = "China"
        p2.count = 10

        p1.online()
        console.log(p1.address)
        console.log(p1.count)
        console.log(p2.address)
        console.log(p2.count)

```



#### ***函数原型对象赋值新对象（掌握）：***

 **第一种添加constructor的方法会使constructor的enumerable为true(默认为false),使其可枚举**

**为尽可能还原constructor原先浏览器的预设，我们可以通过Object.defineProperty的方法来添加**

```javascript
		function Person(){

        }

        console.log(Person.prototype)

        Person.prototype = {
            message: "Hello Stranger",
            info:{
                name:"Cookie",
                age:19
            },
            online : function(){
                console.log(this.info.name + " is online")
            },
            play : function(){},
            constructor: Person//第一种方法---也行,但不太严谨
        }
		//第二种方法---推荐添加constructor属性的方法
	Object.defineProperty(Person.prototype,"constructor",{
    	enumerable:false,
        configurable:true,
        writable:true,
        value:Person
    })
        var p1 = new Person()
        console.log(p1.info)

        p1.online()
```



### 3.原型链的查找顺序

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\原型链查找.png)

**面向对象的三大特性分析：封装，继承，多态**

**封装：前面将属性和方法封装到一个类中，可以称之为封装的过程**

**继承（掌握）：继承是面向对象中非常重要的，不仅仅可以减少重复代码的数量，也是多态的前提（纯面向对象中）**

**多态 （继承是多态的前提）：不同的对象在执行时表现出不同的形态**

**继承：**

继承可以帮助我们将**重复的代码和逻辑**抽取到父类中，子类只需要直接继承过来使用即可

**原型链**

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\原型链.png)

当从一个对象获取属性，如果当前对象中没有获取到就会去它的原型上获取

```javascript
		var obj = {
            name:"Cookie",
            age:18
        }
        obj.__proto__ = { 
            // message:"Hello 1"
        }
        obj.__proto__.__proto__ = {
            message:"Hello 2"
        }
        console.log(obj.message)
```

### ***4.原型链的继承（掌握）：***

#### ***利用原型链实现继承（掌握）：***

```javascript
	function Person(name,age){
            this.name = name,
            this.age = age
        }

        Person.prototype.online = function() {
            console.log("Online~")
        }

        function Student(name,age,sno,score){
            this.name = name,
            this.age = age,
            this.sno = sno,
            this.score = score
        }

        // 方式一：父类原型直接赋值给子类原型
        //缺点：父类和子类共享一个原型对象，修改一个，另外一个也与之修改
        Student.prototype = Person.prototype

        //方式二：创建一个父类的实例对象---实现效果有点像牵线搭桥
		//方案三：
		//Object.create(x)方法会创建一个新对象并把这个对象的隐式原型绑定在x的显示原型上
		//var obj = Object.create(Person.prototype)
        //Student.prototype = obj
        //方案二：
		//中间借用函数,而非对象的方法(可以不使用__proto__,因为__proto__存在一定兼容问题，此方案可以避免兼容性问题)
        // function f(){}
        // f.prototype = Person.prototype
        // Student.prototype = new f()
		//方案一：借用对象（使用隐式原型__proto__）
        var p = new Person("Cookie",19)
        Student.prototype = p

        Student.prototype.studying = function(){
            console.log("studying")
        }
```

方法一，二：

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\利用原型链实现继承方式一二.png)

继承对象的内存创建图：

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\继承创建对象的内存图.png)



### ***5.借用构造函数继承（掌握）：***

#### ***借用构造函数实现继承（Constructor Stealing）（掌握）：***

**组合继承，既借用原型链也借用构造函数**

**因为函数可以在任意时刻被调用，通过apply或者call方法在新创建的对象上执行构造函数**

- **优点**：能够实现实例属性（方法）的继承，避免了引用类型的属性被所有实例共享。

```javascript
	function Person(name,age){
            this.name = name,
            this.age = age
        }

        Person.prototype.online = function() {
            console.log("Online~")
        }


	function Student(name,age,sno){
		Person.call(this,name,age)
		this.sno = sno
	}
```

**组合继承问题：**

1.组合继承最大的问题就是无论在什么情况下，都会**调用两次父类结构函数**(第一次在创建子类原型的时候，第二次在子类构造函数内部（每次创建子类实例的时候）)

2.**所有子类实例事实上会拥有两份父类属性**（第一份在当前的实例自己里面（Person本身），第二份在子类对应的原型对象中（Person.__proto__中））

### ***6.寄生组合实现继承（掌握）***

```javascript
//单写一份文件引用
function createObject(type){
    //借用对象
    //var newObj = {};
    //Object.setPrototype(newObj,type);
    //return newObj;
    //借用构造函数
    function f(){};
    f.prototype = type;
    return new f();
}

function inherit(Subtype,Supertype){
    Subtype.prototype = createObject(Supertype.prototype);
    Object.defineProperty(Subtype.prototype,"constructor",{
        enumerable:false,
        configurable:true,
        writable:true,
        value:Subtype
    })
}

function Person(name,age,address){
            this.name = name,
            this.age = age,
            this.address = address
        };

        Person.prototype.online = function(){
            console.log(this.name + " is online");
        }
        Person.prototype.leaving = function(){
            console.log(this.name + " is leaving");
        }
        Person.prototype.from = function(){
            console.log(this.name + " is from " + this.address);
        }

        function Student(name,age,address,score,classNum){
            Person.call(this,name,age,address);
            this.score = score,
            this.classNum = classNum
        }

        inherit(Student,Person);
        Student.prototype.learning = function(){
            console.log(this.name + " is learning");
        }

        var stu1 = new Student("Cookie",19,"HN");

        stu1.learning();
        stu1.online();
        stu1.from();
```



### ***7.补充：***

#### ***Object类是所有类的父类（掌握）：***

**任何类终将继承自Object(爹)**

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Object类是所有类的父类.png)

```javascript
        function createObject(type){
            function f(){};
            f.prototype = type;
            return new f();
        }

        function inherit(Subtype,Supertype){
            Subtype.prototype = createObject(Supertype.prototype);
            Object.defineProperty(Subtype.prototype,"constructor",{
                enumerable:false,
                configurable:true,
                writable:true,
                value:Subtype
            })
        }

		function Person(){};
        function Student(){};
        function Teacher(){};

        inherit(Student,Person);
        console.log(Person.prototype.__proto__ === Object.prototype);

        Object.prototype.message = "Hello Lec";

        var stu = new Student();
        console.log(stu.message);

        console.log(Object.prototype);
        console.log(stu.toString);

		function foo(){};
		console.log(foo.message);
	
		var obj = {};
        console.log(obj.__proto__);
```



```javascript
//后续新方法存在一定兼容问题
//原型继承
Object.setPrototypeOf(Subtype.prototype,Supertype.prototype)
```



## Javascript ES6中实现继承

### 1.对象的方法补充

- **`instanceof`**：检查对象的原型链中是否包含某个构造函数的 `prototype` 属性。比如 `A instanceof B` ，是看 `A` 的原型链上是否能找到 `B.prototype` 。
- **`isPrototypeOf`**：直接检查一个对象是否在另一个对象的原型链上。例如 `C.prototype.isPrototypeOf(D)` ，就是判断 `C.prototype` 是否在 `D` 的原型链中 。

```javascript
function createObject(type){
    function f(){};
    f.prototype = type;
    return new f();
}

function inherit(Subtype,Supertype){
    //后续新方法存在一定兼容问题
    // Object.setPrototypeOf(Subtype.prototype,Supertype.prototype);
    Subtype.prototype = createObject(Supertype.prototype);
    Object.defineProperty(Subtype.prototype,"constructor",{
        enumerable:false,
        configurable:true,
        writable:true,
        value:Subtype
    })
}

var obj = {
            name:"Cookie",
            age:19
        } 

        var info = createObject(obj);
        info.address = "HN";
        info.intro = "HELLO";

        //hasOwnProperty方法
        console.log(info.hasOwnProperty("name"))//false 在当前对象上查找
        //in方法
        console.log("name" in info);//true 在原型和对象中查找
        
        console.log(info.hasOwnProperty("address"))
        console.log("address" in info);
        
        //for in 方法 和in查找相同
        for(var Element in info){
            console.log(Element);
        }

        //instanceof
        //用于检测构造函数(Person,Student类)的prototype
        //是否出现在某个实例对象的原型链上
        //判断对象与构造函数之间的关系
        function Person(){};
        function Student(){};
        inherit(Student,Person)

        var stu = new Student();
        console.log(stu instanceof Student);
        console.log(stu instanceof Person);
        console.log(stu instanceof Object);
        console.log(stu instanceof Array);
        
        console.log("-------------")
        //isPrototypeOf
        //用于检测某个对象, 是否出现在某个实例对象的原型链上
        //判断对象与对象之间的继承
        console.log(Student.prototype.isPrototypeOf(stu));
        console.log(Person.prototype.isPrototypeOf(stu));
        console.log(Object.prototype.isPrototypeOf(Person));
```

### 2.原型继承关系图

***函数本身也是对象***

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\原型链继承关系.jpg)

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\原型继承关系简化图.png)

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\原型关系理解.png)



### 3.class方式定义类

#### ***构造函数的类方法（掌握）：***

```javascript
function Person(name,age){
            this.name = name,
            this.age = age
        };

        //添加Person原型上的方法也称为 实例方法(只能通过实例调用)
        Person.prototype.online = function(){
            console.log(this.name + " is online");
        }
        Person.prototype.leaving = function(){
            console.log(this.name + " is leaving");
        }

        //添加在对象本身的方法称为 类方法
        var names = ["Cookie" , "Popguys" , "Supermonkeyguys"];
        Person.randomPerson = function(){
            var randName = names[Math.floor(Math.random() * names.length)];
            var randAge = Math.floor(Math.random() * 100);
            return new Person(randName,randAge);
        }

        //实例对象
        var  p1 = new Person("Popguys",18);
        p1.online();

        var p = Person.randomPerson();
        console.log(p);
```



#### ***class的定义类（掌握）:***

```javascript
		//ES5中定义类
        //function Person() {}
        //ES6中定义类
        //{key:value} -> 对象
        //{表达式} -> 代码块
        //{} -> 类的结构
        class Person{

        }
        var p1 = new Person();
        console.log(p1);
        //另一种定义方法:表达式(了解)
        var Student = class{

        }
        var foo = function(){

        }
        var stu1 = new Student();
        console.log(stu1);
```



#### ***class类中定义构造方法和实例方法（掌握）***

```javascript
		//高内聚低耦合
        class Person {
            //类中的构造函数
            //当我们通过new关键字调用一个Person类时, 默认调用class中的constructor方法
            constructor(name,age){
                this.name = name;
                this.age = age;
            }

            //实例方法
            //本质上是Person.prototype
            online() {
                console.log(this.name + " is online");
            }
            leaving() {
                console.log(this.name + " is leaving");
            }
        }

        var p1 = new Person("Cookie",19);

        console.log(p1.name,p1.age);
        p1.online();
        p1.leaving();
```



#### ***类和构造函数的异同（掌握）***

1.构造函数可以当作一个普通函数使用，而class定义的类则不能作为一个普通的函数进行调用





**类的构造函数**

1.每个类可以有一个自己的构造函数（方法），其是固定的为（constructor）

2.使用new操作符时，操作一个类时会调用这个类的constructor

3.每个类只能有一个constructor，如果包含多个，则会抛出异常



#### ***new操作类时的具体操作（掌握）***

1.在内存中创建一个空对象

2.这个对象内部的[[prototype]]属性会被赋值为该类的prototype属性

3.构造函数内部的this，会指向创建出来的新对象

4.执行构造函数的内部代码（函数代码）

5.如果构造函数没有返回非空对象，则返回创建出来的新对象



**类和访问器的编写**

```javascript
var obj = {
            name:"GG-bond"
        }
        //对象访问器定义(监听某个属性)
        //方式一：
        Object.defineProperty(obj,"name",{
            configurable:true,
            enumerable:true,
            set:function() {

            },
            get:function() {

            }
        })

        // 方式二
        var obj1 = {
            name:"Cookie",
            //setter方法
            set name(value){
                this.name = value
            },
            //getter方法
            get name(){
                return this.name
            }
        }

        class Person {
            //程序员之间的约定, 以_开头的属性和方法, 是不在外界访问的
            constructor(name,age){
                this._name = name
            }

            set name(value) {
                console.log("设置name")
                this._name = value
            }

            get name() {
                console.log("获取name")
                return this._name
            }
        }

        var p1 = new Person("Cookie",19);
        p1.name = "Popguys"
        console.log(p1.name)

        var p2 = new Person("GG-bond",19);
        p2.name = "tuang tuang tuang"
        console.log(p2.name)

        //应用场景
        class Hunman{
            constructor(x,y,height,weight){
                this.x = x;
                this.y = y;
                this.height = height;
                this.weight = weight;
            }
            get position(){
                return {x:this.x,y:this.y}
            }
            get size(){
                return {height:this.height,weight:this.weight}
            }
        }

        var h1 = new Hunman(90,90,100,120);
        console.log(h1.position);
        console.log(h1.size);
```



#### ***类的静态方法（掌握）：***

**静态函数中的 this 绑定到定义该静态函数的类**

**在继承情况下，this会指向调用该静态函数的子类**

```javascript
function Person(name,age){
            this.name = name,
            this.age = age
        };

        //添加Person原型上的方法也称为 实例方法(只能通过实例调用)
        Person.prototype.online = function(){
            console.log(this.name + " is online");
        }
        Person.prototype.leaving = function(){
            console.log(this.name + " is leaving");
        }

        //添加在对象本身的方法称为 类方法(静态方法)
        var names = ["Cookie" , "Popguys" , "Supermonkeyguys"];
        Person.randomPerson = function(){
            var randName = names[Math.floor(Math.random() * names.length)];
            var randAge = Math.floor(Math.random() * 100);
            return new Person(randName,randAge);
        }

        //实例对象
        var  p1 = new Person("Popguys",18);
        p1.online();

        var p = Person.randomPerson();
        console.log(p);

        class Human{
            constructor(name,age){
                this.name = name;
                this.age = age;
            }
            //实例方法(本质上是添加在原型上)
            moving(){
                console.log(this.name + " is moving");
            }
            //this绑定->与调用相关
            //静态方法只能通过类来调用
            static randomPerson(){
                console.log(this);//指向Human
                var randomName = names[Math.floor(Math.random() * names.length)];
                var randomAge = Math.floor(Math.random() * 100);
                return new this(randomName,randomAge);//与下面写法效果相同，推荐上面的写法
                // return new Hunman(randomName,randomAge);
            }
        }

        var h1 = new Human("Cookie",20);
        h1.moving();
        // h1.randomPerson(); 静态方法不可通过实例调用
        console.log(Human.randomPerson());
```



### 4.extend实现继承  

```javascript
class Person{
            constructor(name,age,address){
                this.name = name;
                this.age = age;
                this.address = address;
            }

            Greet(){
                console.log(`Hello , I am ${this.name}`);
            }
            sayBye(stanger){
                consoele.log(`Goodbye,see you next time ${stanger.name}`);
            }
        }

        class Student extends Person {
            constructor(name,age,address,score){
                super(name,age,address);
                this.score = score;
            }

            study(){
                console.log(this.name + " is studying");
            }
        }

        var stu1 = new Student("Cookie",19,"HN",100);
        stu1.Greet();
```



**super关键字**

可以执行super.method(...)来调用父类

可以执行super(...)来调用一个父类的constructor（只能在constructor中使用）

**注意：在子（派生）类的构造函数中使用this或者返回默认对象之前，必须先通过super调用父类的构造函数**

**使用位置：1.子类的构造函数，2.实例方法，3.静态方法**

**对父类函数重写**

```javascript
class Animal { 
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
	running() {
        console.log("running");
    }
    eating() {
        console.log("eating");
    }
    static sleep() {
        console.log("static animal sleep");
    }
}

class Dog extends Animal {
    constructor(name,age,weight){
        super(name,age);
        this.weight = weight;
    }
    running() {
        console.log(dog);
        super.running();
    }
    static sleep() {
        console.log("dog");
    }
}

var dog = new Dog("Buls",7,91);
dog.running();
Dog.sleep();
```



**继承内置类**

不仅仅可以继承自定义的类，还可以继承内置类（例如：Array等），主要使用目的是对内置类功能进行扩展

```javascript
//创建新类继承父类再扩展
class HYArray extends Array {
	get lastItem() {
        return this[this.length - 1];
    }
    get firstItem(){
        return this[0];
    }
}

var arr = new HYArray(10,20,30);
console.log(arr);
console.log(arr.firstItem);
console.log(arr.lastItem);
//直接对原类扩展
Array.prototype.lastItem = funtion() {
    return this[this.length - 1];
}
```



类的混入

JS只支持单继承，只能有一个父类

```javascript
function mixClass1(baseClass){
            return class extends baseClass {
                flying() {
                    console.log("flying");
                }
            }
        }

        function mixClass2(baseClass){
            return class extends baseClass {
                running() {
                    console.log("running");
                }
            }
        }

        class Animal{

        }

        var bd = mixClass2(mixClass1(Animal));
        var bird = new bd();
        bird.flying();

        class Bird extends mixClass2(mixClass1(Animal)) {

        }

        var birdp = new Bird();
        birdp.running();
```



### 5.Babel的ES6转ES5

***[深入理解class和extends原理](https://juejin.cn/post/7001025002287923207)***



### 6.面向对象多态理解

**继承是多态的前提**

[***将 “不变的事物” 与 “可能改变的事物” Take apart***](https://segmentfault.com/a/1190000017452120)

**为不同数据类型实体，提供统一接口**

**不同的数据类型进行同一个操作，表现出不同的行为**

```Javascript
class Shape {
            getArea() {};
        }

        class Rectangle extends Shape {
            constructor(width,height){
                super();
                this.width = width;
                this.height = height;
            }
            
            getArea() {
                return this.width * this.height;
            }
        }

        class Cricle extends Shape {
            constructor(radius){
                super();
                this.radius = radius;
            }

            getArea() {
                return this.radius * this.radius * Math.PI;
            } 
        }

        var rect1 = new Rectangle(100,200);
        var cric1 = new Cricle(100);
        console.log(rect1.getArea());
        console.log(cric1.getArea());

        function getShapeArea(shape) {
            console.log(shape.getArea())
        }

        getShapeArea(cric1);
```



### 7.ES6对象的增强

**字面量增强（语法糖）**

```javascript
var name = "Cookie";
        var age = 19;

        var key = "address" + "city";

        var obj = {
            //属性的增强
            name, //本质上是name:name
            age,  //age:age
            //注意箭头函数不绑定this
            eating: () => {
                console.log(this);
            },
            running: function() {
                console.log(this);
            },
            //方法的增强（非箭头函数）写法与类的有些相似
            swimming() {
                console.log(this);
            },
            //计算属性名
            [key]: "HN" //address city
        }

        obj.running();
        obj.eating();
        obj.swimming();

        console.log(obj.addresscity);
```



***数组和对象的解构以及应用（掌握）***

```javascript
var names = ["Cookie","Popguys","Supermonkeyguys",undefined];
        //基本使用
        // var [name1, name2, name3] = names;
        // console.log(name1,name2,name3);

        //严格顺序
        // var [name1, ,name3] = names;
        // console.log(name1,name3);

        //剩余参数解构
        // var [name1,name2,...restName] = names;
        // console.log(name1,name2,restName);

        //默认值 当数组内元素为undefined时, 可以在解构时进行赋值
        //如果已经有初始值, 再进行赋值操作则无效
        // var [name1, name2, name3, name4 = "GG-bond"] = names;
        // console.log(name1,name2,name3,name4);

        var obj = {name:"Cookie",age:19,address:"HN"};
        // var {name,age,address} = obj; //解构变量名需和对象内部key名相同
        // console.log(name,age,address)

        //对象解构没有顺序, 而是根据key
        // var {age,address,name} = obj;
        // console.log(age,address,name);

        //对变量重命名
        // var {name:myName,age:myAge,address:myAddress} = obj;
        // console.log(myName,myAge,myAddress)//新变量

        //赋值规则和数组相同
        // var {name:myName,age:myAge,address:myAddress = "Dingan"} = obj;
        // console.log(myName,myAge,myAddress);

        //剩余参数接受
        // var {name,...restObj} = obj;
        // console.log(name,restObj);
```



***函数对象的原型和Function的关系（掌握）:***

```javascript
		function foo(name,age){
            console.log(this,name,age);
        };
        //对象中的某些属性和方法是来自Function.prototype
        console.log(foo.__proto__ === Function.prototype); //true

        foo.apply("Cookie",["Popguys",19]);
        console.log(Function.prototype.call);
        console.log(Function.prototype.apply);
        console.log(Function.prototype.apply === foo.apply);

        Function.prototype.info = "Hello my friend!";
        console.log(foo.info);
        Function.prototype.bar = function() {
            console.log("bar function excution");
        }

        foo.bar();
```



***手写apply-call函数实现和抽取封装（掌握）：***

```Javascript
		function foo(name,age){
            console.log(this,name,age);
        };

        //封装
        function excuFn(thisArg,otherArgs,fn){
            //获取thisArg, 并且确保是一个对象类型
            thisArg = (thisArg === null || thisArg === undefined) ? window : Object(thisArg);

            Object.defineProperty(thisArg,"fn", {
                enumerable:false,
                configurable:true,
                value: fn
            })
            //利用隐式绑定
            thisArg.fn(...otherArgs);

            delete thisArg.fn;
        }

        Function.prototype.hyApply = function(thisArg,otherArgs) {
            excuFn(thisArg,otherArgs,this);
        }
        Function.prototype.hyCall = function(thisArg,...otherArgs) {
            excuFn(thisArg,otherArgs,this);
        }

        var obj = {name:"CC"};

        foo.hyApply("GG",["Cookie",19]);
        foo.hyCall(obj,"Popguys",19);
        foo.hyApply(undefined,["Supermonkeyguys",20]);
        foo.hyCall(null,"GG-bond",19);
```



***bind（掌握）：***

```javascript
function foo(name,age,height,address){
            console.log(this,name,age,height,address);
        };

        Function.prototype.hyBind = function(thisArg,...otherArgs){
            thisArg = (thisArg === null || thisArg === undefined)? window : Object(thisArg);
            Object.defineProperty(thisArg,"fn", {
                enumerable: false,
                configurable:true,
                writabe:false,
                value:this
            })
            
            return (...newArgs) => {
                var allArgs = otherArgs.concat(newArgs);
                // var allArgs = [...otherArgs,...newArgs];
                thisArg.fn(...allArgs);
                //不delete的reason
                //在后续返回新函数要调用
            }
        }

        var newFoo = foo.hyBind("CC","Cookie",19);
        newFoo(1.8,"海南省");
```



# ES6~ES13新特性

## let-const

### **基本使用和注意事项(掌握)**

**let用法与var基本无异，let，const无作用域提升**

**const保存的数据一旦被赋值，就不可更改但赋值如果是引用类型，则可以通过引用对象找到对应的对象来修改对象内容**

```javascript
let name = "Cookie";
name = "Supermonkeyguys";

const age = 20;
//age = 31; //错误
const info = {
	name:"popguys",
	age:20
}

//info = {}; //错误
info.age = 21;
```

**var的陷阱**

```javascript
var x = 10;
function foo(){
	console.log(x);//undefined
	var x = 100;
}

foo();
```

**let/const没有作用域提升和暂时性死区**

var声明变量有作用域提升

**在执行上下文内词法环境记录被创建之初，变量在此时就会被创建出来了，但是此时是处于不可访问状态（暂时性死区TDZ），所以let/const不能说是有作用域提升的（wiki百科，变量需要能被访问到才能说是租用与提升：同var）**

```javascript
console.log(a); //undefined TDZ-b,c
console.log(b);	//TDZ-b,c
console.log(c);	//TDZ-b,c
var a = 10; //TDZ-b,c
let b = 20;	//TDZ-c
const c = 30;
```

#### **块级作用域**

在ES5之前，只有全局和函数会形成自己的作用域

**但在ES6之后，let/const/function/class声明的变量都会具有块级作用域**

**函数虽然拥有块级作用域，但是外部依旧可以访问**（引擎内部会对函数的声明进行特殊处理，可以像var一样在外访问）

```javascript

{
	let name = "Cookie";
    let age = "19";
	const ID = 666;
    class Person{};
    function foo(){
        console.log(name);
    }
}

//console.log(name) //报错undefined
//let stu = new Person() //报错undefined
foo();
//函数 foo() 虽然定义在块内，但函数作用域可以捕获外层的块级变量（闭包特性）
//因此 foo() 内部能正常访问 name，执行时会输出 "Cookie" 
```

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\词法环境记录.png)

#### **let/cosnt块级作用域应用场景**

**词法环境会记录每次函数内部关联到的值**

<img src="C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\let-const的应用场景.png" style="zoom: 200%;" />

```html
 <button>Button</button>
    <button>Button</button>
    <button>Button</button>
    <button>Button</button>

    <script>

        const buttonElements = document.querySelectorAll('button');
        //闭包变体方案，利用DOM对象属性存储数据
        // for(var i = 0 ; i < buttonElements.length ; i++ ){
        //     const btEl = buttonElements[i];
        //     btEl.index = i;
            
        //     btEl.onclick = function(){
        //         console.log(`I am button ${this.index}`);
        //     }
        // }
		//块级作用域 + 闭包捕获i
        for(let i = 0 ; i < buttonElements.length ; i ++ ){
            const btEl = buttonElements[i];
            btEl.onclick = function(){
                console.log(`I am button ${i}`);
            }
        }


    </script>
```



#### let-const-var在开发中的选择（掌握）

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\let-const-var开发中的选择.png)



## 模板字符串（掌握）

#### ***标签模板字符串的用法和应用（掌握）***

```javascript
//ES6之前
const name = "Cookie";
const age = 19;
const height = 1.8;
const info = "My name is" + name + ", age is " + age;

//ES6之后
const info1 = `My name is ${name}, age is ${age}`;

function foo(...args){
    console.log("arguments：${arg}");
}

//foo('模板字符串',name,age,height);
foo`My name is ${name}, age is ${age}, height is ${height}`;
//模板字符串被拆分，第一个元素是数组，是被模板字符串拆分的字符串组合
//后面元素是模板块符串传入内容
```

#### ***默认参数的用法和注意事项（掌握）***

**默认参数不会对null进行处理**

具体使用根据实际需求(可能不需要对null进行处理)

**语法规范：给默认参数的参数写在最后面，但在剩余参数之前（参数匹配数据顺序）**

**tips:**

有默认参数的形参**不会计入arguments的length之内**（并且后面所有参数都不会计算在length之内）

```javascript
function foo1(arg1 = 10,arg2 = 20){
	//除默认参数之外的方法一
    //arg1 = (arg1 === null || arg1 === undefined) ? 10 : arg1; 
    //arg2 = (arg2 === null || arg2 === undefined) ? 20 : arg2;
    //方法二
    //arg1 = arg1 ?? 10;
    //arg2 = arg2 ?? 20;
    console.log(arg1,arg2);
}

foo();
foo("","");
foo(false,true);
```



#### ***默认参数和对象解构的结合（掌握）***

```javascript
function foo({name = "None" , age = 0 } = {}){
	console.log(name,age);
}

foo();
```



#### ***箭头函数的额外强调（掌握）***

箭头函数**没有显示原型prototype**，不能够作为构造函数来使用new对象

箭头函数**不绑定this，arguments，super参数** 

```javascript
let foo = () => {};

const f = new foo() //报错
```



#### ***展开语法的基本使用（掌握）***

使用场景：

**函数调用**

```javascript
function foo(arg1,arg2,...rest) {}
const names = ["Cookie","Popguys","GG-bond"];
foo(...names);
```

**数组构建**

```javascript
var names1 = ["Cookie","Popguys"];
const names = [...names1,"GG-bond"];
```

**构建对象字面量**

```javascript
const obj = {
	naem:"Cookie",
	age:19
}

const info = {
	...obj,
	address:"HN",
	id:4399
}
```



## 对象的引用赋值-浅拷贝-深拷贝（掌握） 

### **引用赋值**：

**在Javascript中，当把一个对象赋值给变量时，实际上实在赋值该对象在内存中的引用，而不是创建一个新的副本**

```javascript
const obj = {
	name："Cookie",
    age:18,
    height:1.8
}

const info = obj;
//在info中修改值时也会修改obj
//两个值共有一个共同的指针指向堆内存
```

### **浅拷贝（Shallow Copy）：**

**概念：**

**只复制对象的第一层属性**

**对于基本类型（字符串，数字等）：复制值**

**对于引用类型（对象，数组等）：复制引用（内存地址）**

```javascript
	//**利用展开运算符**
	//此时拷贝会在内存中开辟一个新的空间存储info，创建一个新的副本
	//而不像先前两个对象共享一个相同的指针
	const obj = {
            name:"Cookie",
            age:19,
            height:1.8,
            friend:{
                name:"Popguys",
                age:19
            }
        }

        const info = {
            ...obj
        }
        info.name = "Popguys";
        console.log(info.name);//Popguys
        console.log(obj.name);//Cookie

        info.friend.name = "GG-bond"

        console.log(obj.friend.name)//GG-bond
```

![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\浅拷贝detail.png)



### **深拷贝（Deep Copy）：**

**概念：**

**递归复制对象的所有层级**

**完全独立的新对象，与原对象无任何引用关系**

```javascript
//JSON方法（简单但有一定的局限性）
const deepCopy = JSON.parse(JSON.stringify(obj));

//递归函数调用
function deepClone(obj){
    if(obj === null || typeof obj !== 'object')return obj;
    const clone = Array.isArray(obj) ? [] : {};
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            clone[key] = deepClone(obj[key]);
        }
    }
    return clone;
}
```



### 数值表示

ES6中规范了二进制和八进制的写法

```javascript
const num1 = 100;
const num2 = 0b100; //二进制
const num3 = 0o100;	//八进制
const num4 = 0x100;	//十六进制

//较长的数字表示
const num5 = 100_000_000_000
```



## Symbol对象属性的痛点和Symbol的用法

Why we need Symbol ？

在ES6前，对象属性名都是以字符串形式，有时候很容易造成**属性名冲突**

在冲突时继续赋值可能会**覆盖原有属性**

**Symbol 是 ES6 引入的一种新的原始数据类型，表示独一无二的值。**

### ***Symbol基本使用（掌握）***

```javascript
const sym1 = Symbol();
const sym2 = Symbol('description');
console.log(sym1 === sym2) // false - 每个Symbol都是唯一的

const name = Symbol();
const height = Symbol();
const obj = {age: 19};
const info = {
	[name]:"Cookie",
	// [obj]:20 //对象不能作为Key
}
info[height] = 1.8;
console.log(info);
```



### *Symbol痛点（掌握）*

#### 访问困难

```javascript
const obj = {
    [Symbol('key')]:'value'
};
//无法通过常规方式获取
Object.keys(obj);
Object.getOwnPropertyNames(obj);
//专门方法
const symbols = Object.getOwnPropertySymbols(obj);
for(const key of symbolKeys){
    console.log(obj[key]);
}
```

#### JSON序列化问题

```javascript
const obj = {
	[Symbol('data')]:'secret',
	name:'test'
};

JSON.stringify(obj)// '{"name":"test"}' - Symbol属性被忽略
```

#### 无法隐式转换

```javascript
const sym = Symbol('test');
console.log(sym + ' string')//报错
console.log(`${sym}`);
```



### Symbol额外补充

#### 相同值的Symbol

**通过Symbol.for方法**

**通过Symbol.keyFor方法获取对应key**

```javascript
const s1 = Symbol("ccc");
console.log(s1.description);
const s2 = Symbol(s1.description);
console.log(s1 === s2); //false

const s3 = Symbol.for("aaa");
const s4 = Symbol.for("aaa");
console.log(s3 === s4); //true

console.log(Symbol.keyFor(s3));
console.log(Symbol.keyFor(s4));
```



## Set-Map

### **基本使用和应用场景**

**Set:**

**常用方法**

```javascript
const set = new Set();

set.size()； //返回set中元素的个数
set.add(value); //添加摸个元素，返回Set对象本身
set.delete(value); //从set中删除和这个值相等的元素，返回boolean类型
set.has(value); //判断set中是否在存在某个元素，返回boolean类型
set.claer(); //清空set中所有的元素，没有返回值
set.forEach(callback,[,thisArg]); //通过forEach遍历set

//set支持for of 方法
```

**数组自动去重**

```javascript
const set = new Set();

        set.add(20);
        set.add(30);
        set.add({name:"Cookie",age:19});
        set.add(91);
        set.add(20);
        set.add("GG");
        console.log(set);
		
		//应用场景（数组去重）
        const names = ["Cookie","Popguys","Supermonkeyguys","Cookie"];
        const setNames = new Set(names); //添入可迭代对象
        console.log(setNames);
```

