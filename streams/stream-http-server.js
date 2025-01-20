import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = parseInt(chunk.toString());
    const result = number * -1;

    console.log(`Received number: ${number}, sending back: ${result}`);

    callback(null, Buffer.from(result.toString()));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStream = Buffer.concat(buffers).toString();

  console.log(`Received: ${fullStream}`);

  return res.end(fullStream);
});

server.listen(3334);
