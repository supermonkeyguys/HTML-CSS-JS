# JS(Javascript)

***tip:函数作用域的提升：在JS引擎中会优先扫描JS代码中的函数部分（JS引擎会优先将函数放入函数栈中，后续检测调用函数）***

# JS基本语法

## 引用方式

```html
<!DOCTYPE html>
<html lang="CN">
	<head>
    	<meta charset="UTF-8">
        <title></title>
        <style></style>
    </head>
    <body>
        
        <!--<script>部分放在body部分最后写-->
    	<script src="index.js"></script><!-- src="文件名称.格式"-->
    </body>
</html>
```



## Var变量

***var + 变量名（注意命名规范 mgFriendAge）(非语法)***

***var可字符串和数字***

```javascript
var num = 1; // int 
var name = true // bool
var isop = 32 >= 21 //bool
var pp = "Hello Javascript"; // string
var pp1 = "null"; //空串,清除值 
var unclear; //默认值 undefined
```

### 作用域类型

在 ES6 之前，JavaScript 只有函数作用域和全局作用域。在图中的代码里，使用 `var` 声明的变量 `i` 是函数作用域（这里的 `for` 循环块并不形成块级作用域），意味着它在整个包含它的函数内都有效。

### 具体分析

1. `var i = 0` 声明的 `i` 虽然是在 `for` 循环中初始化的，但由于 `var` 的特性，它的作用域是整个外部函数（如果代码在函数内）或全局作用域（如果在顶层代码中）。
2. 当 `for` 循环结束后，`i` 依然存在于它声明时所在的作用域中，所以后续能通过 `console.log(i)` 访问到 `i` 的值，此时 `i` 的值为 `5` 。

### ES6 之后的区别

ES6 引入了 `let` 和 `const` 关键字，使用 `let` 声明的变量会形成块级作用域。如果将代码中的 `var` 改为 `let` ，即 `for (let i = 0; i < 5; i++)`，那么 `i` 只在 `for` 循环块内有效，循环结束后，在外部无法访问 `i` ，会报变量未定义的错误。



## Console.log()输出

```javascript
var op = "wdf"
var num = 911
var kun = "坤坤"
console.log(op)
console.log(2 == 2)
console.log(2 === '2')
console.log(num)
console.log(kun)
```



## 条件语句

```javascript
if(){
	/***/
}
else if(){
	/***/
} 
else {
	/***/
}

for(var i = 1 ; i <= n ; i ++){
    /***/
}

while(){
    /***/
}
```



## Function函数

```javascript
//function + 函数名 + (参数(不需要指明类型，虽然只有一个var)) //与c类似
function pp(x){
	if(x == 1 || x == 2)return 1;
    else return pp(x - 1) + pp(x - 2);
}

var res = pp(3);
console.log(pp(3));

function getSum(sta,end,fn){
    var sum = 0;
    for(var i = sta ; i <= end ; i ++ ){
        if(fn(i))sum += i;
    }
    return sum;
}
//调用函数条件内嵌套函数
var kk = getSum(1,100,function(n) {
    if(n % 2 !== 0)return true;
    else return false;
})
```



## Array数组

```javascript
var Arr = [1,2,3,4,5,6] // 0,1,2,...
var l = Arr.length

Arr.push(100)//尾插
Arr.unshift(200)//头插

console.log(Arr)
console.log.apply(Arr.length)

Arr.forEach(function(item,index){
    console.log(item,index)
})
```

***注意：伪数组***

***在 JavaScript 中，伪数组是指一个对象，它看起来像一个数组，但实际上并不是真正的 JavaScript 数组。***

***伪数组具有以下特点：***

1. **下标索引：伪数组可以通过数字索引访问其元素，就像数组一样。通常情况下，伪数组的索引从 0 开始递增。然而，不同于数组的是，伪数组的索引不具备数组的方法和属性。**
2. **长度属性：伪数组对象通常具有一个表示长度的属性，比如`length`。这个属性会根据伪数组中元素的个数自动更新。需要注意的是，虽然伪数组有长度属性，但它并不能像数组那样通过`push()`或`pop()`等方法改变长度。**
3. **类型判断：伪数组的类型通常是`Object`，而不是`Array`。这是因为伪数组并不是真正的数组，只是模拟了数组的结构和行为。**
4. **方法限制：伪数组对象并不具备数组的诸多方法。例如，它没有`forEach()`、`map()`、`filter()`等高阶函数。同时，它也没有`push()`、`pop()`、`splice()`等用于修改数组内容的方法。**

**伪数组通常出现在一些内置方法和函数返回值中，比如像`querySelectorAll`方法返回的`NodeList`对象，或者像`arguments`对象（在函数内部自动创建的）。**



**但是可以使用ES6中的数组转化为真正的数组**



## Object对象

```javascript
//有点像结构体
var obj = {
	name:"kunkun",
	age:78
}
console.log(obj)
console.log(obj.age)
console.log(obj['name'])

//遍历操作 for(var 命名 in 对象名)
for(var key in obj){
    console.log(key,obj[key])
}
```



# DOM(文档对象模型) && BOM(浏览器对象模型)

***简单理解，浏览器给我们提供了很多功能和很多工具，使我们可以去进行网页中的标签操作***



## 获取元素

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
       	<div id = "block">
            Firstcontainer
        </div>
        <p>初始内容</p>
        <p>初始内容</p>
        <p>初始内容</p>
        <p>初始内容</p>
        <script>
            //获取
        	var block = document.getElementById('block')//通过id名获取
            console.log(block)
            var contents = document.getElementsByTagName('p')//通过标签名获取
            console.log(contents)
            var contents1 = document.querySelectorAll()//通过选择器获取
            //修改
            block.textContent = 'Second-JS-container'
            //命名.length , textContent
            for(var i = 0 ; i < contents.length ; i ++ ){
    			contents[i].textContent = '你猜我是第' + i + '个吗'
			}
            //新数组修改
            var textArr = [
    			'first',
    			'second',
    			'third',
    			'fourth'
			]

			for(var i = 0 ; i < contents.length ; i ++ ){
    			contents[i].textContent = textArr[i];
			}
        </script>
    </body>
</html>
```



## 事件（处理用户的交互行为）

```javascript
onClick     //点击
onMouseOver //鼠标经过
onMouseOut  //鼠标移出
onChange    //文本内容改变
onSelect    //文本框选中
onFocus     //光标聚集
onBulr      //移开光标

// html <button onclick="click_event()">Click</button> 对应事件="函数()"
// html <input type = "text" onfocus="focus_event()" onblur="blur_event()">

function click_event()
{
    alert('你在干神么');
}

function focus_event()
{
    console.log('get focus');
}

function blur_event()
{
    console.log('lose focus');
}

```



## 文件获取及修改（实战项目）

***方案一(适用交互多的情况)：***

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="base.css">
    <link rel="stylesheet" href="index.css">   
</head>
<body>
    <!-- head -->
    <div class="wrapper">
        <div class="crumbs">
            <span class="item">首页</span>
            <span>&gt;</span>
            <span class="item">笔记本</span>
        </div>
    </div>    
    <!-- middle -->
    <div class="operation">
        <ul class="row category">
            <li class="item">分类: </li>
            <li class="item">笔记本</li>
            <li class="item">台式机</li>
            <li class="item">智慧屏</li>
        </ul>
        <div class="row discount">
            <li class="item">服务优惠: </li>
            <li class="item">仅看有货</li>
            <li class="item">分期免息</li>
            <li class="item">优惠商品</li>
        </div>
        <div class="row sort">
            <li class="item">排序: </li>
            <li class="item active">综合</li>
            <li class="item">最新</li>
            <li class="item">评论数</li>
            <li class="item">价格</li>
        </div>
    </div>

    <ul class="product">
        <li class="item">
            <a href="#">
                <img class="album" src="img/notebook_1.png" alt="">
                <div class="name">Matebook X Pro Ultra典藏版</div>
                <div class="pay">预定立减300|12期免息</div>
                <div class="price">
                    <div class="now">$13999</div>
                    <div class="discount">$14999</div>
                </div>
                <div class="service">
                    <span class="tip">分期免息</span>
                    <span class="tip">赠送积分</span>
                </div>
                <div class="comment">
                    <span>6978人评论</span>
                    <span>94% 好评</span>
                </div>
            </a>
        </li>
    </ul>
    <!-- 获取resultList -->
    <script src="json.js"></script>
    <script>
        // 1.动态的展示商品列表
        var productElement = document.querySelector('.product')
        for(var i = 0 ; i < resultList.length ; i ++ ){
            // 获取其中的数据
            var resultItem = resultList[i];

            // 将第一条数据转成界面一个item
            // 1.1.item
            var itemElement = doucument.createElement('li');
            itemElement.classList.add('item');
            productElement.append(itemElement);
            // 创建a元素
            var aElement = document.createElement("a");
            aElement.href = "#";
            // 添加img
            var albumElement = document.createElement("img");
            albumElement.classList.add("album");
            // 一般在开发中服务器会给到图片的地址(URL)而不是路径或文件名称
            // src=`${}${}${}`
            albumElement.src = "/img/product_01.png";
            aElement.append(albumElement);
            // 创建name
            var nameElement = doucment.Element("div");
            nameElement.classList.add("name");
            nameElement.textContent = resultItem.name;
            aElement.append(nameElemnet);
            //创建price
            var priceElement = document.createElement("div");
            priceElement.classList.add("price");
            priceElement.textContent = "$" + resultItem.priceElement;
            aElement.append(priceElement);
            // ......

        }
    </script>
</body>
</html>
```

***方案二(适用多展示的情况,此方案对与交互功能的添加与修改较为麻烦)：***

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="base.css">
    <link rel="stylesheet" href="index.css">   
</head>
<body>
    <!-- head -->
    <div class="wrapper">
        <div class="crumbs">
            <span class="item">首页</span>
            <span>&gt;</span>
            <span class="item">笔记本</span>
        </div>
        
        <!-- middle -->
    <div class="operation">
        <ul class="row category">
            <li class="item">分类: </li>
            <li class="item">笔记本</li>
            <li class="item">台式机</li>
            <li class="item">智慧屏</li>
        </ul>
        <div class="row discount">
            <li class="item">服务优惠: </li>
            <li class="item">仅看有货</li>
            <li class="item">分期免息</li>
            <li class="item">优惠商品</li>
        </div>
        <div class="row sort">
            <li class="item">排序: </li>
            <li class="item active">综合</li>
            <li class="item">最新</li>
            <li class="item">评论数</li>
            <li class="item">价格</li>
        </div>
    </div>

 <ul class="product">
        <li class="item">
            <a href="#">
                <img class="album" src="img/notebook_1.png" alt="">
                <div class="name">Matebook X Pro Ultra典藏版</div>
                <div class="pay">预定立减300|12期免息</div>
                <div class="price">
                    <div class="now">$13999</div>
                    <div class="discount">$14999</div>
                </div>
                <div class="service">
                    <span class="tip">分期免息</span>
                    <span class="tip">赠送积分</span>
                </div>
                <div class="comment">
                    <span>6978人评论</span>
                    <span>94% 好评</span>
                </div>
            </a>
        </li>
    </ul>

    </div>

   

   
    <!-- 获取resultList -->
    <script src="json.js"></script>
    <script>
        // 1.动态的展示商品列表
        var productElement = document.querySelector(".product")
        for(var i = 0 ; i < resultList.length ; i ++ ){
            // 获取其中的数据
            var resultItem = resultList[i];

            var itemEl = document.createElement("li");
            itemEl.classList.add("item");

            itemEl.innerHTML = `
                <a href="#">
                    <img class="album" src="img/notebook_1.png" alt="">
                    <div class="name">${resultItem.name}</div>
                    <div class="pay">${resultItem.promotionInfo}</div>
                    <div class="price">
                        <div class="now">${resultItem.now}</div>
                        <div class="discount">${resultItem.discount}</div>
                    </div>
                    <div class="service">
                        <span class="tip">分期免息</span>
                        <span class="tip">赠送积分</span>
                    </div>
                    <div class="comment">
                        <span>${resultItem.rateCount}人评论</span>
                        <span>${resultItem.goodRate}% 好评</span>
                    </div>
                </a>
            `
    
            productElement.append(itemEl);
        }
    </script>
</body>
</html>
```



# ES6

ES6 是 ECMAScript 2015 的简称，是 JavaScript 语言的一个重要版本，它带来了许多新的特性和语法改进，旨在提高 JavaScript 的开发效率和代码质量。

ES6 的主要特性包括：

1. **块级作用域**：使用`let`和`const`关键字声明变量，具有块级作用域，避免了变量提升和全局变量污染的问题。
2. **箭头函数**：提供了一种更简洁的函数定义方式，简化了函数的书写。
3. **解构赋值**：允许从数组或对象中提取值，并将其赋值给变量。
4. **模板字符串**：使用反引号（`）来定义字符串，可以在字符串中嵌入表达式。
5. **类和继承**：引入了类的概念，使 JavaScript 的面向对象编程更加简洁和直观。
6. **模块化**：支持模块的定义和导入导出，提高了代码的可维护性和复用性。
7. **Promise**：用于处理异步操作，使异步代码更加简洁和易于理解。
8. **迭代器和生成器**：提供了一种遍历集合的新方式，使代码更加简洁和高效。



```javascript
//1.变量与常量
{
    let count = 0;
    ++ count;
    //先使用const常量定义,发现该值需要更改再定义成变量(var,let)

    // const BASE_URL = 'http://web.hello.com/api';
}

// 2.模板字符串
const str1 = 'bond';
const str2 = `GG-${str1}`;

console.log(str2);

// 3.解构赋值
const array = [1,2,3];
const val_1 = array[0];
const val_2 = array[1];
const val_3 = array[2];
//  ||
//  ||
const [a,b,c] = [91,78,66];

console.log(b);

// 解构字符串时 常量/变量 名得和内容名一致(如：user_name)
// 也可以像第二种方式获取(age:user_age)
// ... + 变量名 会获取 剩余未被获取的内容
const {user_name , age: user_age , ...other_info} = {
    user_name: 'GG-bond',
    age: 99,
    gender: 'male',
    category: 'user'
}

console.log(user_name , user_age , other_info);

// 4.1.数组和对象的扩展
const arrary_1 = [1,2,3];
const arrary_2 = [4,5,6];

// ...在赋值符号前为解构，在后为扩展运算符
// 扩展符类似解压包,把对应的数组拆包放在其中

const arrary_3 = [100,...arrary_1,...arrary_2,90,22];

console.log(arrary_3);

const obj_1 = {
    age: 18
}
const obj_2 = {
    gender:'male'
}

const obj_3 = {
    name: 'GG-bond',
    ...obj_1,
    ...obj_2
}

console.log(obj_3);

//  4.2.数组方法 1-Array.from()
function fn() {
    Array.from(arguments).forEach(function(item){
        console.log(item);
    })
}
fn(1,2,3,4);

// 4.3 对象的方法 Object.assign()
const objA = {
    name: 'GG-bond',
    age:99
}

const objB = {
    age:78,
    gender:'male',
    category:'user'
}
// 可以对对象进行一个拷贝功能或者合并 ， 基于旧对象生成新对象功能
const objC = Object.assign({},objA,objB)
console.log(objA,objB,objC)

// 5.Class 类的功能
class A {
    constructor (name,age) {
        this.name = name;
        this.age = age;
    }

    // 类似函数
    intruduces(){
        console.log(`瓦达西瓦${this.name}`);
    }

}

const a1 = new A('GG-bond',77);
console.log(a1);
a1.intruduces();

// 继承
class B extends A {
    constructor(name,age,gender){
        // 继承时若继承父类原有参数需要先用super进行导入，再创建其他新参数
        super(name,age);
        this.gender = gender;
    }

    Say (){
        console.log('GG-FF');
    }
}

const b1 = new B('FF',18,'female')
console.log(b1);
b1.Say();
b1.intruduces();

// 6.函数箭头(伪函数)
// 箭头前为传入值 箭头后为返回值
const getSum_1 = n => n + 3;
const getSum_2 = (n1,n2) => n1 + n2;
// 没有return则会返回undefined
const getSum_3 = (n1,n2, ...other) => console.log(n1,n2,other)

// const getSum3 = (n1,n2,...other) => {
//     const otherSum = other.reduce((sum,val) => sum + val,0);
//     return otherSum;
// }
// console.log(getSum3(1,2,55,66,77,88,99));

console.log(getSum_1(5));
console.log(getSum_2(7,7));
console.log(getSum_3(1,2,55,66,77,88,99));
```



# ES6异步处理

## 1.Promise 与 Async

***异步就是一个时间干多件事情***
