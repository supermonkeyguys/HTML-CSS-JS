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