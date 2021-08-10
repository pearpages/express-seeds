import { write } from "fs";
import http from "http";

const port = process.env.PORT || 3000;

function normalizeUrl(url) {
  // normalize url by removing querystring, optional
  // trailing slash, and making it lowercase
  return url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
}

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

server.listen(port, () =>
  console.log(
    `server started on port ${port}; ` + "press Ctrl-C to terminate...."
  )
);
