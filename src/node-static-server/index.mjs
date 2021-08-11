import http from 'http';
import fs from 'fs';
import process from 'process';
import { normalizeUrl } from '../shared/normalize-url.mjs';
import { runServer } from '../shared/run-server.mjs';
import { getDirname } from '../shared/dirname.mjs';

const __dirname = getDirname(import.meta.url);
const PORT = process.env.PORT || 3000;

function serveStaticFile(res, path, contentType, responseCode = 200) {
  fs.readFile(__dirname + path, (err, data) => {
    if(err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      return res.end('500 - Internal Error')
    }
    res.writeHead(responseCode, { 'Content-Type': contentType })
    res.end(data)
  })
}

console.log(__dirname);

const server = http.createServer((req,res) => {
  // normalize url by removing querystring, optional trailing slash, and
  // making lowercase
  const path = normalizeUrl(req.url)
  console.log('hello', path);
  switch(path) {
    case '':
      serveStaticFile(res, '/public/home.html', 'text/html')
      break
    case '/about':
      serveStaticFile(res, '/public/about.html', 'text/html')
      break
    case '/img/logo.jpg':
      serveStaticFile(res, '/public/img/logo.jpg', 'image/jpg')
      break
    default:
      serveStaticFile(res, '/public/404.html', 'text/html', 404)
      break
  }
})

runServer(server, PORT);