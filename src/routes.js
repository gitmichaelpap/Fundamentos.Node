import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRouteUrl } from "./utils/build-rout-url.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    url: buildRouteUrl("/users"),
    handler: (req, res) => {
      const { search } = req.query;

      const searchSelect = search
        ? {
            name: search,
            email: search,
          }
        : null;

      const users = database.select("users", searchSelect);

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    url: buildRouteUrl("/users"),
    handler: (req, res) => {
      const { name, email } = req.body;
      const user = {
        id: randomUUID(),
        name,
        email,
      };
      database.insert("users", user);
      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    url: buildRouteUrl("/users/:id"),
    handler(req, res) {
      const { id } = req.params;
      database.delete("users", id);
      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    url: buildRouteUrl("/users/:id"),
    handler(req, res) {
      const { id } = req.params;
      const { name, email } = req.body;

      database.update("users", id, { name, email });

      return res.writeHead(204).end();
    },
  },
];
