// process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from "node:stream";

class OneToHundred extends Readable {
  i = 1;

  _read() {
    setTimeout(() => {
      const index = this.i++;

      if (index < 100) {
        const buffer = Buffer.from(String(index));

        this.push(buffer);
      } else {
        this.push(null);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = parseInt(chunk.toString());
    const result = number * -1;

    callback(null, Buffer.from(result.toString()));
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    const number = parseInt(chunk.toString());
    const result = number * 10;

    console.log(result);
    callback();
  }
}

new OneToHundred()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
