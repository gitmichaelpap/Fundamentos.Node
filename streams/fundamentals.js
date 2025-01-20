// process.stdin.pipe(process.stdout);

import { Readable, Writable } from 'node:stream';

class OneToHundred extends Readable {
  i = 1;

  _read() {
    const index = this.i++;

    if (index < 100) {
        const buffer = Buffer.from(String(index));

      this.push(buffer);
    } else {
      this.push(null);
    }
  }
}

new OneToHundred().pipe(process.stdout);