import http from 'node:http';

// Create an HTTP server

const server = http.createServer((req, res) => {
 const { url, method } = req;

 if (method === 'GET' && url === '/users') {
    return res.end('Listagem de usuários')
  }
  if (method === 'POST' && url === '/users') {
    return res.end('Criação de usuário')
  }

  return res.end('Hello World\n');
});

server.listen(3333);
