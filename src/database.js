import fs from 'node:fs/promises';

const databasepath = new URL('../db.json', import.meta.url);
export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasepath)
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#database = {};
      });
  }

  #persist() {
    fs.writeFile(databasepath, JSON.stringify(this.#database));
  }

  select(table) {
    return this.#database[table] ?? [];
  }

  insert(table, data) {
    if (!this.#database[table]) {
      this.#database[table] = [];
    }

    this.#database[table].push(data);

    this.#persist();

    return data;
  }
}
