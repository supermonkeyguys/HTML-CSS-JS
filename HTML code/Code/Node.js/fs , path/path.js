//__dirname 表示文件当前所处目录
// console.log(__dirname);

// const fs = require('fs');

// fs.readFile(__dirname + '/files/grade_new.txt','UTF-8', function(err,dataStr){
//     if(err){
//         return console.log('Failed to read the content' + err.message);
//     }
//     console.log(dataStr)
// })


// 导入path路径模块
const path = require('path');
const fs = require('fs');

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

//path.basename()
const fpath = '/a/b/c/index.html'; //文件的存放路径

var fullName = path.basename(fpath);
console.log(fullName);//输出 index.html

var name_without_ext = path.basename(fpath,'.html');
console.log(name_without_ext);//输出 index

//path.extname() 获取文件扩展名
const fpath_ext = '/a/b/c/index.html';

const fext = path.extname(fpath_ext);
console.log(fext);