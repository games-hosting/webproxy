import { createBareServer } from "@tomphttp/bare-server-node";
import express from "express";
import { createServer } from "http";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const bareServer = createBareServer("/bare/");

app.use(express.static(join(__dirname, "static")));
app.use((req, res) => res.sendFile(join(__dirname, "static", "index.html")));

const server = createServer();
server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) bareServer.routeRequest(req, res);
  else app(req, res);
});
server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) bareServer.routeUpgrade(req, socket, head);
  else socket.destroy();
});

server.listen(process.env.PORT || 8080, () =>
  console.log("Running on port", process.env.PORT || 8080)
);
