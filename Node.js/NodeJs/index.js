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

