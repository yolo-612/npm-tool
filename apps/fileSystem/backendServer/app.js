const http = require('http');
const { handleUpload } = require('./routes/upload.js');
const { handleList } = require('./routes/list.js');
const { handleDownload } = require('./routes/download.js');

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    // 设置 CORS 头，允许所有来源进行跨域请求
    res.setHeader('Access-Control-Allow-Origin', '*');  // 允许所有域跨域请求
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  // 允许的请求方法
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // 允许的请求头

    // 预检请求 (OPTIONS) 的处理
    if (req.method === 'OPTIONS') {
      res.writeHead(204);  // 204 表示响应成功，没有内容返回
      res.end();
      return;
    }

    if (req.method === 'POST' && url.pathname === '/upload') {
      handleUpload(req, res);
    } else if (req.method === 'GET' && url.pathname === '/list') {
      handleList(req, res);
    } else if (req.method === 'GET' && url.pathname === '/download') {
      handleDownload(req, res, url);
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
});

server.listen(8080, () => {
    console.log('文件存储服务启动，监听8080端口');
});