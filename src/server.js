import http from "node:http";
import { json } from "./middlewares/json.js";

// Create an HTTP server

const users = [];

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    return res
      .writeHead(200, { "Content-Type": "application/json" })
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    users.push({
      id: users.length + 1,
      name: name,
      email: email,
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);
