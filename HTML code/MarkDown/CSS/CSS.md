# CSS



## 1.行内样式（不推荐，垃圾）

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>行内样式</title>
    </head>
    <body>
        //一个元素只能有一个 style 属性，当你多次使用 style 属性时
        //后面的 style 属性会覆盖前面的 style 属性，所以只有后面的样式会生效。
        //错误样式
        <-<h1 style="color:green" style="text-align:center">Hello World</h1>->
        <h1 style="text-align:center;color:green">Hello World</h1>
    </body>
</html>
```



## 2.内部样式

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>内部样式</title>
        <style>
            h1{
                color:greenyellow;
                text-align: center;
                font-size:80px;
            }
            h2{
                color:aquamarine;
                text-align:center;
                font-size:60px;
            }
            h3{
                color:aqua;
                text-align:center;
                font-size:50px;
            }
        </style>
    </head>
    <body>
        <h1>Hello World</h1>
        <h2>Hello CSS</h2>
        <h3>Hello Javascript</h3>
    </body>
</html>
```



## 3.外部样式(把CSS和HTML拆分成两个文件)

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>外部样式</title>
        <-href="文件名.css"->
        <link rel="stylesheet" href="cs.css">
    </head>
    <body>
        <h1>Hello World</h1>
        <h2>Hello CSS</h2>
        <h3>Hello Javascript</h3>
    </body>
</html>
```

**CSS部分**

```css
h1{
    color:greenyellow;
    text-align: center;
    font-size:80px;
}
h2{
    color:aquamarine;
    text-align:center;
    font-size:60px;
}
h3{
    color:aqua;
    text-align:center;
    font-size:50px;
}
```



## 4.样式表优先级

```html
<!DOCTYPE html>
<html lang="zh-CN">
 <head>
    <meta charset="UTF-8">
    <title>样式优先级</title>
    <style>
        h1{
            color:red;
            text-align: center;
            font-size: 60px;
        }
    </style>
</head>
<body>
    <-样式发生冲突，就近优先(不论内部样式和外部样式)->
    <-最终颜色为aqua->
    <h1 style="color:aqua">Hello</h1>
</body>
</html>
```



## 5.CSS选择器

元素选择器

类选择器

ID选择器(ID >　类)

通用选择器

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>选择器1</title>
        <style>
            /* 标签(元素)选择器 */
            h1{
                text-align:center;
                color:greenyellow;
                font-size: 60px;
                
            }
            /* 类选择器 */
            .highlight{
                text-align:center;
                color:aqua;
                font-size: 50px;
            }
            /* ID选择器 */
            #header{
                text-align:center;
                color:aquamarine;
                font-size:45px;
            }
            /* 通用选择器(选择所有标签) */
            *{
                font-family: 'Courier New', Courier, monospace;
            }
        </style>
    </head>
    <body>
        <h1>元素选择器</h1>
        <h2 class="highlight">类选择器</h2>
        <h3 id="header">ID选择器</h3>
    </body>
</html>
```



子元素选择器　优先度：（子　＞　后代）

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>选择器2</title>
        <style>
            /* 子元素选择器 */
            .father > .son{
                color:greenyellow;
                text-align: center;
                font-size: 60px;
            }
        </style>
    </head>
    <body>
        <!-- 子元素选择器 -->
        <div class="father">
            <p class="son">子元素选择器</p>
        </div>
    </body>
</html>
```



后代选择器（包含选择器）

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>选择器2</title>
        <style>
            /* 子元素选择器 */
            .father > .son{
                color:greenyellow;
                text-align: center;
                font-size: 60px;
            }
            /* 后代选择器 */
            .father p{
                text-align:center;
                color:chocolate;
                font-size: 40px;
            }
            
        </style>
    </head>
    <body>
        <!-- 子元素选择器 -->
        <div class="father">
            <p class="son">子元素选择器</p>
            <div>
                <!-- 后代选择器 -->
                <p class="grandson">后代选择器</p>
                <div>
                    <p>ppp</p>
                </div>
            </div>
        </div>
        
    </body>
</html>
```



并集选择器（兄弟选择器）

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>选择器2</title>
        <style>
            /* 子元素选择器 */
            .father > .son{
                color:greenyellow;
                text-align: center;
                font-size: 60px;
            }
            /* 后代选择器 */
            .father p{
                text-align:center;
                color:chocolate;
                font-size: 40px;
            }
            /* 兄弟选择器(标签 + 相邻的下一标签)(如果隔开则无效) */
            h3 + p{
                text-align: center;
                color:goldenrod;
                font-size: 40px;
                font-family: "KaiTi";
            }
        </style>
    </head>
    <body>
        <!-- 子元素选择器 -->
        <div class="father">
            <p class="son">子元素选择器</p>
            <div>
                <!-- 后代选择器 -->
                <p class="grandson">后代选择器</p>
                <div>
                    <p>ppp</p>
                </div>
            </div>
        </div>

        <p>P标签</p>
        <h3>相邻兄弟选择器</h3>
        <!-- <div>Hello</div> -->
        <p>P标签</p>

    </body>
</html>
```



伪类选择器(有交互或者满足某种条件)

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>选择器2</title>
        <style>
            h1{
                text-align:center;
            }
            /* 子元素选择器 */
            .father > .son{
                color:greenyellow;
                text-align: center;
                font-size: 60px;
            }
            /* 后代选择器 */
            .father p{
                text-align:center;
                color:chocolate;
                font-size: 40px;
            }
            /* 兄弟选择器(标签 + 相邻的下一标签)(如果隔开则无效) */
            h3 + p{
                text-align: center;
                color:goldenrod;
                font-size: 40px;
                font-family: "KaiTi";
            }
            /* 伪类选择器 */
            h1:hover{
                color:aqua;
                text-align: center;
                font-size:70px;
                font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
            }
            div:first-child{
                color:coral;
                font-size: 60px;
            }
        </style>
    </head>
    <body>
        <div>LoL</div>
        
        <h1>Hello World!</h1>

        <!-- 子元素选择器 -->
        <div class="father">
            <p>Pop</p>
            <p class="son">子元素选择器</p>
            <div>
                <!-- 后代选择器 -->
                <p class="grandson">后代选择器</p>
                <div>
                    <p>ppp</p>
                </div>
            </div>
        </div>

        <p>P标签</p>
        <h3>相邻兄弟选择器</h3>
        <!-- <div>Hello</div> -->
        <p>P标签</p>

    </body>
</html>
```



## 6.CSS常用属性

行内外属性转化(display)

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>CSS常用属性</title>
    </head>        
    <body>
        <!-- 块转行 -->
        <div style="display: inline; background-color:aquamarine">Inline</div>
        <div style="background-color: aquamarine;">Inline</div>
        <!-- 行转块 -->
        <span style="background-color:chartreuse">Inline-block</span>
        <span style="display:block; background-color:chartreuse">Inline-block</span>
        
    </body>
</html>
```

![](C:\Users\30292\Desktop\HTML code\MarkDown\CSS\Snipaste_2025-02-23_16-00-30.png)

![](C:\Users\30292\Desktop\HTML code\MarkDown\CSS\Snipaste_2025-02-23_16-15-21.png)



## 标签使用

### ***box-sizing:***

`content-box` 是 CSS 盒模型的默认计算方式，它将元素的宽度和高度只应用于内容区，内边距和边框会额外增加元素的实际尺寸

- **实际宽度** = `width` + `左右padding` + `左右border`
- **实际高度** = `height` + `上下padding` + `上下border`

`border-box` 则将内边距和边框包含在元素的宽度和高度之内，这样在设置元素大小时更容易控制，尤其是在进行响应式布局时，使用 `border-box` 可以避免因内边距和边框导致布局混乱。

- **内容区宽度** = `width` - `左右padding` - `左右border`
- **内容区高度** = `height` - `上下padding` - `上下border`

### ***display:***

#### 1. `block`（块级元素）

- **特点**：默认占据整行宽度，可设置宽度、高度、内边距、外边距等属性。多个块级元素会依次堆叠排列。
- **示例元素**：`<div>`、`<p>`、`<h1>` - `<h6>`等。比如一个`<div>`元素，默认会从新的一行开始，宽度撑满父元素（除非另外设置宽度）。
- **应用场景**：常用于构建网页的整体结构框架，如页面的头部、主体内容区域、底部等。

#### 2. `inline`（行内元素）

- **特点**：不会独占一行，只占据自身内容的宽度和高度，无法直接设置宽度和高度（宽高由内容决定），左右外边距、内边距有效，上下外边距、内边距虽能设置但不会影响布局。
- **示例元素**：`<a>`、`<span>`、`<img>`等。例如多个`<span>`元素在一行中依次排列显示内容。
- **应用场景**：主要用于文本中的强调、链接等小范围内容修饰。

#### 3. `inline-block`（行内块元素）

- **特点**：结合了`block`和`inline`的优点，既不会独占一行，又可以设置宽度、高度、内边距和外边距等属性。
- **应用场景**：常用于导航栏选项、按钮等需要在一行显示且可设置尺寸的元素。比如导航栏中的各个链接按钮，使用`inline-block`可以方便地排列且能自定义样式。

#### 4. `none`（隐藏元素）

- **特点**：使元素在页面上完全消失，不占据任何空间，就好像该元素不存在一样。
- **应用场景**：常用于通过 JavaScript 动态控制元素的显示与隐藏，比如实现下拉菜单的隐藏和显示效果。

#### 5. `flex`（弹性盒模型）

- **特点**：用于创建灵活的响应式布局，方便控制子元素的排列方向、对齐方式和分布空间等。通过设置`flex`容器的属性，能轻松实现水平或垂直排列、元素间的间距控制等。
- **应用场景**：广泛应用于现代网页布局，尤其是在需要自适应不同屏幕尺寸的情况下，如移动端页面布局、复杂的页面模块排版等。

#### 6. `grid`（网格布局）

- **特点**：提供了一种基于网格的二维布局方式，通过定义行和列来精确控制元素的位置和大小，使网页布局更加规整和灵活。
- **应用场景**：适合复杂的多列布局，如图片画廊、产品展示列表等，能够高效地管理不同元素之间的空间关系。
