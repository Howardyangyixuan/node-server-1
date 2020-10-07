import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';

console.log('hi');
const server = http.createServer();
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  console.log('有人请求了');
  console.log(request.httpVersion);
  console.log(request.url);
  console.log(request.method);
  console.log(request.headers);
  const array = [];
  request.on('data', (chunk => {array.push(chunk);}));
  request.on('end', () => {
    const body = Buffer.concat(array).toString();
    console.log('body');
    console.log(body);
    response.statusCode = 400;
    response.setHeader('Yyx','I am Y-y_x')
    response.end('hi');
  });

});
server.listen(8888);