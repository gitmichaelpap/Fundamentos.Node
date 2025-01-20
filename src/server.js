import http from "node:http";

// Create an HTTP server

const users = [];

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (method === "GET" && url === "/users") {
    return res
      .writeHead(200, { "Content-Type": "application/json" })
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: users.length + 1,
      name: "John Doe",
      email: "johndoe@example.com",
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);
