import { Express } from 'express';
import {FileImageRoute} from './routes/fileImage.routes'

export function routes(app: Express) {
    app.route("/").get((req, res) => {
      res.render("index");
    });

    FileImageRoute("/api/Image",app);
}