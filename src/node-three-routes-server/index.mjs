import http from "http";
import process from "process";
import { normalizeUrl } from "../shared/normalize-url.mjs";
import { runServer } from "../shared/run-server.mjs";

const PORT = process.env.PORT || 3000;

const TEXT_HEADER = { "Content-Type": "text/plain" };

function write200Text(res) {
  return res.writeHead(200, TEXT_HEADER);
}

const server = http.createServer((req, res) => {
  const path = normalizeUrl(req.url);

  switch (path) {
    case "":
      write200Text(res).end("Homepage");
      return;
    case "/about":
      write200Text(res).end("About");
      return;
    default:
      res.writeHead(400, TEXT_HEADER).end("Not Found");
      return;
  }
});

runServer(server, PORT);
