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

