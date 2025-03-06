# 移动端适配方案

![](C:\Users\30292\Desktop\HTML code\MarkDown\移动端适配\img\Snipaste_2025-03-04_19-24-43.png)

***一：因为百分比相对往往不同（参照物），使用非常少（面试可能考）***



***二：动态分配rem + 动态HTML的font-size*** 

rem单位换算：

***1***.手动换算

***2***. less函数

```less
.pxToRem{
    res:(@px / htmlFontSize) * 1rem;
}
.box{
    width: .pxToRem(100)[res];
    height:.pxToRem(100)[res];
}
```

***3***. postcss-pxtorem(插件，后续学习)：web-pack打包自动转换

***4***. vs-code插件（PX to rem）要在扩展中配置转化单位（xx PX）



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box{
            background-color:greenyellow;
            height:2rem;
            width:2rem;
        }

    </style>
</head>
<body>
    
    <div class="box"></div>

    <script>
        const html = document.documentElement

        function setRemUnit() {
            const htmlWidth = html.clientWidth

            const htmlFontSize = htmlWidth / 10;

            html.style.fontSize = htmlFontSize + "px";
        
        }

        setRemUnit();

        window.addEventListener("resize",setRemUnit);

    </script>
</body>
</html>
```



![](C:\Users\30292\Desktop\HTML code\MarkDown\移动端适配\img\Snipaste_2025-03-04_19-32-00.png)

![](C:\Users\30292\Desktop\HTML code\MarkDown\移动端适配\img\Snipaste_2025-03-04_20-30-44.png)







***三：vw(viewport width)单位     vh(veiwport height)*** 
$$
在大小为h-px的屏幕上==>1vw = 0.01 * h
$$
![](C:\Users\30292\Desktop\HTML code\MarkDown\移动端适配\img\Snipaste_2025-03-04_19-37-58.png)



***vw与rem比较：***

*![](C:\Users\30292\Desktop\HTML code\MarkDown\移动端适配\img\Snipaste_2025-03-04_21-33-12.png)*



***vw换算：***

```less
@vwUnit: 3.75;

.pxToVw(@px){
    result: (@px / @vwUnit) * 1vw;
}
.box{
    width:pxToVw(100)[result];
    height:pxToVw(100)[result];
}
```

