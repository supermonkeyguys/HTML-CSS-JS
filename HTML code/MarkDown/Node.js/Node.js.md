# Node.js

***Node.js是Javascript的一个运行环境，能够让Js不借助浏览器环境直接在本地运行(本地终端)-----Win+R呼出控制面板输入"cmd",或者在Js文件目录下shift+右键打开终端***



***运行时输入"node" + "文件名"***

![](C:\Users\30292\Desktop\HTML code\MarkDown\Node.js\img\Snipaste_2025-02-28_15-26-55.png)



## 1.读取文件内容

```javascript
// 使用fs模块
//导入fs模块
const fs = require('fs')

// 读取文件内容
// 1.文件路径
// 2.编码格式
// 3.回调函数
fs.readFile('./files/1.txt','UTF-8',function(err,dataStr){
    // 读取成功err值为null,失败为undefined
    console.log(err)
    console.log('-------')
    console.log(dataStr)
})
```



## 2.写入文件内容

```javascript
const fs = require('fs')

// 写入文件内容(覆盖原有内容)
// 1.文件路径
// 2.写入内容
// 3.回调函数
// 编码默认UTF-8
fs.writeFile('./files/1.txt','FF-princes',function(err){
    // 成功写入err值为null , 如果失败则为错误对象
    if(err){
        return console.log('文件写入失败！' + err.messge)
    }
    console.log('文件写入成功')
})
```



***练手案例***

```javascript
const fs = require('fs');


fs.readFile('./files/grade_old.txt','UTF-8',function(err,dataStr){
    if(err){
        return console.log('文件读取失败: ' + err.message);
    }
    console.log('文件读取成功: ' + dataStr);

    const arry_old =  dataStr.split(' ');

    const arry_new = [];

    arry_old.forEach(items => {
        arry_new.push(items.replace('=',': '));
    })

    // console.log(arry_new);

    const newStr = arry_new.join('\r\n');

    // console.log(newStr);

    fs.writeFile('./files/grade_new.txt',newStr,function(err){
        if(err){
            return console.log('文件写入失败！' + err.message)
        }

        console.log('写入成绩成功！')

        console.log(newStr)

    })

})
```



## 3.FS文件系统模块

![](C:\Users\30292\Desktop\HTML code\MarkDown\Node.js\img\Snipaste_2025-02-28_22-19-55.png)

***但绝对路径会导致一个问题，当代码移植到其他设备上时，文件路径改变，要不断更改。Result:移植性差，不利于维护***



***解决方案：__dirname***

```javascript
//__dirname 表示文件当前所处目录
console.log(__dirname);

const fs = require('fs');

//拼接文件路径
fs.readFile(__dirname + '/files/grade_new.txt','UTF-8', function(err,dataStr){
    if(err){
        return console.log('Failed to read the content' + err.message);
    }
    console.log(dataStr)
})
```



## 4.Path路径模块

![](C:\Users\30292\Desktop\HTML code\MarkDown\Node.js\img\Snipaste_2025-02-28_22-37-52.png)

```javascript
// 导入path路径模块
const path = require('path');

//使用path.join进行文件路径拼接
const pathStr1 = path.join('/a','/b/c','../','./d','e');
console.log(pathStr1); // '../' 会抵消掉前面一个路径 , 输出\a\b\d\e

const pathStr2 = path.join(__dirname,'./files/grade_new.txt');
console.log(pathStr2);

fs.readFile(path.join(__dirname,'./files/grade_new.txt'),'UTF-8',function(err,dataStr){
    if(err){
        return console.log(err.meassage);
    }
    console.log(dataStr);
})

//path.basename
const fpath = '/a/b/c/index.html'; //文件的存放路径

var fullName = path.basename(fpath);
console.log(fullName);//输出 index.html

var name_without_ext = path.basename(fpath,'.html');
console.log(name_without_ext);//输出 index

//path.extname() 获取文件扩展名
const fpath_ext = '/a/b/c/index.html';

const fext = path.extname(fpath_ext);
console.log(fext);
```



***小练习（拆解文件夹目录下html文件的CSS和JS部分）***



```javascript
const fs = require('fs');
const path = require('path');

//[]内为匹配内容 \s 代表空白字符; \S 代表非空白字符; *表示匹配任意次;
const get_Style = /<style>[\s\S]*<\/style>/;
const get_JS = /<script>[\s\S]*<\/script>/;

fs.readFile(path.join(__dirname,'./files/index.html'),'UTF-8',function(err,dataStr){
    if(err){
        return console.log('Fail to find the document!' + err.message);
    }
    resolveCSS(dataStr);
    resolveJS(dataStr);
    resolveHTML(dataStr);
})

function resolveCSS(htmlStr){
    const r1 = get_Style.exec(htmlStr);
    const new_CSS = r1[0].replace('<style>','').replace('</style>','');

    fs.writeFile(path.join(__dirname,'./files/path-text/index.css'),new_CSS,err => {
        if(err)return console.log('Fail to put in the style' + err.message);
        console.log('OK!');
    })
}

function resolveJS(htmlStr){
    const r1 = get_JS.exec(htmlStr);
    const new_JS = r1[0].replace('<script>','').replace('</script>','');

    fs.writeFile(path.join(__dirname,'./files/path-text/index.js'),new_JS,err => {
        if(err)return console.log('Fail to put int the Javascript' + err.message);
        console.log('OK!');
    })
}

function resolveHTML(htmlStr){
    const new_HTML = htmlStr
    .replace(get_Style,'<link rel="stylesheet" href="./path-text/index.css">')
    .replace(get_JS,'<script src="./path-text/index.js"></script>')

    fs.writeFile(path.join(__dirname,'./files/index.html'),new_HTML,err => {
        if(err)return console.log('Fail to put into html' + err.message);
        console.log('OK!!!');
    })
}
//执行过一次后原代码改变
//在此之后改代码再次运行则会出错
//可以把文件还原
```



## 5.HTTP模块

### 1.概念

***“http” 是 “HyperText Transfer Protocol” 的缩写，即超文本传输协议。它是一种用于分布式、协作式和超媒体信息系统的应用层协议，是互联网上应用最为广泛的一种网络协议之一。***

以下是关于 HTTP 的一些关键信息：

1. **基本功能**：HTTP 定义了客户端（如浏览器）如何向服务器请求资源（如网页、图片、视频等），以及服务器如何响应这些请求。客户端通过发送 HTTP 请求消息与服务器进行通信，服务器接收到请求后进行处理，并返回包含请求资源或相关状态信息的 HTTP 响应消息。
2. **请求方法**：常见的 HTTP 请求方法有 GET（用于获取资源）、POST（用于提交数据到服务器，如表单提交）、PUT（用于更新资源）、DELETE（用于删除资源）等。
3. **URL**：通过统一资源定位符（URL）来标识要访问的资源，例如 `https://www.example.com/index.html` ，其中 `http` 或 `https` 是协议部分，`www.example.com` 是服务器地址，`/index.html` 是资源路径。
4. **HTTP 状态码**：服务器在响应中使用状态码来表示请求的处理结果，如 200 表示请求成功，404 表示资源未找到，500 表示服务器内部错误等。



***在网络节点中，负责消费资源的电脑叫客户端；负责对外提供网络资源的电脑，叫做服务器。***

![](C:\Users\30292\Desktop\HTML code\MarkDown\Node.js\img\Snipaste_2025-03-02_21-40-36.png)

![](C:\Users\30292\Desktop\HTML code\MarkDown\Node.js\img\Snipaste_2025-03-02_21-45-28.png)



***http模块导入***

```javascript
const http = require('http');
```



![](C:\Users\30292\Desktop\HTML code\MarkDown\Node.js\img\Snipaste_2025-03-03_10-37-41.png)

![](C:\Users\30292\Desktop\HTML code\MarkDown\Node.js\img\Snipaste_2025-03-03_10-41-31.png)



```javascript
// 导入http模块
const http = require('http');
// 创建Web服务器
const server = http.createServer();
// 为服务器实例绑定 request 事件 监听客户端请求
server.on('request',function(req,res) {
    console.log('Someone visit our Web server.');
})

server.listen(8080,function(){
    console.log('server running at http://127.0.0.1:8080')
})
```



```javascript
const http = require('http');
const server = http.createServer();

//req为请求对象 ， 包含了与客户端相关的数据和属性
server.on('request',(req,res) => {
    //URL地址
    const url = req.url;
    //客户端请求的method类型
    const method = req.method; 

    const str = `Your request url is ${url} , and request method is ${method}`;

    console.log(str);
	//解决响应中文乱码问题 调用setHeader() 设置Content-Type 响应头 
    res.setHeader('Content-Type','text/html ; charset=UTF-8')
	//res.end()用于把内容响应给客户端
    res.end('你好');
});

server.listen(80,() => {
    console.log('Server running at http://127.0.0.1');
})
```



***根据url不同响应，返回给客户端不同结果***



```javascript
const http = require('http');

const server = http.createServer();

server.on('request',(req,res) => {

    const url = req.url;

    let content = '404 Not found';

    const method = req.method;

    if(url === '/' || url == '/index.html')content = '<h1>首页</h1>';
    else if(url === '/about.html')content = '<h1>关于首页</h1>';

    res.setHeader('Content-Type','text/html ; charset=UTF-8');

    res.end(content);

})

server.listen(80, () => {
console.log('server running at http://127.0.0.1');

})
```

