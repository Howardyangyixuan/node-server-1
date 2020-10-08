import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as fs from 'fs';
import * as p from 'path';
import * as url from 'url';

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public');
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const {method, url: path, headers} = request;
    const {pathname, search} = url.parse(path);
    // console.log(pathname);
    let filename = pathname.substring(1);
    if(filename===''){
      filename = 'index.html'
    }
    fs.readFile(p.resolve(publicDir, filename), (error, data) => {
      if (error) {
        if (error.code === 'ENOENT') {
          response.setHeader('Content-Type', 'text/html;charset=utf-8');
          response.statusCode = 404;
          fs.readFile(p.resolve(publicDir, '404.html'),(error,data)=>{response.end(data)});
        } else {
          response.statusCode = 500;
          response.end('服务器繁忙，请稍后再试');
        }
      } else {
        response.end(data);
      }
    });
  }
);
server.listen(8888);