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