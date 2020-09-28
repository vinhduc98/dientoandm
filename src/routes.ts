import { Express } from 'express';
import {FileImageRoute} from './routes/fileImage.routes';
import {AccountRoute} from './routes/account.route';
import {DishRoute} from './routes/dish.route';
import {AuthRoute} from './routes/auth.route';

export function routes(app: Express) {
    app.route("/").get((req, res) => {
      res.render("index");
    });

    AuthRoute("/api/Auth",app);
    FileImageRoute("/api/Image",app);
    AccountRoute("/api/Account",app);
    DishRoute("/api/Dish",app);
}