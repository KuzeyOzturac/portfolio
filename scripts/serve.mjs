import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
const root = process.cwd();
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".png": "image/png",
  ".webm": "video/webm",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};
http
  .createServer(async (req, res) => {
    try {
      let url = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      ).replace(/^\/portfolio\/?/, "/");
      if (url.endsWith("/")) url += "index.html";
      const f = path.resolve(root, "." + url);
      if (!f.startsWith(root + path.sep)) throw Error();
      const body = await readFile(f);
      res.writeHead(200, {
        "Content-Type": mime[path.extname(f)] || "application/octet-stream",
        "Cache-Control": "no-cache",
      });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  })
  .listen(4173, "0.0.0.0", () =>
    console.log("Portfolio preview: http://localhost:4173/portfolio/"),
  );
