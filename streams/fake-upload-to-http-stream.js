import { Readable } from "node:stream";

class OneToHundred extends Readable {
  i = 1;

  _read() {
    setTimeout(() => {
      const index = this.i++;

      if (index < 10) {
        const buffer = Buffer.from(String(index));

        this.push(buffer);
      } else {
        this.push(null);
      }
    }, 1000);
  }
}

fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundred(),
  duplex: "half",
})
  .then(async (res) => {
    return res.text();
  })
  .then((text) => {
    console.log(text);
  });
