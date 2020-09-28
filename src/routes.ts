import { Express } from 'express';
import {FileImageRoute} from './routes/fileImage.routes';
import {AccountRoute,AccountRouteNoauthenticate} from './routes/account.route';
import {DishRoute,DishRouteNoauthenticate} from './routes/dish.route';
import {AuthRoute,AuthRouteNoauthenticate} from './routes/auth.route';
import {checkJWT,checkJWTDb} from './middleswares/checkJWT.middlesware';

export function routes(app: Express) {
    app.route("/").get((req, res) => {
      res.render("index");
    });
    app.use(checkJWT,checkJWTDb);
    AuthRoute("/api/Auth",app);
    DishRoute("/api/Dish",app);
    AccountRoute("/api/Account",app);
    FileImageRoute("/api/Image",app);
}

export function routesNoauthenticate(app:Express){
  app.route("/").get((req, res) => {
    res.render("index");
  });
  AuthRouteNoauthenticate("/api/Auth",app);
  DishRouteNoauthenticate("/api/Dish",app);
  AccountRouteNoauthenticate("/api/Account",app);
}
