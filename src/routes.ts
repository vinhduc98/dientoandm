import { Express } from 'express';

export function routes(app: Express) {
    app.route("/").get((req, res) => {
      res.render("index");
    });
}