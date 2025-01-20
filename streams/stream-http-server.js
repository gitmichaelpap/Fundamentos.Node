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

const server = http.createServer((req, res) => {

  return req.pipe(new InverseNumberStream()).pipe(res);
});

server.listen(3334);
