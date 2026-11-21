const http = require("http");
const fs = require("fs");
const path = require("path");
const handler = require("./api/order.js");

const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8" };

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/order")) {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", async () => {
      req.body = chunks.length ? Buffer.concat(chunks).toString("utf8") : undefined;
      const u = new URL(req.url, "http://localhost");
      req.query = Object.fromEntries(u.searchParams);
      await handler(req, res);
    });
    return;
  }
  const file = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const p = path.join(__dirname, file);
  fs.readFile(p, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end("not found");
      return;
    }
    res.setHeader("Content-Type", types[path.extname(p)] || "application/octet-stream");
    res.end(data);
  });
});

server.listen(8124, "127.0.0.1", () => console.log("dev server on 8124"));
