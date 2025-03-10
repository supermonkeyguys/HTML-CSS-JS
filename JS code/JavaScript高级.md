# ***细枝末节（codewhy）***

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



![](C:\Users\30292\Desktop\HTML-CSS-JS\JS code\img\Snipaste_2025-03-10_22-46-01.png)
