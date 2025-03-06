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