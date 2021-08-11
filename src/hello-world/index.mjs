import http from "http";
import process from 'process';
import { runServer } from '../shared/run-server.mjs';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello world!");
});

runServer(server, PORT);
